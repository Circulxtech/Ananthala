import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Admin Portal - Ananthala",
  description: "Admin dashboard for managing Ananthala store",
  robots: "noindex, nofollow",
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
