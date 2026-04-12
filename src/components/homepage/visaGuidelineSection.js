import { CheckCircle2, ExternalLink } from "lucide-react";

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

        

      </div>
    </section>
  );
}