/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "uhdtv.io",
      "mango.blender.org",
      "download.blender.org",
      "upload.wikimedia.org",
    ],
  },
};

module.exports = nextConfig;
