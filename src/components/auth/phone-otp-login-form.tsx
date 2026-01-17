"use client"

import type React from "react"
import { useState } from "react"
import { Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

export function PhoneOTPLoginForm() {
  const [step, setStep] = useState<"phone" | "otp">("phone")
  const [phone, setPhone] = useState("")
  const [otp, setOtp] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [maskedPhone, setMaskedPhone] = useState("")
  const router = useRouter()
  const { toast } = useToast()

  const handleSendOTP = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Validate phone number
    const phoneRegex = /^[0-9\-+$$$$\s]+$/
    if (!phoneRegex.test(phone) || phone.replace(/\D/g, "").length < 10) {
      toast({
        title: "Error",
        description: "Please enter a valid phone number",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, method: "phone" }),
      })

      const data = await response.json()

      if (data.success) {
        setMaskedPhone(data.maskedPhone)
        setStep("otp")
        toast({
          title: "Success",
          description: "OTP sent to your phone",
        })
      } else {
        toast({
          title: "Error",
          description: data.message || "Failed to send OTP",
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

  const handleVerifyOTP = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, otp, rememberMe }),
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
          description: data.message || "Invalid OTP",
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

  if (step === "phone") {
    return (
      <form onSubmit={handleSendOTP} className="space-y-6">
        <div>
          <label htmlFor="phone" className="block text-[#6D4530] text-sm md:text-base font-semibold mb-3">
            Phone Number
          </label>
          <div className="relative">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#8B5A3C]" />
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="+91 9876543210"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="pl-12 h-12 bg-white border-[#D9CFC7] text-[#6D4530] placeholder:text-[#B8A396] focus:border-[#8B5A3C] focus:ring-[#8B5A3C] text-base"
              required
              disabled={isLoading}
            />
          </div>
          <p className="text-xs text-[#8B5A3C] mt-2">We'll send a 4-digit OTP to your registered phone number</p>
        </div>

        <Button
          type="submit"
          className="w-full h-12 bg-[#8B5A3C] hover:bg-[#6D4530] text-white font-semibold text-base transition-colors"
          disabled={isLoading}
        >
          {isLoading ? "Sending OTP..." : "Send OTP"}
        </Button>
      </form>
    )
  }

  return (
    <form onSubmit={handleVerifyOTP} className="space-y-6">
      <div>
        <p className="text-[#6D4530] text-sm md:text-base font-semibold mb-3">Enter OTP</p>
        <p className="text-xs text-[#8B5A3C] mb-4">Code sent to {maskedPhone}</p>
        <InputOTP value={otp} onChange={setOtp} maxLength={4}>
          <InputOTPGroup className="flex justify-center gap-3">
            <InputOTPSlot
              index={0}
              className="h-12 w-12 text-base border-2 border-[#D9CFC7] focus:border-[#8B5A3C] focus:ring-2 focus:ring-[#8B5A3C]/20 rounded-lg"
            />
            <InputOTPSlot
              index={1}
              className="h-12 w-12 text-base border-2 border-[#D9CFC7] focus:border-[#8B5A3C] focus:ring-2 focus:ring-[#8B5A3C]/20 rounded-lg"
            />
            <InputOTPSlot
              index={2}
              className="h-12 w-12 text-base border-2 border-[#D9CFC7] focus:border-[#8B5A3C] focus:ring-2 focus:ring-[#8B5A3C]/20 rounded-lg"
            />
            <InputOTPSlot
              index={3}
              className="h-12 w-12 text-base border-2 border-[#D9CFC7] focus:border-[#8B5A3C] focus:ring-2 focus:ring-[#8B5A3C]/20 rounded-lg"
            />
          </InputOTPGroup>
        </InputOTP>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="remember"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
          className="w-4 h-4 rounded border-[#B8A396]"
          disabled={isLoading}
        />
        <label htmlFor="remember" className="text-xs md:text-sm text-[#6D4530] cursor-pointer select-none">
          Remember me
        </label>
      </div>

      <Button
        type="submit"
        className="w-full h-12 bg-[#8B5A3C] hover:bg-[#6D4530] text-white font-semibold text-base transition-colors"
        disabled={isLoading || otp.length !== 4}
      >
        {isLoading ? "Verifying..." : "Verify OTP"}
      </Button>

      <Button
        type="button"
        variant="ghost"
        className="w-full text-[#8B5A3C] hover:text-[#6D4530] hover:bg-[#F5F1ED]"
        onClick={() => {
          setStep("phone")
          setOtp("")
        }}
        disabled={isLoading}
      >
        Use different phone number
      </Button>
    </form>
  )
}
