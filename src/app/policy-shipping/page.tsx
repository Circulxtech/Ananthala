import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export default function ShippingPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-serif text-foreground mb-8 font-cormorant">Shipping & Delivery</h1>

          <div className="prose prose-sm max-w-none text-foreground space-y-6">
            <section>
              <h2 className="text-2xl font-serif font-cormorant text-foreground mb-4">Shipping Methods</h2>
              <p className="text-lg leading-relaxed mb-4">We offer several shipping options to suit your needs:</p>
              <ul className="list-disc list-inside space-y-2 text-lg">
                <li>
                  <strong>Standard Delivery:</strong> 5-7 business days - FREE on orders over ₹5,000
                </li>
                <li>
                  <strong>Express Delivery:</strong> 2-3 business days - ₹1,500
                </li>
                <li>
                  <strong>Next-Day Delivery:</strong> Available in select areas - ₹3,000
                </li>
                <li>
                  <strong>White Glove Delivery:</strong> Assembly & setup included - ₹2,500
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-cormorant text-foreground mb-4">Delivery Timeline</h2>
              <p className="text-lg leading-relaxed mb-4">
                Delivery timelines are calculated from the date your order is confirmed:
              </p>
              <ul className="list-disc list-inside space-y-2 text-lg">
                <li>Processing time: 1-2 business days</li>
                <li>Delivery time: Varies by location and method</li>
                <li>Saturday & Sunday deliveries available for express options</li>
                <li>Public holidays may affect delivery schedules</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-cormorant text-foreground mb-4">Service Areas</h2>
              <p className="text-lg leading-relaxed">
                We currently deliver to all major cities and towns across India. Delivery to remote areas may take
                longer. Check your delivery eligibility during checkout based on your pincode.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-cormorant text-foreground mb-4">Shipping Costs</h2>
              <p className="text-lg leading-relaxed mb-4">Shipping costs are calculated based on:</p>
              <ul className="list-disc list-inside space-y-2 text-lg">
                <li>Order value</li>
                <li>Delivery location</li>
                <li>Selected shipping method</li>
                <li>Weight of items</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-cormorant text-foreground mb-4">Tracking Your Order</h2>
              <p className="text-lg leading-relaxed">
                Once your order ships, you'll receive an email with a tracking number. You can use this number to track
                your delivery in real-time through our partner's tracking portal or your customer dashboard.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-cormorant text-foreground mb-4">Damaged or Lost Shipments</h2>
              <p className="text-lg leading-relaxed mb-4">If your shipment arrives damaged or goes missing:</p>
              <ul className="list-decimal list-inside space-y-2 text-lg">
                <li>Contact us immediately with photographic evidence</li>
                <li>We'll initiate a claim with the shipping carrier</li>
                <li>Full replacement or refund will be issued</li>
                <li>We handle all logistics at no cost to you</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-cormorant text-foreground mb-4">Delivery Instructions</h2>
              <p className="text-lg leading-relaxed mb-4">To ensure smooth delivery:</p>
              <ul className="list-disc list-inside space-y-2 text-lg">
                <li>Provide accurate delivery address during checkout</li>
                <li>Keep your phone accessible on delivery day</li>
                <li>Ensure delivery location is accessible for large items</li>
                <li>Review items for damage before accepting delivery</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-cormorant text-foreground mb-4">International Shipping</h2>
              <p className="text-lg leading-relaxed">
                We currently ship to select international locations. Contact our customer service for international
                delivery rates and timelines. Additional customs duties and taxes may apply.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-cormorant text-foreground mb-4">Contact Us</h2>
              <p className="text-lg leading-relaxed">For shipping inquiries or concerns:</p>
              <div className="mt-4 text-lg">
                <p>Email: shipping@ananthala.com</p>
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
