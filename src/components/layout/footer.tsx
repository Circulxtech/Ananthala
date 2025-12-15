import Link from "next/link"
import { Instagram, Facebook, Twitter, Phone, Mail, MapPin } from "lucide-react"

const navigation = {
  shop: [
    { name: "All Mattresses", href: "/mattresses" },
    { name: "Pillows", href: "/pillows" },
    { name: "Bedding", href: "/bedding" },
    { name: "Accessories", href: "/accessories" },
    { name: "Gift Cards", href: "/gift-cards" },
  ],
  customerService: [
    { name: "Contact Us", href: "/contact" },
    { name: "Track Order", href: "/track-order" },
    { name: "Returns & Refunds", href: "/returns" },
    { name: "Shipping Info", href: "/shipping" },
    { name: "Warranty", href: "/warranty" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Sustainability", href: "/sustainability" },
    { name: "Reviews", href: "/reviews" },
    { name: "Careers", href: "/careers" },
  ],
}

const socialLinks = [
  { name: "Instagram", href: "https://instagram.com", icon: Instagram },
  { name: "Facebook", href: "https://facebook.com", icon: Facebook },
  { name: "Twitter", href: "https://twitter.com", icon: Twitter },
]

export function Footer() {
  return (
    <footer className="bg-[#F5F1ED] border-t-4 border-[#6D4530]">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand & Contact Section */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <span className="text-[#8B5A3C] text-xl font-normal tracking-wider">ANANTHALA</span>
            </Link>
            <p className="text-[#8B5A3C] text-sm mb-6 leading-relaxed">
              Premium mattresses crafted for your best sleep. Experience luxury & comfort
            </p>

            {/* Contact Information */}
            <div className="space-y-3 mb-6">
              <a
                href="tel:1-800-SLEEP-WELL"
                className="flex items-center gap-2 text-[#8B5A3C] text-sm hover:text-[#4A2818] transition-all duration-300 group"
              >
                <Phone className="w-4 h-4 group-hover:scale-110 transition-all duration-300" />
                <span>1-800-SLEEP-WELL</span>
              </a>
              <a
                href="mailto:support@ananthala.com"
                className="flex items-center gap-2 text-[#8B5A3C] text-sm hover:text-[#4A2818] transition-all duration-300 group"
              >
                <Mail className="w-4 h-4 group-hover:scale-110 transition-all duration-300" />
                <span>support@ananthala.com</span>
              </a>
              <div className="flex items-start gap-2 text-[#8B5A3C] text-sm">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>123 Sleep Street, San Francisco, CA</span>
              </div>
            </div>

            {/* Social Media Icons */}
            <div className="flex gap-3">
              {socialLinks.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="w-10 h-10 rounded-full bg-[#F9F5E8] flex items-center justify-center text-[#6D4530] hover:bg-[#8B5A3C] hover:text-[#F9F5E8] hover:scale-110 transition-all duration-300 shadow-sm hover:shadow-md"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <item.icon className="w-4 h-4 transition-colors duration-300" />
                  <span className="sr-only">{item.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="text-[#6D4530] font-medium text-base mb-4">Shop</h3>
            <ul className="space-y-3">
              {navigation.shop.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-[#8B5A3C] text-sm hover:text-[#4A2818] hover:translate-x-1 inline-block transition-all duration-300"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service Links */}
          <div>
            <h3 className="text-[#6D4530] font-medium text-base mb-4">Customer Service</h3>
            <ul className="space-y-3">
              {navigation.customerService.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-[#8B5A3C] text-sm hover:text-[#4A2818] hover:translate-x-1 inline-block transition-all duration-300"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-[#6D4530] font-medium text-base mb-4">Company</h3>
            <ul className="space-y-3">
              {navigation.company.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-[#8B5A3C] text-sm hover:text-[#4A2818] hover:translate-x-1 inline-block transition-all duration-300"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#8B5A3C]/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-[#8B5A3C] text-sm">© 2025 Ananthala. All rights reserved.</p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link
                href="/privacy"
                className="text-[#8B5A3C] text-sm hover:text-[#4A2818] hover:underline transition-all duration-300"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-[#8B5A3C] text-sm hover:text-[#4A2818] hover:underline transition-all duration-300"
              >
                Terms & Conditions
              </Link>
              <Link
                href="/refund"
                className="text-[#8B5A3C] text-sm hover:text-[#4A2818] hover:underline transition-all duration-300"
              >
                Refund Policy
              </Link>
              <Link
                href="/shipping-policy"
                className="text-[#8B5A3C] text-sm hover:text-[#4A2818] hover:underline transition-all duration-300"
              >
                Shipping Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
