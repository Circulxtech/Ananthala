import { Skeleton } from "@/components/ui/skeleton"

export function ProductDetailSkeleton() {
  const bullets = Array.from({ length: 3 }, (_, index) => index)

  return (
    <div className="min-h-screen bg-white">
      {/* Header placeholder */}
      <div className="h-20 bg-white border-b" style={{ borderColor: "#D9CFC7" }} />

      <main>
        {/* Breadcrumb */}
        <div className="py-3 border-b" style={{ backgroundColor: "white", borderColor: "#D9CFC7" }}>
          <div className="w-full px-4">
            <Skeleton className="h-4 w-56" />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Product hero */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div className="space-y-4">
              <Skeleton className="aspect-square w-full" />
              <div className="grid grid-cols-4 gap-3">
                {bullets.map((item) => (
                  <Skeleton key={`thumb-${item}`} className="aspect-square w-full" />
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <Skeleton className="h-8 w-2/3" />
              <Skeleton className="h-5 w-1/3" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-11/12" />
              <Skeleton className="h-10 w-40" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>

          {/* Details */}
          <section className="w-full bg-white py-12">
            <div className="space-y-4">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-11/12" />
              <Skeleton className="h-4 w-10/12" />
            </div>
          </section>

          {/* Additional sections */}
          <section className="w-full bg-white py-12">
            <div className="grid gap-y-16 gap-x-16 items-center lg:grid-cols-[1.1fr_0.9fr]">
              <Skeleton className="h-72 w-full" />
              <div className="space-y-4">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-11/12" />
                <Skeleton className="h-4 w-10/12" />
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Footer placeholder */}
      <div className="h-32 bg-stone-50 border-t border-amber-100" />
    </div>
  )
}
