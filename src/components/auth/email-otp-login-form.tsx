"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

export function EmailOTPLoginForm() {
  const [step, setStep] = useState<"email" | "otp">("email")
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [maskedEmail, setMaskedEmail] = useState("")
  const [redirectUrl, setRedirectUrl] = useState<string>("/")
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()

  useEffect(() => {
    const redirect = searchParams.get("redirect")
    if (redirect) {
      setRedirectUrl(redirect)
    }
  }, [searchParams])

  const handleSendOTP = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, method: "email" }),
      })

      const data = await response.json()

      if (data.success) {
        setMaskedEmail(data.maskedEmail)
        setStep("otp")
        toast({
          title: "Success",
          description: "OTP sent to your email",
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
        body: JSON.stringify({ email, otp, rememberMe }),
      })

      const data = await response.json()

      if (data.success) {
        toast({
          title: "Success",
          description: "Login successful! Redirecting...",
        })
        setTimeout(() => {
          router.push(redirectUrl)
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

  if (step === "email") {
    return (
      <form onSubmit={handleSendOTP} className="space-y-6 font-roboto">
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
              placeholder=""
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-12 h-12 bg-white border-[#D9CFC7] text-[#000000] placeholder:text-[#000000] focus:border-[#8B5A3C] focus:ring-[#8B5A3C] text-base font-semibold mb-3"
              required
              disabled={isLoading}
            />
          </div>
          <p className="text-xs text-[#8B5A3C] mt-2">We'll send a 4-digit OTP to your email</p>
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
    <form onSubmit={handleVerifyOTP} className="space-y-6 font-roboto">
      <div>
        <p className="text-[#6D4530] text-sm md:text-base font-semibold mb-3">Enter OTP</p>
        <p className="text-xs text-[#8B5A3C] mb-4">Code sent to {maskedEmail}</p>
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
          setStep("email")
          setOtp("")
        }}
        disabled={isLoading}
      >
        Use different email
      </Button>
    </form>
  )
}
