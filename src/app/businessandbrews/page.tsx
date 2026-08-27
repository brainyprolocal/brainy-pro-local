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

  return (
    <div className="relative h-screen overflow-hidden bg-[#0F172A] font-inter">
      {/* Background Image & Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: "url('/businessandbrews/hero-bg.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A]/70 via-[#0F172A]/50 to-[#0F172A]/80" />
      </div>

      {/* Floating Particles */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes pulse-glow {
          0%, 100% { text-shadow: 0 0 20px rgba(255, 255, 255, 0.2), 0 0 40px rgba(37, 99, 235, 0.4); }
          50% { text-shadow: 0 0 30px rgba(255, 255, 255, 0.4), 0 0 60px rgba(37, 99, 235, 0.8); }
        }
        @keyframes float-1 {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-40px); }
        }
        @keyframes float-2 {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-60px); }
        }
        @keyframes float-3 {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-30px); }
        }
        .text-glow {
          animation: pulse-glow 3s infinite ease-in-out;
        }
        .particle-1 { animation: float-1 6s infinite ease-in-out; }
        .particle-2 { animation: float-2 8s infinite ease-in-out; }
        .particle-3 { animation: float-3 5s infinite ease-in-out; }
        .particle-4 { animation: float-1 7s infinite ease-in-out; }
        .particle-5 { animation: float-2 4.5s infinite ease-in-out; }
      `}} />
      
      <div className="absolute top-[20%] left-[10%] w-2 h-2 bg-white/20 rounded-full particle-1 z-10" />
      <div className="absolute top-[60%] left-[20%] w-3 h-3 bg-white/20 rounded-full particle-2 z-10" />
      <div className="absolute top-[30%] right-[15%] w-1.5 h-1.5 bg-white/20 rounded-full particle-3 z-10" />
      <div className="absolute top-[70%] right-[25%] w-2.5 h-2.5 bg-white/20 rounded-full particle-4 z-10" />
      <div className="absolute top-[45%] left-[80%] w-1 h-1 bg-white/20 rounded-full particle-5 z-10" />

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
              Business & Brews Summit
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
