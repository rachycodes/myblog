import type { NextConfig } from "next";

const nextConfig = {
  images: {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "images.unsplash.com",
      pathname: "/**",
    },
    {
      protocol: "https",
      hostname: "cdn.sanity.io",
      pathname: "/**",
    },
  ],
},
}

export default nextConfig;
