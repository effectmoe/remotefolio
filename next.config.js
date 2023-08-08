// eslint-disable-next-line @typescript-eslint/no-var-requiress
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})

module.exports = withBundleAnalyzer({
  staticPageGenerationTimeout: 300,
  images: {
    domains: [
      'www.notion.so',
      'notion.so',
      'images.unsplash.com',
      'pbs.twimg.com',
      'abs.twimg.com',
      's3.us-west-2.amazonaws.com',
      'transitivebullsh.it'
    ],
    formats: ['image/avif', 'image/webp'],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;"
  }
})





const withPWA = require('next-pwa')

module.exports = withPWA({
  reactStrictMode: true,
  pwa:{
    dest:"public",
    register:true,
    skipWaiting:true,
    disable:process.env.NODE_ENV === 'development'
  }
});

const { GenerateSW } = require('workbox-webpack-plugin');

module.exports = {
  // その他のwebpack設定
  plugins: [
    new GenerateSW({
      // ここでオプションを設定しますが、'pwa' プロパティは通常は含まれません
    })
  ],
}