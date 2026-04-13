export interface PasswordStrength {
  isValid: boolean
  errors: string[]
  strength: "weak" | "fair" | "good" | "strong"
}

export const PASSWORD_REQUIREMENTS = {
  minLength: 8,
  uppercase: /[A-Z]/,
  lowercase: /[a-z]/,
  number: /\d/,
  special: /[!@#$%&_*]/,
}

export const validatePassword = (password: string): PasswordStrength => {
  const errors: string[] = []

  if (password.length < PASSWORD_REQUIREMENTS.minLength) {
    errors.push(`Password must be at least ${PASSWORD_REQUIREMENTS.minLength} characters long`)
  }

  if (!PASSWORD_REQUIREMENTS.uppercase.test(password)) {
    errors.push("Password must contain at least one uppercase letter")
  }

  if (!PASSWORD_REQUIREMENTS.lowercase.test(password)) {
    errors.push("Password must contain at least one lowercase letter")
  }

  if (!PASSWORD_REQUIREMENTS.number.test(password)) {
    errors.push("Password must contain at least one number")
  }

  if (!PASSWORD_REQUIREMENTS.special.test(password)) {
    errors.push("Password must contain at least one special character (!@#$%&_*)")
  }

  const isValid = errors.length === 0

  // Determine strength
  let strength: "weak" | "fair" | "good" | "strong" = "weak"
  if (isValid) {
    const meetsAll = [
      PASSWORD_REQUIREMENTS.uppercase.test(password),
      PASSWORD_REQUIREMENTS.lowercase.test(password),
      PASSWORD_REQUIREMENTS.number.test(password),
      PASSWORD_REQUIREMENTS.special.test(password),
      password.length >= 12,
    ].filter(Boolean).length

    if (meetsAll >= 5) strength = "strong"
    else if (meetsAll >= 4) strength = "good"
    else if (meetsAll >= 3) strength = "fair"
  }

  return { isValid, errors, strength }
}
