import { useEffect } from "react"
import AOS from "aos"
import { Outlet, useLocation } from "react-router-dom"
import Navbar from "./Navbar"
import Footer from "./Footer"

const LAST_VISITED_PATH_KEY = "lastVisitedPath"
const AUTH_ROUTES = new Set(["/login"])

function PageLayout() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" })
  }, [location.pathname])

  useEffect(() => {
    if (AUTH_ROUTES.has(location.pathname)) {
      return
    }

    const nextPath = `${location.pathname}${location.search}${location.hash}`
    sessionStorage.setItem(LAST_VISITED_PATH_KEY, nextPath)
  }, [location.hash, location.pathname, location.search])

  useEffect(() => {
    AOS.refreshHard()
  }, [location.pathname])

  return (
    <div className="min-h-screen flex flex-col">
      
      {/* Header */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />

    </div>
  )
}

export default PageLayout