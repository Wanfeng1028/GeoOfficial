export interface UseCaseSummary {
  slug: string;
  title: string;
  description: string;
  problem: string;
  inputs: string[];
  workflow: string[];
  outputs: string[];
  tools: string[];
  audience: string;
  status: 'available' | 'preview' | 'planned';
  image: string;
  imageAlt: string;
  limitations: string[];
}

export const useCases: UseCaseSummary[] = [
  {
    slug: 'urban-expansion',
    title: '城市扩张与土地利用变化',
    description: '组织多时相影像、变化检测、统计结果和制图输出。',
    problem: '分析某城市过去若干年建设用地扩张范围、速率和主要转化来源。',
    inputs: ['Landsat / Sentinel 多时相影像', '矢量行政边界', '参考土地利用分类'],
    workflow: [
      '建立项目并定义研究范围与时间窗口',
      '导入多时相影像并进行预处理',
      '运行变化检测和分类',
      '统计扩张面积与来源类型',
      '生成地图、图表和报告草稿',
    ],
    outputs: ['变化图', '面积统计表', '方法记录', '报告草稿'],
    tools: ['QGIS', 'GDAL', 'Google Earth Engine', 'Python'],
    audience: '科研 / 行业分析',
    status: 'preview',
    image: '/media/use-cases/urban-expansion/result.webp',
    imageAlt:
      '城市扩张分析结果：左侧为研究区土地利用变化地图，右侧为各类型面积统计柱状图。',
    limitations: [
      '示例数据为公开影像，精度受云覆盖和时间分辨率限制',
      '分类方法仅为基础示例，不代表最优精度',
    ],
  },
  {
    slug: 'ndvi-series',
    title: 'NDVI 时间序列分析',
    description: '计算植被指数、时序统计和趋势可视化。',
    problem: '研究某区域植被指数随时间的变化趋势和异常点。',
    inputs: ['多时相遥感影像', '研究区矢量边界', '气象辅助数据'],
    workflow: [
      '导入影像并裁切到研究区',
      '计算 NDVI 时序',
      '统计最大、最小、均值和趋势',
      '生成时序图和空间分布图',
      '导出结果与报告',
    ],
    outputs: ['NDVI 时序折线图', '空间分布地图', '统计表', '报告'],
    tools: ['Google Earth Engine', 'Python', 'GDAL'],
    audience: '科研 / 教学',
    status: 'preview',
    image: '/media/use-cases/ndvi-series/result.webp',
    imageAlt:
      'NDVI 时间序列分析结果：左侧为研究区 NDVI 空间分布地图，右侧为多年 NDVI 折线图。',
    limitations: [
      '示例为公开数据演示，未做严格精度评估',
      '当前版本自动化能力属于 Developer Preview',
    ],
  },
  {
    slug: 'research-report',
    title: '文献阅读与实验报告生成',
    description: '组织文献、复现实验、生成图表和报告。',
    problem: '整理研究文献、复现方法步骤、生成可检查的实验报告。',
    inputs: ['相关论文', '实验数据', '已有代码与笔记'],
    workflow: [
      '建立研究项目并导入文献',
      '记录方法与参数',
      '运行复现步骤',
      '生成图表、统计和报告草稿',
      '导出报告与方法记录',
    ],
    outputs: ['实验报告', '图表', '方法记录', '参考文献'],
    tools: ['Python', 'Skills', 'Markdown / PDF 导出'],
    audience: '科研 / 教学',
    status: 'preview',
    image: '/media/use-cases/research-report/result.webp',
    imageAlt:
      '科研报告工作台：左侧文献与笔记，中间代码与运行结果，右侧报告草稿与图表。',
    limitations: [
      '文献内容需自行确认版权',
      '自动化总结属于辅助能力，结果需人工核对',
    ],
  },
];
