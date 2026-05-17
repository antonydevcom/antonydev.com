import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const prerender = true;

const SITE = 'https://antonydev.com';

const staticPages = [
  { url: '/',                                  priority: '1.00', changefreq: 'weekly'  },
  { url: '/servicios',                         priority: '0.95', changefreq: 'monthly' },
  { url: '/servicios/auditoria',               priority: '0.95', changefreq: 'monthly' },
  { url: '/servicios/creacion',                priority: '0.95', changefreq: 'monthly' },
  { url: '/servicios/mantenimiento',           priority: '0.90', changefreq: 'monthly' },
  { url: '/servicios/identidad',               priority: '0.90', changefreq: 'monthly' },
  { url: '/servicios/automatizacion',          priority: '0.90', changefreq: 'monthly' },
  { url: '/sobre-mi',                          priority: '0.85', changefreq: 'monthly' },
  { url: '/desarrollo-web-zihuatanejo',        priority: '0.95', changefreq: 'monthly' },
  { url: '/programador-zihuatanejo',           priority: '0.95', changefreq: 'monthly' },
  { url: '/paginas-web-zihuatanejo',           priority: '0.90', changefreq: 'monthly' },
  { url: '/desarrollo-web-ixtapa',             priority: '0.90', changefreq: 'monthly' },
  { url: '/paginas-web-guerrero',              priority: '0.85', changefreq: 'monthly' },
  { url: '/sistemas-gestion-zihuatanejo',      priority: '0.85', changefreq: 'monthly' },
  { url: '/blog',                              priority: '0.80', changefreq: 'weekly'  },
  { url: '/contacto',                          priority: '0.85', changefreq: 'monthly' },
];

export const GET: APIRoute = async () => {
  const today = new Date().toISOString().split('T')[0];

  const blogPosts = await getCollection('blog', ({ data }) => !data.draft);
  const blogPages = blogPosts.map((post) => ({
    url: `/blog/${post.id}`,
    priority: '0.75',
    changefreq: 'monthly',
    lastmod: post.data.publishedDate,
  }));

  const allPages = [
    ...staticPages.map((p) => ({ ...p, lastmod: today })),
    ...blogPages,
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
>
${allPages
  .map(
    ({ url, priority, changefreq, lastmod }) => `  <url>
    <loc>${SITE}${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
    <xhtml:link rel="alternate" hreflang="es-MX" href="${SITE}${url}" />
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
