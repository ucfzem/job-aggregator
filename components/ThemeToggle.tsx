"use client"
import { useTheme } from "./ThemeProvider"
import { useLanguage } from "./LanguageProvider"
import { t } from "@/lib/i18n"
import { Sun, Moon } from "lucide-react"

export function ThemeToggle() {
  const { theme, toggle } = useTheme()
  const { lang } = useLanguage()
  return (
    <button onClick={toggle} className="p-2 rounded-lg transition-colors hover:bg-card" title={t(lang, theme === "dark" ? "theme.light" : "theme.dark")}>
      {theme === "dark" ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-brown-700" />}
    </button>
  )
}
