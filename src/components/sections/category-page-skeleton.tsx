import { Skeleton } from "@/components/ui/skeleton"

export function CategoryPageSkeleton() {
  const cards = Array.from({ length: 8 }, (_, index) => index)
  const bullets = Array.from({ length: 3 }, (_, index) => index)

  return (
    <div className="min-h-screen">
      {/* Header placeholder */}
      <div className="h-16 bg-white" />

      {/* Fixed breadcrumb placeholder */}
      <div className="fixed top-20 left-0 right-0 z-40 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-2">
            <Skeleton className="h-4 w-40" />
          </div>
        </div>
      </div>

      {/* Spacer to prevent content from going under fixed breadcrumb */}
      <div className="h-[49px]" />

      {/* Hero */}
      <section className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden bg-stone-100">
        <Skeleton className="absolute inset-0 h-full w-full" />
        <div className="absolute inset-0 z-10 flex items-center">
          <div className="pl-4 sm:pl-6 lg:pl-8 xl:pl-12">
            <div className="max-w-md space-y-4">
              <Skeleton className="h-10 w-56" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-11/12" />
              <div className="flex flex-col sm:flex-row gap-4">
                <Skeleton className="h-12 w-full sm:w-32" />
                <Skeleton className="h-12 w-full sm:w-32" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Difference carousel */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-[#EED9C4] p-6">
            <Skeleton className="aspect-[4/3] w-full" />
            <div className="space-y-4">
              <Skeleton className="h-6 w-56" />
              <Skeleton className="h-3 w-40" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-11/12" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          </div>
        </div>
      </section>

      {/* Shop grid */}
      <section className="py-16 px-4 bg-stone-50">
        <div className="max-w-[1800px] mx-auto">
          <Skeleton className="h-8 w-40 mx-auto mb-8" />
          <div className="grid grid-cols-[repeat(auto-fit,minmax(230px,300px))] gap-x-8 gap-y-10 justify-center">
            {cards.map((item) => (
              <div
                key={`product-skeleton-${item}`}
                className="border border-[#EED9C4] p-4 bg-white"
              >
                <Skeleton className="mb-3 aspect-square w-full" />
                <Skeleton className="mb-2 h-4 w-3/4 mx-auto" />
                <Skeleton className="mb-3 h-4 w-1/2 mx-auto" />
                <Skeleton className="h-9 w-full" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <Skeleton className="h-6 w-56 mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {bullets.map((item) => (
              <Skeleton key={`video-skeleton-${item}`} className="aspect-video w-full" />
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
            <Skeleton className="aspect-[4/3] w-full max-w-lg mx-auto lg:mx-0" />
            <div className="space-y-4">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-11/12" />
              <Skeleton className="h-4 w-5/6" />
              <div className="space-y-4">
                {bullets.map((item) => (
                  <div key={`about-skeleton-${item}`} className="flex items-start gap-3">
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
          </div>
        </div>
      </section>
    </div>
  )
}
