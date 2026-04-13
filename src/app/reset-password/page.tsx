"use client"

import type React from "react"
import { useState, useEffect, Suspense } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Lock, Eye, EyeOff, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"

function ResetPasswordForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [passwordsMatch, setPasswordsMatch] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()

  const email = searchParams.get("email")

  useEffect(() => {
    // Redirect if no email provided
    if (!email) {
      toast({
        title: "Error",
        description: "Invalid access. Please start from forgot password page.",
        variant: "destructive",
      })
      router.push("/forgot-password")
    }
  }, [email, router, toast])

  useEffect(() => {
    // Check if passwords match and are not empty
    if (newPassword && confirmPassword && newPassword === confirmPassword) {
      setPasswordsMatch(true)
    } else {
      setPasswordsMatch(false)
    }
  }, [newPassword, confirmPassword])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!email) {
      toast({
        title: "Error",
        description: "Invalid access. Please try again.",
        variant: "destructive",
      })
      return
    }

    if (!passwordsMatch) {
      toast({
        title: "Error",
        description: "Passwords do not match.",
        variant: "destructive",
      })
      return
    }

    if (newPassword.length < 6) {
      toast({
        title: "Error",
        description: "Password must be at least 6 characters.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, newPassword }),
      })

      const data = await response.json()

      if (data.success) {
        toast({
          title: "Success",
          description: "Password reset successful! Redirecting to login...",
        })
        setTimeout(() => {
          router.push("/login")
        }, 2000)
      } else {
        toast({
          title: "Error",
          description: data.message || "Failed to reset password. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#F5F1ED] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <img
              src="/logo.png"
              alt="Ananthala"
              className="h-16 md:h-20 w-auto mx-auto mix-blend-multiply"
            />
          </Link>
        </div>

        {/* Reset Password Card */}
        <div className="bg-white rounded-lg shadow-md p-8 md:p-10">
          {/* Heading */}
          <div className="mb-6">
            <h1 className="text-2xl font-medium text-[#6D4530] mb-2">Reset Password</h1>
            <p className="text-[#B8A396] text-sm">Enter your new password below.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* New Password Field */}
            <div>
              <label htmlFor="newPassword" className="block text-[#6D4530] text-base font-medium mb-3">
                New Password
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8B5A3C]">
                  <Lock className="h-5 w-5" />
                </div>
                <Input
                  id="newPassword"
                  name="newPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="pl-12 pr-12 h-12 bg-white border-[#E5D5C5] text-[#6D4530] placeholder:text-[#B8A396] focus:border-[#8B5A3C] focus:ring-[#8B5A3C]"
                  required
                  disabled={isLoading}
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#B8A396] hover:text-[#8B5A3C] transition-colors"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                </button>
              </div>
              <p className="text-xs text-[#B8A396] mt-1.5">Must be at least 6 characters</p>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-[#6D4530] text-base font-medium mb-3">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8B5A3C]">
                  <Lock className="h-5 w-5" />
                </div>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-12 pr-16 h-12 bg-white border-[#E5D5C5] text-[#6D4530] placeholder:text-[#B8A396] focus:border-[#8B5A3C] focus:ring-[#8B5A3C]"
                  required
                  disabled={isLoading}
                  minLength={6}
                />
                {/* Match Indicator */}
                {confirmPassword && (
                  <div
                    className={`absolute right-12 top-1/2 -translate-y-1/2 ${passwordsMatch ? "text-green-600" : "text-red-500"}`}
                  >
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#B8A396] hover:text-[#8B5A3C] transition-colors"
                  disabled={isLoading}
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  <span className="sr-only">{showConfirmPassword ? "Hide password" : "Show password"}</span>
                </button>
              </div>
              {confirmPassword && (
                <p className={`text-xs mt-1.5 ${passwordsMatch ? "text-green-600" : "text-red-500"}`}>
                  {passwordsMatch ? "Passwords match" : "Passwords do not match"}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full h-12 bg-[#8B5A3C] hover:bg-[#6D4530] text-white font-medium text-base transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading || !passwordsMatch || !newPassword || !confirmPassword}
            >
              {isLoading ? "Resetting Password..." : "Reset Password"}
            </Button>
          </form>

          {/* Additional Help */}
          <div className="mt-6 text-center">
            <p className="text-sm text-[#B8A396]">
              Remember your password?{" "}
              <Link href="/login" className="text-[#8B5A3C] hover:text-[#6D4530] font-medium transition-colors">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F5F1ED] flex items-center justify-center">
          <div className="text-[#8B5A3C]">Loading...</div>
        </div>
      }
    >
      <ResetPasswordForm />
    </Suspense>
  )
}
