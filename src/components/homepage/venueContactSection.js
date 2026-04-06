const contactCards = [
  {
    title: "Email",
    content: (
      <a href="mailto:conference@daffodilvarsity.edu.bd" className="text-primary hover:underline">
        conference@daffodilvarsity.edu.bd
      </a>
    ),
  },
  {
    title: "Phone",
    content: (
      <a href="tel:+8801713493076" className="text-muted hover:text-primary transition-colors">
        +880 1713-493076
      </a>
    ),
  },
  {
    title: "Address",
    content: <p className="text-muted">Daffodil Smart City, Birulia, Savar, Dhaka-1341, Bangladesh</p>,
  },
  {
    title: "Office Hours",
    content: <p className="text-muted">Saturday - Thursday: 9:00 AM - 5:00 PM | Friday: Closed</p>,
  },
];

export default function VenueContactSection() {
  return (
    <section id="venue" className="py-24 lg:py-32 bg-light relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          <div className="reveal">
            <span className="inline-block text-primary font-semibold tracking-wide uppercase text-sm mb-4">Venue</span>
            <div className="section-divider mb-8" />
            <h2 className="font-display text-4xl font-bold text-dark mb-6">Event Location</h2>
            <div className="img-placeholder rounded-3xl h-96 overflow-hidden relative">
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                <span className="text-lg opacity-75">Daffodil Smart City</span>
              </div>
              <div className="absolute bottom-4 left-4 right-4 bg-white rounded-xl p-5 shadow-xl">
                <div className="font-display font-bold text-dark text-lg">Daffodil International University</div>
                <div className="text-muted text-sm">Daffodil Smart City, Birulia, Savar, Dhaka-1341, Bangladesh</div>
              </div>
            </div>
          </div>

          <div className="reveal reveal-delay-1">
            <span className="inline-block text-primary font-semibold tracking-wide uppercase text-sm mb-4">
              Get in Touch
            </span>
            <div className="section-divider mb-8" />
            <h2 className="font-display text-4xl font-bold text-dark mb-8">Contact Information</h2>
            <div className="space-y-6">
              {contactCards.map((item) => (
                <div key={item.title} className="flex items-start gap-5 bg-white p-5 rounded-2xl border border-border">
                  <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center shrink-0 text-white font-bold">
                    {item.title[0]}
                  </div>
                  <div>
                    <div className="font-semibold text-dark mb-1">{item.title}</div>
                    {item.content}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
