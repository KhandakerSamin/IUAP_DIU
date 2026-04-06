export default function CtaSection() {
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 gradient-bg-dark" />
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="float-element w-96 h-96 bg-primary top-0 right-0" style={{ filter: "blur(100px)" }} />
        <div className="float-element w-80 h-80 bg-secondary bottom-0 left-0" style={{ filter: "blur(80px)" }} />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-6 reveal">Ready to Join Us in Dhaka?</h2>
        <p className="text-xl text-white/80 mb-10 reveal reveal-delay-1">
          Secure your place at the Daffodil International University Semi-Annual Meeting 2026. Early registration ends
          September 30.
        </p>
        <div className="flex flex-wrap justify-center gap-4 reveal reveal-delay-2">
          <a href="#registration" className="bg-white text-dark px-8 py-4 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all">
            Register Now
          </a>
          <a href="#about" className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all">
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
}
