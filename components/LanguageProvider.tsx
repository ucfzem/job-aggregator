"use client"
import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import type { Lang } from "@/lib/i18n"

const LangContext = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({ lang: "en", setLang: () => {} })

export function useLanguage() { return useContext(LangContext) }

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem("lang") as Lang | null
    if (saved && ["en", "fr", "es", "ar"].includes(saved)) setLangState(saved)
  }, [])

  function setLang(l: Lang) {
    setLangState(l)
    localStorage.setItem("lang", l)
    document.documentElement.dir = l === "ar" ? "rtl" : "ltr"
  }

  if (!mounted) return <>{children}</>

  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>
}
