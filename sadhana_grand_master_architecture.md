# SADHANA SALON — GRAND MASTER ARCHITECTURE PLAN
### Principal Full-Stack Technical Blueprint · v1.0 · 2025–26
> *Authored for Viraj · Computer Engineering Student*  
> *Based on the Sadhana Salon Blueprint — "Warm Ritual Minimalism"*

---

## TABLE OF CONTENTS

1. [Technology Stack Definition](#1-technology-stack-definition)
2. [Production Folder Structure](#2-production-folder-structure)
3. [Professional Asset Strategy (Photography)](#3-professional-asset-strategy)
4. [Responsiveness & UI Engineering Rules](#4-responsiveness--ui-engineering-rules)
5. [Grand Master Implementation Plan (7 Phases)](#5-grand-master-implementation-plan)

---

## 1. TECHNOLOGY STACK DEFINITION

### 1.1 Core Decision: Why Next.js 14 (App Router)

The blueprint demands three non-negotiable capabilities: **cinematic scroll animations**, **stellar SEO** (to beat Jawed Habib / Looks Salon in Gujarat search results), and a **smooth booking integration**. No other stack satisfies all three as elegantly as Next.js 14 with the App Router.

| Requirement | Why Next.js Wins |
|---|---|
| SEO (rank for "salon in Ahmedabad") | Server-Side Rendering + automatic metadata API + structured data |
| Page transitions (The Sadhana Curtain) | App Router layout persistence makes DOM-level transitions possible without Barba.js |
| Performance (LCP <2.5s target) | Image optimization built-in, automatic code splitting, streaming |
| Future booking API routes | API routes (`/app/api/`) handle booking webhooks natively |
| Instagram feed integration | Server components fetch Instagram API server-side, no CORS issues |

**Verdict: Next.js 14 (App Router) + TypeScript.** Not React alone (no SSR), not Webflow (no future customization), not WordPress (cannot achieve GSAP-level animations without developer overhead).

---

### 1.2 Complete Stack Definition

#### FRONTEND

| Layer | Technology | Version | Rationale |
|---|---|---|---|
| Framework | **Next.js** | 14.x (App Router) | SSR + RSC + file-based routing + image optimization |
| Language | **TypeScript** | 5.x | Type safety for booking data, stylist profiles, CMS content |
| Styling | **Tailwind CSS** + **CSS Modules** | 3.x | Tailwind for utility layout; CSS Modules for complex component-specific animation states |
| Design Tokens | **CSS Custom Properties** | Native | Exactly as defined in blueprint (`--color-gold`, `--color-cream`, etc.) — single source of truth |
| Fonts | **next/font** (Google Fonts) | Built-in | Cormorant Garamond + Jost, zero layout shift, self-hosted via Next.js |

#### ANIMATION LAYER

| Library | Purpose | Notes |
|---|---|---|
| **GSAP 3** + **ScrollTrigger** | All scroll-based reveals, counters, gold rule line draw, parallax | Industry standard; GPU-accelerated. Register ScrollTrigger plugin in a client component. |
| **GSAP Flip** plugin | Gallery filter layout animations (items repositioning on tab switch) | Smoother than CSS grid animations |
| **Framer Motion** | Page transition overlay (The Sadhana Curtain), modal open/close, mobile menu | Integrates natively with Next.js App Router; Barba.js has conflicts with Next.js routing |
| **Lenis** | Smooth scroll (replaces default browser scroll) | Ultra-smooth scroll feel that elevates the premium experience; pairs perfectly with GSAP ScrollTrigger |

> **Why Framer Motion instead of Barba.js?** The blueprint recommends Barba.js but it was designed for vanilla HTML sites. With Next.js App Router, Framer Motion's `AnimatePresence` + layout animations handles page transitions with zero routing conflicts and better mobile behavior.

#### BACKEND & DATABASE

| Layer | Technology | Rationale |
|---|---|---|
| Runtime | **Next.js API Routes** (Edge Runtime where possible) | Booking webhooks, contact form, Instagram token refresh |
| Database | **Supabase** (PostgreSQL) | Free tier generous enough for salon scale; real-time subscriptions for future admin dashboard; built-in auth |
| ORM | **Prisma** | Type-safe database queries; auto-generates TypeScript types |
| CMS (Content) | **Sanity.io** (Studio v3) | Blog/Journal section, stylist profiles, services, testimonials — all editable by salon owner without touching code |
| Email (Contact Form) | **Resend** + **React Email** | Modern email API; beautiful transactional email templates in React |

> **Why Supabase over Firebase?** Supabase is PostgreSQL — relational data is natural for bookings (appointment → service → stylist → client relationships). Firebase's document model gets awkward here. Also, Supabase has a generous free tier and is open-source.

#### INTEGRATIONS

| Integration | Solution | Notes |
|---|---|---|
| Online Booking | **Fresha** (embedded widget) | Free for salons; best India coverage; customize widget CSS to match Sadhana palette |
| WhatsApp CTA | Native `wa.me` deep link | No library needed; floating button component |
| Instagram Feed | **Instagram Basic Display API** (server-side fetch) | Fetched in Next.js Server Component, cached with `revalidate: 3600` (refreshes hourly) |
| Google Reviews | **Google Places API** | Fetch 5★ reviews server-side; display in Testimonials section |
| Image CDN | **Cloudinary** | Serve WebP, auto-resize, lazy load; 40–60% smaller than raw JPEGs |
| Analytics | **GA4** + **Vercel Analytics** | GA4 for conversion events; Vercel Analytics for Core Web Vitals monitoring |
| Heatmaps | **Hotjar** (deferred load) | Load after `requestIdleCallback` to not impact LCP |

#### DEPLOYMENT & DEVOPS

| Tool | Purpose |
|---|---|
| **Vercel** | Hosting (zero-config Next.js deployment, edge network, preview URLs per branch) |
| **GitHub** | Version control (main + dev branches; never push directly to main) |
| **Vercel Environment Variables** | Secrets management (API keys, Supabase URL, etc.) |
| **Lighthouse CI** | Automated performance audits on every PR via GitHub Actions |

---

## 2. PRODUCTION FOLDER STRUCTURE

```
sadhana-salon/
│
├── .github/
│   └── workflows/
│       └── lighthouse-ci.yml           # Performance audit on every PR
│
├── public/
│   ├── fonts/                          # Self-hosted fallback fonts (if any)
│   ├── images/
│   │   ├── hero/                       # Hero video/photo (compressed)
│   │   ├── about/                      # About section photograph
│   │   ├── team/                       # Stylist portraits (grayscale source)
│   │   ├── gallery/                    # Portfolio work photos
│   │   ├── og/                         # Open Graph images (1200x630)
│   │   └── icons/                      # Thin-line SVG service icons
│   ├── videos/
│   │   └── hero-loop.mp4               # Hero background video (compressed <5MB)
│   ├── favicon.ico
│   └── sitemap.xml                     # Auto-generated (next-sitemap)
│
├── src/
│   ├── app/                            # Next.js 14 App Router
│   │   ├── layout.tsx                  # Root layout (fonts, metadata, providers)
│   │   ├── page.tsx                    # Home page (assembles all sections)
│   │   ├── not-found.tsx               # Custom 404 page
│   │   │
│   │   ├── services/
│   │   │   └── page.tsx                # Full services/pricing page
│   │   │
│   │   ├── team/
│   │   │   ├── page.tsx                # Team overview page
│   │   │   └── [slug]/
│   │   │       └── page.tsx            # Individual stylist profile page
│   │   │
│   │   ├── gallery/
│   │   │   └── page.tsx                # Full gallery page
│   │   │
│   │   ├── journal/
│   │   │   ├── page.tsx                # Blog listing page
│   │   │   └── [slug]/
│   │   │       └── page.tsx            # Individual blog post
│   │   │
│   │   ├── contact/
│   │   │   └── page.tsx                # Standalone contact page
│   │   │
│   │   └── api/
│   │       ├── contact/
│   │       │   └── route.ts            # Contact form handler (sends email via Resend)
│   │       ├── instagram/
│   │       │   └── route.ts            # Instagram feed proxy (caches tokens)
│   │       └── reviews/
│   │           └── route.ts            # Google Places reviews fetch
│   │
│   ├── components/
│   │   ├── layout/                     # Structural layout components
│   │   │   ├── Navbar.tsx              # Sticky nav with scroll behavior
│   │   │   ├── MobileMenu.tsx          # Hamburger → overlay menu
│   │   │   ├── Footer.tsx              # Full footer with columns
│   │   │   ├── PageTransition.tsx      # Framer Motion page curtain wrapper
│   │   │   └── ScrollToTop.tsx         # Floating scroll-to-top button
│   │   │
│   │   ├── sections/                   # Full-page-width section components
│   │   │   ├── HeroSection.tsx         # Video/photo hero with CTA
│   │   │   ├── ServicesSection.tsx     # Dark section, tab-filtered card grid
│   │   │   ├── AboutSection.tsx        # Split layout — image + text + stats bar
│   │   │   ├── TeamSection.tsx         # Stylist cards (grayscale → color hover)
│   │   │   ├── TestimonialsSection.tsx # Auto-rotating carousel + Google reviews
│   │   │   ├── GallerySection.tsx      # Masonry grid + filter + before/after
│   │   │   ├── JournalSection.tsx      # 3 latest blog cards
│   │   │   ├── ContactSection.tsx      # 3-column contact + form + map
│   │   │   └── PreFooterCTA.tsx        # Full-width "Your ritual begins…" band
│   │   │
│   │   ├── ui/                         # Reusable atomic UI components
│   │   │   ├── Button.tsx              # Primary (solid) + Ghost variants
│   │   │   ├── GoldDivider.tsx         # Animated gold rule line (signature element)
│   │   │   ├── SectionEyebrow.tsx      # Jost uppercase label + left gold line
│   │   │   ├── ServiceCard.tsx         # Dark card with icon, price, hover state
│   │   │   ├── StylistCard.tsx         # Grayscale→color portrait card
│   │   │   ├── GalleryItem.tsx         # Image with hover overlay + lightbox trigger
│   │   │   ├── TestimonialCard.tsx     # Quote + client + stars
│   │   │   ├── JournalCard.tsx         # Blog post preview card
│   │   │   ├── StatCounter.tsx         # Animated number counter (GSAP)
│   │   │   ├── BeforeAfterSlider.tsx   # CSS clip-path drag slider
│   │   │   ├── BookingModal.tsx        # Fresha widget wrapper modal
│   │   │   ├── WhatsAppButton.tsx      # Floating WhatsApp CTA (pulse animation)
│   │   │   ├── ScrollIndicator.tsx     # Hero pulse-line scroll indicator
│   │   │   ├── FormField.tsx           # Input with gold underline focus animation
│   │   │   └── Lightbox.tsx            # Full-screen image lightbox
│   │   │
│   │   └── providers/
│   │       ├── SmoothScrollProvider.tsx   # Lenis smooth scroll initializer
│   │       └── GSAPProvider.tsx           # GSAP context + ScrollTrigger setup
│   │
│   ├── lib/                            # Utilities and integrations
│   │   ├── sanity/
│   │   │   ├── client.ts               # Sanity client config
│   │   │   ├── queries.ts              # GROQ queries (services, team, blog)
│   │   │   └── image.ts                # Sanity image URL builder
│   │   ├── supabase/
│   │   │   ├── client.ts               # Supabase browser client
│   │   │   └── server.ts               # Supabase server client
│   │   ├── cloudinary.ts               # Cloudinary image transform helpers
│   │   ├── google-places.ts            # Google Reviews fetch + cache
│   │   ├── instagram.ts                # Instagram Basic Display API fetch
│   │   └── animations/
│   │       ├── gsap-config.ts          # GSAP defaults, eases, ScrollTrigger defaults
│   │       ├── scroll-reveals.ts       # Reusable ScrollTrigger animation presets
│   │       └── page-transitions.ts     # Framer Motion page variant definitions
│   │
│   ├── hooks/                          # Custom React hooks
│   │   ├── useScrollProgress.ts        # Track scroll position (for navbar)
│   │   ├── useCounterAnimation.ts      # GSAP counter hook for stat numbers
│   │   ├── useReducedMotion.ts         # Respects prefers-reduced-motion
│   │   └── useIntersectionObserver.ts  # Fallback for non-GSAP animations
│   │
│   ├── types/                          # TypeScript type definitions
│   │   ├── sanity.types.ts             # Auto-generated from Sanity schema
│   │   ├── booking.types.ts            # Booking flow data shapes
│   │   └── global.types.ts             # Site-wide shared types
│   │
│   ├── styles/
│   │   ├── globals.css                 # CSS custom properties (design tokens), resets
│   │   ├── typography.css              # Type scale definitions
│   │   └── animations.css              # CSS @keyframes (pulse, draw, fade)
│   │
│   └── constants/
│       ├── navigation.ts               # Nav links array
│       ├── services.ts                 # Fallback static services data
│       ├── team.ts                     # Fallback static team data
│       └── site.ts                     # Site-wide constants (phone, address, socials)
│
├── sanity/                             # Sanity Studio (CMS)
│   ├── schemas/
│   │   ├── service.ts                  # Service schema (name, category, price, icon)
│   │   ├── stylist.ts                  # Stylist schema (name, bio, speciality, portfolio)
│   │   ├── testimonial.ts              # Testimonial schema
│   │   ├── galleryItem.ts              # Gallery item (image, service tag, stylist)
│   │   └── post.ts                     # Blog/Journal post schema
│   └── sanity.config.ts                # Sanity Studio configuration
│
├── prisma/
│   ├── schema.prisma                   # Database schema (contacts, bookings log)
│   └── migrations/                     # Prisma migration files
│
├── .env.local                          # Local secrets (NEVER commit)
├── .env.example                        # Template for required env vars
├── next.config.js                      # Next.js config (image domains, redirects)
├── tailwind.config.ts                  # Tailwind config with Sadhana design tokens
├── tsconfig.json
└── package.json
```

---

## 3. PROFESSIONAL ASSET STRATEGY

### 3.1 Aesthetic Brief for Sourcing

Every image must feel like it belongs to the same **"Warm Ritual Minimalism"** world:
- **Colour temperature:** Warm (3200K–4500K). Never cold blue-toned light.
- **Style:** Editorial, not commercial. Candid ritual moments, not posed catalogue shots.
- **Subjects:** Hands, textures, products, hair in motion. Faces as secondary.
- **Treatment:** Slightly desaturated / film-look. The site itself will apply a warm CSS filter layer.
- **Resolution minimum:** 2400px wide for hero/about; 1200px for cards.

---

### 3.2 The 10 Precision Search Prompts

Use these verbatim on **Unsplash** (unsplash.com) or **Pexels** (pexels.com):

| # | Section | Search Prompt |
|---|---|---|
| 1 | **Hero Video/Photo** | `"close up stylist hands combing through wet dark hair warm light salon"` |
| 2 | **Hero Alternate** | `"slow motion warm oil pouring into hands beauty ritual natural light"` |
| 3 | **About Section** | `"hairdresser working on client warm toned editorial natural window light"` |
| 4 | **Services — Hair** | `"balayage highlighting foil hair salon warm ambient light artistic"` |
| 5 | **Services — Skin** | `"facial massage hands face skincare ritual warm minimal spa"` |
| 6 | **Services — Nails** | `"nail art close up elegant hands warm cream background minimal"` |
| 7 | **Stylist Portrait** | `"professional portrait woman hairstylist studio warm neutral background confident"` |
| 8 | **Gallery / Bridal** | `"bridal hair updo Indian bride natural light editorial warm tones"` |
| 9 | **About / Texture** | `"hair product serum bottle warm stone surface flatlay lifestyle"` |
| 10 | **Journal / Blog** | `"woman reading magazine salon cream linen warm morning light relaxed"` |

**Additional refinements:** On Unsplash, after searching, use the **Tone → Warm** filter and **Orientation → Landscape/Portrait** as needed. On Pexels, filter by **Color → Orange/Brown** to pull warm tones.

---

### 3.3 Immediate-Use Placeholder URLs

These are high-quality, license-free images you can plug in **right now** during development:

```typescript
// src/constants/placeholders.ts
// All images from Unsplash — free, no attribution required for dev use

export const PLACEHOLDER_IMAGES = {

  // Hero Section (16:9, dark warm tone)
  hero: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=1920&q=85",

  // About Section (editorial salon, warm light)
  about: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=1200&q=85",

  // Stylist Portrait 1 (grayscale source)
  stylist1: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=600&q=85",

  // Stylist Portrait 2
  stylist2: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=600&q=85",

  // Stylist Portrait 3
  stylist3: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&q=85",

  // Stylist Portrait 4
  stylist4: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=85",

  // Gallery Item 1 — Hair
  gallery1: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=800&q=80",

  // Gallery Item 2 — Colour
  gallery2: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80",

  // Gallery Item 3 — Bridal
  gallery3: "https://images.unsplash.com/photo-1596178060810-72f53ce9a65c?w=800&q=80",

  // Gallery Item 4 — Nails
  gallery4: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&q=80",

  // Journal Post 1
  journal1: "https://images.unsplash.com/photo-1470259078422-826894b933aa?w=800&q=80",

  // Journal Post 2
  journal2: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&q=80",

  // Journal Post 3
  journal3: "https://images.unsplash.com/photo-1487412912498-0447578fcca8?w=800&q=80",

} as const;
```

> **Production Note:** Replace these with your actual Cloudinary URLs before launch. Upload images to Cloudinary and use the `cloudinary.ts` helper to generate optimized URLs with `f_auto,q_auto,w_auto`.

---

## 4. RESPONSIVENESS & UI ENGINEERING RULES

### 4.1 Breakpoint System

Defined in `tailwind.config.ts` and mirrored as CSS custom properties:

```typescript
// tailwind.config.ts
screens: {
  'xs':  '375px',   // iPhone SE — minimum supported viewport
  'sm':  '640px',   // Large phones, small tablets
  'md':  '768px',   // Tablets (iPad portrait)
  'lg':  '1024px',  // iPad landscape, small laptops
  'xl':  '1280px',  // Desktop
  '2xl': '1440px',  // Large desktop
  '3xl': '1920px',  // Full HD (max-width container kicks in)
}
```

And in `globals.css`:
```css
:root {
  /* Spacing scale */
  --section-padding-y: clamp(64px, 8vw, 120px);
  --container-padding-x: clamp(20px, 5vw, 80px);
  --container-max-width: 1280px;
}
```

---

### 4.2 The 12 Global UI Engineering Laws

These rules are non-negotiable across every component:

**LAW 1 — Mobile-First, Always.**  
Write base styles for mobile (375px). Use `md:`, `lg:`, `xl:` prefixes to *add* styles upward. Never write desktop styles first and override for mobile.

**LAW 2 — `clamp()` for All Fluid Typography.**  
```css
/* Correct — fluid, never needs media query */
font-size: clamp(48px, 8vw, 96px);

/* Wrong — brittle, requires breakpoints */
font-size: 96px;
@media (max-width: 768px) { font-size: 48px; }
```

**LAW 3 — Touch Targets Must Be ≥ 44×44px.**  
All buttons, nav links, and interactive elements on mobile must meet Apple/Google minimum tap target size. Use `min-h-[44px] min-w-[44px]` on mobile variants.

**LAW 4 — The Container Contract.**  
Every section uses the same container pattern:
```tsx
<section>
  <div className="mx-auto max-w-[1280px] px-[clamp(20px,5vw,80px)]">
    {/* content */}
  </div>
</section>
```
Never allow content to touch viewport edges on mobile.

**LAW 5 — Grid Columns by Viewport.**  
Service cards: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`  
Team cards: `grid-cols-2 lg:grid-cols-4` (2-col on mobile by design for tablets)  
Gallery: `grid-cols-2 lg:grid-cols-3` (never 1-col gallery — even on mobile it's 2)

**LAW 6 — No Horizontal Scroll, Ever.**  
Apply `overflow-x: hidden` on `<body>`. Test every component at 375px width. The Team section on mobile uses a horizontal scroll carousel — this must be contained within its wrapper, not the page.

**LAW 7 — Page Transitions: Desktop Curtain, Mobile Crossfade.**  
```typescript
// In PageTransition.tsx
const isMobile = useMediaQuery('(max-width: 768px)');
const variants = isMobile ? crossfadeVariants : curtainVariants;
```
Sliding curtain on mobile conflicts with iOS swipe-back navigation. Always use opacity crossfade on `md` and below.

**LAW 8 — Images Must Never Cause Layout Shift (CLS = 0).**  
All `<Image>` components must have explicit `width` and `height` props, or use `fill` with a container that has explicit dimensions. This is the #1 killer of Lighthouse CLS scores.

**LAW 9 — Respect `prefers-reduced-motion`.**  
```typescript
// hooks/useReducedMotion.ts
export const useReducedMotion = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// In every GSAP animation:
if (!prefersReducedMotion) {
  gsap.to(element, { /* animation */ });
}
```

**LAW 10 — Dark/Light Sections Alternate Predictably.**  
Homepage section order: Hero (dark) → About (cream) → Services (dark) → Team (dark) → Testimonials (cream) → Gallery (cream) → Journal (cream) → Pre-Footer CTA (dark) → Contact (cream) → Footer (darkest). Never two cream sections in a row without a visual separator.

**LAW 11 — Font Loading is Non-Negotiable.**  
Use `next/font` exclusively. Set `display: 'swap'` for body text. Set `display: 'block'` for display headings (prevents flash of incorrect font on hero). Preload Cormorant Garamond and Jost.

**LAW 12 — The WhatsApp + Scroll-to-Top Stack.**  
These two floating buttons must stack cleanly on mobile:
```
bottom: 24px;
WhatsApp button: right: 20px
Scroll-to-top button: right: 20px, bottom: 80px (above WhatsApp)
```
On mobile, ensure neither button overlaps the iOS home indicator safe area.

---

### 4.3 Component Behavior Matrix

| Component | Mobile (375–767px) | Tablet (768–1023px) | Desktop (1024px+) |
|---|---|---|---|
| Navbar | Hidden links, hamburger menu → full-screen overlay | Same as mobile | Horizontal links, no hamburger |
| Hero Headline | 48–56px clamp | 64px | 80–96px |
| Services Grid | 1 column, full-width cards | 2 columns | 3 columns |
| About Section | Stacked (image top, text bottom) | Stacked | 50/50 split |
| Team Section | Horizontal scroll carousel (2 cards visible) | 2-column grid | 4-column grid |
| Gallery | 2-column masonry | 2-column masonry | 3-column masonry |
| Before/After Slider | Touch drag enabled | Touch drag enabled | Mouse drag enabled |
| Page Transition | Opacity crossfade (0.4s) | Opacity crossfade | Dark curtain slide (0.5s) |
| Testimonials | Single card, swipe navigation | Single card | Single card, arrows visible |

---

## 5. GRAND MASTER IMPLEMENTATION PLAN

---

### PHASE 1 — Environment Setup & Architecture
**Goal:** Clean, working Next.js project with all dependencies installed and configured.  
**Time Estimate:** 1–2 days

**Step 1.1 — Initialise the Project**
```bash
npx create-next-app@latest sadhana-salon \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*"
```

**Step 1.2 — Install All Dependencies**
```bash
# Animation
npm install gsap @gsap/react framer-motion lenis

# CMS & Data
npm install @sanity/client @sanity/image-url next-sanity sanity

# Database
npm install @supabase/supabase-js prisma @prisma/client

# Email
npm install resend react-email @react-email/components

# Image optimization
npm install cloudinary

# Utilities
npm install clsx tailwind-merge lucide-react

# Dev dependencies
npm install -D @types/node prettier eslint-config-prettier next-sitemap
```

**Step 1.3 — Configure Environment Variables**
```bash
# .env.local (never commit — add to .gitignore)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_token
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_key
DATABASE_URL=your_postgres_url
RESEND_API_KEY=your_resend_key
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
GOOGLE_PLACES_API_KEY=your_key
INSTAGRAM_ACCESS_TOKEN=your_token
NEXT_PUBLIC_WHATSAPP_NUMBER=919XXXXXXXXX
NEXT_PUBLIC_FRESHA_BOOKING_URL=your_fresha_url
```

**Step 1.4 — Configure `next.config.js`**
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: 'images.unsplash.com' },
      { hostname: 'res.cloudinary.com' },
      { hostname: 'cdn.sanity.io' },
      { hostname: 'lh3.googleusercontent.com' }, // Google review avatars
    ],
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
};
module.exports = nextConfig;
```

**Step 1.5 — Initialise Sanity Studio**
```bash
npx sanity@latest init --env .env.local
# Choose: "Create new project" → name "Sadhana Salon CMS"
# Dataset: production
# Template: "Clean project with no predefined schemas"
```

**Step 1.6 — Initialise Prisma**
```bash
npx prisma init
# Edit prisma/schema.prisma (Contact model, BookingLog model)
npx prisma db push
npx prisma generate
```

**Step 1.7 — Set Up GitHub Repository**
```bash
git init
git add .
git commit -m "feat: initial project setup — Sadhana Salon"
git branch -M main
git remote add origin https://github.com/yourusername/sadhana-salon.git
git push -u origin main
git checkout -b dev
```

**Step 1.8 — Deploy to Vercel (Preview)**
- Connect GitHub repo to Vercel
- Add all environment variables in Vercel dashboard
- Every push to `dev` branch creates a preview URL

**Deliverable:** Running `http://localhost:3000` with a blank cream page. All packages installed. Vercel preview URL live.

---

### PHASE 2 — Global Design System (CSS / Tokens / Fonts)
**Goal:** The design system is the single source of truth — every visual decision lives here.  
**Time Estimate:** 1 day

**Step 2.1 — Design Token CSS (globals.css)**
```css
/* src/styles/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  /* Color Tokens — Sadhana Palette */
  --color-dark:       #1A1712;   /* Ink Night — primary dark */
  --color-dark-2:     #2C2820;   /* Deep Onyx — card/section backgrounds */
  --color-gold:       #B8955A;   /* Antique Gold — primary accent */
  --color-gold-light: #C9A87C;   /* Warm Brass — hover/highlight */
  --color-gold-dim:   rgba(184, 149, 90, 0.25); /* Gold at 25% — borders */
  --color-cream:      #F7F3EE;   /* Sandalwood Cream — primary background */
  --color-cream-2:    #EDE8E0;   /* Parchment — alternate section bg */
  --color-muted:      #6B6359;   /* Temple Stone — body text */
  --color-sage:       #8A9E8C;   /* Tulsi Sage — secondary accent */
  --color-white:      #FFFFFF;   /* Pure White — forms, modals */

  /* Typography Tokens */
  --font-display: 'Cormorant Garamond', 'Georgia', serif;
  --font-body:    'Jost', 'Helvetica Neue', sans-serif;

  /* Spacing Tokens */
  --section-padding-y:  clamp(64px, 8vw, 120px);
  --container-max-width: 1280px;
  --container-padding-x: clamp(20px, 5vw, 80px);

  /* Animation Tokens */
  --ease-gold:      cubic-bezier(0.25, 0.46, 0.45, 0.94); /* For gold rule draw */
  --ease-lift:      cubic-bezier(0.34, 1.56, 0.64, 1);    /* For card hover lift */
  --duration-fast:  0.25s;
  --duration-base:  0.35s;
  --duration-slow:  0.6s;
  --duration-reveal: 0.8s;
}
```

**Step 2.2 — Tailwind Config with Sadhana Tokens**
```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        dark:       '#1A1712',
        'dark-2':   '#2C2820',
        gold:       '#B8955A',
        'gold-light': '#C9A87C',
        cream:      '#F7F3EE',
        'cream-2':  '#EDE8E0',
        muted:      '#6B6359',
        sage:       '#8A9E8C',
      },
      fontFamily: {
        display: ['var(--font-cormorant)', 'Georgia', 'serif'],
        body:    ['var(--font-jost)', 'Helvetica Neue', 'sans-serif'],
      },
      fontSize: {
        'hero': 'clamp(48px, 8vw, 96px)',
        'h2':   'clamp(36px, 5vw, 60px)',
        'h3':   'clamp(22px, 3vw, 32px)',
      },
      letterSpacing: {
        'widest-2': '0.35em',
        'widest-3': '0.4em',
      },
      transitionTimingFunction: {
        'gold': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'lift': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },
  plugins: [],
};
export default config;
```

**Step 2.3 — Font Setup in Root Layout**
```typescript
// src/app/layout.tsx
import { Cormorant_Garamond, Jost } from 'next/font/google';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'block', // Critical for hero — no FOIT
});

const jost = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-jost',
  display: 'swap',
});
```

**Step 2.4 — Global CSS Animations**
```css
/* src/styles/animations.css */
@keyframes goldPulse {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.3; }
}

@keyframes whatsappPulse {
  0%   { transform: scale(1); opacity: 0.6; }
  100% { transform: scale(1.8); opacity: 0; }
}

@keyframes scaleXIn {
  from { transform: scaleX(0); }
  to   { transform: scaleX(1); }
}

@keyframes fadeUpIn {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

**Step 2.5 — Build Core Atomic UI Components**
Build in this order:
1. `Button.tsx` — primary (dark fill, cream text) + ghost (gold border, gold text)
2. `SectionEyebrow.tsx` — gold line left + uppercase Jost label
3. `GoldDivider.tsx` — the signature animated gold rule (CSS `animation: scaleXIn`)
4. `FormField.tsx` — input with gold underline focus animation

**Deliverable:** A `/design-system` route (hidden from nav, for reference only) showing all tokens, typography scale, and atomic components side by side.

---

### PHASE 3 — Core Routing & Layouts
**Goal:** All pages exist, routing works, layout components are complete and functional.  
**Time Estimate:** 2 days

**Step 3.1 — Root Layout**
- Install `SmoothScrollProvider` (Lenis) wrapping all content
- Install `GSAPProvider` initialising ScrollTrigger
- Add `PageTransition` Framer Motion wrapper
- Add GA4 `<Script>` tag (deferred)

**Step 3.2 — Build the Navbar**
This is the most complex layout component. Build it completely before any sections:
- Desktop: logo left, links right, "Book Now" CTA gold button
- Scroll behavior: transparent on hero → dark background + backdrop-blur after 80px scroll
- Mobile: hamburger → full-screen dark overlay, links stagger-fade up (Framer Motion)
- Active link: gold underline (CSS `::after` pseudo-element, `scaleX` from 0 to 1)
- Hamburger morphs to ✕ via SVG stroke animation

**Step 3.3 — Build the Footer**
- 3-column layout (desktop), stacked (mobile)
- Logo + tagline / Quick links / Social icons (Instagram, Facebook, YouTube)
- Newsletter opt-in (connects to Supabase `newsletter_subscribers` table)
- Full-width copyright bar (darkest shade)

**Step 3.4 — Create All Page Routes**
Create placeholder page files for: `/`, `/services`, `/team`, `/team/[slug]`, `/gallery`, `/journal`, `/journal/[slug]`, `/contact`

**Step 3.5 — Sanity Schema Setup**
Define and deploy Sanity schemas for: `service`, `stylist`, `testimonial`, `galleryItem`, `post`

**Step 3.6 — Prisma Schema**
```prisma
// prisma/schema.prisma
model Contact {
  id          String   @id @default(cuid())
  name        String
  phone       String
  service     String?
  message     String?
  createdAt   DateTime @default(now())
}

model NewsletterSubscriber {
  id        String   @id @default(cuid())
  email     String   @unique
  createdAt DateTime @default(now())
}
```

**Deliverable:** All routes accessible. Navbar and footer complete. No broken links.

---

### PHASE 4 — Static UI Component Construction (Section by Section)
**Goal:** Every section of the homepage built, styled, and pixel-perfect — with placeholder data.  
**Time Estimate:** 5–7 days

Build in homepage order. For each section:  
✓ Desktop layout → ✓ Mobile layout → ✓ Hover states → ✓ Placeholder data connected

**Step 4.1 — HeroSection**
- Muted autoplay video (`/videos/hero-loop.mp4`) with dark gradient overlay
- Image fallback if video unavailable
- Eyebrow + H1 (two-line, second line italic gold) + subtext + two CTAs
- Scroll indicator (pulsing gold line)
- Booking modal trigger on "Book Your Ritual" click

**Step 4.2 — AboutSection**
- 50/50 split: left image (with gold 1px offset frame) + right text
- Pull quote in Cormorant Garamond italic
- Brand values strip (3 items with thin-line SVG icons)
- Stats bar: 4 counters (Years, Clients, Stylists, Rating) — static values in Phase 4, animated in Phase 5

**Step 4.3 — ServicesSection** *(most complex section)*
- Dark background (`#1A1712`)
- Category tab bar: Hair Care · Skin · Nails · Bridal · Wellness
- 3-column service card grid with `ServiceCard` component
- Tab switching: content fade + tab gold underline slides across (CSS transform)
- "View Full Menu" ghost CTA at bottom

**Step 4.4 — TeamSection**
- Dark background, 4-column grid (desktop), horizontal scroll (mobile)
- `StylistCard` — grayscale portrait + name + speciality tag + "Book with Name →"
- "Meet the Full Team →" section CTA

**Step 4.5 — TestimonialsSection**
- Cream background, full-width
- Single large testimonial with decorative quote mark
- Manual next/prev arrows + dot indicators
- Static testimonial data in Phase 4 (Google Reviews API in Phase 6)
- Sadhana Devanagari watermark (`साधना`) at 3% opacity behind quote

**Step 4.6 — GallerySection**
- Masonry grid with `react-masonry-css`
- Filter tabs: All · Hair · Colour · Bridal · Skin · Nails
- `GalleryItem` component with hover overlay (dark overlay sliding up, service name + "Book This Look →")
- `Lightbox` component (full-screen with prev/next)
- `BeforeAfterSlider` component (CSS clip-path + drag handle)
- Static images from placeholder URLs in Phase 4 (Instagram feed in Phase 6)

**Step 4.7 — JournalSection**
- 3-column card grid of blog posts
- `JournalCard`: image + category tag + Cormorant headline + excerpt + "Read →" link
- Static data in Phase 4 (Sanity CMS connected in Phase 6)

**Step 4.8 — PreFooterCTA Band**
- Full-width dark section
- Large italic Cormorant text: *"Your ritual begins with a single appointment."*
- Single "Book Now" gold CTA

**Step 4.9 — ContactSection**
- 3-column: Address + styled Google Map / Hours / Contact Form
- Form: Name, Phone, Service dropdown, Message — all with gold underline focus state
- WhatsApp floating button (pulse animation)
- Scroll-to-top button

**Deliverable:** Complete homepage with all sections, fully responsive, all hover states working. No animations yet (static version). Lighthouse score ≥ 85 (static).

---

### PHASE 5 — Motion Design (Hover, Scroll, & Page Transitions)
**Goal:** Layer all animations onto the working static UI.  
**Time Estimate:** 3–4 days

> **Rule:** All animations are additive. If you remove GSAP, the site still works perfectly. Animations are enhancement, never structure.

**Step 5.1 — Set Up GSAP Context**
```typescript
// src/components/providers/GSAPProvider.tsx
'use client';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';
import { useEffect } from 'react';

gsap.registerPlugin(ScrollTrigger, Flip);
```

**Step 5.2 — Set Up Lenis + ScrollTrigger Integration**
```typescript
// Lenis must tick GSAP's ScrollTrigger on each frame
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);
```

**Step 5.3 — Implement Scroll Animations (in order)**

Priority 1 — **Gold Rule Line Draw** (signature animation)
```typescript
// Runs on every section heading
gsap.fromTo('.gold-rule', 
  { scaleX: 0, transformOrigin: 'left center' },
  { scaleX: 1, duration: 0.9, ease: 'power2.out',
    scrollTrigger: { trigger: '.gold-rule', start: 'top 85%' }
  }
);
```

Priority 2 — **Section Eyebrow Fade Up**
```typescript
gsap.fromTo('.section-eyebrow',
  { opacity: 0, y: 16 },
  { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out',
    scrollTrigger: { trigger: '.section-eyebrow', start: 'top 90%' }
  }
);
```

Priority 3 — **Heading Clip-Path Reveal** (mask-reveal per line)
Priority 4 — **Service Cards Stagger** (0.1s delay per card)
Priority 5 — **Hero Parallax** (background moves at 60% scroll speed)
Priority 6 — **Stat Counters** (0 → value, 1.5s ease-out, on enter)
Priority 7 — **About Section** (image from left, text from right)
Priority 8 — **Gallery Images** (blur 8px → 0 on enter)

**Step 5.4 — Page Transition (The Sadhana Curtain)**
```typescript
// src/lib/animations/page-transitions.ts
export const curtainVariants = {
  initial: { scaleX: 0, originX: 1 },
  animate: { scaleX: 1, transition: { duration: 0.3, ease: [0.76, 0, 0.24, 1] } },
  exit:    { scaleX: 0, originX: 0, transition: { duration: 0.3, delay: 0.1 } },
};
// The Sadhana wordmark appears centered in the curtain during transition
```

**Step 5.5 — Micro-Interactions (CSS, not GSAP)**
All hover effects from the blueprint implemented in CSS:
- Nav link gold underline: `transform: scaleX(0→1)` on `::after`
- Button fill slide: `background-size: 100% 0 → 100%` with gradient trick
- Service card lift: `transform: translateY(-4px)` + border brightening
- Gallery overlay: `transform: translateY(100%→0)` on overlay div

**Step 5.6 — Testimonial Auto-Rotation**
```typescript
// Opacity crossfade every 6 seconds
// CSS: opacity 1→0 (0.3s) → wait → opacity 0→1 (0.3s)
// Pause on hover, resume on mouse leave
```

**Step 5.7 — Mobile Menu Animation**
Hamburger SVG stroke animation → full-screen overlay → links stagger-fadeUp

**Deliverable:** Fully animated site. The gold rule draws. Cards stagger in. Page transitions feel cinematic. Test `prefers-reduced-motion` — all animations disabled correctly.

---

### PHASE 6 — Backend / API Integrations
**Goal:** Live data flowing into every dynamic section.  
**Time Estimate:** 3–4 days

**Step 6.1 — Sanity CMS Connection**
- Fetch services, stylists, testimonials, gallery items, blog posts via GROQ queries
- Replace all static placeholder data with live Sanity data
- Implement ISR (Incremental Static Regeneration): `revalidate: 3600` (1 hour)
- Train salon owner to use Sanity Studio for content updates

**Step 6.2 — Contact Form API Route**
```typescript
// src/app/api/contact/route.ts
// 1. Validate form data (Zod schema)
// 2. Save to Supabase `contacts` table
// 3. Send email via Resend to salon@sadhana.in
// 4. Return 200 with success message
// Rate limiting: max 5 submissions per IP per hour
```

**Step 6.3 — Fresha Booking Widget**
```typescript
// BookingModal.tsx
// Embed Fresha widget in an <iframe> inside the modal
// Override Fresha CSS via postMessage or CSS injection
// to use Sadhana's dark/gold color scheme
```

**Step 6.4 — WhatsApp Deep Link**
```typescript
// WhatsAppButton.tsx
const message = encodeURIComponent("Hi Sadhana! I'd like to book an appointment.");
const url = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${message}`;
```

**Step 6.5 — Instagram Feed API Route**
```typescript
// src/app/api/instagram/route.ts
// Fetch latest 9 posts from Instagram Basic Display API
// Cache: revalidate every 3600 seconds
// Return: image URLs, permalink, timestamp
// The last row of the gallery displays these live posts
```

**Step 6.6 — Google Places Reviews**
```typescript
// src/app/api/reviews/route.ts
// Fetch Place Details (reviews field) using salon's Place ID
// Filter: rating === 5 only
// Cache: revalidate every 86400 seconds (daily)
// Display top 5 reviews in Testimonials carousel
```

**Step 6.7 — Google Maps Integration**
```typescript
// ContactSection.tsx
// Use @react-google-maps/api with custom dark style JSON
// Match map style to site's dark palette (#1A1712 background)
// Add single marker with Sadhana logo as custom pin
```

**Step 6.8 — Newsletter (Supabase)**
```typescript
// Footer newsletter form
// On submit: INSERT into newsletter_subscribers table
// Handle duplicate email gracefully (return success, don't error)
```

**Deliverable:** All data is live. Contact form sends emails. Booking widget works. Instagram feed auto-refreshes. Google reviews display automatically.

---

### PHASE 7 — Performance, Testing & Deployment
**Goal:** Lighthouse 90+ on mobile. Zero visual bugs. Production deployed.  
**Time Estimate:** 3–4 days

**Step 7.1 — Image Optimization Audit**
- Every `<Image>` must use `next/image` with proper `width`, `height`, `priority` (hero only), `loading="lazy"` (all others)
- Convert all placeholder images to Cloudinary-served WebP
- Hero video: encode to `<1.5MB` via HandBrake (H.264, 720p, 24fps)
- Apply `sizes` prop correctly to every image for responsive srcsets

**Step 7.2 — Performance Optimizations**
```typescript
// Defer non-critical scripts
<Script src="https://www.googletagmanager.com/..." strategy="afterInteractive" />
<Script src="hotjar..." strategy="lazyOnload" />

// Lazy-load below-fold components
const GallerySection = dynamic(() => import('@/components/sections/GallerySection'), {
  loading: () => <GallerySkeleton />,
});

// Preload critical assets
<link rel="preload" href="/videos/hero-loop.mp4" as="video" type="video/mp4" />
```

**Step 7.3 — SEO Implementation**
```typescript
// src/app/layout.tsx — Root metadata
export const metadata: Metadata = {
  title: { default: 'Sadhana Salon — Premium Salon in Ahmedabad, Gujarat', template: '%s | Sadhana Salon' },
  description: 'Sadhana is a premium hair, beauty & wellness salon in Ahmedabad, Gujarat. Expert stylists. Bridal packages. Book your ritual online.',
  keywords: ['salon in Ahmedabad', 'hair salon Gujarat', 'bridal salon Ahmedabad', 'best salon Gujarat'],
  openGraph: { type: 'website', locale: 'en_IN', siteName: 'Sadhana Salon' },
};

// Local Business structured data (JSON-LD)
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BeautySalon',
  name: 'Sadhana Salon',
  address: { '@type': 'PostalAddress', addressLocality: 'Ahmedabad', addressRegion: 'Gujarat', addressCountry: 'IN' },
  priceRange: '₹₹₹',
  openingHours: 'Mo-Su 10:00-20:00',
};
```

**Step 7.4 — Accessibility Audit**
- All interactive elements have `aria-label`
- Color contrast: all text meets WCAG AA (gold on dark: 4.9:1 ✓, muted on cream: 4.5:1 ✓)
- Keyboard navigation works through entire site
- Skip-to-content link present
- All images have meaningful `alt` text

**Step 7.5 — Cross-Browser & Device Testing**

| Test | Browsers | Devices |
|---|---|---|
| Functional | Chrome, Safari, Firefox, Edge | iPhone 14, iPhone SE, Samsung Galaxy, iPad |
| Visual | Chrome, Safari | All above + 1920px desktop |
| Animation | Chrome, Safari | Check for Safari-specific GSAP issues |
| Forms | All | Submit flow, validation, success states |
| Booking | Chrome, Safari mobile | Critical path — must work on phone |

**Step 7.6 — Generate Sitemap & robots.txt**
```bash
npm install next-sitemap
# next-sitemap auto-generates sitemap.xml on build
# Include all pages; exclude /api/* routes
```

**Step 7.7 — Lighthouse CI Setup**
```yaml
# .github/workflows/lighthouse-ci.yml
# Runs on every PR to main
# Fails PR if any Lighthouse score drops below:
# Performance: 85, Accessibility: 95, SEO: 95, Best Practices: 90
```

**Step 7.8 — Production Deployment Checklist**

```
PRE-LAUNCH:
□ All env variables set in Vercel (not just local)
□ Custom domain connected (sadhana.in or sadhana-salon.com)
□ SSL certificate active (automatic on Vercel)
□ Google Analytics verified receiving events
□ Contact form tested end-to-end (form → email arrives)
□ Booking widget live test (not just UI — actual Fresha booking)
□ Instagram feed live (real posts showing)
□ Google Reviews live (real reviews showing)
□ Sitemap submitted to Google Search Console
□ robots.txt verified (no critical pages blocked)
□ All redirects working (www → non-www or vice versa)
□ 404 page matches design
□ WhatsApp button opens correct number with pre-filled message
□ Reduced motion tested (browser accessibility settings)
□ All images loading from Cloudinary (not Unsplash placeholders)
□ Video hero plays muted on mobile Safari (requires muted + playsinline attrs)

LAUNCH DAY:
□ Push to main branch → Vercel auto-deploys
□ Run final Lighthouse audit on live domain
□ Test on physical iPhone (not just browser DevTools)
□ Google Search Console → Request Indexing for homepage
□ Set up Uptime monitoring (UptimeRobot free tier)
```

**Deliverable:** Production site live at custom domain. Lighthouse 90+ on mobile. Google Search Console tracking. Every integration working. Salon owner can update content via Sanity Studio independently.

---

## QUICK REFERENCE: BUILD ORDER

When you say "start coding," we go through phases in this exact sequence. Never skip ahead.

```
Phase 1 → Environment & Config         [1–2 days]
Phase 2 → Design Tokens & Atoms        [1 day]
Phase 3 → Routing & Layout Shell       [2 days]
Phase 4 → Section-by-Section UI        [5–7 days]  ← Longest phase
Phase 5 → Motion Layer                 [3–4 days]
Phase 6 → Live Integrations            [3–4 days]
Phase 7 → Performance & Launch         [3–4 days]
─────────────────────────────────────────────────
Total Estimate                         [18–24 days]
```

---

*Sadhana Salon — Architecture Document v1.0*  
*Gujarat, India · Built to compete. Designed to endure.*
