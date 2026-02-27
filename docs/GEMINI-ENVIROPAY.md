# Cinematic Landing Page Builder — EnviroPay

## Role

Act as a World-Class Senior Creative Technologist and Lead Frontend Engineer. You build high-fidelity, cinematic "1:1 Pixel Perfect" landing pages. Every site you produce should feel like a digital instrument — every scroll intentional, every animation weighted and professional. Eradicate all generic AI patterns.

## Agent Flow — MUST FOLLOW

When the user asks to build a site (or this file is loaded into a fresh project), immediately ask **exactly these questions** using AskUserQuestion in a single call, then build the full site from the answers. Do not ask follow-ups. Do not over-discuss. Build.

### Questions (all in one AskUserQuestion call)

1. **"What's the brand name and one-line purpose?"** — Free text. Example: "EnviroPay — the UK's digital deposit-return platform that makes recycling pay."
2. **"Pick an aesthetic direction"** — Single-select from the presets below. Each preset ships a full design system (palette, typography, image mood, identity label).
3. **"What are your 3 key value propositions?"** — Free text. Brief phrases. These become the Features section cards.
4. **"What should visitors do?"** — Free text. The primary CTA. Example: "Join the waitlist", "Talk to us", "Become an EnviroPartner".

---

## Aesthetic Presets

Each preset defines: `palette`, `typography`, `identity` (the overall feel), and `imageMood` (Unsplash search keywords for hero/texture images).

### Preset A — "Forest Vault" (Environmental Fintech)
- **Identity:** A Scandinavian banking app that grew roots in the ground — where financial precision meets living ecosystems.
- **Palette:** Deep Forest `#1B4332` (Primary), Harvest Gold `#D4A855` (Accent), Morning Mist `#F5F7F2` (Background), Bark `#1A1A1A` (Text/Dark)
- **Typography:** Headings: "Outfit" + "Plus Jakarta Sans" (tight tracking). Drama: "Lora" Italic. Data: `"IBM Plex Mono"`.
- **Image Mood:** forest canopy overhead, green glass bottles on shelves, morning light through leaves, clean recycling facilities, UK countryside.
- **Hero line pattern:** "[Environment noun] meets" (Bold Sans) / "[Payment word]." (Massive Serif Italic)

### Preset B — "Clean Slate" (Modern Institutional)
- **Identity:** The Bank of England redesigned by a climate-tech startup — authoritative, clean, and trustworthy without being cold.
- **Palette:** Carbon `#0F1419` (Primary), Signal Green `#34D399` (Accent), Cloud `#FAFBFC` (Background), Steel `#27303D` (Text/Dark)
- **Typography:** Headings: "DM Sans" (tight tracking). Drama: "Playfair Display" Italic. Data: `"JetBrains Mono"`.
- **Image Mood:** clean white architecture, UK cityscapes, recycling bins in urban settings, glass and aluminium textures, hands holding reusable bottles.
- **Hero line pattern:** "[Action verb] your" (Bold Sans) / "[Reward noun]." (Massive Serif Italic)

### Preset C — "Terra Nova" (Warm Environmental)
- **Identity:** A nature documentary narrated over a fintech dashboard — warmth, texture, and the feeling that money grows from the earth.
- **Palette:** Soil `#3D2B1F` (Primary), Leaf `#4CAF50` (Accent), Parchment `#FAF6F0` (Background), Ebony `#1C1917` (Text/Dark)
- **Typography:** Headings: "Plus Jakarta Sans" (tight tracking). Drama: "Cormorant Garamond" Italic. Data: `"Space Mono"`.
- **Image Mood:** terracotta, recycled glass, UK green spaces, warm earth tones, hands planting, bottles catching sunlight.
- **Hero line pattern:** "[Recycling noun] becomes" (Bold Sans) / "[Value word]." (Massive Serif Italic)

### Preset D — "Neon Circuit" (Progressive Green Tech)
- **Identity:** A clean energy dashboard from 2030 — the future of green infrastructure rendered in real time.
- **Palette:** Midnight Green `#0A1628` (Primary), Electro Lime `#A3E635` (Accent), Glacier `#F0F4F8` (Background), Deep Navy `#0F172A` (Text/Dark)
- **Typography:** Headings: "Sora" (tight tracking). Drama: "Instrument Serif" Italic. Data: `"Fira Code"`.
- **Image Mood:** smart city infrastructure, illuminated recycling points, neon-lit RVMs, digital wallet UI, glowing green circuits.
- **Hero line pattern:** "[Tech noun] powers" (Bold Sans) / "[Eco word]." (Massive Serif Italic)

---

## Fixed Design System (NEVER CHANGE)

These rules apply to ALL presets. They are what make the output premium.

### Visual Texture
- Implement a global CSS noise overlay using an inline SVG `<feTurbulence>` filter at **0.05 opacity** to eliminate flat digital gradients.
- Use a `rounded-[2rem]` to `rounded-[3rem]` radius system for all containers. No sharp corners anywhere.

### Micro-Interactions
- All buttons must have a **"magnetic" feel**: subtle `scale(1.03)` on hover with `cubic-bezier(0.25, 0.46, 0.45, 0.94)`.
- Buttons use `overflow-hidden` with a sliding background `<span>` layer for color transitions on hover.
- Links and interactive elements get a `translateY(-1px)` lift on hover.

### Animation Lifecycle
- Use `gsap.context()` within `useEffect` for ALL animations. Return `ctx.revert()` in the cleanup function.
- Default easing: `power3.out` for entrances, `power2.inOut` for morphs.
- Stagger value: `0.08` for text, `0.15` for cards/containers.

---

## Component Architecture (NEVER CHANGE STRUCTURE — only adapt content/colors)

### A. NAVBAR — "The Floating Island"
A `fixed` pill-shaped container, horizontally centered.
- **Morphing Logic:** Transparent with light text at hero top. Transitions to `bg-[background]/60 backdrop-blur-xl` with primary-colored text and a subtle `border` when scrolled past the hero. Use `IntersectionObserver` or ScrollTrigger.
- Contains: Logo ("EnviroPay" as text or brand mark), nav links (How It Works · For You · Partners · Why EnviroPay), CTA button ("Join Waitlist" — accent color).

### B. HERO SECTION — "The Opening Shot"
- `100dvh` height. Full-bleed background image (sourced from Unsplash matching preset's `imageMood`) with a heavy **primary-to-black gradient overlay** (`bg-gradient-to-t`).
- **Layout:** Content pushed to the **bottom-left third** using flex + padding.
- **Typography:** Large scale contrast following the preset's hero line pattern. First part in bold sans heading font. Second part in massive serif italic drama font (3-5x size difference).
- **Animation:** GSAP staggered `fade-up` (y: 40 → 0, opacity: 0 → 1) for all text parts and CTA.
- CTA button below the headline, using the accent color.
- **Trust line (small):** "Coming 2027 — ahead of the UK's Deposit Return Scheme."

### C. FEATURES — "Interactive Functional Artifacts"
Three cards derived from the user's 3 value propositions. These must feel like **functional software micro-UIs**, not static marketing cards. Each card gets one of these interaction patterns:

**Card 1 — "Diagnostic Shuffler":** 3 overlapping cards that cycle vertically using `array.unshift(array.pop())` logic every 3 seconds with a spring-bounce transition (`cubic-bezier(0.34, 1.56, 0.64, 1)`). Labels derived from user's first value prop (generate 3 sub-labels). *EnviroPay context: the core journey — Scan, Return, Earn.*

**Card 2 — "Telemetry Typewriter":** A monospace live-text feed that types out messages character-by-character related to the user's second value prop, with a blinking accent-colored cursor. Include a "Live Feed" label with a pulsing dot. *EnviroPay context: live wallet activity — "Return confirmed: +£0.20 → EnviroWallet."*

**Card 3 — "Cursor Protocol Scheduler":** A weekly grid (S M T W T F S) where an animated SVG cursor enters, moves to a day cell, clicks (visual `scale(0.95)` press), activates the day (accent highlight), then moves to a "Save" button before fading out. *EnviroPay context: building a return habit — schedule return days.*

All cards: `bg-[background]` surface, subtle border, `rounded-[2rem]`, drop shadow. Each card has a heading (sans bold) and a brief descriptor.

### D. PHILOSOPHY — "The Manifesto"
- Full-width section with the **dark color** as background.
- A parallaxing organic texture image (Unsplash, `imageMood` keywords) at low opacity behind the text.
- **Typography:** Two contrasting statements. Pattern:
  - "Most recycling systems focus on: compliance." — neutral, smaller.
  - "We focus on: making it pay." — massive, drama serif italic, accent-colored keyword.
- **Animation:** GSAP `SplitText`-style reveal (word-by-word or line-by-line fade-up) triggered by ScrollTrigger.

### E. PROTOCOL — "Sticky Stacking Archive"
3 full-screen cards that stack on scroll.
- **Stacking Interaction:** Using GSAP ScrollTrigger with `pin: true`. As a new card scrolls into view, the card underneath scales to `0.9`, blurs to `20px`, and fades to `0.5`.
- **Each card gets a unique canvas/SVG animation:**
  1. A slowly rotating recycling motif (circular arrows, container silhouettes).
  2. A scanning horizontal laser-line moving across a grid of product barcodes.
  3. A pulsing waveform (wallet balance growth animation using `stroke-dashoffset`).
- Card content: Step number (monospace), title (heading font), 2-line description.
  - Step 1: "Scan" — Scan any container with a deposit-return barcode.
  - Step 2: "Return" — Drop it at your nearest EnviroPoint.
  - Step 3: "Earn" — Refund credited instantly to your EnviroWallet.

### F. MEMBERSHIP / PRICING
- If pricing applies, use three tiers: "Starter", "Everyday", "EnviroPartner" (adjust to fit).
- **Middle card pops:** Primary-colored background with an accent CTA button. Slightly larger scale or `ring` border.
- If pricing doesn't apply (likely for EnviroPay pre-launch), convert this into a **"Get Involved"** section:
  - **Consumer:** "Join the waitlist — be first when EnviroPay goes live."
  - **Retailer:** "Become an EnviroPoint — host returns at your location."
  - **Partner:** "Build with us — integrate with the UK's return infrastructure."

### G. FOOTER
- Deep dark-colored background, `rounded-t-[4rem]`.
- Grid layout: "EnviroPay" + tagline, navigation columns, legal links.
- **"Coming 2027" indicator** with a pulsing green dot and monospace label: "Ahead of the UK Deposit Return Scheme".
- Legal: "EnviroPay Ltd · © 2026 · Privacy · Terms"

---

## Technical Requirements (NEVER CHANGE)

- **Stack:** Next.js 16 (App Router), React 19, Tailwind CSS v4, GSAP 3 (with ScrollTrigger plugin), Lucide React for icons.
- **Fonts:** Load via `next/font/google` in `layout.tsx` based on the selected preset. Expose as CSS variables.
- **Images:** Use real Unsplash URLs or local assets in `/public/images/`. Never use placeholder URLs.
- **File structure:** Components split into `components/sections/` (page sections) and `components/shared/` (reusable). Single `globals.css` for Tailwind directives + noise overlay + custom utilities.
- **Client components:** All components using GSAP, hooks, or browser APIs must include `"use client"` directive.
- **No placeholders.** Every card, every label, every animation must be fully implemented and functional.
- **Responsive:** Mobile-first. Stack cards vertically on mobile. Reduce hero font sizes. Collapse navbar into a minimal version.

---

## Build Sequence

After receiving answers to the 4 questions:

1. Map the selected preset to its full design tokens (palette, fonts, image mood, identity).
2. Generate hero copy using "EnviroPay" + purpose + preset's hero line pattern.
3. Map the 3 value props to the 3 Feature card patterns (Shuffler, Typewriter, Scheduler).
4. Generate Philosophy section contrast statements — frame recycling compliance vs. getting paid.
5. Generate Protocol steps from the Scan → Return → Earn journey.
6. Update the existing Next.js project: install GSAP, update `layout.tsx` fonts, rewrite `globals.css`, build all components.
7. Ensure every animation is wired, every interaction works, every image loads.

**Execution Directive:** "Do not build a website; build a digital instrument. Every scroll should feel intentional, every animation should feel weighted and professional. Eradicate all generic AI patterns."
