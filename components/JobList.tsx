"use client"
import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { JobCard } from "./JobCard"
import { Button } from "@/components/ui/button"
import { Loader2, AlertCircle } from "lucide-react"
import { useLanguage } from "./LanguageProvider"
import { t } from "@/lib/i18n"

export function JobList({ searchParams }: { searchParams: any }) {
  const [jobs, setJobs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string|null>(null)
  const [page, setPage] = useState(parseInt(searchParams.page||"1"))
  const sp = useSearchParams()
  const router = useRouter()
  const { lang } = useLanguage()

  useEffect(()=>{setPage(parseInt(searchParams.page||"1"))},[searchParams.page])

  useEffect(()=>{
    async function fetchJobs() {
      setLoading(true);setError(null)
      try {
        const res = await fetch("/api/jobs/search",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({query:searchParams.q,location:searchParams.location,remote:searchParams.remote==="true",salaryMin:searchParams.salaryMin,salaryMax:searchParams.salaryMax,daysPosted:searchParams.days,seniority:searchParams.seniority,page})})
        if(!res.ok)throw new Error((await res.json()).message||"Failed")
        const d=await res.json()
        setJobs(d.jobs||[])
      }catch(err){setError(err instanceof Error?err.message:"Error");setJobs([])}
      finally{setLoading(false)}
    }
    fetchJobs()
  },[searchParams,page])

  function goToPage(p: number) {
    const next = new URLSearchParams(sp.toString())
    next.set("page", String(p))
    router.push(`/jobs?${next.toString()}`, { scroll: false })
  }

  if(loading)return <div className="flex flex-col items-center py-16"><Loader2 className="w-8 h-8 animate-spin text-primary mb-4"/><p className="text-muted-foreground">{t(lang,"job.searching")}</p></div>
  if(error)return <div className="flex flex-col items-center py-16"><AlertCircle className="w-8 h-8 text-red-500 mb-4"/><p className="text-red-500 font-medium">{error}</p></div>
  if(jobs.length===0)return <div className="flex flex-col items-center py-16"><p className="text-muted-foreground text-lg">{t(lang,"job.none")}</p><p className="text-muted-foreground/60 text-sm mt-2">{t(lang,"job.none_hint")}</p></div>
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-muted-foreground">{t(lang,"job.found",String(jobs.length))}</p>
        <p className="text-sm text-muted-foreground/60">{t(lang,"job.page",String(page))}</p>
      </div>
      <div className="space-y-4">{jobs.map((j:any)=><JobCard key={j.id} job={j}/>)}</div>
      <div className="flex items-center justify-center gap-4 mt-8">
        <Button variant="outline" onClick={()=>goToPage(page-1)} disabled={page<=1}>{t(lang,"job.previous")}</Button>
        <span className="text-sm text-muted-foreground">{t(lang,"job.page",String(page))}</span>
        <Button variant="outline" onClick={()=>goToPage(page+1)} disabled={jobs.length<20}>{t(lang,"job.next")}</Button>
      </div>
    </div>
  )
}
