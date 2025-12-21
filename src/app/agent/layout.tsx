import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Agent Portal - Ananthala",
  description: "Secure agent portal for Ananthala customer support",
  robots: "noindex, nofollow",
}

export default function AgentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
