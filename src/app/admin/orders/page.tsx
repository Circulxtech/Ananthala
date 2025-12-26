"use client"

import { useState } from "react"
import { Search, Filter, Eye, Download, MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function OrderManagementPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-[#6D4530]">Order Management</h1>
          <p className="text-[#8B5A3C]/70 mt-1">Track and manage all customer orders</p>
        </div>
        <Button className="bg-[#8B5A3C] hover:bg-[#6D4530] text-white">
          <Download className="w-4 h-4 mr-2" />
          Export Orders
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border p-4 space-y-4" style={{ borderColor: "#D9CFC7" }}>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8B5A3C]/50 w-4 h-4" />
            <Input
              placeholder="Search orders by ID or customer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Orders</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="shipped">Shipped</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg border overflow-hidden" style={{ borderColor: "#D9CFC7" }}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F5F1ED]">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-[#6D4530]">Order ID</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-[#6D4530]">Customer</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-[#6D4530]">Products</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-[#6D4530]">Total</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-[#6D4530]">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-[#6D4530]">Date</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-[#6D4530]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: "#D9CFC7" }}>
              {[...Array(6)].map((_, i) => (
                <tr key={i} className="hover:bg-[#F5F1ED]/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-mono text-sm text-[#8B5A3C]">#ORD-{1000 + i}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-[#6D4530]">Customer {i + 1}</div>
                      <div className="text-xs text-[#8B5A3C]/70">customer{i + 1}@example.com</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[#6D4530]">{2 + i} items</td>
                  <td className="px-6 py-4">
                    <div className="font-semibold text-[#6D4530]">₹{(1200 + i * 500).toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        i % 3 === 0
                          ? "bg-green-100 text-green-700"
                          : i % 3 === 1
                            ? "bg-blue-100 text-blue-700"
                            : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {i % 3 === 0 ? "Delivered" : i % 3 === 1 ? "Processing" : "Pending"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[#6D4530]">Jan {20 + i}, 2024</td>
                  <td className="px-6 py-4 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="w-4 h-4 mr-2" />
                          Download Invoice
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t flex items-center justify-between" style={{ borderColor: "#D9CFC7" }}>
          <div className="text-sm text-[#8B5A3C]/70">Showing 1-6 of 45 orders</div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
