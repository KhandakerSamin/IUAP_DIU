import Image from "next/image";

export default function AboutIaupSection() {
  return (
    <section id="about" className="py-24 lg:py-32 bg-white relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-linear-to-l from-slate-50 to-transparent opacity-50" />
      <div className="absolute -left-40 top-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Left Side: Logo/Image Image */}
          <div className="w-full lg:w-6/12 flex justify-center lg:justify-start reveal">
            <div className="relative w-full max-w-md aspect-square  overflow-hidden  flex items-center justify-center p-8 group">
              <div className="absolute inset-0  transition-opacity group-hover:opacity-100 duration-500" />
              <div className="relative w-full h-full">
                <Image
                  src="/iauplogo.jpg"
                  alt="IAUP Logo"
                  fill
                  className="object-contain transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 800px) 100vw, 600px"
                />
              </div>
            </div>
          </div>

          {/* Right Side: Content */}
          <div className="w-full lg:w-7/12">
            <div className="reveal">
              <span className="inline-block text-primary font-bold tracking-wider uppercase text-sm mb-3">
                Global Network
              </span>
              <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
                About <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">IAUP</span>
              </h2>
            </div>
            
            <div className="space-y-5 text-lg text-slate-600 leading-relaxed mb-10">
              <p className="reveal reveal-delay-1">
                The International Association of University Presidents (IAUP) is a prestigious global network of university leaders dedicated to promoting international understanding, academic collaboration, and responsible leadership in higher education. Founded in 1964, IAUP brings together presidents, rectors, and vice chancellors worldwide to address global challenges through education.
              </p>
              <p className="reveal reveal-delay-2">
                IAUP serves as a trusted platform for dialogue, policy exchange, and partnership-building, working closely with international organizations and academic networks to advance peace, sustainability, ethical governance, innovation, and social responsibility. Through conferences and leadership initiatives, IAUP encourages universities to contribute to a more inclusive and sustainable global future.
              </p>
            </div>

            <div className="reveal reveal-delay-3">
              <a
                href="https://iaup.org"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center px-8 py-3.5 text-base font-bold text-white transition-all duration-300 bg-primary border border-transparent rounded-full shadow-md hover:bg-primary-dark hover:shadow-lg hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary overflow-hidden"
              >
                <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-black"></span>
                <span className="relative flex items-center gap-2">
                  Learn More
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}