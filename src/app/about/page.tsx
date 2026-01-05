import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import Image from "next/image"
import { Heart, Eye, Award, Leaf } from "lucide-react"

const values = [
  {
    icon: Heart,
    title: "Customer_first",
    description:
      "Your comfort,satisfaction are at the heart of everything we do. We listen, adapt and continuously improve to serve you better.",
  },
  {
    icon: Leaf,
    title: "Sustainability",
    description:
      "We source eco-friendly materials and use sustainable manufacturing processes to minimize our environmental footprint.",
  },
  {
    icon: Award,
    title: "Quality Excellence",
    description:
      "Every mattress undergoes rigorous testing and quality control to ensure it meets our exceptionally high standards.",
  },
  {
    icon: Eye,
    title: "Transparency",
    description:
      "We believe in being honest about our materials, processes, and pricing. No hidden costs & no compromises.",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative h-[60vh] bg-[#EED9C4] overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1609587639086-b4cbf85e4355?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWlnZSUyMG1hdHRyZXNzJTIwYmVkcm9vbXxlbnwxfHx8fDE3NjQzMTk5NjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="About Us"
              fill
              className="object-cover transition-transform duration-700 hover:scale-110"
              unoptimized
            />
          </div>
          <div className="absolute inset-0 bg-[#EED9C4]/60"></div>
          <div className="relative h-full flex items-center justify-center px-4">
            <div className="text-center text-black max-w-3xl">
              <h1 className="mb-6 text-5xl font-semibold text-black">About Ananthala</h1>
              <p className="text-black/90 font-semibold text-lg">
                Crafting premium mattresses with care, precision, and a commitment to your best sleep.
              </p>
            </div>
          </div>
        </section>

        {/* Brand Story */}
        <section className="py-24 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            {/* TITLE SECTION */}
            <div className="mb-8 md:mb-12 text-center">
              <p className="text-black text-4xl font-semibold mb-2">Our Journey</p>
              <h2 className="text-lg text-black">The Ananthala Story</h2>
            </div>
            
            {/* IMAGE AND TEXT GRID */}
            <div className="grid md:grid-cols-2 gap-12 items-start">
              {/* LEFT SIDE — IMAGE */}
              <div className="relative w-full aspect-[4/3] overflow-hidden rounded-lg group">
                <Image
                  src="https://images.unsplash.com/photo-1640109478916-f445f8f19b11?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBiZWRyb29tJTIwd2hpdGV8ZW58MXx8fHwxNzY0MTI2NDExfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Ananthala Story"
                  fill
                  className="object-cover shadow-md transition-transform duration-700 group-hover:scale-110"
                  unoptimized
                />
              </div>

              {/* RIGHT SIDE — TEXT */}
              <div className="space-y-6 text-black">
                <p className="text-lg font-medium">
                  Founded in 2015, Ananthala was born from a simple yet profound realization: quality sleep is the
                  foundation of a quality life. Our founder, after years of struggling with poor sleep and back pain,
                  discovered that the right mattress could transform not just nights, but entire days. This personal
                  journey sparked a mission to create mattresses that truly serve the needs of every sleeper.
                </p>
                <p className="text-lg font-medium">
                  What began in a small workshop with a passion for craftsmanship has grown into a trusted name in the
                  sleep industry. We started by handcrafting mattresses for friends and family, carefully listening to
                  their feedback and refining our designs. Word spread about the exceptional comfort and support our
                  mattresses provided, and demand grew organically.
                </p>
                <p className="text-lg font-medium">
                  Every mattress we create is the result of extensive research, countless prototypes, and feedback from
                  real sleepers. We work with sleep scientists, orthopedic specialists, and materials experts to ensure
                  each design meets the highest standards of comfort, support, and durability. 
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision (With Dark Overlay Background) */}
        <section className="relative py-12 px-4 bg-[#EED9C4] overflow-hidden">
          <div className="absolute inset-0 opacity-40 overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Mission and Vision"
              fill
              className="object-cover transition-transform duration-700 hover:scale-110"
              unoptimized
            />
          </div>
          <div className="relative max-w-7xl mx-auto text-black pb-8">
            <div className="text-center mb-8">
              <p className="text-black text-4xl font-semibold mb-2">What We Stand For</p>
              <p className="text-black font-medium text-lg max-w-2xl mx-auto">
                At Ananthala, every step we take is guided by our purpose and the future we strive to build.
              </p>
            </div>
            <div className="flex justify-center mb-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl w-full">
                {/* Mission */}
                <div className="bg-[#EED9C4] px-8 pt-8 pb-10 border border-white/20 rounded-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl cursor-pointer">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-[#EED9C4] text-black rounded-full flex items-center justify-center">
                      <Heart className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-semibold text-black">Our Mission</h3>
                  </div>
                  <p className="text-lg font-medium text-black leading-relaxed mb-3">
                    To craft exceptional mattresses that transform the way people sleep, using sustainable materials and
                    innovative design. We exist to help our customers wake up feeling their best, every single day.
                  </p>
                  <p className="text-lg font-medium text-black leading-relaxed">
                    We believe that everyone deserves access to quality sleep, which is why we've made it our mission to
                    create mattresses that combine luxury comfort with responsible manufacturing.
                  </p>
                </div>

              {/* Vision */}
                <div className="bg-[#EED9C4] px-8 pt-8 pb-10 border border-white/20 rounded-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl cursor-pointer">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-[#EED9C4] text-black rounded-full flex items-center justify-center">
                      <Eye className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-semibold text-black">Our Vision</h3>
                  </div>
                  <p className="text-lg font-medium text-black leading-relaxed mb-3">
                    To become the most trusted sleep brand, known for exceptional quality, sustainability, and customer
                    care — setting new standards for what a mattress company can be.
                  </p>
                  <p className="text-lg font-medium text-black leading-relaxed">
                    We envision a future where quality sleep is recognized as essential to health and wellbeing, and where
                    sustainable practices are the norm, not the exception.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-24 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-black text-4xl font-semibold mb-2">What Drives Us</p>
              
              <p className="text-black font-medium text-lg max-w-2xl mx-auto">
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
                      text-center p-6 transition-all duration-500 ease-in-out
                      hover:scale-105 hover:shadow-xl hover:-translate-y-2
                      ${
                        isHighlighted
                          ? "bg-[#EED9C4] text-black "
                          : "bg-[#F5F1ED] hover:bg-[#FEF7E7] text-black"
                      }
                    `}
                  >
                    <div
                      className={`
                        inline-flex items-center justify-center w-12 h-12 mb-4 rounded-full
                        transition-all duration-300 ease-in-out
                        group-hover:scale-110 hover:scale-110 hover:rotate-6
                        ${isHighlighted ? "bg-white text-[#EED9C4]" : "bg-[#EED9C4] text-black"}
                      `}
                    >
                      <Icon className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
                    </div>
                    <h3 className="mb-3 text-xl font-semibold transition-colors duration-300">{value.title}</h3>
                    <p className="text-lg font-medium leading-relaxed transition-colors duration-300">{value.description}</p>
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
              <p className="text-black font-semibold text-lg max-w-2xl mx-auto">
                At Ananthala, we believe that taking care of our customers means taking care of our planet. 
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Eco-Friendly Materials Card */}
              <div className="relative rounded-lg overflow-hidden shadow-sm min-h-[250px] group">
                <Image
                  src="https://images.unsplash.com/photo-1609587639086-b4cbf85e4355?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWlnZSUyMG1hdHRyZXNzJTIwYmVkcm9vbXxlbnwxfHx8fDE3NjQzMTk5NjR8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Eco-Friendly Materials"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  unoptimized
                />
                <div className="absolute inset-0 bg-[#EED9C4]/70"></div>
                <div className="relative z-10 p-8 h-full flex flex-col">
                  <h3 className="text-xl font-semibold text-black mb-4 text-center">Eco-Friendly Materials</h3>
                  <div className="flex-1 flex items-center justify-center">
                    <p className="text-lg font-semibold text-black text-center">
                      Certified organic cotton, natural latex, and recyclable components. All materials are carefully
                      sourced from certified suppliers who share our commitment to environmental responsibility and
                      ethical practices.
                    </p>
                  </div>
                </div>
              </div>
              {/* Responsible Manufacturing Card */}
              <div className="relative rounded-lg overflow-hidden shadow-sm min-h-[250px] group">
                <Image
                  src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Responsible Manufacturing"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  unoptimized
                />
                <div className="absolute inset-0 bg-[#EED9C4]/70"></div>
                <div className="relative z-10 p-8 h-full flex flex-col">
                  <h3 className="text-xl font-semibold text-black mb-4 text-center">Responsible Manufacturing</h3>
                  <div className="flex-1 flex items-center justify-center">
                    <p className="text-lg font-semibold text-black text-center">
                      Low-emission facilities powered by renewable energy. Our manufacturing processes are designed to
                      minimize waste and maximize efficiency, ensuring that every mattress we produce has the smallest
                      possible environmental footprint.
                    </p>
                  </div>
                </div>
              </div>
              {/* Mattress Recycling Program Card */}
              <div className="relative rounded-lg overflow-hidden shadow-sm min-h-[250px] group">
                <Image
                  src="https://images.unsplash.com/photo-1609587639086-b4cbf85e4355?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWlnZSUyMG1hdHRyZXNzJTIwYmVkcm9vbXxlbnwxfHx8fDE3NjQzMTk5NjR8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Mattress Recycling Program"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  unoptimized
                />
                <div className="absolute inset-0 bg-[#EED9C4]/70"></div>
                <div className="relative z-10 p-8 h-full flex flex-col">
                  <h3 className="text-xl font-semibold text-black mb-4 text-center">Mattress Recycling Program</h3>
                  <div className="flex-1 flex items-center justify-center">
                    <p className="text-lg font-semibold text-black text-center">
                      Free pickup and eco-friendly disposal of your old mattress. We partner with recycling facilities
                      to ensure that up to 95% of your old mattress materials are recycled or repurposed, keeping waste out
                      of    landfills.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
