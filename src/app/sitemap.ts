import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site';
import { staticRoutePaths, dynamicRouteConfigs } from '@/data/routes';

/**
 * Sitemap for GeoOfficial.
 * Per v2.5 plan section 7.7.
 *
 * Sources:
 * - staticRoutePaths from src/data/routes.ts (all static target routes)
 * - dynamicRouteConfigs (ecosystem/[slug] with 8 entries, use-cases/[slug] with 3 entries)
 * - locale variants (zh + en)
 */

const locales = ['zh', 'en'] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  // Static routes — emit both zh and en variants
  for (const path of staticRoutePaths) {
    const priority = path === '' ? 1 : path === '/platform' || path === '/resources' || path === '/use-cases' || path === '/plans' ? 0.9 : 0.7;
    const changeFrequency = path === '' ? 'weekly' : path === '/changelog' ? 'weekly' : 'monthly';

    for (const locale of locales) {
      entries.push({
        url: `${siteConfig.url}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency,
        priority,
        alternates: {
          languages: {
            zh: `${siteConfig.url}/zh${path}`,
            en: `${siteConfig.url}/en${path}`,
          },
        },
      });
    }
  }

  // Dynamic routes with concrete slugs
  for (const config of dynamicRouteConfigs) {
    if (config.slugs.length === 0) continue;
    const patternPath = config.pattern.replace('/[slug]', '');
    for (const slug of config.slugs) {
      const fullPath = `${patternPath}/${slug}`;
      for (const locale of locales) {
        entries.push({
          url: `${siteConfig.url}/${locale}${fullPath}`,
          lastModified: new Date(),
          changeFrequency: 'monthly',
          priority: 0.6,
          alternates: {
            languages: {
              zh: `${siteConfig.url}/zh${fullPath}`,
              en: `${siteConfig.url}/en${fullPath}`,
            },
          },
        });
      }
    }
  }

  return entries;
}
