import type { APIRoute } from 'astro';

export const prerender = true;

const SITE = 'https://antonydev.com';

const pages = [
  { url: '/',                         priority: '1.00', changefreq: 'weekly'  },
  { url: '/servicios',                priority: '0.95', changefreq: 'monthly' },
  { url: '/servicios/auditoria',      priority: '0.95', changefreq: 'monthly' },
  { url: '/servicios/creacion',       priority: '0.95', changefreq: 'monthly' },
  { url: '/servicios/mantenimiento',  priority: '0.95', changefreq: 'monthly' },
  { url: '/servicios/identidad',      priority: '0.90', changefreq: 'monthly' },
  { url: '/servicios/automatizacion', priority: '0.90', changefreq: 'monthly' },
  { url: '/contacto',                 priority: '0.85', changefreq: 'monthly' },
];

export const GET: APIRoute = () => {
  const today = new Date().toISOString().split('T')[0];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    ({ url, priority, changefreq }) => `  <url>
    <loc>${SITE}${url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
};
