"use client"

import { Lock } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import SecurityPasswordForm from "@/components/agent/security-password-form"

export default function AgentSettingsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#6D4530]">Settings</h1>
        <p className="text-[#8B5A3C]/70 mt-1">Manage your account security</p>
      </div>

      {/* Security Section */}
      <Card className="border-[#D9CFC7]">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Lock className="h-5 w-5 text-[#8B5A3C]" />
            <div>
              <CardTitle className="text-[#6D4530]">Change Password</CardTitle>
              <CardDescription className="text-[#8B5A3C]/70">
                Update your password to keep your account secure
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <SecurityPasswordForm />
        </CardContent>
      </Card>
    </div>
  )
}
