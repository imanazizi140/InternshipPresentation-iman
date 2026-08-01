/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: process.env.GITHUB_ACTIONS === "true" ? "/arina_s_presentation" : "",
  images: {
    unoptimized: true,
  },
}

export default nextConfig
