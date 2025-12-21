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
          <h2 className="text-4xl sm:text-4xl lg:text-4xl font-bold text-black mb-4 text-balance">
            What Our Customers Say
          </h2>
          <p className="text-xl sm:text-2xl text-black font-semibold">Join thousands of happy sleepers</p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-8">
          {reviews.map((review, index) => (
            <div key={index} className="bg-[#EED9C4] rounded-lg p-8 flex flex-col">
              {/* Review Text */}
              <p className="text-black text-base sm:text-lg mb-6 grow leading-relaxed font-semibold">{review.text}</p>

              {/* Author */}
              <p className="text-black font-semibold">— {review.author}</p>
            </div>
          ))}
        </div>

        {/* Rating Summary */}
        <div className="text-center">
          <p className="text-black text-lg font-semibold">Rated 4.9/5 from over 10,000 reviews</p>
        </div>
      </div>
    </section>
  )
}
