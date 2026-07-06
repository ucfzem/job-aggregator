"use client"
import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { JobCard } from "./JobCard"
import { Button } from "@/components/ui/button"
import { Loader2, AlertCircle } from "lucide-react"
export function JobList({ searchParams }: { searchParams: any }) {
  const [jobs, setJobs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string|null>(null)
  const [page, setPage] = useState(parseInt(searchParams.page||"1"))
  const sp = useSearchParams()
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
  if(loading)return <div className="flex flex-col items-center py-16"><Loader2 className="w-8 h-8 animate-spin text-blue-600 mb-4"/><p className="text-gray-500">Searching 348K+ sources...</p></div>
  if(error)return <div className="flex flex-col items-center py-16"><AlertCircle className="w-8 h-8 text-red-500 mb-4"/><p className="text-red-600 font-medium">{error}</p></div>
  if(jobs.length===0)return <div className="flex flex-col items-center py-16"><p className="text-gray-500 text-lg">No jobs found</p><p className="text-gray-400 text-sm mt-2">Try adjusting filters</p></div>
  return <div><div className="flex items-center justify-between mb-4"><p className="text-sm text-gray-500">{jobs.length} jobs found</p><p className="text-sm text-gray-400">Page {page}</p></div><div className="space-y-4">{jobs.map((j:any)=><JobCard key={j.id} job={j}/>)}</div><div className="flex items-center justify-center gap-4 mt-8"><Button variant="outline" onClick={()=>{const p=new URLSearchParams(sp.toString());p.set("page",String(page-1));window.location.href=`/jobs?${p.toString()}`}} disabled={page<=1}>Previous</Button><span className="text-sm">Page {page}</span><Button variant="outline" onClick={()=>{const p=new URLSearchParams(sp.toString());p.set("page",String(page+1));window.location.href=`/jobs?${p.toString()}`}} disabled={jobs.length<20}>Next</Button></div></div>
}