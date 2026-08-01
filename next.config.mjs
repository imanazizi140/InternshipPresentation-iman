/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: process.env.GITHUB_ACTIONS === "true" ? "/InternshipPresentation-iman" : "",
  images: {
    unoptimized: true,
  },
}

export default nextConfig
