import { Star } from "lucide-react"

interface Review {
  text: string
  author: string
}

const reviews: Review[] = [
  {
    text: "Best sleep I've had in years! The Cloud mattress is incredibly comfortable and I wake up without any back pain.",
    author: "Sarah Johnson",
  },
  {
    text: "The Harmony hybrid is perfect. Great support with just the right amount of softness. Worth every penny!",
    author: "Michael Chen",
  },
  {
    text: "Amazing customer service and the delivery was seamless. The mattress exceeded my expectations.",
    author: "Emily Davis",
  },
]

export function ReviewsSection() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#3D2518] mb-4 text-balance">
            What Our Customers Say
          </h2>
          <p className="text-lg sm:text-xl text-[#8B5A3C]">Join thousands of happy sleepers</p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-8">
          {reviews.map((review, index) => (
            <div key={index} className="bg-[#F5F1ED] rounded-lg p-8 flex flex-col">
              {/* Star Rating */}
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#8B5A3C] text-[#8B5A3C]" />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-[#3D2518] text-base sm:text-lg mb-6 flex-grow leading-relaxed">{review.text}</p>

              {/* Author */}
              <p className="text-[#3D2518] font-medium">— {review.author}</p>
            </div>
          ))}
        </div>

        {/* Rating Summary */}
        <div className="text-center">
          <p className="text-[#8B5A3C] text-lg">Rated 4.9/5 from over 10,000 reviews</p>
        </div>
      </div>
    </section>
  )
}
