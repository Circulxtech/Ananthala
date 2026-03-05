"use client"

import { useEffect, useMemo, useState } from "react"
import { Header } from "@/components/layout/header"

const LOADING_QUOTES = [
  "Good sleep is the foundation of a great day.",
  "Rest well. Live better.",
  "Luxury comfort is on the way.",
]

export function ProductDetailQuoteLoader() {
  const [quoteIndex, setQuoteIndex] = useState(0)
  const [visibleWordCount, setVisibleWordCount] = useState(0)
  const [showQuote, setShowQuote] = useState(false)

  const quote = useMemo(() => LOADING_QUOTES[quoteIndex % LOADING_QUOTES.length], [quoteIndex])
  const quoteWords = useMemo(() => quote.split(" "), [quote])
  const animatedQuote = useMemo(() => quoteWords.slice(0, visibleWordCount).join(" "), [quoteWords, visibleWordCount])

  useEffect(() => {
    const timer = window.setTimeout(() => setShowQuote(true), 300)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!showQuote) {
      return
    }

    setVisibleWordCount(0)

    let wordTimer = 0
    wordTimer = window.setInterval(() => {
      setVisibleWordCount((current) => {
        if (current >= quoteWords.length) {
          window.clearInterval(wordTimer)
          return current
        }
        return current + 1
      })
    }, 220)

    const nextQuoteTimer = window.setTimeout(() => {
      setQuoteIndex((current) => (current + 1) % LOADING_QUOTES.length)
    }, quoteWords.length * 220 + 1200)

    return () => {
      window.clearInterval(wordTimer)
      window.clearTimeout(nextQuoteTimer)
    }
  }, [quoteWords.length, showQuote])

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="min-h-[70vh] flex items-center justify-center px-6 py-6">
        <div className="max-w-2xl text-center">
          <p className="text-sm tracking-[0.1em] uppercase text-foreground/70 mb-5">
            Preparing your ANANTHALA Premium Products
          </p>
          {showQuote && (
            <blockquote className="text-2xl sm:text-3xl leading-snug text-foreground font-medium mb-6 transition-opacity duration-200 opacity-100">
              "{animatedQuote}"
            </blockquote>
          )}
          <div className="text-sm font-medium text-foreground mb-3">Loading details, sizes, and fabrics...</div>
          <div className="flex items-center justify-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#8B5A3C]/70 animate-loader-blink" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#8B5A3C]/70 animate-loader-blink [animation-delay:220ms]" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#8B5A3C]/70 animate-loader-blink [animation-delay:440ms]" />
          </div>
        </div>
      </main>
      <div className="h-32 bg-stone-50 border-t border-amber-100" />
    </div>
  )
}
