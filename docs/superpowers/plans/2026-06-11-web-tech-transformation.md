# Web Tech Transformation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a right-column technical transformation block below each before/after slider on the `/web` page.

**Architecture:** Extend the existing `Project` data in `src/pages/Web.tsx` with a `techTransformation` object. Render it directly below `LiveSlider` so the technical context belongs to the visual before/after comparison. Style the block in `src/App.css` as a compact two-column audit note that stacks on small screens.

**Tech Stack:** React, TypeScript, Vite, CSS.

---

### Task 1: Add Transformation Data And Markup

**Files:**
- Modify: `src/pages/Web.tsx`

- [ ] **Step 1: Extend the `Project` interface**

Add this property:

```ts
  techTransformation: {
    before: {
      title: string;
      text: string;
      tags: string[];
    };
    after: {
      title: string;
      text: string;
      tags: string[];
    };
  };
```

- [ ] **Step 2: Fill each project**

Use the archived-source research:

Badminton before: Wix CMS, Wix Thunderbolt, static Wix/Parastorage assets.
Badminton after: React, Vite, Vercel, static SEO, JSON-LD, analytics.

Landhuis before: no website, Google result/Maps/reviews.
Landhuis after: React, Vite, Vercel, service landing site, local SEO metadata.

Fluitman before: WordPress, Avada/Fusion Builder, Yoast, MonsterInsights, jQuery/theme/plugin scripts.
Fluitman after: React, Vite, Vercel, lighter frontend, analytics retained.

- [ ] **Step 3: Render below the slider**

Inside `.case-study-visual`, render:

```tsx
                  <div className="case-study-visual">
                    <LiveSlider before={project.sliderBeforeUrl} after={project.newUrl} />
                    <div className="tech-transform">
                      <h3>Technische transformatie</h3>
                      <div className="tech-transform-grid">
                        <div>
                          <span className="tech-transform-label">Voorheen</span>
                          <strong>{project.techTransformation.before.title}</strong>
                          <p>{project.techTransformation.before.text}</p>
                          <div className="tech-tags">
                            {project.techTransformation.before.tags.map((tag) => (
                              <span key={tag}>{tag}</span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <span className="tech-transform-label">Nu</span>
                          <strong>{project.techTransformation.after.title}</strong>
                          <p>{project.techTransformation.after.text}</p>
                          <div className="tech-tags">
                            {project.techTransformation.after.tags.map((tag) => (
                              <span key={tag}>{tag}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
```

### Task 2: Style The Technical Block

**Files:**
- Modify: `src/App.css`

- [ ] **Step 1: Let `.case-study-visual` contain stacked content**

Change `.case-study-visual` so it no longer clips content under the slider. Keep the slider itself framed by its existing `.live-slider-container`.

- [ ] **Step 2: Add `.tech-transform` styles**

Add a compact card-like note with border, surface background, and two columns for before/after. On mobile, stack the two columns and keep chips wrapping.

### Task 3: Verify

**Files:**
- No source edits expected.

- [ ] **Step 1: Run `npm run lint`**

Expected: exit code 0.

- [ ] **Step 2: Run `npm run build`**

Expected: exit code 0.

- [ ] **Step 3: Render-check `http://localhost:3008/web`**

Expected: three `tech-transform` blocks visible, old/new labels readable, no framework overlay.
