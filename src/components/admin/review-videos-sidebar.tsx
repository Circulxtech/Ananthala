import { Video } from "lucide-react"
import Link from "next/link"

export function ReviewVideosSidebarItem() {
  return (
    <Link
      href="/admin/review-videos"
      className="flex items-center gap-3 px-4 py-3 rounded-lg text-[#6D4530] hover:bg-[#8B5A3C]/10 hover:text-[#8B5A3C] transition-all duration-200"
    >
      <Video className="h-5 w-5" />
      <span className="font-medium">Review Videos</span>
    </Link>
  )
}
