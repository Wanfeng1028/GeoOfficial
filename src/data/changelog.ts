export interface ChangelogEntry {
  slug: string;
  version: string;
  title: string;
  date: string;
  summary: string;
  highlights: string[];
  fixes: string[];
  knownIssues: string[];
  releaseUrl: string;
  load: () => Promise<{ default: React.ComponentType }>;
}

export const changelogEntries: ChangelogEntry[] = [
  {
    slug: 'v0-4-developer-preview',
    version: 'v0.4.x-dev',
    title: 'GeoWork v0.4 Developer Preview',
    date: '2026-07-14',
    summary: '完善桌面工作台、运行时和地理空间 Worker 的开发版能力。',
    highlights: [
      '桌面工作台 Work / Code / Map 模式框架',
      'Go Runtime 任务编排基础',
      'Python Geo Worker 接入 QGIS / GDAL',
      'Skills 与 MCP 基础扩展机制',
    ],
    fixes: [],
    knownIssues: [
      '部分自动化能力仍属于 Developer Preview',
      'macOS 与 Linux 暂未提供官方构建',
      '报告自动生成需人工核对',
    ],
    releaseUrl: 'https://github.com/Wanfeng1028/GeoWork/releases',
    load: () => import('@/content/changelog/v0-4-developer-preview.mdx'),
  },
];
