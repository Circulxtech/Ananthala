"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import { type CartItem } from "@/components/cart/cart-drawer"
import { toast } from "@/hooks/use-toast"

interface CartContextType {
  cartItems: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const CART_STORAGE_KEY = "ananthala_cart"

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  const normalizeItemName = (name: string) => name.replace(/\bGRACE\b/g, "Grace")
  const getCartItemMergeKey = (item: CartItem) =>
    [
      normalizeItemName(item.name).trim().toLowerCase(),
      (item.size || "").trim().toLowerCase(),
      (item.fabric || "").trim().toLowerCase(),
      String(item.price),
    ].join("|")

  const mergeDuplicateCartItems = (items: CartItem[]) => {
    const merged = new Map<string, CartItem>()

    items.forEach((item) => {
      const normalizedItem = { ...item, name: normalizeItemName(item.name ?? "") }
      const key = getCartItemMergeKey(normalizedItem)
      const existing = merged.get(key)

      if (existing) {
        existing.quantity += normalizedItem.quantity
        return
      }

      merged.set(key, { ...normalizedItem })
    })

    return Array.from(merged.values())
  }

  // Load cart from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(CART_STORAGE_KEY)
      if (stored) {
        try {
          const parsed = JSON.parse(stored)
          if (Array.isArray(parsed)) {
            const normalizedItems = parsed.map((item) =>
              item && typeof item === "object" ? { ...item, name: normalizeItemName(item.name ?? "") } : item
            )
            setCartItems(mergeDuplicateCartItems(normalizedItems))
          }
        } catch (error) {
          console.error("Error loading cart from localStorage:", error)
        }
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined" && cartItems.length >= 0) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems))
    }
  }, [cartItems])

  const addToCart = (newItem: CartItem) => {
    const normalizedItem = { ...newItem, name: normalizeItemName(newItem.name) }
    const mergeKey = getCartItemMergeKey(normalizedItem)
    const existingItem = cartItems.find((item) => getCartItemMergeKey(item) === mergeKey)

    setCartItems((prevItems) => {
      // Merge by product configuration instead of generated id.
      const existingItemIndex = prevItems.findIndex(
        (item) => getCartItemMergeKey(item) === mergeKey
      )
      if (existingItemIndex >= 0) {
        const updatedItems = [...prevItems]
        updatedItems[existingItemIndex].quantity += normalizedItem.quantity
        return mergeDuplicateCartItems(updatedItems)
      }
      return mergeDuplicateCartItems([...prevItems, normalizedItem])
    })

    toast({
      title: existingItem ? "Cart updated" : "Added to cart",
      description: existingItem
        ? `${normalizedItem.name} quantity updated in your cart.`
        : `${normalizedItem.name} has been added to your cart.`,
    })
  }

  const removeFromCart = (itemId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId))
  }

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId)
      return
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      )
    )
  }

  const clearCart = () => {
    setCartItems([])
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
