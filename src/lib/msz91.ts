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

    console.log(`[v0] Sending OTP to phone: ${normalizedPhone}, SenderID: ${senderId}`)

    // Use MSG91 correct endpoint - /api/sendhttp.php (the working endpoint)
    const msg91Url = new URL("https://api.msg91.com/api/sendhttp.php")
    msg91Url.searchParams.append("authkey", authKey)
    msg91Url.searchParams.append("mobiles", normalizedPhone)
    msg91Url.searchParams.append("message", message)
    msg91Url.searchParams.append("sender", senderId)

    console.log(`[v0] MSG91 URL constructed successfully`)

    const response = await fetch(msg91Url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })

    const responseText = await response.text()
    console.log(`[v0] MSG91 Response Status: ${response.status}, Body: ${responseText}`)

    // MSG91 returns simple text response, not JSON
    // Success response starts with "SMSACCEPTED" or contains success indicators
    if (responseText.includes("SMSACCEPTED") || responseText.includes("success") || response.ok) {
      console.log(`[SMS_SUCCESS] OTP sent via MSG91 to ${normalizedPhone}`)
      return true
    }

    // Check for error responses
    if (responseText.includes("INVALID") || responseText.includes("error") || !response.ok) {
      throw new Error(`MSG91 API returned: ${responseText}`)
    }

    // If we get here with 200 status, assume success
    if (response.ok) {
      console.log(`[SMS_SUCCESS] OTP sent via MSG91 to ${normalizedPhone}`)
      return true
    }

    throw new Error(`MSG91 API returned status ${response.status}: ${responseText}`)
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

    // Build MSG91 API URL - using correct endpoint
    const msg91Url = new URL("https://api.msg91.com/api/sendhttp.php")
    msg91Url.searchParams.append("authkey", authKey)
    msg91Url.searchParams.append("mobiles", normalizedPhone)
    msg91Url.searchParams.append("message", message)
    msg91Url.searchParams.append("sender", senderId)

    const response = await fetch(msg91Url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })

    const responseText = await response.text()
    console.log(`[v0] SMS Response: ${responseText}`)

    // MSG91 returns simple text response
    if (responseText.includes("SMSACCEPTED") || responseText.includes("success") || response.ok) {
      console.log(`[SMS_SUCCESS] SMS sent via MSG91 to ${normalizedPhone}`)
      return true
    }

    throw new Error(`MSG91 API returned: ${responseText}`)
  } catch (error) {
    console.error("[SMS_ERROR]", error)
    throw error
  }
}
