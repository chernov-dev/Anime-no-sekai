/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["static.openni.ru", "anilibria.tv"],
    formats: ["image/avif", "image/webp"],
  },
};

module.exports = nextConfig;
