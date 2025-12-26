"use client"

import { useState } from "react"
import { Plus, Search, Edit, Trash2, Copy, Check, X, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

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
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  // Sample coupon data
  const [coupons, setCoupons] = useState<Coupon[]>([
    {
      id: "1",
      code: "WELCOME10",
      discount: 10,
      type: "percentage",
      minPurchase: 500,
      maxDiscount: 100,
      usageLimit: 100,
      usedCount: 45,
      expiryDate: "2024-12-31",
      status: "active",
    },
    {
      id: "2",
      code: "FLAT50",
      discount: 50,
      type: "fixed",
      minPurchase: 1000,
      usageLimit: 50,
      usedCount: 12,
      expiryDate: "2024-11-30",
      status: "active",
    },
    {
      id: "3",
      code: "SAVE20",
      discount: 20,
      type: "percentage",
      minPurchase: 800,
      maxDiscount: 200,
      usageLimit: 200,
      usedCount: 200,
      expiryDate: "2024-10-31",
      status: "expired",
    },
  ])

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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#6D4530]">Coupon Management</h1>
          <p className="text-[#8B5A3C]/70 mt-1">Manage discount coupons and promotional codes</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#8B5A3C] hover:bg-[#6D4530] text-white">
              <Plus className="h-4 w-4 mr-2" />
              Add Coupon
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="text-[#6D4530]">Add New Coupon</DialogTitle>
              <DialogDescription className="text-[#8B5A3C]/70">
                Create a new discount coupon for customers
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="code" className="text-[#6D4530]">
                  Coupon Code
                </Label>
                <Input id="code" placeholder="e.g., SAVE20" className="border-[#D9CFC7] focus:border-[#8B5A3C]" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="discount" className="text-[#6D4530]">
                    Discount Value
                  </Label>
                  <Input
                    id="discount"
                    type="number"
                    placeholder="10"
                    className="border-[#D9CFC7] focus:border-[#8B5A3C]"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="type" className="text-[#6D4530]">
                    Discount Type
                  </Label>
                  <Select>
                    <SelectTrigger className="border-[#D9CFC7] focus:border-[#8B5A3C]">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage">Percentage</SelectItem>
                      <SelectItem value="fixed">Fixed Amount</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="minPurchase" className="text-[#6D4530]">
                    Min. Purchase (₹)
                  </Label>
                  <Input
                    id="minPurchase"
                    type="number"
                    placeholder="500"
                    className="border-[#D9CFC7] focus:border-[#8B5A3C]"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="maxDiscount" className="text-[#6D4530]">
                    Max. Discount (₹)
                  </Label>
                  <Input
                    id="maxDiscount"
                    type="number"
                    placeholder="100"
                    className="border-[#D9CFC7] focus:border-[#8B5A3C]"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="usageLimit" className="text-[#6D4530]">
                    Usage Limit
                  </Label>
                  <Input
                    id="usageLimit"
                    type="number"
                    placeholder="100"
                    className="border-[#D9CFC7] focus:border-[#8B5A3C]"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="expiryDate" className="text-[#6D4530]">
                    Expiry Date
                  </Label>
                  <Input id="expiryDate" type="date" className="border-[#D9CFC7] focus:border-[#8B5A3C]" />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsAddDialogOpen(false)}
                className="border-[#D9CFC7] text-[#6D4530] hover:bg-[#F5F1ED]"
              >
                Cancel
              </Button>
              <Button onClick={() => setIsAddDialogOpen(false)} className="bg-[#8B5A3C] hover:bg-[#6D4530] text-white">
                Create Coupon
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filter */}
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
          <Button
            variant="outline"
            className="border-[#8B5A3C] text-[#8B5A3C] hover:bg-[#8B5A3C] hover:text-white bg-transparent"
          >
            Filter
          </Button>
        </div>
      </div>

      {/* Coupon Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border border-[#D9CFC7] p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#8B5A3C]/70">Total Coupons</p>
              <p className="text-2xl font-bold text-[#6D4530] mt-1">{coupons.length}</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-[#8B5A3C]/10 flex items-center justify-center">
              <Tag className="h-6 w-6 text-[#8B5A3C]" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-[#D9CFC7] p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#8B5A3C]/70">Active Coupons</p>
              <p className="text-2xl font-bold text-[#6D4530] mt-1">
                {coupons.filter((c) => c.status === "active").length}
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <Check className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-[#D9CFC7] p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#8B5A3C]/70">Expired Coupons</p>
              <p className="text-2xl font-bold text-[#6D4530] mt-1">
                {coupons.filter((c) => c.status === "expired").length}
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
              <X className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Coupons Table */}
      <div className="bg-white rounded-lg border border-[#D9CFC7] overflow-hidden">
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
                <TableHead className="text-[#6D4530] font-semibold text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCoupons.map((coupon) => (
                <TableRow key={coupon.id} className="hover:bg-[#F5F1ED]/50">
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-semibold text-[#6D4530]">{coupon.code}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-[#8B5A3C] hover:text-[#6D4530]"
                        onClick={() => handleCopyCode(coupon.code, coupon.id)}
                      >
                        {copiedId === coupon.id ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell className="text-[#6D4530]">
                    {coupon.type === "percentage" ? `${coupon.discount}%` : `₹${coupon.discount}`}
                    {coupon.maxDiscount && (
                      <span className="text-xs text-[#8B5A3C]/70 ml-1">(max ₹{coupon.maxDiscount})</span>
                    )}
                  </TableCell>
                  <TableCell className="text-[#6D4530]">₹{coupon.minPurchase}</TableCell>
                  <TableCell className="text-[#6D4530]">
                    {coupon.usedCount}/{coupon.usageLimit}
                  </TableCell>
                  <TableCell className="text-[#6D4530]">{coupon.expiryDate}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(coupon.status)}`}
                    >
                      {coupon.status.charAt(0).toUpperCase() + coupon.status.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-[#8B5A3C] hover:text-[#6D4530] hover:bg-[#8B5A3C]/10"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
