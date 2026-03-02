"use client"
import { ShoppingCart } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useCart } from "@/contexts/cart-context"

export default function CartPage() {
  const { cartItems } = useCart()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Shopping Cart</h1>
        <p className="text-foreground mt-1">Review your items before checkout</p>
      </div>

      {cartItems.length === 0 ? (
        <Card className="border" style={{ borderColor: "#D9CFC7" }}>
          <CardContent className="py-12">
            <div className="text-center">
              <ShoppingCart className="h-16 w-16 text-[#8B5A3C]/30 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Your cart is empty</h3>
              <p className="text-foreground mb-6">Add items to your cart to continue shopping</p>
              <a
                href="/#find-your-perfect-mattress"
                className="inline-block bg-[#EED9C4] text-foreground px-6 py-2 rounded-lg hover:bg-[#EED9C4]/80 transition-colors"
              >
                Continue Shopping
              </a>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="border" style={{ borderColor: "#D9CFC7" }}>
              <CardContent className="p-6">
                <p className="text-foreground">Cart items will be displayed here</p>
              </CardContent>
            </Card>
          </div>
          <div>
            <Card className="border" style={{ borderColor: "#D9CFC7" }}>
              <CardContent className="p-6">
                <p className="text-foreground">Order summary will be displayed here</p>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}
