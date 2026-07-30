import Image from "next/image";

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
              Extend your trip and discover the natural beauty of Bangladesh
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
            <div className="group relative rounded-3xl overflow-hidden bg-slate-100 shadow-md">
              <div className="relative h-96 w-full">
                <div className="absolute inset-0 bg-slate-800 animate-pulse" />
                <Image
                  src="/jaflong.jpg"
                  alt="Tea Gardens in Jaflong"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-linear-to-t from-dark/90 via-dark/40 to-transparent" />
                <div className="absolute bottom-0 left-0 p-8 w-full">
                  <h4 className="font-display text-3xl font-bold text-white mb-2">
                    Tea Gardens in Jaflong
                  </h4>
                </div>
              </div>
            </div>

            <div className="group relative rounded-3xl overflow-hidden bg-slate-100 shadow-md">
              <div className="relative h-96 w-full">
                <div className="absolute inset-0 bg-slate-800 animate-pulse" />
                <Image
                  src="/jaflong2.jpg"
                  alt="Jaflong view"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
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
            <div className="group relative rounded-2xl overflow-hidden bg-slate-100 shadow-sm">
              <div className="relative h-96 w-full">
                <div className="absolute inset-0 bg-slate-800 animate-pulse" />
                <Image
                  src="/img1.jpg"
                  alt="Site photo 1"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700 opacity-95 group-hover:opacity-100"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute bottom-0 left-0 p-6 w-full bg-linear-to-t from-black/60 to-transparent">
                  <h4 className="font-display text-xl font-semibold text-white">
                    Dhaka City Exploration
                  </h4>
                </div>
              </div>
            </div>

            <div className="group relative rounded-2xl overflow-hidden bg-slate-100 shadow-sm">
              <div className="relative h-96 w-full">
                <div className="absolute inset-0 bg-slate-800 animate-pulse" />
                <Image
                  src="/img2.jpeg"
                  alt="Site photo 2"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700 opacity-95 group-hover:opacity-100"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute bottom-0 left-0 p-6 w-full bg-linear-to-t from-black/60 to-transparent">
                  <h4 className="font-display text-xl font-semibold text-white">
                    Bangladesh Parliament Visit
                  </h4>
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
              Playing golf at DSC/Kurmitola Golf Club ( Pre-Confirmation Required)
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            <div className="group relative rounded-2xl overflow-hidden bg-slate-100 shadow-sm">
              <div className="relative h-96 w-full">
                <div className="absolute inset-0 bg-slate-800 animate-pulse" />
                <Image
                  src="/img3.jpg"
                  alt="Leisure activity 1"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700 opacity-95 group-hover:opacity-100"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>

            <div className="group relative rounded-2xl overflow-hidden bg-slate-100 shadow-sm">
              <div className="relative h-96 w-full">
                <div className="absolute inset-0 bg-slate-800 animate-pulse" />
                <Image
                  src="/img4.jpg"
                  alt="Leisure activity 2"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700 opacity-95 group-hover:opacity-100"
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
