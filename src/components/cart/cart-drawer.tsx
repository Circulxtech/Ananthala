"use client"

import { X, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

export interface CartItem {
  id: string
  name: string
  image: string
  size: string
  fabric?: string
  productColor?: string // Color selected from color configurator
  productColorHex?: string // HEX value of color
  quantity: number
  price: number
}

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
  cartItems?: CartItem[]
}

export function CartDrawer({ isOpen, onClose, cartItems = [] }: CartDrawerProps) {
  const router = useRouter()
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleCheckout = () => {
    onClose()
    router.push("/checkout")
  }

  return (
    <>
      {/* Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300" onClick={onClose} />}

      {/* Cart Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[450px] bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-serif text-black">CART</h2>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="text-black hover:bg-gray-100">
              <X className="h-6 w-6" />
              <span className="sr-only">Close cart</span>
            </Button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <ShoppingBag className="h-16 w-16 text-gray-300 mb-4" />
                <p className="text-gray-500 text-lg mb-2">Your cart is empty</p>
                <p className="text-gray-400 text-sm">Add items to get started</p>
              </div>
            ) : (
              <div className="space-y-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4 pb-6 border-b border-gray-100">
                    <div className="relative w-24 h-24 flex-shrink-0 bg-gray-100 overflow-hidden">
                      <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-serif text-black text-lg mb-2 leading-tight">
                        {item.name}
                        {item.productColor && (
                          <span className="text-sm font-normal text-gray-600 ml-1">({item.productColor})</span>
                        )}
                      </h3>
                      <p className="text-black text-sm mb-2">Size: {item.size}</p>
                      {item.fabric && (
                        <p className="text-black text-sm mb-2">Fabric: {item.fabric}</p>
                      )}
                      {item.productColor && (
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-black text-sm">Color:</span>
                          <div
                            className="w-4 h-4 rounded border border-gray-300"
                            style={{ backgroundColor: item.productColorHex || "transparent" }}
                            title={item.productColor}
                          />
                          <span className="text-black text-sm">{item.productColor}</span>
                        </div>
                      )}
                      <p className="text-black text-sm">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-black font-medium text-lg">
                        ₹{(item.price * item.quantity).toLocaleString("en-IN", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {cartItems.length > 0 && (
            <div className="border-t border-gray-200 p-6 bg-gray-50">
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between text-lg">
                  <span className="text-black font-medium">Subtotal</span>
                  <span className="text-black font-semibold">
                    ₹{subtotal.toLocaleString("en-IN", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>
                <p className="text-black text-lg">Shipping calculated at checkout</p>
              </div>

              <div className="space-y-3">
                <Button
                  className="w-full text-black py-6 text-lg font-medium transition-colors hover:opacity-90"
                  style={{ backgroundColor: "#EED9C4" }}
                  onClick={handleCheckout}
                >
                  Checkout
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-2 py-6 text-lg font-medium transition-colors bg-transparent text-black hover:opacity-70"
                  style={{ borderColor: "#D9CFC7" }}
                  onClick={onClose}
                  asChild
                >
                  <Link href="/cart">View Cart</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
