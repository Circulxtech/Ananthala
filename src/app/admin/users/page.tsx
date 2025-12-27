"use client"

import { useState } from "react"
import { Search, Filter, UserPlus, Edit, Trash2, MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function UserManagementPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterRole, setFilterRole] = useState("all")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-[#6D4530]">User Management</h1>
          <p className="text-[#8B5A3C]/70 mt-1">Manage all registered users and their accounts</p>
        </div>
        <Button className="bg-[#8B5A3C] hover:bg-[#6D4530] text-white">
          <UserPlus className="w-4 h-4 mr-2" />
          Add User
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border p-4 space-y-4" style={{ borderColor: "#D9CFC7" }}>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8B5A3C]/50 w-4 h-4" />
            <Input
              placeholder="Search users by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={filterRole} onValueChange={setFilterRole}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filter by role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="customer">Customer</SelectItem>
              <SelectItem value="agent">Agent</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* User Table */}
      <div className="bg-white rounded-lg border overflow-hidden" style={{ borderColor: "#D9CFC7" }}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F5F1ED]">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-[#6D4530]">User</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-[#6D4530]">Email</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-[#6D4530]">Role</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-[#6D4530]">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-[#6D4530]">Joined</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-[#6D4530]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: "#D9CFC7" }}>
              {[...Array(5)].map((_, i) => (
                <tr key={i} className="hover:bg-[#F5F1ED]/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold">
                        U
                      </div>
                      <div>
                        <div className="font-medium text-[#6D4530]">User Name {i + 1}</div>
                        <div className="text-xs text-[#8B5A3C]/70">ID: #{100 + i}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[#6D4530]">user{i + 1}@example.com</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#8B5A3C]/10 text-[#8B5A3C]">
                      Customer
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                      Active
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[#6D4530]">Jan {15 + i}, 2024</td>
                  <td className="px-6 py-4 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit User
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete User
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
          <div className="text-sm text-[#8B5A3C]/70">Showing 1-5 of 50 users</div>
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
