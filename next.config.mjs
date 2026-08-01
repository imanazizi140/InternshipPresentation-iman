/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: process.env.GITHUB_ACTIONS === "true" ? "/internship-presentation" : "",
  images: {
    unoptimized: true,
  },
}

export default nextConfig
