import { useEffect } from "react"
import { Navigate, Outlet, useLocation } from "react-router-dom"

import { useAuthStore } from "@/features/auth/store/authStore"

function AuthLoadingScreen() {
  return (
    <section className="flex min-h-[50vh] items-center justify-center px-4 py-16">
      <p className="text-sm text-muted-foreground">Checking session...</p>
    </section>
  )
}

export function GuestRouteGuard() {
  const user = useAuthStore((state) => state.user)
  const isCheckingSession = useAuthStore((state) => state.isCheckingSession)
  const refreshUser = useAuthStore((state) => state.refreshUser)

  useEffect(() => {
    refreshUser().catch(() => {
      // refresh errors are handled in the auth store
    })
  }, [refreshUser])

  if (isCheckingSession) {
    return <AuthLoadingScreen />
  }

  if (user) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}

export function AuthRouteGuard() {
  const user = useAuthStore((state) => state.user)
  const isCheckingSession = useAuthStore((state) => state.isCheckingSession)
  const refreshUser = useAuthStore((state) => state.refreshUser)
  const location = useLocation()

  useEffect(() => {
    refreshUser().catch(() => {
      // refresh errors are handled in the auth store
    })
  }, [refreshUser])

  if (isCheckingSession) {
    return <AuthLoadingScreen />
  }

  if (!user) {
    const from = `${location.pathname}${location.search}${location.hash}`
    const intentMessage = location.pathname === "/blog/create"
      ? "Log in to create blog post"
      : "Log in to continue"

    return <Navigate to="/login" state={{ from, intentMessage }} replace />
  }

  return <Outlet />
}