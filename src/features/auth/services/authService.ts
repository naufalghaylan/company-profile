// Auth service is managed via Zustand store (useAuthStore)
// This file is kept for consistency but all auth logic lives in the store

import { useAuthStore } from "@/features/auth/store/authStore"

export const getAuthStore = () => useAuthStore

export const signUp = (email: string, password: string) => useAuthStore.getState().signUp(email, password)
export const signIn = (email: string, password: string) => useAuthStore.getState().signIn(email, password)
export const signOut = () => useAuthStore.getState().signOut()
export const refreshUser = () => useAuthStore.getState().refreshUser()
