/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://sadhanasalon.in',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  exclude: ['/admin', '/admin/*'], // Exclude Sanity Studio
  robotsTxtOptions: {
    additionalSitemaps: [
      `${process.env.SITE_URL || 'https://sadhanasalon.in'}/sitemap.xml`,
    ],
  },
};
