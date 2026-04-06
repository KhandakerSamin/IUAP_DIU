"use client";

import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "#about", label: "About" },
  { href: "#university", label: "University" },
  { href: "#registration", label: "Registration" },
  { href: "#hotels", label: "Hotels" },
  { href: "#venue", label: "Venue" },
];

const logoUrl = "/diuLogo.png";

export default function Nev() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <nav
      id="navbar"
      className="fixed top-0 left-0 right-0 z-50 bg-slate-50/80 backdrop-blur-xl border-b border-slate-200/50 transition-all duration-300 shadow-sm"
    >
      <div className="max-w-340 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <a href="#hero" className="flex items-center gap-3" aria-label="Daffodil International University Home">
            <Image src={logoUrl} alt="DIU Logo" width={180} height={48} className="h-12 w-auto object-contain" />
          </a>

          <div className="hidden lg:flex items-center gap-8">
            {links.map((link) => (
              <a key={link.href} href={link.href} className="text-slate-600 hover:text-teal-600 font-medium transition-colors">
                {link.label}
              </a>
            ))}
            <a href="#registration" className="px-6 py-2.5 rounded-xl bg-slate-900 text-white font-medium hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10 hover:-translate-y-0.5 text-sm">
              Register Now
            </a>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-200/50 transition-colors"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <div id="mobileMenu" className={`lg:hidden overflow-hidden transition-all duration-300 ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="flex flex-col gap-4 p-4 bg-slate-50/95 backdrop-blur-xl border-b border-slate-200/50">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className="py-2 text-slate-800 font-medium hover:text-teal-600 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a href="#registration" onClick={closeMenu} className="px-6 py-3 rounded-xl bg-slate-900 text-white font-medium hover:bg-slate-800 transition-all text-center mt-2">
            Register Now
          </a>
        </div>
      </div>
    </nav>
  );
}
