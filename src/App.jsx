import React, { useState, useEffect } from 'react';

const BANNER1_URL = "/banner1.jpeg";
const BANNER2_URL = "/banner2.jpeg";

const App = () => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      className="relative w-screen h-screen overflow-hidden select-none cursor-none"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={() => { if (!isRevealed) setIsRevealed(true); }}
    >
      {/* Circular cursor */}
      <div
        className={`fixed pointer-events-none z-50 transition-opacity duration-300 flex items-center justify-center rounded-full shadow-2xl ${isHovering ? 'opacity-100' : 'opacity-0'}`}
        style={{
          left: mousePos.x,
          top: mousePos.y,
          transform: 'translate(-50%, -50%)',
          width: isRevealed ? '30px' : '110px',
          height: isRevealed ? '30px' : '110px',
          background: 'rgba(0, 0, 0, 0.55)',
          backdropFilter: 'blur(6px)',
          transition: 'width 0.4s ease, height 0.4s ease, opacity 0.3s',
        }}
      >
        <span
          className="text-white text-xs font-bold tracking-widest uppercase text-center leading-snug whitespace-pre-line"
          style={{ textShadow: '0 1px 8px rgba(0,0,0,0.8)' }}
        >
          {!isRevealed && `Click to\nReveal`}
        </span>
      </div>

      {/* Banner 1 */}
      <div
        className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
        style={{ opacity: isRevealed ? 0 : 1 }}
      >
        <img src={BANNER1_URL} alt="Banner 1" className="w-full h-full object-cover" />
      </div>

      {/* Banner 2 */}
      <div
        className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
        style={{ opacity: isRevealed ? 1 : 0 }}
      >
        <img src={BANNER2_URL} alt="Banner 2" className="w-full h-full object-cover" />
      </div>
    </div>
  );
};

export default App;
