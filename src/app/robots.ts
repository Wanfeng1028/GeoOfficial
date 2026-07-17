import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site';

/**
 * robots.txt for GeoOfficial.
 * Per v2.5 plan section 7.7.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/dev/', '/api/'],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
