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
};

export default nextConfig;
