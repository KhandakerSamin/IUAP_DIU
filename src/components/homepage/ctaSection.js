import { ArrowRight, CalendarDays } from "lucide-react";
import Link from "next/link";

export default function CtaSection() {
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl">
          {/* Background Gradients */}
          <div className="absolute inset-0 bg-dark" />
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/30 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/30 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/4" />
          
          <div className="relative z-10 p-10 sm:p-16 lg:p-20 text-center reveal">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm font-semibold tracking-wide uppercase mb-8">
              <CalendarDays className="w-4 h-4 text-primary" />
              19-21 November 2026
            </span>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Ready to Join Us in <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Dhaka?</span>
            </h2>
            <p className="text-lg sm:text-xl text-slate-300 mb-10 max-w-2xl mx-auto font-light leading-relaxed reveal reveal-delay-1">
              Secure your place at the IAUP Semi-Annual Meeting 2026 hosted by Daffodil International University. Early bird registration ends <span className="font-semibold text-white">June 30, 2026</span>.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-5 reveal reveal-delay-2">
              <Link href="/registration" className="group flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-xl font-semibold sm:text-lg hover:bg-primary-dark hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 w-full sm:w-auto justify-center">
                Register Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a href="#about" className="group bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-xl font-semibold sm:text-lg hover:bg-white/20 transition-all duration-300 w-full sm:w-auto items-center justify-center flex hover:shadow-xl">
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
