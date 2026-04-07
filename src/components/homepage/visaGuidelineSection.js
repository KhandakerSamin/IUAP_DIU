import { CheckCircle2, Mail, Phone, ExternalLink } from "lucide-react";

export default function VisaGuidelineSection() {
  const visaLinks = [
    {
      title: "General Visa",
      description: "Official portal for Bangladesh visa application and requirements.",
      url: "https://visa.gov.bd",
    },
    {
      title: "Landing Permit (LP) Eligibility",
      description: "Check if your country is eligible for Visa-on-Arrival in Bangladesh.",
      url: "https://immi.specialbranch.gov.bd/Land-Permit-Eligibility",
    },
    {
      title: "Visa on Arrival (VOA) Instructions",
      description: "General instructions and procedures for obtaining a Visa on Arrival.",
      url: "https://voa.specialbranch.gov.bd/public/voa-instructions.html",
    },
  ];

  return (
    <section id="visa-guidelines" className="py-24 lg:py-32 bg-slate-50 border-t border-slate-100">
      <div className="max-w-340 mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16 reveal">
          <span className="inline-block text-primary font-semibold tracking-wide uppercase text-sm mb-4">
            Travel Information
          </span>
          <div className="section-divider mx-auto mb-8" />
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-dark mb-6">
            Bangladesh <span className="gradient-text">Visa Guideline</span>
          </h2>
          <p className="text-lg text-muted">
            Ensure you have the proper documentation for your travel. Below you will find official resources for Bangladesh visa applications and on-arrival instructions.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16 reveal reveal-delay-1">
          {visaLinks.map((link, idx) => (
            <div key={idx} className="bg-white rounded-3xl p-8 border border-border shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <CheckCircle2 className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-display font-bold text-xl text-dark mb-3">{link.title}</h4>
              <p className="text-muted leading-relaxed mb-8 flex-1">
                {link.description}
              </p>
              <a 
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-4 px-6 rounded-xl border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-white transition-colors group mt-auto"
              >
                Click Here
                <ExternalLink className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </a>
            </div>
          ))}
        </div>

        {/* Contact Info */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-border shadow-sm max-w-4xl mx-auto reveal reveal-delay-2">
          <div className="text-center mb-10">
            <h3 className="font-display text-3xl font-bold text-dark mb-4">Contact Secretariat</h3>
            <p className="text-muted font-medium text-lg">DIU Secretariat for IAUP Semi-Annual Meeting 2026 event</p>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-8">
            <div className="flex items-center gap-5 p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <div className="flex flex-col">
                <span className="text-dark font-semibold mb-1">Email Us:</span>
                <a href="mailto:iaup-bd2026@daffodilvarsity.edu.bd" className="text-muted hover:text-primary transition-colors text-sm font-medium">
                  iaup-bd2026@daffodilvarsity.edu.bd
                </a>
                <a href="mailto:int@daffodilvarsity.edu.bd" className="text-muted hover:text-primary transition-colors text-sm font-medium mt-1">
                  int@daffodilvarsity.edu.bd
                </a>
              </div>
            </div>
            
            <div className="flex items-center gap-5 p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <div className="flex flex-col">
                <span className="text-dark font-semibold mb-1">Cell / WhatsApp:</span>
                <a href="tel:+8801811458865" className="text-muted hover:text-primary transition-colors text-sm font-medium">
                  +880 1811-458865
                </a>
                <a href="tel:+8801847334763" className="text-muted hover:text-primary transition-colors text-sm font-medium mt-1">
                  +880 1847-334763
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}