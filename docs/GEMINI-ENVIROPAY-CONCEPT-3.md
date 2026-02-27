# EnviroPay — Concept 3: "The Story Scroll"

> **Concept:** An immersive, chapter-based editorial experience. The website reads like a beautifully designed feature article — part Apple product reveal, part long-form journalism. Each scroll reveals a new "chapter" in the story of UK recycling, with EnviroPay woven in as the inevitable conclusion. The visitor doesn't click through sections — they scroll through a narrative.

---

## Role

Act as a World-Class Senior Creative Technologist and Editorial Design Engineer. You build landing pages that feel like interactive documentaries — where scroll position drives narrative, typography is cinematic, and every transition reveals the next beat of the story. No brochure patterns. The page should feel like scrolling through a Pentagram case study about the future of recycling.

## Agent Flow — MUST FOLLOW

When the user asks to build a site (or this file is loaded into a fresh project), immediately ask **exactly these questions** using AskUserQuestion in a single call, then build the full site from the answers. Do not ask follow-ups. Do not over-discuss. Build.

### Questions (all in one AskUserQuestion call)

1. **"What's the brand name and one-line purpose?"** — Free text. Example: "EnviroPay — the UK's digital deposit-return platform that makes recycling pay."
2. **"Pick an aesthetic direction"** — Single-select from the presets below.
3. **"What are 3 problems your brand solves?"** — Free text. Brief phrases. These become the narrative chapters.
4. **"What should visitors do?"** — Free text. The primary CTA. Example: "Join the waitlist", "Be part of the story".

---

## Aesthetic Presets

### Preset A — "White Paper" (Open Editorial)
- **Identity:** A Monocle magazine feature about the future of sustainability — generous whitespace, editorial typography, photography as punctuation.
- **Palette:** Paper `#FFFFFF` (Primary), Deep Green `#166534` (Accent), Warm White `#FFFEF7` (Background), Ink Black `#09090B` (Text/Dark)
- **Typography:** Headings: "Outfit" (tight tracking, varied weights). Drama: "Playfair Display" Italic. Body: "Source Serif 4" (reading font). Data: `"IBM Plex Mono"`.
- **Image Mood:** UK recycling centres (clean, modern), hands holding glass bottles, morning light on green landscapes, editorial lifestyle photography.
- **Overall feel:** Light, airy, generous spacing, text-led. Images used sparingly but large when they appear.

### Preset B — "Dark Journal" (Night-Mode Editorial)
- **Identity:** A Wired longread about climate infrastructure at midnight — dark backgrounds, high-contrast type, dramatic image reveals.
- **Palette:** Charcoal `#111111` (Primary), Flame Orange `#F97316` (Accent), Cream `#FEF9EF` (Background), Bone `#E7E5E4` (Text/Light)
- **Typography:** Headings: "Plus Jakarta Sans" (tight tracking). Drama: "Cormorant Garamond" Italic. Body: "Literata". Data: `"JetBrains Mono"`.
- **Image Mood:** night-time cityscapes with recycling bins, dark industrial textures, orange-lit warehouses, dramatic shadows on glass containers.
- **Overall feel:** Moody, immersive, text over dark backgrounds. Images bleed full-width. High drama.

### Preset C — "Field Notes" (Warm Documentary)
- **Identity:** A National Geographic field journal about sustainable systems — earthy, tactile, handcrafted warmth with scientific precision.
- **Palette:** Stone `#44403C` (Primary), Amber `#D97706` (Accent), Canvas `#FAFAF5` (Background), Earth `#1C1917` (Text/Dark)
- **Typography:** Headings: "DM Sans" (tight tracking). Drama: "Lora" Italic. Body: "Merriweather". Data: `"Space Mono"`.
- **Image Mood:** close-up textures of recycled materials, UK countryside, hands sorting containers, warm sunlight through bottle glass, composting and soil.
- **Overall feel:** Warm, grounded, tactile. Photography feels like 35mm film. Generous line-height for body text.

---

## Fixed Design System (NEVER CHANGE)

### Visual Texture
- **No noise overlay, no grid.** This concept relies on **typography and whitespace** as texture.
- Use generous padding: `py-[8rem]` to `py-[12rem]` between chapters. Let the page breathe.
- Section transitions use full-width `<hr>` elements — styled as thin `1px` lines with `32px` margin, accent-coloured at `0.2 opacity`.

### Micro-Interactions
- All buttons have a **text-underline expand** on hover: a `<span>` pseudo-element that grows from `0%` to `100%` width under the text, accent-coloured. No background colour change.
- Links use the same underline-expand pattern.
- Chapter number badges rotate `5deg` on hover with `ease-out`.

### Animation Lifecycle
- Use `gsap.context()` within `useEffect` for ALL animations. Return `ctx.revert()` in the cleanup function.
- **Primary animation: text reveals.** Every headline animates word-by-word from `opacity: 0, y: 20` to `opacity: 1, y: 0` staggered at `0.04` per word. Triggered by ScrollTrigger at `top: 80%`.
- **Image reveals:** Images animate from `opacity: 0, scale: 1.05` to `opacity: 1, scale: 1` with `power2.out` over `1.2s`.
- **Parallax:** Each full-width image has a subtle `y` parallax offset (GSAP ScrollTrigger, `scrub: true`, moving at `0.3x` scroll speed).
- No entrance stagger for body text — only headlines and images animate.

---

## Component Architecture — Chapter-Based

### A. NAVBAR — "The Byline"
A minimal `fixed` navbar — almost invisible.
- **Left:** "EnviroPay" in body font weight (not bold — editorial feel).
- **Right:** CTA button only — "Join Waitlist" with underline-expand hover.
- **No nav links.** This is a scroll-through story, not a multi-section site. Progress is communicated by a **scroll progress bar** — a thin `2px` accent-coloured line at the very top of the viewport that grows from `0%` to `100%` width as the user scrolls.
- **Behaviour:** Always visible. Background matches section beneath it (`mix-blend-mode` or JS-driven colour swap).

### B. CHAPTER 0: OPENING — "The Hook"
- `100dvh` height. Centre-aligned text, dead centre of the viewport.
- **Two lines only:**
  - Line 1: "What if recycling actually paid you?" — drama serif italic, massive (5rem+).
  - Line 2: "It's about to." — heading font, smaller, accent-coloured.
- No CTA. No image. No subtext. Pure typographic impact.
- **Animation:** Line 1 fades up word-by-word. 0.8s delay. Line 2 fades up as a single block.
- Scroll down indicator: a thin animated chevron `↓` at the bottom, gently bouncing.

### C. CHAPTER 1: THE PROBLEM — "The UK Throws Money Away"
Derived from user's 1st problem statement.
- **Layout:** Full-width text section → full-width image → text continuation.
- **Text block 1:** Chapter number "01" in monospace (accent-coloured, small). Below: a large headline in heading font. Below: 2-3 paragraphs of body text in reading font explaining the problem — UK recycling is broken, containers end up in landfill, deposits don't exist yet.
- **Full-width image:** A parallaxing Unsplash image (matching preset imageMood) at `100vw` width with `60vh` height, `object-cover`. Bleeds to edges, no border-radius.
- **Text block 2:** A pull quote in drama serif italic, large, centred: a single powerful sentence summarising the problem. Accent-coloured quotation marks.

### D. CHAPTER 2: THE SHIFT — "2027 Changes Everything"
Derived from user's 2nd problem statement.
- **Layout:** Two-column (text left, visual right) on desktop. Stacked on mobile.
- **Text column:** Chapter number "02". Headline. 2-3 body paragraphs explaining the UK DRS — what it is, when it launches, what it means for everyday people.
- **Visual column:** A vertical timeline with 3 nodes:
  - "2025 — Legislation passed"
  - "2026 — Infrastructure deployed"
  - "2027 — Scheme goes live"
  - Nodes animate sequentially on scroll entry. Active node: accent-coloured dot + bold text. Future nodes: muted.
- **Below:** A full-width stat bar — 3 large numbers side by side:
  - "3.3B" — containers per year
  - "£1.7B" — scheme value
  - "20p" — per container
  - Each number counts up from 0 on scroll entry (GSAP `snap: { innerText: 1 }`). Monospace font.

### E. CHAPTER 3: THE ANSWER — "Enter EnviroPay"
Derived from user's 3rd problem statement.
- **Layout:** This is the product reveal. Treated like an Apple product page moment.
- **Opening:** A centred text block: "Introducing EnviroPay" in heading font, massive, with the word "EnviroPay" in accent colour.
- **Product reveal:** A large phone mockup (EnviroPay app dashboard) that scales from `0.8` to `1` and fades from `0` to `1` as you scroll into view. Centred, with generous padding.
- **Below the phone:** The 4-step journey as a **vertical scroll sequence** (not horizontal):
  - Each step: large number (monospace, accent), title (heading font), 1-line description (body font), and a small inline illustration or icon.
  - Steps: "01 Scan" → "02 Return" → "03 Earn" → "04 Use"
  - Each step animates in from the left (staggered) on scroll entry.

### F. CHAPTER 4: THE WALLET — "Your Money, Your Impact"
- **Layout:** A "feature exploration" mini-section.
- **Three cards** in a loose grid (not rigid 3-column — offset, editorial feel):
  - **EnviroWallet:** "Every refund in one place." Icon + 2-line description + a mini wallet balance visual (dark card showing "£12.40" in monospace).
  - **EnviroImpact:** "See what your returns really mean." Icon + description + a mini impact counter (containers diverted, CO₂ saved).
  - **Flexible Payouts:** "Cash out, spend, or donate." Icon + description + a mini payout option row (bank, voucher, charity icons).
- Cards have no background colour — just text, icon, and a thin bottom border. Editorial, not product-card.
- Each card fades up with staggered entry.

### G. FOR PARTNERS — "The Invitation"
- **Layout:** A single centred text block — the "and for business" pivot.
- **Headline:** "And if you run a business?" — drama serif italic, large.
- **Body:** 2 short paragraphs about becoming an EnviroPoint — hosting returns, earning customer loyalty, being DRS-ready.
- **CTA:** "Talk to Us" with underline-expand hover. Centred.
- No cards, no grids — pure typographic section.

### H. CLOSING — "The Call"
- `100dvh` height. Centre-aligned, like Chapter 0.
- **Headline:** "Recycling is about to pay." — drama serif italic, massive.
- **Sub:** "Join the thousands getting ready." — heading font, smaller.
- **CTA:** Email input + submit button. Clean, centred.
- **Below CTA:** "Launching 2027 · Ahead of the UK Deposit Return Scheme" in monospace, muted.
- **Animation:** Same word-by-word reveal as Chapter 0.

### I. FOOTER — "The Colophon"
- Minimal. Light or dark depending on preset.
- Single row: "EnviroPay Ltd · © 2026 · Privacy · Terms"
- No grid layout, no navigation columns. This is an editorial piece — the footer is a colophon, not a sitemap.

---

## Technical Requirements (NEVER CHANGE)

- **Stack:** Next.js 16 (App Router), React 19, Tailwind CSS v4, GSAP 3 (with ScrollTrigger plugin), Lucide React for icons.
- **Fonts:** Load via `next/font/google` in `layout.tsx` based on the selected preset. **This concept requires a reading body font** (Source Serif 4, Literata, or Merriweather) in addition to heading and drama fonts. Expose as CSS variables.
- **Images:** Use real Unsplash URLs or local assets in `/public/images/`. 3-4 large editorial images maximum — quality over quantity. Each image should feel intentional, not decorative.
- **File structure:** Components split into `components/sections/` (page sections) and `components/shared/` (reusable). Single `globals.css` for Tailwind directives + custom utilities.
- **Client components:** All components using GSAP, hooks, or browser APIs must include `"use client"` directive.
- **No placeholders.** Every chapter, every counter, every animation must be fully implemented and functional.
- **Responsive:** Mobile-first. Two-column sections stack on mobile. Reduce headline sizes. Full-width images remain full-width.

---

## Build Sequence

After receiving answers to the 4 questions:

1. Map the selected preset to its full design tokens (palette, fonts, image mood).
2. Write the narrative arc: Hook → Problem → Shift → Answer → Wallet → Partners → Call.
3. Source 3-4 editorial Unsplash images matching the preset's mood.
4. Build each chapter as a standalone section with scroll-triggered animations.
5. Build the scroll progress bar and minimal navbar.
6. Build the timeline, stat counters, and product reveal animations.
7. Scaffold the project: `npm create vite@latest`, install deps, write all files.
8. Ensure the scroll experience feels like reading a beautifully designed article.

**Execution Directive:** "Do not build a landing page; build a story. Every chapter should earn the next scroll. The visitor should arrive curious and leave convinced — not because they were sold to, but because they scrolled through something that felt inevitable."
