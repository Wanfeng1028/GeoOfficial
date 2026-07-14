export interface ArchitectureLayer {
  id: string;
  label: string;
  description: string;
  layer: 'desktop' | 'runtime' | 'worker' | 'tools' | 'extension';
}

export const architectureLayers: ArchitectureLayer[] = [
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
    description: 'QGIS · GDAL · Google Earth Engine · 模型',
    layer: 'tools',
  },
  {
    id: 'extension',
    label: 'Skills / MCP / Plugins',
    description: '可扩展能力、第三方工具与工作流连接',
    layer: 'extension',
  },
];
