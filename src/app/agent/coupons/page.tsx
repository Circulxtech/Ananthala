"use client"

import { useState, useEffect } from "react"
import { Search, Copy, Check, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Coupon {
  id: string
  code: string
  discount: number
  type: "percentage" | "fixed"
  minPurchase: number
  maxDiscount?: number
  usageLimit: number
  usedCount: number
  expiryDate: string
  status: "active" | "expired" | "inactive"
}

export default function CouponManagementPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [coupons, setCoupons] = useState<Coupon[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Fetch coupons on mount
  useEffect(() => {
    fetchCoupons()
  }, [])

  const fetchCoupons = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/agent/coupons", {
        credentials: "include",
      })

      if (!response.ok) {
        throw new Error("Failed to fetch coupons")
      }

      const data = await response.json()
      if (data.success) {
        setCoupons(
          data.coupons.map((coupon: any) => ({
            id: coupon._id,
            code: coupon.code,
            discount: coupon.discount,
            type: coupon.type,
            minPurchase: coupon.minPurchase,
            maxDiscount: coupon.maxDiscount,
            usageLimit: coupon.usageLimit,
            usedCount: coupon.usedCount,
            expiryDate: new Date(coupon.expiryDate).toISOString().split("T")[0],
            status: coupon.status,
          })),
        )
      }
    } catch (error) {
      console.error("Error fetching coupons:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const filteredCoupons = coupons.filter(
    (coupon) =>
      coupon.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coupon.status.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700"
      case "expired":
        return "bg-red-100 text-red-700"
      case "inactive":
        return "bg-gray-100 text-gray-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const totalCoupons = coupons.length
  const activeCoupons = coupons.filter((c) => c.status === "active").length
  const expiredCoupons = coupons.filter((c) => c.status === "expired").length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#6D4530]">Available Coupons</h1>
        <p className="text-[#8B5A3C]/70 mt-1">View all promotional coupons</p>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg border border-[#D9CFC7] p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#8B5A3C]/50" />
            <Input
              placeholder="Search by coupon code or status..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-[#D9CFC7] focus:border-[#8B5A3C]"
            />
          </div>
        </div>
      </div>

      {/* Coupon Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border border-[#D9CFC7] p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#8B5A3C]/70 font-medium">Total Coupons</p>
              <p className="text-3xl font-bold text-[#6D4530] mt-2">{totalCoupons}</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-[#8B5A3C]/10 flex items-center justify-center">
              <Tag className="h-6 w-6 text-[#8B5A3C]" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-[#D9CFC7] p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#8B5A3C]/70 font-medium">Active Coupons</p>
              <p className="text-3xl font-bold text-[#6D4530] mt-2">{activeCoupons}</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <Check className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-[#D9CFC7] p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#8B5A3C]/70 font-medium">Expired Coupons</p>
              <p className="text-3xl font-bold text-[#6D4530] mt-2">{expiredCoupons}</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
              <Check className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Coupons Table */}
      <div className="bg-white rounded-lg border border-[#D9CFC7] overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center">
            <p className="text-[#8B5A3C]/70">Loading coupons...</p>
          </div>
        ) : filteredCoupons.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-[#8B5A3C]/70">No coupons found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-[#F5F1ED] hover:bg-[#F5F1ED]">
                  <TableHead className="text-[#6D4530] font-semibold">Coupon Code</TableHead>
                  <TableHead className="text-[#6D4530] font-semibold">Discount</TableHead>
                  <TableHead className="text-[#6D4530] font-semibold">Min. Purchase</TableHead>
                  <TableHead className="text-[#6D4530] font-semibold">Usage</TableHead>
                  <TableHead className="text-[#6D4530] font-semibold">Expiry Date</TableHead>
                  <TableHead className="text-[#6D4530] font-semibold">Status</TableHead>
                  <TableHead className="text-[#6D4530] font-semibold text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCoupons.map((coupon) => (
                  <TableRow key={coupon.id} className="hover:bg-[#F5F1ED]/50 transition-colors">
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-semibold text-[#6D4530]">{coupon.code}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-[#6D4530] font-medium">
                      {coupon.type === "percentage" ? `${coupon.discount}%` : `₹${coupon.discount}`}
                      {coupon.maxDiscount && (
                        <span className="text-xs text-[#8B5A3C]/70 ml-1 block">(max ₹{coupon.maxDiscount})</span>
                      )}
                    </TableCell>
                    <TableCell className="text-[#6D4530]">₹{coupon.minPurchase}</TableCell>
                    <TableCell className="text-[#6D4530]">
                      <div className="flex items-center gap-2">
                        <span>
                          {coupon.usedCount}/{coupon.usageLimit}
                        </span>
                        <div className="w-12 h-1.5 bg-[#D9CFC7] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#8B5A3C]"
                            style={{ width: `${(coupon.usedCount / coupon.usageLimit) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-[#6D4530]">{coupon.expiryDate}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(coupon.status)}`}
                      >
                        {coupon.status.charAt(0).toUpperCase() + coupon.status.slice(1)}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-[#8B5A3C] hover:text-[#6D4530] hover:bg-[#8B5A3C]/10"
                        onClick={() => handleCopyCode(coupon.code, coupon.id)}
                      >
                        {copiedId === coupon.id ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  )
}
