
export default function AboutDhakaSection() {
  return (
    <section className="py-24 lg:py-32 bg-light relative">
      <div className="max-w-340 mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="reveal order-2 lg:order-1">
            <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl">
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

          <div className="order-1 lg:order-2">
            <span className="inline-block text-primary font-semibold tracking-wide uppercase text-sm mb-4 reveal">
              Host City
            </span>
            <div className="section-divider mb-8 reveal reveal-delay-1" />
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-dark mb-6 reveal reveal-delay-1">
              <span className="block">Welcome</span>
              <span className="block gradient-text">Dhaka Bangladesh</span>
            </h2>
            <p className="text-lg text-justify text-muted leading-relaxed mb-6 reveal reveal-delay-2">
              Dhaka, the capital of Bangladesh, is one of South Asia’s largest and most dynamic cities. Home to more than 20 million people, it is the country&apos;s centre of government, commerce, culture, and higher education, where tradition and progress exist side by side.
            </p>
            <p className="text-muted text-justify leading-relaxed mb-6 reveal reveal-delay-3">
              With a history spanning more than four centuries, Dhaka offers a rich cultural landscape shaped by Mughal heritage, vibrant artistic traditions, and the warmth of Bangladeshi hospitality. Visitors can explore historic landmarks, experience renowned Bengali cuisine, discover thriving artisan crafts, and enjoy the energy of a city that never stands still.
            </p>
            <p className="text-muted text-justify leading-relaxed mb-6 reveal reveal-delay-4">
              As Bangladesh continues its remarkable economic and social transformation, Dhaka has become a meeting place for ideas, entrepreneurship, and academic collaboration. The city is home to many of the nation&apos;s leading universities, research institutions, and industries, making it a fitting venue for global conversations on the future of higher education.
            </p>
            <p className="text-muted text-justify leading-relaxed reveal reveal-delay-4">
              We look forward to welcoming you to Dhaka and hope your visit offers not only professional engagement but also an opportunity to experience the history, culture, and hospitality that make Bangladesh unique.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
