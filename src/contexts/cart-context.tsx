"use client"

import React, { createContext, useContext, useState, useEffect, useRef } from "react"
import { type CartItem } from "@/components/cart/cart-drawer"

interface CartContextType {
  cartItems: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  clearCart: () => void
  isLoading: boolean
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const CART_STORAGE_KEY = "ananthala_cart"

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const [userEmail, setUserEmail] = useState<string>("")

  const normalizeItemName = (name: string) => name.replace(/\bGRACE\b/g, "Grace")

  // Fetch user info from auth verification endpoint
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch("/api/auth/verify", {
          method: "GET",
          credentials: "include",
        })

        if (response.ok) {
          const data = await response.json()
          if (data.user && data.user.email) {
            setUserEmail(data.user.email)
            // Store user info in localStorage for reference
            if (typeof window !== "undefined") {
              localStorage.setItem("user_email", data.user.email)
              localStorage.setItem("user_id", data.user.id || "")
              localStorage.setItem("user_fullname", data.user.fullname || "")
            }
          }
        } else {
          // User not logged in, use guest
          setUserEmail("guest@ananthala.com")
        }
      } catch (error) {
        console.error("[Cart] Error fetching user info:", error)
        setUserEmail("guest@ananthala.com")
      }
    }

    if (typeof window !== "undefined") {
      fetchUserInfo()
    }
  }, [])

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
            setCartItems(normalizedItems)
          }
        } catch (error) {
          console.error("Error loading cart from localStorage:", error)
        }
      }
      setIsLoading(false)
    }
  }, [])

  // Save cart to localStorage and database whenever it changes (debounced)
  useEffect(() => {
    if (typeof window !== "undefined" && !isLoading) {
      // Save to localStorage immediately
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems))

      // Save to database with debounce (every 2 seconds max)
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current)
      }

      saveTimeoutRef.current = setTimeout(() => {
        if (cartItems.length > 0) {
          saveCartToDatabase(cartItems, userEmail)
        }
      }, 2000)
    }

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current)
      }
    }
  }, [cartItems, isLoading, userEmail])

  // Function to save cart to database with user info
  const saveCartToDatabase = async (items: CartItem[], email: string) => {
    try {
      // Get stored user info
      const userId = typeof window !== "undefined" ? localStorage.getItem("user_id") : null
      const userFullname = typeof window !== "undefined" ? localStorage.getItem("user_fullname") : null

      const response = await fetch("/api/cart/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include cookies for auth token
        body: JSON.stringify({
          email,
          userId,
          userFullname,
          items,
          userAgent: typeof window !== "undefined" ? window.navigator.userAgent : "",
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        console.error("[Cart] Error saving to database:", error.message)
      }
    } catch (error) {
      console.error("[Cart] Error saving cart to database:", error)
    }
  }

  const addToCart = (newItem: CartItem) => {
    setCartItems((prevItems) => {
      const normalizedItem = { ...newItem, name: normalizeItemName(newItem.name) }
      // Check if exact same product with same size exists
      const existingItemIndex = prevItems.findIndex(
        (item) => item.id === newItem.id
      )
      if (existingItemIndex >= 0) {
        // Item exists, update quantity
        const updatedItems = [...prevItems]
        updatedItems[existingItemIndex].quantity += normalizedItem.quantity
        return updatedItems
      }
      // New item, add to cart
      return [...prevItems, normalizedItem]
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
        isLoading,
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

