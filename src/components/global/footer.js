import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";

// Inline SVGs for social icons to replace deprecated Lucide brand icons
const Facebook = ({ className }) => <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>;
const Instagram = ({ className }) => <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>;
const Linkedin = ({ className }) => <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>;
const Youtube = ({ className }) => <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z" /><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" /></svg>;

export default function Footer() {
  const quickLinks = [
    { href: "#about", label: "About IAUP" },
    { href: "#about-diu", label: "About DIU" },
    { href: "#program", label: "Event Schedule" },
    { href: "#speakers", label: "Speakers" },
  ];

  const resources = [
    { href: "#registration", label: "Registration" },
    { href: "#venues", label: "Venues" },
    { href: "#important-dates", label: "Important Dates" },
    { href: "#visa-guidelines", label: "Visa Guidelines" },
  ];

  const logoUrl = "/navLogo.png";

  return (
    <footer className="bg-dark text-slate-300 pt-20 pb-10 border-t-4 border-primary">
      <div className="max-w-340 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Column */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <div className="bg-slate-50 p-4 rounded-xl shadow-sm mb-6 inline-block">
              <Image
                src={logoUrl}
                alt="DIU Logo"
                width={200}
                height={54}
                className="h-10 sm:h-12 w-auto object-contain"
              />
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-8 max-w-sm">
              Daffodil International University (DIU) is a leading private university in Bangladesh, recognized for its commitment to digital transformation and global academic leadership.
            </p>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/daffodilvarsity.edu.bd" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white transition-all duration-300 text-slate-400">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/daffodil.university/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white transition-all duration-300 text-slate-400">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com/school/daffodil-international-university" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white transition-all duration-300 text-slate-400">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://www.youtube.com/@daffodiluniversity" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white transition-all duration-300 text-slate-400">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 lg:col-start-6">
            <h4 className="font-display font-semibold text-white text-lg mb-6">Quick Links</h4>
            <ul className="space-y-4 text-sm font-medium">
              {quickLinks.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="text-slate-400 hover:text-primary hover:translate-x-1 inline-flex transition-all duration-300">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="lg:col-span-2">
            <h4 className="font-display font-semibold text-white text-lg mb-6">Resources</h4>
            <ul className="space-y-4 text-sm font-medium">
              {resources.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="text-slate-400 hover:text-primary hover:translate-x-1 inline-flex transition-all duration-300">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h4 className="font-display font-semibold text-white text-lg mb-6">Contact Secretariat</h4>
            <ul className="space-y-5 text-sm text-slate-400">
              <li className="flex items-start gap-3 hover:text-white transition-colors">
                <Mail className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div className="flex flex-col gap-1">
                  <a href="mailto:iaup-bd2026@daffodilvarsity.edu.bd">iaup-bd2026@daffodilvarsity.edu.bd</a>
                  <a href="mailto:int@daffodilvarsity.edu.bd">int@daffodilvarsity.edu.bd</a>
                </div>
              </li>
              <li className="flex items-start gap-3 hover:text-white transition-colors">
                <Phone className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div className="flex flex-col gap-1">
                  <a href="tel:+8801811458865">+880 1811-458865</a>
                  <a href="tel:+8801847334763">+880 1847-334763</a>
                </div>
              </li>
              <li className="flex items-start gap-3 hover:text-white transition-colors">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  Daffodil Smart City, Birulia<br />
                  Savar, Dhaka-1216, Bangladesh
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex justify-center items-center gap-4 text-sm text-slate-500">
          <p className="text-center">© 2026 Daffodil International University. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
