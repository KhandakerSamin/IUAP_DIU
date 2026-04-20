import { Roboto, Montserrat } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-roboto",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata = {
  title: "IAUP Semi-Annual Meeting 2026",    
  description:
    "Join global academic leaders in Dhaka for DIU Semi-Annual Meeting 2026.",
  icons: {
    icon: "/favicon.jpg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${roboto.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full" suppressHydrationWarning>{children}</body>
    </html>
  );
}
