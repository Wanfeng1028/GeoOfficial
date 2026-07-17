/**
 * Article Metadata — v2.5 plan Iteration 8
 *
 * 4 个资源详情页(blog / engineering / help / learn)的文章元数据。
 * 与 src/content/{blog,engineering,help,learn}/index.ts 中的 loader map 配对使用。
 *
 * 文章内容来自对应 MDX 文件,元数据集中在本文件以便:
 * - 详情页 H1 / 描述 / 元信息(日期、阅读时长)统一来源
 * - generateMetadata 使用统一接口
 * - 后续扩展(列表页过滤、相关文章)无需扫描 MDX frontmatter
 */

export type ArticleSection = 'blog' | 'engineering' | 'help' | 'learn';

export interface ArticleMeta {
  slug: string;
  section: ArticleSection;
  /** 详情页路径(无 locale 前缀),如 /blog/why-local-first */
  path: string;
  title: { zh: string; en: string };
  description: { zh: string; en: string };
  /** ISO 日期字符串 */
  date: string;
  /** 作者(可选) */
  author?: { zh: string; en: string };
  /** 阅读时长(可选) */
  readingTime?: { zh: string; en: string };
  /** 标签(可选) */
  tags?: { zh: string[]; en: string[] };
}

export const articles: ArticleMeta[] = [
  // ─── Blog ───────────────────────────────────────────────
  {
    slug: 'why-local-first',
    section: 'blog',
    path: '/blog/why-local-first',
    title: {
      zh: '为什么是 local-first',
      en: 'Why local-first',
    },
    description: {
      zh: 'GeoWork 选择 local-first 架构:数据、配置与成果都保留在本地,云作为可选工具而非默认依赖。',
      en: 'GeoWork chooses local-first: data, configuration, and outputs stay on your machine. Cloud is an optional tool, not a default dependency.',
    },
    date: '2026-07-12',
    author: { zh: 'GeoWork 团队', en: 'GeoWork Team' },
    readingTime: { zh: '6 分钟', en: '6 min read' },
    tags: {
      zh: ['架构', 'local-first', '数据主权'],
      en: ['Architecture', 'Local-first', 'Data sovereignty'],
    },
  },
  // ─── Engineering ────────────────────────────────────────
  {
    slug: 'go-runtime-internals',
    section: 'engineering',
    path: '/engineering/go-runtime-internals',
    title: {
      zh: 'Go Runtime 内部机制',
      en: 'Go Runtime internals',
    },
    description: {
      zh: '深入 GeoWork Go Runtime 的对象管理、任务调度、事件总线与 MCP 暴露实现。',
      en: 'Deep dive into GeoWork Go Runtime: object management, task scheduling, event bus, and MCP exposure.',
    },
    date: '2026-07-08',
    author: { zh: 'GeoWork 工程', en: 'GeoWork Engineering' },
    readingTime: { zh: '12 分钟', en: '12 min read' },
    tags: {
      zh: ['Go', 'Runtime', '架构', 'MCP'],
      en: ['Go', 'Runtime', 'Architecture', 'MCP'],
    },
  },
  // ─── Help ───────────────────────────────────────────────
  {
    slug: 'install',
    section: 'help',
    path: '/help/install',
    title: {
      zh: '安装 GeoWork',
      en: 'Install GeoWork',
    },
    description: {
      zh: '系统要求、下载地址、安装方式与首次启动验证。Windows x64 安装包与绿色版双路径。',
      en: 'System requirements, download URLs, installation methods, and first-launch verification. Windows x64 installer and portable zip.',
    },
    date: '2026-07-05',
    author: { zh: 'GeoWork 文档', en: 'GeoWork Docs' },
    readingTime: { zh: '5 分钟', en: '5 min read' },
    tags: {
      zh: ['安装', '入门', 'Windows'],
      en: ['Install', 'Onboarding', 'Windows'],
    },
  },
  // ─── Learn ──────────────────────────────────────────────
  {
    slug: 'your-first-map',
    section: 'learn',
    path: '/learn/your-first-map',
    title: {
      zh: '你的第一张地图',
      en: 'Your first map',
    },
    description: {
      zh: '导入 GeoTIFF、设置样式、添加注记、导出地图。20 分钟完成 Dataset → Layer → Artifact 的完整流转。',
      en: 'Import a GeoTIFF, style it, add annotations, and export a map. Complete the Dataset → Layer → Artifact flow in 20 minutes.',
    },
    date: '2026-07-03',
    author: { zh: 'GeoWork 学院', en: 'GeoWork Academy' },
    readingTime: { zh: '20 分钟', en: '20 min read' },
    tags: {
      zh: ['教程', '入门', '地图', 'Beginner'],
      en: ['Tutorial', 'Onboarding', 'Map', 'Beginner'],
    },
  },
];

export const articleMap: Record<string, ArticleMeta> = Object.fromEntries(
  articles.map((a) => [a.slug, a]),
);

export function getArticle(slug: string): ArticleMeta | undefined {
  return articleMap[slug];
}

export function getArticlesBySection(section: ArticleSection): ArticleMeta[] {
  return articles.filter((a) => a.section === section);
}

/** Section 索引页路径,用于面包屑与"返回列表" */
export const sectionIndexPath: Record<ArticleSection, string> = {
  blog: '/blog',
  engineering: '/engineering',
  help: '/help',
  learn: '/learn',
};
