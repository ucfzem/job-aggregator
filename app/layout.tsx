import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/ThemeProvider"
import { LanguageProvider } from "@/components/LanguageProvider"
import { ThemeToggle } from "@/components/ThemeToggle"
import { LanguageSwitcher } from "@/components/LanguageSwitcher"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "JobFinder - Find Your Next Opportunity",
  description: "Search jobs from 348K+ sources.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <LanguageProvider>
            <div className="min-h-screen bg-background">
              <header className="bg-card border-b border-border sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                  <a href="/jobs" className="text-2xl font-bold text-primary">JobFinder</a>
                  <div className="flex items-center gap-3">
                    <a href="/jobs" className="text-muted-foreground hover:text-foreground font-medium transition-colors">Search Jobs</a>
                    <LanguageSwitcher />
                    <ThemeToggle />
                  </div>
                </div>
              </header>
              {children}
              <footer className="bg-card border-t border-border mt-12">
                <div className="max-w-7xl mx-auto px-4 py-6 text-center text-muted-foreground text-sm">
                  Powered by TheirStack API
                </div>
              </footer>
            </div>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
