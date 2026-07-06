"use client"
import { useState, FormEvent } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, MapPin } from "lucide-react"
import { useLanguage } from "./LanguageProvider"
import { t } from "@/lib/i18n"
export function SearchBar({ defaultQuery = "", defaultLocation = "" }: { defaultQuery?: string; defaultLocation?: string }) {
  const router = useRouter()
  const sp = useSearchParams()
  const { lang } = useLanguage()
  const [query, setQuery] = useState(defaultQuery)
  const [location, setLocation] = useState(defaultLocation)
  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const p = new URLSearchParams(sp.toString())
    if (query) p.set("q", query); else p.delete("q")
    if (location) p.set("location", location); else p.delete("location")
    p.set("page", "1")
    router.push(`/jobs?${p.toString()}`)
  }
  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input placeholder={t(lang, "search.placeholder")} value={query} onChange={(e) => setQuery(e.target.value)} className="pl-10 h-12" />
      </div>
      <div className="relative flex-1">
        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input placeholder={t(lang, "search.location")} value={location} onChange={(e) => setLocation(e.target.value.toUpperCase())} className="pl-10 h-12" />
      </div>
      <Button type="submit" className="h-12 px-8">{t(lang, "search.button")}</Button>
    </form>
  )
}
