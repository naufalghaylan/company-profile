
import { Menu } from "lucide-react"
import { NavLink, Link } from "react-router-dom"
import { navigation } from "@/app/navigations"
import { useAuthStore } from "@/features/auth/store/authStore"
import techflowLogo from "@/assets/techflowlogo.svg"

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet"

import { Button } from "@/components/ui/button"

export default function MobileMenu() {
  const user = useAuthStore((state) => state.user)
  const isLoading = useAuthStore((state) => state.isLoading)
  const signOut = useAuthStore((state) => state.signOut)
  const tagline = "Build with Clarity. Scale with Confidence."

  const handleLogout = () => {
    signOut()
    window.location.assign("/")
  }

  return (
    <div className="md:hidden">

      <Sheet>

        {/* Hamburger Button */}
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-lg"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>

        {/* Drawer */}
        <SheetContent
          side="right"
          className="w-[300px] p-0 flex flex-col"
        >

          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b">

            <Link to="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted p-1">
                <img
                  src={techflowLogo}
                  alt="TechFlow logo"
                  className="h-full w-full rounded-lg object-contain"
                />
              </div>

              <div className="leading-tight">
                <span className="block text-lg font-semibold">TechFlow</span>
                <span className="block text-[11px] text-muted-foreground">
                  {tagline}
                </span>
              </div>
            </Link>

          </div>

          {/* Navigation */}
          <nav className="flex flex-col px-4 py-6 gap-1">

            {navigation.map((item) => (
              <SheetClose asChild key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `rounded-lg px-4 py-3 text-base font-medium transition-all
                    ${
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              </SheetClose>
            ))}

          </nav>

          {/* Spacer */}
          <div className="flex-1" />

          {/* CTA + Auth */}
          <div className="p-6 border-t space-y-3">
            <SheetClose asChild>
              <Button asChild className="w-full rounded-full h-11 text-base">
                <Link to="/services">Get Started</Link>
              </Button>
            </SheetClose>

            {isLoading ? (
              <Button variant="outline" className="w-full rounded-full h-11 text-base" disabled>
                Loading...
              </Button>
            ) : user ? (
              <SheetClose asChild>
                <Button
                  variant="outline"
                  className="w-full rounded-full h-11 text-base"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </SheetClose>
            ) : (
              <SheetClose asChild>
                <Button asChild variant="outline" className="w-full rounded-full h-11 text-base">
                  <Link to="/login">Login</Link>
                </Button>
              </SheetClose>
            )}
          </div>

        </SheetContent>

      </Sheet>

    </div>
  )
}
