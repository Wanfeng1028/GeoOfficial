import type { Locale } from './locale';

const dict = {
  zh: {
    nav: {
      product: '产品',
      workflows: '工作流',
      useCases: '使用案例',
      developers: '开发者',
      changelog: '更新日志',
      github: 'GitHub',
      exploreGeoWork: '了解 GeoWork',
      announcement: 'GeoWork 正在积极开发中',
      viewProgress: '查看进展',
      switchTo: 'English',
      about: '关于',
      download: '下载',
      privacy: '隐私',
      terms: '条款',
    },
    hero: {
      eyebrow: '地理空间工作台',
      title: '地图、遥感、代码和研究，\n在一个工作区里完成。',
      description:
        'GeoWork 将项目、地图、遥感数据、代码、工具与研究成果，组织在同一个连续工作区中。',
      primaryCta: '了解 GeoWork',
      secondaryCta: 'GitHub 仓库',
      status: 'Developer Preview',
    },
    productObjects: {
      eyebrow: 'FIG 1.1 · Product Objects',
      title: '项目中的每个对象，始终保持上下文。',
      description:
        'Project / Dataset / Layer / Task / Artifact — 五个核心对象在同一个工作区中连续工作。',
    },
    workflow: {
      eyebrow: 'Workflow',
      title: '从项目开始，以可继续工作的成果结束。',
      description:
        '一个 GeoWork 项目贯穿 Define → Organize → Analyze → Verify → Deliver 五个阶段，每个阶段的工作成果自然成为下一阶段的输入。',
    },
    modes: {
      eyebrow: '三种工作模式',
      title: 'Work / Code / Map，共享同一项目。',
      description:
        '在三种模式之间切换不会丢失上下文，工具、数据和成果保持连续。',
    },
    useCases: {
      eyebrow: '真实地理空间工作',
      title: '从问题到成果的完整工作过程。',
      description:
        '每个案例包含输入、过程、工具、输出和当前可用状态，不用抽象形容词替代成果。',
    },
    universalContext: {
      eyebrow: 'Universal Context',
      title: '同一个项目上下文，\n贯穿数据、地图、代码和成果。',
      description:
        'GeoWork 项目中的每个对象、每个操作和每份成果，都关联同一个项目上下文，不再需要反复切换工具和重建环境。',
      items: [
        { label: '项目记录自身', desc: '研究问题、区域、数据来源和验收标准，一次定义全程使用。' },
        { label: '工具彼此连接', desc: 'QGIS、GDAL、GEE、Python 在同一项目环境中运行，共享数据。' },
        { label: '地图和代码共享状态', desc: '多源影像、矢量图层、空间分析结果在同一画布中叠加。' },
        { label: '任何结果都能回溯', desc: '每个分析步骤可追踪，日志记录参数、输入、输出和运行状态。' },
        { label: '成果始终保持上下文', desc: '研究材料、参考文献和生成报告与项目关联，不散落在文件夹中。' },
        { label: 'Skills 与工具', desc: '可复用的 GIS 命令、遥感时序、报告生成 Skill 连接专业工具。' },
      ],
    },
    ecosystem: {
      eyebrow: 'Ecosystem',
      title: '连接你的地理工具栈。',
      description:
        'GeoWork 通过 Skills、MCP 和插件连接专业工具，不替代现有工具，而是提供统一的工作区和上下文。',
    },
    openDev: {
      title: 'GeoWork 正在开放开发中。',
      description:
        '仓库公开在 GitHub，当前处于 Developer Preview。参与贡献、查看路线图与发布记录均通过仓库入口。',
    },
    finalCta: {
      title: '让完整的地理空间工作，\n在 GeoWork 中连续发生。',
      description:
        '仓库公开在 GitHub，当前处于 Developer Preview。参与贡献、查看路线图与发布记录均通过仓库入口。',
      primaryBtn: '了解 GeoWork',
      secondaryBtn: 'GitHub 仓库',
    },
    footer: {
      tagline: 'Developer Preview',
      copyright: '© {year} GeoWork contributors. 仓库公开于 GitHub。',
    },
    changelog: {
      eyebrow: 'Changelog',
      title: '持续改进，每周更新。',
      description: '查看最新的 GeoWork 产品更新和改进。',
      viewAll: '查看全部',
    },
    quote: {
      text: 'GeoWork 想解决的不是某一个工具问题，\n而是地理空间工作在工具之间不断断裂的问题。',
      author: 'GeoWork 开发愿景',
    },
    localeSwitch: 'English',
  },
  en: {
    nav: {
      product: 'Product',
      workflows: 'Workflows',
      useCases: 'Use Cases',
      developers: 'Developers',
      changelog: 'Changelog',
      github: 'GitHub',
      exploreGeoWork: 'Explore GeoWork',
      announcement: 'GeoWork is in active development',
      viewProgress: 'View progress',
      switchTo: '中文',
      about: 'About',
      download: 'Download',
      privacy: 'Privacy',
      terms: 'Terms',
    },
    hero: {
      eyebrow: 'A workspace for geospatial work',
      title: 'Maps, remote sensing, code, and research.\nOne workspace.',
      description:
        'GeoWork organizes projects, maps, remote sensing data, code, tools, and research outcomes into one continuous workspace.',
      primaryCta: 'Explore GeoWork',
      secondaryCta: 'View on GitHub',
      status: 'Developer Preview',
    },
    productObjects: {
      eyebrow: 'FIG 1.1 · Product Objects',
      title: 'Every object in your project stays in context.',
      description:
        'Project / Dataset / Layer / Task / Artifact — five core objects working together in one workspace.',
    },
    workflow: {
      eyebrow: 'Workflow',
      title: 'Start with a project. End with work you can continue.',
      description:
        'A GeoWork project runs through Define → Organize → Analyze → Verify → Deliver. Each stage\'s output becomes the next stage\'s input.',
    },
    modes: {
      eyebrow: 'Three modes',
      title: 'Work / Code / Map, sharing one project.',
      description:
        'Switch between modes without losing context. Tools, data, and results stay continuous.',
    },
    useCases: {
      eyebrow: 'Real geospatial work',
      title: 'Complete workflows from question to output.',
      description:
        'Each case includes inputs, process, tools, outputs, and current status — no abstract adjectives.',
    },
    universalContext: {
      eyebrow: 'Universal Context',
      title: 'One project context.\nAcross data, maps, code, and outputs.',
      description:
        'Every object, operation, and result in GeoWork ties to the same project context. No more switching tools and rebuilding environments.',
      items: [
        { label: 'Projects document themselves', desc: 'Research questions, areas, data sources, and acceptance criteria defined once, used throughout.' },
        { label: 'Tools connect to each other', desc: 'QGIS, GDAL, GEE, and Python run in the same project environment, sharing data.' },
        { label: 'Maps and code share state', desc: 'Multi-source imagery, vector layers, and spatial analysis results overlay on the same canvas.' },
        { label: 'Every result is traceable', desc: 'Each analysis step is trackable, with logs recording parameters, inputs, outputs, and run status.' },
        { label: 'Outputs carry their context', desc: 'Research materials, references, and generated reports are linked to the project, not scattered across folders.' },
        { label: 'Skills & tools', desc: 'Reusable GIS commands, remote sensing time series, and report generation skills connect to professional tools.' },
      ],
    },
    ecosystem: {
      eyebrow: 'Ecosystem',
      title: 'Connect your geospatial tool stack.',
      description:
        'GeoWork connects professional tools through Skills, MCP, and plugins. It doesn\'t replace your tools — it provides a unified workspace and context.',
    },
    openDev: {
      title: 'GeoWork is being built in the open.',
      description:
        'The repository is public on GitHub, currently in Developer Preview. Contribute, view the roadmap, and follow release notes through the repository.',
    },
    finalCta: {
      title: 'Keep geospatial work in motion.\nWith GeoWork.',
      description:
        'The repository is public on GitHub, currently in Developer Preview. Contribute, view the roadmap, and follow release notes through the repository.',
      primaryBtn: 'Explore GeoWork',
      secondaryBtn: 'View on GitHub',
    },
    footer: {
      tagline: 'Developer Preview',
      copyright: '© {year} GeoWork contributors. Repository on GitHub.',
    },
    changelog: {
      eyebrow: 'Changelog',
      title: 'Better as you grow. New updates every week.',
      description: 'See the latest GeoWork product updates and improvements.',
      viewAll: 'View all',
    },
    quote: {
      text: 'GeoWork is not built around one tool.\nIt is built around the continuity of geospatial work.',
      author: 'GeoWork Development Vision',
    },
    localeSwitch: '中文',
  },
} as const satisfies Record<Locale, Record<string, unknown>>;

export function getDict(locale: Locale) {
  return dict[locale];
}

export type Dict = typeof dict.zh;