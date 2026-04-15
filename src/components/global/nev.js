"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "#about", label: "About IAUP" },
  { href: "#call-for-speakers", label: "Call for Panel Speakers" },
  { href: "#speakers", label: "Speakers" },
  { href: "#program", label: "Program" },
  { href: "#important-dates", label: "Important Dates" },
  { href: "#venues", label: "Venues" },
  { href: "#contact", label: "Contact" },
];

const logoUrl = "/navLogo.png";

export default function Nev() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (pathname !== "/") {
      setScrolled(true);
      return;
    }

    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const closeMenu = () => setIsOpen(false);

  return (
    <nav
      id="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/80 backdrop-blur-xl border-b border-slate-200/0 shadow-sm" : "bg-transparent border-transparent"
      }`}
    >
      <div className="max-w-340 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 transition-colors duration-300">
          <div className="w-48 shrink-0 flex items-center">
            <Link href={pathname === "/" ? "#hero" : "/"} className="flex items-center gap-3" aria-label="Daffodil International University Home">
              <Image src={logoUrl} alt="DIU Logo" width={180} height={48} className={`h-8 sm:h-10 md:h-12 w-auto object-contain transition-all duration-300 ${!scrolled ? "brightness-0 invert" : ""}`} />
            </Link>
          </div>

          <div className="hidden xl:flex items-center justify-center flex-1 gap-4 2xl:gap-8">
            {links.map((link) => (
              <a
                key={link.href}
                href={pathname === "/" ? link.href : `/${link.href}`}
                className={`${scrolled ? "text-slate-600" : "text-white/90"} hover:text-secondary font-medium transition-colors text-xs xl:text-sm uppercase tracking-wide`}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden xl:flex items-center justify-end w-48 shrink-0">
            <Link href="/registration" className="group relative inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold text-white transition-all duration-200 bg-primary border border-transparent rounded-full shadow-sm hover:bg-primary-dark hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary overflow-hidden">
              <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-linear-to-b from-transparent via-transparent to-black"></span>
              <span className="relative">Register Now</span>
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className={`xl:hidden p-2 rounded-lg transition-colors ${scrolled ? "text-slate-600 hover:bg-slate-200/50" : "text-white hover:bg-white/20"}`}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <div id="mobileMenu" className={`xl:hidden overflow-hidden transition-all duration-300 ${isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="flex flex-col gap-4 p-4 bg-slate-50/95 backdrop-blur-xl border-b border-slate-200/50">
          {links.map((link) => (
            <a
              key={link.href}
              href={pathname === "/" ? link.href : `/${link.href}`}
              onClick={closeMenu}
              className="py-2 text-slate-800 font-medium hover:text-secondary transition-colors"
            >
              {link.label}
            </a>
          ))}
          <Link href="/registration" onClick={closeMenu} className="px-6 py-3 rounded-full bg-primary text-white font-medium hover:bg-primary-dark transition-all text-center mt-2 shadow-sm">
            Register Now
          </Link>
        </div>
      </div>
    </nav>
  );
}
