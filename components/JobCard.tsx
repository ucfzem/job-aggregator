"use client"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { MapPin, DollarSign, Globe, ExternalLink, Building2 } from "lucide-react"
import { useLanguage } from "./LanguageProvider"
import { t } from "@/lib/i18n"

export function JobCard({ job }: { job: any }) {
  const { lang } = useLanguage()
  const daysAgo = Math.floor((Date.now()-new Date(job.posted_at).getTime())/86400000)
  const salary = job.salary_min&&job.salary_max?`$${(job.salary_min/1000).toFixed(0)}k-$${(job.salary_max/1000).toFixed(0)}k`:t(lang,"job.salary_na")
  const shortDesc = (job.description||"").length>200?job.description.substring(0,200)+"...":job.description
  return (
    <Card className="p-5 hover:shadow-lg transition-shadow">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          {job.company_logo_url
            ? <img src={job.company_logo_url} alt={job.company_name} className="w-14 h-14 object-contain rounded-lg bg-card"/>
            : <div className="w-14 h-14 rounded-lg bg-primary/20 flex items-center justify-center"><Building2 className="w-7 h-7 text-primary"/></div>}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <Link href={`/job/${job.id}`} className="text-lg font-semibold text-primary hover:underline line-clamp-1">{job.title}</Link>
              <p className="text-muted-foreground font-medium mt-0.5">{job.company_name}</p>
            </div>
            <span className="text-xs text-muted-foreground flex-shrink-0">{daysAgo===0?t(lang,"job.today"):t(lang,"job.days_ago",String(daysAgo))}</span>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            <Badge variant="secondary" className="flex items-center gap-1"><MapPin className="w-3 h-3"/>{job.location}</Badge>
            {job.remote&&<Badge className="flex items-center gap-1"><Globe className="w-3 h-3"/>Remote</Badge>}
            <Badge variant="outline"><DollarSign className="w-3 h-3"/>{salary}</Badge>
            {job.seniority&&<Badge variant="secondary">{job.seniority}</Badge>}
          </div>
          <p className="text-muted-foreground text-sm mt-3 line-clamp-2">{shortDesc}</p>
          {job.technologies?.length>0&&<div className="flex flex-wrap gap-1.5 mt-3">
            {job.technologies.slice(0,5).map((tech:string)=> <span key={tech} className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-md">{tech}</span>)}
            {job.technologies.length>5&&<span className="text-xs text-muted-foreground">+{job.technologies.length-5}</span>}
          </div>}
          <div className="flex gap-3 mt-4">
            <a href={job.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 bg-primary text-primary-foreground text-sm px-4 py-2 rounded-md hover:brightness-110 font-medium transition-all">{t(lang,"job.apply")} <ExternalLink className="w-3.5 h-3.5"/></a>
            <Link href={`/job/${job.id}`} className="inline-flex items-center gap-1.5 border border-border text-muted-foreground text-sm px-4 py-2 rounded-md hover:bg-card transition-colors">{t(lang,"job.details")}</Link>
          </div>
        </div>
      </div>
    </Card>
  )
}
