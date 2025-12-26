"use client"

import { useState } from "react"
import { Save, User, Bell, Lock, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AgentSettingsPage() {
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(false)
  const [orderUpdates, setOrderUpdates] = useState(true)
  const [couponAlerts, setCouponAlerts] = useState(true)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#6D4530]">Settings</h1>
        <p className="text-[#8B5A3C]/70 mt-1">Manage your agent account settings and preferences</p>
      </div>

      {/* Settings Tabs */}
      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="bg-white border border-[#D9CFC7]">
          <TabsTrigger value="profile" className="data-[state=active]:bg-[#8B5A3C] data-[state=active]:text-white">
            <User className="h-4 w-4 mr-2" />
            Profile
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="data-[state=active]:bg-[#8B5A3C] data-[state=active]:text-white"
          >
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="data-[state=active]:bg-[#8B5A3C] data-[state=active]:text-white">
            <Lock className="h-4 w-4 mr-2" />
            Security
          </TabsTrigger>
          <TabsTrigger value="preferences" className="data-[state=active]:bg-[#8B5A3C] data-[state=active]:text-white">
            <Globe className="h-4 w-4 mr-2" />
            Preferences
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          <Card className="border-[#D9CFC7]">
            <CardHeader>
              <CardTitle className="text-[#6D4530]">Profile Information</CardTitle>
              <CardDescription className="text-[#8B5A3C]/70">
                Update your personal information and contact details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullname" className="text-[#6D4530]">
                    Full Name
                  </Label>
                  <Input id="fullname" placeholder="John Doe" className="border-[#D9CFC7] focus:border-[#8B5A3C]" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-[#6D4530]">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    className="border-[#D9CFC7] focus:border-[#8B5A3C]"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-[#6D4530]">
                    Phone Number
                  </Label>
                  <Input id="phone" placeholder="+91 1234567890" className="border-[#D9CFC7] focus:border-[#8B5A3C]" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role" className="text-[#6D4530]">
                    Role
                  </Label>
                  <Input id="role" value="Agent" disabled className="border-[#D9CFC7] bg-[#F5F1ED]" />
                </div>
              </div>
              <Button className="bg-[#8B5A3C] hover:bg-[#6D4530] text-white">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <Card className="border-[#D9CFC7]">
            <CardHeader>
              <CardTitle className="text-[#6D4530]">Notification Preferences</CardTitle>
              <CardDescription className="text-[#8B5A3C]/70">
                Choose how you want to receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notifications" className="text-[#6D4530]">
                    Email Notifications
                  </Label>
                  <p className="text-sm text-[#8B5A3C]/70">Receive notifications via email</p>
                </div>
                <Switch id="email-notifications" checked={emailNotifications} onCheckedChange={setEmailNotifications} />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="push-notifications" className="text-[#6D4530]">
                    Push Notifications
                  </Label>
                  <p className="text-sm text-[#8B5A3C]/70">Receive browser push notifications</p>
                </div>
                <Switch id="push-notifications" checked={pushNotifications} onCheckedChange={setPushNotifications} />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="order-updates" className="text-[#6D4530]">
                    Order Updates
                  </Label>
                  <p className="text-sm text-[#8B5A3C]/70">Get notified about order status changes</p>
                </div>
                <Switch id="order-updates" checked={orderUpdates} onCheckedChange={setOrderUpdates} />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="coupon-alerts" className="text-[#6D4530]">
                    Coupon Alerts
                  </Label>
                  <p className="text-sm text-[#8B5A3C]/70">Get alerts when coupons are expiring</p>
                </div>
                <Switch id="coupon-alerts" checked={couponAlerts} onCheckedChange={setCouponAlerts} />
              </div>
              <Button className="bg-[#8B5A3C] hover:bg-[#6D4530] text-white">
                <Save className="h-4 w-4 mr-2" />
                Save Preferences
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-6">
          <Card className="border-[#D9CFC7]">
            <CardHeader>
              <CardTitle className="text-[#6D4530]">Change Password</CardTitle>
              <CardDescription className="text-[#8B5A3C]/70">
                Update your password to keep your account secure
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password" className="text-[#6D4530]">
                  Current Password
                </Label>
                <Input id="current-password" type="password" className="border-[#D9CFC7] focus:border-[#8B5A3C]" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password" className="text-[#6D4530]">
                  New Password
                </Label>
                <Input id="new-password" type="password" className="border-[#D9CFC7] focus:border-[#8B5A3C]" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password" className="text-[#6D4530]">
                  Confirm New Password
                </Label>
                <Input id="confirm-password" type="password" className="border-[#D9CFC7] focus:border-[#8B5A3C]" />
              </div>
              <Button className="bg-[#8B5A3C] hover:bg-[#6D4530] text-white">
                <Lock className="h-4 w-4 mr-2" />
                Update Password
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Preferences Tab */}
        <TabsContent value="preferences" className="space-y-6">
          <Card className="border-[#D9CFC7]">
            <CardHeader>
              <CardTitle className="text-[#6D4530]">General Preferences</CardTitle>
              <CardDescription className="text-[#8B5A3C]/70">Customize your agent portal experience</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="language" className="text-[#6D4530]">
                  Language
                </Label>
                <Input id="language" value="English (US)" disabled className="border-[#D9CFC7] bg-[#F5F1ED]" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="timezone" className="text-[#6D4530]">
                  Timezone
                </Label>
                <Input id="timezone" value="Asia/Kolkata (IST)" disabled className="border-[#D9CFC7] bg-[#F5F1ED]" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="currency" className="text-[#6D4530]">
                  Currency
                </Label>
                <Input id="currency" value="Indian Rupee (₹)" disabled className="border-[#D9CFC7] bg-[#F5F1ED]" />
              </div>
              <Button className="bg-[#8B5A3C] hover:bg-[#6D4530] text-white">
                <Save className="h-4 w-4 mr-2" />
                Save Preferences
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
