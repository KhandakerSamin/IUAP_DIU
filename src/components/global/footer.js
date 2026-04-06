import Image from "next/image";

const quickLinks = [
  { href: "#about", label: "About Event" },
  { href: "#university", label: "University" },
  { href: "#registration", label: "Registration" },
  { href: "#hotels", label: "Hotels" },
];

const resources = ["Event Schedule", "Speaker List", "Travel Guide", "FAQ"];

const logoUrl =
  "https://z-cdn-media.chatglm.cn/files/745e028a-624e-40ba-94b7-a2e49dad9a24.png?auth_key=1871536332-ef1eab32bf1448759e7aac24a309c0f8-0-7c22c8f492a6ceffe3d5266c124e6b6d";

export default function Footer() {
  return (
    <footer className="bg-dark text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <Image
                src={logoUrl}
                alt="DIU Logo"
                width={180}
                height={48}
                className="h-12 w-auto object-contain brightness-0 invert"
              />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Empowering minds, transforming futures through quality education and innovation since 2002.
            </p>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="text-gray-400 hover:text-primary transition-colors">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-5">Resources</h4>
            <ul className="space-y-3">
              {resources.map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-5">Contact</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li>conference@daffodilvarsity.edu.bd</li>
              <li>+880 1713-493076</li>
              <li>
                Daffodil Smart City, Birulia
                <br />
                Savar, Dhaka-1341
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">2026 Daffodil International University. All rights reserved.</p>
          <div className="text-gray-400 text-sm">Follow DIU on official social channels</div>
        </div>
      </div>
    </footer>
  );
}
