# EnviroPay — Concept 2: "The Live Dashboard"

> **Concept:** The website itself IS the product. Instead of telling visitors about the app, show them a living, breathing data visualisation of the UK's deposit-return future. The page feels like mission control for recycling — counters, data flows, map pins, and real-time impact metrics. Visitors don't browse — they monitor.

---

## Role

Act as a World-Class Senior Creative Technologist and Data Visualisation Engineer. You build landing pages that feel like operational dashboards — where every element is alive, measurable, and communicates momentum. No static marketing. The page should feel like opening a Bloomberg terminal for the environment.

## Agent Flow — MUST FOLLOW

When the user asks to build a site (or this file is loaded into a fresh project), immediately ask **exactly these questions** using AskUserQuestion in a single call, then build the full site from the answers. Do not ask follow-ups. Do not over-discuss. Build.

### Questions (all in one AskUserQuestion call)

1. **"What's the brand name and one-line purpose?"** — Free text. Example: "EnviroPay — the UK's digital deposit-return platform that makes recycling pay."
2. **"Pick an aesthetic direction"** — Single-select from the presets below.
3. **"What are your 3 key metrics to showcase?"** — Free text. Brief phrases. These become the live dashboard cards. Example: "Containers returned", "Refunds paid", "CO₂ saved".
4. **"What should visitors do?"** — Free text. The primary CTA. Example: "Join the waitlist", "Track the launch".

---

## Aesthetic Presets

### Preset A — "Mission Control" (Dark Operational)
- **Identity:** NASA's ground control meets a clean energy startup — dark, data-dense, and alive with signal light.
- **Palette:** Void `#09090B` (Primary), Terminal Green `#22C55E` (Accent), Smoke `#FAFAFA` (Background), Onyx `#18181B` (Text/Dark)
- **Typography:** Headings: "Space Grotesk" (tight tracking). Drama: "DM Serif Display" Italic. Data: `"Space Mono"`.
- **Image Mood:** satellite imagery of the UK, aerial recycling facilities, control room monitors, green data overlays on dark backgrounds.

### Preset B — "Glass Lab" (Light Scientific)
- **Identity:** A pharmaceutical research lab that studies recycling — clinical white, glass surfaces, precise data displays.
- **Palette:** Lab White `#FCFCFC` (Primary), Specimen Blue `#2563EB` (Accent), Sterile `#F8FAFC` (Background), Graphite `#0F172A` (Text/Dark)
- **Typography:** Headings: "Inter" (tight tracking). Drama: "Newsreader" Italic. Data: `"IBM Plex Mono"`.
- **Image Mood:** laboratory glassware, clean white surfaces, water droplets on glass, UK recycling centre interiors, magnified bottle textures.

### Preset C — "Carbon Ledger" (Green Finance)
- **Identity:** A fintech trading floor where the currency is environmental impact — numbers, charts, and carbon savings rendered as financial instruments.
- **Palette:** Ledger Dark `#0C1222` (Primary), Profit Green `#10B981` (Accent), Paper `#F5F5F4` (Background), Ink `#1C1917` (Text/Dark)
- **Typography:** Headings: "DM Sans" (tight tracking). Drama: "Lora" Italic. Data: `"JetBrains Mono"`.
- **Image Mood:** financial dashboards, green candlestick charts, UK pound coins, digital wallet interfaces, currency flowing as particles.

---

## Fixed Design System (NEVER CHANGE)

### Visual Texture
- **NO noise overlay** for this concept — clean, clinical surfaces. Use subtle `1px` grid lines at `0.03 opacity` instead (CSS `background-image: linear-gradient`).
- Grid underlay: faint dot-grid pattern (4px dots, 24px spacing, `0.04 opacity`) across all dashboard sections.
- Containers use `rounded-[1rem]` to `rounded-[1.5rem]` — tighter radius than the cinematic concept. Dashboard-card feel.

### Micro-Interactions
- All data cards have a subtle **pulse-glow** on the border when their counter value updates (`box-shadow` transition, accent color at `0.15 opacity`).
- Buttons retain the "magnetic" `scale(1.03)` on hover with `cubic-bezier(0.25, 0.46, 0.45, 0.94)`.
- Counter values use `tabular-nums` font-feature for non-jumping digits.

### Animation Lifecycle
- Use `gsap.context()` within `useEffect` for ALL animations. Return `ctx.revert()` in the cleanup function.
- **Counters:** Use GSAP `to()` with `snap: { innerText: 1 }` for animated count-up on scroll entry.
- Default easing: `power2.out` for counters, `power3.out` for entrances.
- Stagger value: `0.06` for data elements, `0.12` for cards.

---

## Component Architecture

### A. NAVBAR — "The Status Bar"
A `fixed` full-width bar (not pill-shaped — this is a dashboard, not a brochure).
- **Left:** "EnviroPay" logo + a small monospace tag: `BETA · UK DRS 2027`.
- **Centre:** 3-4 nav links, plain text, no pills.
- **Right:** CTA button (accent color) + a live pulsing dot with "Tracking" label in monospace.
- **Behaviour:** Always visible, never transparent. Thin `1px` bottom border, `backdrop-blur-md`.

### B. HERO — "The Command Centre"
- **NOT full-bleed image.** Instead: a **split layout**.
- **Left 60%:** Large headline + subline + CTA. Headline in heading font, massive. Subline explains the DRS + EnviroPay in one sentence.
- **Right 40%:** A live "dashboard preview" — a dark card with:
  - 3 animated counters (user's 3 metrics, counting up from 0 on load)
  - A mini sparkline chart (SVG, animated `stroke-dashoffset`)
  - A pulsing status dot: "System: Pre-Launch"
- **Background:** Clean background colour with the faint grid underlay. No hero image.
- **Animation:** Counters animate on load. Headline fades up. Dashboard card scales from `0.95` to `1` with `opacity: 0` to `1`.

### C. METRICS RIVER — "The Data Stream"
A horizontal scrolling ticker bar (like a stock exchange ticker).
- Auto-scrolling marquee with key UK DRS statistics:
  - "£1.7B estimated scheme value" · "3.3B containers per year" · "Oct 2027 launch" · "20p per container" · "100% refundable"
- Monospace font. Accent-coloured dots between items. Continuous CSS `translateX` animation.
- User can hover to pause scroll.

### D. THE JOURNEY — "Pipeline Visualisation"
The Scan → Return → Earn → Use journey rendered as a **horizontal data pipeline** (not stacking cards).
- 4 nodes connected by animated dotted lines (SVG `stroke-dasharray` + `stroke-dashoffset` animation).
- Each node: an icon (Lucide), a label, and a 1-line description.
- On scroll entry, the pipeline "activates" left to right — each node lights up in sequence (accent border glow + icon colour change), with the connecting line animating between them.
- Below the pipeline: a phone mockup showing the relevant app screen for the currently active node.

### E. IMPACT DASHBOARD — "The Proof Wall"
3 large metric cards in a grid — the user's 3 key metrics, rendered as full dashboard widgets:

**Card 1 — "Counter Widget":** A massive animated number (count-up from 0) with a label, a unit, and a small sparkline chart below showing a growth trend. Example: "142,000 · containers returned · ↑ 12% this month".

**Card 2 — "Map Widget":** An SVG map of the UK with animated dots appearing at EnviroPoint locations. Dots pulse on appearance. Counter in corner: "X EnviroPoints active". Use a simplified UK outline SVG.

**Card 3 — "Activity Feed Widget":** A live-style scrolling feed of recent "events":
  - "↑ Return confirmed · Manchester · +£0.20" (typed out character by character)
  - "↑ Payout processed · Birmingham · £4.80"
  - "↑ New EnviroPoint · Bristol · Tesco Express"
  - Auto-cycles through 6-8 entries with a typing animation and a pulsing green cursor.

All cards: dark surface (`primary` colour), accent-coloured borders on hover, `rounded-[1.5rem]`, subtle border.

### F. FOR PARTNERS — "The Integration Panel"
A split section (text left, visual right).
- **Left:** "Become an EnviroPoint" headline. 3 bullet points with icons: DRS-ready, Customer footfall, Simple integration.
- **Right:** A dark card styled as an "API response" — monospace text showing a mock JSON payload:
  ```
  {
    "partner": "Tesco Express",
    "type": "EnviroPoint",
    "status": "active",
    "returns_today": 847,
    "revenue_impact": "+£169.40"
  }
  ```
  Typed out character-by-character with syntax highlighting (strings in accent colour, numbers in white, keys in muted).
- CTA below: "Talk to Us" button.

### G. WHY SECTION — "The Signal"
A minimal, typographically dramatic section.
- Dark background. Full-width.
- **Three lines, each revealing on scroll:**
  1. "The UK's Deposit Return Scheme launches in 2027." — neutral, medium-sized, body font.
  2. "3.3 billion containers need somewhere to go." — slightly larger, heading font.
  3. "EnviroPay makes sure you get paid for every one." — massive, drama serif italic, accent-coloured "paid".
- Each line fades up with a `0.3s` delay between them. GSAP ScrollTrigger.

### H. WAITLIST — "The Terminal"
A dark section styled as a terminal interface.
- A monospace "command prompt" visual:
  ```
  enviropay> join --waitlist --location="UK"
  ✓ Confirming...
  ```
- Below the visual: a clean email input + submit button. On submit, the terminal updates:
  ```
  ✓ You're in. We'll notify you at launch.
  ```
- Stores in Firebase: email, timestamp, source.

### I. FOOTER — "The Heartbeat"
- Dark background, `rounded-t-[2rem]`.
- Grid: "EnviroPay" + tagline, nav columns, legal.
- **System status:** "Pre-Launch · Monitoring" with a pulsing green dot and monospace label.
- Legal: "EnviroPay Ltd · © 2026 · Launching ahead of the UK DRS 2027"

---

## Technical Requirements (NEVER CHANGE)

- **Stack:** Next.js 16 (App Router), React 19, Tailwind CSS v4, GSAP 3 (with ScrollTrigger plugin), Lucide React for icons.
- **Fonts:** Load via `next/font/google` in `layout.tsx` based on the selected preset. Expose as CSS variables.
- **Images:** Minimal images — this concept is data-driven. Use UK map SVG, sparkline SVGs, and Unsplash only for subtle texture backgrounds where needed.
- **File structure:** Components split into `components/sections/` (page sections) and `components/shared/` (reusable). Single `globals.css` for Tailwind directives + grid overlay + custom utilities.
- **Client components:** All components using GSAP, hooks, or browser APIs must include `"use client"` directive.
- **No placeholders.** Every counter, every feed item, every animation must be fully implemented and functional.
- **Responsive:** Mobile-first. Stack dashboard cards vertically. Collapse pipeline to vertical on mobile. Ticker bar remains horizontal.

---

## Build Sequence

After receiving answers to the 4 questions:

1. Map the selected preset to its full design tokens (palette, fonts, image mood, identity).
2. Generate hero copy and dashboard preview with the user's 3 metrics.
3. Build the Metrics River ticker with UK DRS statistics.
4. Build the Pipeline Visualisation for Scan → Return → Earn → Use.
5. Build the 3 Impact Dashboard widgets (Counter, Map, Activity Feed).
6. Build the Partner Integration Panel with mock API response.
7. Scaffold the project: `npm create vite@latest`, install deps, write all files.
8. Ensure every counter animates, every feed types, every pipeline activates.

**Execution Directive:** "Do not build a marketing page; build a mission control dashboard. Every number should feel live, every element should pulse with data. The visitor should feel like they're watching the future of UK recycling boot up in real time."
