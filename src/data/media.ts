/**
 * 媒体资产单一事实源。
 *
 * 真实 WebP 截图尚未提供时，`status` 为 `'placeholder'`，
 * `src` 直接指向 `public/media/placeholders/` 下的 SVG 占位图，
 * 避免 Next Image 解码无效占位文件产生 404。
 *
 * 上线前替换为真实 GeoFrontend2.0 截图：
 * 1. 将真实 WebP 放入 `public/media/{hero,modes,use-cases}/...`
 * 2. 把各 `src` 改回 `.webp` 路径，`status` 改为 `'final'`
 * 3. 运行 `npm run verify:assets` 验证
 */
export interface MediaAsset {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  status: 'final' | 'placeholder';
}

export const mediaAssets = {
  hero: {
    src: '/media/placeholders/hero-product.svg',
    alt: 'GeoWork 桌面工作台，显示项目导航、地图画布、代码编辑区和成果面板。（占位图，待替换为真实截图）',
    width: 2400,
    height: 1500,
    status: 'placeholder',
  },

  modes: {
    work: {
      src: '/media/placeholders/work.svg',
      alt: 'GeoWork Work 模式，显示任务、工具、项目文件与工作成果。（占位图）',
      status: 'placeholder',
    },
    code: {
      src: '/media/placeholders/code.svg',
      alt: 'GeoWork Code 模式，显示代码编辑器、终端和运行结果。（占位图）',
      status: 'placeholder',
    },
    map: {
      src: '/media/placeholders/map.svg',
      alt: 'GeoWork Map 模式，显示图层列表、地图画布和空间结果。（占位图）',
      status: 'placeholder',
    },
  },

  useCases: {
    urbanExpansion: {
      src: '/media/placeholders/urban-expansion.svg',
      alt: '城市扩张分析的土地利用变化地图与统计结果。（占位图）',
      status: 'placeholder',
    },
    ndviSeries: {
      src: '/media/placeholders/ndvi-series.svg',
      alt: 'NDVI 空间分布地图与时间序列图。（占位图）',
      status: 'placeholder',
    },
    researchReport: {
      src: '/media/placeholders/research-report.svg',
      alt: '研究报告、代码结果、图表和参考文献工作区。（占位图）',
      status: 'placeholder',
    },
  },
} as const;

/** 当前是否仍有占位资产未替换为真实截图 */
export const hasPlaceholderAssets =
  mediaAssets.hero.status === 'placeholder' ||
  Object.values(mediaAssets.modes).some((m) => m.status === 'placeholder') ||
  Object.values(mediaAssets.useCases).some((u) => u.status === 'placeholder');
