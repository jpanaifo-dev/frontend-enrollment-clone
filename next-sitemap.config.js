/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://matricula.postgradounap.edu.pe',
  generateRobotsTxt: true,
  sitemapSize: 1000,
  exclude: ['/admin', '/dashboard'],
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: '*', disallow: ['/admin', '/dashboard'] }
    ]
  },
  transform: async (config, url) => {
    return {
      loc: url, // URL de la página
      lastmod: new Date().toISOString(), // Fecha de última modificación
      changefreq: 'daily', // Frecuencia de cambio
      priority: url === '/' ? 1.0 : 0.7 // Prioridad de la página
    }
  }
}
