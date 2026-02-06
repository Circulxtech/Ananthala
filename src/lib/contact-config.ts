// Contact information configuration
// Update these values to change contact details across the website

export const CONTACT_CONFIG = {
  // Phone number for direct calls and WhatsApp
  phone: "+91 9071799966",
  // Phone number without formatting for technical links
  phoneRaw: "9071799966",
  // Email address
  email: "qualprodsllp@gmail.com",
  // WhatsApp number (without +, with country code)
  whatsapp: "9071799966",
} as const

// Helper functions for contact links
export const getPhoneLink = () => `tel:${CONTACT_CONFIG.phoneRaw}`
export const getWhatsAppLink = () => `https://wa.me/${CONTACT_CONFIG.whatsapp}`
export const getEmailLink = () => `mailto:${CONTACT_CONFIG.email}`
