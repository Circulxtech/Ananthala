import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-serif text-foreground mb-8 font-cormorant">Privacy Policy</h1>

          <div className="prose prose-sm max-w-none text-foreground space-y-6">
            <section>
              <h2 className="text-2xl font-serif font-cormorant text-foreground mb-4">Introduction</h2>
              <p className="text-lg leading-relaxed">
                At Ananthala, we are committed to protecting your privacy. This Privacy Policy explains how we collect,
                use, disclose, and safeguard your information when you visit our website and use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-cormorant text-foreground mb-4">Information We Collect</h2>
              <p className="text-lg leading-relaxed mb-4">
                We may collect information about you in a variety of ways. The information we may collect includes:
              </p>
              <ul className="list-disc list-inside space-y-2 text-lg">
                <li>Personal information such as name, email address, and phone number</li>
                <li>Shipping and billing information</li>
                <li>Payment information for processing orders</li>
                <li>Information about your browsing history and preferences</li>
                <li>Device information and IP address</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-cormorant text-foreground mb-4">How We Use Your Information</h2>
              <p className="text-lg leading-relaxed mb-4">We use the information we collect for various purposes:</p>
              <ul className="list-disc list-inside space-y-2 text-lg">
                <li>To process and fulfill your orders</li>
                <li>To send you promotional emails and updates</li>
                <li>To improve our website and customer service</li>
                <li>To detect and prevent fraud</li>
                <li>To comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-cormorant text-foreground mb-4">Security of Your Information</h2>
              <p className="text-lg leading-relaxed">
                We implement appropriate technical and organizational measures to protect your personal information
                against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission
                over the Internet is 100% secure.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-cormorant text-foreground mb-4">Cookies and Tracking</h2>
              <p className="text-lg leading-relaxed">
                Our website uses cookies to enhance your experience. Cookies are small files stored on your device that
                help us remember your preferences and understand how you use our site. You can control cookie settings
                in your browser preferences.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-cormorant text-foreground mb-4">Third-Party Links</h2>
              <p className="text-lg leading-relaxed">
                Our website may contain links to third-party websites. We are not responsible for the privacy practices
                of these external sites. We encourage you to review their privacy policies before providing any personal
                information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-cormorant text-foreground mb-4">Your Rights</h2>
              <p className="text-lg leading-relaxed mb-4">You have the right to:</p>
              <ul className="list-disc list-inside space-y-2 text-lg">
                <li>Access your personal information</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of your information</li>
                <li>Opt-out of promotional communications</li>
                <li>Request information about how your data is used</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-cormorant text-foreground mb-4">Contact Us</h2>
              <p className="text-lg leading-relaxed">
                If you have questions about this Privacy Policy or our privacy practices, please contact us at:
              </p>
              <div className="mt-4 text-lg">
                <p>Email: privacy@ananthala.com</p>
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
