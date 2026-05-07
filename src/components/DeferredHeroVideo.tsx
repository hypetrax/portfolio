import { memo, useEffect, useRef } from 'react';

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
}: DeferredHeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Explicitly try to play in case autoPlay is blocked
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Silently fail as browsers might block non-user-triggered play
      });
    }
  }, [src, mobileSrc]);

  return (
    <div className="video-background" aria-hidden="true">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        poster={poster}
        preload="auto"
        width="1920"
        height="1080"
        key={src} // Force re-mount on src change to ensure fresh playback
      >
        {mobileSrc && <source src={mobileSrc} type="video/mp4" media="(max-width: 720px)" />}
        <source src={src} type="video/mp4" />
      </video>
      <div className="video-overlay"></div>
    </div>
  );
});
