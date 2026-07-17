/**
 * Ecosystem Pages — Iteration 6 双语内容
 *
 * 8 个生态工具详情页的共享数据：
 * QGIS, GDAL, Python, PostGIS, GEE, MCP, Skills, Plugins
 *
 * 退出标准：
 * - 每个详情页有真实状态（未实现能力不标记为已连接）
 * - 详情页结构统一
 * - 有文档和相关工具入口
 *
 * Per v2.5 plan Iteration 6.
 */

export type EcosystemStatus = 'connected' | 'planned' | 'partial';

export type EcosystemCategory =
  | 'desktop'
  | 'library'
  | 'language'
  | 'database'
  | 'cloud'
  | 'protocol'
  | 'workflow'
  | 'extension';

export interface EcosystemFeature {
  id: string;
  title: { zh: string; en: string };
  description: { zh: string; en: string };
}

export interface EcosystemPageData {
  slug: string;
  path: string;
  /** 功能标签 */
  eyebrow: { zh: string; en: string };
  /** 大标题 */
  title: { zh: string; en: string };
  /** 价值说明 */
  description: { zh: string; en: string };
  /** 集成状态 */
  status: EcosystemStatus;
  /** 分类（用于列表页搜索和过滤） */
  category: EcosystemCategory;
  /** 核心能力列表 */
  features: EcosystemFeature[];
  /** 官方文档 URL */
  docsUrl: string;
  /** 仓库 URL（如有） */
  repoUrl?: string;
  /** 相关生态工具 slug */
  related: string[];
  /** 可信信息引用 */
  quote: {
    text: { zh: string; en: string };
    author: { zh: string; en: string };
  };
}

export const ecosystemPageList: EcosystemPageData[] = [
  // ─── 1. QGIS ─────────────────────────────────────────────
  {
    slug: 'qgis',
    path: '/ecosystem/qgis',
    eyebrow: { zh: '桌面 GIS', en: 'Desktop GIS' },
    title: {
      zh: 'QGIS：桌面 GIS 的核心连接。',
      en: 'QGIS: the desktop GIS core connection.',
    },
    description: {
      zh: 'GeoWork 与 QGIS 共享图层、处理工具和项目文件。在 GeoWork 中管理工作流，在 QGIS 中进行精细制图。',
      en: 'GeoWork shares layers, processing tools, and project files with QGIS. Manage workflows in GeoWork, do fine cartography in QGIS.',
    },
    status: 'connected',
    category: 'desktop',
    features: [
      {
        id: 'layer-sync',
        title: { zh: '图层共享', en: 'Layer sharing' },
        description: {
          zh: 'GeoWork 的 Layer 可直接导出为 QGIS 项目图层，保留样式和投影定义。',
          en: 'GeoWork Layers export directly to QGIS project layers, preserving styles and projection definitions.',
        },
      },
      {
        id: 'processing-tools',
        title: { zh: '处理工具链', en: 'Processing toolchain' },
        description: {
          zh: '调用 QGIS Processing 工具箱中的算法，作为 GeoWork Skill 的一部分执行。',
          en: 'Invoke QGIS Processing toolbox algorithms as part of GeoWork Skills.',
        },
      },
      {
        id: 'project-interop',
        title: { zh: '项目互操作', en: 'Project interop' },
        description: {
          zh: '.qgz / .qgs 项目文件可被 GeoWork 读取，数据源路径自动解析。',
          en: '.qgz / .qgs project files are readable by GeoWork, with data source paths auto-resolved.',
        },
      },
    ],
    docsUrl: 'https://qgis.org/en/docs/',
    repoUrl: 'https://github.com/qgis/QGIS',
    related: ['gdal', 'python', 'postgis'],
    quote: {
      text: {
        zh: 'QGIS 是开源桌面 GIS 的事实标准。GeoWork 不替代它，而是让它更好用。',
        en: 'QGIS is the de facto standard for open-source desktop GIS. GeoWork doesn\'t replace it — it makes it more usable.',
      },
      author: { zh: 'GeoWork 生态原则', en: 'GeoWork ecosystem principle' },
    },
  },

  // ─── 2. GDAL ─────────────────────────────────────────────
  {
    slug: 'gdal',
    path: '/ecosystem/gdal',
    eyebrow: { zh: '数据格式库', en: 'Data format library' },
    title: {
      zh: 'GDAL：地理数据格式与变换底座。',
      en: 'GDAL: the geospatial format and transform foundation.',
    },
    description: {
      zh: 'GeoWork 通过 GDAL 完成栅格与矢量格式转换、投影变换、裁剪和镶嵌。所有 I/O 路径都经过 GDAL 验证。',
      en: 'GeoWork uses GDAL for raster/vector format conversion, projection transforms, clipping, and mosaicking. All I/O paths go through GDAL.',
    },
    status: 'connected',
    category: 'library',
    features: [
      {
        id: 'format-support',
        title: { zh: '格式支持', en: 'Format support' },
        description: {
          zh: '支持 GeoTIFF、Shapefile、GeoJSON、KML、NetCDF、HDF 等 150+ 种栅格和矢量格式。',
          en: 'Supports 150+ raster and vector formats including GeoTIFF, Shapefile, GeoJSON, KML, NetCDF, HDF.',
        },
      },
      {
        id: 'projection',
        title: { zh: '投影变换', en: 'Projection transforms' },
        description: {
          zh: '基于 PROJ 库完成任意坐标系之间的转换，支持 WKT 和 EPSG 代码定义。',
          en: 'PROJ-based transformation between any coordinate systems, supporting WKT and EPSG code definitions.',
        },
      },
      {
        id: 'processing',
        title: { zh: '处理算法', en: 'Processing algorithms' },
        description: {
          zh: 'gdalwarp、gdal_translate、gdal_contour 等工具作为 Skill 命令直接可用。',
          en: 'gdalwarp, gdal_translate, gdal_contour and other tools are available directly as Skill commands.',
        },
      },
    ],
    docsUrl: 'https://gdal.org/documentation/',
    repoUrl: 'https://github.com/OSGeo/gdal',
    related: ['qgis', 'python', 'postgis'],
    quote: {
      text: {
        zh: 'GDAL 是地理空间数据的通用语言。没有它，工具之间无法对话。',
        en: 'GDAL is the lingua franca of geospatial data. Without it, tools can\'t talk to each other.',
      },
      author: { zh: 'GeoWork 架构原则', en: 'GeoWork architecture principle' },
    },
  },

  // ─── 3. Python ───────────────────────────────────────────
  {
    slug: 'python',
    path: '/ecosystem/python',
    eyebrow: { zh: '编程语言', en: 'Programming language' },
    title: {
      zh: 'Python：地理空间分析的事实标准。',
      en: 'Python: the de facto standard for geospatial analysis.',
    },
    description: {
      zh: 'GeoWork 内置 Python Geo Worker，连接 rasterio、geopandas、xarray、shapely 等核心生态。在 Code 模式中直接编写分析脚本。',
      en: 'GeoWork ships a Python Geo Worker connecting rasterio, geopandas, xarray, shapely, and more. Write analysis scripts directly in Code mode.',
    },
    status: 'connected',
    category: 'language',
    features: [
      {
        id: 'geo-worker',
        title: { zh: 'Python Geo Worker', en: 'Python Geo Worker' },
        description: {
          zh: '嵌入式 Python 运行时，预装地理空间分析库。无需配置环境，开箱即用。',
          en: 'Embedded Python runtime with pre-installed geospatial libraries. No environment setup needed.',
        },
      },
      {
        id: 'ecosystem-libs',
        title: { zh: '生态库', en: 'Ecosystem libraries' },
        description: {
          zh: 'rasterio（栅格 I/O）、geopandas（矢量分析）、xarray（多维数组）、shapely（几何操作）、fiona（矢量 I/O）。',
          en: 'rasterio (raster I/O), geopandas (vector analysis), xarray (multi-dim arrays), shapely (geometry ops), fiona (vector I/O).',
        },
      },
      {
        id: 'code-mode',
        title: { zh: 'Code 模式集成', en: 'Code mode integration' },
        description: {
          zh: '在 Code 模式中编写的脚本可直接访问当前 Project 的 Dataset 和 Layer，结果自动回写为 Artifact。',
          en: 'Scripts written in Code mode access the current Project\'s Datasets and Layers directly, with results auto-saved as Artifacts.',
        },
      },
    ],
    docsUrl: 'https://docs.python.org/3/',
    repoUrl: 'https://github.com/python/cpython',
    related: ['gdal', 'postgis', 'google-earth-engine'],
    quote: {
      text: {
        zh: 'Python 让地理空间分析从黑箱变成代码。每一步都可读、可改、可复用。',
        en: 'Python turns geospatial analysis from a black box into code. Every step is readable, modifiable, and reusable.',
      },
      author: { zh: 'GeoWork 设计理念', en: 'GeoWork design philosophy' },
    },
  },

  // ─── 4. PostGIS ──────────────────────────────────────────
  {
    slug: 'postgis',
    path: '/ecosystem/postgis',
    eyebrow: { zh: '空间数据库', en: 'Spatial database' },
    title: {
      zh: 'PostGIS：空间数据库的工业标准。',
      en: 'PostGIS: the industrial standard spatial database.',
    },
    description: {
      zh: 'GeoWork 计划连接 PostGIS 进行空间数据库查询和大规模矢量分析。当前处于计划阶段，尚未实现。',
      en: 'GeoWork plans to connect to PostGIS for spatial database queries and large-scale vector analysis. Currently in planning stage, not yet implemented.',
    },
    status: 'planned',
    category: 'database',
    features: [
      {
        id: 'spatial-query',
        title: { zh: '空间查询', en: 'Spatial queries' },
        description: {
          zh: '计划支持将 Layer 数据推送到 PostGIS，使用 SQL 进行空间查询（ST_Contains、ST_Intersects 等）。',
          en: 'Planned: push Layer data to PostGIS and use SQL for spatial queries (ST_Contains, ST_Intersects, etc.).',
        },
      },
      {
        id: 'large-scale',
        title: { zh: '大规模分析', en: 'Large-scale analysis' },
        description: {
          zh: '计划支持在 PostGIS 中执行大规模矢量分析，结果拉回 GeoWork 作为 Layer。',
          en: 'Planned: run large-scale vector analysis in PostGIS, with results pulled back to GeoWork as Layers.',
        },
      },
      {
        id: 'connection-mgmt',
        title: { zh: '连接管理', en: 'Connection management' },
        description: {
          zh: '计划在 Project Context 中管理 PostGIS 连接配置，支持多数据库切换。',
          en: 'Planned: manage PostGIS connection configs in Project Context, supporting multi-database switching.',
        },
      },
    ],
    docsUrl: 'https://postgis.net/documentation/',
    repoUrl: 'https://git.osgeo.org/gitea/postgis/postgis',
    related: ['qgis', 'gdal', 'python'],
    quote: {
      text: {
        zh: 'PostGIS 是空间数据库的工业标准。当数据量超出桌面能力时，它是自然的下一步。',
        en: 'PostGIS is the industrial standard for spatial databases. When data volume exceeds desktop capacity, it\'s the natural next step.',
      },
      author: { zh: 'GeoWork 路线图', en: 'GeoWork roadmap' },
    },
  },

  // ─── 5. Google Earth Engine ─────────────────────────────
  {
    slug: 'google-earth-engine',
    path: '/ecosystem/google-earth-engine',
    eyebrow: { zh: '云端遥感', en: 'Cloud remote sensing' },
    title: {
      zh: 'Google Earth Engine：行星级遥感存取。',
      en: 'Google Earth Engine: planetary-scale imagery access.',
    },
    description: {
      zh: 'GeoWork 集成 GEE 完成大规模遥感影像存取、合成与时序分析。需要 Google 账号认证后使用。',
      en: 'GeoWork integrates GEE for large-scale imagery access, compositing, and time-series analysis. Requires Google account authentication.',
    },
    status: 'partial',
    category: 'cloud',
    features: [
      {
        id: 'image-collection',
        title: { zh: '影像集合', en: 'Image collections' },
        description: {
          zh: '访问 Landsat、Sentinel、MODIS 等影像集合，按时间和区域过滤。',
          en: 'Access Landsat, Sentinel, MODIS and other image collections, filtered by time and region.',
        },
      },
      {
        id: 'compositing',
        title: { zh: '合成与去云', en: 'Compositing & cloud masking' },
        description: {
          zh: '使用 GEE 的合成算法和云掩膜函数生成无云影像。',
          en: 'Use GEE\'s compositing algorithms and cloud masking functions to generate cloud-free imagery.',
        },
      },
      {
        id: 'time-series',
        title: { zh: '时序分析', en: 'Time-series analysis' },
        description: {
          zh: '在 GEE 上执行时序分析（NDVI 趋势、变化检测），结果导回 GeoWork。',
          en: 'Run time-series analysis on GEE (NDVI trends, change detection), with results exported back to GeoWork.',
        },
      },
    ],
    docsUrl: 'https://developers.google.com/earth-engine',
    related: ['python', 'gdal', 'qgis'],
    quote: {
      text: {
        zh: 'GEE 让行星级遥感分析从几天变成几分钟。但它需要网络和账号，GeoWork 让它在本地工作流中可用。',
        en: 'GEE makes planetary-scale remote sensing go from days to minutes. But it needs network and account — GeoWork makes it usable in local workflows.',
      },
      author: { zh: 'GeoWork 集成理念', en: 'GeoWork integration philosophy' },
    },
  },

  // ─── 6. MCP ──────────────────────────────────────────────
  {
    slug: 'mcp',
    path: '/ecosystem/mcp',
    eyebrow: { zh: 'AI 协议', en: 'AI protocol' },
    title: {
      zh: 'MCP：让 AI 真正理解地理空间工作。',
      en: 'MCP: making AI truly understand geospatial work.',
    },
    description: {
      zh: 'Model Context Protocol 扩展，让 AI Agent 能理解 GeoWork 的 Project、Dataset、Layer 和 Task 结构，并调用 Skills。',
      en: 'Model Context Protocol extensions that let AI agents understand GeoWork\'s Project, Dataset, Layer, and Task structure, and invoke Skills.',
    },
    status: 'connected',
    category: 'protocol',
    features: [
      {
        id: 'context-exposure',
        title: { zh: '上下文暴露', en: 'Context exposure' },
        description: {
          zh: 'MCP 将当前 Project 的数据结构、图层状态和任务历史暴露给 AI Agent。',
          en: 'MCP exposes the current Project\'s data structure, layer status, and task history to AI agents.',
        },
      },
      {
        id: 'skill-invocation',
        title: { zh: 'Skill 调用', en: 'Skill invocation' },
        description: {
          zh: 'AI Agent 通过 MCP 调用已注册的 Skill，执行 GIS 处理、数据转换和报告生成。',
          en: 'AI agents invoke registered Skills through MCP to perform GIS processing, data conversion, and report generation.',
        },
      },
      {
        id: 'safety-controls',
        title: { zh: '安全控制', en: 'Safety controls' },
        description: {
          zh: '所有 MCP 调用经过权限检查，敏感操作需要用户确认。',
          en: 'All MCP calls go through permission checks, with sensitive operations requiring user confirmation.',
        },
      },
    ],
    docsUrl: 'https://modelcontextprotocol.io/docs',
    repoUrl: 'https://github.com/modelcontextprotocol',
    related: ['skills', 'plugins', 'python'],
    quote: {
      text: {
        zh: 'MCP 是 AI 和工具之间的契约。没有它，AI 只能说不能做。',
        en: 'MCP is the contract between AI and tools. Without it, AI can only talk, not act.',
      },
      author: { zh: 'GeoWork AI 架构', en: 'GeoWork AI architecture' },
    },
  },

  // ─── 7. Skills ───────────────────────────────────────────
  {
    slug: 'skills',
    path: '/ecosystem/skills',
    eyebrow: { zh: '工作流单元', en: 'Workflow units' },
    title: {
      zh: 'Skills：可复用的地理工作流单元。',
      en: 'Skills: reusable geospatial workflow units.',
    },
    description: {
      zh: 'Skills 封装可复用的 GIS、遥感和报告生成工作流。每个 Skill 有名称、参数和工具链，可被 AI Agent 或用户直接调用。',
      en: 'Skills encapsulate reusable GIS, remote sensing, and report-generation workflows. Each Skill has a name, parameters, and toolchain, invocable by AI agents or users directly.',
    },
    status: 'connected',
    category: 'workflow',
    features: [
      {
        id: 'skill-structure',
        title: { zh: 'Skill 结构', en: 'Skill structure' },
        description: {
          zh: '每个 Skill = 名称 + 参数定义 + 工具链（GDAL/QGIS/Python 命令）+ 输出类型。通过 YAML 定义。',
          en: 'Each Skill = name + parameter definition + toolchain (GDAL/QGIS/Python commands) + output type. Defined via YAML.',
        },
      },
      {
        id: 'built-in-skills',
        title: { zh: '内置 Skills', en: 'Built-in Skills' },
        description: {
          zh: '内置 NDVI 计算、影像裁剪、投影转换、矢量缓冲、报告生成等常用 Skill。',
          en: 'Built-in Skills for NDVI calculation, image clipping, projection conversion, vector buffering, report generation.',
        },
      },
      {
        id: 'custom-skills',
        title: { zh: '自定义 Skills', en: 'Custom Skills' },
        description: {
          zh: '用户可通过 YAML 文件自定义 Skill，注册后在 Assistant 和 MCP 中可用。',
          en: 'Users can define custom Skills via YAML files, available in Assistant and MCP after registration.',
        },
      },
    ],
    docsUrl: 'https://github.com/Wanfeng1028/GeoWork/tree/main/docs/skills',
    repoUrl: 'https://github.com/Wanfeng1028/GeoWork',
    related: ['mcp', 'plugins', 'python'],
    quote: {
      text: {
        zh: 'Skill 是地理工作的函数。定义一次，到处调用——人、AI、自动化都能用。',
        en: 'A Skill is a function for geospatial work. Define once, invoke anywhere — by humans, AI, or automation.',
      },
      author: { zh: 'GeoWork Skill 设计', en: 'GeoWork Skill design' },
    },
  },

  // ─── 8. Plugins ──────────────────────────────────────────
  {
    slug: 'plugins',
    path: '/ecosystem/plugins',
    eyebrow: { zh: '扩展接口', en: 'Extension interface' },
    title: {
      zh: 'Plugins：扩展 GeoWork 的功能与界面。',
      en: 'Plugins: extend GeoWork features and UI.',
    },
    description: {
      zh: '通过插件机制扩展 GeoWork 的界面和功能。当前处于计划阶段，API 尚未稳定。',
      en: 'Extend GeoWork\'s UI and features through the plugin system. Currently in planning stage, API not yet stable.',
    },
    status: 'planned',
    category: 'extension',
    features: [
      {
        id: 'ui-plugins',
        title: { zh: 'UI 插件', en: 'UI plugins' },
        description: {
          zh: '计划支持添加自定义面板、菜单项和对话框。基于 React 组件系统。',
          en: 'Planned: add custom panels, menu items, and dialogs. Based on the React component system.',
        },
      },
      {
        id: 'data-plugins',
        title: { zh: '数据插件', en: 'Data plugins' },
        description: {
          zh: '计划支持自定义图层类型和数据源适配器。',
          en: 'Planned: custom layer types and data source adapters.',
        },
      },
      {
        id: 'tool-plugins',
        title: { zh: '工具插件', en: 'Tool plugins' },
        description: {
          zh: '计划支持注册自定义处理算法，作为 Skill 使用。',
          en: 'Planned: register custom processing algorithms, usable as Skills.',
        },
      },
    ],
    docsUrl: 'https://github.com/Wanfeng1028/GeoWork/tree/main/docs/plugins',
    repoUrl: 'https://github.com/Wanfeng1028/GeoWork',
    related: ['skills', 'mcp', 'python'],
    quote: {
      text: {
        zh: '插件系统是 GeoWork 的未来。但 API 需要先稳定，否则扩展会成为负担。',
        en: 'The plugin system is GeoWork\'s future. But the API needs to stabilize first, or extensions become a burden.',
      },
      author: { zh: 'GeoWork 路线图', en: 'GeoWork roadmap' },
    },
  },
];

export const ecosystemPageMap: Record<string, EcosystemPageData> = Object.fromEntries(
  ecosystemPageList.map((p) => [p.slug, p]),
);

export function getEcosystemPage(slug: string): EcosystemPageData | undefined {
  return ecosystemPageMap[slug];
}

/** 分类标签（双语） */
export const ecosystemCategoryLabels: Record<EcosystemCategory, { zh: string; en: string }> = {
  desktop: { zh: '桌面 GIS', en: 'Desktop GIS' },
  library: { zh: '数据格式库', en: 'Data library' },
  language: { zh: '编程语言', en: 'Language' },
  database: { zh: '数据库', en: 'Database' },
  cloud: { zh: '云端服务', en: 'Cloud service' },
  protocol: { zh: '协议', en: 'Protocol' },
  workflow: { zh: '工作流', en: 'Workflow' },
  extension: { zh: '扩展', en: 'Extension' },
};

/** 状态标签（双语） */
export const ecosystemStatusLabels: Record<EcosystemStatus, { zh: string; en: string }> = {
  connected: { zh: '已连接', en: 'Connected' },
  planned: { zh: '计划中', en: 'Planned' },
  partial: { zh: '部分支持', en: 'Partial' },
};
