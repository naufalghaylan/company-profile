    import { Outlet } from "react-router-dom"
    import Navbar from "./Navbar"

function PageLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      
      {/* Header */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer>
        Footer
      </footer>

    </div>
  )
}

export default PageLayout