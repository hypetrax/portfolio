# Robust Hero Video Playback Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix the broken hero videos by refactoring the `DeferredHeroVideo` component to use explicit playback control and more reliable event detection.

**Architecture:** Use `useRef` to explicitly call `video.play()` and `onCanPlay` for reliable state updates. Improve CSS transitions between the poster and video.

**Tech Stack:** React, TypeScript, CSS.

---

### Task 1: Refactor DeferredHeroVideo Component

**Files:**
- Modify: `src/components/DeferredHeroVideo.tsx`

- [ ] **Step 1: Update component to use refs and explicit play control**

Replace the contents of `src/components/DeferredHeroVideo.tsx` with the following:

```tsx
import { memo, useEffect, useState, useRef } from 'react';

interface DeferredHeroVideoProps {
  src: string;
  mobileSrc?: string;
  poster?: string;
  posterWebp?: string;
}

export const DeferredHeroVideo = memo(function DeferredHeroVideo({
  src,
  mobileSrc,
  poster,
  posterWebp,
}: DeferredHeroVideoProps) {
  const [videoReady, setVideoReady] = useState(false);
  const [allowVideo, setAllowVideo] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const connection = (navigator as Navigator & {
      connection?: { saveData?: boolean };
    }).connection;

    const shouldAllow = !(mediaQuery.matches || connection?.saveData);
    setAllowVideo(shouldAllow);

    if (shouldAllow && videoRef.current) {
      videoRef.current.play().catch(err => {
        console.warn("Autoplay blocked or failed:", err);
      });
    }
  }, []);

  return (
    <div className="video-background" aria-hidden="true">
      {poster && (
        <picture className={videoReady ? 'hero-poster-hidden' : ''}>
          {posterWebp && <source srcSet={posterWebp} type="image/webp" />}
          <img src={poster} alt="" className="hero-poster" width="1920" height="1080" decoding="async" />
        </picture>
      )}
      {allowVideo && (
        <video
          ref={videoRef}
          loop
          muted
          playsInline
          preload="auto"
          onCanPlay={() => setVideoReady(true)}
        >
          {mobileSrc && <source src={mobileSrc} type="video/mp4" media="(max-width: 720px)" />}
          <source src={src} type="video/mp4" />
        </video>
      )}
      <div className="video-overlay"></div>
    </div>
  );
});
```

- [ ] **Step 2: Commit changes**

```bash
git add src/components/DeferredHeroVideo.tsx
git commit -m "refactor: use explicit playback and onCanPlay for hero videos"
```

---

### Task 2: Update CSS for Smooth Transitions

**Files:**
- Modify: `src/App.css`

- [ ] **Step 1: Ensure background stability and smooth cross-fade**

Update the video-related styles in `src/App.css`:

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

- [ ] **Step 2: Commit changes**

```bash
git add src/App.css
git commit -m "style: improve hero video transitions and background stability"
```

---

### Task 3: Verification

- [ ] **Step 1: Run build to check for errors**

Run: `npm run build`
Expected: Build passes without errors.

- [ ] **Step 2: Manual verification (User action required)**
Verify that videos play on Home, Security, Web, and Labs pages.
Verify that the poster fades out once the video starts.
