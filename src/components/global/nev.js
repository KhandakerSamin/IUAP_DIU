"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const links = [
  { href: "#about", label: "About" },
  { href: "#university", label: "University" },
  { href: "#registration", label: "Registration" },
  { href: "#hotels", label: "Hotels" },
  { href: "#venue", label: "Venue" },
];

const logoUrl =
  "https://z-cdn-media.chatglm.cn/files/745e028a-624e-40ba-94b7-a2e49dad9a24.png?auth_key=1871536332-ef1eab32bf1448759e7aac24a309c0f8-0-7c22c8f492a6ceffe3d5266c124e6b6d";

export default function Nev() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.pageYOffset > 100);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const closeMenu = () => setIsOpen(false);

  return (
    <nav
      id="navbar"
      className={`fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-border transition-all duration-300 ${
        isScrolled ? "shadow-[0_4px_20px_rgba(0,0,0,0.1)]" : "shadow-none"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <a href="#hero" className="flex items-center gap-3" aria-label="Daffodil International University Home">
            <Image src={logoUrl} alt="DIU Logo" width={180} height={48} className="h-12 w-auto object-contain" />
          </a>

          <div className="hidden lg:flex items-center gap-8">
            {links.map((link) => (
              <a key={link.href} href={link.href} className="nav-link">
                {link.label}
              </a>
            ))}
            <a href="#registration" className="btn-primary text-sm py-3 px-6">
              Register Now
            </a>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="lg:hidden p-2 rounded-lg hover:bg-light transition-colors"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            <svg className="w-6 h-6 text-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      <div id="mobileMenu" className={`mobile-menu lg:hidden ${isOpen ? "active" : ""}`}>
        <div className="flex flex-col gap-4">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className="py-2 text-dark font-medium hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a href="#registration" onClick={closeMenu} className="btn-primary text-center mt-2">
            Register Now
          </a>
        </div>
      </div>
    </nav>
  );
}
