import { NextRequest, NextResponse } from "next/server"
import { getJobById } from "@/lib/theirstack"
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const job = await getJobById(id)
    if (!job) return NextResponse.json({ error: "Job not found" }, { status: 404 })
    return NextResponse.json({ job })
  } catch { return NextResponse.json({ error: "Failed to fetch job" }, { status: 500 }) }
}