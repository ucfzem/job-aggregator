# Job Aggregator - Conversation Log

## Changes Made

### Initial Setup
- Created Next.js 15 project with TheirStack API + Upstash Redis
- Job search with filters (remote, salary, date, seniority)
- Job detail page with company info and apply link

### Theme & i18n Overhaul (Current)
- **Dark Mode**: Brown background, gold/yellow accents, white text
- **Light Mode**: Beige background, brown text, gold accents
- **4 Languages**: English, French, Spanish, Arabic (Moroccan flag)
- Language switcher with flag emoji buttons
- Theme toggle with sun/moon icons
- Full i18n for all UI text across all 4 languages
- RTL support for Arabic

### Colors
- Light: bg beige (#F5F0E1), fg brown (#5C3D2E), primary gold (#C9A84C)
- Dark: bg brown (#3E2723), fg white, primary gold (#D4AF37)

### Files Created/Modified
- `lib/i18n.ts` - Translation dictionary for all 4 languages
- `components/ThemeProvider.tsx` - Dark/light mode context
- `components/LanguageProvider.tsx` - Language context with localStorage
- `components/ThemeToggle.tsx` - Sun/moon toggle button
- `components/LanguageSwitcher.tsx` - Flag buttons for lang switching
- `app/globals.css` - CSS variables for both themes
- `tailwind.config.ts` - Custom color palette + darkMode class
- All UI components updated with theme-aware classes + i18n hooks

### Deploy
- Vercel: https://job-aggregator-57brm3x6g-ucfzem-s-projects.vercel.app
- GitHub Pages redirect: https://ucfzem.github.io/job-aggregator/
- GitHub: https://github.com/ucfzem/job-aggregator

### Bug Fixes (7)
1. **Language cookie sync** — LanguageProvider now writes `lang` cookie so server components can read it
2. **Job detail i18n** — reads lang from cookie via `cookies()`, not hardcoded `"fr"`
3. **RTL/lang restore on reload** — `applyLangAttr()` called on mount, not just on language change
4. **FOUC theme flash** — inline `<script>` in `<head>` applies `dark` class before React mounts
5. **noopener noreferrer** — added to all external `target="_blank"` links (JobCard + JobDetail)
6. **Client-side pagination** — uses `router.push()` with `{ scroll: false }` instead of `window.location.href`
7. **Header/footer i18n** — "Search Jobs" nav and "Powered by" footer use `t(lang, ...)` instead of hardcoded English
8. **invalid brown-700** — ThemeToggle moon icon uses `text-foreground/70` instead of nonexistent Tailwind class
