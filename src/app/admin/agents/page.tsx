"use client"

import { Suspense } from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Search, RefreshCw, Users, TrendingUp, Package, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/hooks/use-toast"

interface AgentCoupon {
  id: string
  code: string
  discount: number
  type: "percentage" | "fixed"
  status: "active" | "expired" | "inactive"
  usedCount: number
  usageLimit: number
  expiryDate: string
}

interface Agent {
  id: string
  fullname: string
  email: string
  phone: string
  address: string
  createdAt: string
  totalCoupons: number
  activeCoupons: number
  totalSavings: number
  expiringCount: number
  coupons: AgentCoupon[]
}

interface Stats {
  totalAgents: number
  totalCoupons: number
  totalActiveCoupons: number
  totalSavings: number
}

function AgentManagementContent() {
  const [agents, setAgents] = useState<Agent[]>([])
  const [stats, setStats] = useState<Stats>({
    totalAgents: 0,
    totalCoupons: 0,
    totalActiveCoupons: 0,
    totalSavings: 0,
  })
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [expandedAgentId, setExpandedAgentId] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const agentsPerPage = 10
  const router = useRouter()

  const fetchAgents = async () => {
    setIsLoading(true)
    try {
      const params = new URLSearchParams()
      if (searchQuery) params.append("search", searchQuery)

      const response = await fetch(`/api/admin/agents?${params.toString()}`, {
        credentials: "include",
      })
      const data = await response.json()

      if (data.success) {
        setAgents(data.agents)
        setStats(data.stats)
        setCurrentPage(1)
        console.log("[v0] Loaded agents:", data.agents.length)
      } else {
        toast({
          title: "Error",
          description: data.message || "Failed to fetch agents",
          variant: "destructive",
        })
      }
    } catch (error: any) {
      console.error("[FETCH_AGENTS_ERROR]", error)
      toast({
        title: "Error",
        description: "Failed to fetch agents",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchAgents()
  }, [])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
  }

  const totalPages = Math.ceil(agents.length / agentsPerPage)
  const startIndex = (currentPage - 1) * agentsPerPage
  const endIndex = startIndex + agentsPerPage
  const currentAgents = agents.slice(startIndex, endIndex)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-[#6D4530]">Agent Management</h1>
          <p className="text-[#8B5A3C]/70 mt-1">Overview and management of all agents</p>
        </div>
        <Button onClick={fetchAgents} disabled={isLoading} className="bg-[#8B5A3C] hover:bg-[#6D4530] text-white">
          <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {/* Total Agents */}
        <div className="bg-white rounded-xl border border-[#E5D5C5] shadow-md p-6 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <h3 className="text-[#8B5A3C] text-sm font-medium mb-1">Total Agents</h3>
          <p className="text-3xl font-bold text-[#6D4530]">{stats.totalAgents}</p>
          <p className="mt-3 text-xs text-[#8B5A3C]">Active agents in system</p>
        </div>

        {/* Total Coupons */}
        <div className="bg-white rounded-xl border border-[#E5D5C5] shadow-md p-6 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center">
              <Package className="w-6 h-6 text-orange-600" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <h3 className="text-[#8B5A3C] text-sm font-medium mb-1">Total Coupons</h3>
          <p className="text-3xl font-bold text-[#6D4530]">{stats.totalCoupons}</p>
          <p className="mt-3 text-xs text-[#8B5A3C]">Created by all agents</p>
        </div>

        {/* Active Coupons */}
        <div className="bg-white rounded-xl border border-[#E5D5C5] shadow-md p-6 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <h3 className="text-[#8B5A3C] text-sm font-medium mb-1">Active Coupons</h3>
          <p className="text-3xl font-bold text-[#6D4530]">{stats.totalActiveCoupons}</p>
          <p className="mt-3 text-xs text-[#8B5A3C]">Currently active coupons</p>
        </div>

        {/* Total Savings */}
        <div className="bg-white rounded-xl border border-[#E5D5C5] shadow-md p-6 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
              <Package className="w-6 h-6 text-purple-600" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <h3 className="text-[#8B5A3C] text-sm font-medium mb-1">Total Savings</h3>
          <p className="text-3xl font-bold text-[#6D4530]">₹{stats.totalSavings.toLocaleString()}</p>
          <p className="mt-3 text-xs text-[#8B5A3C]">Customer savings via coupons</p>
        </div>
      </div>

      {/* Search Filter */}
      <div className="bg-white rounded-lg border p-4 space-y-4" style={{ borderColor: "#D9CFC7" }}>
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8B5A3C]/50 w-4 h-4" />
          <Input
            placeholder="Search agents by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") fetchAgents()
            }}
            className="pl-10"
          />
        </div>
        <Button onClick={fetchAgents} className="bg-[#8B5A3C] hover:bg-[#6D4530] text-white w-full sm:w-auto">
          Search
        </Button>
      </div>

      {/* Agents List */}
      <div className="space-y-4">
        {isLoading ? (
          <div
            className="flex items-center justify-center p-12 bg-white rounded-lg border"
            style={{ borderColor: "#D9CFC7" }}
          >
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-[#8B5A3C]/10 flex items-center justify-center mx-auto mb-3 animate-pulse">
                <Users className="w-6 h-6 text-[#8B5A3C]" />
              </div>
              <p className="text-[#8B5A3C]/70">Loading agents...</p>
            </div>
          </div>
        ) : agents.length === 0 ? (
          <div
            className="flex items-center justify-center p-12 bg-white rounded-lg border"
            style={{ borderColor: "#D9CFC7" }}
          >
            <div className="text-center">
              <Users className="w-12 h-12 text-[#8B5A3C]/30 mx-auto mb-3" />
              <p className="text-[#8B5A3C]/70">No agents found</p>
            </div>
          </div>
        ) : (
          currentAgents.map((agent) => (
            <div
              key={agent.id}
              className="bg-white rounded-lg border border-[#E5D5C5] overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              {/* Agent Header */}
              <div
                className="p-4 sm:p-6 cursor-pointer hover:bg-[#F5F1ED]/50"
                onClick={() => setExpandedAgentId(expandedAgentId === agent.id ? null : agent.id)}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#8B5A3C] to-[#6D4530] flex items-center justify-center text-white font-semibold flex-shrink-0">
                      {agent.fullname.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-[#6D4530] truncate">{agent.fullname}</h3>
                      <p className="text-sm text-[#8B5A3C]/70 truncate">{agent.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 flex-shrink-0">
                    <div className="hidden sm:grid grid-cols-3 gap-6 text-right">
                      <div>
                        <p className="text-xs text-[#8B5A3C]/70">Total Coupons</p>
                        <p className="font-bold text-[#6D4530]">{agent.totalCoupons}</p>
                      </div>
                      <div>
                        <p className="text-xs text-[#8B5A3C]/70">Active</p>
                        <p className="font-bold text-green-600">{agent.activeCoupons}</p>
                      </div>
                      <div>
                        <p className="text-xs text-[#8B5A3C]/70">Total Savings</p>
                        <p className="font-bold text-[#6D4530]">₹{agent.totalSavings.toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="text-[#8B5A3C]">{expandedAgentId === agent.id ? "▼" : "▶"}</div>
                  </div>
                </div>

                {/* Mobile Stats */}
                <div className="sm:hidden grid grid-cols-3 gap-3 mt-3 pt-3 border-t border-[#D9CFC7]">
                  <div>
                    <p className="text-xs text-[#8B5A3C]/70">Coupons</p>
                    <p className="font-bold text-[#6D4530]">{agent.totalCoupons}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#8B5A3C]/70">Active</p>
                    <p className="font-bold text-green-600">{agent.activeCoupons}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#8B5A3C]/70">Savings</p>
                    <p className="font-bold text-[#6D4530]">₹{agent.totalSavings.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              {/* Agent Details - Expandable */}
              {expandedAgentId === agent.id && (
                <div className="border-t border-[#E5D5C5] bg-[#F5F1ED]/30 p-4 sm:p-6 space-y-4">
                  {/* Agent Information */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-[#8B5A3C]/70 font-medium">Phone</p>
                      <p className="text-[#6D4530] font-medium">{agent.phone}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[#8B5A3C]/70 font-medium">Address</p>
                      <p className="text-[#6D4530] font-medium">{agent.address}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[#8B5A3C]/70 font-medium">Joined Date</p>
                      <p className="text-[#6D4530] font-medium">{formatDate(agent.createdAt)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[#8B5A3C]/70 font-medium">Expiring Coupons</p>
                      <p className="text-red-600 font-medium">{agent.expiringCount}</p>
                    </div>
                  </div>

                  {/* Coupons Table */}
                  {agent.coupons.length > 0 ? (
                    <div className="mt-4">
                      <h4 className="font-semibold text-[#6D4530] mb-3">Coupon Details</h4>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-[#D9CFC7]">
                              <th className="text-left py-2 px-3 text-[#8B5A3C] font-semibold">Code</th>
                              <th className="text-left py-2 px-3 text-[#8B5A3C] font-semibold">Discount</th>
                              <th className="text-left py-2 px-3 text-[#8B5A3C] font-semibold">Used</th>
                              <th className="text-left py-2 px-3 text-[#8B5A3C] font-semibold">Status</th>
                              <th className="text-left py-2 px-3 text-[#8B5A3C] font-semibold">Expires</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-[#D9CFC7]">
                            {agent.coupons.map((coupon) => (
                              <tr key={coupon.id} className="hover:bg-white/50">
                                <td className="py-2 px-3 font-mono text-[#6D4530] font-semibold">{coupon.code}</td>
                                <td className="py-2 px-3 text-[#6D4530]">
                                  {coupon.type === "percentage" ? `${coupon.discount}%` : `₹${coupon.discount}`}
                                </td>
                                <td className="py-2 px-3 text-[#6D4530]">
                                  {coupon.usedCount}/{coupon.usageLimit}
                                </td>
                                <td className="py-2 px-3">
                                  <span
                                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                                      coupon.status === "active"
                                        ? "bg-green-100 text-green-700"
                                        : coupon.status === "expired"
                                          ? "bg-red-100 text-red-700"
                                          : "bg-gray-100 text-gray-700"
                                    }`}
                                  >
                                    {coupon.status.charAt(0).toUpperCase() + coupon.status.slice(1)}
                                  </span>
                                </td>
                                <td className="py-2 px-3 text-[#6D4530]">{formatDate(coupon.expiryDate)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ) : (
                    <p className="text-[#8B5A3C]/70 text-sm">No coupons created by this agent</p>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {!isLoading && agents.length > 0 && (
        <div
          className="px-6 py-4 border-t flex items-center justify-between bg-white rounded-lg"
          style={{ borderColor: "#D9CFC7" }}
        >
          <div className="text-sm text-[#8B5A3C]/70">
            Showing {startIndex + 1}-{Math.min(endIndex, agents.length)} of {agents.length}{" "}
            {agents.length === 1 ? "agent" : "agents"}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center gap-4">
              <div className="text-sm font-medium text-[#6D4530]">
                Page {currentPage} of {totalPages}
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="border-[#8B5A3C] text-[#8B5A3C] hover:bg-[#8B5A3C] hover:text-white disabled:opacity-50 bg-transparent"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="border-[#8B5A3C] text-[#8B5A3C] hover:bg-[#8B5A3C] hover:text-white disabled:opacity-50 bg-transparent"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default function AgentManagementPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AgentManagementContent />
    </Suspense>
  )
}
