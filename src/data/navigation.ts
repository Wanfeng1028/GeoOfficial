import type { NavigationIconName } from '@/components/icons/navigation/NavigationIcon';

/**
 * v2.5 Navigation Structure
 * Per: GeoOfficial-官网全站开发计划-v2.5.0-Attio截图驱动版.md section 6
 *
 * Main nav: Platform ▼, Resources ▼, Use Cases, Plans
 * Platform mega menu: 5 groups (GEOWORK PLATFORM, AGENTS AND WORKFLOWS, ANALYSIS AND OUTPUTS, ECOSYSTEM, GET STARTED)
 * Resources mega menu: 4 groups (SUPPORT, DEVELOPERS, COMMUNITY, PROJECT)
 *
 * 每个菜单项包含：
 * - iconKey: 对应 NavigationIcon 组件中的图标
 * - label: 中文标题（英文页面也保留产品名英文）
 * - enLabel: 英文标题（与 label 相同时可省略）
 * - href: 独立路由
 * - description: 中文描述
 * - enDescription: 英文描述
 */

export interface NavItem {
  label: string;
  /** 英文标题；省略时回退到 label */
  enLabel?: string;
  href: string;
  external?: boolean;
  description?: string;
  enDescription?: string;
  iconKey?: NavigationIconName;
}

export interface NavGroup {
  label: string;
  /** 英文分组标题；省略时回退到 label */
  enLabel?: string;
  items: NavItem[];
}

export interface NavMegaMenu {
  label: string;
  groups: NavGroup[];
}

export const mainNavigation = [
  { label: 'Platform', href: '/platform', hasMega: true },
  { label: 'Resources', href: '/resources', hasMega: true },
  { label: 'Use Cases', href: '/use-cases' },
  { label: 'Plans', href: '/plans' },
] as const;

export const platformMegaMenu: NavMegaMenu = {
  label: 'Platform',
  groups: [
    {
      label: 'GEOWORK 平台',
      enLabel: 'GEOWORK PLATFORM',
      items: [
        {
          label: '助手',
          enLabel: 'Assistant',
          href: '/platform/assistant',
          description: '查询项目、理解数据并发起任务。',
          enDescription: 'Query projects, understand data, and kick off tasks.',
          iconKey: 'assistant',
        },
        {
          label: 'AI',
          enLabel: 'AI',
          href: '/platform/ai',
          description: '使用专业 Agent 规划、执行和验证工作。',
          enDescription: 'Plan, execute, and verify work with specialized agents.',
          iconKey: 'ai',
        },
        {
          label: '数据模型',
          enLabel: 'Data model',
          href: '/platform/data',
          description: '组织项目、数据、图层、任务和成果。',
          enDescription: 'Organize projects, data, layers, tasks, and outputs.',
          iconKey: 'dataModel',
        },
        {
          label: '项目上下文',
          enLabel: 'Project Context',
          href: '/platform/context',
          description: '连接数据、地图、代码、工具与执行历史。',
          enDescription: 'Connect data, maps, code, tools, and execution history.',
          iconKey: 'projectContext',
        },
      ],
    },
    {
      label: '智能体与工作流',
      enLabel: 'AGENTS AND WORKFLOWS',
      items: [
        {
          label: '工作流',
          enLabel: 'Workflows',
          href: '/platform/workflows',
          description: '从问题定义到成果交付组织完整流程。',
          enDescription: 'Organize end-to-end processes from question to delivery.',
          iconKey: 'workflows',
        },
        {
          label: '任务序列',
          enLabel: 'Task sequences',
          href: '/platform/task-sequences',
          description: '批量、定时和多阶段执行地理处理任务。',
          enDescription: 'Batch, schedule, and multi-stage geoprocessing tasks.',
          iconKey: 'taskSequences',
        },
      ],
    },
    {
      label: '分析与产出',
      enLabel: 'ANALYSIS AND OUTPUTS',
      items: [
        {
          label: '研究智能',
          enLabel: 'Research intelligence',
          href: '/platform/research-intelligence',
          description: '整理文献、日志、会议和研究记录。',
          enDescription: 'Organize literature, logs, meetings, and research notes.',
          iconKey: 'researchIntelligence',
        },
        {
          label: '报告',
          enLabel: 'Reporting',
          href: '/platform/reporting',
          description: '生成地图、图表、指标和研究报告。',
          enDescription: 'Generate maps, charts, metrics, and research reports.',
          iconKey: 'reporting',
        },
      ],
    },
    {
      label: '生态',
      enLabel: 'ECOSYSTEM',
      items: [
        {
          label: '开发者平台',
          enLabel: 'Developer Platform',
          href: '/platform/developers',
          description: '通过 API、SDK、MCP、Skills 和插件扩展。',
          enDescription: 'Extend via API, SDK, MCP, Skills, and plugins.',
          iconKey: 'developerPlatform',
        },
        {
          label: '工具与集成',
          enLabel: 'Tools & integrations',
          href: '/ecosystem',
          description: '连接 QGIS、GDAL、Python、PostGIS 和 GEE。',
          enDescription: 'Connect QGIS, GDAL, Python, PostGIS, and GEE.',
          iconKey: 'toolsIntegrations',
        },
      ],
    },
    {
      label: '开始使用',
      enLabel: 'GET STARTED',
      items: [
        { label: 'GeoWork 101', href: '/getting-started' },
        { label: '专家与贡献者', enLabel: 'Experts & contributors', href: '/community/experts' },
        { label: '教育与科研计划', enLabel: 'Education & research', href: '/programs/education-research' },
        { label: '联系我们', enLabel: 'Contact us', href: '/contact' },
      ],
    },
  ],
};

export const resourcesMegaMenu: NavMegaMenu = {
  label: 'Resources',
  groups: [
    {
      label: '支持',
      enLabel: 'SUPPORT',
      items: [
        {
          label: '帮助中心',
          enLabel: 'Help Center',
          href: '/help',
          description: 'GeoWork 入门、使用和故障排查。',
          enDescription: 'Get started, usage, and troubleshooting for GeoWork.',
          iconKey: 'help',
        },
        {
          label: '学习 GeoWork',
          enLabel: 'Learn GeoWork',
          href: '/learn',
          description: '以真实任务学习地理空间工作流。',
          enDescription: 'Learn geospatial workflows through real tasks.',
          iconKey: 'learn',
        },
      ],
    },
    {
      label: '开发者',
      enLabel: 'DEVELOPERS',
      items: [
        {
          label: '文档',
          enLabel: 'Documentation',
          href: '/docs',
          description: 'API、SDK、MCP、Skills 和插件文档。',
          enDescription: 'API, SDK, MCP, Skills, and plugin docs.',
          iconKey: 'docs',
        },
        {
          label: '开发者平台',
          enLabel: 'Developer Platform',
          href: '/platform/developers',
          description: '构建 GeoWork 扩展和外部连接。',
          enDescription: 'Build GeoWork extensions and external integrations.',
          iconKey: 'developerPlatform',
        },
      ],
    },
    {
      label: '社区',
      enLabel: 'COMMUNITY',
      items: [
        {
          label: '合作伙伴',
          enLabel: 'Partners',
          href: '/partners',
          description: '高校、科研、开源和工具合作。',
          enDescription: 'University, research, open source, and tool partnerships.',
          iconKey: 'partners',
        },
        {
          label: '教育与科研',
          enLabel: 'Education & Research',
          href: '/programs/education-research',
          description: '教育、科研和早期体验计划。',
          enDescription: 'Education, research, and early access programs.',
          iconKey: 'educationResearch',
        },
      ],
    },
    {
      label: '项目',
      enLabel: 'PROJECT',
      items: [
        {
          label: '更新日志',
          enLabel: 'Changelog',
          href: '/changelog',
          description: '真实记录功能、设计和技术进展。',
          enDescription: 'Honest records of feature, design, and engineering progress.',
          iconKey: 'changelog',
        },
        {
          label: '博客',
          enLabel: 'Blog',
          href: '/blog',
          description: '产品、案例和项目动态。',
          enDescription: 'Product, case studies, and project updates.',
          iconKey: 'blog',
        },
        {
          label: '工程',
          enLabel: 'Engineering',
          href: '/engineering',
          description: '架构、GIS、遥感和 AI 工程实践。',
          enDescription: 'Architecture, GIS, remote sensing, and AI engineering.',
          iconKey: 'engineering',
        },
        {
          label: '职业与贡献',
          enLabel: 'Careers / Contribute',
          href: '/careers',
          description: '加入项目、社区贡献和未来机会。',
          enDescription: 'Join the project, contribute, and future opportunities.',
          iconKey: 'careers',
        },
      ],
    },
  ],
};

// 兼容旧导出
export const productMegaMenu = platformMegaMenu;
export const workflowsMegaMenu = resourcesMegaMenu;

export const footerNavigation = [
  {
    title: '平台',
    titleKey: 'platform',
    links: [
      { label: 'Assistant', href: '/platform/assistant' },
      { label: 'AI', href: '/platform/ai' },
      { label: 'Data model', href: '/platform/data' },
      { label: 'Workflows', href: '/platform/workflows' },
      { label: 'Ecosystem', href: '/ecosystem' },
    ],
  },
  {
    title: '资源',
    titleKey: 'resources',
    links: [
      { label: 'Help Center', href: '/help' },
      { label: 'Learn', href: '/learn' },
      { label: 'Docs', href: '/docs' },
      { label: 'Changelog', href: '/changelog' },
      { label: 'Blog', href: '/blog' },
      { label: 'Engineering', href: '/engineering' },
    ],
  },
  {
    title: '项目',
    titleKey: 'project',
    links: [
      { label: '使用案例', href: '/use-cases' },
      { label: '版本与获取', href: '/plans' },
      { label: '关于', href: '/about' },
      { label: 'Manifesto', href: '/manifesto' },
      { label: '下载', href: '/download' },
      { label: 'Careers', href: '/careers' },
    ],
  },
  {
    title: '法律',
    titleKey: 'legal',
    links: [
      { label: '隐私', href: '/privacy' },
      { label: '条款', href: '/terms' },
      { label: '安全', href: '/security' },
      { label: 'Status', href: '/status' },
      {
        label: 'GitHub',
        href: 'https://github.com/Wanfeng1028/GeoWork',
        external: true,
      },
    ],
  },
] as const;
