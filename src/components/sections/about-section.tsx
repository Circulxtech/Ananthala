import Image from "next/image"
import { Heart, Eye, Award, Leaf } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const values = [
  {
    icon: Heart,
    title: "Customer First",
    description:
      "Your comfort and satisfaction are at the heart of everything we do. We listen, adapt, and continuously improve to serve you better. Every decision we make starts with one question: how does this benefit our customers? From product design to customer service, your needs guide our path forward.",
  },
  {
    icon: Leaf,
    title: "Sustainability",
    description:
      "We source eco-friendly materials and use sustainable manufacturing processes to minimize our environmental footprint. Our commitment extends beyond products to every aspect of our operations, from packaging to shipping. We ensure we leave a positive impact on the planet for future generations through responsible practices.",
  },
  {
    icon: Award,
    title: "Quality Excellence",
    description:
      "Every mattress undergoes rigorous testing and quality control to ensure it meets our exceptionally high standards. We never compromise on materials or craftsmanship, because we believe that quality sleep requires quality products. Our mattresses are built to last for years of restful nights.",
  },
  {
    icon: Eye,
    title: "Transparency",
    description:
      "We believe in being honest about our materials, processes, and pricing. No hidden costs, no compromises. We share detailed information about every component in our mattresses, our manufacturing processes, and our business practices. You deserve to know exactly what you're investing in.",
  },
]

export function AboutSection() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-[60vh] bg-[#6D4530] overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <Image
            src="https://images.unsplash.com/photo-1609587639086-b4cbf85e4355?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWlnZSUyMG1hdHRyZXNzJTIwYmVkcm9vbXxlbnwxfHx8fDE3NjQzMTk5NjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="About Us"
            fill
            className="object-cover"
            unoptimized
          />
        </div>
        <div className="relative h-full flex items-center justify-center px-4">
          <div className="text-center text-white max-w-3xl">
            <h1 className="mb-6 text-5xl font-bold text-white">About Ananthala</h1>
            <p className="text-white/90 text-lg">
              Crafting premium mattresses with care, precision, and a commitment to your best sleep.
            </p>
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* LEFT SIDE — IMAGE */}
          <div className="relative w-full aspect-[4/3] overflow-hidden rounded-lg">
            <Image
              src="https://images.unsplash.com/photo-1640109478916-f445f8f19b11?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBiZWRyb29tJTIwd2hpdGV8ZW58MXx8fHwxNzY0MTI2NDExfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Ananthala Story"
              fill
              className="object-cover shadow-md"
              unoptimized
            />
          </div>

          {/* RIGHT SIDE — TEXT */}
          <div>
            <div className="mb-8">
              <p className="text-blaack text-4xl font-semibold mb-2">Our Journey</p>
              <h2 className="mb-6 text-lg text-black">The Ananthala Story</h2>
            </div>
            <div className="space-y-6 text-black">
              <p>
                Founded in 2015, Ananthala was born from a simple yet profound realization: quality sleep is the
                foundation of a quality life. Our founder, after years of struggling with poor sleep and back pain,
                discovered that the right mattress could transform not just nights, but entire days. This personal
                journey sparked a mission to create mattresses that truly serve the needs of every sleeper.
              </p>
              <p>
                What began in a small workshop with a passion for craftsmanship has grown into a trusted name in the
                sleep industry. We started by handcrafting mattresses for friends and family, carefully listening to
                their feedback and refining our designs. Word spread about the exceptional comfort and support our
                mattresses provided, and demand grew organically.
              </p>
              <p>
                Every mattress we create is the result of extensive research, countless prototypes, and feedback from
                real sleepers. We work with sleep scientists, orthopedic specialists, and materials experts to ensure
                each design meets the highest standards of comfort, support, and durability. Our team tests hundreds of
                combinations of materials, densities, and constructions before we find the perfect balance.
              </p>
              <p>
                Today, Ananthala serves thousands of customers across the country, but our commitment remains the same:
                to create exceptional mattresses that help people sleep better and live better. We continue to innovate,
                improve, and expand our product line while staying true to our core values of quality, sustainability,
                and customer care.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision (With Dark Overlay Background) */}
      <section className="relative h-[90vh] py-24 px-4 bg-[#6D4530] overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <Image
            src="https://images.unsplash.com/photo-1609587639086-b4cbf85e4355?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWlnZSUyMG1hdHRyZXNzJTIwYmVkcm9vbXxlbnwxfHx8fDE3NjQzMTk5NjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="About Us"
            fill
            className="object-cover"
            unoptimized
          />
        </div>
        <div className="relative max-w-7xl mx-auto text-white">
          <div className="text-center mb-16">
            <p className="text-white text-4xl font-semibold mb-2">What We Stand For</p>
            <p className="text-white/80 max-w-2xl mx-auto">
              At Ananthala, every step we take is guided by our purpose and the future we strive to build.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
            {/* Mission */}
            <div className="bg-white/10 backdrop-blur-lg p-12 border border-white/20 rounded-lg">
              <div className="w-12 h-12 bg-[#8B5A3C] text-white rounded-full flex items-center justify-center mb-6">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-white">Our Mission</h3>
              <p className="text-white/90 leading-relaxed mb-4">
                To craft exceptional mattresses that transform the way people sleep, using sustainable materials and
                innovative design. We exist to help our customers wake up feeling their best, every single day.
              </p>
              <p className="text-white/90 leading-relaxed">
                We believe that everyone deserves access to quality sleep, which is why we've made it our mission to
                create mattresses that combine luxury comfort with responsible manufacturing. Through continuous
                innovation and a deep understanding of sleep science, we strive to make premium sleep accessible to all.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-white/10 backdrop-blur-lg p-12 border border-white/20 rounded-lg">
              <div className="w-12 h-12 bg-[#8B5A3C] text-white rounded-full flex items-center justify-center mb-6">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-white">Our Vision</h3>
              <p className="text-white/90 leading-relaxed mb-4">
                To become the most trusted sleep brand, known for exceptional quality, sustainability, and customer
                care — setting new standards for what a mattress company can be.
              </p>
              <p className="text-white/90 leading-relaxed">
                We envision a future where quality sleep is recognized as essential to health and wellbeing, and where
                sustainable practices are the norm, not the exception. By leading through example and innovation, we aim
                to inspire positive change throughout the industry while helping millions of people achieve better sleep.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-black text-4xl font-semibold mb-2">What Drives Us</p>
            <h2 className="mb-4 text-lg text-black">Our Core Values</h2>
            <p className="text-black max-w-2xl mx-auto">
              These principles guide every decision we make and define who we are as a company.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
            {values.map((value, index) => {
              const Icon = value.icon
              const isHighlighted = index === 1 || index === 3

              return (
                <div
                  key={index}
                  className={`
                    text-center p-8 transition-colors 
                    ${
                      isHighlighted
                        ? "bg-[#6D4530] text-white"
                        : "bg-[#F5F1ED] hover:bg-[#FEF7E7] text-black"
                    }
                  `}
                >
                  <div
                    className={`
                      inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full
                      ${isHighlighted ? "bg-white text-[#6D4530]" : "bg-[#6D4530] text-white"}
                    `}
                  >
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="mb-3 text-lg font-semibold">{value.title}</h3>
                  <p className="text-sm leading-relaxed">{value.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Commitment Section */}
      <section className="py-24 px-4 bg-[#F5F1ED]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="mb-6 text-3xl font-semibold text-black">Our Commitment to Sustainability</h2>
            <p className="text-black max-w-2xl mx-auto">
              At Ananthala, we believe that taking care of our customers means taking care of our planet. Every
              mattress is crafted with sustainably sourced materials, and we continuously work to reduce our
              environmental impact.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Eco-Friendly Materials Card */}
            <div className="relative rounded-lg overflow-hidden shadow-sm min-h-[250px]">
              <Image
                src="https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=800&h=600&fit=crop"
                alt="Eco-Friendly Materials"
                fill
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-0 bg-black/60"></div>
              <div className="relative z-10 p-8 h-full flex flex-col">
                <h3 className="text-lg font-semibold text-white mb-4">Eco-Friendly Materials</h3>
                <div className="flex-1 flex items-center justify-center">
                  <p className="text-white text-center">
                    Certified organic cotton, natural latex, and recyclable components. All materials are carefully
                    sourced from certified suppliers who share our commitment to environmental responsibility and
                    ethical practices.
                  </p>
                </div>
              </div>
            </div>
            {/* Responsible Manufacturing Card */}
            <div className="relative rounded-lg overflow-hidden shadow-sm min-h-[250px]">
              <Image
                src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop"
                alt="Responsible Manufacturing"
                fill
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-0 bg-black/60"></div>
              <div className="relative z-10 p-8 h-full flex flex-col">
                <h3 className="text-lg font-semibold text-white mb-4">Responsible Manufacturing</h3>
                <div className="flex-1 flex items-center justify-center">
                  <p className="text-white text-center">
                    Low-emission facilities powered by renewable energy. Our manufacturing processes are designed to
                    minimize waste and maximize efficiency, ensuring that every mattress we produce has the smallest
                    possible environmental footprint.
                  </p>
                </div>
              </div>
            </div>
            {/* Mattress Recycling Program Card */}
            <div className="relative rounded-lg overflow-hidden shadow-sm min-h-[250px]">
              <Image
                src="https://images.unsplash.com/photo-1619490742661-8949b7d3a612?w=800&h=600&fit=crop"
                alt="Mattress Recycling Program"
                fill
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-0 bg-black/60"></div>
              <div className="relative z-10 p-8 h-full flex flex-col">
                <h3 className="text-lg font-semibold text-white mb-4">Mattress Recycling Program</h3>
                <div className="flex-1 flex items-center justify-center">
                  <p className="text-white text-center">
                    Free pickup and eco-friendly disposal of your old mattress. We partner with recycling facilities
                    to ensure that up to 95% of your old mattress materials are recycled or repurposed, keeping waste out
                    of landfills.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}

