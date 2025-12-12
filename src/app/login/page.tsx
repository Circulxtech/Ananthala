"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Mail, Lock, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle login logic here
    console.log("Login submitted")
  }

  return (
    <div className="min-h-screen bg-[#F5F1ED] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <span className="text-[#8B5A3C] text-2xl font-normal tracking-wider">ANANTHALA</span>
          </Link>
        </div>

        {/* Login Form Card */}
        <div className="bg-white rounded-lg shadow-md p-8 md:p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Address Field */}
            <div>
              <label htmlFor="email" className="block text-[#6D4530] text-base font-medium mb-3">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8B5A3C]">
                  <Mail className="h-5 w-5" />
                </div>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  className="pl-12 h-12 bg-white border-[#E5D5C5] text-[#6D4530] placeholder:text-[#B8A396] focus:border-[#8B5A3C] focus:ring-[#8B5A3C]"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-[#6D4530] text-base font-medium mb-3">
                Password
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8B5A3C]">
                  <Lock className="h-5 w-5" />
                </div>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pl-12 pr-12 h-12 bg-white border-[#E5D5C5] text-[#6D4530] placeholder:text-[#B8A396] focus:border-[#8B5A3C] focus:ring-[#8B5A3C]"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#B8A396] hover:text-[#8B5A3C] transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                </button>
              </div>
            </div>

            {/* Remember Me and Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  className="border-[#B8A396] data-[state=checked]:bg-[#8B5A3C] data-[state=checked]:border-[#8B5A3C]"
                />
                <label htmlFor="remember" className="text-sm text-[#6D4530] cursor-pointer select-none">
                  Remember me
                </label>
              </div>
              <Link href="/forgot-password" className="text-sm text-[#8B5A3C] hover:text-[#6D4530] transition-colors">
                Forgot Password?
              </Link>
            </div>

            {/* Sign In Button */}
            <Button
              type="submit"
              className="w-full h-12 bg-[#8B5A3C] hover:bg-[#6D4530] text-white font-medium text-base transition-colors"
            >
              Sign In
            </Button>
          </form>

          {/* Sign Up Link */}
          <p className="text-center mt-6 text-[#6D4530]">
            Don't have an account?{" "}
            <Link href="/signup" className="text-[#8B5A3C] hover:text-[#6D4530] font-medium transition-colors">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
