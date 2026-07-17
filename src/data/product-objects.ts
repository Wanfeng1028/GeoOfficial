/**
 * Product Objects — GeoWork 核心领域对象
 *
 * 展示方式：
 * - 一个主工作区截图
 * - 点击对象时高亮对应区域
 * - 右侧说明对象作用
 * - 不做五张卡片
 */
export interface ProductObject {
  id: string;
  label: string;
  title: string;
  enTitle: string;
  description: string;
  enDescription: string;
  /** 高亮区域在截图中的位置（CSS inset 值） */
  highlight?: { top: string; left: string; width: string; height: string };
}

export const productObjects: ProductObject[] = [
  {
    id: 'project',
    label: 'Project',
    title: '研究项目，一切工作的起点。',
    enTitle: 'The research project — where every workflow begins.',
    description:
      '每个 Project 包含研究问题、区域边界、数据来源、工具链和交付标准。项目贯穿 Define → Organize → Analyze → Verify → Deliver 全过程。',
    enDescription:
      'Each Project carries the research question, area boundary, data sources, toolchain, and delivery criteria. It spans Define → Organize → Analyze → Verify → Deliver end-to-end.',
    highlight: { top: '0', left: '0', width: '18%', height: '100%' },
  },
  {
    id: 'dataset',
    label: 'Dataset',
    title: '影像、矢量、表格、文档，统一导入。',
    enTitle: 'Imagery, vectors, tables, documents — imported into one place.',
    description:
      'Dataset 管理所有输入数据：遥感影像、矢量文件、CSV 表格、PDF 文献。支持本地文件、服务器和云存储接入。',
    enDescription:
      'Dataset manages every input: remote sensing imagery, vector files, CSV tables, PDF papers. Local files, servers, and cloud storage are all supported.',
    highlight: { top: '24%', left: '0', width: '100%', height: '32%' },
  },
  {
    id: 'layer',
    label: 'Layer',
    title: '叠加、对比、分析空间图层。',
    enTitle: 'Stack, compare, and analyze spatial layers.',
    description:
      'Layer 是地图画布上的可见单元。每个 Layer 可独立配置样式、透明度、筛选条件和标注。支持矢量、栅格和瓦片图层。',
    enDescription:
      'Layer is the visible unit on the map canvas. Each layer has independent style, opacity, filter, and label config. Vector, raster, and tile layers are all supported.',
    highlight: { top: '0', left: '18%', width: '52%', height: '100%' },
  },
  {
    id: 'task',
    label: 'Task',
    title: '可追踪的运行单元，连接工具与数据。',
    enTitle: 'A traceable run unit — connecting tools and data.',
    description:
      'Task 记录每次运行：输入参数、调用工具、执行状态、输出结果和耗时。任务可复用、可组合，支持 Skills 和 MCP 扩展。',
    enDescription:
      'Task records every run: input parameters, invoked tools, execution status, output, and duration. Tasks are reusable and composable, with Skills and MCP extensions.',
    highlight: { top: '56%', left: '0', width: '100%', height: '44%' },
  },
  {
    id: 'artifact',
    label: 'Artifact',
    title: '地图、报告、图表、代码，可交付的成果。',
    enTitle: 'Maps, reports, charts, code — deliverable outputs.',
    description:
      'Artifact 是项目的最终输出：制图成果、分析报告、数据导出、代码片段和工作流记录。支持版本追溯和导出复用。',
    enDescription:
      'Artifact is the final output of a project: cartographic results, analysis reports, data exports, code snippets, and workflow records. Versioned and reusable.',
    highlight: { top: '0', left: '70%', width: '30%', height: '100%' },
  },
];
