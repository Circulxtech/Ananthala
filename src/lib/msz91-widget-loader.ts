/**
 * MSG91 OTP Widget Loader
 * Handles loading and initializing the MSG91 OTP verification widget
 * https://verify.msg91.com/otp-provider.js
 */

export interface MSG91Configuration {
  widgetId: string
  tokenAuth: string
  identifier?: string
  exposeMethods?: boolean
  success: (data: any) => void
  failure: (error: any) => void
  [key: string]: any
}

export interface MSG91WidgetResponse {
  status: string
  token?: string
  message?: string
}

declare global {
  interface Window {
    initSendOTP?: (config: MSG91Configuration) => void
    sendOTPWidget?: any
  }
}

/**
 * Load MSG91 OTP widget script dynamically
 * @param onLoad Callback when script is loaded
 * @param onError Callback when script fails to load
 */
export function loadMsg91WidgetScript(onLoad?: () => void, onError?: (error: Error) => void): void {
  if (document.querySelector('script[src*="otp-provider.js"]')) {
    console.log("[MSG91] Widget script already loaded")
    onLoad?.()
    return
  }

  const script = document.createElement("script")
  script.src = "https://verify.msg91.com/otp-provider.js"
  script.async = true
  script.type = "text/javascript"

  script.onload = () => {
    console.log("[MSG91] Widget script loaded successfully")
    onLoad?.()
  }

  script.onerror = () => {
    console.warn("[MSG91] Failed to load from primary URL, trying fallback...")
    const fallbackScript = document.createElement("script")
    fallbackScript.src = "https://verify.phone91.com/otp-provider.js"
    fallbackScript.async = true
    fallbackScript.type = "text/javascript"

    fallbackScript.onload = () => {
      console.log("[MSG91] Widget script loaded from fallback URL")
      onLoad?.()
    }

    fallbackScript.onerror = () => {
      console.error("[MSG91] Failed to load widget script from all URLs")
      onError?.(new Error("Failed to load MSG91 OTP widget"))
    }

    document.head.appendChild(fallbackScript)
  }

  document.head.appendChild(script)
}

/**
 * Initialize MSG91 OTP widget with configuration
 * @param config Configuration object for the widget
 */
export function initMsg91Widget(config: MSG91Configuration): void {
  if (typeof window.initSendOTP === "function") {
    console.log("[MSG91] Initializing widget with config", {
      widgetId: config.widgetId,
      identifier: config.identifier,
    })
    window.initSendOTP(config)
  } else {
    console.error("[MSG91] initSendOTP function not available. Script may not have loaded correctly.")
  }
}

/**
 * Setup MSG91 OTP widget with automatic script loading
 * @param config Configuration object
 */
export function setupMsg91Widget(config: MSG91Configuration): void {
  loadMsg91WidgetScript(
    () => {
      initMsg91Widget(config)
    },
    (error) => {
      console.error("[MSG91] Failed to setup widget:", error)
      config.failure({ message: "Failed to load OTP widget" })
    },
  )
}

/**
 * Get token from MSG91 API for widget initialization
 * This would typically be called from your backend
 * @param phone Phone number to generate token for
 */
export async function getMsg91Token(phone: string): Promise<string> {
  try {
    const response = await fetch("/api/auth/msg91-token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone }),
    })

    if (!response.ok) {
      throw new Error("Failed to get MSG91 token")
    }

    const data = await response.json()
    return data.token
  } catch (error) {
    console.error("[MSG91] Error getting token:", error)
    throw error
  }
}
