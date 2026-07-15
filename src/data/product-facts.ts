/**
 * 产品事实唯一来源。
 *
 * 未确认的内容写 null 或 pending-*，不用看起来合理的数字填空。
 * 有真实 Release 后再自动读取版本。官方平台支持必须与实际构建一致。
 */
export type ProductStatus =
  | 'development'
  | 'developer-preview'
  | 'public-preview'
  | 'stable';

export type PlatformStatus =
  | 'not-confirmed'
  | 'source-build'
  | 'preview-build'
  | 'official-build';

export const productFacts = {
  name: 'GeoWork',

  status: 'development' as ProductStatus,

  version: null as string | null,

  repositories: {
    product: 'https://github.com/Wanfeng1028/GeoWork',
    frontend: 'https://github.com/Wanfeng1028/GeoFrontend2.0',
    website: 'https://github.com/Wanfeng1028/GeoOfficial',
    releases: 'https://github.com/Wanfeng1028/GeoWork/releases',
  },

  platforms: {
    windows: {
      label: 'Windows',
      architecture: ['x64'],
      status: 'source-build' as PlatformStatus,
    },
    macos: {
      label: 'macOS',
      architecture: [],
      status: 'not-confirmed' as PlatformStatus,
    },
    linux: {
      label: 'Linux',
      architecture: [],
      status: 'not-confirmed' as PlatformStatus,
    },
  },

  systemRequirements: {
    status: 'pending-verification' as const,
    items: [] as string[],
  },

  license: {
    status: 'pending-decision' as const,
    name: null as string | null,
    url: null as string | null,
  },

  connectivity: {
    localFirst: true,
    onlineFeatures: [
      'GitHub Releases',
      'Google Earth Engine',
      '模型服务',
    ],
  },
} as const;
