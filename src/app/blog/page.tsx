"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

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

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const categories = ["all", "Sleep Tips", "Product News", "Health & Wellness", "Company News", "Guides"]

  useEffect(() => {
    fetchBlogs()
  }, [selectedCategory])

  const fetchBlogs = async () => {
    try {
      setLoading(true)
      const url =
        selectedCategory === "all" ? "/api/blogs" : `/api/blogs?category=${encodeURIComponent(selectedCategory)}`
      const response = await fetch(url)
      const result = await response.json()

      if (result.success) {
        setBlogs(result.data)
      }
    } catch (error) {
      console.error("Error fetching blogs:", error)
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

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="bg-stone-50 py-16 md:py-24 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium text-foreground mb-6 text-balance">
              Sleep Better, Live Better
            </h1>
            <p className="text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto font-medium">
              Discover expert tips, sleep science, and the latest updates from Ananthala to help you achieve your best
              night's rest.
            </p>
          </div>
        </section>

        {/* Category Filter */}
        <section className="border-b border-stone-200 sticky top-20 bg-white z-40">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    selectedCategory === category
                      ? "bg-[#8B5A3C] text-white"
                      : "bg-stone-100 text-foreground hover:bg-stone-200"
                  }`}
                >
                  {category === "all" ? "All Posts" : category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Grid */}
        <section className="py-12 md:py-16 px-4">
          <div className="max-w-7xl mx-auto">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Card key={i} className="overflow-hidden animate-pulse">
                    <div className="aspect-video bg-stone-200" />
                    <CardContent className="p-6">
                      <div className="h-4 bg-stone-200 rounded mb-3 w-20" />
                      <div className="h-6 bg-stone-200 rounded mb-3" />
                      <div className="h-4 bg-stone-200 rounded mb-2" />
                      <div className="h-4 bg-stone-200 rounded w-3/4" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : blogs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogs.map((blog) => (
                  <Link key={blog._id} href={`/blog/${blog.slug}`}>
                    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group h-full flex flex-col border-stone-200">
                      {/* Image */}
                      <div className="relative aspect-video overflow-hidden bg-stone-100">
                        <Image
                          src={blog.image || "/placeholder.svg"}
                          alt={blog.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {blog.featured && (
                          <Badge className="absolute top-4 left-4 bg-[#8B5A3C] hover:bg-[#6D4530]">Featured</Badge>
                        )}
                      </div>

                      <CardContent className="p-6 flex flex-col flex-grow">
                        {/* Category */}
                        <Badge variant="outline" className="w-fit mb-3 border-[#8B5A3C] text-[#8B5A3C]">
                          {blog.category}
                        </Badge>

                        {/* Title */}
                        <h3 className="text-xl font-semibold text-foreground mb-3 line-clamp-2 group-hover:text-[#8B5A3C] transition-colors">
                          {blog.title}
                        </h3>

                        {/* Excerpt */}
                        <p className="text-foreground/70 text-sm mb-4 line-clamp-3 flex-grow font-medium">
                          {blog.excerpt}
                        </p>

                        {/* Meta Info */}
                        <div className="flex items-center justify-between text-xs text-foreground/60 pt-4 border-t border-stone-200">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <User className="w-3 h-3" />
                              <span className="font-medium">{blog.author}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              <span className="font-medium">{formatDate(blog.createdAt)}</span>
                            </div>
                          </div>
                          <ArrowRight className="w-4 h-4 text-[#8B5A3C] group-hover:translate-x-1 transition-transform" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="max-w-md mx-auto">
                  <div className="w-24 h-24 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-12 h-12 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">No blogs found</h3>
                  <p className="text-foreground/70 font-medium">
                    {selectedCategory === "all"
                      ? "No blog posts available at the moment. Check back soon!"
                      : `No blog posts found in "${selectedCategory}" category.`}
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
