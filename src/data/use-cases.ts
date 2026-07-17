import { mediaAssets } from '@/data/media';

/**
 * 案例列表摘要与结构化元信息。
 * 详细正文由 `src/content/use-cases/*.mdx` 维护，单一事实源。
 *
 * v2.5 Iteration 7：每个案例新增 `relatedPlatform` 字段，链接到相关 Platform 能力。
 */
export interface UseCaseSummary {
  slug: string;
  title: string;
  enTitle: string;
  description: string;
  enDescription: string;
  audience: string;
  enAudience: string;
  status: 'available' | 'preview' | 'planned';
  image: string;
  imageAlt: string;
  /** 相关 Platform 能力 slug 列表（用于详情页"相关平台能力"区块） */
  relatedPlatform: string[];
}

export const useCases: UseCaseSummary[] = [
  {
    slug: 'urban-expansion',
    title: '城市扩张与土地利用变化',
    enTitle: 'Urban Expansion & Land Use Change',
    description: '组织多时相影像、变化检测、统计结果和制图输出。',
    enDescription: 'Organize multi-temporal imagery, change detection, statistical results, and cartographic output.',
    audience: '科研 / 行业分析',
    enAudience: 'Research / Industry',
    status: 'preview',
    image: mediaAssets.useCases.urbanExpansion.src,
    imageAlt: mediaAssets.useCases.urbanExpansion.alt,
    relatedPlatform: ['ai', 'data', 'research-intelligence', 'reporting'],
  },
  {
    slug: 'ndvi-time-series',
    title: 'NDVI 时间序列分析',
    enTitle: 'NDVI Time Series Analysis',
    description: '计算植被指数、时序统计和趋势可视化。',
    enDescription: 'Compute vegetation indices, time-series statistics, and trend visualization.',
    audience: '科研 / 教学',
    enAudience: 'Research / Education',
    status: 'preview',
    image: mediaAssets.useCases.ndviSeries.src,
    imageAlt: mediaAssets.useCases.ndviSeries.alt,
    relatedPlatform: ['ai', 'data', 'research-intelligence', 'reporting'],
  },
  {
    slug: 'research-report',
    title: '文献阅读与实验报告生成',
    enTitle: 'Literature Review & Experiment Report Generation',
    description: '组织文献、复现实验、生成图表和报告。',
    enDescription: 'Organize literature, reproduce experiments, and generate charts and reports.',
    audience: '科研 / 教学',
    enAudience: 'Research / Education',
    status: 'preview',
    image: mediaAssets.useCases.researchReport.src,
    imageAlt: mediaAssets.useCases.researchReport.alt,
    relatedPlatform: ['assistant', 'research-intelligence', 'reporting', 'developers'],
  },
];
