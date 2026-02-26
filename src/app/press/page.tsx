"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Calendar, ExternalLink, Loader2 } from "lucide-react"
import Image from "next/image"

interface PressRelease {
  _id: string
  title: string
  subheading?: string
  content: string
  image: string
  externalLink?: string
  createdAt: string
}

export default function Press() {
  const [pressReleases, setPressReleases] = useState<PressRelease[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchPressReleases = async () => {
      try {
        console.log("[v0] Fetching press releases from /api/press")
        const response = await fetch("/api/press")
        console.log("[v0] API response status:", response.status)

        const data = await response.json()
        console.log("[v0] API response data:", data)

        if (data.success) {
          console.log("[v0] Setting press releases:", data.pressReleases)
          setPressReleases(data.pressReleases)
        } else {
          console.error("[v0] API returned success: false, message:", data.message)
        }
      } catch (error) {
        console.error("[v0] Error fetching press releases:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPressReleases()
  }, [])
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-stone-50 py-12 md:py-20 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h1
              className="text-4xl md:text-5xl font-medium text-foreground mb-4"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Press & Media
            </h1>
            <p className="text-lg md:text-xl text-foreground/90 max-w-2xl mx-auto font-medium">
              Discover what media and industry experts are saying about Ananthala.
            </p>
          </div>
        </section>

        {/* Press Kit CTA */}
        <section className="py-16 md:py-24 px-4 bg-white border-b border-amber-100">
          <div className="max-w-7xl mx-auto">
            <div className="bg-stone-50 p-8 md:p-12 border border-amber-100">
              <h2
                className="text-2xl md:text-3xl font-medium text-foreground mb-4"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Download Our Press Kit
              </h2>
              <p className="text-lg text-foreground/80 font-medium mb-6">
                Get high-resolution images, company logos, fact sheets, and more for media coverage.
              </p>
              <a
                href="#"
                className="inline-flex items-center gap-2 bg-[#8B5A3C] text-white font-medium px-8 py-3 hover:bg-[#6B563F] transition-colors"
              >
                Download Press Kit
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>

        {/* Press Releases */}
        <section className="py-16 md:py-24 px-4 bg-stone-50">
          <div className="max-w-5xl mx-auto">
            <h2
              className="text-3xl md:text-4xl font-medium text-foreground mb-12 text-center"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Latest Press Releases
            </h2>
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-[#8B5A3C]" />
              </div>
            ) : pressReleases.length === 0 ? (
              <div className="text-center py-12 bg-white p-8 rounded-lg border border-amber-100">
                <p className="text-foreground/70 text-lg">No press releases available at the moment.</p>
              </div>
            ) : (
              <div className="space-y-8">
                {pressReleases.map((release) => (
                  <div
                    key={release._id}
                    className="bg-white border border-amber-100 hover:shadow-lg transition-all group overflow-hidden rounded-lg flex flex-col md:flex-row"
                  >
                    {/* Image */}
                    <div className="md:w-1/3 relative h-48 md:h-auto min-h-64">
                      <Image
                        src={release.image}
                        alt={release.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
                      <div>
                        <h3 className="text-xl md:text-2xl font-medium text-foreground group-hover:text-[#8B5A3C] transition-colors mb-2">
                          {release.title}
                        </h3>
                        {release.subheading && (
                          <p className="text-foreground/80 font-medium mb-3 italic">{release.subheading}</p>
                        )}
                        <p className="text-foreground/70 font-medium line-clamp-3 mb-4">
                          {release.content.substring(0, 200)}...
                        </p>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-amber-100">
                        <span className="flex items-center gap-2 text-sm text-foreground/70 font-medium">
                          <Calendar className="w-4 h-4 text-[#8B5A3C]" />
                          {new Date(release.createdAt).toLocaleDateString()}
                        </span>
                        {release.externalLink && (
                          <a
                            href={release.externalLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-[#8B5A3C] font-medium hover:gap-3 transition-all"
                          >
                            Read More
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Media Contact */}
        <section className="py-16 md:py-24 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2
              className="text-3xl md:text-4xl font-medium text-foreground mb-8 text-center"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Media Inquiries
            </h2>
            <div className="bg-stone-50 p-8 md:p-12 border border-amber-100 text-center">
              <p className="text-lg text-foreground/80 font-medium mb-6">
                For press inquiries, interview requests, or media information, please contact:
              </p>
              <div className="space-y-3">
                <div>
                  <p className="text-foreground font-semibold">Sarah Johnson</p>
                  <p className="text-foreground/70 font-medium">Head of Communications</p>
                </div>
                <div>
                  <p className="text-lg text-[#8B5A3C] font-medium">press@ananthala.com</p>
                  <p className="text-lg text-[#8B5A3C] font-medium">1-800-SLEEP-WELL ext. 234</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
