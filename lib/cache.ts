import { Redis } from "@upstash/redis"
const redis = new Redis({ url: process.env.UPSTASH_REDIS_REST_URL!, token: process.env.UPSTASH_REDIS_REST_TOKEN! })
export async function getCachedJobs(key: string) {
  try { const d = await redis.get(key); return d } catch { return null }
}
export async function setCachedJobs(key: string, jobs: unknown, ttl = 300) {
  try { await redis.setex(key, ttl, JSON.stringify(jobs)) } catch {}
}
export function generateCacheKey(params: Record<string, unknown>) {
  const s = Object.entries(params).filter(([,v]) => v != null && v !== "").sort(([a],[b]) => a.localeCompare(b))
  return `jobs:${JSON.stringify(s)}`
}