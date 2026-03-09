"use client"

import { Suspense } from "react"
import { PasswordLoginForm } from "./password-login-form"
import { EmailOTPLoginForm } from "./email-otp-login-form"
import { PhoneOTPLoginForm } from "./phone-otp-login-form"

interface LoginFormsWrapperProps {
  activeTab: "password" | "email-otp" | "phone-otp"
}

function FormLoadingFallback() {
  return (
    <div className="flex items-center justify-center py-8">
      <div className="text-center">
        <div className="inline-block animate-spin mb-3">
          <div className="w-8 h-8 border-3 border-[#D9CFC7] border-t-[#8B5A3C] rounded-full"></div>
        </div>
        <p className="text-[#6D4530] text-sm">Loading form...</p>
      </div>
    </div>
  )
}

export function LoginFormsWrapper({ activeTab }: LoginFormsWrapperProps) {
  return (
    <div className="transition-all duration-300">
      <Suspense fallback={<FormLoadingFallback />}>
        {activeTab === "password" && <PasswordLoginForm />}
      </Suspense>
      <Suspense fallback={<FormLoadingFallback />}>
        {activeTab === "email-otp" && <EmailOTPLoginForm />}
      </Suspense>
      <Suspense fallback={<FormLoadingFallback />}>
        {activeTab === "phone-otp" && <PhoneOTPLoginForm />}
      </Suspense>
    </div>
  )
}
