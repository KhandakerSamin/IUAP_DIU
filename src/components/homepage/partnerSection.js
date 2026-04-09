import { Users } from "lucide-react";

export default function PartnerSection() {
  return (
    <section id="partner" className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center reveal">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6">
          <Users className="w-8 h-8" />
        </div>
        <h2 className="font-display text-4xl font-bold text-dark mb-4">Our Partners</h2>
        <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto font-light">
          We are collaborating with leading institutions and organizations worldwide. 
          The complete list of our esteemed partners will be announced shortly.
        </p>
        <div className="inline-flex px-6 py-3 rounded-full bg-white border border-slate-200 shadow-sm text-slate-500 font-medium animate-pulse">
          Details Coming Soon...
        </div>
      </div>
    </section>
  );
}
