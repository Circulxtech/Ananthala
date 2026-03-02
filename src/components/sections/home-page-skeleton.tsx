import { Skeleton } from "@/components/ui/skeleton"

export function HomePageSkeleton() {
  const cards = Array.from({ length: 4 }, (_, index) => index)
  const dots = Array.from({ length: 3 }, (_, index) => index)

  return (
    <div className="min-h-screen">
      {/* Header placeholder */}
      <div className="h-20 bg-white border-b" style={{ borderColor: "#D9CFC7" }} />

      <main>
        {/* Hero */}
        <section className="relative min-h-[680px] bg-stone-100">
          <Skeleton className="absolute inset-0 h-full w-full" />
          <div className="absolute bottom-8 left-8 right-8 z-10 flex flex-col sm:flex-row gap-4">
            <Skeleton className="h-12 w-full sm:w-44" />
            <Skeleton className="h-12 w-full sm:w-44" />
          </div>
        </section>

        {/* Experience The Difference */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto text-center px-4 space-y-4">
            <Skeleton className="h-8 w-72 mx-auto" />
            <Skeleton className="h-5 w-[28rem] max-w-full mx-auto" />
          </div>
        </section>

        {/* Category Slider */}
        <section className="relative w-full overflow-hidden">
          <div className="relative h-[500px] md:h-[600px] lg:h-[700px] bg-stone-100">
            <Skeleton className="absolute inset-0 h-full w-full" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-4">
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-10 w-72" />
              <Skeleton className="h-10 w-28" />
            </div>
          </div>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2">
            {dots.map((dot) => (
              <Skeleton key={`dot-${dot}`} className="h-2 w-2 rounded-full" />
            ))}
          </div>
        </section>

        {/* Products Section */}
        <section className="py-24 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 space-y-4">
              <Skeleton className="h-8 w-80 mx-auto" />
              <Skeleton className="h-5 w-[36rem] max-w-full mx-auto" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {cards.map((item) => (
                <div key={`card-skeleton-${item}`} className="aspect-3/4 bg-stone-100 border border-[#EED9C4]">
                  <Skeleton className="h-full w-full" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comfort Section */}
        <section className="py-24 px-4 bg-stone-50">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <Skeleton className="h-7 w-64" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-11/12" />
              <Skeleton className="h-4 w-10/12" />
              <div className="space-y-3">
                {cards.slice(0, 3).map((item) => (
                  <div key={`comfort-skeleton-${item}`} className="flex items-start gap-3">
                    <Skeleton className="h-2 w-2 rounded-full mt-2" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-1/2" />
                      <Skeleton className="h-4 w-2/3" />
                    </div>
                  </div>
                ))}
              </div>
              <Skeleton className="h-11 w-32" />
            </div>
            <div className="relative aspect-square overflow-hidden bg-stone-100">
              <Skeleton className="h-full w-full" />
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 space-y-3">
              <Skeleton className="h-7 w-56 mx-auto" />
              <Skeleton className="h-4 w-80 mx-auto" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {dots.map((item) => (
                <Skeleton key={`testimonial-skeleton-${item}`} className="aspect-video w-full" />
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer placeholder */}
      <div className="h-32 bg-stone-50 border-t border-amber-100" />
    </div>
  )
}
