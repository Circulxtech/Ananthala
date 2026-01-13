"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Mail, Lock, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, rememberMe }),
      })

      const data = await response.json()

      if (data.success) {
        toast({
          title: "Success",
          description: "Login successful! Redirecting...",
        })
        setTimeout(() => {
          router.push("/")
          router.refresh()
        }, 1000)
      } else {
        toast({
          title: "Error",
          description: data.message || "Login failed. Please try again.",
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
    <div className="min-h-screen bg-[#F5F1ED] flex items-center justify-center px-4 py-12 md:py-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8 md:mb-12">
          <Link href="/" className="inline-block hover:opacity-80 transition-opacity">
            <img src="/logo.png" alt="Ananthala" className="h-16 md:h-20 w-auto mx-auto" />
          </Link>
        </div>

        {/* Login Form Card */}
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-10 border border-[#E5D5C5]">
          <h1 className="text-2xl md:text-3xl font-serif text-[#6D4530] mb-8 text-center font-cormorant">Sign In</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-[#6D4530] text-sm md:text-base font-semibold mb-3">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#8B5A3C]" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your.email@example.com"
                  className="pl-12 h-12 bg-white border-[#D9CFC7] text-[#6D4530] placeholder:text-[#B8A396] focus:border-[#8B5A3C] focus:ring-[#8B5A3C] text-base"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-[#6D4530] text-sm md:text-base font-semibold mb-3">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#8B5A3C]" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pl-12 pr-12 h-12 bg-white border-[#D9CFC7] text-[#6D4530] placeholder:text-[#B8A396] focus:border-[#8B5A3C] focus:ring-[#8B5A3C] text-base"
                  required
                  disabled={isLoading}
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
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  className="border-[#B8A396] data-[state=checked]:bg-[#8B5A3C]"
                  disabled={isLoading}
                />
                <label htmlFor="remember" className="text-xs md:text-sm text-[#6D4530] cursor-pointer select-none">
                  Remember me
                </label>
              </div>
              <Link
                href="/forgot-password"
                className="text-xs md:text-sm text-[#8B5A3C] hover:text-[#6D4530] transition-colors font-medium"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Sign In Button */}
            <Button
              type="submit"
              className="w-full h-12 bg-[#8B5A3C] hover:bg-[#6D4530] text-white font-semibold text-base transition-colors"
              disabled={isLoading}
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </Button>
          </form>

          {/* Sign Up Link */}
          <p className="text-center mt-6 text-[#6D4530] text-sm md:text-base">
            Don't have an account?{" "}
            <Link href="/signup" className="text-[#8B5A3C] hover:text-[#6D4530] font-semibold transition-colors">
              Sign Up
            </Link>
          </p>
        </div>

        {/* Footer Note */}
        <p className="text-center mt-6 text-[#8B5A3C] text-xs md:text-sm">
          By signing in, you agree to our{" "}
          <Link href="/policy-terms" className="underline hover:no-underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/policy-privacy" className="underline hover:no-underline">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  )
}
