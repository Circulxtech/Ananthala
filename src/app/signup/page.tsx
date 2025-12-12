"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle signup logic here
    console.log("Signup submitted")
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

        {/* Signup Form Card */}
        <div className="bg-white rounded-lg shadow-md p-8 md:p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name Field */}
            <div>
              <label htmlFor="fullname" className="block text-[#6D4530] text-base font-medium mb-3">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8B5A3C]">
                  <User className="h-5 w-5" />
                </div>
                <Input
                  id="fullname"
                  type="text"
                  placeholder="John Doe"
                  className="pl-12 h-12 bg-white border-[#E5D5C5] text-[#6D4530] placeholder:text-[#B8A396] focus:border-[#8B5A3C] focus:ring-[#8B5A3C]"
                  required
                />
              </div>
            </div>

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

            {/* Create Account Button */}
            <Button
              type="submit"
              className="w-full h-12 bg-[#8B5A3C] hover:bg-[#6D4530] text-white font-medium text-base transition-colors"
            >
              Create Account
            </Button>
          </form>

          {/* Sign In Link */}
          <p className="text-center mt-6 text-[#6D4530]">
            Already have an account?{" "}
            <Link href="/login" className="text-[#8B5A3C] hover:text-[#6D4530] font-medium transition-colors">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
