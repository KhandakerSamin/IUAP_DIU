import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { href: "/#about", label: "About" },
  { href: "/#important-dates", label: "Dates" },
  { href: "/#contact", label: "Contact" },
];

export default function RegistrationNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex h-18 max-w-340 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" aria-label="Go to IAUP DIU homepage" className="flex items-center">
          <Image
            src="/navLogo.png"
            alt="DIU navigation logo"
            width={190}
            height={52}
            className="h-10 w-auto object-contain"
            priority
          />
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-slate-600 transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <Link
          href="/registration"
          className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
        >
          Registration
        </Link>
      </div>
    </header>
  );
}
