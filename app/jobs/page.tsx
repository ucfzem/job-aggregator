import { Suspense } from "react"
import { SearchBar } from "@/components/SearchBar"
import { JobFilters } from "@/components/JobFilters"
import { JobList } from "@/components/JobList"
export default async function JobsPage(props: { searchParams: Promise<{ q?: string; location?: string; remote?: string; salaryMin?: string; salaryMax?: string; days?: string; seniority?: string; page?: string }> }) {
  const searchParams = await props.searchParams
  return <main className="max-w-7xl mx-auto px-4 py-8"><div className="mb-8"><h1 className="text-3xl font-bold text-gray-900 mb-2">Find Your Next Job</h1><p className="text-gray-600">Search across 348K+ job sources</p></div><Suspense><SearchBar defaultQuery={searchParams.q || ""} defaultLocation={searchParams.location || ""} /></Suspense><div className="mt-8 flex flex-col lg:flex-row gap-8"><aside className="lg:w-72"><Suspense><JobFilters defaultRemote={searchParams.remote === "true"} defaultSalaryMin={searchParams.salaryMin || ""} defaultSalaryMax={searchParams.salaryMax || ""} defaultDays={searchParams.days || "30"} defaultSeniority={searchParams.seniority || ""} /></Suspense></aside><div className="flex-1"><Suspense><JobList searchParams={searchParams} /></Suspense></div></div></main>
}