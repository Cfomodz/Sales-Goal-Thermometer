/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static exports for Vercel
  output: 'export',
  
  // Disable server-side rendering for cleaner deployment
  // as our API is just a simulation for now
  distDir: 'out',
  
  // Image optimization
  images: {
    unoptimized: true,
  },

  // Allow importing JSON files directly
  webpack(config) {
    config.module.rules.push({
      test: /\.json$/,
      type: 'json',
    });
    return config;
  },
};

module.exports = nextConfig; 