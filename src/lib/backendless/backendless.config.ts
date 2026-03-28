import Backendless from "backendless"

const DEFAULT_SERVER_URL = "https://api.backendless.com"

const SERVER_URL = import.meta.env.VITE_BACKENDLESS_SERVER_URL || DEFAULT_SERVER_URL
const APP_ID = import.meta.env.VITE_BACKENDLESS_APP_ID
const API_KEY = import.meta.env.VITE_BACKENDLESS_API_KEY

let hasInitialized = false

export function initBackendless(): void {
  if (hasInitialized) {
    return
  }

  if (!APP_ID || !API_KEY) {
    console.warn("Backendless is not initialized. Set VITE_BACKENDLESS_APP_ID and VITE_BACKENDLESS_API_KEY in .env")
    return
  }

  Backendless.serverURL = SERVER_URL
  Backendless.initApp(APP_ID, API_KEY)
  hasInitialized = true
}

export default Backendless
