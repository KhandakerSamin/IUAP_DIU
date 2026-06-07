import { Users } from "lucide-react";
import Image from "next/image";

export default function PartnerSection() {
  return (
    <section
      id="partner"
      className="pb-24 lg:pb-32 bg-slate-50 relative overflow-hidden"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center reveal">
        <div>
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6">
            <Users className="w-8 h-8" />
          </div>
          <h2 className="font-display text-4xl font-bold text-dark mb-4">
            Our Partners
          </h2>
          <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto font-light">
            We are collaborating with leading institutions and organizations
            worldwide.
          </p>
        </div>
        <div className="flex justify-center items-center mt-8">
          <div className="relative w-64 h-32 md:w-80 md:h-50">
            <Image
              src="/partner.jpg"
              alt="Our Partner"
              className="object-contain"
              fill
            />
          </div>
        </div>
      </div>
    </section>
  );
}
