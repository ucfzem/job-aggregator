"use client"
import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Filter, X } from "lucide-react"
import { useLanguage } from "./LanguageProvider"
import { t } from "@/lib/i18n"

export function JobFilters({ defaultRemote=false,defaultSalaryMin="",defaultSalaryMax="",defaultDays="30",defaultSeniority="" }: { defaultRemote?: boolean; defaultSalaryMin?: string; defaultSalaryMax?: string; defaultDays?: string; defaultSeniority?: string }) {
  const router = useRouter()
  const sp = useSearchParams()
  const { lang } = useLanguage()
  const [remote, setRemote] = useState(defaultRemote)
  const [salaryMin, setSalaryMin] = useState(defaultSalaryMin)
  const [salaryMax, setSalaryMax] = useState(defaultSalaryMax)
  const [days, setDays] = useState(defaultDays)
  const [seniority, setSeniority] = useState(defaultSeniority)
  function apply() {
    const p = new URLSearchParams(sp.toString())
    if (remote) p.set("remote","true"); else p.delete("remote")
    if (salaryMin) p.set("salaryMin",salaryMin); else p.delete("salaryMin")
    if (salaryMax) p.set("salaryMax",salaryMax); else p.delete("salaryMax")
    if (days!=="30") p.set("days",days); else p.delete("days")
    if (seniority) p.set("seniority",seniority); else p.delete("seniority")
    p.set("page","1")
    router.push(`/jobs?${p.toString()}`)
  }
  function clear() {
    setRemote(false);setSalaryMin("");setSalaryMax("");setDays("30");setSeniority("")
    const p = new URLSearchParams(); const q=sp.get("q");const l=sp.get("location")
    if(q)p.set("q",q);if(l)p.set("location",l)
    router.push(`/jobs?${p.toString()}`)
  }
  const has = remote||salaryMin||salaryMax||days!=="30"||seniority
  return (
    <Card className="p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2"><Filter className="w-4 h-4 text-muted-foreground"/><h3 className="font-semibold">{t(lang, "filters.title")}</h3></div>
        {has&&<button onClick={clear} className="text-sm text-red-500 flex items-center gap-1"><X className="w-3 h-3"/>{t(lang, "filters.clear")}</button>}
      </div>
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium block mb-2">{t(lang, "filters.work_type")}</label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={remote} onChange={e=>setRemote(e.target.checked)} className="w-4 h-4 rounded accent-primary"/>
            <span className="text-sm">{t(lang, "filters.remote_only")}</span>
          </label>
        </div>
        <div>
          <label className="text-sm font-medium block mb-2">{t(lang, "filters.date_posted")}</label>
          <Select value={days} onChange={e=>setDays(e.target.value)}>
            <option value="1">{t(lang, "filters.day_1")}</option>
            <option value="3">{t(lang, "filters.day_3")}</option>
            <option value="7">{t(lang, "filters.day_7")}</option>
            <option value="14">{t(lang, "filters.day_14")}</option>
            <option value="30">{t(lang, "filters.day_30")}</option>
          </Select>
        </div>
        <div>
          <label className="text-sm font-medium block mb-2">{t(lang, "filters.salary")}</label>
          <div className="flex gap-2">
            <Input type="number" placeholder={t(lang, "filters.min")} value={salaryMin} onChange={e=>setSalaryMin(e.target.value)}/>
            <Input type="number" placeholder={t(lang, "filters.max")} value={salaryMax} onChange={e=>setSalaryMax(e.target.value)}/>
          </div>
        </div>
        <div>
          <label className="text-sm font-medium block mb-2">{t(lang, "filters.seniority")}</label>
          <Select value={seniority} onChange={e=>setSeniority(e.target.value)}>
            <option value="">{t(lang, "filters.any")}</option>
            <option value="junior">{t(lang, "filters.junior")}</option>
            <option value="mid">{t(lang, "filters.mid")}</option>
            <option value="senior">{t(lang, "filters.senior")}</option>
            <option value="lead">{t(lang, "filters.lead")}</option>
          </Select>
        </div>
        <Button onClick={apply} className="w-full">{t(lang, "filters.apply")}</Button>
      </div>
    </Card>
  )
}
