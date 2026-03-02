"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { User, Mail, Phone, MapPin, Edit2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

interface UserProfile {
  id: string
  fullname: string
  email: string
  phone: string
  address: string
}

export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [isEditing, setIsEditing] = useState(true)
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("/api/customer/profile")
        const data = await response.json()

        if (data.success && data.user) {
          setUser(data.user)
          setPhone(data.user.phone || "")
          setAddress(data.user.address || "")
        } else {
          toast.error("Failed to load profile")
        }
      } catch (error) {
        console.error("Profile fetch failed:", error)
        toast.error("Failed to load profile")
      } finally {
        setLoading(false)
      }
    }
    fetchProfile()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setSaving(true)
    try {
      const response = await fetch("/api/customer/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone: phone.trim(),
          address: address.trim(),
        }),
      })

      const data = await response.json()

      if (data.success) {
        setUser(data.user)
        setIsEditing(false)
        toast.success("Profile updated successfully!", {
          description: "Your phone and address have been saved.",
        })
      } else {
        toast.error(data.message || "Failed to update profile")
      }
    } catch (error) {
      console.error("Profile update failed:", error)
      toast.error("Failed to update profile")
    } finally {
      setSaving(false)
    }
  }

  const handleEdit = () => {
    setIsEditing(true)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-foreground">Loading profile...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-3xl font-bold text-foreground">My Profile</h1>
        <p className="text-foreground mt-1">Manage your account information</p>
      </div>

      <Card className="border" style={{ borderColor: "#D9CFC7" }}>
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <User className="h-5 w-5" />
            Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullname" className="text-foreground">
                Full Name
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground" />
                <Input
                  id="fullname"
                  value={user?.fullname || ""}
                  disabled
                  className="pl-10 border-[#D9CFC7] bg-gray-50 cursor-not-allowed text-foreground"
                  title="Full name cannot be changed"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={user?.email || ""}
                  disabled
                  className="pl-10 border-[#D9CFC7] bg-gray-50 cursor-not-allowed text-foreground"
                  title="Email cannot be changed"
                />
              </div>
              <p className="text-xs text-foreground">Email cannot be changed</p>
            </div>

            <div className="space-y-2">
                <Label htmlFor="phone" className="text-foreground">
                Phone Number
              </Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground" />
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter your phone number"
                  className="pl-10 border-[#D9CFC7] focus-visible:ring-foreground"
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address" className="text-foreground">
                Address
              </Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-foreground" />
                <textarea
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter your address"
                  rows={3}
                  className="w-full pl-10 pr-3 py-2 border border-[#D9CFC7] rounded-md focus:outline-none focus:ring-2 focus:ring-foreground bg-background text-foreground disabled:bg-gray-50 disabled:cursor-not-allowed"
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div className="flex gap-3">
              {isEditing ? (
                <Button type="submit" className="flex-1 bg-[#EED9C4] hover:bg-[#EED9C4]/80 text-foreground" disabled={saving}>
                  {saving ? "Saving..." : "Save Changes"}
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={handleEdit}
                  className="flex-1 bg-[#EED9C4] hover:bg-[#EED9C4]/80 text-foreground"
                >
                  <Edit2 className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
