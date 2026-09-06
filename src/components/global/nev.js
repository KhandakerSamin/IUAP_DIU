"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/#about", label: "About IAUP" },
  { href: "/why-diu", label: "Why DIU" },
  //{ href: "/speakers", label: "Speakers" },
  { href: "/program-schedule", label: "Program Schedule" },
  { href: "/pre-departure-guidelines", label: "Pre-Departure Guidelines" },
  { href: "/#contact", label: "Contact" },
];

const callForContributionLinks = [
  {
    href: "/call-for-contributions#call-for-speakers",
    label: "Call For Panel Speaker",
  },
  {
    href: "/call-for-contributions#poster-presentation",
    label: "Call For Poster Presentation",
  },
];

import logoImg from "../../../public/navLogo.png";
import diuLogoImg from "../../../public/diuLogo.png";

export default function Nev() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navIsScrolled = pathname !== "/" || scrolled;

  useEffect(() => {
    if (pathname !== "/") {
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
        navIsScrolled ? "bg-white/80 backdrop-blur-xl border-b border-slate-200/0 shadow-sm" : "bg-transparent border-transparent"
      }`}
    >
      <div className="max-w-340 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 transition-colors duration-300">
          <div className="shrink-0 flex items-center">
            <Link href={pathname === "/" ? "#hero" : "/#hero"} className="flex items-center gap-2 sm:gap-3" aria-label="Daffodil International University Home">
              <Image src={diuLogoImg} alt="DIU Logo" width={110} height={38} className={`h-5 sm:h-6 md:h-7 w-auto object-contain transition-all duration-300 ${!navIsScrolled ? "brightness-0 invert" : ""}`} />
              <Image src={logoImg} alt="IAUP Logo" width={180} height={48} className={`h-7 sm:h-9 md:h-11 w-auto object-contain transition-all duration-300 ${!navIsScrolled ? "brightness-0 invert" : ""}`} />
            </Link>
          </div>

          <div className="hidden xl:flex items-center justify-center flex-1 gap-4 2xl:gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`${navIsScrolled ? "text-slate-600" : "text-white/90"} hover:text-secondary font-medium transition-colors text-xs xl:text-sm`}
              >
                {link.label}
              </Link>
            ))}

            <div className="relative group">
              <Link
                href="/call-for-contributions"
                className={`${navIsScrolled ? "text-slate-600" : "text-white/90"} hover:text-secondary font-medium transition-colors text-xs xl:text-sm`}
              >
                Call for Contributions
              </Link>

              <div className="invisible absolute left-1/2 top-full z-50 mt-4 w-85 -translate-x-1/2 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-2 shadow-2xl ring-1 ring-black/5">
                  <div className="px-4 py-3 border-b border-slate-100">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">Call for Contributions</p>
                  </div>
                  <div className="p-2 space-y-2">
                    {callForContributionLinks.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block rounded-2xl px-4 py-3 transition-colors hover:bg-slate-50"
                      >
                        <div className="text-sm font-semibold text-dark">{item.label}</div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden xl:flex items-center justify-end w-48 shrink-0">
            <Link href="/#registration" className="group relative inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold text-white transition-all duration-200 bg-primary border border-transparent rounded-full shadow-sm hover:bg-primary-dark hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary overflow-hidden">
              <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-linear-to-b from-transparent via-transparent to-black"></span>
              <span className="relative">Register Now</span>
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className={`xl:hidden p-2 rounded-lg transition-colors ${navIsScrolled ? "text-slate-600 hover:bg-slate-200/50" : "text-white hover:bg-white/20"}`}
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
            <Link
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className="py-2 text-slate-800 font-medium hover:text-secondary transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link href="/call-for-contributions" onClick={closeMenu} className="py-2 text-slate-800 font-medium hover:text-secondary transition-colors">
            Call for Contributions
          </Link>
          <Link href="/#registration" onClick={closeMenu} className="px-6 py-3 rounded-full bg-primary text-white font-medium hover:bg-primary-dark transition-all text-center mt-2 shadow-sm">
            Register Now
          </Link>
        </div>
      </div>
    </nav>
  );
}
