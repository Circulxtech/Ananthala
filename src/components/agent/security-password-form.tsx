"use client"

import type React from "react"

import { useState } from "react"
import { Eye, EyeOff, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function SecurityPasswordForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // Form state
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  // Message state
  const [successMessage, setSuccessMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  // Validation helpers
  const isPasswordValid = newPassword.length >= 6
  const passwordsMatch = newPassword === confirmPassword && newPassword.length > 0
  const isFormValid = currentPassword && newPassword && confirmPassword && isPasswordValid && passwordsMatch

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSuccessMessage("")
    setErrorMessage("")

    if (!isFormValid) {
      setErrorMessage("Please fill all fields correctly.")
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/auth/agent/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          currentPassword,
          newPassword,
          confirmPassword,
        }),
      })

      const data = await response.json()

      if (data.success) {
        setSuccessMessage(data.message)
        // Clear form
        setCurrentPassword("")
        setNewPassword("")
        setConfirmPassword("")

        // Clear success message after 3 seconds
        setTimeout(() => {
          setSuccessMessage("")
        }, 3000)
      } else {
        setErrorMessage(data.message || "Failed to update password.")
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.")
      console.error("Error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      {/* Success Message */}
      {successMessage && (
        <div className="p-4 rounded-lg bg-green-50 border border-green-200 flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-green-700">{successMessage}</p>
        </div>
      )}

      {/* Error Message */}
      {errorMessage && (
        <div className="p-4 rounded-lg bg-red-50 border border-red-200 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-red-700">{errorMessage}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Current Password */}
        <div className="space-y-2">
          <Label htmlFor="agent-current-password" className="text-[#6D4530]">
            Current Password <span className="text-red-500">*</span>
          </Label>
          <div className="relative">
            <Input
              id="agent-current-password"
              type={showCurrentPassword ? "text" : "password"}
              placeholder="Enter current password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="pr-10 border-[#D9CFC7] focus:border-[#8B5A3C] text-[#6D4530]"
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8B5A3C]/60 hover:text-[#8B5A3C]"
            >
              {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* New Password */}
        <div className="space-y-2">
          <Label htmlFor="agent-new-password" className="text-[#6D4530]">
            New Password <span className="text-red-500">*</span>
          </Label>
          <div className="relative">
            <Input
              id="agent-new-password"
              type={showNewPassword ? "text" : "password"}
              placeholder="Enter new password (min 6 characters)"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="pr-10 border-[#D9CFC7] focus:border-[#8B5A3C] text-[#6D4530]"
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8B5A3C]/60 hover:text-[#8B5A3C]"
            >
              {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {newPassword && !isPasswordValid && (
            <p className="text-xs text-red-600">Password must be at least 6 characters</p>
          )}
          {newPassword && isPasswordValid && <p className="text-xs text-green-600">Password strength: Good</p>}
        </div>

        {/* Confirm Password */}
        <div className="space-y-2">
          <Label htmlFor="agent-confirm-password" className="text-[#6D4530]">
            Confirm New Password <span className="text-red-500">*</span>
          </Label>
          <div className="relative">
            <Input
              id="agent-confirm-password"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Re-enter new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="pr-10 border-[#D9CFC7] focus:border-[#8B5A3C] text-[#6D4530]"
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8B5A3C]/60 hover:text-[#8B5A3C]"
            >
              {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {confirmPassword && !passwordsMatch && <p className="text-xs text-red-600">Passwords do not match</p>}
          {confirmPassword && passwordsMatch && <p className="text-xs text-green-600">Passwords match</p>}
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-4">
          <Button
            type="submit"
            disabled={!isFormValid || isLoading}
            className="flex-1 bg-[#8B5A3C] hover:bg-[#6D4530] text-white disabled:opacity-50"
          >
            {isLoading ? "Updating..." : "Update Password"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setCurrentPassword("")
              setNewPassword("")
              setConfirmPassword("")
              setErrorMessage("")
              setSuccessMessage("")
            }}
            disabled={isLoading}
            className="px-6 border-[#D9CFC7] text-[#6D4530]"
          >
            Clear
          </Button>
        </div>
      </form>
    </div>
  )
}
