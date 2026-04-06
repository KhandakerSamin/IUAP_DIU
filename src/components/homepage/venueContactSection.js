import Image from "next/image";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

const contactCards = [
  {
    title: "Email",
    icon: <Mail className="w-6 h-6" />,
    content: (
      <a href="mailto:conference@daffodilvarsity.edu.bd" className="text-primary hover:underline">
        conference@daffodilvarsity.edu.bd
      </a>
    ),
  },
  {
    title: "Phone",
    icon: <Phone className="w-6 h-6" />,
    content: (
      <a href="tel:+8801713493076" className="text-muted hover:text-primary transition-colors">
        +880 1713-493076
      </a>
    ),
  },
  {
    title: "Address",
    icon: <MapPin className="w-6 h-6" />,
    content: <p className="text-muted">Daffodil Smart City, Birulia, Savar, Dhaka-1341, Bangladesh</p>,
  },
  {
    title: "Office Hours",
    icon: <Clock className="w-6 h-6" />,
    content: <p className="text-muted">Saturday - Thursday: 9:00 AM - 5:00 PM | Friday: Closed</p>,
  },
];

export default function VenueContactSection() {
  return (
    <section id="venue" className="py-24 lg:py-32 bg-light relative">
      <div className="max-w-340 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          <div className="reveal">
            <span className="inline-block text-primary font-semibold tracking-wide uppercase text-sm mb-4">Venue</span>
            <div className="section-divider mb-8" />
            <h2 className="font-display text-4xl font-bold text-dark mb-6">Event Location</h2>
            <div className="relative rounded-3xl h-96 overflow-hidden bg-slate-100 shadow-md">
              <Image 
                src="/venu.jpg" 
                alt="Venue Location" 
                fill 
                className="object-cover hover:scale-105 transition-transform duration-700" 
                sizes="(max-width: 768px) 100vw, 50vw" 
              />
              <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md rounded-xl p-5 shadow-lg border border-white/50">
                <div className="font-display font-bold text-dark text-lg">Daffodil International University</div>
                <div className="text-muted text-sm mt-1">Daffodil Smart City, Birulia, Savar, Dhaka-1341, Bangladesh</div>
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
                <div key={item.title} className="flex items-start gap-5 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="shrink-0 w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center text-white shadow-lg shadow-slate-900/20">
                    {item.icon}
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
