/** @type {import('next').NextConfig} */
const nextConfig = {
  // Only enable static exports for production builds
  ...(process.env.NODE_ENV === 'production' 
    ? { 
        output: 'export',
        distDir: 'out',
      } 
    : {}),
  
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