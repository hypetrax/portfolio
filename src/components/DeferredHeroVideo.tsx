import { memo, useEffect, useState } from 'react';

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
  const [loadVideo, setLoadVideo] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const connection = (navigator as Navigator & {
      connection?: { saveData?: boolean };
    }).connection;

    if (mediaQuery.matches || connection?.saveData) return;

    const startLoading = () => setLoadVideo(true);
    const idleCallback = window.requestIdleCallback?.(startLoading, { timeout: 2500 });
    const fallback = window.setTimeout(startLoading, 2500);

    return () => {
      if (idleCallback) window.cancelIdleCallback?.(idleCallback);
      window.clearTimeout(fallback);
    };
  }, []);

  return (
    <div className="video-background" aria-hidden="true">
      {poster && (
        <picture>
          {posterWebp && <source srcSet={posterWebp} type="image/webp" />}
          <img src={poster} alt="" className="hero-poster" width="1920" height="1080" decoding="async" />
        </picture>
      )}
      {loadVideo && (
        <video autoPlay loop muted playsInline preload="metadata">
          {mobileSrc && <source src={mobileSrc} type="video/mp4" media="(max-width: 720px)" />}
          <source src={src} type="video/mp4" />
        </video>
      )}
      <div className="video-overlay"></div>
    </div>
  );
});
