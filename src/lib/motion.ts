export const viewportOnce = { once: true, margin: '-80px' } as const;

export const easeOut = { duration: 0.35, ease: 'easeOut' as const };
export const fast   = { duration: 0.18, ease: 'easeOut' as const };
export const spring = { type: 'spring' as const, stiffness: 380, damping: 30 };

export const delayed = (delay: number) => ({ ...easeOut, delay });
