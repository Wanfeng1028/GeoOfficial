/**
 * Platform Pages — Iteration 5 双语内容
 *
 * 每个平台页面共享同一布局（PlatformPageLayout），但内容不同：
 * - Hero（功能标签 + 大标题 + 价值说明 + CTA）
 * - 大型产品媒体（主题化的产品窗口模拟）
 * - 至少 4 个能力章节
 * - 可信信息（引用或状态说明）
 * - 相关 Platform 横向导航
 *
 * Per v2.5 plan section 3.3 (Platform page shared template) and Iteration 5.
 */

export interface PlatformCapability {
  id: string;
  /** 章节标签 */
  eyebrow: { zh: string; en: string };
  title: { zh: string; en: string };
  description: { zh: string; en: string };
  bullets: { zh: string[]; en: string[] };
}

export interface PlatformPageData {
  slug: string;
  /** 路由路径 */
  path: string;
  /** Hero 功能标签 */
  eyebrow: { zh: string; en: string };
  /** Hero 大标题（已含换行符 \n） */
  title: { zh: string; en: string };
  /** Hero 价值说明 */
  description: { zh: string; en: string };
  /** 主 CTA 文案 */
  primaryCta: { zh: string; en: string };
  /** 次 CTA 文案 */
  secondaryCta: { zh: string; en: string };
  /** 次 CTA 链接 */
  secondaryCtaHref: string;
  /** 产品媒体主题（决定窗口模拟的色调与内容） */
  mediaTheme:
    | 'assistant'
    | 'ai'
    | 'data'
    | 'context'
    | 'workflows'
    | 'task-sequences'
    | 'research'
    | 'reporting'
    | 'developers';
  /** 产品媒体标题 */
  mediaTitle: { zh: string; en: string };
  /** 能力章节（至少 4 个） */
  capabilities: PlatformCapability[];
  /** 可信信息引用 */
  quote: {
    text: { zh: string; en: string };
    author: { zh: string; en: string };
  };
  /** 相关平台页面 slug（用于横向导航） */
  related: string[];
}

export const platformPages: PlatformPageData[] = [
  // ─── 1. Assistant ──────────────────────────────────────────────────────
  {
    slug: 'assistant',
    path: '/platform/assistant',
    eyebrow: { zh: 'Assistant', en: 'Assistant' },
    title: {
      zh: '用自然语言，\n驱动地理空间工作。',
      en: 'Drive geospatial work\nin natural language.',
    },
    description: {
      zh: 'Assistant 连接项目上下文与工具链。提问、下达任务、查看结果，不用切换窗口。',
      en: 'Assistant connects to project context and tools. Ask, instruct, and review — without switching windows.',
    },
    primaryCta: { zh: '了解 GeoWork', en: 'Explore GeoWork' },
    secondaryCta: { zh: '查看使用案例', en: 'View use cases' },
    secondaryCtaHref: '/use-cases',
    mediaTheme: 'assistant',
    mediaTitle: { zh: 'Assistant 对话面板', en: 'Assistant conversation panel' },
    capabilities: [
      {
        id: 'context-aware',
        eyebrow: { zh: 'Context-aware', en: 'Context-aware' },
        title: { zh: '理解项目上下文，不只是回答问题。', en: 'Undersands project context, not just questions.' },
        description: {
          zh: 'Assistant 读取当前 Project 的数据、图层、任务和历史记录。回答基于项目实际状态，不是通用知识。',
          en: 'Assistant reads the current Project\'s data, layers, tasks, and history. Answers reflect actual project state, not generic knowledge.',
        },
        bullets: {
          zh: ['引用项目中的 Dataset 和 Layer', '感知当前 Task 的运行状态', '基于执行历史回答"上次结果是什么"'],
          en: ['References Datasets and Layers in the project', 'Aware of current Task run status', 'Answers "what was the last result" from execution history'],
        },
      },
      {
        id: 'task-execution',
        eyebrow: { zh: 'Task execution', en: 'Task execution' },
        title: { zh: '一句话发起任务，完整记录过程。', en: 'Start a task in one sentence. Full process recorded.' },
        description: {
          zh: '用自然语言描述要做的事，Assistant 调用合适的工具生成 Task。参数、输入、输出和日志自动记录。',
          en: 'Describe what you need in natural language. Assistant invokes the right tools to create a Task. Parameters, inputs, outputs, and logs are recorded automatically.',
        },
        bullets: {
          zh: ['"计算这个区域的 NDVI" → 生成 Task', '自动选择 Skills 和工具', '运行结果回写到 Project Artifact'],
          en: ['"Compute NDVI for this area" → generates a Task', 'Auto-selects Skills and tools', 'Results written back to Project Artifacts'],
        },
      },
      {
        id: 'tool-routing',
        eyebrow: { zh: 'Tool routing', en: 'Tool routing' },
        title: { zh: '连接 QGIS、GDAL、GEE 与 Python 工具链。', en: 'Connects QGIS, GDAL, GEE, and Python toolchain.' },
        description: {
          zh: 'Assistant 通过 MCP 和 Skills 路由到正确的工具。不需要记住命令名称或参数顺序。',
          en: 'Assistant routes to the right tool via MCP and Skills. No need to memorize command names or parameter order.',
        },
        bullets: {
          zh: ['MCP 路由到 QGIS 处理工具', 'Skills 封装常用 GIS 工作流', 'Python Geo Worker 执行自定义脚本'],
          en: ['MCP routes to QGIS processing tools', 'Skills encapsulate common GIS workflows', 'Python Geo Worker runs custom scripts'],
        },
      },
      {
        id: 'verification',
        eyebrow: { zh: 'Verification', en: 'Verification' },
        title: { zh: '回答前先检查，不只生成结果。', en: 'Checks before answering, not just generates.' },
        description: {
          zh: 'Assistant 在给出结论前，会检查数据范围、投影一致性、参数合理性和中间结果。发现问题会提示。',
          en: 'Before concluding, Assistant checks data extent, projection consistency, parameter validity, and intermediate results. Issues are flagged.',
        },
        bullets: {
          zh: ['检查投影和坐标系是否一致', '验证数据覆盖范围', '提示参数异常或缺失'],
          en: ['Checks projection and coordinate system consistency', 'Verifies data coverage extent', 'Flags parameter anomalies or missing values'],
        },
      },
    ],
    quote: {
      text: {
        zh: 'Assistant 不是聊天机器人，是连接项目上下文与工具链的工作入口。',
        en: 'Assistant isn\'t a chatbot — it\'s the work entry point connecting project context to the toolchain.',
      },
      author: { zh: 'GeoWork 设计原则', en: 'GeoWork design principle' },
    },
    related: ['ai', 'context', 'workflows', 'developers'],
  },

  // ─── 2. AI ─────────────────────────────────────────────────────────────
  {
    slug: 'ai',
    path: '/platform/ai',
    eyebrow: { zh: 'AI', en: 'AI' },
    title: {
      zh: 'AI Agent 负责执行，\n你负责判断。',
      en: 'AI agents execute.\nYou decide.',
    },
    description: {
      zh: '专业 Agent 规划、执行和验证地理空间工作流。每个步骤可追踪、可回溯、可干预。',
      en: 'Specialized agents plan, execute, and verify geospatial workflows. Every step is traceable, reviewable, and interruptible.',
    },
    primaryCta: { zh: '了解 GeoWork', en: 'Explore GeoWork' },
    secondaryCta: { zh: '查看架构', en: 'View architecture' },
    secondaryCtaHref: '/platform/developers',
    mediaTheme: 'ai',
    mediaTitle: { zh: 'AI Agent 工作流', en: 'AI Agent workflow' },
    capabilities: [
      {
        id: 'specialized-agents',
        eyebrow: { zh: 'Specialized agents', en: 'Specialized agents' },
        title: { zh: '不同任务，不同 Agent。', en: 'Different tasks, different agents.' },
        description: {
          zh: '遥感 Agent 处理影像，矢量 Agent 处理几何分析，报告 Agent 生成文档。每个 Agent 有专属工具集和验证规则。',
          en: 'A remote sensing agent handles imagery, a vector agent handles geometry analysis, a report agent generates documents. Each has its own toolset and validation rules.',
        },
        bullets: {
          zh: ['遥感 Agent：影像合成、分类、时序', '矢量 Agent：叠加、缓冲、空间统计', '报告 Agent：图表、文档、导出'],
          en: ['Remote sensing agent: compositing, classification, time series', 'Vector agent: overlay, buffer, spatial statistics', 'Report agent: charts, documents, export'],
        },
      },
      {
        id: 'planning',
        eyebrow: { zh: 'Planning', en: 'Planning' },
        title: { zh: '先规划步骤，再执行。', en: 'Plans steps before executing.' },
        description: {
          zh: 'Agent 收到任务后先生成执行计划：用哪些数据、调哪些工具、按什么顺序。你确认后再运行。',
          en: 'On receiving a task, the agent generates an execution plan: which data, which tools, in what order. It runs after you confirm.',
        },
        bullets: {
          zh: ['生成可审查的执行计划', '标注每步预计耗时和依赖', '支持手动调整步骤顺序'],
          en: ['Generates a reviewable execution plan', 'Estimates duration and dependencies per step', 'Supports manual step reordering'],
        },
      },
      {
        id: 'execution',
        eyebrow: { zh: 'Execution', en: 'Execution' },
        title: { zh: '逐步执行，实时反馈。', en: 'Step-by-step execution, real-time feedback.' },
        description: {
          zh: 'Agent 按计划逐步执行，每步的输入、输出、日志和状态都记录在 Task 中。出错可重试或跳过。',
          en: 'The agent executes step by step. Each step\'s input, output, logs, and status are recorded in the Task. Errors can be retried or skipped.',
        },
        bullets: {
          zh: ['每步状态：queued / running / done / failed', '实时输出日志和中间结果', '失败步骤可重试或手动修复'],
          en: ['Per-step status: queued / running / done / failed', 'Real-time logs and intermediate results', 'Failed steps can be retried or manually fixed'],
        },
      },
      {
        id: 'human-in-loop',
        eyebrow: { zh: 'Human-in-the-loop', en: 'Human-in-the-loop' },
        title: { zh: '关键决策，人来确认。', en: 'Critical decisions confirmed by humans.' },
        description: {
          zh: 'Agent 在关键步骤暂停等待确认：选择数据源、设置参数、接受结果。不是全自动黑盒。',
          en: 'The agent pauses at critical steps for confirmation: choosing data sources, setting parameters, accepting results. Not a fully automated black box.',
        },
        bullets: {
          zh: ['数据源选择需确认', '关键参数可调整', '结果接受前可预览'],
          en: ['Data source selection requires confirmation', 'Key parameters adjustable', 'Results previewable before acceptance'],
        },
      },
    ],
    quote: {
      text: {
        zh: 'AI 不是替代判断，是加速执行。判断仍然属于人。',
        en: 'AI doesn\'t replace judgment — it accelerates execution. Judgment stays human.',
      },
      author: { zh: 'GeoWork AI 原则', en: 'GeoWork AI principle' },
    },
    related: ['assistant', 'task-sequences', 'workflows', 'context'],
  },

  // ─── 3. Data model ─────────────────────────────────────────────────────
  {
    slug: 'data',
    path: '/platform/data',
    eyebrow: { zh: 'Data model', en: 'Data model' },
    title: {
      zh: '五个核心对象，\n一个项目上下文。',
      en: 'Five core objects.\nOne project context.',
    },
    description: {
      zh: 'Project / Dataset / Layer / Task / Artifact — 每个对象不是孤立功能，而是与项目上下文连续。',
      en: 'Project / Dataset / Layer / Task / Artifact — each object is not an isolated feature but continuously connected to the project context.',
    },
    primaryCta: { zh: '了解 GeoWork', en: 'Explore GeoWork' },
    secondaryCta: { zh: '查看项目上下文', en: 'View project context' },
    secondaryCtaHref: '/platform/context',
    mediaTheme: 'data',
    mediaTitle: { zh: '数据模型关系图', en: 'Data model relationship diagram' },
    capabilities: [
      {
        id: 'project',
        eyebrow: { zh: 'Project', en: 'Project' },
        title: { zh: '研究项目，一切工作的起点。', en: 'The research project — where every workflow begins.' },
        description: {
          zh: '每个 Project 包含研究问题、区域边界、数据来源、工具链和交付标准。项目贯穿 Define → Organize → Analyze → Verify → Deliver。',
          en: 'Each Project carries the research question, area boundary, data sources, toolchain, and delivery criteria. It spans Define → Organize → Analyze → Verify → Deliver.',
        },
        bullets: {
          zh: ['研究问题和验收标准一次定义', '区域边界和坐标系绑定项目', '成员权限和版本基于项目'],
          en: ['Research question and acceptance criteria defined once', 'Area boundary and CRS bound to project', 'Members, permissions, and versions project-scoped'],
        },
      },
      {
        id: 'dataset',
        eyebrow: { zh: 'Dataset', en: 'Dataset' },
        title: { zh: '影像、矢量、表格、文档，统一管理。', en: 'Imagery, vectors, tables, documents — unified.' },
        description: {
          zh: 'Dataset 管理所有输入数据：遥感影像、矢量文件、CSV 表格、PDF 文献。支持本地、服务器和云存储。',
          en: 'Dataset manages every input: remote sensing imagery, vector files, CSV tables, PDF papers. Local, server, and cloud storage supported.',
        },
        bullets: {
          zh: ['Landsat / Sentinel 影像自动元数据', '矢量文件支持 GeoJSON / Shapefile / GPKG', '文献 PDF 可检索和引用'],
          en: ['Landsat / Sentinel imagery with auto-metadata', 'Vector formats: GeoJSON / Shapefile / GPKG', 'PDF papers searchable and citable'],
        },
      },
      {
        id: 'layer',
        eyebrow: { zh: 'Layer', en: 'Layer' },
        title: { zh: '地图画布上的可见单元。', en: 'The visible unit on the map canvas.' },
        description: {
          zh: 'Layer 是地图上的可见单元，可独立配置样式、透明度、筛选和标注。支持矢量、栅格和瓦片图层。',
          en: 'Layer is the visible unit on the map. Each has independent style, opacity, filter, and label config. Vector, raster, and tile layers supported.',
        },
        bullets: {
          zh: ['样式：颜色、符号、分类', '筛选：属性和空间范围', '标注：字段绑定和自动放置'],
          en: ['Style: color, symbol, classification', 'Filter: attribute and spatial extent', 'Label: field binding and auto-placement'],
        },
      },
      {
        id: 'task-artifact',
        eyebrow: { zh: 'Task & Artifact', en: 'Task & Artifact' },
        title: { zh: '运行产生成果，成果可继续工作。', en: 'Runs produce outputs. Outputs can be continued.' },
        description: {
          zh: 'Task 记录每次运行的输入、工具、状态和输出。Artifact 是最终成果：地图、报告、数据、代码。支持版本追溯。',
          en: 'Task records every run\'s inputs, tools, status, and output. Artifact is the final output: maps, reports, data, code. Versioned and traceable.',
        },
        bullets: {
          zh: ['Task 记录参数、日志、耗时', 'Artifact 支持版本和导出', 'Task 输出可成为下游 Task 输入'],
          en: ['Task records parameters, logs, duration', 'Artifact supports versioning and export', 'Task output can feed downstream Tasks'],
        },
      },
    ],
    quote: {
      text: {
        zh: '对象不是功能模块，是工作流的载体。每个对象都带着上下文。',
        en: 'Objects aren\'t feature modules — they\'re workflow carriers. Each carries its context.',
      },
      author: { zh: 'GeoWork 数据模型原则', en: 'GeoWork data model principle' },
    },
    related: ['context', 'workflows', 'assistant', 'reporting'],
  },

  // ─── 4. Context ────────────────────────────────────────────────────────
  {
    slug: 'context',
    path: '/platform/context',
    eyebrow: { zh: 'Project Context', en: 'Project Context' },
    title: {
      zh: '同一个项目上下文，\n贯穿数据、地图、代码与成果。',
      en: 'One project context.\nAcross data, maps, code, and outputs.',
    },
    description: {
      zh: 'Project Context 连接数据、地图、代码、工具与执行历史，让每个对象保持上下文。不再反复切换工具和重建环境。',
      en: 'Project Context ties data, maps, code, tools, and execution history together. No more switching tools and rebuilding environments.',
    },
    primaryCta: { zh: '了解 GeoWork', en: 'Explore GeoWork' },
    secondaryCta: { zh: '查看数据模型', en: 'View data model' },
    secondaryCtaHref: '/platform/data',
    mediaTheme: 'context',
    mediaTitle: { zh: 'Project Context 连接图', en: 'Project Context connection map' },
    capabilities: [
      {
        id: 'shared-state',
        eyebrow: { zh: 'Shared state', en: 'Shared state' },
        title: { zh: '地图和代码共享同一状态。', en: 'Maps and code share the same state.' },
        description: {
          zh: '在 Map 模式选中的图层，在 Code 模式可直接引用。在 Code 模式计算的中间结果，在 Map 模式可立即可视化。',
          en: 'A layer selected in Map mode is directly referenceable in Code mode. An intermediate result computed in Code mode is immediately visualizable in Map mode.',
        },
        bullets: {
          zh: ['图层选择跨模式同步', '变量和结果跨模式可访问', '不需要导出/导入中间文件'],
          en: ['Layer selection syncs across modes', 'Variables and results accessible across modes', 'No need to export/import intermediate files'],
        },
      },
      {
        id: 'execution-history',
        eyebrow: { zh: 'Execution history', en: 'Execution history' },
        title: { zh: '每一步都有记录，可回溯。', en: 'Every step is recorded and traceable.' },
        description: {
          zh: 'Context 保存完整的执行历史：谁在什么时候运行了什么任务、用了什么参数、得到什么结果。支持按时间或对象检索。',
          en: 'Context keeps full execution history: who ran what task when, with which parameters, getting which results. Searchable by time or object.',
        },
        bullets: {
          zh: ['Task 运行日志按时间排序', '可按 Dataset 或 Layer 过滤历史', '支持差异对比两次运行结果'],
          en: ['Task run logs sorted by time', 'Filter history by Dataset or Layer', 'Diff comparison between two run results'],
        },
      },
      {
        id: 'tool-environment',
        eyebrow: { zh: 'Tool environment', en: 'Tool environment' },
        title: { zh: '工具环境跟随项目，不是全局配置。', en: 'Tool environment follows the project, not global config.' },
        description: {
          zh: '每个 Project 有自己的工具链配置：Python 版本、QGIS 路径、GEE 凭证、Skills 列表。切换项目即切换环境。',
          en: 'Each Project has its own toolchain config: Python version, QGIS path, GEE credentials, Skills list. Switching projects switches environments.',
        },
        bullets: {
          zh: ['Python 虚拟环境按项目隔离', 'GEE 凭证按项目配置', 'Skills 列表按项目启用'],
          en: ['Python venv isolated per project', 'GEE credentials configured per project', 'Skills enabled per project'],
        },
      },
      {
        id: 'contextual-search',
        eyebrow: { zh: 'Contextual search', en: 'Contextual search' },
        title: { zh: '搜索范围是项目，不是全局。', en: 'Search scope is the project, not global.' },
        description: {
          zh: '在项目中搜索数据、代码、文献或运行记录，结果限定在当前 Project 范围内。不会搜到其他项目的私有数据。',
          en: 'Search data, code, literature, or run records within a project — results are scoped to the current Project. Other projects\' private data won\'t appear.',
        },
        bullets: {
          zh: ['按数据名、代码内容、文献标题搜索', '结果限定在当前项目', '支持模糊匹配和字段筛选'],
          en: ['Search by data name, code content, paper title', 'Results scoped to current project', 'Fuzzy matching and field filtering'],
        },
      },
    ],
    quote: {
      text: {
        zh: '上下文不是附加功能，是工作流连续性的基础。',
        en: 'Context isn\'t an add-on — it\'s the foundation of workflow continuity.',
      },
      author: { zh: 'GeoWork 上下文原则', en: 'GeoWork context principle' },
    },
    related: ['data', 'workflows', 'assistant', 'research-intelligence'],
  },

  // ─── 5. Workflows ──────────────────────────────────────────────────────
  {
    slug: 'workflows',
    path: '/platform/workflows',
    eyebrow: { zh: 'Workflows', en: 'Workflows' },
    title: {
      zh: '从问题到成果的工作流程，\n连续可追踪。',
      en: 'Workflows from question to output,\ncontinuous and traceable.',
    },
    description: {
      zh: '一个 GeoWork 项目贯穿 Define → Organize → Analyze → Verify → Deliver。每个阶段的输出自然成为下一阶段的输入。',
      en: 'A GeoWork project runs through Define → Organize → Analyze → Verify → Deliver. Each stage\'s output naturally becomes the next stage\'s input.',
    },
    primaryCta: { zh: '了解 GeoWork', en: 'Explore GeoWork' },
    secondaryCta: { zh: '查看使用案例', en: 'View use cases' },
    secondaryCtaHref: '/use-cases',
    mediaTheme: 'workflows',
    mediaTitle: { zh: '五阶段工作流', en: 'Five-stage workflow' },
    capabilities: [
      {
        id: 'define',
        eyebrow: { zh: '1. Define', en: '1. Define' },
        title: { zh: '定义研究对象、范围和目标。', en: 'Define the research subject, scope, and goals.' },
        description: {
          zh: '创建 Project，填写研究问题、区域边界、数据来源和交付标准。设定项目成员和权限。',
          en: 'Create a Project. Fill in the research question, area boundary, data sources, and delivery criteria. Set members and permissions.',
        },
        bullets: {
          zh: ['研究问题作为项目主线', '区域边界绑定坐标系', '验收标准可量化'],
          en: ['Research question as project spine', 'Area boundary bound to CRS', 'Acceptance criteria quantifiable'],
        },
      },
      {
        id: 'organize',
        eyebrow: { zh: '2. Organize', en: '2. Organize' },
        title: { zh: '组织数据、文件、工具和上下文。', en: 'Organize data, files, tools, and context.' },
        description: {
          zh: '导入影像、矢量、代码、文献，建立可复用的目录结构。配置工具链和 Skills 环境。',
          en: 'Import imagery, vectors, code, and literature. Build a reusable directory structure. Configure the toolchain and Skills environment.',
        },
        bullets: {
          zh: ['数据按类型和时序分组', '文献按主题和引用组织', '工具环境跟随项目'],
          en: ['Data grouped by type and time series', 'Literature organized by theme and citation', 'Tool environment follows project'],
        },
      },
      {
        id: 'analyze',
        eyebrow: { zh: '3. Analyze', en: '3. Analyze' },
        title: { zh: '在地图、代码、终端之间推进分析。', en: 'Move analysis across map, code, and terminal.' },
        description: {
          zh: '在 Map 模式查看图层和空间关系，在 Code 模式编写和运行 Python 脚本，在 Work 模式管理任务和工具。',
          en: 'In Map mode, inspect layers and spatial relationships. In Code mode, write and run Python scripts. In Work mode, manage tasks and tools.',
        },
        bullets: {
          zh: ['三种模式共享同一项目状态', '中间结果跨模式可访问', '运行记录自动保存'],
          en: ['Three modes share one project state', 'Intermediate results accessible across modes', 'Run records saved automatically'],
        },
      },
      {
        id: 'verify-deliver',
        eyebrow: { zh: '4. Verify · 5. Deliver', en: '4. Verify · 5. Deliver' },
        title: { zh: '复核输入、过程和输出，交付可继续工作的成果。', en: 'Review inputs, process, and outputs. Deliver work you can continue.' },
        description: {
          zh: '检查数据来源、参数设置、运行日志和中间结果。导出最终成果：制图、数据集、可复用工作流和完整报告。',
          en: 'Inspect data sources, parameter settings, run logs, and intermediate results. Export final outputs: cartography, datasets, reusable workflows, and a full report.',
        },
        bullets: {
          zh: ['验证面板对比参数和结果', '导出格式：GeoTIFF / PDF / CSV / .py', '工作流可保存为 Skill 复用'],
          en: ['Verification panel compares parameters and results', 'Export formats: GeoTIFF / PDF / CSV / .py', 'Workflows saveable as Skills for reuse'],
        },
      },
    ],
    quote: {
      text: {
        zh: '工作流不是线性流水线，是连续的工作状态。每个阶段都保留上下文。',
        en: 'A workflow isn\'t a linear pipeline — it\'s a continuous work state. Every stage preserves context.',
      },
      author: { zh: 'GeoWork 工作流原则', en: 'GeoWork workflow principle' },
    },
    related: ['task-sequences', 'context', 'reporting', 'data'],
  },

  // ─── 6. Task Sequences ─────────────────────────────────────────────────
  {
    slug: 'task-sequences',
    path: '/platform/task-sequences',
    eyebrow: { zh: 'Task sequences', en: 'Task sequences' },
    title: {
      zh: '批量、定时、多阶段任务，\n自动执行。',
      en: 'Batch, scheduled, multi-stage tasks —\nautomated.',
    },
    description: {
      zh: '把重复的地理处理任务组织成序列。批量运行、定时触发或按条件执行，每个步骤可追踪。',
      en: 'Organize repetitive geoprocessing tasks into sequences. Run in batch, trigger on schedule, or execute by condition. Every step traceable.',
    },
    primaryCta: { zh: '了解 GeoWork', en: 'Explore GeoWork' },
    secondaryCta: { zh: '查看工作流', en: 'View workflows' },
    secondaryCtaHref: '/platform/workflows',
    mediaTheme: 'task-sequences',
    mediaTitle: { zh: 'Task Sequence 编排面板', en: 'Task Sequence orchestration panel' },
    capabilities: [
      {
        id: 'batch',
        eyebrow: { zh: 'Batch', en: 'Batch' },
        title: { zh: '同一流程，批量数据。', en: 'Same workflow, batch data.' },
        description: {
          zh: '对一个流程应用多个输入数据。比如对 12 个月的影像分别运行同一个变化检测算法。',
          en: 'Apply one workflow to multiple inputs. For example, run the same change detection algorithm on 12 months of imagery.',
        },
        bullets: {
          zh: ['输入列表：文件、区域或时间范围', '并行或串行执行', '单条失败不中断整批'],
          en: ['Input list: files, regions, or time ranges', 'Parallel or serial execution', 'Single failure doesn\'t break the batch'],
        },
      },
      {
        id: 'scheduled',
        eyebrow: { zh: 'Scheduled', en: 'Scheduled' },
        title: { zh: '定时触发，无人值守。', en: 'Scheduled triggers, unattended.' },
        description: {
          zh: '设定定时任务：每天拉取最新影像、每周生成报表、每月运行趋势分析。到时间自动执行。',
          en: 'Set scheduled tasks: pull latest imagery daily, generate reports weekly, run trend analysis monthly. Auto-executes on schedule.',
        },
        bullets: {
          zh: ['Cron 表达式定义时间', '任务依赖：上游完成后触发', '失败自动重试和通知'],
          en: ['Cron expressions for timing', 'Task dependencies: trigger on upstream completion', 'Auto-retry and notification on failure'],
        },
      },
      {
        id: 'multi-stage',
        eyebrow: { zh: 'Multi-stage', en: 'Multi-stage' },
        title: { zh: '多阶段串联，输出变输入。', en: 'Multi-stage chaining, output becomes input.' },
        description: {
          zh: '把复杂流程拆成多个阶段：预处理 → 分析 → 后处理 → 导出。每阶段输出自动作为下阶段输入。',
          en: 'Split complex flows into stages: preprocess → analyze → postprocess → export. Each stage\'s output auto-feeds the next stage\'s input.',
        },
        bullets: {
          zh: ['阶段间数据自动传递', '支持条件分支和循环', '每阶段独立可重试'],
          en: ['Data auto-passes between stages', 'Conditional branches and loops', 'Each stage independently retryable'],
        },
      },
      {
        id: 'monitoring',
        eyebrow: { zh: 'Monitoring', en: 'Monitoring' },
        title: { zh: '运行状态实时可见。', en: 'Run status visible in real time.' },
        description: {
          zh: '查看每个序列的运行历史、当前状态、日志和输出。支持暂停、恢复和终止。',
          en: 'View each sequence\'s run history, current status, logs, and outputs. Supports pause, resume, and terminate.',
        },
        bullets: {
          zh: ['状态面板：queued / running / done / failed', '实时日志流', '输出预览和下载'],
          en: ['Status panel: queued / running / done / failed', 'Real-time log streaming', 'Output preview and download'],
        },
      },
    ],
    quote: {
      text: {
        zh: '自动化不是消除人工，是把重复部分交给机器，把判断留给人。',
        en: 'Automation isn\'t about removing humans — it\'s giving repetition to machines and judgment to people.',
      },
      author: { zh: 'GeoWork 自动化原则', en: 'GeoWork automation principle' },
    },
    related: ['workflows', 'ai', 'reporting', 'assistant'],
  },

  // ─── 7. Research Intelligence ──────────────────────────────────────────
  {
    slug: 'research-intelligence',
    path: '/platform/research-intelligence',
    eyebrow: { zh: 'Research intelligence', en: 'Research intelligence' },
    title: {
      zh: '研究材料不再散落，\n研究过程可回溯。',
      en: 'Research materials in one place.\nProcess traceable.',
    },
    description: {
      zh: '整理文献、日志、会议和研究记录，让研究过程可检索、可引用。与数据分析连续。',
      en: 'Organize literature, logs, meetings, and research notes — searchable and citable. Continuous with data analysis.',
    },
    primaryCta: { zh: '了解 GeoWork', en: 'Explore GeoWork' },
    secondaryCta: { zh: '查看报告生成', en: 'View reporting' },
    secondaryCtaHref: '/platform/reporting',
    mediaTheme: 'research',
    mediaTitle: { zh: '研究材料管理面板', en: 'Research materials panel' },
    capabilities: [
      {
        id: 'literature',
        eyebrow: { zh: 'Literature', en: 'Literature' },
        title: { zh: '文献组织、检索和引用。', en: 'Literature organized, searchable, citable.' },
        description: {
          zh: '导入 PDF 文献，自动提取标题、作者、年份和摘要。按主题分组，全文检索，一键插入引用。',
          en: 'Import PDF papers. Auto-extract title, authors, year, and abstract. Group by theme, full-text search, one-click citation insertion.',
        },
        bullets: {
          zh: ['PDF 自动元数据提取', '全文检索和关键词高亮', '引用格式：APA / GB/T 7714 / BibTeX'],
          en: ['PDF auto-metadata extraction', 'Full-text search with keyword highlighting', 'Citation formats: APA / GB/T 7714 / BibTeX'],
        },
      },
      {
        id: 'notes',
        eyebrow: { zh: 'Notes', en: 'Notes' },
        title: { zh: '研究笔记与数据连续。', en: 'Research notes continuous with data.' },
        description: {
          zh: '在分析过程中记录笔记，笔记关联当前的图层、代码或运行结果。不用切换到单独的笔记应用。',
          en: 'Take notes during analysis. Notes link to the current layer, code, or run result. No need to switch to a separate notes app.',
        },
        bullets: {
          zh: ['笔记关联 Dataset / Layer / Task', '支持 Markdown 和 LaTeX 公式', '可标注时间戳和上下文快照'],
          en: ['Notes link to Dataset / Layer / Task', 'Markdown and LaTeX formula support', 'Timestamps and context snapshots'],
        },
      },
      {
        id: 'meetings',
        eyebrow: { zh: 'Meetings', en: 'Meetings' },
        title: { zh: '会议记录和决策追踪。', en: 'Meeting records and decision tracking.' },
        description: {
          zh: '记录组会、讨论和决策。每条记录关联相关项目和任务，可追踪后续执行。',
          en: 'Record group meetings, discussions, and decisions. Each record links to related projects and tasks, traceable to execution.',
        },
        bullets: {
          zh: ['会议记录关联项目和任务', '决策项可转化为 Task', '支持搜索历史决策'],
          en: ['Meeting records link to projects and tasks', 'Decision items convertible to Tasks', 'Searchable decision history'],
        },
      },
      {
        id: 'citation-chain',
        eyebrow: { zh: 'Citation chain', en: 'Citation chain' },
        title: { zh: '从文献到数据到结果，完整引用链。', en: 'From literature to data to result — full citation chain.' },
        description: {
          zh: '每个分析结果可追溯到原始文献、数据来源和运行参数。报告中的每个数字都能找到出处。',
          en: 'Every analysis result traces to original literature, data sources, and run parameters. Every number in a report has a provenance.',
        },
        bullets: {
          zh: ['结果 → Task → Dataset → 文献', '点击引用可跳转到原始来源', '导出引用链为附录'],
          en: ['Result → Task → Dataset → literature', 'Click citation to jump to source', 'Export citation chain as appendix'],
        },
      },
    ],
    quote: {
      text: {
        zh: '研究不是线性过程，是网状关联。工具应该保持这种关联，而不是切断它。',
        en: 'Research isn\'t linear — it\'s a network. Tools should preserve that network, not sever it.',
      },
      author: { zh: 'GeoWork 研究原则', en: 'GeoWork research principle' },
    },
    related: ['reporting', 'context', 'assistant', 'data'],
  },

  // ─── 8. Reporting ──────────────────────────────────────────────────────
  {
    slug: 'reporting',
    path: '/platform/reporting',
    eyebrow: { zh: 'Reporting', en: 'Reporting' },
    title: {
      zh: '报告是工作的继续，\n不是结束。',
      en: 'Reports continue the work.\nThey don\'t end it.',
    },
    description: {
      zh: '生成地图、图表、指标和研究报告。成果不是静态文档，而是可继续工作的 Artifact。',
      en: 'Generate maps, charts, metrics, and research reports. Outputs aren\'t static documents — they\'re Artifacts you can keep working with.',
    },
    primaryCta: { zh: '了解 GeoWork', en: 'Explore GeoWork' },
    secondaryCta: { zh: '查看使用案例', en: 'View use cases' },
    secondaryCtaHref: '/use-cases',
    mediaTheme: 'reporting',
    mediaTitle: { zh: '报告生成面板', en: 'Report generation panel' },
    capabilities: [
      {
        id: 'cartography',
        eyebrow: { zh: 'Cartography', en: 'Cartography' },
        title: { zh: '制图成果，可继续编辑。', en: 'Cartographic outputs, continuously editable.' },
        description: {
          zh: '从地图画布直接生成制图成果。支持图例、比例尺、指北针和图廓。导出为 GeoTIFF 或 PDF，也可保存为可编辑 Layer。',
          en: 'Generate cartographic outputs directly from the map canvas. Legend, scale bar, north arrow, and frame supported. Export as GeoTIFF or PDF, or save as an editable Layer.',
        },
        bullets: {
          zh: ['图例、比例尺、指北针自动生成', '导出：GeoTIFF / PDF / PNG', '可保存为 Layer 继续编辑'],
          en: ['Auto-generated legend, scale bar, north arrow', 'Export: GeoTIFF / PDF / PNG', 'Saveable as Layer for further editing'],
        },
      },
      {
        id: 'charts',
        eyebrow: { zh: 'Charts', en: 'Charts' },
        title: { zh: '图表绑定数据，更新同步。', en: 'Charts bound to data, synced on update.' },
        description: {
          zh: '从 Task 结果或 Dataset 生成图表。数据更新时图表自动同步。支持折线、柱状、散点、热力图等。',
          en: 'Generate charts from Task results or Datasets. Charts auto-sync when data updates. Line, bar, scatter, heatmap supported.',
        },
        bullets: {
          zh: ['数据绑定：Task 输出或 Dataset 字段', '类型：折线 / 柱状 / 散点 / 热力图', '导出：PNG / SVG / 嵌入报告'],
          en: ['Data binding: Task output or Dataset field', 'Types: line / bar / scatter / heatmap', 'Export: PNG / SVG / embed in report'],
        },
      },
      {
        id: 'metrics',
        eyebrow: { zh: 'Metrics', en: 'Metrics' },
        title: { zh: '指标可追溯，不凭空生成。', en: 'Metrics are traceable, not fabricated.' },
        description: {
          zh: '每个指标关联生成它的 Task 和数据来源。点击指标可查看计算过程、参数和原始数据。',
          en: 'Every metric links to the Task and data source that produced it. Click a metric to view the computation, parameters, and raw data.',
        },
        bullets: {
          zh: ['指标 → Task → Dataset 完整链路', '支持精度、覆盖率、统计量', '异常值标注和溯源'],
          en: ['Metric → Task → Dataset full chain', 'Supports accuracy, coverage, statistics', 'Outlier flagging and tracing'],
        },
      },
      {
        id: 'report-doc',
        eyebrow: { zh: 'Report document', en: 'Report document' },
        title: { zh: '完整报告，结构化生成。', en: 'Complete reports, structured generation.' },
        description: {
          zh: '组装制图、图表、指标和文字说明为完整报告。支持模板、自动目录和引用列表。导出 PDF 或可编辑文档。',
          en: 'Assemble cartography, charts, metrics, and text into a complete report. Templates, auto-TOC, and citation list supported. Export as PDF or editable document.',
        },
        bullets: {
          zh: ['模板：研究 / 技术 / 简报', '自动目录和引用列表', '导出：PDF / Markdown / LaTeX'],
          en: ['Templates: research / technical / brief', 'Auto-TOC and citation list', 'Export: PDF / Markdown / LaTeX'],
        },
      },
    ],
    quote: {
      text: {
        zh: '报告不是工作的终点，是下一阶段工作的输入。',
        en: 'A report isn\'t the end of work — it\'s the input to the next stage.',
      },
      author: { zh: 'GeoWork 报告原则', en: 'GeoWork reporting principle' },
    },
    related: ['workflows', 'research-intelligence', 'task-sequences', 'data'],
  },

  // ─── 9. Developer Platform ─────────────────────────────────────────────
  {
    slug: 'developers',
    path: '/platform/developers',
    eyebrow: { zh: 'Developer Platform', en: 'Developer Platform' },
    title: {
      zh: '在清晰的架构之上，\n扩展 GeoWork。',
      en: 'Extend GeoWork\non a clear architecture.',
    },
    description: {
      zh: '通过 API、SDK、MCP、Skills 和插件扩展 GeoWork。Desktop → Go Runtime → Python Worker → Tools → Skills / MCP，每层职责明确。',
      en: 'Extend GeoWork with API, SDK, MCP, Skills, and plugins. Desktop → Go Runtime → Python Worker → Tools → Skills / MCP — clear responsibilities per layer.',
    },
    primaryCta: { zh: '了解 GeoWork', en: 'Explore GeoWork' },
    secondaryCta: { zh: '查看生态', en: 'View ecosystem' },
    secondaryCtaHref: '/ecosystem',
    mediaTheme: 'developers',
    mediaTitle: { zh: '架构分层图', en: 'Architecture layer diagram' },
    capabilities: [
      {
        id: 'architecture',
        eyebrow: { zh: 'Architecture', en: 'Architecture' },
        title: { zh: '五层架构，职责明确。', en: 'Five-layer architecture, clear responsibilities.' },
        description: {
          zh: 'Desktop (UI) → Go Runtime (编排) → Python Worker (执行) → Tools (QGIS/GDAL/GEE) → Skills/MCP (扩展)。每层接口稳定。',
          en: 'Desktop (UI) → Go Runtime (orchestration) → Python Worker (execution) → Tools (QGIS/GDAL/GEE) → Skills/MCP (extension). Stable interfaces per layer.',
        },
        bullets: {
          zh: ['Desktop：Tauri + React，本地优先', 'Go Runtime：任务编排和工具调度', 'Python Worker：地理空间分析执行'],
          en: ['Desktop: Tauri + React, local-first', 'Go Runtime: task orchestration and tool scheduling', 'Python Worker: geospatial analysis execution'],
        },
      },
      {
        id: 'sdk',
        eyebrow: { zh: 'SDK', en: 'SDK' },
        title: { zh: 'Python SDK，直接调用。', en: 'Python SDK, direct invocation.' },
        description: {
          zh: '通过 Python SDK 直接调用 GeoWork 的 Project、Dataset、Task 和 Artifact 接口。在 Code 模式或外部脚本中使用。',
          en: 'Invoke GeoWork\'s Project, Dataset, Task, and Artifact interfaces directly via the Python SDK. Use in Code mode or external scripts.',
        },
        bullets: {
          zh: ['project.datasets.list()', 'task.run(params)', 'artifact.export(format)'],
          en: ['project.datasets.list()', 'task.run(params)', 'artifact.export(format)'],
        },
      },
      {
        id: 'skills-mcp',
        eyebrow: { zh: 'Skills & MCP', en: 'Skills & MCP' },
        title: { zh: '封装工作流，连接 AI。', en: 'Encapsulate workflows, connect AI.' },
        description: {
          zh: 'Skills 封装可复用的 GIS 命令工作流。MCP 让 AI Agent 能理解和调用这些 Skills。开发者可自定义。',
          en: 'Skills encapsulate reusable GIS command workflows. MCP lets AI agents understand and invoke these Skills. Developers can define their own.',
        },
        bullets: {
          zh: ['Skill = 命名 + 参数 + 工具链', 'MCP 暴露 Skill 给 Agent', '自定义 Skill 通过 YAML 定义'],
          en: ['Skill = name + params + toolchain', 'MCP exposes Skills to agents', 'Custom Skills defined via YAML'],
        },
      },
      {
        id: 'plugins',
        eyebrow: { zh: 'Plugins', en: 'Plugins' },
        title: { zh: '插件扩展界面与功能。', en: 'Plugins extend UI and features.' },
        description: {
          zh: '通过插件机制扩展 GeoWork 的界面和功能。插件可添加面板、菜单项、图层类型或自定义工具。',
          en: 'Extend GeoWork\'s UI and features through the plugin system. Plugins can add panels, menu items, layer types, or custom tools.',
        },
        bullets: {
          zh: ['UI 插件：面板、菜单、对话框', '数据插件：自定义图层类型', '工具插件：自定义处理算法'],
          en: ['UI plugins: panels, menus, dialogs', 'Data plugins: custom layer types', 'Tool plugins: custom processing algorithms'],
        },
      },
    ],
    quote: {
      text: {
        zh: '架构清晰，扩展才能稳定。每层接口都是契约。',
        en: 'Clear architecture enables stable extensions. Every layer interface is a contract.',
      },
      author: { zh: 'GeoWork 架构原则', en: 'GeoWork architecture principle' },
    },
    related: ['assistant', 'ai', 'data', 'workflows'],
  },
];

export const platformPageMap: Record<string, PlatformPageData> = Object.fromEntries(
  platformPages.map((p) => [p.slug, p]),
);

export function getPlatformPage(slug: string): PlatformPageData | undefined {
  return platformPageMap[slug];
}
