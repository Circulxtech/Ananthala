"use client"

import { X, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

interface CartItem {
  id: string
  name: string
  image: string
  size: string
  quantity: number
  price: number
}

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  // Sample cart items - replace with actual cart data
  const cartItems: CartItem[] = [
    {
      id: "1",
      name: "Cloud Comfort Mattress",
      image: "/comfortable-mattress.png",
      size: "Queen",
      quantity: 1,
      price: 1299,
    },
    {
      id: "2",
      name: "Serene Sleep Luxury",
      image: "/luxury-mattress.png",
      size: "King",
      quantity: 1,
      price: 1899,
    },
  ]

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

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
              <ShoppingBag className="h-6 w-6 text-[#8B5A3C]" />
              <h2 className="text-2xl font-serif text-[#6D4530]">Your Cart</h2>
              <span className="bg-[#8B5A3C] text-white text-sm rounded-full w-6 h-6 flex items-center justify-center font-medium">
                {cartItems.length}
              </span>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="text-[#6D4530] hover:bg-gray-100">
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
                    <div className="relative w-24 h-24 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
                      <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-serif text-[#6D4530] text-lg mb-2 leading-tight">{item.name}</h3>
                      <p className="text-[#8B5A3C] text-sm mb-2">Size: {item.size}</p>
                      <p className="text-[#8B5A3C] text-sm">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[#6D4530] font-medium text-lg">₹{item.price}</p>
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
                  <span className="text-[#8B5A3C] font-medium">Subtotal</span>
                  <span className="text-[#6D4530] font-semibold">₹{subtotal}</span>
                </div>
                <p className="text-[#8B5A3C] text-sm">Shipping calculated at checkout</p>
              </div>

              <div className="space-y-3">
                <Button
                  className="w-full bg-[#8B5A3C] hover:bg-[#6D4530] text-white py-6 text-lg font-medium transition-colors"
                  onClick={onClose}
                >
                  Checkout
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-2 border-[#8B5A3C] text-[#8B5A3C] hover:bg-[#8B5A3C]/5 py-6 text-lg font-medium transition-colors bg-transparent"
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
