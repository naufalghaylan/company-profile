import React from "react"
import ReactDOM from "react-dom/client"
import { RouterProvider } from "react-router-dom"

import { router } from "./app/router"
import { initBackendless } from "./lib/backendless/backendless.config"
import "./index.css"

initBackendless()

const initAOS = async () => {
  const [{ default: AOS }] = await Promise.all([
    import("aos"),
    import("aos/dist/aos.css"),
  ])

  AOS.init({
    duration: 700,
    once: true,
    easing: "ease-out-cubic",
    offset: 80,
  })
}

const runWhenIdle = (callback: () => void) => {
  const globalWithIdle = globalThis as typeof globalThis & {
    requestIdleCallback?: (cb: () => void) => number
  }

  if (typeof globalWithIdle.requestIdleCallback === "function") {
    globalWithIdle.requestIdleCallback(() => callback())
    return
  }

  globalThis.setTimeout(callback, 1)
}

runWhenIdle(() => {
  void initAOS()
})

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)