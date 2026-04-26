# Digital Garden Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the homepage from a formal case-study layout into a personal "Digital Garden" featuring a direct greeting, an active "Now" spotlight, and a chronological stream of all projects/notes.

**Architecture:** We will replace the entire `main` content of `src/pages/Home.tsx` and the `hero-header` with the new design. We will define the data structures directly in the component file and map over them, utilizing the existing Framer Motion variants defined in `src/lib/motion.ts`.

**Tech Stack:** React 19, React Router, Framer Motion, Vite, CSS (Brutalist theme).

---

### Task 1: Replace Hero Section

**Files:**
- Modify: `src/pages/Home.tsx`

- [ ] **Step 1: Replace the Hero content**
  Replace the existing `<header className="hero-header">` (which contains the video background and old marketing text) with the new typography-focused personal greeting.

  ```tsx
  <header className="hero-header" style={{ minHeight: 'auto', padding: '120px 0 80px' }}>
    <div className="container">
      <motion.p className="overline" initial={hi} animate={vp} transition={t(0.1)}>
        Bart Pullen — Digital Garden
      </motion.p>
      <motion.h1 initial={hi} animate={vp} transition={t(0.2)}>
        Hi, I'm Bart. I'm an <span style={{ color: 'var(--accent)' }}>Information Security Officer</span>, I build clean <span style={{ color: 'var(--accent)' }}>websites</span>, and I analyze <span style={{ color: 'var(--accent)' }}>data</span>.
      </motion.h1>
      <motion.p className="lead" initial={hi} animate={vp} transition={t(0.32)}>
        This is my digital garden where I share what I'm actively working on. No corporate speak, just a timeline of experiments, code, and security analyses.
      </motion.h1>
    </div>
  </header>
  ```

- [ ] **Step 2: Remove unused state**
  Remove `const [videoStarted, setVideoStarted] = useState(false);` from `Home.tsx` as the video is no longer used.

- [ ] **Step 3: Verify Compilation**
  Run: `npm run build`
  Expected: PASS. The application should build successfully without type errors.

- [ ] **Step 4: Commit**
  ```bash
  git add src/pages/Home.tsx
  git commit -m "feat(home): replace hero video with personal digital garden greeting"
  ```

### Task 2: Implement "Currently Exploring" Spotlight

**Files:**
- Modify: `src/pages/Home.tsx`

- [ ] **Step 1: Define Spotlight Data & Component Structure**
  Add the new spotlight section immediately inside the `<main>` tag, replacing the old `01 — Security` section. We will use the existing `tagContainer` and `tagItem` from `lib/motion.ts` (or standard `vp`/`hi` if imported).
  *Note: Assuming `tagContainer` and `tagItem` are imported from `../lib/motion` based on previous refactor logs.*

  ```tsx
  // Add this to imports if missing:
  // import { tagContainer, tagItem } from '../lib/motion';

  <main>
    <section className="expertise-section spotlight-section" style={{ paddingBottom: '40px' }}>
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={typeof tagContainer !== 'undefined' ? tagContainer : {}}
        >
          <motion.div variants={typeof tagItem !== 'undefined' ? tagItem : { hi, vp }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--accent)', display: 'inline-block' }}></span>
              Currently Exploring
            </h2>
          </motion.div>
          
          <motion.article 
            className="case-study-grid" 
            variants={typeof tagItem !== 'undefined' ? tagItem : { hi, vp }}
            style={{ border: '1px solid var(--border-color, #e5e5e5)', padding: '32px', borderRadius: '8px', background: 'var(--bg-color)' }}
          >
            <div className="case-study-content" style={{ padding: 0 }}>
               <header>
                 <span className="overline" style={{ color: 'var(--accent)', marginBottom: '8px', display: 'block' }}>Status: Active Research</span>
                 <h3 style={{ fontSize: '2rem', margin: '0 0 16px 0' }}>Turtle Soup Strategy Model</h3>
               </header>
               <p className="project-intro" style={{ marginBottom: '24px' }}>
                 Building a systematic trading model based on false breakouts. Analyzing historical SPX data to identify profitable entries when support/resistance levels are swept.
               </p>
               <div className="project-actions">
                 <Link to="/labs/turtlesoup" className="btn-primary" aria-label="View Turtle Soup Lab">
                   View Lab Notes
                 </Link>
               </div>
            </div>
          </motion.article>
        </motion.div>
      </div>
    </section>
  ```

- [ ] **Step 2: Verify Compilation**
  Run: `npm run build`
  Expected: PASS.

- [ ] **Step 3: Commit**
  ```bash
  git add src/pages/Home.tsx
  git commit -m "feat(home): add Currently Exploring spotlight section"
  ```

### Task 3: Implement "Recent Notes & Projects" Stream

**Files:**
- Modify: `src/pages/Home.tsx`
- Modify: `src/App.css` (if needed for list styling)

- [ ] **Step 1: Define Stream Data Array**
  Inside the `Home` component (before the `return`), define the array of recent work.

  ```tsx
  const recentNotes = [
    { id: 1, date: "Apr 2026", title: "Cyber Resilience Act Impact", category: "Security", link: "/security/cra", desc: "Analysis of the new CRA requirements for software supply chains." },
    { id: 2, date: "Mar 2026", title: "0DTE SPX Volatility Research", category: "Labs", link: "/labs/spx", desc: "Exploring intraday volatility patterns in S&P 500 options." },
    { id: 3, date: "Feb 2026", title: "ISO 27001 Implementation Framework", category: "Security", link: "/security/iso27001", desc: "A practical guide to structuring an ISMS." },
    { id: 4, date: "Jan 2026", title: "Modern Web Design Portfolio", category: "Web", link: "/web", desc: "Building fast, clean, and accessible web experiences." }
  ];
  ```

- [ ] **Step 2: Replace remaining main content with the Stream**
  Replace the old `02 — Web` and `03 — Labs` sections with the new chronological stream using `staggerContainer` and `fadeUpItem` (or map over the data with standard variants).

  ```tsx
  {/* Add this below the Spotlight section inside <main> */}
  <section className="expertise-section stream-section">
    <div className="container">
      <motion.h2 
        initial={hi} 
        whileInView={vp} 
        viewport={viewportOnce}
        style={{ fontSize: '1.5rem', marginBottom: '32px', borderBottom: '1px solid var(--border-color, #e5e5e5)', paddingBottom: '16px' }}
      >
        Recent Notes & Projects
      </motion.h2>

      <div className="stream-list" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {recentNotes.map((note, index) => (
          <motion.div
            key={note.id}
            initial={hi}
            whileInView={vp}
            viewport={viewportOnce}
            transition={{ ...t(0.1 * index), duration: 0.35, ease: 'easeOut' }}
            style={{ 
              display: 'grid', 
              gridTemplateColumns: '120px 1fr auto', 
              gap: '24px', 
              alignItems: 'start',
              padding: '24px',
              border: '1px solid var(--border-color, #e5e5e5)',
              borderRadius: '8px',
              transition: 'border-color 0.2s ease'
            }}
            className="stream-item hover-border-accent"
          >
            <div className="stream-meta" style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              <span style={{ display: 'block', marginBottom: '4px' }}>{note.date}</span>
              <span style={{ 
                display: 'inline-block', 
                padding: '2px 8px', 
                backgroundColor: 'rgba(0, 102, 255, 0.1)', 
                color: 'var(--accent)', 
                borderRadius: '4px',
                fontSize: '0.75rem',
                fontWeight: 'bold'
              }}>{note.category}</span>
            </div>
            <div className="stream-content">
              <h3 style={{ fontSize: '1.25rem', margin: '0 0 8px 0' }}>
                <Link to={note.link} style={{ color: 'inherit', textDecoration: 'none' }} className="hover-text-accent">
                  {note.title}
                </Link>
              </h3>
              <p style={{ margin: 0, color: 'var(--text-secondary)' }}>{note.desc}</p>
            </div>
            <div className="stream-action">
              <Link to={note.link} style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 'bold' }}>
                Read →
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
  ```

- [ ] **Step 3: Add CSS Helper Classes (if needed)**
  Add a few quick utility classes to `src/App.css` to handle hover states for the stream items, so they feel interactive.

  ```css
  /* Add to src/App.css */
  .hover-border-accent:hover {
    border-color: var(--accent) !important;
  }
  .hover-border-accent:hover .hover-text-accent {
    color: var(--accent) !important;
  }
  ```

- [ ] **Step 4: Verify Compilation**
  Run: `npm run build`
  Expected: PASS.

- [ ] **Step 5: Commit**
  ```bash
  git add src/pages/Home.tsx src/App.css
  git commit -m "feat(home): replace silos with chronological stream of recent notes"
  ```
