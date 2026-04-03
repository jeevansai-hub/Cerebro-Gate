# CerebroGate — Project Structure & Website Architecture Outline

This document provides a technical and structural breakdown of the CerebroGate marketing platform.

---

## 1. DIRECTORY OVERVIEW
- `app/`: Core Next.js 14 App Router entry point.
- `components/`: Modular UI system separated by responsibility.
  - `layout/`: Persistent global elements (Nav, Footer) and scroll/cursor providers.
  - `sections/`: 10 independent marketing and product-demo sections.
  - `three/`: 3D rendering logic using React Three Fiber.
  - `ui/`: Reusable design system primitives and atomic animations.
- `lib/`: Logic and data layer.
  - `animations.ts`: Centralized Framer Motion variants.
  - `constants.ts`: Complete data for features, testimonials, pricing, and navigation.
  - `utils.ts`: Functional helpers (currency formatting, prompt classification).
- `public/`: Static assets (Logos, Icons, etc.).

---

## 2. DETAIL: COMPONENT BREAKDOWN

### A. UI Primitives (`components/ui/index.tsx`)
- `Button`: Multi-variant action component with hover glows (`primary`, `secondary`, `outline`, `ghost`, `link`).
- `Badge`: Metadata labels with consistent semantic coding (`success`, `warning`, `danger`, `dim`).
- `Card`: The foundational "Container" component with glassmorphic borders and hover transitions.

### B. Specialized Animations (`components/ui/animations.tsx`)
- `AnimatedNumber`: Component that rolls numbers up from 0 to target (used in counters and pricing).
- `Typewriter`: Infinite looping text cycle for demonstrating terminal/AI interactions.

---

## 3. DETAIL: SECTION BREAKDOWN

### 01. Hero (`Hero.tsx`)
- **Focus**: High-impact landing hook.
- **Logic**: Integrates dynamic 3D `GatewayScene` behind heavy uppercase Syne typography.
- **Sub-components**: Dynamic `Badge` with pulsing status, `Button` group, and scrolling `MetricsTicker`.

### 02. Problem (`Problem.tsx`)
- **Focus**: Educational "Before/After".
- **Logic**: State-driven "Old Invoice" vs "CerebroGate Managed" visualization. Uses `AnimatePresence` for smooth switching.

### 03. Solution (`Solution.tsx`)
- **Focus**: The "Internal Engine" logic.
- **Logic**: SVG path animation with `animateMotion` for traveling data particles. 4-node pipeline flow.

### 04. Features (`Features.tsx`)
- **Focus**: Product capabilities.
- **Logic**: Bento grid that maps over `FEATURES` constant.
- **Sub-component**: `RoutingDemo` (live-looped terminal logs showing routing intelligence).

### 05. How It Works (`HowItWorks.tsx`)
- **Focus**: Step-by-step onboarding.
- **Logic**: Scroll position tracking using `useScroll` and `useSpring`.
- **UI**: 6-stage timeline on the left, sticky `CodeTerminal` on the right displaying dynamic JSON manifests.

### 06. Dashboard (`Dashboard.tsx`)
- **Focus**: The finished product experience.
- **Logic**: High-fidelity browser mockup.
- **UI**: KPI Stat Cards, daily spend line chart (SVG), model distribution donut chart (radial SVG), and live routing table rows.

### 07. Routing Visualizer (`RoutingVisualizer.tsx`)
- **Focus**: Engagement and "The Magic".
- **Logic**: Functional input form that triggers the `classifyPrompt()` utility.
- **UI**: Animated 6-step analysis sequence with terminal-style results display.

### 08. Pricing (`Pricing.tsx`)
- **Focus**: Conversion and business model.
- **Logic**: Shared `PRICING_PLANS` mapped to glass cards.
- **Feature**: `SavingsCalculator` — horizontal spend slider that updates `AnimatedNumber` yields.

### 09. Testimonials (`Testimonials.tsx`)
- **Focus**: Trust.
- **Logic**: Grayscale logo bar and a horizontal draggable carousel using Framer Motion's `drag` prop.

### 10. CTA (`CTA.tsx`)
- **Focus**: Final conversion.
- **Logic**: Particles background class and center-aligned "Dramatic Display" typography.

---

## 4. GLOBAL ARCHITECTURE (app/layout.tsx)
- **Providers**:
  - `LenisProvider`: Smooth kinetic scrolling.
  - `CustomCursor`: Custom JS-based cursor follower (currently disabled as per user request to use default pointer).
- **Styling Layer**: `globals.css` containing design tokens, scrollbar customization, and noise-texture overlays.
- **Type Layer**: Custom Google Fonts (`Syne`, `DM Sans`, `JetBrains Mono`) injected via CSS variables.

---

## 5. DESIGN TOKENS (tailwind.config.ts)
- **Colors**: Custom mapping of `#020608` (Background) to `#00c8ff` (Cyan) and `#00ff9d` (Meridian).
- **Fonts**: Pre-defined families for `syne`, `sans`, and `mono`.
- **Animations**: Custom `ticker` for infinite scrolls and `shimmer` for skeleton states.
- **Effects**: Specialized `glow` and `blur` utilities for dark-mode depth.
