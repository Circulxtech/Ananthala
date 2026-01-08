"use client"

import { useState, useEffect } from "react"
import { Plus, Search, Edit, Trash2, Copy, Check, X, Tag, AlertCircle } from "lucide-react"
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
  const [coupons, setCoupons] = useState<Coupon[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    code: "",
    discount: "",
    type: "percentage",
    minPurchase: "",
    maxDiscount: "",
    usageLimit: "",
    expiryDate: "",
  })

  const [messages, setMessages] = useState({ success: "", error: "" })

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
      setMessages({ success: "", error: "Failed to fetch coupons" })
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddCoupon = async () => {
    // Validation
    if (!formData.code || !formData.discount || !formData.minPurchase || !formData.usageLimit || !formData.expiryDate) {
      setMessages({ success: "", error: "Please fill all required fields" })
      return
    }

    if (formData.type === "percentage" && Number.parseInt(formData.discount) > 100) {
      setMessages({ success: "", error: "Percentage discount cannot exceed 100%" })
      return
    }

    setIsSubmitting(true)
    try {
      const response = await fetch("/api/agent/coupons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          code: formData.code,
          discount: Number.parseInt(formData.discount),
          type: formData.type,
          minPurchase: Number.parseInt(formData.minPurchase),
          maxDiscount: formData.maxDiscount ? Number.parseInt(formData.maxDiscount) : undefined,
          usageLimit: Number.parseInt(formData.usageLimit),
          expiryDate: formData.expiryDate,
        }),
      })

      const data = await response.json()

      if (data.success) {
        setMessages({ success: "Coupon created successfully!", error: "" })
        setFormData({
          code: "",
          discount: "",
          type: "percentage",
          minPurchase: "",
          maxDiscount: "",
          usageLimit: "",
          expiryDate: "",
        })
        setIsAddDialogOpen(false)
        fetchCoupons()
      } else {
        setMessages({ success: "", error: data.error || "Failed to create coupon" })
      }
    } catch (error) {
      setMessages({ success: "", error: "An error occurred while creating the coupon" })
      console.error("Error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteCoupon = async (id: string) => {
    if (!confirm("Are you sure you want to delete this coupon?")) return

    try {
      const response = await fetch(`/api/agent/coupons/${id}`, {
        method: "DELETE",
        credentials: "include",
      })

      const data = await response.json()

      if (data.success) {
        setMessages({ success: "Coupon deleted successfully!", error: "" })
        fetchCoupons()
      } else {
        setMessages({ success: "", error: "Failed to delete coupon" })
      }
    } catch (error) {
      setMessages({ success: "", error: "An error occurred while deleting the coupon" })
      console.error("Error:", error)
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

            {/* Messages */}
            {messages.error && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-200 flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-red-700">{messages.error}</p>
              </div>
            )}

            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="code" className="text-[#6D4530]">
                  Coupon Code <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="code"
                  placeholder="e.g., SAVE20"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                  className="border-[#D9CFC7] focus:border-[#8B5A3C]"
                  disabled={isSubmitting}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="discount" className="text-[#6D4530]">
                    Discount Value <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="discount"
                    type="number"
                    placeholder="10"
                    value={formData.discount}
                    onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                    className="border-[#D9CFC7] focus:border-[#8B5A3C]"
                    disabled={isSubmitting}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="type" className="text-[#6D4530]">
                    Discount Type <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) => setFormData({ ...formData, type: value as any })}
                  >
                    <SelectTrigger className="border-[#D9CFC7] focus:border-[#8B5A3C]" disabled={isSubmitting}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage">Percentage (%)</SelectItem>
                      <SelectItem value="fixed">Fixed Amount (₹)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="minPurchase" className="text-[#6D4530]">
                    Min. Purchase (₹) <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="minPurchase"
                    type="number"
                    placeholder="500"
                    value={formData.minPurchase}
                    onChange={(e) => setFormData({ ...formData, minPurchase: e.target.value })}
                    className="border-[#D9CFC7] focus:border-[#8B5A3C]"
                    disabled={isSubmitting}
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
                    value={formData.maxDiscount}
                    onChange={(e) => setFormData({ ...formData, maxDiscount: e.target.value })}
                    className="border-[#D9CFC7] focus:border-[#8B5A3C]"
                    disabled={isSubmitting}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="usageLimit" className="text-[#6D4530]">
                    Usage Limit <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="usageLimit"
                    type="number"
                    placeholder="100"
                    value={formData.usageLimit}
                    onChange={(e) => setFormData({ ...formData, usageLimit: e.target.value })}
                    className="border-[#D9CFC7] focus:border-[#8B5A3C]"
                    disabled={isSubmitting}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="expiryDate" className="text-[#6D4530]">
                    Expiry Date <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="expiryDate"
                    type="date"
                    value={formData.expiryDate}
                    onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                    className="border-[#D9CFC7] focus:border-[#8B5A3C]"
                    disabled={isSubmitting}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setIsAddDialogOpen(false)
                  setMessages({ success: "", error: "" })
                }}
                className="border-[#D9CFC7] text-[#6D4530] hover:bg-[#F5F1ED]"
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddCoupon}
                className="bg-[#8B5A3C] hover:bg-[#6D4530] text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creating..." : "Create Coupon"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Messages */}
      {messages.success && (
        <div className="p-4 rounded-lg bg-green-50 border border-green-200 flex items-start gap-3">
          <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-green-700">{messages.success}</p>
        </div>
      )}
      {messages.error && (
        <div className="p-4 rounded-lg bg-red-50 border border-red-200 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-red-700">{messages.error}</p>
        </div>
      )}

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
              <X className="h-6 w-6 text-red-600" />
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
                  <TableHead className="text-[#6D4530] font-semibold text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCoupons.map((coupon) => (
                  <TableRow key={coupon.id} className="hover:bg-[#F5F1ED]/50 transition-colors">
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
                          onClick={() => handleDeleteCoupon(coupon.id)}
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
        )}
      </div>
    </div>
  )
}
