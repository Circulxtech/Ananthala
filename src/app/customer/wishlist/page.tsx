"use client"
import { Heart } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function WishlistPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">My Wishlist</h1>
        <p className="text-foregorund mt-1">Save your favorite products here</p>
      </div>

      <Card className="border" style={{ borderColor: "#D9CFC7" }}>
        <CardContent className="py-12">
          <div className="text-center">
            <Heart className="h-16 w-16 text-[#8B5A3C]/30 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Your wishlist is empty</h3>
            <p className="text-foreground mb-6">Add items you love to your wishlist</p>
            <a
              href="/"
              className="inline-block bg-[#EED9C4] text-foreground px-6 py-2 rounded-lg hover:bg-[#EED9C4]/80 transition-colors"
            >
              Browse Products
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
