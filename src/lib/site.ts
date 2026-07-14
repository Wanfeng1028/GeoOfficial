import { publicEnv } from '@/lib/env';

export const siteConfig = {
  name: 'GeoWork',
  url: publicEnv.NEXT_PUBLIC_SITE_URL,
  title: 'GeoWork — Geospatial work, in one place.',
  description:
    'GeoWork 将地图、遥感、代码、研究与自动化工作流汇于一个桌面工作台。',
  github: 'https://github.com/Wanfeng1028/GeoWork',
  frontend: 'https://github.com/Wanfeng1028/GeoFrontend2.0',
  version: 'v0.4.x-dev',
  status: 'Developer Preview' as const,
} as const;
