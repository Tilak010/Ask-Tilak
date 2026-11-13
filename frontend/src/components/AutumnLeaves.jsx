import React, { useState, useEffect } from 'react';
import { FallingLeaves } from 'falling-leaves/react';

const LEAVES_PREF_KEY = 'ask_tilak_falling_leaves_enabled';

/**
 * Autumn falling leaves background effect.
 * Uses the `falling-leaves` npm package (canvas-based, pointer-events: none).
 * Respects prefers-reduced-motion automatically.
 * Provides enable/disable control via localStorage.
 */
export const AutumnLeaves = ({ theme }) => {
  const [enabled, setEnabled] = useState(() => {
    try {
      const saved = localStorage.getItem(LEAVES_PREF_KEY);
      if (saved === 'false') return false;
    } catch (e) {}
    return true;
  });

  // Persist preference
  useEffect(() => {
    try {
      localStorage.setItem(LEAVES_PREF_KEY, String(enabled));
    } catch (e) {}
  }, [enabled]);

  // Determine leaf count based on screen width (responsive)
  const [leafCount, setLeafCount] = useState(() => getLeafCount());

  useEffect(() => {
    const handleResize = () => setLeafCount(getLeafCount());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!enabled) return null;

  // Autumn colors that work in both themes
  const autumnColors = theme === 'dark'
    ? ['#D97745', '#C66B35', '#E9AD55', '#B85C30', '#A0704A', '#C8923E', '#8B5E3C', '#D4A054']
    : ['#B4532A', '#C66B35', '#E9A23B', '#A04520', '#8B6340', '#C4882E', '#9E5C38', '#D9943A'];

  return (
    <FallingLeaves
      fullScreen
      count={leafCount}
      shapes={['maple', 'oak', 'ginkgo', 'birch']}
      colors={autumnColors}
      size={[12, 26]}
      speed={[0.4, 1.2]}
      wind={[-0.2, 0.6]}
      sway={[0.3, 1.0]}
      rotationSpeed={[-1.2, 1.2]}
      opacity={theme === 'dark' ? 0.5 : 0.6}
      zIndex={5}
      respectReducedMotion={true}
    />
  );
};

/** Toggle button for seasonal effect control */
export const LeavesToggle = ({ className = '' }) => {
  const [enabled, setEnabled] = useState(() => {
    try {
      const saved = localStorage.getItem(LEAVES_PREF_KEY);
      if (saved === 'false') return false;
    } catch (e) {}
    return true;
  });

  const handleToggle = () => {
    const next = !enabled;
    setEnabled(next);
    try {
      localStorage.setItem(LEAVES_PREF_KEY, String(next));
    } catch (e) {}
    // Force re-render of AutumnLeaves by dispatching a storage event
    window.dispatchEvent(new Event('leaves-toggle'));
  };

  return (
    <button
      onClick={handleToggle}
      className={`inline-flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-[11px] font-medium transition-colors cursor-pointer select-none ${
        enabled
          ? 'text-[#B4532A] dark:text-[#E9AD55] hover:bg-[#F5EBDD] dark:hover:bg-[#2D231D]'
          : 'text-[#796557] dark:text-[#D3BEAA] hover:bg-[#F5EBDD] dark:hover:bg-[#2D231D]'
      } ${className}`}
      title={enabled ? 'Disable falling leaves' : 'Enable falling leaves'}
      aria-label={enabled ? 'Disable falling leaves animation' : 'Enable falling leaves animation'}
    >
      <span className="text-sm">{enabled ? '🍂' : '🍁'}</span>
      <span className="hidden sm:inline">{enabled ? 'Leaves On' : 'Leaves Off'}</span>
    </button>
  );
};

function getLeafCount() {
  if (typeof window === 'undefined') return 20;
  const w = window.innerWidth;
  if (w <= 375) return 8;
  if (w <= 414) return 10;
  if (w <= 768) return 14;
  if (w <= 1024) return 20;
  return 28;
}

/**
 * Hook to sync leaves enabled state across components via storage events.
 */
export const useLeavesEnabled = () => {
  const [enabled, setEnabled] = useState(() => {
    try {
      const saved = localStorage.getItem(LEAVES_PREF_KEY);
      if (saved === 'false') return false;
    } catch (e) {}
    return true;
  });

  useEffect(() => {
    const sync = () => {
      try {
        const saved = localStorage.getItem(LEAVES_PREF_KEY);
        setEnabled(saved !== 'false');
      } catch (e) {}
    };
    window.addEventListener('leaves-toggle', sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener('leaves-toggle', sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  return enabled;
};

export default AutumnLeaves;

