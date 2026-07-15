import { productFacts } from '@/data/product-facts';
import { publicEnv } from '@/lib/env';

export const siteConfig = {
  name: productFacts.name,
  url: publicEnv.NEXT_PUBLIC_SITE_URL,
  title: 'GeoWork — Geospatial work, in one place.',
  description:
    'GeoWork 将地图、遥感、代码、研究与自动化工作流汇于一个桌面工作台。',

  github: productFacts.repositories.product,
  frontend: productFacts.repositories.frontend,
  website: productFacts.repositories.website,

  version: productFacts.version,
  status: productFacts.status,
} as const;
