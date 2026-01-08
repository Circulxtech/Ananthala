import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ProductListingContent } from "@/app/_components/product-listing-content"

export default function BeddingPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <ProductListingContent category="bedding" />
      <Footer />
    </div>
  )
}








