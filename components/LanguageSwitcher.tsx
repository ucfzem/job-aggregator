"use client"
import { useLanguage } from "./LanguageProvider"
import { languages, type Lang } from "@/lib/i18n"
import { cn } from "@/lib/utils"

export function LanguageSwitcher() {
  const { lang, setLang } = useLanguage()
  const list = Object.entries(languages) as [Lang, typeof languages["en"]][]

  return (
    <div className="flex gap-1">
      {list.map(([key, val]) => (
        <button
          key={key}
          onClick={() => setLang(key)}
          className={cn(
            "px-2 py-1 text-sm rounded-md transition-colors",
            key === lang
              ? "bg-primary text-primary-foreground font-semibold"
              : "hover:bg-card text-muted-foreground"
          )}
          title={val.label}
        >
          {val.flag}
        </button>
      ))}
    </div>
  )
}
