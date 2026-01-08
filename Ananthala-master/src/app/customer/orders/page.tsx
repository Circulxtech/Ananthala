"use client"
import { Package, Search } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#6D4530]">My Orders</h1>
          <p className="text-[#8B5A3C]/70 mt-1">View and track your orders</p>
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8B5A3C]/50" />
          <Input placeholder="Search orders..." className="pl-10 border-[#D9CFC7] focus-visible:ring-[#8B5A3C]/30" />
        </div>
      </div>

      <Card className="border" style={{ borderColor: "#D9CFC7" }}>
        <CardContent className="py-12">
          <div className="text-center">
            <Package className="h-16 w-16 text-[#8B5A3C]/30 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-[#6D4530] mb-2">No orders yet</h3>
            <p className="text-[#8B5A3C]/70 mb-6">Start shopping to see your orders here</p>
            <a
              href="/"
              className="inline-block bg-[#8B5A3C] text-white px-6 py-2 rounded-lg hover:bg-[#6D4530] transition-colors"
            >
              Start Shopping
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
