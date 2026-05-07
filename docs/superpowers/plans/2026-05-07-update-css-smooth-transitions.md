# Update CSS for Smooth Transitions Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ensure background stability and smooth cross-fade between the poster and the video in `src/App.css`.

**Architecture:** Update CSS classes related to video background and hero poster to include stability fixes (background color) and transition improvements (opacity and visibility).

**Tech Stack:** CSS

---

### Task 1: Verify and Commit CSS Changes

**Files:**
- Modify: `src/App.css`

- [ ] **Step 1: Verify `src/App.css` content**

Ensure lines 151-190 match:
```css
.video-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  overflow: hidden;
  background: var(--bg-color); /* Added to prevent flash */
}

.video-background video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 1;
}

.video-background picture,
.hero-poster {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 1; /* Ensure poster is above video initially */
}

.hero-poster {
  object-fit: cover;
}

.hero-poster-hidden {
  opacity: 0;
  visibility: hidden; /* Ensure it doesn't block interactions if any */
  transition: opacity 0.5s ease-out, visibility 0.5s;
}
```

- [ ] **Step 2: Commit the changes**

Run:
```bash
git add src/App.css
git commit -m "style: improve hero video transitions and background stability"
```

- [ ] **Step 3: Verify commit**

Run: `git status`
Expected: `src/App.css` is no longer in "Changes not staged for commit".
