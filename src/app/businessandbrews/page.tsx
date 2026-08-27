'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import WaveDivider from '@/components/businessandbrews/WaveDivider';

export default function BusinessAndBrewsScreensaver() {
  const [isIdle, setIsIdle] = useState(false);
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimer = (duration: number = 3000) => {
    setIsIdle(false);
    if (typeof window !== 'undefined') {
      document.body.style.cursor = 'auto';
    }
    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current);
    }
    idleTimerRef.current = setTimeout(() => {
      setIsIdle(true);
      if (typeof window !== 'undefined') {
        document.body.style.cursor = 'none';
      }
    }, duration);
  };

  useEffect(() => {
    // Initial timer
    resetTimer();

    const handleMouseMove = () => resetTimer(3000);
    const handleTouchStart = () => resetTimer(5000);

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('touchstart', handleTouchStart);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('touchstart', handleTouchStart);
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
      }
      document.body.style.cursor = 'auto';
    };
  }, []);

  const navClasses = `transition-all duration-700 ease-in-out absolute bottom-12 w-full flex flex-col md:flex-row justify-center gap-6 px-6 z-20 ${
    isIdle ? 'opacity-0 translate-y-8 pointer-events-none' : 'opacity-100 translate-y-0'
  }`;

  // Generate bubble data
  const bubbles = [
    { left: '3%',  size: 4,   duration: 8,   delay: 0,    opacity: 0.25, drift: 15  },
    { left: '8%',  size: 2,   duration: 10,  delay: 1.2,  opacity: 0.20, drift: -10 },
    { left: '12%', size: 5,   duration: 7,   delay: 3.5,  opacity: 0.30, drift: 20  },
    { left: '17%', size: 3,   duration: 9,   delay: 0.8,  opacity: 0.22, drift: -12 },
    { left: '22%', size: 6,   duration: 11,  delay: 2.0,  opacity: 0.35, drift: 8   },
    { left: '27%', size: 2,   duration: 8.5, delay: 4.5,  opacity: 0.18, drift: -18 },
    { left: '32%', size: 4,   duration: 9.5, delay: 1.5,  opacity: 0.28, drift: 14  },
    { left: '37%', size: 3,   duration: 7.5, delay: 3.0,  opacity: 0.24, drift: -8  },
    { left: '42%', size: 5,   duration: 10.5,delay: 0.5,  opacity: 0.32, drift: 22  },
    { left: '47%', size: 2,   duration: 8,   delay: 5.0,  opacity: 0.20, drift: -15 },
    { left: '52%', size: 6,   duration: 9,   delay: 2.5,  opacity: 0.38, drift: 10  },
    { left: '55%', size: 3,   duration: 11.5,delay: 1.0,  opacity: 0.22, drift: -20 },
    { left: '60%', size: 4,   duration: 7.8, delay: 3.8,  opacity: 0.26, drift: 16  },
    { left: '64%', size: 2,   duration: 9.2, delay: 0.3,  opacity: 0.18, drift: -6  },
    { left: '68%', size: 5,   duration: 8.8, delay: 4.0,  opacity: 0.34, drift: 12  },
    { left: '72%', size: 3,   duration: 10,  delay: 2.2,  opacity: 0.24, drift: -14 },
    { left: '76%', size: 4,   duration: 7.2, delay: 1.8,  opacity: 0.28, drift: 18  },
    { left: '80%', size: 6,   duration: 9.8, delay: 3.2,  opacity: 0.40, drift: -10 },
    { left: '84%', size: 2,   duration: 8.3, delay: 0.7,  opacity: 0.20, drift: 8   },
    { left: '88%', size: 5,   duration: 10.2,delay: 4.8,  opacity: 0.30, drift: -16 },
    { left: '91%', size: 3,   duration: 7.6, delay: 2.8,  opacity: 0.22, drift: 20  },
    { left: '95%', size: 4,   duration: 9.5, delay: 1.3,  opacity: 0.26, drift: -12 },
    { left: '15%', size: 1.5, duration: 12,  delay: 5.5,  opacity: 0.15, drift: 6   },
    { left: '45%', size: 1.5, duration: 11,  delay: 6.0,  opacity: 0.15, drift: -8  },
    { left: '75%', size: 1.5, duration: 13,  delay: 7.0,  opacity: 0.15, drift: 10  },
  ];

  return (
    <div className="relative h-screen overflow-hidden bg-[#0F172A] font-inter">
      {/* Background Image & Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: "url('/businessandbrews/hero-bg.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A]/70 via-[#0F172A]/50 to-[#0F172A]/80" />
      </div>

      {/* Carbonated Bubbles */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes pulse-glow {
          0%, 100% { text-shadow: 0 0 20px rgba(255, 255, 255, 0.2), 0 0 40px rgba(37, 99, 235, 0.4); }
          50% { text-shadow: 0 0 30px rgba(255, 255, 255, 0.4), 0 0 60px rgba(37, 99, 235, 0.8); }
        }
        .text-glow {
          animation: pulse-glow 3s infinite ease-in-out;
        }
        @keyframes rise-bubble {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          5% {
            opacity: var(--bubble-opacity);
          }
          85% {
            opacity: var(--bubble-opacity);
          }
          100% {
            transform: translateY(-110vh) translateX(var(--bubble-drift));
            opacity: 0;
          }
        }
        .carbonated-bubble {
          position: absolute;
          bottom: -20px;
          border-radius: 50%;
          background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.2));
          box-shadow: 0 0 4px rgba(255, 255, 255, 0.15), inset 0 0 2px rgba(255, 255, 255, 0.3);
          animation: rise-bubble var(--bubble-duration) var(--bubble-delay) infinite ease-out;
          opacity: 0;
          will-change: transform, opacity;
        }
      `}} />
      
      {bubbles.map((b, i) => (
        <div
          key={i}
          className="carbonated-bubble z-10"
          style={{
            left: b.left,
            width: `${b.size}px`,
            height: `${b.size}px`,
            ['--bubble-duration' as string]: `${b.duration}s`,
            ['--bubble-delay' as string]: `${b.delay}s`,
            ['--bubble-opacity' as string]: b.opacity,
            ['--bubble-drift' as string]: `${b.drift}px`,
          }}
        />
      ))}

      {/* Main Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4">
        <h2 className="text-2xl md:text-4xl tracking-[0.3em] uppercase font-light text-white/80 mb-4 text-center">
          HOME SERVICE
        </h2>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-montserrat font-bold text-white text-center text-glow">
          BUSINESS & BREWS
        </h1>
        <div className="mt-8 w-32 h-0.5 bg-gradient-to-r from-transparent via-[#2563EB] to-transparent" />
      </div>

      {/* Wave Divider */}
      <div className="absolute bottom-32 w-full z-10 pointer-events-none">
        <WaveDivider />
      </div>

      {/* Auto-hiding Navigation */}
      <div className={navClasses}>
        <Link href="/businessandbrews/montgomery-county" className="flex-1 max-w-sm group">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 transition-all hover:bg-white/20 hover:border-white/30 h-full">
            <h3 className="font-montserrat font-semibold text-lg text-white mb-1">
              Montgomery County
            </h3>
            <div className="flex items-center justify-between">
              <p className="text-sm text-white/60">In-Person Event</p>
              <span className="text-white/80 transform transition-transform group-hover:translate-x-1">→</span>
            </div>
          </div>
        </Link>
        
        <Link href="/businessandbrews/howard-county" className="flex-1 max-w-sm group">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 transition-all hover:bg-white/20 hover:border-white/30 h-full">
            <h3 className="font-montserrat font-semibold text-lg text-white mb-1">
              Howard County
            </h3>
            <div className="flex items-center justify-between">
              <p className="text-sm text-white/60">In-Person Event</p>
              <span className="text-white/80 transform transition-transform group-hover:translate-x-1">→</span>
            </div>
          </div>
        </Link>
        
        <Link href="/businessandbrews/summit" className="flex-1 max-w-sm group">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 transition-all hover:bg-white/20 hover:border-white/30 h-full">
            <h3 className="font-montserrat font-semibold text-lg text-white mb-1">
              Online Summit
            </h3>
            <div className="flex items-center justify-between">
              <p className="text-sm text-white/60">Online Event</p>
              <span className="text-white/80 transform transition-transform group-hover:translate-x-1">→</span>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
