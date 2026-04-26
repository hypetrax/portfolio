# Portfolio Full Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the portfolio from editorial white/Inter to refined brutalism — white base, Space Grotesk + Space Mono, `#0066FF` electric blue accent, 2px ink borders, offset box-shadows, inverted nav/CTA/footer, word-stagger hero, directional page transitions.

**Architecture:** CSS-first design system rewrite (complete App.css overhaul), then update each React component to match. Framer Motion layer extended with word-stagger variants. No new npm dependencies needed.

**Tech Stack:** React 19, Framer Motion 12, Vite 8, TypeScript, CSS custom properties, Google Fonts (Space Grotesk + Space Mono)

---

## File Map

| File | Action | Responsibility |
|------|--------|----------------|
| `index.html` | Modify | Remove old fonts, add Space Grotesk + Space Mono |
| `src/App.css` | Full rewrite | Design system: variables, typography, layout, components |
| `src/lib/motion.ts` | Modify | Add word-stagger variants |
| `src/components/Navbar.tsx` | Modify | Dark bar, scroll-aware accent border |
| `src/components/Footer.tsx` | Modify | Inverted black panel |
| `src/components/Layout.tsx` | Modify | Directional page transition |
| `src/pages/Home.tsx` | Modify | Word-stagger hero, remove video bg, add grid bg |

---

## Task 1: Font Imports

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Replace Google Fonts import**

Open `index.html`. Find and replace the existing `<link>` tag(s) for Playfair Display / Inter with:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
```

If there are no existing font links, add these inside `<head>` before the closing `</head>`.

- [ ] **Step 2: Verify build passes**

```bash
cd "C:/Users/Bart/Desktop/portfolio" && npm run build
```

Expected: `✓ built in X.Xs` — zero TypeScript errors.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: swap fonts to Space Grotesk + Space Mono"
```

---

## Task 2: CSS Design System — Full Rewrite

**Files:**
- Modify: `src/App.css` (complete replacement)

- [ ] **Step 1: Replace App.css entirely**

Replace the full contents of `src/App.css` with:

```css
/* ===== DESIGN SYSTEM ===== */
:root {
  --font-display: "Space Grotesk", sans-serif;
  --font-body:    "Space Mono", monospace;

  --bg:      #FFFFFF;
  --ink:     #0A0A0A;
  --surface: #F5F5F5;
  --accent:  #0066FF;
  --accent-dim: #003FCC;
  --muted:   #6B6B6B;
  --border:  #0A0A0A;

  /* Legacy aliases used in some components */
  --bg-color:    var(--bg);
  --text-main:   var(--ink);
  --text-muted:  var(--muted);
  --accent-glow: rgba(0, 102, 255, 0.08);

  color-scheme: light;
}

* { box-sizing: border-box; }

#root {
  width: 100%;
  margin: 0;
  padding: 0;
}

body {
  background: var(--bg);
  color: var(--ink);
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
  font-family: var(--font-body);
  font-size: 14px;
  line-height: 1.7;
}

p, li {
  color: var(--muted);
  font-family: var(--font-body);
  font-size: 14px;
  line-height: 1.75;
}

/* ===== TYPOGRAPHY ===== */
h1 {
  font-family: var(--font-display);
  font-size: clamp(48px, 8vw, 120px);
  line-height: 0.95;
  font-weight: 700;
  margin: 0 0 32px;
  letter-spacing: -0.03em;
  color: var(--ink);
}

h2 {
  font-family: var(--font-display);
  font-size: clamp(30px, 4.5vw, 68px);
  font-weight: 700;
  line-height: 1.05;
  margin: 0 0 16px;
  letter-spacing: -0.025em;
  color: var(--ink);
}

h3 {
  font-family: var(--font-body);
  font-size: 10px;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  margin: 0 0 12px;
  color: var(--accent);
}

.italic {
  font-style: italic;
  font-weight: 400;
  opacity: 0.8;
}

/* ===== LAYOUT ===== */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 clamp(16px, 4vw, 48px);
}

/* ===== NAVIGATION ===== */
.main-nav {
  padding: 20px 0;
  border-bottom: 2px solid transparent;
  position: sticky;
  top: 0;
  background: var(--ink);
  z-index: 100;
  transition: border-color 0.25s ease;
}

.main-nav.scrolled {
  border-bottom-color: var(--accent);
}

.main-nav .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-logo {
  font-family: var(--font-display);
  font-size: 18px;
  font-weight: 700;
  text-decoration: none;
  color: #ffffff;
  letter-spacing: -0.02em;
}

.nav-logo::after {
  content: '.';
  color: var(--accent);
}

.nav-links {
  display: flex;
  gap: 36px;
}

.nav-links a {
  text-decoration: none;
  color: rgba(255, 255, 255, 0.5);
  font-family: var(--font-body);
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  font-weight: 400;
  transition: color 0.15s ease;
  position: relative;
}

.nav-links a:hover {
  color: #ffffff;
}

.nav-links a.active {
  color: #ffffff;
}

/* ===== SCROLL PROGRESS ===== */
.scroll-progress {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--accent);
  transform-origin: 0%;
  z-index: 200;
  box-shadow: 0 0 8px rgba(0, 102, 255, 0.6);
}

/* ===== HERO ===== */
.hero-header {
  padding: clamp(80px, 12vh, 140px) 0 clamp(60px, 8vh, 100px);
  border-bottom: 3px solid var(--ink);
  position: relative;
  overflow: hidden;
  background: var(--bg);
}

.hero-grid-bg {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(var(--ink) 1px, transparent 1px),
    linear-gradient(90deg, var(--ink) 1px, transparent 1px);
  background-size: 64px 64px;
  opacity: 0.03;
  pointer-events: none;
  z-index: 0;
}

.hero-rule {
  width: 100%;
  height: 3px;
  background: var(--ink);
  margin: 40px 0 36px;
}

.overline {
  font-family: var(--font-body);
  font-size: 11px;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: var(--accent);
  margin: 0 0 32px;
}

.lead {
  font-family: var(--font-body);
  font-size: clamp(14px, 1.6vw, 17px);
  line-height: 1.75;
  max-width: 580px;
  color: var(--muted);
}

/* ===== EXPERTISE SECTIONS ===== */
.expertise-section {
  padding: 0;
  border-bottom: 2px solid var(--ink);
  background: var(--bg);
}

.case-study-visual {
  width: 100%;
  aspect-ratio: 16/10;
  overflow: hidden;
  border: 2px solid var(--ink);
  background: var(--surface);
  box-shadow: none;
  border-radius: 0;
  transition: box-shadow 0.25s ease;
}

.expertise-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.55s cubic-bezier(0.4, 0, 0.2, 1), filter 0.55s ease;
  filter: grayscale(100%) brightness(1) contrast(1.05);
}

.case-study-grid:hover .expertise-image {
  transform: scale(1.04);
  filter: grayscale(0%) brightness(1);
}

.case-study-grid:hover .case-study-visual {
  box-shadow: 8px 8px 0 var(--ink);
}

/* ===== CASE STUDY ===== */
.case-study {
  padding: clamp(60px, 8vh, 100px) 0;
  border-bottom: 2px solid var(--ink);
}

.case-study:nth-of-type(even) {
  background: var(--surface);
}

.case-study-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: center;
}

@media (max-width: 1100px) {
  .case-study-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }
}

.project-meta {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 28px;
}

.project-number {
  font-family: var(--font-body);
  font-size: 11px;
  font-weight: 400;
  color: var(--accent);
  letter-spacing: 0.1em;
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.project-tags span {
  font-family: var(--font-body);
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  border: 2px solid var(--ink);
  padding: 4px 12px;
  border-radius: 0;
  color: var(--ink);
  font-weight: 400;
  background: transparent;
  transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease;
  cursor: default;
}

.project-tags span:hover {
  background: var(--accent);
  border-color: var(--accent);
  color: white;
}

.project-intro {
  font-family: var(--font-body);
  font-size: clamp(14px, 1.5vw, 16px);
  line-height: 1.75;
  margin-bottom: 40px;
  color: var(--ink);
  font-weight: 400;
}

.case-details {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  margin-bottom: 40px;
}

@media (max-width: 640px) {
  .case-details {
    grid-template-columns: 1fr;
  }
}

.detail-block h3 {
  margin-bottom: 10px;
}

.detail-block p {
  font-size: 13px;
  line-height: 1.7;
  margin: 0;
}

.results-block {
  margin-bottom: 40px;
  padding: 28px 28px 28px 24px;
  background: transparent;
  border: 2px solid var(--ink);
  border-left: 4px solid var(--accent);
  border-radius: 0;
}

.results-block h3 {
  color: var(--ink);
  margin-bottom: 16px;
}

.results-block ul {
  padding-left: 0;
  margin: 0;
  list-style: none;
}

.results-block li {
  font-size: 13px;
  margin-bottom: 10px;
  color: var(--muted);
  padding-left: 20px;
  position: relative;
}

.results-block li::before {
  content: '→';
  position: absolute;
  left: 0;
  color: var(--accent);
  font-weight: 700;
  font-size: 12px;
}

.results-block li:last-child {
  margin-bottom: 0;
}

/* ===== ACTIONS / BUTTONS ===== */
.project-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.btn-primary,
.btn-secondary,
.btn-large {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  padding: 14px 28px;
  border-radius: 0;
  font-weight: 400;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  cursor: pointer;
  font-family: var(--font-body);
  border: 2px solid var(--ink);
  transition: background 0.15s ease, color 0.15s ease, box-shadow 0.15s ease;
  position: relative;
  overflow: hidden;
}

.btn-primary {
  background: var(--ink);
  color: #ffffff;
  box-shadow: none;
}

.btn-primary:hover {
  background: var(--accent);
  border-color: var(--accent);
  color: #ffffff;
  box-shadow: 4px 4px 0 var(--ink);
  transform: none;
}

.btn-secondary {
  background: transparent;
  color: var(--ink);
}

.btn-secondary:hover {
  background: var(--ink);
  color: #ffffff;
  box-shadow: 4px 4px 0 rgba(0,0,0,0.15);
}

.btn-large {
  background: var(--ink);
  color: #ffffff;
  padding: 18px 40px;
  font-size: 12px;
  border: 2px solid var(--ink);
  box-shadow: none;
  gap: 12px;
}

.btn-large:hover {
  background: var(--accent);
  border-color: var(--accent);
  box-shadow: 6px 6px 0 var(--ink);
  transform: none;
}

.linkedin-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

/* ===== LIVE IFRAME SLIDER ===== */
.live-slider-container {
  position: relative;
  width: 100%;
  aspect-ratio: 16/11;
  overflow: hidden;
  border: 2px solid var(--ink);
  background: var(--surface);
  cursor: ew-resize;
  border-radius: 0;
  box-shadow: none;
}

.live-frame {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.live-frame iframe {
  width: 1440px;
  height: 990px;
  border: none;
  transform-origin: 0 0;
  pointer-events: none;
}

.before-frame {
  z-index: 1;
  background: var(--bg);
}

.label {
  position: absolute;
  bottom: 12px;
  padding: 5px 10px;
  background: var(--ink);
  color: white;
  font-size: 9px;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  z-index: 10;
  pointer-events: none;
  border-radius: 0;
  box-shadow: none;
  font-family: var(--font-body);
}

.label.before { left: 12px; }
.label.after  { right: 12px; }

.slider-handle {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--accent);
  z-index: 20;
  pointer-events: none;
  box-shadow: 0 0 12px rgba(0, 102, 255, 0.5);
}

.handle-circle {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
  background: var(--accent);
  border-radius: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 3px 3px 0 var(--ink);
  font-size: 14px;
  color: white;
  border: 2px solid var(--ink);
}

.slider-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 15;
  background: transparent;
}

/* ===== CTA SECTION ===== */
.cta-section {
  padding: 120px 0;
  text-align: center;
  background: var(--ink);
  border-top: 3px solid var(--accent);
  position: relative;
  overflow: hidden;
}

.cta-section h2 {
  color: #ffffff;
}

.cta-section p {
  font-size: 15px;
  margin-bottom: 48px;
  max-width: 560px;
  margin-left: auto;
  margin-right: auto;
  color: rgba(255, 255, 255, 0.45);
}

/* CTA buttons inverted */
.cta-section .btn-large {
  background: transparent;
  border-color: rgba(255, 255, 255, 0.6);
  color: #ffffff;
  box-shadow: none;
}

.cta-section .btn-large:hover {
  background: #ffffff;
  border-color: #ffffff;
  color: var(--ink);
  box-shadow: 6px 6px 0 rgba(255, 255, 255, 0.15);
}

/* ===== FOOTER ===== */
.editorial-footer {
  padding: 48px 0;
  border-top: 3px solid var(--accent);
  background: var(--ink);
}

.footer-content {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

@media (min-width: 768px) {
  .footer-content {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
}

.footer-main p {
  color: rgba(255, 255, 255, 0.35);
  font-family: var(--font-body);
  font-size: 12px;
  margin: 0;
}

.labs-nav {
  display: flex;
  gap: 28px;
  flex-wrap: wrap;
}

.labs-link {
  color: rgba(255, 255, 255, 0.5);
  text-decoration: none;
  font-family: var(--font-body);
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-weight: 400;
  transition: color 0.15s ease;
  position: relative;
}

.labs-link:hover {
  color: var(--accent);
}

.labs-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 1px;
  background: var(--accent);
  transition: width 0.2s ease;
}

.labs-link:hover::after {
  width: 100%;
}

.divider {
  display: none;
}
```

- [ ] **Step 2: Verify build passes**

```bash
cd "C:/Users/Bart/Desktop/portfolio" && npm run build
```

Expected: `✓ built in X.Xs` — zero errors.

- [ ] **Step 3: Commit**

```bash
git add src/App.css
git commit -m "feat: full CSS design system rewrite — brutalist white/ink/blue"
```

---

## Task 3: Motion Library — Word Stagger Variants

**Files:**
- Modify: `src/lib/motion.ts`

- [ ] **Step 1: Add word-stagger variants**

Append to the end of `src/lib/motion.ts`:

```ts
/** Word-by-word stagger container for hero headings */
export const wordContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.15 },
  },
} as const;

/** Individual word spring entrance */
export const wordItem = {
  hidden: { opacity: 0, y: 44 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 260, damping: 26 },
  },
} as const;
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/motion.ts
git commit -m "feat: add word-stagger variants to motion library"
```

---

## Task 4: Navbar — Dark Bar + Scroll-Aware Border

**Files:**
- Modify: `src/components/Navbar.tsx`

- [ ] **Step 1: Update Navbar component**

Replace the full contents of `src/components/Navbar.tsx` with:

```tsx
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, useReducedMotion, useScroll, useSpring, useMotionValueEvent } from 'framer-motion';

const NAV_LINKS = [
  { to: '/security', label: 'Security' },
  { to: '/web',      label: 'Web' },
  { to: '/labs',     label: 'Labs' },
];

export const Navbar = () => {
  const { pathname } = useLocation();
  const reduced = useReducedMotion();
  const { scrollYProgress, scrollY } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 400, damping: 40, restDelta: 0.001 });
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, 'change', (y) => {
    setScrolled(y > 48);
  });

  const isActive = (path: string) =>
    pathname === path || pathname.startsWith(path + '/');

  return (
    <>
      {!reduced && (
        <motion.div className="scroll-progress" style={{ scaleX }} />
      )}
      <motion.nav
        className={`main-nav${scrolled ? ' scrolled' : ''}`}
        initial={reduced ? {} : { opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      >
        <div className="container">
          <motion.div
            whileHover={reduced ? {} : { scale: 1.04 }}
            transition={{ duration: 0.15 }}
          >
            <Link to="/" className="nav-logo">Bart Pullen</Link>
          </motion.div>

          <div className="nav-links">
            {NAV_LINKS.map(({ to, label }) => {
              const active = isActive(to);
              return (
                <Link
                  key={to}
                  to={to}
                  className={active ? 'active' : ''}
                  style={{ position: 'relative', display: 'inline-block' }}
                >
                  {label}
                  {active && !reduced && (
                    <motion.span
                      layoutId="nav-indicator"
                      style={{
                        position: 'absolute',
                        bottom: -4,
                        left: 0,
                        right: 0,
                        height: 2,
                        background: 'var(--accent)',
                        borderRadius: 0,
                      }}
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </motion.nav>
    </>
  );
};
```

- [ ] **Step 2: Verify build**

```bash
cd "C:/Users/Bart/Desktop/portfolio" && npm run build
```

Expected: zero errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/Navbar.tsx
git commit -m "feat: dark navbar with scroll-aware accent border"
```

---

## Task 5: Footer — Inverted Black Panel

**Files:**
- Modify: `src/components/Footer.tsx`

- [ ] **Step 1: Update Footer component**

Replace the full contents of `src/components/Footer.tsx` with:

```tsx
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { viewportOnce, staggerContainer, fadeUpItem } from '../lib/motion';

const FOOTER_LINKS = [
  { label: 'Security & Compliance', to: '/security' },
  { label: 'Web Development',       to: '/web' },
  { label: 'Labs & Research',       to: '/labs' },
] as const;

export const Footer = () => {
  const reduced = useReducedMotion();

  return (
    <motion.footer
      className="editorial-footer"
      initial={reduced ? {} : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      <div className="container">
        <div className="footer-content">
          <div className="footer-main">
            <p>&copy; {new Date().getFullYear()} Bart Pullen. Gebouwd met React & TypeScript.</p>
          </div>
          <div className="footer-labs">
            <motion.nav
              className="labs-nav"
              variants={reduced ? undefined : staggerContainer}
              initial={reduced ? undefined : 'hidden'}
              whileInView={reduced ? undefined : 'visible'}
              viewport={{ once: true, margin: '-20px' }}
            >
              {FOOTER_LINKS.map(({ label, to }) => (
                <motion.div key={to} variants={reduced ? undefined : fadeUpItem}>
                  <Link to={to} className="labs-link">{label}</Link>
                </motion.div>
              ))}
              <motion.div variants={reduced ? undefined : fadeUpItem}>
                <a
                  href="https://www.linkedin.com/in/bartpullen/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="labs-link"
                >
                  LinkedIn
                </a>
              </motion.div>
            </motion.nav>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Footer.tsx
git commit -m "feat: inverted black footer with staggered links"
```

---

## Task 6: Page Transition — Directional Slide

**Files:**
- Modify: `src/components/Layout.tsx`

- [ ] **Step 1: Update Layout with directional transition**

Replace the full contents of `src/components/Layout.tsx` with:

```tsx
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export const Layout = () => {
  const { pathname } = useLocation();
  const reduced = useReducedMotion();

  return (
    <div className="editorial-portfolio">
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={reduced ? { opacity: 0 } : { opacity: 0, x: '2%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, x: '-1.5%' }}
          transition={
            reduced
              ? { duration: 0.2 }
              : { duration: 0.32, ease: [0.25, 0.46, 0.45, 0.94] }
          }
        >
          <Outlet />
        </motion.div>
      </AnimatePresence>
      <Footer />
    </div>
  );
};
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Layout.tsx
git commit -m "feat: directional slide page transition"
```

---

## Task 7: Home Hero — Word Stagger + Grid Background

**Files:**
- Modify: `src/pages/Home.tsx`

- [ ] **Step 1: Update Home.tsx**

Replace the full contents of `src/pages/Home.tsx` with:

```tsx
import { memo } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { SEO } from '../components/SEO';
import { LinkedInIcon } from '../components/Icons';
import { viewportOnce, delayed, wordContainer, wordItem } from '../lib/motion';

const HERO_WORDS = [
  { text: 'Ik',          accent: false },
  { text: 'regel',       accent: false },
  { text: 'security,',   accent: true  },
  { text: 'bouw',        accent: false },
  { text: 'websites',    accent: true  },
  { text: 'en',          accent: false },
  { text: 'analyseer',   accent: false },
  { text: 'data.',       accent: true  },
];

export const Home = memo(() => {
  const reduced = useReducedMotion();

  const hi = reduced ? {} : { opacity: 0, y: 24 };
  const vp = { opacity: 1, y: 0 };
  const t  = (delay = 0) => reduced ? { duration: 0 } : delayed(delay);

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Bart Pullen',
    url: 'https://bartpullen.nl',
    jobTitle: 'Webdesigner & Information Security Officer',
    sameAs: [
      'https://www.linkedin.com/in/bartpullen/',
      'https://github.com/hypetrax',
    ],
    description:
      'Het persoonlijke portfolio van Bart Pullen, met focus op webdesign, cybersecurity en kwantitatieve analyse.',
  };

  return (
    <>
      <SEO
        title="Bart Pullen — Security, Web & Data Specialist"
        description="Senior Information Security Officer en Webdesigner. Expert in ISO 27001, Cyber Resilience Act en data-gedreven web development."
        canonical="/"
        schema={personSchema}
      />

      {/* ── Hero ── */}
      <header className="hero-header">
        <div className="hero-grid-bg" />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <motion.p className="overline" initial={hi} animate={vp} transition={t(0.05)}>
            Bart Pullen — Portfolio
          </motion.p>

          <motion.h1
            variants={reduced ? undefined : wordContainer}
            initial={reduced ? {} : 'hidden'}
            animate="visible"
          >
            {HERO_WORDS.map((word, i) => (
              <motion.span
                key={i}
                variants={reduced ? undefined : wordItem}
                style={{
                  display: 'inline-block',
                  color: word.accent ? 'var(--accent)' : 'var(--ink)',
                  marginRight: '0.25em',
                }}
              >
                {word.text}
              </motion.span>
            ))}
          </motion.h1>

          <motion.div className="hero-rule" initial={hi} animate={vp} transition={t(0.55)} />

          <motion.p className="lead" initial={hi} animate={vp} transition={t(0.65)}>
            Dit is mijn persoonlijke plek waar ik projecten en onderzoeken deel. Geen theoretische
            verhalen, maar tastbaar{' '}
            <span style={{ color: 'var(--accent)' }}>werk</span>: van diepgaande security-analyses
            tot het moderniseren van verouderde sites en trading modellen.
          </motion.p>
        </div>
      </header>

      <main>
        {/* 01 — Security */}
        <section className="expertise-section">
          <div className="container" style={{ padding: 'clamp(60px,8vh,100px) clamp(16px,4vw,48px)' }}>
            <article className="case-study-grid">
              <motion.div
                className="case-study-content"
                initial={hi}
                whileInView={vp}
                viewport={viewportOnce}
                transition={reduced ? { duration: 0 } : { duration: 0.35, ease: 'easeOut' }}
              >
                <header>
                  <h3>01 — Security & Compliance</h3>
                  <h2>Security <span style={{ color: 'var(--accent)' }}>Officer</span>.</h2>
                </header>
                <p className="project-intro">
                  Informatiebeveiliging is meer dan alleen een certificaat aan de muur. Ik richt me op
                  werkbare security: van ISO 27001 implementaties tot impact-analyses van de Cyber
                  Resilience Act.
                </p>
                <div className="project-actions">
                  <motion.div
                    whileHover={reduced ? {} : { scale: 1.02 }}
                    whileTap={reduced ? {} : { scale: 0.97 }}
                    transition={{ duration: 0.15 }}
                    style={{ display: 'inline-block' }}
                  >
                    <Link to="/security" className="btn-primary" aria-label="Bekijk security expertise">
                      Bekijk expertise
                    </Link>
                  </motion.div>
                </div>
              </motion.div>

              <motion.div
                className="case-study-visual"
                initial={hi}
                whileInView={vp}
                viewport={viewportOnce}
                transition={reduced ? { duration: 0 } : { duration: 0.35, ease: 'easeOut', delay: 0.1 }}
              >
                <img
                  src="/assets/expertise/security.webp"
                  alt="Cybersecurity en data encryptie concept"
                  className="expertise-image"
                />
              </motion.div>
            </article>
          </div>
        </section>

        {/* 02 — Web */}
        <section className="expertise-section">
          <div className="container" style={{ padding: 'clamp(60px,8vh,100px) clamp(16px,4vw,48px)' }}>
            <article className="case-study-grid" style={{ direction: 'rtl' }}>
              <motion.div
                className="case-study-content"
                style={{ direction: 'ltr' }}
                initial={hi}
                whileInView={vp}
                viewport={viewportOnce}
                transition={reduced ? { duration: 0 } : { duration: 0.35, ease: 'easeOut' }}
              >
                <header>
                  <h3>02 — Design & Development</h3>
                  <h2>Websites & <span style={{ color: 'var(--accent)' }}>Code</span>.</h2>
                </header>
                <p className="project-intro">
                  Ik help bedrijven met het opschonen van hun digitale aanwezigheid. Geen zware thema's,
                  maar snelle, schone code en een design dat werkt op elk scherm.
                </p>
                <div className="project-actions">
                  <motion.div
                    whileHover={reduced ? {} : { scale: 1.02 }}
                    whileTap={reduced ? {} : { scale: 0.97 }}
                    transition={{ duration: 0.15 }}
                    style={{ display: 'inline-block' }}
                  >
                    <Link to="/web" className="btn-primary" aria-label="Bekijk webdesign portfolio">
                      Bekijk mijn werk
                    </Link>
                  </motion.div>
                </div>
              </motion.div>

              <motion.div
                className="case-study-visual"
                style={{ direction: 'ltr' }}
                initial={hi}
                whileInView={vp}
                viewport={viewportOnce}
                transition={reduced ? { duration: 0 } : { duration: 0.35, ease: 'easeOut', delay: 0.1 }}
              >
                <img
                  src="/assets/expertise/web.webp"
                  alt="Modern web development en clean code"
                  className="expertise-image"
                />
              </motion.div>
            </article>
          </div>
        </section>

        {/* 03 — Labs */}
        <section className="expertise-section">
          <div className="container" style={{ padding: 'clamp(60px,8vh,100px) clamp(16px,4vw,48px)' }}>
            <article className="case-study-grid">
              <motion.div
                className="case-study-content"
                initial={hi}
                whileInView={vp}
                viewport={viewportOnce}
                transition={reduced ? { duration: 0 } : { duration: 0.35, ease: 'easeOut' }}
              >
                <header>
                  <h3>03 — Labs & Research</h3>
                  <h2>Labs & <span style={{ color: 'var(--accent)' }}>Onderzoek</span>.</h2>
                </header>
                <p className="project-intro">
                  Mijn speeltuin voor data. Hier onderzoek ik systematische trading-strategieën, bouw ik
                  modellen voor opties en test ik nieuwe technologieën.
                </p>
                <div className="project-actions">
                  <motion.div
                    whileHover={reduced ? {} : { scale: 1.02 }}
                    whileTap={reduced ? {} : { scale: 0.97 }}
                    transition={{ duration: 0.15 }}
                    style={{ display: 'inline-block' }}
                  >
                    <Link to="/labs" className="btn-primary" aria-label="Bekijk trading studies">
                      Bekijk de labs
                    </Link>
                  </motion.div>
                </div>
              </motion.div>

              <motion.div
                className="case-study-visual"
                initial={hi}
                whileInView={vp}
                viewport={viewportOnce}
                transition={reduced ? { duration: 0 } : { duration: 0.35, ease: 'easeOut', delay: 0.1 }}
              >
                <img
                  src="/assets/expertise/labs.webp"
                  alt="Technical analysis trading charts"
                  className="expertise-image"
                />
              </motion.div>
            </article>
          </div>
        </section>
      </main>

      {/* ── CTA ── */}
      <motion.section
        className="cta-section"
        initial={hi}
        whileInView={vp}
        viewport={viewportOnce}
        transition={reduced ? { duration: 0 } : { duration: 0.35, ease: 'easeOut' }}
      >
        <div className="container">
          <h2>Meer weten over mijn <span style={{ color: 'var(--accent)' }}>werk</span>?</h2>
          <p>Ik vertel je graag meer over de achtergrond van deze projecten. Contact opnemen kan uitsluitend via LinkedIn.</p>
          <motion.a
            href="https://www.linkedin.com/in/bartpullen/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-large linkedin-btn"
            whileHover={reduced ? {} : { scale: 1.03 }}
            whileTap={reduced ? {} : { scale: 0.97 }}
            transition={{ duration: 0.15 }}
          >
            <LinkedInIcon />
            <span>Connect op LinkedIn</span>
          </motion.a>
        </div>
      </motion.section>
    </>
  );
});
```

- [ ] **Step 2: Verify build**

```bash
cd "C:/Users/Bart/Desktop/portfolio" && npm run build
```

Expected: zero errors.

- [ ] **Step 3: Commit**

```bash
git add src/pages/Home.tsx
git commit -m "feat: brutalist hero with word-stagger spring animation"
```

---

## Task 8: Final Build Verification

- [ ] **Step 1: Full clean build**

```bash
cd "C:/Users/Bart/Desktop/portfolio" && npm run build
```

Expected output:
```
✓ built in X.Xs
```
Zero TypeScript errors. Bundle size warning about Plotly is pre-existing — not a concern.

- [ ] **Step 2: Final commit**

```bash
git add -A
git commit -m "feat: complete brutalist portfolio redesign — Space Grotesk/Mono, electric blue, ink borders"
```

---

## Quality Checklist (verify before closing)

- [ ] No animation uses `width`, `height`, `top`, or `left`
- [ ] `useReducedMotion` guard on every animated component
- [ ] Word stagger uses spring physics (not ease curve)
- [ ] Nav dark bar visible on all pages
- [ ] CTA section has inverted (white-on-black) buttons
- [ ] Footer is black with blue top border
- [ ] Project tags have square (no border-radius) border
- [ ] Case study visuals show ink offset shadow on hover
- [ ] Scroll progress bar visible on scroll
- [ ] Page transition has directional x slide
