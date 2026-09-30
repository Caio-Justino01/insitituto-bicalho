import type { APIRoute } from 'astro';
import { nav, site } from '../data/content';
import { legalPages } from '../data/legal';
export const GET: APIRoute = () => new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${[...nav.map(n => n.href), ...legalPages.map(p => `/${p.slug}/`)].map(path => `<url><loc>${new URL(path, site.url).href}</loc></url>`).join('')}</urlset>`, { headers: { 'Content-Type': 'application/xml' } });
