/**
 * Ecosystem — GeoWork 生态关系图数据
 *
 * 关系链：
 * GeoWork Core → Skills → QGIS / GDAL / GEE / Python → MCP / Plugins → Outputs
 */
export interface EcosystemNode {
  id: string;
  label: string;
  description: string;
  /** 节点类型，影响展示样式 */
  type: 'core' | 'skill' | 'tool' | 'plugin' | 'output';
}

export const ecosystemNodes: EcosystemNode[] = [
  {
    id: 'core',
    label: 'GeoWork Core',
    description: '桌面工作台、Go Runtime、Python Geo Worker',
    type: 'core',
  },
  {
    id: 'skills',
    label: 'Skills',
    description: 'GIS 命令、遥感时序、报告生成、文献阅读',
    type: 'skill',
  },
  {
    id: 'tools',
    label: '专业工具',
    description: 'QGIS · GDAL · Google Earth Engine · Python',
    type: 'tool',
  },
  {
    id: 'plugins',
    label: 'MCP / Plugins',
    description: '模型路由、工作流自动化、第三方扩展',
    type: 'plugin',
  },
  {
    id: 'outputs',
    label: 'Outputs',
    description: '地图、数据、报告、可复用工作流',
    type: 'output',
  },
];

/** 连接关系（source → target） */
export const ecosystemConnections: { source: string; target: string }[] = [
  { source: 'core', target: 'skills' },
  { source: 'skills', target: 'tools' },
  { source: 'skills', target: 'plugins' },
  { source: 'tools', target: 'outputs' },
  { source: 'plugins', target: 'outputs' },
];