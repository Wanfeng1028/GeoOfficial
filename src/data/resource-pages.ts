/**
 * Resource Pages — v2.5 plan Iteration 8
 *
 * 9 个资源索引页的共享数据：
 * Getting Started, Help, Learn, Docs, Partners, Blog, Engineering, Careers, Contact
 *
 * 每个页面包含：Hero + 多个 section(每个 section 含卡片网格) + 可选 CTA
 * 详情页(/blog/[slug], /engineering/[slug], /help/[slug], /learn/[slug])使用 MDX 文件。
 */

export interface ResourceCard {
  id: string;
  title: { zh: string; en: string };
  description: { zh: string; en: string };
  /** 内部链接（/开头）或外部链接 */
  href: string;
  /** 是否外部链接 */
  external?: boolean;
  /** 元信息（如"5 分钟"、"Beginner"、"2026-07-15"） */
  meta?: { zh: string; en: string };
}

export interface ResourceSection {
  id: string;
  title: { zh: string; en: string };
  description?: { zh: string; en: string };
  cards: ResourceCard[];
}

export interface ResourcePageData {
  slug: string;
  path: string;
  eyebrow: { zh: string; en: string };
  title: { zh: string; en: string };
  description: { zh: string; en: string };
  primaryCta?: {
    label: { zh: string; en: string };
    href: string;
    external?: boolean;
  };
  secondaryCta?: {
    label: { zh: string; en: string };
    href: string;
    external?: boolean;
  };
  sections: ResourceSection[];
  /** 底部说明（如"没找到你要的?联系我们"） */
  finalNote?: {
    text: { zh: string; en: string };
    linkLabel: { zh: string; en: string };
    linkHref: string;
  };
}

// ─── 1. Getting Started ─────────────────────────────────
const gettingStarted: ResourcePageData = {
  slug: 'getting-started',
  path: '/getting-started',
  eyebrow: { zh: 'GeoWork 101', en: 'GeoWork 101' },
  title: {
    zh: '从第一个项目开始使用 GeoWork。',
    en: 'Start with your first GeoWork project.',
  },
  description: {
    zh: '从安装到第一个工作流,15 分钟内完成 GeoWork 入门。',
    en: 'From install to your first workflow, get started with GeoWork in 15 minutes.',
  },
  primaryCta: {
    label: { zh: '下载 GeoWork', en: 'Download GeoWork' },
    href: '/download',
  },
  secondaryCta: {
    label: { zh: '查看系统要求', en: 'System requirements' },
    href: '/docs',
  },
  sections: [
    {
      id: 'install',
      title: { zh: '1. 安装与启动', en: '1. Install & launch' },
      description: {
        zh: '从 GitHub Releases 下载对应平台的构建包,解压后直接运行。',
        en: 'Download the build for your platform from GitHub Releases, extract, and run.',
      },
      cards: [
        {
          id: 'download',
          title: { zh: '下载最新构建', en: 'Download latest build' },
          description: {
            zh: 'Windows x64 安装包,约 120MB,包含 Go Runtime 与 Python Geo Worker。',
            en: 'Windows x64 installer, ~120MB, includes Go Runtime and Python Geo Worker.',
          },
          href: 'https://github.com/Wanfeng1028/GeoWork/releases',
          external: true,
          meta: { zh: 'GitHub Releases', en: 'GitHub Releases' },
        },
        {
          id: 'system-req',
          title: { zh: '系统要求', en: 'System requirements' },
          description: {
            zh: 'Windows 10/11 64位,8GB RAM,2GB 磁盘空间。macOS/Linux 暂未提供官方构建。',
            en: 'Windows 10/11 64-bit, 8GB RAM, 2GB disk. macOS/Linux do not yet have official builds.',
          },
          href: '/docs',
          meta: { zh: '参考', en: 'Reference' },
        },
        {
          id: 'first-launch',
          title: { zh: '首次启动', en: 'First launch' },
          description: {
            zh: '首次启动会初始化 Python Geo Worker 与默认项目目录,约 30 秒。',
            en: 'First launch initializes the Python Geo Worker and default project directory, ~30s.',
          },
          href: '/help/getting-started-first-launch',
          meta: { zh: '5 分钟', en: '5 min' },
        },
      ],
    },
    {
      id: 'first-project',
      title: { zh: '2. 创建第一个项目', en: '2. Create your first project' },
      description: {
        zh: '项目是 GeoWork 的顶层容器,组织数据、图层、任务和成果。',
        en: 'A Project is the top-level container in GeoWork — it organizes data, layers, tasks, and outputs.',
      },
      cards: [
        {
          id: 'new-project',
          title: { zh: '新建项目', en: 'New project' },
          description: {
            zh: '在 Work 模式中点击"New Project",选择目录,命名项目。',
            en: 'In Work mode, click "New Project", pick a directory, name your project.',
          },
          href: '/help/getting-started-new-project',
          meta: { zh: '3 分钟', en: '3 min' },
        },
        {
          id: 'import-data',
          title: { zh: '导入数据', en: 'Import data' },
          description: {
            zh: '拖拽 GeoTIFF / Shapefile / GeoJSON 到项目,或通过 GDAL Skill 导入。',
            en: 'Drag-and-drop GeoTIFF / Shapefile / GeoJSON, or import via the GDAL Skill.',
          },
          href: '/help/getting-started-import-data',
          meta: { zh: '5 分钟', en: '5 min' },
        },
        {
          id: 'first-task',
          title: { zh: '运行第一个任务', en: 'Run your first task' },
          description: {
            zh: '在 Assistant 中输入"计算 NDVI",AI 会调用对应 Skill 并在 Map 中显示结果。',
            en: 'In Assistant, type "compute NDVI" — AI invokes the right Skill and shows results in Map.',
          },
          href: '/help/getting-started-first-task',
          meta: { zh: '5 分钟', en: '5 min' },
        },
      ],
    },
    {
      id: 'modes',
      title: { zh: '3. 三种工作模式', en: '3. Three work modes' },
      description: {
        zh: 'Work / Code / Map 模式覆盖项目管理的全部场景,切换不丢失上下文。',
        en: 'Work / Code / Map modes cover the full project lifecycle — switch without losing context.',
      },
      cards: [
        {
          id: 'work-mode',
          title: { zh: 'Work 模式', en: 'Work mode' },
          description: {
            zh: '项目管理、任务调度、工具集成、成果汇总。日常工作的主入口。',
            en: 'Project management, task scheduling, tool integration, output aggregation. Your daily main entry.',
          },
          href: '/platform',
          meta: { zh: '主入口', en: 'Main entry' },
        },
        {
          id: 'code-mode',
          title: { zh: 'Code 模式', en: 'Code mode' },
          description: {
            zh: 'Python 编辑器、终端、运行结果与代码版本管理。适合写分析脚本。',
            en: 'Python editor, terminal, run results, and code versioning. Best for analysis scripts.',
          },
          href: '/platform/developers',
          meta: { zh: '脚本分析', en: 'Scripting' },
        },
        {
          id: 'map-mode',
          title: { zh: 'Map 模式', en: 'Map mode' },
          description: {
            zh: '图层叠加、影像分析、属性查询与制图输出。可视化主战场。',
            en: 'Layer overlay, image analysis, attribute queries, and cartographic output. The visualization main stage.',
          },
          href: '/platform/data',
          meta: { zh: '可视化', en: 'Visualization' },
        },
      ],
    },
  ],
  finalNote: {
    text: {
      zh: '遇到问题?查看帮助中心或联系我们。',
      en: 'Run into issues? Check the Help Center or contact us.',
    },
    linkLabel: { zh: '前往帮助中心', en: 'Go to Help Center' },
    linkHref: '/help',
  },
};

// ─── 2. Help Center ─────────────────────────────────────
const help: ResourcePageData = {
  slug: 'help',
  path: '/help',
  eyebrow: { zh: '帮助中心', en: 'Help Center' },
  title: {
    zh: '用得明白,排得清楚。',
    en: 'Understand it, fix it.',
  },
  description: {
    zh: '按主题分类的帮助文章:入门、数据、工具、自动化与故障排查。',
    en: 'Help articles organized by topic: onboarding, data, tools, automation, and troubleshooting.',
  },
  sections: [
    {
      id: 'onboarding',
      title: { zh: '入门', en: 'Onboarding' },
      cards: [
        {
          id: 'install',
          title: { zh: '安装 GeoWork', en: 'Install GeoWork' },
          description: {
            zh: '下载、解压、首次启动的完整步骤。',
            en: 'Full steps for download, extract, and first launch.',
          },
          href: '/help/install',
          meta: { zh: '5 分钟', en: '5 min' },
        },
        {
          id: 'first-project',
          title: { zh: '创建第一个项目', en: 'Create your first project' },
          description: {
            zh: '项目结构、目录选择与命名约定。',
            en: 'Project structure, directory selection, and naming conventions.',
          },
          href: '/help/first-project',
          meta: { zh: '3 分钟', en: '3 min' },
        },
        {
          id: 'import-data',
          title: { zh: '导入数据', en: 'Import data' },
          description: {
            zh: '支持的格式、拖拽导入、GDAL 命令行导入。',
            en: 'Supported formats, drag-and-drop, and GDAL CLI import.',
          },
          href: '/help/import-data',
          meta: { zh: '5 分钟', en: '5 min' },
        },
      ],
    },
    {
      id: 'tools',
      title: { zh: '工具与自动化', en: 'Tools & automation' },
      cards: [
        {
          id: 'skills-101',
          title: { zh: 'Skills 入门', en: 'Skills 101' },
          description: {
            zh: '什么是 Skill、如何调用、参数怎么传。',
            en: 'What a Skill is, how to invoke one, and how parameters work.',
          },
          href: '/help/skills-101',
          meta: { zh: '10 分钟', en: '10 min' },
        },
        {
          id: 'mcp-setup',
          title: { zh: '配置 MCP', en: 'Configure MCP' },
          description: {
            zh: '为 AI Agent 暴露 GeoWork 上下文,启用 AI 调用 Skill。',
            en: 'Expose GeoWork context to AI agents, enable AI-invoked Skills.',
          },
          href: '/help/mcp-setup',
          meta: { zh: '8 分钟', en: '8 min' },
        },
        {
          id: 'python-worker',
          title: { zh: 'Python Geo Worker', en: 'Python Geo Worker' },
          description: {
            zh: '内置 Python 运行时、预装库列表、自定义包安装。',
            en: 'Embedded Python runtime, pre-installed libs, custom package install.',
          },
          href: '/help/python-worker',
          meta: { zh: '参考', en: 'Reference' },
        },
      ],
    },
    {
      id: 'troubleshooting',
      title: { zh: '故障排查', en: 'Troubleshooting' },
      cards: [
        {
          id: 'gdal-errors',
          title: { zh: '常见 GDAL 错误', en: 'Common GDAL errors' },
          description: {
            zh: '投影不匹配、格式不支持、内存不足的处理方法。',
            en: 'Handling projection mismatch, unsupported formats, and out-of-memory errors.',
          },
          href: '/help/gdal-errors',
          meta: { zh: '参考', en: 'Reference' },
        },
        {
          id: 'python-import',
          title: { zh: 'Python 模块导入失败', en: 'Python module import failures' },
          description: {
            zh: 'rasterio / geopandas 安装路径与依赖冲突排查。',
            en: 'Troubleshooting rasterio / geopandas install paths and dependency conflicts.',
          },
          href: '/help/python-import',
          meta: { zh: '参考', en: 'Reference' },
        },
        {
          id: 'performance',
          title: { zh: '性能调优', en: 'Performance tuning' },
          description: {
            zh: '大栅格处理、内存设置、并行任务配置。',
            en: 'Large raster processing, memory settings, and parallel task config.',
          },
          href: '/help/performance',
          meta: { zh: '进阶', en: 'Advanced' },
        },
      ],
    },
  ],
  finalNote: {
    text: {
      zh: '没找到答案?在 GitHub Issues 提问或联系社区。',
      en: 'Didn\'t find an answer? Open a GitHub Issue or ask the community.',
    },
    linkLabel: { zh: '前往 GitHub Issues', en: 'Go to GitHub Issues' },
    linkHref: 'https://github.com/Wanfeng1028/GeoWork/issues',
  },
};

// ─── 3. Learn ────────────────────────────────────────────
const learn: ResourcePageData = {
  slug: 'learn',
  path: '/learn',
  eyebrow: { zh: 'Learn GeoWork', en: 'Learn GeoWork' },
  title: {
    zh: '通过真实任务学习 GeoWork。',
    en: 'Learn GeoWork through real tasks.',
  },
  description: {
    zh: '以完整工作流为线索的学习路径,从数据准备到成果交付。',
    en: 'Learning paths built around complete workflows — from data prep to deliverable.',
  },
  sections: [
    {
      id: 'beginner',
      title: { zh: '入门路径', en: 'Beginner path' },
      description: {
        zh: '适合 GIS 新手与首次接触 GeoWork 的用户。',
        en: 'For GIS newcomers and first-time GeoWork users.',
      },
      cards: [
        {
          id: 'path-101',
          title: { zh: 'GeoWork 101', en: 'GeoWork 101' },
          description: {
            zh: '安装、第一个项目、Work/Code/Map 三种模式、基础工作流。15 分钟。',
            en: 'Install, first project, Work/Code/Map modes, and basic workflow. 15 minutes.',
          },
          href: '/getting-started',
          meta: { zh: '15 分钟 · Beginner', en: '15 min · Beginner' },
        },
        {
          id: 'path-first-map',
          title: { zh: '你的第一张地图', en: 'Your first map' },
          description: {
            zh: '导入 GeoTIFF,设置样式,导出地图。20 分钟。',
            en: 'Import a GeoTIFF, style it, export a map. 20 minutes.',
          },
          href: '/learn/your-first-map',
          meta: { zh: '20 分钟 · Beginner', en: '20 min · Beginner' },
        },
        {
          id: 'path-first-skill',
          title: { zh: '调用第一个 Skill', en: 'Invoke your first Skill' },
          description: {
            zh: '通过 Assistant 调用内置 NDVI Skill,理解 Skill 参数与输出。10 分钟。',
            en: 'Invoke the built-in NDVI Skill via Assistant, understand parameters and outputs. 10 minutes.',
          },
          href: '/learn/first-skill',
          meta: { zh: '10 分钟 · Beginner', en: '10 min · Beginner' },
        },
      ],
    },
    {
      id: 'intermediate',
      title: { zh: '进阶路径', en: 'Intermediate path' },
      description: {
        zh: '适合已经能完成基础工作流,想自动化与扩展的用户。',
        en: 'For users comfortable with basics who want automation and extension.',
      },
      cards: [
        {
          id: 'path-custom-skill',
          title: { zh: '编写自定义 Skill', en: 'Author a custom Skill' },
          description: {
            zh: '用 YAML 定义 Skill,封装 GDAL/QGIS 命令链,注册到 Assistant。',
            en: 'Define a Skill in YAML, wrap GDAL/QGIS command chains, register with Assistant.',
          },
          href: '/learn/custom-skill',
          meta: { zh: '30 分钟 · Intermediate', en: '30 min · Intermediate' },
        },
        {
          id: 'path-mcp',
          title: { zh: 'MCP 集成 AI Agent', en: 'Integrate AI agents via MCP' },
          description: {
            zh: '配置 MCP,让外部 AI Agent 调用 GeoWork Skills。',
            en: 'Configure MCP to let external AI agents invoke GeoWork Skills.',
          },
          href: '/learn/mcp-integration',
          meta: { zh: '25 分钟 · Intermediate', en: '25 min · Intermediate' },
        },
        {
          id: 'path-python',
          title: { zh: 'Code 模式 Python 分析', en: 'Python analysis in Code mode' },
          description: {
            zh: '在 Code 模式写 rasterio/geopandas 脚本,结果自动回写为 Artifact。',
            en: 'Write rasterio/geopandas scripts in Code mode, results auto-saved as Artifacts.',
          },
          href: '/learn/python-analysis',
          meta: { zh: '40 分钟 · Intermediate', en: '40 min · Intermediate' },
        },
      ],
    },
    {
      id: 'advanced',
      title: { zh: '高级路径', en: 'Advanced path' },
      description: {
        zh: '适合需要扩展 GeoWork 内部或构建工作流模板的用户。',
        en: 'For users who need to extend GeoWork internals or build workflow templates.',
      },
      cards: [
        {
          id: 'path-plugin',
          title: { zh: '插件开发预览', en: 'Plugin development preview' },
          description: {
            zh: '计划中的插件 API 预览:UI、数据源、工具三类插件。',
            en: 'Preview of the planned plugin API: UI, data source, and tool plugins.',
          },
          href: '/ecosystem/plugins',
          meta: { zh: 'Planned', en: 'Planned' },
        },
        {
          id: 'path-workflow-template',
          title: { zh: '工作流模板', en: 'Workflow templates' },
          description: {
            zh: '将一组 Skills 与参数封装为可复用模板,跨项目调用。',
            en: 'Package a set of Skills and parameters as a reusable template across projects.',
          },
          href: '/learn/workflow-templates',
          meta: { zh: '进阶', en: 'Advanced' },
        },
      ],
    },
  ],
  finalNote: {
    text: {
      zh: '想看真实案例?查看使用案例页。',
      en: 'Want real-world examples? See the Use Cases page.',
    },
    linkLabel: { zh: '查看使用案例', en: 'View use cases' },
    linkHref: '/use-cases',
  },
};

// ─── 4. Docs Gateway ─────────────────────────────────────
const docs: ResourcePageData = {
  slug: 'docs',
  path: '/docs',
  eyebrow: { zh: '文档', en: 'Docs' },
  title: {
    zh: 'GeoWork 文档入口。',
    en: 'GeoWork docs gateway.',
  },
  description: {
    zh: '按主题分类的官方文档:API、SDK、MCP、Skills、插件与架构参考。',
    en: 'Official docs organized by topic: API, SDK, MCP, Skills, plugins, and architecture reference.',
  },
  primaryCta: {
    label: { zh: 'GitHub 文档仓库', en: 'GitHub docs repo' },
    href: 'https://github.com/Wanfeng1028/GeoWork/tree/main/docs',
    external: true,
  },
  secondaryCta: {
    label: { zh: '架构参考', en: 'Architecture reference' },
    href: '/developers',
  },
  sections: [
    {
      id: 'concepts',
      title: { zh: '核心概念', en: 'Core concepts' },
      cards: [
        {
          id: 'project-context',
          title: { zh: 'Project Context', en: 'Project Context' },
          description: {
            zh: 'Project / Dataset / Layer / Task / Artifact 五个核心对象及其关系。',
            en: 'The five core objects — Project / Dataset / Layer / Task / Artifact — and their relationships.',
          },
          href: 'https://github.com/Wanfeng1028/GeoWork/blob/main/docs/concepts.md',
          external: true,
          meta: { zh: '概念', en: 'Concept' },
        },
        {
          id: 'modes',
          title: { zh: 'Work / Code / Map 模式', en: 'Work / Code / Map modes' },
          description: {
            zh: '三种模式各自的职责、切换时上下文如何保持。',
            en: 'Responsibilities of each mode and how context persists across switches.',
          },
          href: 'https://github.com/Wanfeng1028/GeoWork/blob/main/docs/modes.md',
          external: true,
          meta: { zh: '概念', en: 'Concept' },
        },
        {
          id: 'skills-mcp',
          title: { zh: 'Skills 与 MCP', en: 'Skills & MCP' },
          description: {
            zh: 'Skill 的定义、注册、调用;MCP 暴露的上下文与权限模型。',
            en: 'Skill definition, registration, invocation; MCP-exposed context and permission model.',
          },
          href: 'https://github.com/Wanfeng1028/GeoWork/blob/main/docs/skills-mcp.md',
          external: true,
          meta: { zh: '概念', en: 'Concept' },
        },
      ],
    },
    {
      id: 'api',
      title: { zh: 'API 与 SDK', en: 'API & SDK' },
      cards: [
        {
          id: 'go-runtime',
          title: { zh: 'Go Runtime API', en: 'Go Runtime API' },
          description: {
            zh: '任务调度、对象管理、事件系统的 Go 接口参考。',
            en: 'Go interface reference for task scheduling, object management, and event system.',
          },
          href: 'https://github.com/Wanfeng1028/GeoWork/blob/main/docs/api-go.md',
          external: true,
          meta: { zh: 'API', en: 'API' },
        },
        {
          id: 'python-sdk',
          title: { zh: 'Python SDK', en: 'Python SDK' },
          description: {
            zh: '在 Code 模式中可用的 Python API:Project、Dataset、Layer、Task 对象。',
            en: 'Python API available in Code mode: Project, Dataset, Layer, and Task objects.',
          },
          href: 'https://github.com/Wanfeng1028/GeoWork/blob/main/docs/api-python.md',
          external: true,
          meta: { zh: 'SDK', en: 'SDK' },
        },
        {
          id: 'mcp-schema',
          title: { zh: 'MCP Schema', en: 'MCP Schema' },
          description: {
            zh: 'MCP 暴露的工具、资源和提示模板的 JSON Schema。',
            en: 'JSON Schema for tools, resources, and prompt templates exposed via MCP.',
          },
          href: 'https://github.com/Wanfeng1028/GeoWork/blob/main/docs/mcp-schema.md',
          external: true,
          meta: { zh: 'Schema', en: 'Schema' },
        },
      ],
    },
    {
      id: 'guides',
      title: { zh: '操作指南', en: 'How-to guides' },
      cards: [
        {
          id: 'skill-author',
          title: { zh: '编写 Skill', en: 'Author a Skill' },
          description: {
            zh: '从零编写一个 Skill:YAML 结构、参数定义、工具链、输出类型。',
            en: 'Write a Skill from scratch: YAML structure, parameters, toolchain, output types.',
          },
          href: '/learn/custom-skill',
          meta: { zh: 'How-to', en: 'How-to' },
        },
        {
          id: 'plugin-dev',
          title: { zh: '插件开发(预览)', en: 'Plugin development (preview)' },
          description: {
            zh: '计划中的插件 API:UI、数据源、工具三类扩展点。',
            en: 'Planned plugin API: UI, data source, and tool extension points.',
          },
          href: '/ecosystem/plugins',
          meta: { zh: 'Planned', en: 'Planned' },
        },
        {
          id: 'report-gen',
          title: { zh: '报告生成', en: 'Report generation' },
          description: {
            zh: '将项目中的图表、统计和方法记录导出为 Markdown / PDF。',
            en: 'Export project charts, statistics, and method notes to Markdown / PDF.',
          },
          href: '/platform/reporting',
          meta: { zh: 'How-to', en: 'How-to' },
        },
      ],
    },
  ],
  finalNote: {
    text: {
      zh: '文档仓库完全开放,欢迎在 GitHub 提 PR 改进。',
      en: 'The docs repo is fully open — PRs welcome on GitHub.',
    },
    linkLabel: { zh: '查看文档仓库', en: 'View docs repo' },
    linkHref: 'https://github.com/Wanfeng1028/GeoWork/tree/main/docs',
  },
};

// ─── 5. Partners ─────────────────────────────────────────
const partners: ResourcePageData = {
  slug: 'partners',
  path: '/partners',
  eyebrow: { zh: '合作伙伴', en: 'Partners' },
  title: {
    zh: '与高校、科研和开源社区一起构建 GeoWork。',
    en: 'Building GeoWork with universities, research, and open source.',
  },
  description: {
    zh: 'GeoWork 的合作生态:教育科研计划、开源贡献者、工具生态合作伙伴。',
    en: 'The GeoWork partner ecosystem: education & research programs, open source contributors, and tool ecosystem partners.',
  },
  primaryCta: {
    label: { zh: '申请合作', en: 'Apply for partnership' },
    href: '/contact',
  },
  sections: [
    {
      id: 'education',
      title: { zh: '教育与科研', en: 'Education & research' },
      description: {
        zh: '面向高校、科研机构与学生的支持计划。',
        en: 'Support programs for universities, research institutes, and students.',
      },
      cards: [
        {
          id: 'edu-program',
          title: { zh: '教育科研计划', en: 'Education & Research program' },
          description: {
            zh: '面向高校师生与科研人员的免费早期体验计划,包含优先支持与教学包。',
            en: 'Free early access program for faculty, students, and researchers, with priority support and teaching kits.',
          },
          href: '/programs/education-research',
          meta: { zh: '开放申请', en: 'Open' },
        },
        {
          id: 'course-kit',
          title: { zh: '教学包', en: 'Course kit' },
          description: {
            zh: '为 GIS / 遥感课程准备的案例集、幻灯片与作业模板(计划中)。',
            en: 'Case collection, slides, and assignment templates for GIS / remote sensing courses (planned).',
          },
          href: '/programs/education-research',
          meta: { zh: 'Planned', en: 'Planned' },
        },
      ],
    },
    {
      id: 'opensource',
      title: { zh: '开源贡献者', en: 'Open source contributors' },
      description: {
        zh: 'GeoWork 本身是开源项目,欢迎个人贡献者参与。',
        en: 'GeoWork itself is open source — individual contributors welcome.',
      },
      cards: [
        {
          id: 'contributors',
          title: { zh: '贡献者', en: 'Contributors' },
          description: {
            zh: '查看 GeoWork 仓库的贡献者列表与贡献指南。',
            en: 'See the GeoWork repo contributors list and contribution guide.',
          },
          href: 'https://github.com/Wanfeng1028/GeoWork/graphs/contributors',
          external: true,
          meta: { zh: 'GitHub', en: 'GitHub' },
        },
        {
          id: 'experts',
          title: { zh: '专家与贡献者', en: 'Experts & contributors' },
          description: {
            zh: '来自 GIS、遥感、科研与工程社区的伙伴。',
            en: 'Friends from GIS, remote sensing, research, and engineering communities.',
          },
          href: '/community/experts',
          meta: { zh: '社区', en: 'Community' },
        },
        {
          id: 'good-first-issue',
          title: { zh: 'Good First Issues', en: 'Good First Issues' },
          description: {
            zh: '适合新贡献者的入门 issue,标记在 GitHub Issues。',
            en: 'Entry-level issues for new contributors, labeled in GitHub Issues.',
          },
          href: 'https://github.com/Wanfeng1028/GeoWork/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22',
          external: true,
          meta: { zh: 'GitHub', en: 'GitHub' },
        },
      ],
    },
    {
      id: 'tool-ecosystem',
      title: { zh: '工具生态合作', en: 'Tool ecosystem partners' },
      description: {
        zh: '与 GeoWork 集成的开源工具与平台。',
        en: 'Open source tools and platforms that integrate with GeoWork.',
      },
      cards: [
        {
          id: 'qgis',
          title: { zh: 'QGIS', en: 'QGIS' },
          description: {
            zh: '桌面 GIS 工程与制图,图层与项目文件互操作。',
            en: 'Desktop GIS engineering and cartography, with layer and project file interop.',
          },
          href: '/ecosystem/qgis',
          meta: { zh: 'Connected', en: 'Connected' },
        },
        {
          id: 'gdal',
          title: { zh: 'GDAL', en: 'GDAL' },
          description: {
            zh: '栅格与矢量格式转换、投影变换的底座库。',
            en: 'The foundation library for raster/vector format conversion and projection transforms.',
          },
          href: '/ecosystem/gdal',
          meta: { zh: 'Connected', en: 'Connected' },
        },
        {
          id: 'gee',
          title: { zh: 'Google Earth Engine', en: 'Google Earth Engine' },
          description: {
            zh: '云端遥感影像存取与时序分析。',
            en: 'Cloud remote sensing imagery access and time-series analysis.',
          },
          href: '/ecosystem/google-earth-engine',
          meta: { zh: 'Partial', en: 'Partial' },
        },
      ],
    },
  ],
  finalNote: {
    text: {
      zh: '有兴趣合作?联系我们,描述你的场景。',
      en: 'Interested in partnering? Tell us about your use case.',
    },
    linkLabel: { zh: '联系团队', en: 'Contact the team' },
    linkHref: '/contact',
  },
};

// ─── 6. Blog ──────────────────────────────────────────────
const blog: ResourcePageData = {
  slug: 'blog',
  path: '/blog',
  eyebrow: { zh: '博客', en: 'Blog' },
  title: {
    zh: 'GeoWork 产品、案例与项目动态。',
    en: 'GeoWork product, cases, and project updates.',
  },
  description: {
    zh: '版本发布、案例研究、工程实践与社区动态。',
    en: 'Release notes, case studies, engineering notes, and community updates.',
  },
  sections: [
    {
      id: 'latest',
      title: { zh: '最新文章', en: 'Latest posts' },
      description: {
        zh: '当前为 v2.5 阶段,博客文章将随版本迭代逐步发布。',
        en: 'Currently in v2.5 — blog posts will be published as iterations ship.',
      },
      cards: [
        {
          id: 'v04-preview',
          title: { zh: 'GeoWork v0.4 Developer Preview 发布', en: 'GeoWork v0.4 Developer Preview released' },
          description: {
            zh: '桌面工作台、Go Runtime、Python Geo Worker 与 Skills/MCP 基础机制的首次预览。',
            en: 'First preview of the desktop workspace, Go Runtime, Python Geo Worker, and Skills/MCP foundations.',
          },
          href: '/blog/v04-developer-preview',
          meta: { zh: '2026-07-14 · 发布', en: '2026-07-14 · Release' },
        },
        {
          id: 'why-local-first',
          title: { zh: '为什么 GeoWork 选择 local-first', en: 'Why GeoWork is local-first' },
          description: {
            zh: '从数据主权、性能和离线场景讨论 local-first 架构的取舍。',
            en: 'Data sovereignty, performance, and offline scenarios — trade-offs of local-first architecture.',
          },
          href: '/blog/why-local-first',
          meta: { zh: '2026-07-10 · 架构', en: '2026-07-10 · Architecture' },
        },
        {
          id: 'skills-design',
          title: { zh: 'Skill 的设计原则', en: 'Design principles for Skills' },
          description: {
            zh: '为什么 Skill = 名称 + 参数 + 工具链 + 输出,而不是函数或脚本。',
            en: 'Why a Skill = name + parameters + toolchain + output, not a function or script.',
          },
          href: '/blog/skills-design',
          meta: { zh: '2026-07-05 · 设计', en: '2026-07-05 · Design' },
        },
      ],
    },
  ],
  finalNote: {
    text: {
      zh: '想看更深入的工程文章?查看工程实践页。',
      en: 'Looking for deeper engineering articles? See the Engineering page.',
    },
    linkLabel: { zh: '查看工程实践', en: 'View engineering' },
    linkHref: '/engineering',
  },
};

// ─── 7. Engineering ───────────────────────────────────────
const engineering: ResourcePageData = {
  slug: 'engineering',
  path: '/engineering',
  eyebrow: { zh: '工程实践', en: 'Engineering' },
  title: {
    zh: '架构、GIS、遥感与 AI 工程实践。',
    en: 'Architecture, GIS, remote sensing, and AI engineering.',
  },
  description: {
    zh: '深入 GeoWork 内部:Go Runtime、Python Geo Worker、MCP 与工具链设计。',
    en: 'Deep into GeoWork internals: Go Runtime, Python Geo Worker, MCP, and toolchain design.',
  },
  sections: [
    {
      id: 'architecture',
      title: { zh: '架构', en: 'Architecture' },
      cards: [
        {
          id: 'go-runtime',
          title: { zh: 'Go Runtime 内部', en: 'Inside the Go Runtime' },
          description: {
            zh: '任务调度、对象树、事件总线的 Go 实现与并发模型。',
            en: 'Task scheduling, object tree, and event bus — Go implementation and concurrency model.',
          },
          href: '/engineering/go-runtime-internals',
          meta: { zh: '架构', en: 'Architecture' },
        },
        {
          id: 'python-worker',
          title: { zh: 'Python Geo Worker 嵌入', en: 'Embedding the Python Geo Worker' },
          description: {
            zh: '如何在 Go 进程中嵌入 Python 运行时,处理 GIL 与数据序列化。',
            en: 'Embedding a Python runtime in a Go process — handling the GIL and data serialization.',
          },
          href: '/engineering/embedding-python-worker',
          meta: { zh: '架构', en: 'Architecture' },
        },
      ],
    },
    {
      id: 'gis',
      title: { zh: 'GIS 与遥感', en: 'GIS & remote sensing' },
      cards: [
        {
          id: 'gdal-pipeline',
          title: { zh: 'GDAL 处理管线设计', en: 'Designing the GDAL pipeline' },
          description: {
            zh: '如何在 Skill 中封装 GDAL 命令链,处理错误与中间产物。',
            en: 'Wrapping GDAL command chains in a Skill — error handling and intermediate artifacts.',
          },
          href: '/engineering/gdal-pipeline-design',
          meta: { zh: 'GIS', en: 'GIS' },
        },
        {
          id: 'gee-integration',
          title: { zh: '集成 GEE 的工程取舍', en: 'Engineering trade-offs integrating GEE' },
          description: {
            zh: '认证、网络、配额与本地缓存的设计决策。',
            en: 'Design decisions around auth, networking, quotas, and local caching.',
          },
          href: '/engineering/gee-integration-tradeoffs',
          meta: { zh: '遥感', en: 'Remote sensing' },
        },
      ],
    },
    {
      id: 'ai',
      title: { zh: 'AI 与 MCP', en: 'AI & MCP' },
      cards: [
        {
          id: 'mcp-design',
          title: { zh: 'MCP 上下文暴露设计', en: 'Designing MCP context exposure' },
          description: {
            zh: '暴露多少 Project 上下文给 AI?权限边界如何划定?',
            en: 'How much Project context to expose to AI? Where to draw the permission boundary?',
          },
          href: '/engineering/mcp-context-design',
          meta: { zh: 'AI', en: 'AI' },
        },
        {
          id: 'skill-routing',
          title: { zh: 'AI Skill 路由策略', en: 'AI Skill routing strategy' },
          description: {
            zh: '当用户说"算 NDVI",AI 如何选对 Skill 并填对参数?',
            en: 'When the user says "compute NDVI", how does AI pick the right Skill and fill parameters?',
          },
          href: '/engineering/skill-routing-strategy',
          meta: { zh: 'AI', en: 'AI' },
        },
      ],
    },
  ],
  finalNote: {
    text: {
      zh: '所有工程文章在 GitHub 同步发布,欢迎讨论。',
      en: 'All engineering articles are mirrored on GitHub — discussion welcome.',
    },
    linkLabel: { zh: '查看 GitHub Discussions', en: 'View GitHub Discussions' },
    linkHref: 'https://github.com/Wanfeng1028/GeoWork/discussions',
  },
};

// ─── 8. Careers / Contribute ────────────────────────────
const careers: ResourcePageData = {
  slug: 'careers',
  path: '/careers',
  eyebrow: { zh: '加入与贡献', en: 'Careers / Contribute' },
  title: {
    zh: '加入 GeoWork:参与、贡献或合作。',
    en: 'Join GeoWork: contribute, build, or partner.',
  },
  description: {
    zh: 'GeoWork 是开源项目,目前没有雇佣关系,但欢迎所有形式的贡献。',
    en: 'GeoWork is open source with no formal employment — all forms of contribution are welcome.',
  },
  sections: [
    {
      id: 'contribute',
      title: { zh: '贡献方式', en: 'Ways to contribute' },
      description: {
        zh: '从代码到文档,从测试到案例,每一种贡献都有价值。',
        en: 'From code to docs, testing to use cases — every contribution matters.',
      },
      cards: [
        {
          id: 'code',
          title: { zh: '贡献代码', en: 'Contribute code' },
          description: {
            zh: '在 GitHub 找 Good First Issue,提 PR。代码、测试、重构都欢迎。',
            en: 'Find a Good First Issue on GitHub, open a PR. Code, tests, and refactors all welcome.',
          },
          href: 'https://github.com/Wanfeng1028/GeoWork/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22',
          external: true,
          meta: { zh: '代码', en: 'Code' },
        },
        {
          id: 'docs',
          title: { zh: '改进文档', en: 'Improve docs' },
          description: {
            zh: '文档仓库独立开放,typo 修正、案例补充、翻译都可以。',
            en: 'The docs repo is open — typo fixes, case additions, and translations all help.',
          },
          href: 'https://github.com/Wanfeng1028/GeoWork/tree/main/docs',
          external: true,
          meta: { zh: '文档', en: 'Docs' },
        },
        {
          id: 'use-cases',
          title: { zh: '分享使用案例', en: 'Share use cases' },
          description: {
            zh: '用 GeoWork 完成了真实工作?写一篇案例分享,我们收录到 /use-cases。',
            en: 'Did real work with GeoWork? Write a case study — we\'ll feature it on /use-cases.',
          },
          href: '/contact',
          meta: { zh: '案例', en: 'Case' },
        },
        {
          id: 'community',
          title: { zh: '社区互助', en: 'Community support' },
          description: {
            zh: '在 GitHub Discussions 与 GitHub Issues 回答问题,帮助新用户。',
            en: 'Answer questions on GitHub Discussions and Issues, help new users.',
          },
          href: 'https://github.com/Wanfeng1028/GeoWork/discussions',
          external: true,
          meta: { zh: '社区', en: 'Community' },
        },
      ],
    },
    {
      id: 'future',
      title: { zh: '未来机会', en: 'Future opportunities' },
      description: {
        zh: '当项目进入下一阶段,可能开放以下角色(目前无空缺)。',
        en: 'As the project enters its next phase, the following roles may open (no openings currently).',
      },
      cards: [
        {
          id: 'gis-engineer',
          title: { zh: '高级 GIS 工程师', en: 'Senior GIS engineer' },
          description: {
            zh: '负责 QGIS/GDAL 集成、Skills 工具链扩展与遥感算法落地。',
            en: 'Own QGIS/GDAL integration, Skills toolchain extension, and remote sensing algorithm implementation.',
          },
          href: '/contact',
          meta: { zh: '未来 · 全职/合同', en: 'Future · Full-time/Contract' },
        },
        {
          id: 'ai-engineer',
          title: { zh: 'AI 工程师', en: 'AI engineer' },
          description: {
            zh: '负责 MCP 协议演进、Skill 路由优化与 Agent 安全模型。',
            en: 'Own MCP protocol evolution, Skill routing optimization, and agent safety model.',
          },
          href: '/contact',
          meta: { zh: '未来 · 全职/合同', en: 'Future · Full-time/Contract' },
        },
        {
          id: 'devrel',
          title: { zh: '开发者关系', en: 'Developer relations' },
          description: {
            zh: '负责教育科研计划、教学包与社区运营。',
            en: 'Own the education/research program, course kits, and community operations.',
          },
          href: '/contact',
          meta: { zh: '未来 · 全职', en: 'Future · Full-time' },
        },
      ],
    },
  ],
  finalNote: {
    text: {
      zh: '想以其他方式参与?联系我们描述你的想法。',
      en: 'Want to participate another way? Tell us about it.',
    },
    linkLabel: { zh: '联系团队', en: 'Contact the team' },
    linkHref: '/contact',
  },
};

// ─── 9. Contact ──────────────────────────────────────────
const contact: ResourcePageData = {
  slug: 'contact',
  path: '/contact',
  eyebrow: { zh: '联系我们', en: 'Contact' },
  title: {
    zh: '联系 GeoWork 团队。',
    en: 'Contact the GeoWork team.',
  },
  description: {
    zh: '合作、教育、科研、媒体与社区贡献,选择对应渠道更快得到回复。',
    en: 'Pick the right channel for partnerships, education, research, press, or community — faster replies.',
  },
  sections: [
    {
      id: 'channels',
      title: { zh: '联系渠道', en: 'Channels' },
      cards: [
        {
          id: 'partnership',
          title: { zh: '合作与商务', en: 'Partnerships & business' },
          description: {
            zh: '工具集成、联合方案、商务合作。通过 GitHub Discussions 私信或邮件。',
            en: 'Tool integration, joint solutions, business partnerships. Via GitHub Discussions DM or email.',
          },
          href: 'https://github.com/Wanfeng1028/GeoWork/discussions',
          external: true,
          meta: { zh: '合作', en: 'Partnership' },
        },
        {
          id: 'education',
          title: { zh: '教育与科研', en: 'Education & research' },
          description: {
            zh: '高校师生、科研机构申请教育科研计划。',
            en: 'Faculty, students, and research institutes applying for the education/research program.',
          },
          href: '/programs/education-research',
          meta: { zh: '教育', en: 'Education' },
        },
        {
          id: 'press',
          title: { zh: '媒体与采访', en: 'Press & interviews' },
          description: {
            zh: '媒体采访、品牌素材请求。通过 GitHub 联系维护者。',
            en: 'Press interviews and brand asset requests. Contact maintainers via GitHub.',
          },
          href: 'https://github.com/Wanfeng1028/GeoWork',
          external: true,
          meta: { zh: '媒体', en: 'Press' },
        },
        {
          id: 'community',
          title: { zh: '社区贡献', en: 'Community contribution' },
          description: {
            zh: '想贡献代码、文档或案例?查看加入与贡献页。',
            en: 'Want to contribute code, docs, or cases? See the Careers / Contribute page.',
          },
          href: '/careers',
          meta: { zh: '社区', en: 'Community' },
        },
      ],
    },
    {
      id: 'self-service',
      title: { zh: '自助渠道', en: 'Self-service' },
      description: {
        zh: '大部分问题可以通过以下渠道自助解决,响应更快。',
        en: 'Most issues can be resolved self-serve through these channels — faster response.',
      },
      cards: [
        {
          id: 'docs',
          title: { zh: '文档', en: 'Docs' },
          description: {
            zh: '查阅官方文档与 API 参考。',
            en: 'Browse official docs and API reference.',
          },
          href: '/docs',
          meta: { zh: '文档', en: 'Docs' },
        },
        {
          id: 'help',
          title: { zh: '帮助中心', en: 'Help Center' },
          description: {
            zh: '入门、工具与故障排查文章。',
            en: 'Onboarding, tools, and troubleshooting articles.',
          },
          href: '/help',
          meta: { zh: '帮助', en: 'Help' },
        },
        {
          id: 'issues',
          title: { zh: 'Bug 与功能请求', en: 'Bugs & feature requests' },
          description: {
            zh: '在 GitHub Issues 提交 bug 报告或功能请求,附复现步骤。',
            en: 'File bug reports or feature requests on GitHub Issues with reproduction steps.',
          },
          href: 'https://github.com/Wanfeng1028/GeoWork/issues',
          external: true,
          meta: { zh: 'GitHub', en: 'GitHub' },
        },
        {
          id: 'discussions',
          title: { zh: '问答与讨论', en: 'Q&A & discussions' },
          description: {
            zh: '使用问题、最佳实践讨论请用 GitHub Discussions。',
            en: 'Usage questions and best-practice discussions go to GitHub Discussions.',
          },
          href: 'https://github.com/Wanfeng1028/GeoWork/discussions',
          external: true,
          meta: { zh: 'GitHub', en: 'GitHub' },
        },
      ],
    },
  ],
  finalNote: {
    text: {
      zh: 'GeoWork 是开源项目,没有专职客服团队,回复依赖社区志愿者。',
      en: 'GeoWork is open source with no dedicated support staff — replies rely on community volunteers.',
    },
    linkLabel: { zh: '查看社区', en: 'View community' },
    linkHref: 'https://github.com/Wanfeng1028/GeoWork',
  },
};

// ─── 0. Resources Hub (/resources) ──────────────────────
const resourcesHub: ResourcePageData = {
  slug: 'resources',
  path: '/resources',
  eyebrow: { zh: '资源', en: 'Resources' },
  title: {
    zh: '学习、查阅与追踪 GeoWork 的所有资源。',
    en: 'Learn, reference, and track every GeoWork resource.',
  },
  description: {
    zh: '从入门到进阶,从帮助到工程实践,所有 GeoWork 资源集中在一处。',
    en: 'From onboarding to advanced, help to engineering — all GeoWork resources in one place.',
  },
  sections: [
    {
      id: 'onboarding',
      title: { zh: '入门与学习', en: 'Onboarding & learning' },
      description: {
        zh: '从零开始学习 GeoWork,按真实任务逐步进阶。',
        en: 'Start from zero and learn GeoWork through real tasks, step by step.',
      },
      cards: [
        {
          id: 'getting-started',
          title: { zh: 'GeoWork 101', en: 'GeoWork 101' },
          description: {
            zh: '15 分钟从安装到第一个工作流。',
            en: 'From install to your first workflow in 15 minutes.',
          },
          href: '/getting-started',
          meta: { zh: '入门', en: 'Onboarding' },
        },
        {
          id: 'learn',
          title: { zh: 'Learn GeoWork', en: 'Learn GeoWork' },
          description: {
            zh: '按真实任务组织的教程路径:地图、Skill、Python、MCP。',
            en: 'Tutorial paths organized by real tasks: maps, Skills, Python, MCP.',
          },
          href: '/learn',
          meta: { zh: '教程', en: 'Tutorials' },
        },
      ],
    },
    {
      id: 'reference',
      title: { zh: '帮助与文档', en: 'Help & docs' },
      description: {
        zh: '遇到问题查帮助,需要接口查文档。',
        en: 'Check help for issues, docs for interfaces.',
      },
      cards: [
        {
          id: 'help',
          title: { zh: '帮助中心', en: 'Help Center' },
          description: {
            zh: '安装、使用、故障排查文章。',
            en: 'Install, usage, and troubleshooting articles.',
          },
          href: '/help',
          meta: { zh: '帮助', en: 'Help' },
        },
        {
          id: 'docs',
          title: { zh: '文档入口', en: 'Docs gateway' },
          description: {
            zh: 'API、SDK、MCP、Skills 与插件文档导航。',
            en: 'API, SDK, MCP, Skills, and plugin docs gateway.',
          },
          href: '/docs',
          meta: { zh: '文档', en: 'Docs' },
        },
      ],
    },
    {
      id: 'updates',
      title: { zh: '动态与工程', en: 'Updates & engineering' },
      description: {
        zh: '产品动态、版本记录与工程实践。',
        en: 'Product updates, version history, and engineering practices.',
      },
      cards: [
        {
          id: 'blog',
          title: { zh: '博客', en: 'Blog' },
          description: {
            zh: '产品、案例与项目动态。',
            en: 'Product, cases, and project updates.',
          },
          href: '/blog',
          meta: { zh: '动态', en: 'Updates' },
        },
        {
          id: 'engineering',
          title: { zh: '工程实践', en: 'Engineering' },
          description: {
            zh: '架构、GIS、遥感与 AI 工程文章。',
            en: 'Architecture, GIS, remote sensing, and AI engineering articles.',
          },
          href: '/engineering',
          meta: { zh: '工程', en: 'Engineering' },
        },
        {
          id: 'changelog',
          title: { zh: '更新日志', en: 'Changelog' },
          description: {
            zh: '版本变化、修复与已知问题。',
            en: 'Version changes, fixes, and known issues.',
          },
          href: '/changelog',
          meta: { zh: '版本', en: 'Versions' },
        },
      ],
    },
    {
      id: 'community',
      title: { zh: '社区与合作', en: 'Community & partnerships' },
      description: {
        zh: '参与贡献、寻找合作、联系团队。',
        en: 'Contribute, find partnerships, or contact the team.',
      },
      cards: [
        {
          id: 'partners',
          title: { zh: '合作伙伴', en: 'Partners' },
          description: {
            zh: '高校、科研、开源与工具生态合作。',
            en: 'Universities, research, open source, and tool ecosystem partnerships.',
          },
          href: '/partners',
          meta: { zh: '合作', en: 'Partners' },
        },
        {
          id: 'careers',
          title: { zh: '加入与贡献', en: 'Careers / Contribute' },
          description: {
            zh: '参与项目、贡献代码或文档。',
            en: 'Join the project, contribute code or docs.',
          },
          href: '/careers',
          meta: { zh: '贡献', en: 'Contribute' },
        },
        {
          id: 'contact',
          title: { zh: '联系我们', en: 'Contact' },
          description: {
            zh: '合作、教育、科研、媒体与社区贡献渠道。',
            en: 'Channels for partnerships, education, research, press, and community.',
          },
          href: '/contact',
          meta: { zh: '联系', en: 'Contact' },
        },
      ],
    },
  ],
  finalNote: {
    text: {
      zh: '没找到需要的资源?在 GitHub Issues 提问,或在 Discussions 与社区交流。',
      en: 'Can\'t find what you need? Ask in GitHub Issues or discuss with the community in Discussions.',
    },
    linkLabel: { zh: '前往 GitHub', en: 'Go to GitHub' },
    linkHref: 'https://github.com/Wanfeng1028/GeoWork',
  },
};

export const resourcePages: ResourcePageData[] = [
  resourcesHub,
  gettingStarted,
  help,
  learn,
  docs,
  partners,
  blog,
  engineering,
  careers,
  contact,
];

export const resourcePageMap: Record<string, ResourcePageData> = Object.fromEntries(
  resourcePages.map((p) => [p.slug, p]),
);

export function getResourcePage(slug: string): ResourcePageData | undefined {
  return resourcePageMap[slug];
}
