const API_KEY = process.env.THEIRSTACK_API_KEY!
const BASE = "https://api.theirstack.com/v1"
export async function searchJobs(params: Record<string, unknown>) {
  const res = await fetch(`${BASE}/jobs/search`, { method: "POST", headers: { Authorization: `Bearer ${API_KEY}`, "Content-Type": "application/json" }, body: JSON.stringify({ limit: 20, offset: 0, ...params }) })
  if (!res.ok) throw new Error(`API error: ${res.status}`)
  return (await res.json()).data || []
}
export async function getJobById(jobId: string) {
  const res = await fetch(`${BASE}/jobs/search`, { method: "POST", headers: { Authorization: `Bearer ${API_KEY}`, "Content-Type": "application/json" }, body: JSON.stringify({ limit: 1, offset: 0, job_description_pattern: jobId }) })
  if (!res.ok) throw new Error(`API error: ${res.status}`)
  return (await res.json()).data?.[0] || null
}