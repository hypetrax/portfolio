import { useState, useRef, useEffect, useCallback, memo } from 'react';

export const LiveSlider = memo(function LiveSlider({ before, after }: { before?: string, after: string }) {
  const [sliderPos, setSliderPos] = useState(50);
  const [scale, setScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    const updateScale = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        setScale(width / 1440);
      }
    };
    const debouncedUpdate = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateScale, 100);
    };

    updateScale();
    window.addEventListener('resize', debouncedUpdate);
    return () => {
      window.removeEventListener('resize', debouncedUpdate);
      clearTimeout(timeoutId);
    };
  }, []);

  const handleMove = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const position = ((x - rect.left) / rect.width) * 100;
    setSliderPos(Math.max(0, Math.min(100, position)));
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') setSliderPos(p => Math.max(0, p - 5));
    if (e.key === 'ArrowRight') setSliderPos(p => Math.min(100, p + 5));
  }, []);

  return (
    <div
      className="live-slider-container"
      ref={containerRef}
      onMouseMove={handleMove}
      onTouchMove={handleMove}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="slider"
      aria-label="Voor/na vergelijking slider"
      aria-valuenow={Math.round(sliderPos)}
      aria-valuemin={0}
      aria-valuemax={100}
      style={{ cursor: before ? 'ew-resize' : 'default' }}
    >
      <div className="live-frame after-frame">
        <iframe
          src={after}
          title="Nieuwe website"
          style={{ transform: `scale(${scale})` }}
        />
        {before && <div className="label after">Nieuw (Live)</div>}
      </div>

      {before && (
        <div
          className="live-frame before-frame"
          style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
        >
          <iframe
            src={before}
            title="Oude website"
            style={{ transform: `scale(${scale})` }}
          />
          <div className="label before">Oud (Archief)</div>
        </div>
      )}

      {before && (
        <div className="slider-handle" style={{ left: `${sliderPos}%` }}>
          <div className="handle-circle">
            <span>&#8592;</span>
            <span>&#8594;</span>
          </div>
        </div>
      )}

      <div className="slider-overlay"></div>
    </div>
  );
});
