import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
const inter = Inter({ subsets: ["latin"] })
export const metadata: Metadata = { title: "JobFinder - Find Your Next Opportunity", description: "Search jobs from 348K+ sources." }
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body className={inter.className}><div className="min-h-screen bg-gray-50"><header className="bg-white border-b border-gray-200 sticky top-0 z-50"><div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between"><a href="/jobs" className="text-2xl font-bold text-blue-600">JobFinder</a><nav className="flex gap-6"><a href="/jobs" className="text-gray-600 hover:text-blue-600 font-medium">Search Jobs</a></nav></div></header>{children}<footer className="bg-white border-t border-gray-200 mt-12"><div className="max-w-7xl mx-auto px-4 py-6 text-center text-gray-500 text-sm">Powered by TheirStack API</div></footer></div></body></html>}