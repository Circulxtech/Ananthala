/**
 * MSG91 OTP Service Utility
 * Handles all MSG91 SMS/OTP operations
 */

interface MSG91Response {
  type: "success" | "error"
  message: string
  request_id?: string
}

/**
 * Validates MSG91 configuration
 */
export function validateMsg91Config(): void {
  const authKey = process.env.MSG91_AUTH_KEY
  const senderId = process.env.MSG91_SENDER_ID

  if (!authKey || !senderId) {
    throw new Error(
      "MSG91 credentials not configured. Please add MSG91_AUTH_KEY and MSG91_SENDER_ID to your .env.local file.",
    )
  }
}

/**
 * Normalizes and validates phone number
 * Converts to format with country code (91 for India)
 */
export function normalizePhoneNumber(phone: string): string {
  // Remove all non-digit characters
  const digits = phone.replace(/\D/g, "")

  // Check if minimum length is met (10 digits for India)
  if (digits.length < 10) {
    throw new Error("Invalid phone number. Please provide at least 10 digits.")
  }

  // If already starts with 91, return as is
  if (digits.startsWith("91")) {
    return digits
  }

  // Take last 10 digits and add country code
  return "91" + digits.slice(-10)
}

/**
 * Sends OTP via MSG91 API
 */
export async function sendMsg91OTP(phone: string, otp: string): Promise<boolean> {
  try {
    validateMsg91Config()

    const normalizedPhone = normalizePhoneNumber(phone)
    const authKey = process.env.MSG91_AUTH_KEY!
    const senderId = process.env.MSG91_SENDER_ID!

    const message = `Your Ananthala OTP is: ${otp}. Valid for 5 minutes. Do not share this OTP with anyone.`

    // Build MSG91 API URL
    const msg91Url = new URL("https://api.msg91.com/apiv5/flow/")
    msg91Url.searchParams.append("authkey", authKey)
    msg91Url.searchParams.append("route", "otp")
    msg91Url.searchParams.append("sender", senderId)
    msg91Url.searchParams.append("mobiles", normalizedPhone)
    msg91Url.searchParams.append("message", message)

    const response = await fetch(msg91Url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`MSG91 API returned status ${response.status}`)
    }

    const result = (await response.json()) as MSG91Response

    // Check if MSG91 API returned success
    if (result.type === "success") {
      console.log(`[SMS_SUCCESS] OTP sent via MSG91 to ${normalizedPhone}`)
      return true
    } else {
      throw new Error(`MSG91 API error: ${result.message || "Unknown error"}`)
    }
  } catch (error) {
    console.error("[SMS_ERROR]", error)
    throw error
  }
}

/**
 * Sends generic SMS via MSG91 API
 */
export async function sendMsg91SMS(phone: string, message: string): Promise<boolean> {
  try {
    validateMsg91Config()

    const normalizedPhone = normalizePhoneNumber(phone)
    const authKey = process.env.MSG91_AUTH_KEY!
    const senderId = process.env.MSG91_SENDER_ID!

    // Build MSG91 API URL
    const msg91Url = new URL("https://api.msg91.com/apiv5/flow/")
    msg91Url.searchParams.append("authkey", authKey)
    msg91Url.searchParams.append("route", "promotional")
    msg91Url.searchParams.append("sender", senderId)
    msg91Url.searchParams.append("mobiles", normalizedPhone)
    msg91Url.searchParams.append("message", message)

    const response = await fetch(msg91Url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`MSG91 API returned status ${response.status}`)
    }

    const result = (await response.json()) as MSG91Response

    if (result.type === "success") {
      console.log(`[SMS_SUCCESS] SMS sent via MSG91 to ${normalizedPhone}`)
      return true
    } else {
      throw new Error(`MSG91 API error: ${result.message || "Unknown error"}`)
    }
  } catch (error) {
    console.error("[SMS_ERROR]", error)
    throw error
  }
}
