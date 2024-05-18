/** @type {import('next').NextConfig} */
const nextConfig = {
  publicRuntimeConfig: {
    apiKey: process.env.GEMINI_API_KEY, // Assuming your API key is stored in an environment variable
  },
};

export default nextConfig;
