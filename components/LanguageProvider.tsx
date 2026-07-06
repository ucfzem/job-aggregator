"use client"
import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import type { Lang } from "@/lib/i18n"

const LangContext = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({ lang: "fr", setLang: () => {} })

export function useLanguage() { return useContext(LangContext) }

function applyLangAttr(l: Lang) {
  document.documentElement.lang = l
  document.documentElement.dir = l === "ar" ? "rtl" : "ltr"
}

function writeCookie(l: Lang) {
  document.cookie = `lang=${l};path=/;max-age=31536000;SameSite=Lax`
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("fr")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem("lang") as Lang | null
    const initial = (saved && ["en", "fr", "es", "ar"].includes(saved)) ? saved : "fr"
    setLangState(initial)
    applyLangAttr(initial)
    writeCookie(initial)
    setMounted(true)
  }, [])

  function setLang(l: Lang) {
    setLangState(l)
    localStorage.setItem("lang", l)
    writeCookie(l)
    applyLangAttr(l)
  }

  if (!mounted) return <>{children}</>

  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>
}
