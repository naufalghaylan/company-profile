export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const MIN_PASSWORD_LENGTH = 6
export const MAX_PASSWORD_LENGTH = 128
export const MAX_EMAIL_LENGTH = 254

const CONTROL_CHARS_REGEX = /[\u0000-\u001F\u007F]/g

export function sanitizeEmailInput(value: string): string {
  return value.replace(CONTROL_CHARS_REGEX, "").trim().toLowerCase()
}

export function sanitizePasswordInput(value: string): string {
  return value.replace(CONTROL_CHARS_REGEX, "")
}

export function isValidEmailFormat(value: string): boolean {
  return EMAIL_REGEX.test(value)
}
