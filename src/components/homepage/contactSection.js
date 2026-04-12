import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactSection() {
  return (
    <section id="contact" className="py-24 lg:py-32 relative bg-white border-t border-slate-100">
      <div className="max-w-340 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 reveal">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-dark mb-6">Contact Secretariat</h2>
          <p className="text-lg text-slate-600 font-light">
            Have questions about the IAUP Semi-Annual Meeting 2026? Contact our secretariat for assistance with registration, accommodation, or general inquiries.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center reveal reveal-delay-1">
          {/* Email */}
          <div className="bg-slate-50 p-8 xl:p-10 rounded-4xl hover:bg-white hover:shadow-xl transition-all duration-300 border border-slate-100 group">
            <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:-translate-y-2 transition-transform duration-300">
              <Mail className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-dark mb-4">Email Us</h3>
            <div className="flex flex-col gap-2 text-slate-600 text-sm xl:text-base">
              <a href="mailto:iaup-bd2026@daffodilvarsity.edu.bd" className="hover:text-primary transition-colors font-medium break-all">iaup-bd2026@daffodilvarsity.edu.bd</a>
              <a href="mailto:int@daffodilvarsity.edu.bd" className="hover:text-primary transition-colors font-medium">int@daffodilvarsity.edu.bd</a>
            </div>
          </div>

          {/* Phone */}
          <div className="bg-slate-50 p-8 xl:p-10 rounded-4xl hover:bg-white hover:shadow-xl transition-all duration-300 border border-slate-100 group">
            <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:-translate-y-2 transition-transform duration-300">
              <Phone className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-dark mb-4">Call Us</h3>
            <div className="flex flex-col gap-2 text-slate-600 text-sm xl:text-base">
              <a href="tel:+8801811458865" className="hover:text-primary transition-colors font-medium">+880 1811-458865</a>
              <a href="tel:+8801847334763" className="hover:text-primary transition-colors font-medium">+880 1847-334763</a>
            </div>
          </div>

          {/* Location */}
          <div className="bg-slate-50 p-8 xl:p-10 rounded-4xl hover:bg-white hover:shadow-xl transition-all duration-300 border border-slate-100 group">
            <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:-translate-y-2 transition-transform duration-300">
              <MapPin className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-dark mb-4">Location</h3>
            <p className="text-slate-600 text-sm xl:text-base leading-relaxed font-medium">
              Daffodil Smart City, Birulia<br />
              Savar, Dhaka-1216, Bangladesh
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
