import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-serif text-foreground mb-8 font-cormorant">
            Refund & Return Policy
          </h1>

          <div className="prose prose-sm max-w-none text-foreground space-y-6">
            <section>
              <h2 className="text-2xl font-serif font-cormorant text-foreground mb-4">100-Night Trial</h2>
              <p className="text-lg leading-relaxed">
                We offer a 100-night trial period for all Ananthala mattresses. If you're not completely satisfied with
                your purchase within 100 nights, we'll work with you to find the perfect solution or provide a full
                refund.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-cormorant text-foreground mb-4">How Our Trial Works</h2>
              <p className="text-lg leading-relaxed mb-4">Our 100-night trial includes:</p>
              <ul className="list-disc list-inside space-y-2 text-lg">
                <li>Sleep on your mattress for up to 100 nights risk-free</li>
                <li>Full refund if you're not satisfied</li>
                <li>Free return shipping and pickup</li>
                <li>No questions asked policy</li>
                <li>One-on-one sleep consultant support</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-cormorant text-foreground mb-4">Return Process</h2>
              <p className="text-lg leading-relaxed mb-4">To initiate a return within our 100-night trial period:</p>
              <ul className="list-decimal list-inside space-y-2 text-lg">
                <li>Contact our customer service team at support@ananthala.com</li>
                <li>Provide your order number and reason for return</li>
                <li>We'll arrange a free pickup at your convenience</li>
                <li>Once received and inspected, we'll process your refund</li>
                <li>Refunds are issued within 5-7 business days</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-cormorant text-foreground mb-4">Non-Mattress Products</h2>
              <p className="text-lg leading-relaxed">
                For pillows, bedding, and other non-mattress products, we offer a 30-day return period. Items must be
                unwashed and in original condition to be eligible for return.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-cormorant text-foreground mb-4">Warranty</h2>
              <p className="text-lg leading-relaxed">
                All Ananthala mattresses come with a 15-year warranty covering manufacturing defects. This warranty
                protects you against sagging, deterioration in foam quality, and structural failures.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-cormorant text-foreground mb-4">Damaged or Defective Items</h2>
              <p className="text-lg leading-relaxed">
                If your mattress arrives damaged or with defects, please contact us immediately. We'll replace or repair
                the item at no cost. Documentation with photos is helpful but not required.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-cormorant text-foreground mb-4">Non-Returnable Items</h2>
              <p className="text-lg leading-relaxed mb-4">The following items are not eligible for return:</p>
              <ul className="list-disc list-inside space-y-2 text-lg">
                <li>Mattresses outside the 100-night trial period</li>
                <li>Items not in original condition</li>
                <li>Items purchased from third-party retailers</li>
                <li>Clearance or final sale items</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-cormorant text-foreground mb-4">Contact Us</h2>
              <p className="text-lg leading-relaxed">For any questions about returns or refunds, please contact:</p>
              <div className="mt-4 text-lg">
                <p>Email: support@ananthala.com</p>
                <p>Phone: 1-800-SLEEP-WELL</p>
              </div>
            </section>

            <section className="pt-4 border-t border-border">
              <p className="text-sm text-foreground/70">
                Last Updated:{" "}
                {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
