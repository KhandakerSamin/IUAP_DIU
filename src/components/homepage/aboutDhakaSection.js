import Image from "next/image";

export default function AboutDhakaSection() {
  return (
    <section className="py-24 lg:py-32 bg-light relative">
      <div className="max-w-340 mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="reveal order-2 lg:order-1 flex flex-col gap-12">
            <div className="relative">
              <div className="relative rounded-3xl h-96 overflow-hidden bg-slate-100 shadow-md">
                <Image 
                  src="/dhaka.jpg" 
                  alt="Cityscape of Dhaka" 
                  fill 
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-5 shadow-xl border border-border hidden sm:block">
                <div className="font-display font-bold text-dark text-lg">Capital City of Bangladesh</div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="font-display font-semibold text-2xl text-dark">Beautiful Bangladesh</h3>
              <div className="relative rounded-3xl overflow-hidden shadow-lg w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe 
                  className="absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube.com/embed/QNUSIOMb6vI" 
                  title="Beautiful Bangladesh" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <span className="inline-block text-primary font-semibold tracking-wide uppercase text-sm mb-4 reveal">
              Host City
            </span>
            <div className="section-divider mb-8 reveal reveal-delay-1" />
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-dark mb-6 reveal reveal-delay-1">
              About <span className="gradient-text">Dhaka, Bangladesh</span>
            </h2>
            <p className="text-lg text-muted leading-relaxed mb-6 reveal reveal-delay-2">
              Dhaka is the capital city of a South Asian country, Bangladesh. It is the hub of economic, political and administrative enterprises located in central Bangladesh at 23°42′N 90°22′E, on the eastern banks of the Buriganga River. It lies on the lower reaches of the Ganges Delta and covers a total area of 306.38 square kilometers (around 118.29 square miles).
            </p>
            <p className="text-muted leading-relaxed mb-6 reveal reveal-delay-3">
              Historically, Dhaka was associated with the periods of Kamarupa kingdom, Sena kingdom, and Sultanate period, and was a part of Mughal Empire, Nawab era, British. The capital has a favorable climate characterized by tropical monsoon from June to October; mild winter from October to March; hot, humid summer from March to June.
            </p>
            <p className="text-muted leading-relaxed reveal reveal-delay-4">
              The demographic features of the city are varied in character. Dhaka (North and South) city corporations are the most populated urban areas with the highest density accommodating over 22 million people including Muslims, Hindus, Christians, Buddhists and others.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
