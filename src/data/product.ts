export interface ProductPrinciple {
  index: string;
  title: string;
  description: string;
}

export const productPrinciples: ProductPrinciple[] = [
  {
    index: '01',
    title: '项目优先',
    description:
      '围绕真实项目组织数据、工具、文件与成果，而不是围绕一次对话组织工作。',
  },
  {
    index: '02',
    title: '上下文连续',
    description:
      '地图、代码、终端、文献和报告共享同一个项目上下文，不再反复切换工具。',
  },
  {
    index: '03',
    title: '可扩展',
    description:
      '通过 Skills、MCP 与插件连接专业工具和可复用工作流，不为单一算法绑定。',
  },
];

export interface ArchitectureNode {
  id: string;
  label: string;
  description: string;
  layer: 'desktop' | 'runtime' | 'worker' | 'tools' | 'extension';
}

export const architectureNodes: ArchitectureNode[] = [
  {
    id: 'desktop',
    label: 'GeoWork Desktop',
    description: 'Electron + React + TypeScript 桌面界面',
    layer: 'desktop',
  },
  {
    id: 'runtime',
    label: 'Go Runtime',
    description: '核心运行时与任务编排',
    layer: 'runtime',
  },
  {
    id: 'worker',
    label: 'Python Geo Worker',
    description: 'FastAPI 地理空间 Worker',
    layer: 'worker',
  },
  {
    id: 'tools',
    label: 'GIS / Remote Sensing',
    description: 'QGIS · GDAL · Google Earth Engine',
    layer: 'tools',
  },
  {
    id: 'extension',
    label: 'Skills / MCP / Plugins',
    description: '可扩展能力与第三方连接',
    layer: 'extension',
  },
];

export interface EcosystemGroup {
  title: string;
  items: string[];
}

export const ecosystemGroups: EcosystemGroup[] = [
  {
    title: 'Official Skills',
    items: ['GIS 命令', '遥感时序', '报告生成', '文献阅读'],
  },
  {
    title: '工具连接',
    items: ['QGIS', 'GDAL', 'Google Earth Engine', 'Python'],
  },
  {
    title: 'MCP / Plugins',
    items: ['模型路由', '工作流自动化', '第三方插件'],
  },
];
