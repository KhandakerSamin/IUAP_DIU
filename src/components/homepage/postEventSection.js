import Image from "next/image";
import { Helicopter } from "lucide-react";

export default function PostEventSection() {
  return (
    <section id="post-event-tour" className="py-20 lg:pt-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="reveal">
          <div className="text-center mb-12">
            <h3 className="font-display text-3xl sm:text-4xl font-bold text-dark mb-4">
              Optional Post-Event Tour
            </h3>
            <p className="text-muted text-lg">
              Extend your trip and discover the natural beauty of Bangladesh with exclusive
              helicopter tours.
            </p>
            <div className="mt-5 flex justify-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-5 py-2.5 text-sm font-semibold text-primary">
                <Helicopter className="h-4 w-4 shrink-0" aria-hidden="true" />
                Travel by Helicopter
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
            <div className="group relative rounded-3xl overflow-hidden bg-slate-100 shadow-md">
              <div className="relative aspect-video w-full">
                <div className="absolute inset-0 bg-slate-900" />
                <Image
                  src="/jaflong.jpg"
                  alt="Tea Gardens in Sreemangal"
                  fill
                  className="object-contain hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-linear-to-t from-dark/90 via-dark/40 to-transparent" />
                <div className="absolute bottom-0 left-0 p-8 w-full">
                  <h4 className="font-display text-3xl font-bold text-white mb-2">
                    Tea Gardens in Sreemangal
                  </h4>
                </div>
              </div>
            </div>

            <div className="group relative rounded-3xl overflow-hidden bg-slate-100 shadow-md">
              <div className="relative aspect-video w-full">
                <div className="absolute inset-0 bg-slate-900" />
                <Image
                  src="/jaflong2.jpg"
                  alt="Jaflong view"
                  fill
                  className="object-contain hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-linear-to-t from-dark/90 via-dark/40 to-transparent" />
                <div className="absolute bottom-0 left-0 p-8 w-full">
                  <h4 className="font-display text-3xl font-bold text-white mb-2">
                    Scenic Beauty of Jaflong
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="reveal mt-16">
          <div className="text-center mb-8">
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-dark mb-3">
              Site Visit Highlights
            </h3>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            <div className="group relative rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-md hover:shadow-2xl transition-all duration-300">
              <div className="relative h-[320px] sm:h-[400px] lg:h-[460px] w-full flex items-center justify-center">
                <Image
                  src="/img1.jpg"
                  alt="Dhaka City Exploration"
                  fill
                  className="object-contain p-2 sm:p-3 transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none">
                  <div className="inline-flex items-center rounded-xl bg-black/60 backdrop-blur-md px-4 py-2 border border-white/15 shadow-sm">
                    <h4 className="font-display text-lg sm:text-xl font-bold text-white tracking-wide">
                      Dhaka City Exploration
                    </h4>
                  </div>
                </div>
              </div>
            </div>

            <div className="group relative rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-md hover:shadow-2xl transition-all duration-300">
              <div className="relative h-[320px] sm:h-[400px] lg:h-[460px] w-full flex items-center justify-center">
                <Image
                  src="/img2.jpeg"
                  alt="Bangladesh Parliament Visit"
                  fill
                  className="object-contain p-2 sm:p-3 transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none">
                  <div className="inline-flex items-center rounded-xl bg-black/60 backdrop-blur-md px-4 py-2 border border-white/15 shadow-sm">
                    <h4 className="font-display text-lg sm:text-xl font-bold text-white tracking-wide">
                      Bangladesh Parliament Visit
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="reveal mt-12 mb-8">
          <div className="text-center mb-8">
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-dark mb-3">
              Optional Leisure Activities
            </h3>
            <p className="text-muted">
              Playing golf at DSC/Kurmitola Golf Club (Pre-Confirmation Required)
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            <div className="group relative rounded-2xl overflow-hidden bg-slate-100 shadow-sm">
              <div className="relative aspect-[3/2] w-full">
                <div className="absolute inset-0 bg-slate-900" />
                <Image
                  src="/img3.jpg"
                  alt="Leisure activity 1"
                  fill
                  className="object-contain hover:scale-105 transition-transform duration-700 opacity-95 group-hover:opacity-100"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>

            <div className="group relative rounded-2xl overflow-hidden bg-slate-100 shadow-sm">
              <div className="relative aspect-[3/2] w-full">
                <div className="absolute inset-0 bg-slate-900" />
                <Image
                  src="/img4.jpg"
                  alt="Leisure activity 2"
                  fill
                  className="object-contain hover:scale-105 transition-transform duration-700 opacity-95 group-hover:opacity-100"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
