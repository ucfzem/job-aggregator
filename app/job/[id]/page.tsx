import Link from "next/link"
import { getJobById } from "@/lib/theirstack"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { MapPin, DollarSign, Clock, Globe, ExternalLink, ArrowLeft, Building2 } from "lucide-react"
import { t, type Lang } from "@/lib/i18n"

function getLangFromCookie(cookie: string): Lang {
  const match = cookie?.match(/lang=(\w+)/)
  if (match && ["en","fr","es","ar"].includes(match[1])) return match[1] as Lang
  return "en"
}

export default async function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const job = await getJobById(id)
  const lang = "en"
  if (!job) return <main className="max-w-4xl mx-auto px-4 py-16 text-center"><h1 className="text-2xl font-bold mb-4">{t(lang,"job.not_found")}</h1><p className="text-muted-foreground mb-8">{t(lang,"job.expired")}</p><Link href="/jobs"><Button>{t(lang,"job.back_search")}</Button></Link></main>
  const daysAgo = Math.floor((Date.now() - new Date(job.posted_at).getTime()) / 86400000)
  const salaryDisplay = job.salary_min && job.salary_max ? `$${(job.salary_min/1000).toFixed(0)}k - $${(job.salary_max/1000).toFixed(0)}k` : t(lang,"job.salary_hidden")
  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <Link href="/jobs" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> {t(lang,"job.back")}
      </Link>
      <Card className="p-8">
        <div className="flex items-start gap-5 mb-6">
          <div className="flex-shrink-0">
            {job.company_logo_url
              ? <img src={job.company_logo_url} alt={job.company_name} className="w-16 h-16 object-contain rounded-lg bg-card" />
              : <div className="w-16 h-16 rounded-lg bg-primary/20 flex items-center justify-center"><Building2 className="w-8 h-8 text-primary" /></div>}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">{job.title}</h1>
            <p className="text-lg text-muted-foreground mt-1">{job.company_name}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mb-6">
          <Badge variant="secondary" className="flex items-center gap-1"><MapPin className="w-3 h-3" />{job.location}</Badge>
          {job.remote && <Badge><Globe className="w-3 h-3" />Remote</Badge>}
          <Badge variant="outline"><DollarSign className="w-3 h-3" />{salaryDisplay}</Badge>
          <Badge variant="secondary"><Clock className="w-3 h-3" />{daysAgo === 0 ? t(lang,"job.today") : t(lang,"job.days_ago",String(daysAgo))}</Badge>
          {job.seniority && <Badge variant="secondary">{job.seniority}</Badge>}
        </div>
        {job.technologies?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {job.technologies.map((t: string) => <span key={t} className="text-sm bg-muted text-muted-foreground px-3 py-1 rounded-md">{t}</span>)}
          </div>
        )}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3 text-foreground">{t(lang,"job.description")}</h2>
          <div className="text-muted-foreground whitespace-pre-wrap leading-relaxed">{job.description}</div>
        </div>
        <div className="flex gap-4">
          <a href={job.url} target="_blank" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:brightness-110 font-medium transition-all">
            {t(lang,"job.apply")} <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </Card>
    </main>
  )
}
