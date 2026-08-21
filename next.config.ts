import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "z-cdn-media.chatglm.cn",
      },
    ],
  },
  serverExternalPackages: ["better-sqlite3", "@react-pdf/renderer", "nodemailer"],
  async redirects() {
    return [
      // The brochure was renamed off its spaced filename. Any link shared
      // before that (email, social) would otherwise 404. Redirects run ahead
      // of the /public filesystem, so this catches the old path.
      // `source` must stay percent-encoded — a literal-space source does not
      // match the incoming request and silently 404s.
      {
        source: "/IAUP%20Semi-Annual%20Meeting%202026.pdf",
        destination: "/iaup-brochure-2026.pdf",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
