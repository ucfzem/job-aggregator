import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { cookies } from "next/headers"
import "./globals.css"
import { ThemeProvider } from "@/components/ThemeProvider"
import { LanguageProvider } from "@/components/LanguageProvider"
import { ThemeToggle } from "@/components/ThemeToggle"
import { LanguageSwitcher } from "@/components/LanguageSwitcher"
import { t, type Lang } from "@/lib/i18n"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "JobFinder - Find Your Next Opportunity",
  description: "Search jobs from 348K+ sources.",
}

function getLangFromCookie(): Lang {
  try {
    const c = cookies()
    const v = c.get("lang")?.value
    if (v && ["en","fr","es","ar"].includes(v)) return v as Lang
  } catch {}
  return "fr"
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const lang = getLangFromCookie()
  const dir = lang === "ar" ? "rtl" : "ltr"

  return (
    <html lang={lang} dir={dir} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='light'){document.documentElement.classList.remove('dark')}else{document.documentElement.classList.add('dark')}}catch(e){document.documentElement.classList.add('dark')}})()`,
          }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          <LanguageProvider>
            <div className="min-h-screen bg-background">
              <header className="bg-card border-b border-border sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                  <a href="/jobs" className="text-2xl font-bold text-primary">JobFinder</a>
                  <div className="flex items-center gap-3">
                    <a href="/jobs" className="text-muted-foreground hover:text-foreground font-medium transition-colors">{t(lang, "nav.search")}</a>
                    <LanguageSwitcher />
                    <ThemeToggle />
                  </div>
                </div>
              </header>
              {children}
              <footer className="bg-card border-t border-border mt-12">
                <div className="max-w-7xl mx-auto px-4 py-6 text-center text-muted-foreground text-sm">
                  {t(lang, "footer")}
                </div>
              </footer>
            </div>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
