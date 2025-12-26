"use client"

import { useState } from "react"
import { Bell, Lock, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SettingsPage() {
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [orderNotifications, setOrderNotifications] = useState(true)
  const [securityAlerts, setSecurityAlerts] = useState(true)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-semibold text-[#6D4530]">Settings</h1>
        <p className="text-[#8B5A3C]/70 mt-1">Manage your admin portal settings and preferences</p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="bg-white border" style={{ borderColor: "#D9CFC7" }}>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-6">
          <div className="bg-white rounded-lg border p-6" style={{ borderColor: "#D9CFC7" }}>
            <div className="flex items-center gap-3 mb-6">
              <Globe className="w-5 h-5 text-[#8B5A3C]" />
              <h2 className="text-lg font-semibold text-[#6D4530]">General Settings</h2>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="siteName">Site Name</Label>
                <Input id="siteName" defaultValue="Ananthala" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="siteEmail">Site Email</Label>
                <Input id="siteEmail" type="email" defaultValue="admin@ananthala.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sitePhone">Contact Phone</Label>
                <Input id="sitePhone" type="tel" defaultValue="+91 1234567890" />
              </div>
              <Button className="bg-[#8B5A3C] hover:bg-[#6D4530] text-white">Save Changes</Button>
            </div>
          </div>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications" className="space-y-6">
          <div className="bg-white rounded-lg border p-6" style={{ borderColor: "#D9CFC7" }}>
            <div className="flex items-center gap-3 mb-6">
              <Bell className="w-5 h-5 text-[#8B5A3C]" />
              <h2 className="text-lg font-semibold text-[#6D4530]">Notification Preferences</h2>
            </div>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-[#8B5A3C]/70">Receive email notifications for important updates</p>
                </div>
                <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Order Notifications</Label>
                  <p className="text-sm text-[#8B5A3C]/70">Get notified when new orders are placed</p>
                </div>
                <Switch checked={orderNotifications} onCheckedChange={setOrderNotifications} />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Security Alerts</Label>
                  <p className="text-sm text-[#8B5A3C]/70">Receive alerts about security-related events</p>
                </div>
                <Switch checked={securityAlerts} onCheckedChange={setSecurityAlerts} />
              </div>
              <Button className="bg-[#8B5A3C] hover:bg-[#6D4530] text-white">Save Preferences</Button>
            </div>
          </div>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security" className="space-y-6">
          <div className="bg-white rounded-lg border p-6" style={{ borderColor: "#D9CFC7" }}>
            <div className="flex items-center gap-3 mb-6">
              <Lock className="w-5 h-5 text-[#8B5A3C]" />
              <h2 className="text-lg font-semibold text-[#6D4530]">Security Settings</h2>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input id="currentPassword" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input id="newPassword" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input id="confirmPassword" type="password" />
              </div>
              <Button className="bg-[#8B5A3C] hover:bg-[#6D4530] text-white">Update Password</Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
