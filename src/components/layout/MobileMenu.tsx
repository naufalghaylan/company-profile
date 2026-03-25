
import { Menu } from "lucide-react"
import { NavLink, Link } from "react-router-dom"
import { navigation } from "@/app/navigations"

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet"

import { Button } from "@/components/ui/button"

export default function MobileMenu() {
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
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white font-bold">
                T
              </div>

              <span className="text-lg font-semibold">
                TechFlow
              </span>
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

          {/* CTA */}
          <div className="p-6 border-t">

            <SheetClose asChild>
              <Button className="w-full rounded-full h-11 text-base">
                Get Started
              </Button>
            </SheetClose>

          </div>

        </SheetContent>

      </Sheet>

    </div>
  )
}
