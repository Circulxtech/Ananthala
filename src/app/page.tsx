import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { HeroSection } from "@/components/sections/hero-section"
import { CategorySliderSection } from "@/components/sections/category-slider-section"
import { ProductsSection } from "@/components/sections/products-section"
import { ComfortSection } from "@/components/sections/comfort-section"
import { ReviewsSection } from "@/components/sections/reviews-section"

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <CategorySliderSection />
        <ProductsSection />
        <ComfortSection />
        <ReviewsSection />
      </main>
      <Footer />
    </div>
  )
}
