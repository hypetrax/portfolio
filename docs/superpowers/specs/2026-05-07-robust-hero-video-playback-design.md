# Design Spec: Robust Hero Video Playback

**Date:** 2026-05-07
**Topic:** Fixing broken hero videos across all pages.

## 1. Problem Statement
Hero videos are currently failing to play, resulting in a blank hero area on pages without a static poster and a static image on the home page. The current `DeferredHeroVideo` component relies on the `autoPlay` attribute and the `onLoadedData` event, which are proving unreliable during route transitions and across different browser configurations.

## 2. Proposed Solution (Approach 1: Robust Playback)
Refactor the `DeferredHeroVideo` component to use explicit video control via React refs and a more resilient event lifecycle.

### Key Changes:
- **Explicit Playback:** Use `useRef` to target the `<video>` element and call `.play()` within a `useEffect`. This ensures the browser attempts to start playback as soon as the component is mounted.
- **Improved Readiness Detection:** Switch from `onLoadedData` to `onCanPlay`. This event is more consistently fired when enough data is available to begin playback.
- **Fallback Resilience:** Ensure that if `allowVideo` is false or the video fails, the hero area remains visually consistent (using the poster if available, or a graceful background).
- **CSS Transition:** Refine the `hero-poster-hidden` class to ensure a smooth cross-fade between the poster/first-frame and the playing video.

## 3. Implementation Details

### Component Logic (`DeferredHeroVideo.tsx`)
- Add `videoRef = useRef<HTMLVideoElement>(null)`.
- Use `useEffect` to trigger `videoRef.current?.play()` and handle potential playback rejections (e.g., browser-blocked autoplay).
- Maintain `videoReady` state to control the visibility of the poster vs. the video.

### Styles (`App.css`)
- Ensure `.video-background` has a stable height and background color to avoid "layout shift" or "white flash".
- Improve the `opacity` transition for `.hero-poster-hidden`.

## 4. Verification Plan
- **Local Testing:** Navigate between Home, Security, Web, and Labs pages to verify video starts automatically.
- **Motion Settings:** Verify that videos do NOT play when "Reduced Motion" is enabled in the OS.
- **Asset Check:** Verify that all video paths (`/assets/security.mp4`, etc.) resolve correctly.
