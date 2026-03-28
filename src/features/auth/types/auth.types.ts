export type AuthUser = {
  email: string
  id?: string
  name?: string
}

export type AuthState = {
  user: AuthUser | null
  isLoading: boolean
  isCheckingSession: boolean
  error: string | null
}

export type AuthActions = {
  signUp: (email: string, password: string) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => void
  refreshUser: () => Promise<void>
  clearError: () => void
}
