"use client"
import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

type Theme = "light" | "dark"

const ThemeContext = createContext<{ theme: Theme; toggle: () => void }>({ theme: "light", toggle: () => {} })

export function useTheme() { return useContext(ThemeContext) }

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const t = (localStorage.getItem("theme") as Theme) || "dark"
    setTheme(t)
    document.documentElement.classList.toggle("dark", t === "dark")
  }, [])

  function toggle() {
    const next = theme === "dark" ? "light" : "dark"
    setTheme(next)
    localStorage.setItem("theme", next)
    document.documentElement.classList.toggle("dark", next === "dark")
  }

  if (!mounted) return <>{children}</>

  return <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>
}
