import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { HeroSection } from "@/components/sections/hero-section"
import { FeaturesSection } from "@/components/sections/features-section"
import { ProductsSection } from "@/components/sections/products-section"
import { ReviewsSection } from "@/components/sections/reviews-section"

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <ProductsSection />
        <ReviewsSection />
      </main>
      <Footer />
    </div>
  )
}
