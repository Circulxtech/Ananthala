import { Moon, Shield, Truck, Award } from "lucide-react"

const features = [
  {
    icon: Moon,
    title: "100 Night Trial",
    description: "Try risk-free for over 3 months",
  },
  {
    icon: Shield,
    title: "15 Year Warranty",
    description: "Long-lasting quality guaranteed",
  },
  {
    icon: Truck,
    title: "Free Delivery",
    description: "White glove setup included",
  },
  {
    icon: Award,
    title: "Award Winning",
    description: "Rated #1 by sleep experts",
  },
]

export function FeaturesSection() {
  return (
    <section className="bg-[#F5F1ED] py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {features.map((feature) => (
            <div key={feature.title} className="flex flex-col items-center text-center">
              {/* Icon Circle */}
              <div className="w-20 h-20 rounded-full bg-[#6D4530] flex items-center justify-center mb-4">
                <feature.icon className="w-10 h-10 text-white" />
              </div>

              {/* Title */}
              <h3 className="text-[#6D4530] text-lg font-medium mb-2">{feature.title}</h3>

              {/* Description */}
              <p className="text-[#8B5A3C] text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
