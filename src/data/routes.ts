/**
 * v2.5 Centralized Route Metadata Registry
 * Per: GeoOfficial-官网全站开发计划-v2.5.0-Attio截图驱动版.md section 7
 *
 * Single source of truth for:
 * - All target routes (path without locale prefix)
 * - Bilingual metadata (title/description/h1 in zh/en)
 * - Attio reference page binding (for visual alignment in Iteration 11)
 * - Route category for grouping
 *
 * Iteration 1 uses this registry to generate skeleton pages.
 * Later iterations consume the same registry for sitemap, tests, and visual alignment.
 */

export type RouteCategory =
  | 'core'
  | 'platform'
  | 'ecosystem'
  | 'get-started'
  | 'resources'
  | 'use-cases'
  | 'project'
  | 'distribution';

export interface RouteMeta {
  /** Path without locale prefix, e.g. '/platform/assistant' */
  path: string;
  category: RouteCategory;
  /** Attio reference URL for visual alignment (Iteration 11) */
  attioRef?: string;
  title: { zh: string; en: string };
  description: { zh: string; en: string };
  h1: { zh: string; en: string };
}

/**
 * All target routes per v2.5 plan section 7.
 * Existing routes are included here too so the registry stays the single source of truth.
 */
export const routes: RouteMeta[] = [
  // ─── 7.1 Core ──────────────────────────────────────────────────────────────
  {
    path: '',
    category: 'core',
    attioRef: 'https://attio.com',
    title: { zh: 'GeoWork — 地理空间工作，汇聚一处', en: 'GeoWork — Geospatial work, in one place.' },
    description: {
      zh: 'GeoWork 将地图、遥感、代码、研究与自动化工作流汇于一个桌面工作台。',
      en: 'GeoWork brings maps, remote sensing, code, research, and automation into one desktop workspace.',
    },
    h1: { zh: '地图、遥感、代码和研究，\n在一个工作区里完成。', en: 'Maps, remote sensing, code, and research.\nOne workspace.' },
  },
  {
    path: '/platform',
    category: 'core',
    attioRef: 'https://attio.com/platform',
    title: { zh: '平台 · GeoWork', en: 'Platform · GeoWork' },
    description: {
      zh: 'GeoWork 平台概览：Assistant、AI、Data model、Project Context、Workflows 与开发者扩展能力。',
      en: 'GeoWork platform overview: Assistant, AI, Data model, Project Context, Workflows, and developer extensions.',
    },
    h1: { zh: '一个平台，贯穿地理空间工作的每个阶段。', en: 'One platform across every stage of geospatial work.' },
  },
  {
    path: '/resources',
    category: 'core',
    attioRef: 'https://attio.com/help',
    title: { zh: '资源 · GeoWork', en: 'Resources · GeoWork' },
    description: {
      zh: 'GeoWork 资源中心：帮助、学习、文档、更新日志、博客与工程实践。',
      en: 'GeoWork resources: help, learn, docs, changelog, blog, and engineering practices.',
    },
    h1: { zh: '学习、查阅与追踪 GeoWork 的所有资源。', en: 'Learn, reference, and track every GeoWork resource.' },
  },
  {
    path: '/use-cases',
    category: 'use-cases',
    attioRef: 'https://attio.com/customers',
    title: { zh: '使用案例 · GeoWork', en: 'Use cases · GeoWork' },
    description: {
      zh: 'GeoWork 真实地理空间工作案例：城市扩张、NDVI 时序与科研报告。',
      en: 'Real geospatial work on GeoWork: urban expansion, NDVI time series, and research reports.',
    },
    h1: { zh: '从问题到成果的完整工作过程。', en: 'Complete workflows from question to output.' },
  },
  {
    path: '/plans',
    category: 'core',
    attioRef: 'https://attio.com/pricing',
    title: { zh: '版本与获取 · GeoWork', en: 'Plans · GeoWork' },
    description: {
      zh: 'GeoWork 当前处于 Developer Preview，开源开发。查看获取方式、系统要求与未来计划。',
      en: 'GeoWork is in Developer Preview, open source. See how to get it, system requirements, and roadmap.',
    },
    h1: { zh: '获取 GeoWork：当前阶段与未来计划。', en: 'Get GeoWork: current stage and what comes next.' },
  },

  // ─── 7.2 Platform ──────────────────────────────────────────────────────────
  {
    path: '/platform/assistant',
    category: 'platform',
    attioRef: 'https://attio.com/platform/ask',
    title: { zh: 'Assistant · 平台 · GeoWork', en: 'Assistant · Platform · GeoWork' },
    description: {
      zh: 'GeoWork Assistant：查询项目、理解数据并发起任务，连接项目上下文与工具。',
      en: 'GeoWork Assistant: query projects, understand data, and start tasks — wired to project context and tools.',
    },
    h1: { zh: 'Assistant：用自然语言驱动地理空间工作。', en: 'Assistant: drive geospatial work in natural language.' },
  },
  {
    path: '/platform/ai',
    category: 'platform',
    attioRef: 'https://attio.com/platform/ai',
    title: { zh: 'AI · 平台 · GeoWork', en: 'AI · Platform · GeoWork' },
    description: {
      zh: 'GeoWork AI：使用专业 Agent 规划、执行和验证地理空间工作流。',
      en: 'GeoWork AI: specialized agents that plan, execute, and verify geospatial workflows.',
    },
    h1: { zh: 'AI Agent 负责执行，你负责判断。', en: 'AI agents execute. You decide.' },
  },
  {
    path: '/platform/data',
    category: 'platform',
    attioRef: 'https://attio.com/platform/data',
    title: { zh: 'Data model · 平台 · GeoWork', en: 'Data model · Platform · GeoWork' },
    description: {
      zh: 'GeoWork 数据模型：Project / Dataset / Layer / Task / Artifact 五个核心对象在统一上下文中连续工作。',
      en: 'GeoWork data model: Project / Dataset / Layer / Task / Artifact — five core objects in one continuous context.',
    },
    h1: { zh: '五个核心对象，一个项目上下文。', en: 'Five core objects. One project context.' },
  },
  {
    path: '/platform/context',
    category: 'platform',
    attioRef: 'https://attio.com/platform',
    title: { zh: 'Project Context · 平台 · GeoWork', en: 'Project Context · Platform · GeoWork' },
    description: {
      zh: 'Project Context 连接数据、地图、代码、工具与执行历史，让每个对象保持上下文。',
      en: 'Project Context ties data, maps, code, tools, and execution history together so every object keeps its context.',
    },
    h1: { zh: '同一个项目上下文，贯穿数据、地图、代码与成果。', en: 'One project context across data, maps, code, and outputs.' },
  },
  {
    path: '/platform/workflows',
    category: 'platform',
    attioRef: 'https://attio.com/platform/workflows',
    title: { zh: 'Workflows · 平台 · GeoWork', en: 'Workflows · Platform · GeoWork' },
    description: {
      zh: 'GeoWork Workflows：从问题定义到成果交付组织完整地理空间工作流程。',
      en: 'GeoWork Workflows: organize end-to-end geospatial work from question to deliverable.',
    },
    h1: { zh: '从问题到成果的工作流程，连续可追踪。', en: 'Workflows from question to output, continuous and traceable.' },
  },
  {
    path: '/platform/task-sequences',
    category: 'platform',
    attioRef: 'https://attio.com/platform/sequences',
    title: { zh: 'Task sequences · 平台 · GeoWork', en: 'Task sequences · Platform · GeoWork' },
    description: {
      zh: '批量、定时和多阶段执行地理处理任务，Task sequences 让重复工作自动化。',
      en: 'Batch, scheduled, and multi-stage geoprocessing tasks — Task sequences automate repetitive work.',
    },
    h1: { zh: '批量、定时、多阶段任务，自动执行。', en: 'Batch, scheduled, multi-stage tasks — automated.' },
  },
  {
    path: '/platform/research-intelligence',
    category: 'platform',
    attioRef: 'https://attio.com/platform/call-intelligence',
    title: { zh: 'Research intelligence · 平台 · GeoWork', en: 'Research intelligence · Platform · GeoWork' },
    description: {
      zh: '整理文献、日志、会议和研究记录，让研究过程可检索、可引用。',
      en: 'Organize literature, logs, meetings, and research notes — searchable and citable.',
    },
    h1: { zh: '研究材料不再散落，研究过程可回溯。', en: 'Research materials in one place. Process traceable.' },
  },
  {
    path: '/platform/reporting',
    category: 'platform',
    attioRef: 'https://attio.com/platform/reporting',
    title: { zh: 'Reporting · 平台 · GeoWork', en: 'Reporting · Platform · GeoWork' },
    description: {
      zh: '生成地图、图表、指标和研究报告，成果可直接继续工作。',
      en: 'Generate maps, charts, metrics, and research reports — outputs you can keep working with.',
    },
    h1: { zh: '报告是工作的继续，不是结束。', en: 'Reports continue the work. They don\'t end it.' },
  },
  {
    path: '/platform/developers',
    category: 'platform',
    attioRef: 'https://attio.com/platform/developers',
    title: { zh: 'Developer Platform · 平台 · GeoWork', en: 'Developer Platform · Platform · GeoWork' },
    description: {
      zh: '通过 API、SDK、MCP、Skills 和插件扩展 GeoWork，连接外部工具与服务。',
      en: 'Extend GeoWork with API, SDK, MCP, Skills, and plugins. Connect external tools and services.',
    },
    h1: { zh: '在清晰的架构之上扩展 GeoWork。', en: 'Extend GeoWork on a clear architecture.' },
  },
  {
    path: '/ecosystem',
    category: 'ecosystem',
    attioRef: 'https://attio.com/apps',
    title: { zh: 'Ecosystem · GeoWork', en: 'Ecosystem · GeoWork' },
    description: {
      zh: 'GeoWork 生态：连接 QGIS、GDAL、Python、PostGIS、GEE、MCP、Skills 与插件。',
      en: 'GeoWork ecosystem: connect QGIS, GDAL, Python, PostGIS, GEE, MCP, Skills, and plugins.',
    },
    h1: { zh: '连接你的地理工具栈，不替代它。', en: 'Connect your geospatial stack. Don\'t replace it.' },
  },

  // ─── 7.3 Get Started ───────────────────────────────────────────────────────
  {
    path: '/getting-started',
    category: 'get-started',
    attioRef: 'https://attio.com/help/reference/attio-101',
    title: { zh: 'GeoWork 101 · GeoWork', en: 'GeoWork 101 · GeoWork' },
    description: {
      zh: '从零开始使用 GeoWork：安装、首个项目、Work / Code / Map 模式与基础工作流。',
      en: 'Start with GeoWork: install, first project, Work / Code / Map modes, and basic workflows.',
    },
    h1: { zh: 'GeoWork 101：从第一个项目开始。', en: 'GeoWork 101: start with your first project.' },
  },
  {
    path: '/community/experts',
    category: 'get-started',
    title: { zh: '专家与贡献者 · GeoWork', en: 'Experts & contributors · GeoWork' },
    description: {
      zh: 'GeoWork 专家与贡献者：来自 GIS、遥感、科研与工程社区的伙伴。',
      en: 'GeoWork experts and contributors: from GIS, remote sensing, research, and engineering communities.',
    },
    h1: { zh: 'GeoWork 背后的人。', en: 'The people behind GeoWork.' },
  },
  {
    path: '/programs/education-research',
    category: 'get-started',
    attioRef: 'https://attio.com/startups',
    title: { zh: '教育与科研计划 · GeoWork', en: 'Education & Research program · GeoWork' },
    description: {
      zh: '面向高校、科研机构与学生的 GeoWork 教育与科研支持计划。',
      en: 'GeoWork education and research support for universities, labs, and students.',
    },
    h1: { zh: '支持教育与科研：GeoWork 早期体验计划。', en: 'Supporting education and research: GeoWork early access program.' },
  },
  {
    path: '/contact',
    category: 'get-started',
    attioRef: 'https://attio.com/contact/sales',
    title: { zh: '联系我们 · GeoWork', en: 'Contact · GeoWork' },
    description: {
      zh: '联系 GeoWork 团队：合作、教育、科研、媒体与社区贡献。',
      en: 'Contact the GeoWork team: partnerships, education, research, press, and community contributions.',
    },
    h1: { zh: '联系 GeoWork 团队。', en: 'Contact the GeoWork team.' },
  },

  // ─── 7.4 Resources ─────────────────────────────────────────────────────────
  {
    path: '/help',
    category: 'resources',
    attioRef: 'https://attio.com/help',
    title: { zh: '帮助中心 · GeoWork', en: 'Help Center · GeoWork' },
    description: {
      zh: 'GeoWork 入门、使用和故障排查帮助文章。',
      en: 'GeoWork onboarding, usage, and troubleshooting articles.',
    },
    h1: { zh: '帮助中心：用得明白，排得清楚。', en: 'Help Center: understand it, fix it.' },
  },
  {
    path: '/learn',
    category: 'resources',
    attioRef: 'https://attio.com/help/academy',
    title: { zh: 'Learn GeoWork · GeoWork', en: 'Learn GeoWork · GeoWork' },
    description: {
      zh: '以真实任务学习地理空间工作流，从数据准备到成果交付。',
      en: 'Learn geospatial workflows through real tasks — from data prep to deliverable.',
    },
    h1: { zh: '通过真实任务学习 GeoWork。', en: 'Learn GeoWork through real tasks.' },
  },
  {
    path: '/docs',
    category: 'resources',
    title: { zh: '文档 · GeoWork', en: 'Docs · GeoWork' },
    description: {
      zh: 'GeoWork 文档入口：API、SDK、MCP、Skills 与插件。',
      en: 'GeoWork docs gateway: API, SDK, MCP, Skills, and plugins.',
    },
    h1: { zh: 'GeoWork 文档入口。', en: 'GeoWork docs gateway.' },
  },
  {
    path: '/partners',
    category: 'resources',
    attioRef: 'https://attio.com/partners',
    title: { zh: '合作伙伴 · GeoWork', en: 'Partners · GeoWork' },
    description: {
      zh: 'GeoWork 合作伙伴：高校、科研、开源与工具生态合作。',
      en: 'GeoWork partners: universities, research, open source, and tool ecosystem.',
    },
    h1: { zh: '与高校、科研和开源社区一起构建 GeoWork。', en: 'Building GeoWork with universities, research, and open source.' },
  },
  {
    path: '/blog',
    category: 'resources',
    attioRef: 'https://attio.com/blog',
    title: { zh: '博客 · GeoWork', en: 'Blog · GeoWork' },
    description: {
      zh: 'GeoWork 产品、案例与项目动态。',
      en: 'GeoWork product, cases, and project updates.',
    },
    h1: { zh: 'GeoWork 博客：产品、案例与动态。', en: 'GeoWork blog: product, cases, and updates.' },
  },
  {
    path: '/engineering',
    category: 'resources',
    attioRef: 'https://attio.com/engineering/blog',
    title: { zh: '工程实践 · GeoWork', en: 'Engineering · GeoWork' },
    description: {
      zh: 'GeoWork 架构、GIS、遥感与 AI 工程实践文章。',
      en: 'GeoWork architecture, GIS, remote sensing, and AI engineering articles.',
    },
    h1: { zh: '工程实践：架构、GIS、遥感与 AI。', en: 'Engineering: architecture, GIS, remote sensing, and AI.' },
  },
  {
    path: '/careers',
    category: 'resources',
    attioRef: 'https://attio.com/careers',
    title: { zh: '加入与贡献 · GeoWork', en: 'Careers / Contribute · GeoWork' },
    description: {
      zh: '加入 GeoWork 项目、参与社区贡献，或查看未来合作机会。',
      en: 'Join the GeoWork project, contribute to the community, or explore future opportunities.',
    },
    h1: { zh: '加入 GeoWork：参与、贡献或合作。', en: 'Join GeoWork: contribute, build, or partner.' },
  },
  {
    path: '/changelog',
    category: 'resources',
    attioRef: 'https://attio.com/changelog',
    title: { zh: '更新日志 · GeoWork', en: 'Changelog · GeoWork' },
    description: {
      zh: 'GeoWork 版本变化、发布日期、修复和已知问题。',
      en: 'GeoWork version changes, release dates, fixes, and known issues.',
    },
    h1: { zh: '版本变化记录。', en: 'Version changes, in order.' },
  },

  // ─── 7.5 Use Cases (fixed slugs for v2.5) ──────────────────────────────────
  {
    path: '/use-cases/urban-expansion',
    category: 'use-cases',
    attioRef: 'https://attio.com/customers',
    title: { zh: '城市扩张分析 · 使用案例 · GeoWork', en: 'Urban expansion · Use case · GeoWork' },
    description: {
      zh: '使用 GeoWork 完成多时相城市扩张分析：数据准备、变化检测、统计与制图。',
      en: 'Multi-temporal urban expansion analysis on GeoWork: data prep, change detection, statistics, and mapping.',
    },
    h1: { zh: '城市扩张：从多时相影像到建成区变化。', en: 'Urban expansion: from multi-temporal imagery to built-up change.' },
  },
  {
    path: '/use-cases/ndvi-time-series',
    category: 'use-cases',
    attioRef: 'https://attio.com/customers',
    title: { zh: 'NDVI 时序分析 · 使用案例 · GeoWork', en: 'NDVI time series · Use case · GeoWork' },
    description: {
      zh: '使用 GeoWork 完成 NDVI 时序分析：影像合成、指标计算、趋势分析与异常检测。',
      en: 'NDVI time series analysis on GeoWork: image compositing, index computation, trend analysis, and anomaly detection.',
    },
    h1: { zh: 'NDVI 时序：植被变化趋势与异常。', en: 'NDVI time series: vegetation trends and anomalies.' },
  },
  {
    path: '/use-cases/research-report',
    category: 'use-cases',
    attioRef: 'https://attio.com/customers',
    title: { zh: '科研报告生成 · 使用案例 · GeoWork', en: 'Research report · Use case · GeoWork' },
    description: {
      zh: '使用 GeoWork 从文献整理、数据分析到报告生成的完整科研工作流。',
      en: 'Complete research workflow on GeoWork: from literature review to data analysis and report generation.',
    },
    h1: { zh: '科研报告：从文献到成果的完整链路。', en: 'Research report: the full chain from literature to output.' },
  },

  // ─── 7.6 Project / Company ─────────────────────────────────────────────────
  {
    path: '/about',
    category: 'project',
    title: { zh: '关于 · GeoWork', en: 'About · GeoWork' },
    description: {
      zh: 'GeoWork 项目动机、开源方式、许可边界与仓库关系。',
      en: 'GeoWork project motivation, open source approach, license scope, and repository relationships.',
    },
    h1: { zh: '为地理空间工作而生的桌面工作台。', en: 'A desktop workspace built for geospatial work.' },
  },
  {
    path: '/manifesto',
    category: 'project',
    attioRef: 'https://attio.com/redefine',
    title: { zh: 'Manifesto · GeoWork', en: 'Manifesto · GeoWork' },
    description: {
      zh: 'GeoWork 宣言：为什么地理空间工作需要统一工作区。',
      en: 'GeoWork manifesto: why geospatial work needs one workspace.',
    },
    h1: { zh: '我们不是在解决一个工具问题。', en: 'We are not solving a tool problem.' },
  },

  // ─── 7.7 Distribution / Trust ──────────────────────────────────────────────
  {
    path: '/download',
    category: 'distribution',
    attioRef: 'https://attio.com/download',
    title: { zh: '下载 · GeoWork', en: 'Download · GeoWork' },
    description: {
      zh: 'GeoWork 下载、版本、平台与系统要求。当前处于 Developer Preview。',
      en: 'GeoWork downloads, versions, platforms, and system requirements. Currently in Developer Preview.',
    },
    h1: { zh: '开始使用 GeoWork。', en: 'Start with GeoWork.' },
  },
  {
    path: '/status',
    category: 'distribution',
    title: { zh: '服务状态 · GeoWork', en: 'Status · GeoWork' },
    description: {
      zh: 'GeoWork 仓库、文档与官网运行状态。',
      en: 'GeoWork repository, docs, and website operational status.',
    },
    h1: { zh: 'GeoWork 运行状态。', en: 'GeoWork operational status.' },
  },
  {
    path: '/trust',
    category: 'distribution',
    title: { zh: '信任 · GeoWork', en: 'Trust · GeoWork' },
    description: {
      zh: 'GeoWork 信任中心：隐私、安全、数据处理与合规说明。',
      en: 'GeoWork trust center: privacy, security, data handling, and compliance.',
    },
    h1: { zh: '信任中心：本地优先，透明可查。', en: 'Trust center: local-first, transparent, auditable.' },
  },
  {
    path: '/security',
    category: 'distribution',
    title: { zh: '安全 · GeoWork', en: 'Security · GeoWork' },
    description: {
      zh: 'GeoWork 安全实践：本地优先架构、数据处理边界与第三方服务连接。',
      en: 'GeoWork security practices: local-first architecture, data boundaries, and third-party service connections.',
    },
    h1: { zh: '安全实践：本地优先，边界清晰。', en: 'Security: local-first, clear boundaries.' },
  },
  {
    path: '/privacy',
    category: 'distribution',
    title: { zh: '隐私 · GeoWork', en: 'Privacy · GeoWork' },
    description: {
      zh: 'GeoWork 官网数据处理说明。',
      en: 'GeoWork website data handling statement.',
    },
    h1: { zh: '官网数据处理说明。', en: 'Website data handling statement.' },
  },
  {
    path: '/terms',
    category: 'distribution',
    title: { zh: '使用条款 · GeoWork', en: 'Terms · GeoWork' },
    description: {
      zh: 'GeoWork 官网与下载使用条款。',
      en: 'GeoWork website and download terms of use.',
    },
    h1: { zh: '使用条款。', en: 'Terms of use.' },
  },

  // ─── Existing routes kept for backward compat during migration ────────────
  {
    path: '/product',
    category: 'core',
    title: { zh: '产品 · GeoWork', en: 'Product · GeoWork' },
    description: {
      zh: 'GeoWork 产品工作台、对象、模式与可扩展能力。',
      en: 'GeoWork product workspace, objects, modes, and extensibility.',
    },
    h1: { zh: '一个工作台，贯穿项目到成果。', en: 'One workspace, from project to output.' },
  },
  {
    path: '/developers',
    category: 'platform',
    attioRef: 'https://attio.com/platform/developers',
    title: { zh: '开发者 · GeoWork', en: 'Developers · GeoWork' },
    description: {
      zh: 'GeoWork 开发者文档、架构参考和扩展指南。',
      en: 'GeoWork developer docs, architecture references, and extension guides.',
    },
    h1: { zh: '在清晰的本地架构之上扩展。', en: 'Extend on a clear local architecture.' },
  },
];

/**
 * Lookup map by path (without locale prefix).
 * Use `getRouteMeta('/platform/assistant')` to fetch metadata.
 */
export const routeMap: Record<string, RouteMeta> = Object.fromEntries(
  routes.map((r) => [r.path, r]),
);

export function getRouteMeta(path: string): RouteMeta | undefined {
  return routeMap[path];
}

/**
 * All paths for sitemap generation (without locale prefix).
 * Excludes the dynamic [slug] routes — those are handled separately.
 */
export const staticRoutePaths: string[] = routes
  .filter((r) => !r.path.includes('['))
  .map((r) => r.path);

/**
 * Dynamic route configurations for sitemap generation.
 * Each entry lists the concrete slugs that exist for v2.5.
 */
export const dynamicRouteConfigs: { pattern: string; slugs: string[] }[] = [
  { pattern: '/ecosystem/[slug]', slugs: ['qgis', 'gdal', 'python', 'postgis', 'google-earth-engine', 'mcp', 'skills', 'plugins'] },
  { pattern: '/use-cases/[slug]', slugs: ['urban-expansion', 'ndvi-time-series', 'research-report'] },
  { pattern: '/changelog/[slug]', slugs: [] }, // populated from GitHub releases in later iteration
  { pattern: '/blog/[slug]', slugs: [] }, // empty for v2.5 skeleton
  { pattern: '/engineering/[slug]', slugs: [] }, // empty for v2.5 skeleton
  { pattern: '/help/[slug]', slugs: [] }, // empty for v2.5 skeleton
  { pattern: '/learn/[slug]', slugs: [] }, // empty for v2.5 skeleton
];

/**
 * Ecosystem detail page metadata (the 8 GeoWork ecosystem entries).
 * Used by /ecosystem/[slug] to render concrete detail pages.
 */
export interface EcosystemEntry {
  slug: string;
  attioRef?: string;
  title: { zh: string; en: string };
  description: { zh: string; en: string };
  h1: { zh: string; en: string };
}

export const ecosystemEntries: EcosystemEntry[] = [
  {
    slug: 'qgis',
    attioRef: 'https://attio.com/apps',
    title: { zh: 'QGIS · Ecosystem · GeoWork', en: 'QGIS · Ecosystem · GeoWork' },
    description: { zh: 'GeoWork 与 QGIS 的连接：图层共享、处理工具与项目同步。', en: 'GeoWork ↔ QGIS: shared layers, processing tools, and project sync.' },
    h1: { zh: 'QGIS：桌面 GIS 的核心连接。', en: 'QGIS: the desktop GIS core connection.' },
  },
  {
    slug: 'gdal',
    title: { zh: 'GDAL · Ecosystem · GeoWork', en: 'GDAL · Ecosystem · GeoWork' },
    description: { zh: 'GeoWork 通过 GDAL 完成栅格与矢量格式转换、投影与裁剪。', en: 'GeoWork uses GDAL for raster/vector format conversion, projection, and clipping.' },
    h1: { zh: 'GDAL：地理数据格式与变换底座。', en: 'GDAL: the geospatial format and transform foundation.' },
  },
  {
    slug: 'python',
    title: { zh: 'Python · Ecosystem · GeoWork', en: 'Python · Ecosystem · GeoWork' },
    description: { zh: 'GeoWork 内置 Python Geo Worker，连接 rasterio、geopandas、xarray 等生态。', en: 'GeoWork ships a Python Geo Worker connecting rasterio, geopandas, xarray, and more.' },
    h1: { zh: 'Python：地理空间分析的事实标准。', en: 'Python: the de facto standard for geospatial analysis.' },
  },
  {
    slug: 'postgis',
    title: { zh: 'PostGIS · Ecosystem · GeoWork', en: 'PostGIS · Ecosystem · GeoWork' },
    description: { zh: 'GeoWork 连接 PostGIS 进行空间数据库查询与大规模矢量分析。', en: 'GeoWork connects to PostGIS for spatial database queries and large-scale vector analysis.' },
    h1: { zh: 'PostGIS：空间数据库的工业标准。', en: 'PostGIS: the industrial standard spatial database.' },
  },
  {
    slug: 'google-earth-engine',
    title: { zh: 'Google Earth Engine · Ecosystem · GeoWork', en: 'Google Earth Engine · Ecosystem · GeoWork' },
    description: { zh: 'GeoWork 集成 GEE 完成大规模遥感影像存取、合成与时序分析。', en: 'GeoWork integrates GEE for large-scale imagery access, compositing, and time-series analysis.' },
    h1: { zh: 'Google Earth Engine：行星级遥感存取。', en: 'Google Earth Engine: planetary-scale imagery access.' },
  },
  {
    slug: 'mcp',
    title: { zh: 'MCP · Ecosystem · GeoWork', en: 'MCP · Ecosystem · GeoWork' },
    description: { zh: 'Model Context Protocol 扩展，支持 AI 辅助地理空间工作。', en: 'Model Context Protocol extensions for AI-assisted geospatial work.' },
    h1: { zh: 'MCP：让 AI 真正理解地理空间工作。', en: 'MCP: making AI truly understand geospatial work.' },
  },
  {
    slug: 'skills',
    title: { zh: 'Skills · Ecosystem · GeoWork', en: 'Skills · Ecosystem · GeoWork' },
    description: { zh: '可复用的 GIS、遥感、报告生成工作流命令单元。', en: 'Reusable GIS, remote sensing, and report-generation workflow command units.' },
    h1: { zh: 'Skills：可复用的地理工作流单元。', en: 'Skills: reusable geospatial workflow units.' },
  },
  {
    slug: 'plugins',
    title: { zh: 'Plugins · Ecosystem · GeoWork', en: 'Plugins · Ecosystem · GeoWork' },
    description: { zh: '通过插件机制扩展 GeoWork 功能与界面。', en: 'Extend GeoWork features and UI through the plugin system.' },
    h1: { zh: 'Plugins：扩展 GeoWork 的功能与界面。', en: 'Plugins: extend GeoWork features and UI.' },
  },
];

export const ecosystemEntryMap: Record<string, EcosystemEntry> = Object.fromEntries(
  ecosystemEntries.map((e) => [e.slug, e]),
);
