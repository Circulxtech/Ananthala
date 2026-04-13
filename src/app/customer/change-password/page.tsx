"use client"

import type React from "react"
import { useState } from "react"
import { Lock, Eye, EyeOff, AlertCircle, CheckCircle2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { validatePassword, PASSWORD_REQUIREMENTS } from "@/lib/password-validation"

export default function ChangePasswordPage() {
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [passwordValidation, setPasswordValidation] = useState({ isValid: false, errors: [], strength: "weak" as const })
  const [passwordsMatch, setPasswordsMatch] = useState(false)

  const handlePasswordChange = (value: string) => {
    setNewPassword(value)
    const validation = validatePassword(value)
    setPasswordValidation(validation)
  }

  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value)
    setPasswordsMatch(value === newPassword && value.length > 0)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!currentPassword.trim()) {
      toast.error("Please enter your current password")
      return
    }

    if (!passwordValidation.isValid) {
      toast.error("Password does not meet requirements")
      return
    }

    if (!passwordsMatch) {
      toast.error("Passwords do not match")
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch("/api/auth/admin/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentPassword: currentPassword.trim(),
          newPassword: newPassword.trim(),
        }),
      })

      const data = await response.json()

      if (data.success) {
        toast.success("Password changed successfully!")
        setCurrentPassword("")
        setNewPassword("")
        setConfirmPassword("")
        setPasswordValidation({ isValid: false, errors: [], strength: "weak" as const })
        setPasswordsMatch(false)
      } else {
        toast.error(data.message || "Failed to change password")
      }
    } catch (error) {
      console.error("Password change failed:", error)
      toast.error("Failed to change password")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Change Password</h1>
        <p className="text-foreground mt-1">Update your account password</p>
      </div>

      <Card className="border" style={{ borderColor: "#D9CFC7" }}>
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Lock className="h-5 w-5" />
            Password Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password" className="text-foreground">
                Current Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground" />
                <Input
                  id="current-password"
                  type={showCurrentPassword ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter your current password"
                  className="pl-10 pr-10 border-[#D9CFC7] focus-visible:ring-foreground"
                  disabled={isLoading}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground hover:text-foreground"
                  disabled={isLoading}
                >
                  {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="new-password" className="text-foreground">
                New Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground" />
                <Input
                  id="new-password"
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => handlePasswordChange(e.target.value)}
                  placeholder="Enter new password"
                  className="pl-10 pr-10 border-[#D9CFC7] focus-visible:ring-foreground"
                  disabled={isLoading}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground hover:text-foreground"
                  disabled={isLoading}
                >
                  {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>

              {/* Password Requirements */}
              <div className="mt-3 p-3 bg-gray-50 rounded-md border border-gray-200">
                <p className="text-xs font-semibold text-foreground mb-2">Password must contain:</p>
                <ul className="space-y-1 text-xs">
                  <li className="flex items-center gap-2">
                    {newPassword.length >= PASSWORD_REQUIREMENTS.minLength ? (
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-gray-400" />
                    )}
                    <span className={newPassword.length >= PASSWORD_REQUIREMENTS.minLength ? "text-green-600" : "text-foreground"}>
                      At least 8 characters
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    {PASSWORD_REQUIREMENTS.uppercase.test(newPassword) ? (
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-gray-400" />
                    )}
                    <span className={PASSWORD_REQUIREMENTS.uppercase.test(newPassword) ? "text-green-600" : "text-foreground"}>
                      One uppercase letter (A-Z)
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    {PASSWORD_REQUIREMENTS.lowercase.test(newPassword) ? (
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-gray-400" />
                    )}
                    <span className={PASSWORD_REQUIREMENTS.lowercase.test(newPassword) ? "text-green-600" : "text-foreground"}>
                      One lowercase letter (a-z)
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    {PASSWORD_REQUIREMENTS.number.test(newPassword) ? (
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-gray-400" />
                    )}
                    <span className={PASSWORD_REQUIREMENTS.number.test(newPassword) ? "text-green-600" : "text-foreground"}>
                      One number (0-9)
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    {PASSWORD_REQUIREMENTS.special.test(newPassword) ? (
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-gray-400" />
                    )}
                    <span className={PASSWORD_REQUIREMENTS.special.test(newPassword) ? "text-green-600" : "text-foreground"}>
                      One special character (!@#$%&_*)
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm-password" className="text-foreground">
                Confirm New Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground" />
                <Input
                  id="confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => handleConfirmPasswordChange(e.target.value)}
                  placeholder="Confirm new password"
                  className="pl-10 pr-10 border-[#D9CFC7] focus-visible:ring-foreground"
                  disabled={isLoading}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground hover:text-foreground"
                  disabled={isLoading}
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {confirmPassword && (
                <p className={`text-xs mt-1 ${passwordsMatch ? "text-green-600" : "text-red-600"}`}>
                  {passwordsMatch ? "Passwords match" : "Passwords do not match"}
                </p>
              )}
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                disabled={isLoading || !passwordValidation.isValid || !passwordsMatch || !currentPassword}
                className="w-full bg-[#EED9C4] hover:bg-[#EED9C4]/80 text-foreground disabled:opacity-50"
              >
                {isLoading ? "Updating..." : "Update Password"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
