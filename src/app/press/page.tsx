"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Calendar, ExternalLink } from "lucide-react"

const pressReleases = [
  {
    id: 1,
    title: "Ananthala Launches Revolutionary Organic Mattress Line",
    date: "January 10, 2025",
    source: "Business Weekly",
    excerpt:
      "Ananthala announces the launch of their new 100% organic mattress collection featuring advanced temperature regulation.",
  },
  {
    id: 2,
    title: "Sleep Better with Ananthala: Expert Reviews & Features",
    date: "December 28, 2024",
    source: "Health & Wellness Magazine",
    excerpt:
      "Industry experts praise Ananthala's commitment to quality and sustainability in the premium mattress market.",
  },
  {
    id: 3,
    title: "Ananthala Expands Dealer Network Across 15 States",
    date: "December 15, 2024",
    source: "Retail Today",
    excerpt: "The premium mattress manufacturer continues its rapid expansion with new dealer partnerships nationwide.",
  },
  {
    id: 4,
    title: "Sustainable Sleep: How Ananthala is Changing the Industry",
    date: "November 30, 2024",
    source: "Green Living Quarterly",
    excerpt: "An in-depth look at how Ananthala is combining luxury comfort with environmental responsibility.",
  },
  {
    id: 5,
    title: "Customer Satisfaction Report: Ananthala Leads Industry",
    date: "November 8, 2024",
    source: "Consumer Reviews Today",
    excerpt: "With a 98% satisfaction rate, Ananthala customers report the best sleep quality in independent study.",
  },
  {
    id: 6,
    title: "The Innovation Behind Ananthala's Pressure Relief Technology",
    date: "October 20, 2024",
    source: "Sleep Science Journal",
    excerpt: "Ananthala's patented pressure relief system provides optimal support across all body types.",
  },
]

export default function Press() {
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
          <div className="max-w-4xl mx-auto">
            <h2
              className="text-3xl md:text-4xl font-medium text-foreground mb-12 text-center"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Latest Press Releases
            </h2>
            <div className="space-y-6 md:space-y-8">
              {pressReleases.map((release) => (
                <a
                  key={release.id}
                  href="#"
                  className="bg-white p-6 md:p-8 border border-amber-100 hover:shadow-lg transition-all group"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-xl md:text-2xl font-medium text-foreground group-hover:text-[#8B5A3C] transition-colors mb-2">
                        {release.title}
                      </h3>
                      <p className="text-foreground/80 font-medium mb-4">{release.excerpt}</p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-amber-100 text-sm text-foreground/70 font-medium">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {release.date}
                      </span>
                      <span className="text-[#8B5A3C] font-semibold">{release.source}</span>
                    </div>
                    <ExternalLink className="w-4 h-4 text-[#8B5A3C]" />
                  </div>
                </a>
              ))}
            </div>
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
