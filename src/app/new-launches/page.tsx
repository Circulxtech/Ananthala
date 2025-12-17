import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ProductListing } from "@/components/sections/product-listing"

export default function NewLaunchesPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <ProductListing />
      <Footer />
    </div>
  )
}


