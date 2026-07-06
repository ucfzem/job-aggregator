import { NextRequest, NextResponse } from "next/server"
import { searchJobs } from "@/lib/theirstack"
import { getCachedJobs, setCachedJobs, generateCacheKey } from "@/lib/cache"
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { query, location, remote, salaryMin, salaryMax, daysPosted, seniority, page = 1 } = body
    const searchParams: Record<string, unknown> = { job_title_or: query ? [query] : undefined, job_country_code_or: location ? [location.toUpperCase()] : undefined, posted_at_max_age_days: daysPosted ? parseInt(daysPosted) : 30, remote: remote === true ? true : undefined, salary_min: salaryMin ? parseInt(salaryMin) : undefined, salary_max: salaryMax ? parseInt(salaryMax) : undefined, job_seniority_or: seniority ? [seniority] : undefined, limit: 20, offset: (page - 1) * 20 }
    const cacheKey = generateCacheKey(searchParams)
    const cached = await getCachedJobs(cacheKey)
    if (cached) return NextResponse.json({ jobs: cached, cached: true })
    const jobs = await searchJobs(searchParams)
    await setCachedJobs(cacheKey, jobs, 300)
    return NextResponse.json({ jobs, cached: false })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch jobs", message: error instanceof Error ? error.message : "Unknown" }, { status: 500 })
  }
}
export async function GET() { return NextResponse.json({ error: "Use POST" }, { status: 405 }) }