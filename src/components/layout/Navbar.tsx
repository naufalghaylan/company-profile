
import { NavLink, Link } from "react-router-dom"
import { navigation } from "@/app/navigations"
import Container from "./Container"
import { Button } from "@/components/ui/button"
import MobileMenu from "./MobileMenu"
import { useState, useEffect } from "react"
import { useAuthStore } from "@/features/auth/store/authStore"
import techflowLogo from "@/assets/techflowlogo.svg"

export default function Navbar() {

  const [isScrolled, setIsScrolled] = useState(false)
  const user = useAuthStore((state) => state.user)
  const isLoading = useAuthStore((state) => state.isLoading)
  const signOut = useAuthStore((state) => state.signOut)
  const refreshUser = useAuthStore((state) => state.refreshUser)

  useEffect(() => {
    let frameId = 0

    const handleScroll = () => {
      if (frameId !== 0) {
        return
      }

      frameId = window.requestAnimationFrame(() => {
        frameId = 0
        const nextIsScrolled = window.scrollY > 10
        setIsScrolled((prev) => (prev === nextIsScrolled ? prev : nextIsScrolled))
      })
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      if (frameId !== 0) {
        window.cancelAnimationFrame(frameId)
      }

      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  useEffect(() => {
    refreshUser().catch(() => {
      // refresh errors are handled in the auth store
    })
  }, [refreshUser])

  const handleLogout = () => {
    signOut()
    window.location.assign("/")
  }

  const tagline = "Build with Clarity. Scale with Confidence."

  return (
    <header
      className={`
        sticky top-0 z-50 w-full transition-all duration-300
        ${isScrolled
          ? "bg-white/80 backdrop-blur-md shadow-sm border-b"
          : "bg-transparent"}
      `}
    >
      <Container>
        <nav className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted p-1 shadow-md transition-all duration-200 group-hover:shadow-[0_2px_8px_0_theme(colors.primary)/40]">
              <img
                src={techflowLogo}
                alt="TechFlow logo"
                className="h-full w-full rounded-lg object-contain"
              />
            </div>

            <div className="leading-tight">
              <span className="block text-lg font-semibold text-gray-900 transition-colors duration-200 group-hover:text-primary">
                TechFlow
              </span>
              <span className="hidden text-[11px] text-muted-foreground lg:block">
                {tagline}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navigation.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `group relative text-sm font-medium transition-colors
                  ${isActive ? "text-primary" : "text-gray-600 hover:text-gray-900"}`
                }
              >
                {({ isActive }) => (
                  <span className="relative">
                    {item.label}

                    <span
                      className={`absolute left-0 -bottom-1 h-0.5 bg-primary origin-left transition-all duration-300
                      ${isActive ? "w-full" : "w-0 group-hover:w-full"}`}
                    />
                  </span>
                )}
              </NavLink>
            ))}
          </div>

          {/* CTA + Mobile */}
          <div className="flex items-center gap-3">

            <div className="hidden md:flex items-center gap-2">
              <Button asChild className="rounded-full px-6 transition-transform duration-200 hover:scale-105">
                <Link to="/services">Get Started</Link>
              </Button>

              {isLoading ? (
                <Button variant="outline" className="rounded-full px-6" disabled>
                  Loading...
                </Button>
              ) : user ? (
                <Button
                  variant="outline"
                  className="rounded-full px-6"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              ) : (
                <Button asChild variant="outline" className="rounded-full px-6">
                  <Link to="/login">Login</Link>
                </Button>
              )}
            </div>

            <MobileMenu />

          </div>

        </nav>
      </Container>
    </header>
  )
}

