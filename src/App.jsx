import React, { useState, useEffect, useRef } from 'react';

const BANNER1_URL = "/banner1.jpeg";
const BANNER2_URL = "/banner2.jpeg";
const SCROLL_DISTANCE = 600;

const App = () => {
  const [revealProgress, setRevealProgress] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false);
  const scrollAcc = useRef(0);
  const touchStartY = useRef(0);

  useEffect(() => {
    const onMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setIsMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onWheel = (e) => {
      e.preventDefault();
      if (scrollAcc.current >= SCROLL_DISTANCE) return;
      scrollAcc.current = Math.max(0, Math.min(SCROLL_DISTANCE, scrollAcc.current + e.deltaY));
      setRevealProgress(scrollAcc.current / SCROLL_DISTANCE);
    };
    const onTouchStart = (e) => {
      touchStartY.current = e.touches[0].clientY;
    };
    const onTouchMove = (e) => {
      e.preventDefault();
      if (scrollAcc.current >= SCROLL_DISTANCE) return;
      const delta = touchStartY.current - e.touches[0].clientY;
      touchStartY.current = e.touches[0].clientY;
      scrollAcc.current = Math.max(0, Math.min(SCROLL_DISTANCE, scrollAcc.current + delta));
      setRevealProgress(scrollAcc.current / SCROLL_DISTANCE);
    };
    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
    };
  }, []);

  const isFullyRevealed = revealProgress >= 1;

  return (
    <div
      className="relative w-screen h-screen overflow-hidden select-none cursor-none"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Logo — top left */}
      <div className="absolute top-6 left-6 sm:top-10 sm:left-12 md:top-12 md:left-24 z-20 pointer-events-none">
        <img src="/logo.svg" alt="Logo" className="h-7 sm:h-9 md:h-10 w-auto" />
      </div>

      {/* Banner 2 — always underneath */}
      <div className="absolute inset-0">
        <img src={BANNER2_URL} alt="Banner 2" className="w-full h-full object-cover" />
      </div>

      {/* Banner 1 — fades out as user scrolls */}
      <div
        className="absolute inset-0"
        style={{ opacity: 1 - revealProgress }}
      >
        <img src={BANNER1_URL} alt="Banner 1" className="w-full h-full object-cover" />
      </div>

      {/* Pre-reveal title text */}
      <div
        className="absolute z-10 w-full flex justify-center px-4 pointer-events-none"
        style={{
          bottom: '30%',
          opacity: isMounted ? 1 - revealProgress : 0,
          transition: revealProgress === 0 ? 'opacity 1s ease-in-out' : 'none',
        }}
      >
        <span
          style={{
            fontFamily: 'Playfair Display',
            fontSize: 'clamp(28px, 6vw, 56px)',
            fontWeight: 800,
            letterSpacing: '0.08em',
          }}
        >
          <span style={{ color: '#85523F' }}>The Canvas</span>
        </span>
      </div>

      {/* Post-reveal title text */}
      <div
        className="absolute z-10 w-full flex justify-center px-4 pointer-events-none"
        style={{ bottom: '30%', opacity: isFullyRevealed ? 1 : 0, transition: 'opacity 1s ease-in-out', transitionDelay: isFullyRevealed ? '1s' : '0s' }}
      >
        <span
          style={{
            fontFamily: 'Playfair Display',
            fontSize: '56px',
            letterSpacing: '0.08em',
            fontWeight: 800,
          }}
        >
          <span style={{ color: '#85523F' }}>The Masterpiece</span>
          
        </span>
      </div>

      {/* Mobile scroll hint */}
      <div
        className="absolute bottom-8 w-full flex justify-center z-20 pointer-events-none md:hidden"
        style={{ opacity: isFullyRevealed ? 0 : isMounted ? 1 : 0, transition: 'opacity 1s ease-in-out' }}
      >
        <span className="text-white text-xs font-bold tracking-widest uppercase" style={{ textShadow: '0 1px 8px rgba(0,0,0,0.8)' }}>
          Scroll to Reveal
        </span>
      </div>

      {/* Cursor */}
      <div
        className={`fixed pointer-events-none z-50 flex items-center justify-center rounded-full ${isHovering ? 'opacity-100' : 'opacity-0'}`}
        style={{
          left: mousePos.x,
          top: mousePos.y,
          transform: 'translate(-50%, -50%)',
          width: isFullyRevealed ? '30px' : '30px',
          height: isFullyRevealed ? '30px' : '30px',
          background: 'rgba(0, 0, 0, 0.55)',
          backdropFilter: 'blur(1px)',
          border: '2px solid rgba(255,255,255,0.85)',
          transition: 'width 0.4s ease, height 0.4s ease, opacity 0.3s',
        }}
      >
        <span
          className="text-white text-xs font-bold tracking-widest uppercase text-center leading-snug whitespace-pre-line"
          style={{ textShadow: '0 1px 8px rgba(0,0,0,0.8)' }}
        >
          {!isFullyRevealed}
        </span>
      </div>
    </div>
  );
};

export default App;
