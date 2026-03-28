import { create } from "zustand"
import Backendless from "@/lib/backendless/backendless.config"
import type { AuthState, AuthActions } from "@/features/auth/types/auth.types"
import {
  MAX_EMAIL_LENGTH,
  MAX_PASSWORD_LENGTH,
  MIN_PASSWORD_LENGTH,
  isValidEmailFormat,
  sanitizeEmailInput,
  sanitizePasswordInput,
} from "@/features/auth/utils/authInput"

type AuthStore = AuthState & AuthActions

const GENERIC_LOGIN_ERROR = "Authentication failed. Please check your credentials and try again."
const GENERIC_REGISTER_ERROR = "Registration failed. Please verify your input and try again."
const GENERIC_SIGNOUT_ERROR = "Failed to sign out. Please try again."

function readUserName(user: unknown): string | undefined {
  if (typeof user !== "object" || user === null) {
    return undefined
  }

  const maybeName = (user as Record<string, unknown>).name
  return typeof maybeName === "string" && maybeName.trim() ? maybeName.trim() : undefined
}

function hasValidAuthPayload(email: string, password: string): boolean {
  if (!email || !password) {
    return false
  }

  if (email.length > MAX_EMAIL_LENGTH || password.length > MAX_PASSWORD_LENGTH) {
    return false
  }

  if (password.length < MIN_PASSWORD_LENGTH) {
    return false
  }

  return isValidEmailFormat(email)
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isLoading: false,
  isCheckingSession: true,
  error: null,

  signUp: async (email: string, password: string) => {
    set({ isLoading: true, error: null })
    const normalizedEmail = sanitizeEmailInput(email)
    const sanitizedPassword = sanitizePasswordInput(password)

    if (!hasValidAuthPayload(normalizedEmail, sanitizedPassword)) {
      const validationError = new Error(GENERIC_REGISTER_ERROR)
      set({ error: GENERIC_REGISTER_ERROR, isLoading: false })
      throw validationError
    }

    try {
      await Backendless.UserService.register({ email: normalizedEmail, password: sanitizedPassword })
      await Backendless.UserService.login(normalizedEmail, sanitizedPassword, true)
      const currentUser = await Backendless.UserService.getCurrentUser()
      set({
        user: {
          email: currentUser.email || normalizedEmail,
          id: currentUser.objectId,
          name: readUserName(currentUser),
        },
        isLoading: false,
      })
    } catch {
      const authError = new Error(GENERIC_REGISTER_ERROR)
      set({ error: GENERIC_REGISTER_ERROR, isLoading: false })
      throw authError
    }
  },

  signIn: async (email: string, password: string) => {
    set({ isLoading: true, error: null })
    const normalizedEmail = sanitizeEmailInput(email)
    const sanitizedPassword = sanitizePasswordInput(password)

    if (!hasValidAuthPayload(normalizedEmail, sanitizedPassword)) {
      const validationError = new Error(GENERIC_LOGIN_ERROR)
      set({ error: GENERIC_LOGIN_ERROR, isLoading: false })
      throw validationError
    }

    try {
      const currentUser = await Backendless.UserService.login(normalizedEmail, sanitizedPassword, true)
      set({
        user: {
          email: currentUser.email || normalizedEmail,
          id: currentUser.objectId,
          name: readUserName(currentUser),
        },
        isLoading: false,
      })
    } catch {
      const authError = new Error(GENERIC_LOGIN_ERROR)
      set({ error: GENERIC_LOGIN_ERROR, isLoading: false })
      throw authError
    }
  },

  signOut: async () => {
    try {
      await Backendless.UserService.logout()
      set({ user: null, error: null })
    } catch {
      const signOutError = new Error(GENERIC_SIGNOUT_ERROR)
      set({ error: GENERIC_SIGNOUT_ERROR })
      throw signOutError
    }
  },

  refreshUser: async () => {
    set({ isCheckingSession: true })
    try {
      const isValid = await Backendless.UserService.isValidLogin()
      if (isValid) {
        const currentUser = await Backendless.UserService.getCurrentUser()
        set({
          user: {
            email: currentUser.email || "",
            id: currentUser.objectId,
            name: readUserName(currentUser),
          },
        })
      } else {
        set({ user: null })
      }
    } catch (err) {
      console.error("Failed to refresh user:", err)
      set({ user: null })
    } finally {
      set({ isCheckingSession: false })
    }
  },

  clearError: () => {
    set({ error: null })
  },
}))
