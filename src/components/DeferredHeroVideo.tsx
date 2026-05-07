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
