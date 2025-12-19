"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"

export function ComfortSection() {
  const router = useRouter()

  return (
    <section id="comfort" className="py-24 px-4 bg-stone-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <p
              className="text-3xl font-bold mb-2"
              style={{ color: "#000000" }}
            >
              Crafted for Comfort
            </p>
            <h2 className="mb-6 text-lg" style={{ color: "#000000" }}>
              The Science of Better Sleep
            </h2>
            <p className="mb-6" style={{ color: "#000000" }}>
              Our mattresses are engineered with cutting-edge sleep technology and premium materials to
              provide the perfect balance of comfort and support. Every layer is thoughtfully designed to
              help you wake up refreshed.
            </p>
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-amber-900 rounded-full mt-2"></div>
                <div>
                  <p className="mb-1" style={{ color: "#000000" }}>
                    Pressure Relief Technology
                  </p>
                  <p style={{ color: "#000000" }}>
                    Conforms to your body for optimal spinal alignment
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-amber-900 rounded-full mt-2"></div>
                <div>
                  <p className="mb-1" style={{ color: "#000000" }}>
                    Temperature Regulation
                  </p>
                  <p style={{ color: "#000000" }}>
                    Advanced cooling system keeps you comfortable all night
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-amber-900 rounded-full mt-2"></div>
                <div>
                  <p className="mb-1" style={{ color: "#000000" }}>
                    Motion Isolation
                  </p>
                  <p style={{ color: "#000000" }}>
                    Undisturbed sleep even with a restless partner
                  </p>
                </div>
              </div>
            </div>
            <button
              onClick={() => router.push("/about")}
              className="bg-[#6B563F] text-white px-8 py-3 hover:bg-amber-950 transition-colors"
            >
              More
            </button>
          </div>
          <div className="order-1 lg:order-2">
            <div className="relative aspect-square overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1590924439021-85cdab4bca41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21mb3J0YWJsZSUyMGJlZCUyMHNsZWVwfGVufDF8fHx8MTc2NDE3NTUwNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Comfort"
                fill
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

