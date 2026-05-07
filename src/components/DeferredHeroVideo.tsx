import { memo } from 'react';

interface DeferredHeroVideoProps {
  src: string;
  mobileSrc?: string;
  poster?: string;
}

export const DeferredHeroVideo = memo(function DeferredHeroVideo({
  src,
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
        src={src}
      />
      <div className="video-overlay"></div>
    </div>
  );
});
