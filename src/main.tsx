import React from "react"
import ReactDOM from "react-dom/client"
import { RouterProvider } from "react-router-dom"
import AOS from "aos"

import { router } from "./app/router"
import { initBackendless } from "./lib/backendless/backendless.config"
import "./index.css"
import "aos/dist/aos.css"

initBackendless()

AOS.init({
  duration: 700,
  once: true,
  easing: "ease-out-cubic",
  offset: 80,
})

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)