import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { AboutSection } from "@/components/sections/about-section"

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <AboutSection />
      <Footer />
    </div>
  )
}

