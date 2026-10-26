import type { RequestHandler } from './$types';

const SITE_URL = 'https://tu-dominio.com'; // Reemplazar con tu dominio real

export const GET: RequestHandler = async () => {
    const staticPages = [
        {
            url: SITE_URL,
            lastmod: new Date().toISOString(),
            changefreq: 'daily',
            priority: 1.0
        },
        {
            url: `${SITE_URL}/cataloge`,
            lastmod: new Date().toISOString(),
            changefreq: 'daily',
            priority: 0.9
        },
        {
            url: `${SITE_URL}/cataloge/productos`,
            lastmod: new Date().toISOString(),
            changefreq: 'daily',
            priority: 0.8
        },
        {
            url: `${SITE_URL}/cataloge/servicios`,
            lastmod: new Date().toISOString(),
            changefreq: 'daily',
            priority: 0.8
        }
    ];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages
    .map(
        (page) => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
    )
    .join('\n')}
</urlset>`;

    return new Response(sitemap, {
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 'public, max-age=3600'
        }
    });
};
