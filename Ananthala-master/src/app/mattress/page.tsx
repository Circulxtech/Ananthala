import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ProductListingContent } from "@/app/_components/product-listing-content"

export default function MattressPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <ProductListingContent category="mattress" />
      <Footer />
    </div>
  )
}








