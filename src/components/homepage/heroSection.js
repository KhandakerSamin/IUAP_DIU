"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function HeroSection() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const targetDate = new Date("2026-11-19T00:00:00").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      className="h-screen relative overflow-hidden flex items-center justify-center bg-slate-900 text-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/heroBG.jpg')" }}
    >
      {/* Dark Overlay to ensure text readability */}
      <div className="absolute inset-0 bg-slate-900/70 z-0"></div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center justify-center h-full">
        
        

        <h1 className="font-display mt-25 text-3xl sm:text-4xl lg:text-[55px] font-extrabold leading-tight mb-4 tracking-tight text-white reveal reveal-delay-1 drop-shadow-sm max-w-5xl mx-auto">
          IAUP Semi-Annual{" "}
          <span className="bg-linear-to-r from-primary via-secondary to-primary bg-clip-text text-transparent drop-shadow-sm">
            Meeting 2026
          </span>
        </h1>

        <p className="text-xl sm:text-3xl text-white font-display font-bold mb-4 reveal reveal-delay-1 drop-shadow-sm">
          19–21 November
        </p>

        <p className="text-xl sm:text-2xl text-slate-200 font-display font-semibold mb-4 reveal reveal-delay-2 max-w-4xl leading-snug drop-shadow-sm">
          Transforming Higher Education for a Sustainable, Innovative, and AI-Enabled Future
        </p>

       

        <div className="text-base sm:text-lg text-slate-200 mb-8 max-w-2xl reveal reveal-delay-2 flex flex-col items-center gap-1 md:gap-1 font-medium ">
          <p className="font-bold text-white text-lg">Daffodil International University</p>
          <p>Daffodil Smart City, Birulia, Savar, Dhaka – 1216, Bangladesh</p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 reveal reveal-delay-3 mb-10">
          <Link href="/registration" className="group relative inline-flex items-center justify-center px-8 py-3 sm:px-10 sm:py-4 text-base sm:text-lg font-bold text-white transition-all duration-200 bg-primary border border-transparent rounded-full shadow-lg hover:bg-primary-dark hover:shadow-primary/30 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary overflow-hidden">
            <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-linear-to-b from-transparent via-transparent to-black"></span>
            <span className="relative">Register Now</span>
          </Link>
        </div>

        {/* Modern Countdown Timer */}
        <div className="reveal reveal-delay-4 flex justify-center gap-3 sm:gap-5 mt-2 w-full">
          {[
            { label: "Days", value: timeLeft.days },
            { label: "Hours", value: timeLeft.hours },
            { label: "Minutes", value: timeLeft.minutes },
            { label: "Seconds", value: timeLeft.seconds },
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <div className="w-14 h-14 sm:w-20 sm:h-20 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 flex items-center justify-center mb-2 shadow-sm transition-transform hover:-translate-y-0.5">
                <span className="font-display text-2xl sm:text-3xl font-bold text-white tabular-nums relative">
                  {mounted ? String(item.value).padStart(2, "0") : "00"}
                </span>
              </div>
              <span className="text-[10px] sm:text-xs font-semibold text-slate-300 uppercase tracking-widest">{item.label}</span>
            </div>
          ))}
        </div>
        
      </div>

      {/* Smooth transition to the light section below (hidden or darkened as we are on dark bg now) */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-linear-to-b from-transparent to-slate-900 pointer-events-none" />
    </section>
  );
}
