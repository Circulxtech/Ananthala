"use client"

import { useState, useEffect } from "react"
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

interface CartItem {
  id: string
  name: string
  image?: string
  quantity: number
  price: number
  size?: string
  fabric?: string
  productColor?: string
  productColorHex?: string
}

interface CartData {
  cartId: string
  items: CartItem[]
  subtotal: number
  shipping: number
  discount: number
  total: number
  userEmail?: string
  userName?: string
  userPhone?: string
}

export default function CartPage() {
  const [cartData, setCartData] = useState<CartData | null>(null)
  const [loading, setLoading] = useState(true)
  const [updatingItems, setUpdatingItems] = useState<Set<string>>(new Set())
  const { toast } = useToast()

  useEffect(() => {
    fetchCart()
  }, [])

  const fetchCart = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/customer/profile")
      const profileData = await response.json()

      if (!profileData.success) {
        throw new Error("Failed to fetch user profile")
      }

      const userId = profileData.user.id
      const cartResponse = await fetch(`/api/cart/get?userId=${userId}`)
      const cartBody = await cartResponse.json()

      if (cartBody.success && cartBody.cart) {
        setCartData(cartBody.cart)
      } else {
        setCartData({
          cartId: "",
          items: [],
          subtotal: 0,
          shipping: 0,
          discount: 0,
          total: 0,
        })
      }
    } catch (error) {
      console.error("Error fetching cart:", error)
      toast({
        description: "Failed to load cart items",
        variant: "destructive",
      })
      setCartData({
        cartId: "",
        items: [],
        subtotal: 0,
        shipping: 0,
        discount: 0,
        total: 0,
      })
    } finally {
      setLoading(false)
    }
  }

  const updateQuantity = async (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return

    setUpdatingItems((prev) => new Set([...prev, itemId]))

    try {
      const response = await fetch("/api/cart/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "update_quantity",
          itemId,
          quantity: newQuantity,
        }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        if (data.cart.items.length === 0) {
          setCartData({
            cartId: "",
            items: [],
            subtotal: 0,
            shipping: 0,
            discount: 0,
            total: 0,
          })
          toast({
            description: "Cart is now empty",
          })
        } else {
          setCartData(data.cart)
        }
      } else {
        toast({
          description: data.error || "Failed to update quantity",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error updating quantity:", error)
      toast({
        description: "Error updating item quantity",
        variant: "destructive",
      })
    } finally {
      setUpdatingItems((prev) => {
        const newSet = new Set(prev)
        newSet.delete(itemId)
        return newSet
      })
    }
  }

  const removeItem = async (itemId: string) => {
    setUpdatingItems((prev) => new Set([...prev, itemId]))

    try {
      const response = await fetch("/api/cart/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "remove_item",
          itemId,
        }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        if (data.cart.items.length === 0) {
          setCartData({
            cartId: "",
            items: [],
            subtotal: 0,
            shipping: 0,
            discount: 0,
            total: 0,
          })
        } else {
          setCartData(data.cart)
        }
        toast({
          description: "Item removed from cart",
        })
      } else {
        toast({
          description: data.error || "Failed to remove item",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error removing item:", error)
      toast({
        description: "Error removing item from cart",
        variant: "destructive",
      })
    } finally {
      setUpdatingItems((prev) => {
        const newSet = new Set(prev)
        newSet.delete(itemId)
        return newSet
      })
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Shopping Cart</h1>
          <p className="text-foreground mt-1">Review your items before checkout</p>
        </div>
        <Card className="border" style={{ borderColor: "#D9CFC7" }}>
          <CardContent className="p-6">
            <p className="text-foreground">Loading your cart...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const isEmpty = !cartData || cartData.items.length === 0

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Shopping Cart</h1>
        <p className="text-foreground mt-1">Review your items before checkout</p>
      </div>

      {isEmpty ? (
        <Card className="border" style={{ borderColor: "#D9CFC7" }}>
          <CardContent className="py-12">
            <div className="text-center">
              <ShoppingCart className="h-11 w-11 text-[#8B5A3C]/50 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Your cart is empty</h3>
              <p className="text-foreground mb-6">Add items to your cart to continue shopping</p>
              <a
                href="/#find-your-perfect-mattress"
                className="inline-block bg-[#6D4530] text-white px-6 py-2 rounded-lg hover:bg-[#5A3A26] transition-colors"
              >
                Continue Shopping
              </a>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartData.items.map((item) => (
              <Card key={item.id} className="border" style={{ borderColor: "#D9CFC7" }}>
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-lg bg-[#F5F1ED]"
                      />
                    )}
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">{item.name}</h3>
                      {(item.size || item.fabric || item.productColor) && (
                        <p className="text-sm text-foreground/70 mt-1">
                          {[item.size, item.fabric, item.productColor].filter(Boolean).join(" • ")}
                        </p>
                      )}
                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center gap-2 bg-[#F5F1ED] rounded-lg p-1">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={updatingItems.has(item.id)}
                            className="p-1 hover:bg-white rounded disabled:opacity-50"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="px-3 font-medium min-w-[2rem] text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            disabled={updatingItems.has(item.id)}
                            className="p-1 hover:bg-white rounded disabled:opacity-50"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-foreground">₹{(item.price * item.quantity).toFixed(2)}</p>
                          <p className="text-sm text-foreground/70">₹{item.price.toFixed(2)} each</p>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      disabled={updatingItems.has(item.id)}
                      className="text-red-600 hover:text-red-700 disabled:opacity-50 p-2"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div>
            <Card className="border sticky top-6" style={{ borderColor: "#D9CFC7" }}>
              <CardHeader>
                <CardTitle className="text-foreground">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between text-foreground/70">
                    <span>Subtotal</span>
                    <span>₹{cartData.subtotal.toFixed(2)}</span>
                  </div>
                  {cartData.discount > 0 && (
                    <div className="flex justify-between text-green-600 font-medium">
                      <span>Discount</span>
                      <span>-₹{cartData.discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-foreground/70">
                    <span>Shipping</span>
                    <span>₹{cartData.shipping.toFixed(2)}</span>
                  </div>
                  <div className="border-t" style={{ borderColor: "#D9CFC7" }} />
                  <div className="flex justify-between font-bold text-lg text-foreground">
                    <span>Total</span>
                    <span>₹{cartData.total.toFixed(2)}</span>
                  </div>
                </div>
                <Button className="w-full bg-[#6D4530] hover:bg-[#5A3A26] text-white">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Proceed to Checkout
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}
