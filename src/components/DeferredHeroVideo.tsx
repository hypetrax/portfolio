import { memo } from 'react';

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
  return (
    <div className="video-background" aria-hidden="true">
      <video
        autoPlay
        loop
        muted
        playsInline
        poster={poster}
        preload="auto"
        className="hero-video-element"
      >
        {mobileSrc && <source src={mobileSrc} type="video/mp4" media="(max-width: 720px)" />}
        <source src={src} type="video/mp4" />
      </video>
      <div className="video-overlay"></div>
    </div>
  );
});
