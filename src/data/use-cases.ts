import { mediaAssets } from '@/data/media';

/**
 * 案例列表摘要与结构化元信息。
 * 详细正文由 `src/content/use-cases/*.mdx` 维护，单一事实源。
 */
export interface UseCaseSummary {
  slug: string;
  title: string;
  description: string;
  audience: string;
  status: 'available' | 'preview' | 'planned';
  image: string;
  imageAlt: string;
}

export const useCases: UseCaseSummary[] = [
  {
    slug: 'urban-expansion',
    title: '城市扩张与土地利用变化',
    description: '组织多时相影像、变化检测、统计结果和制图输出。',
    audience: '科研 / 行业分析',
    status: 'preview',
    image: mediaAssets.useCases.urbanExpansion.src,
    imageAlt: mediaAssets.useCases.urbanExpansion.alt,
  },
  {
    slug: 'ndvi-series',
    title: 'NDVI 时间序列分析',
    description: '计算植被指数、时序统计和趋势可视化。',
    audience: '科研 / 教学',
    status: 'preview',
    image: mediaAssets.useCases.ndviSeries.src,
    imageAlt: mediaAssets.useCases.ndviSeries.alt,
  },
  {
    slug: 'research-report',
    title: '文献阅读与实验报告生成',
    description: '组织文献、复现实验、生成图表和报告。',
    audience: '科研 / 教学',
    status: 'preview',
    image: mediaAssets.useCases.researchReport.src,
    imageAlt: mediaAssets.useCases.researchReport.alt,
  },
];
