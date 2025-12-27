"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { UserCheck, HelpCircle, LogOut } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function AgentDashboard() {
  const [isVerifying, setIsVerifying] = useState(true)
  const [agentData, setAgentData] = useState<{ fullname: string; email: string } | null>(null)
  const router = useRouter()

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const response = await fetch("/api/auth/agent/agent-verify", {
          credentials: "include",
        })

        if (!response.ok) {
          throw new Error("Authentication failed")
        }

        const data = await response.json()

        if (!data.authenticated || data.user?.role !== "agent") {
          sessionStorage.removeItem("agent_session")
          router.replace("/agent")
          return
        }

        sessionStorage.setItem("agent_session", "active")
        setAgentData({
          fullname: data.user.fullname,
          email: data.user.email,
        })
        setIsVerifying(false)
      } catch (error) {
        sessionStorage.removeItem("agent_session")
        router.replace("/agent")
      }
    }

    verifyAuth()

    const intervalId = setInterval(
      () => {
        verifyAuth()
      },
      30 * 60 * 1000,
    )

    return () => clearInterval(intervalId)
  }, [router])

  const handleCouponManagementClick = () => {
    router.push("/agent/coupons")
  }

  const handleLogout = async () => {
    try {
      sessionStorage.removeItem("agent_session")

      await fetch("/api/auth/agent/agent-logout", {
        method: "POST",
        credentials: "include",
      })

      router.replace("/agent")
    } catch (error) {
      router.replace("/agent")
    }
  }

  const getFirstName = (fullname: string) => {
    return fullname.split(" ")[0]
  }

  const getGradientColor = (name: string) => {
    const colors = [
      "from-blue-500 to-purple-600",
      "from-green-500 to-teal-600",
      "from-orange-500 to-red-600",
      "from-pink-500 to-rose-600",
      "from-indigo-500 to-blue-600",
      "from-yellow-500 to-orange-600",
    ]
    const index = name.charCodeAt(0) % colors.length
    return colors[index]
  }

  if (isVerifying) {
    return (
      <div className="min-h-screen bg-[#F5F1ED] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-white shadow-lg border-2 border-[#E5D5C5] flex items-center justify-center mx-auto mb-4 animate-pulse">
            <HelpCircle className="w-8 h-8 text-[#8B5A3C]" />
          </div>
          <p className="text-[#8B5A3C] font-medium">Verifying agent access...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F5F1ED]">
      {/* Header */}
      <header className="bg-white border-b border-[#E5D5C5] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#8B5A3C] flex items-center justify-center">
                <UserCheck className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-normal text-[#6D4530] tracking-wide">Ananthala Agent</h1>
                <p className="text-xs text-[#B8A396]">Dashboard</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {agentData && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-2 hover:opacity-80 transition-opacity focus:outline-none">
                      <div
                        className={`w-10 h-10 rounded-full bg-gradient-to-br ${getGradientColor(agentData.fullname)} flex items-center justify-center text-white font-medium shadow-md hover:shadow-lg transition-shadow`}
                      >
                        {agentData.fullname.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-sm text-[#6D4530] hidden sm:inline font-medium">
                        {getFirstName(agentData.fullname)}
                      </span>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 bg-white border-[#E5D5C5]">
                    <div className="px-3 py-2 border-b border-[#E5D5C5]">
                      <p className="text-sm font-medium text-[#6D4530]">{agentData.fullname}</p>
                      <p className="text-xs text-[#B8A396] mt-1">{agentData.email}</p>
                      <p className="text-xs text-[#8B5A3C] mt-1 font-medium">Agent Access</p>
                    </div>
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="text-[#8B5A3C] cursor-pointer hover:bg-[#F5F1ED] focus:bg-[#F5F1ED]"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-normal text-[#6D4530] mb-2">Dashboard Overview</h2>
          <p className="text-[#8B5A3C]">Manage your Ananthala agent portal</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <div
            onClick={handleCouponManagementClick}
            className="bg-white rounded-xl border border-[#E5D5C5] shadow-md p-8 hover:shadow-xl transition-all duration-200 cursor-pointer group hover:border-[#8B5A3C]"
          >
            <div className="flex items-start justify-between mb-6">
              <div className="w-16 h-16 rounded-xl bg-[#F5F1ED] flex items-center justify-center group-hover:bg-[#8B5A3C] transition-colors">
                <svg
                  className="w-8 h-8 text-[#8B5A3C] group-hover:text-white transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                  />
                </svg>
              </div>
            </div>
            <h3 className="text-[#6D4530] font-medium mb-3 text-2xl">Coupon Management</h3>
            <p className="text-[#B8A396] text-base leading-relaxed">Create and manage discount coupons</p>
          </div>
        </div>

        {/* Quick Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg border border-[#E5D5C5] p-5 shadow-sm hover:shadow-md transition-shadow">
            <p className="text-xs text-[#B8A396] uppercase tracking-wide mb-2 font-medium">Active Coupons</p>
            <p className="text-3xl font-medium text-[#6D4530]">0</p>
          </div>
          <div className="bg-white rounded-lg border border-[#E5D5C5] p-5 shadow-sm hover:shadow-md transition-shadow">
            <p className="text-xs text-[#B8A396] uppercase tracking-wide mb-2 font-medium">Used Today</p>
            <p className="text-3xl font-medium text-[#6D4530]">0</p>
          </div>
          <div className="bg-white rounded-lg border border-[#E5D5C5] p-5 shadow-sm hover:shadow-md transition-shadow">
            <p className="text-xs text-[#B8A396] uppercase tracking-wide mb-2 font-medium">Total Savings</p>
            <p className="text-3xl font-medium text-[#6D4530]">₹0</p>
          </div>
          <div className="bg-white rounded-lg border border-[#E5D5C5] p-5 shadow-sm hover:shadow-md transition-shadow">
            <p className="text-xs text-[#B8A396] uppercase tracking-wide mb-2 font-medium">Expiring Soon</p>
            <p className="text-3xl font-medium text-[#6D4530]">0</p>
          </div>
        </div>
      </main>
    </div>
  )
}
