/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "static.openni.ru",
      "anilibria.tv",
      "cdn.myanimelist.net",
      "myanimelist.net",
      "s4.anilist.co",
      "gogocdn.net",
    ],
    formats: ["image/avif", "image/webp"],
  },
};

module.exports = nextConfig;
