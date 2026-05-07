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
    const handlePreferenceChange = () => {
      const connection = (navigator as Navigator & {
        connection?: { saveData?: boolean };
      }).connection;
      setAllowVideo(!(mediaQuery.matches || connection?.saveData));
    };

    mediaQuery.addEventListener('change', handlePreferenceChange);
    handlePreferenceChange();

    return () => mediaQuery.removeEventListener('change', handlePreferenceChange);
  }, []);

  useEffect(() => {
    if (allowVideo && videoRef.current) {
      videoRef.current.play().catch(err => {
        // Ignore NotAllowedError as it's common browser behavior
        if (err.name !== 'NotAllowedError') {
          console.warn("Autoplay blocked or failed:", err);
        }
      });
    }
  }, [allowVideo]);

  return (
    <div className="video-background" aria-hidden="true">
      {poster && (
        <picture className={videoReady ? 'hero-poster-hidden' : ''}>
          {posterWebp && <source srcSet={posterWebp} type="image/webp" />}
          <img 
            src={poster} 
            alt="" 
            className="hero-poster" 
            width="1920" 
            height="1080" 
            decoding="async"
            // @ts-expect-error - fetchpriority is not yet in @types/react but supported by browsers
            fetchpriority="high"
          />
        </picture>
      )}
      {allowVideo && (
        <video
          ref={videoRef}
          loop
          muted
          playsInline
          preload="auto"
          width="1920"
          height="1080"
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
