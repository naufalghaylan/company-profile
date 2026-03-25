
import { NavLink, Link } from "react-router-dom"
import { navigation } from "@/app/navigations"
import Container from "./Container"
import { Button } from "@/components/ui/button"
import MobileMenu from "./MobileMenu"
import { useState, useEffect } from "react"

export default function Navbar() {

  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

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
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white font-bold shadow-md transition-all duration-200 group-hover:shadow-[0_2px_8px_0_theme(colors.primary)/40]">
              T
            </div>

            <span className="text-lg font-semibold text-gray-900 transition-colors duration-200 group-hover:text-primary">
              TechFlow
            </span>
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

            <div className="hidden md:flex">
              <Button className="rounded-full px-6 transition-transform duration-200 hover:scale-105">
                Get Started
              </Button>
            </div>

            <MobileMenu />

          </div>

        </nav>
      </Container>
    </header>
  )
}

