"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, ArrowLeft, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { useParams } from "next/navigation"

interface Blog {
  _id: string
  title: string
  excerpt: string
  content: string
  image: string
  author: string
  category: string
  tags: string[]
  slug: string
  featured: boolean
  createdAt: string
  updatedAt: string
}

export default function BlogDetailPage() {
  const params = useParams()
  const slug = params?.slug as string
  const [blog, setBlog] = useState<Blog | null>(null)
  const [loading, setLoading] = useState(true)
  const [readingTime, setReadingTime] = useState(0)

  useEffect(() => {
    if (slug) {
      fetchBlog()
    }
  }, [slug])

  const fetchBlog = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/blogs/${slug}`)
      const result = await response.json()

      if (result.success) {
        setBlog(result.data)
        // Calculate reading time (average 200 words per minute)
        const wordCount = result.data.content.split(/\s+/).length
        setReadingTime(Math.ceil(wordCount / 200))
      }
    } catch (error) {
      console.error("Error fetching blog:", error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse">
              <div className="h-8 bg-stone-200 rounded mb-6 w-32" />
              <div className="aspect-video bg-stone-200 rounded-lg mb-8" />
              <div className="h-10 bg-stone-200 rounded mb-4" />
              <div className="h-4 bg-stone-200 rounded mb-6 w-48" />
              <div className="space-y-3">
                <div className="h-4 bg-stone-200 rounded" />
                <div className="h-4 bg-stone-200 rounded" />
                <div className="h-4 bg-stone-200 rounded w-5/6" />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="py-12 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl font-semibold text-foreground mb-4">Blog not found</h1>
            <p className="text-foreground/70 mb-8 font-medium">The blog post you're looking for doesn't exist.</p>
            <Button asChild className="bg-[#8B5A3C] hover:bg-[#6D4530]">
              <Link href="/blog">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        {/* Back Button */}
        <div className="max-w-4xl mx-auto px-4 pt-8">
          <Button asChild variant="ghost" className="text-[#8B5A3C] hover:text-[#6D4530] hover:bg-stone-100">
            <Link href="/blog">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Link>
          </Button>
        </div>

        {/* Blog Content */}
        <article className="py-8 px-4">
          <div className="max-w-4xl mx-auto">
            {/* Hero Image */}
            <div className="relative aspect-video rounded-lg overflow-hidden mb-8 shadow-lg">
              <Image src={blog.image || "/placeholder.svg"} alt={blog.title} fill className="object-cover" />
              {blog.featured && (
                <Badge className="absolute top-4 left-4 bg-[#8B5A3C] hover:bg-[#6D4530]">Featured</Badge>
              )}
            </div>

            {/* Category Badge */}
            <Badge variant="outline" className="mb-4 border-[#8B5A3C] text-[#8B5A3C]">
              {blog.category}
            </Badge>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-6 text-balance">
              {blog.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm text-foreground/70 mb-8 pb-8 border-b border-stone-200">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span className="font-medium">{blog.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span className="font-medium">{formatDate(blog.createdAt)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span className="font-medium">{readingTime} min read</span>
              </div>
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-foreground/80 mb-8 font-medium leading-relaxed">{blog.excerpt}</p>
              <div
                className="text-foreground/90 leading-relaxed font-medium whitespace-pre-line"
                style={{ fontSize: "1.0625rem", lineHeight: "1.75" }}
              >
                {blog.content}
              </div>
            </div>

            {/* Tags */}
            {blog.tags && blog.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-stone-200">
                <h3 className="text-sm font-semibold text-foreground mb-3">Tags:</h3>
                <div className="flex flex-wrap gap-2">
                  {blog.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="bg-stone-100 text-foreground hover:bg-stone-200">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </article>

        {/* CTA Section */}
        <section className="bg-stone-50 py-16 px-4 mt-12">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-semibold text-foreground mb-4">Ready for Better Sleep?</h2>
            <p className="text-lg text-foreground/70 mb-8 font-medium">
              Explore our premium mattresses designed for your ultimate comfort.
            </p>
            <Button asChild size="lg" className="bg-[#8B5A3C] hover:bg-[#6D4530] px-8">
              <Link href="/mattress">Shop Mattresses</Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
