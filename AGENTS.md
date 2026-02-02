# AGENTS.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server (uses Turbopack)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

To add shadcn/ui components:
```bash
npx shadcn@latest add <component-name>
```

## Architecture

**DevEvent** - A developer event discovery platform built with Next.js 16+ App Router.

### Tech Stack
- **Next.js 16+** with App Router, React Compiler enabled, Turbopack caching
- **React 19** with RSC (React Server Components)
- **TypeScript** with strict mode
- **Tailwind CSS v4** with `@theme inline` syntax and custom utilities
- **shadcn/ui** configured with ReactBits registry (`@react-bits`)
- **PostHog** for analytics and error tracking
- **OGL** for WebGL effects (light rays background)
- **MongoDB** for database (dependency installed)

### Directory Structure
- `app/` - Next.js App Router pages and layouts
- `components/` - React components (both client and server)
- `lib/` - Utilities (`utils.ts`) and constants (`constants.ts`)
- `public/` - Static assets (images, icons)

### Path Alias
`@/*` maps to project root (e.g., `@/components/Navbar`)

### Key Patterns

**PostHog Initialization:** Uses `instrumentation-client.ts` (Next.js 15.3+ approach). Never use PostHogProvider alongside this - it's the sole client-side initialization point.

**PostHog Proxy:** Analytics requests are proxied through `/ingest/*` rewrites in `next.config.ts` to avoid ad blockers.

**Client Components:** Mark with `'use client'` directive. PostHog event capture happens in client components (see `Navbar.tsx`, `EventCard.tsx` for patterns).

**Styling:** Custom Tailwind utilities defined in `globals.css`:
- `flex-center` - flex centering
- `text-gradient` - gradient text effect
- `glass` - glassmorphism effect
- `card-shadow` - card box shadow

**Fonts:** Schibsted Grotesk (headings) and Martian Mono (code) loaded via `next/font/google`.

### Environment Variables
Required in `.env.local`:
- `NEXT_PUBLIC_POSTHOG_KEY` - PostHog project API key

## Code Style
- Use functional components with TypeScript interfaces for props
- Prefer Server Components; use `'use client'` only when needed
- Track user interactions with PostHog (`posthog.capture()`)
