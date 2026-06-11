# Web Process Case Copy Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a per-case process block to the `/web` portfolio page that explains Bart's website-building method in concrete, non-technical actions.

**Architecture:** Extend the local `Project` data model in `src/pages/Web.tsx` with process steps and render them inside each case study. Add scoped CSS in `src/App.css` for a compact responsive step list that fits the existing editorial visual language.

**Tech Stack:** Vite, React, TypeScript, Framer Motion, CSS.

---

### Task 1: Add Process Data And Markup

**Files:**
- Modify: `src/pages/Web.tsx`

- [ ] **Step 1: Extend the `Project` interface**

Add this property to the interface:

```ts
  process: {
    label: string;
    text: string;
  }[];
```

- [ ] **Step 2: Add four process steps to each project**

Add `process` arrays for Badminton Hardenberg, Landhuis, and Fluitman Auto's. Keep the text concise and focused on actions: startpunt, structuur, ontwerp en bouw, validatie.

- [ ] **Step 3: Render the process block**

Place this block after `.case-details` and before `.results-block`:

```tsx
                  <div className="process-block">
                    <h3>Van uitgangspunt naar realisatie</h3>
                    <ol>
                      {project.process.map((step) => (
                        <li key={step.label}>
                          <strong>{step.label}</strong>
                          <span>{step.text}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
```

### Task 2: Style The Process Block

**Files:**
- Modify: `src/App.css`

- [ ] **Step 1: Add scoped styles near the case-study styles**

Add styles for `.process-block`, `.process-block ol`, `.process-block li`, `.process-block strong`, and `.process-block span`. Use the existing border, surface, accent, mono, and muted variables.

- [ ] **Step 2: Add responsive behavior**

On small screens, make the ordered list one column and keep text readable without horizontal overflow.

### Task 3: Verify

**Files:**
- No source edits expected.

- [ ] **Step 1: Run lint**

Run: `npm run lint`
Expected: command exits with code 0.

- [ ] **Step 2: Run build**

Run: `npm run build`
Expected: TypeScript build and Vite production build complete successfully.
