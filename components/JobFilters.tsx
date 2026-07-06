"use client"
import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Filter, X } from "lucide-react"
export function JobFilters({ defaultRemote=false,defaultSalaryMin="",defaultSalaryMax="",defaultDays="30",defaultSeniority="" }: { defaultRemote?: boolean; defaultSalaryMin?: string; defaultSalaryMax?: string; defaultDays?: string; defaultSeniority?: string }) {
  const router = useRouter()
  const sp = useSearchParams()
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
  return <Card className="p-5"><div className="flex items-center justify-between mb-4"><div className="flex items-center gap-2"><Filter className="w-4 h-4"/><h3 className="font-semibold">Filters</h3></div>{has&&<button onClick={clear} className="text-sm text-red-500 flex items-center gap-1"><X className="w-3 h-3"/>Clear</button>}</div><div className="space-y-4"><div><label className="text-sm font-medium block mb-2">Work Type</label><label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={remote} onChange={e=>setRemote(e.target.checked)} className="w-4 h-4 rounded text-blue-600"/><span className="text-sm">Remote only</span></label></div><div><label className="text-sm font-medium block mb-2">Date Posted</label><Select value={days} onChange={e=>setDays(e.target.value)}><option value="1">24h</option><option value="3">3 days</option><option value="7">7 days</option><option value="14">14 days</option><option value="30">30 days</option></Select></div><div><label className="text-sm font-medium block mb-2">Salary (USD)</label><div className="flex gap-2"><Input type="number" placeholder="Min" value={salaryMin} onChange={e=>setSalaryMin(e.target.value)}/><Input type="number" placeholder="Max" value={salaryMax} onChange={e=>setSalaryMax(e.target.value)}/></div></div><div><label className="text-sm font-medium block mb-2">Seniority</label><Select value={seniority} onChange={e=>setSeniority(e.target.value)}><option value="">Any</option><option value="junior">Junior</option><option value="mid">Mid</option><option value="senior">Senior</option><option value="lead">Lead</option></Select></div><Button onClick={apply} className="w-full">Apply Filters</Button></div></Card>
}