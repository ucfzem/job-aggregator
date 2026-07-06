import { Suspense } from "react"
import { cookies } from "next/headers"
import { SearchBar } from "@/components/SearchBar"
import { JobFilters } from "@/components/JobFilters"
import { JobList } from "@/components/JobList"
import { t, type Lang } from "@/lib/i18n"

async function getLang(): Promise<Lang> {
  try {
    const c = await cookies()
    const v = c.get("lang")?.value as Lang
    if (v && ["en","fr","es","ar"].includes(v)) return v
  } catch {}
  return "en"
}

export default async function JobsPage(props: { searchParams: Promise<{ q?: string; location?: string; remote?: string; salaryMin?: string; salaryMax?: string; days?: string; seniority?: string; page?: string }> }) {
  const searchParams = await props.searchParams
  const lang = await getLang()
  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">{t(lang, "hero.title")}</h1>
        <p className="text-muted-foreground">{t(lang, "hero.subtitle")}</p>
      </div>
      <Suspense><SearchBar defaultQuery={searchParams.q || ""} defaultLocation={searchParams.location || ""} /></Suspense>
      <div className="mt-8 flex flex-col lg:flex-row gap-8">
        <aside className="lg:w-72">
          <Suspense><JobFilters defaultRemote={searchParams.remote === "true"} defaultSalaryMin={searchParams.salaryMin || ""} defaultSalaryMax={searchParams.salaryMax || ""} defaultDays={searchParams.days || "30"} defaultSeniority={searchParams.seniority || ""} /></Suspense>
        </aside>
        <div className="flex-1">
          <Suspense><JobList searchParams={searchParams} /></Suspense>
        </div>
      </div>
    </main>
  )
}
