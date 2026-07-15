import { mediaAssets } from '@/data/media';

export const homeContent = {
  hero: {
    eyebrow: 'GeoWork',
    title: '地图、遥感、代码与研究，汇于一个工作台。',
    description:
      'GeoWork 是面向 GIS、遥感与空间研究的桌面工作台，让项目、工具、数据和成果保持在同一个上下文中。',
    primaryCta: { label: '探索产品', href: '/product' },
    secondaryCta: { label: 'GitHub', href: 'https://github.com/Wanfeng1028/GeoWork' },
    status: 'Developer Preview · 查看当前可用平台',
  },
  principles: {
    title: '为地理空间工作而生的桌面工作台。',
    subtitle: '三条产品原则，不靠营销套话。',
    items: [
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
    ],
  },
  workflow: {
    eyebrow: '工作流',
    title: '从项目开始，以可继续工作的成果结束。',
    subtitle: '一个 GeoWork 项目贯穿 Intent、Organize、Work、Deliver 四个阶段。',
    steps: [
      {
        id: 'project',
        label: 'Project',
        title: '定义研究对象、范围和交付目标。',
        description: '创建项目，记录研究问题、区域、数据来源和验收标准。',
      },
      {
        id: 'organize',
        label: 'Organize',
        title: '组织数据、文件、工具和项目上下文。',
        description:
          '导入影像、矢量、代码、文献和已有成果，建立可复用的目录与上下文。',
      },
      {
        id: 'work',
        label: 'Work',
        title: '在地图、代码、终端与研究材料之间推进任务。',
        description:
          '调用 QGIS、GDAL、GEE、Python 和 Skills，在同一项目下完成连续步骤。',
      },
      {
        id: 'deliver',
        label: 'Deliver',
        title: '得到地图、数据、代码、图表和报告。',
        description: '复核成果，导出可复用的数据、报告和工作流，保留过程记录。',
      },
    ],
  },
  modes: {
    eyebrow: '三种工作模式',
    title: 'Work / Code / Map，共享同一项目。',
    subtitle: '在三种模式之间切换不会丢失上下文，工具、数据和成果保持连续。',
    items: [
      {
        id: 'work',
        label: 'Work',
        description: '组织任务、文件、工具和成果。',
        image: mediaAssets.modes.work.src,
        alt: mediaAssets.modes.work.alt,
      },
      {
        id: 'code',
        label: 'Code',
        description: '编写、运行和检查地理空间代码。',
        image: mediaAssets.modes.code.src,
        alt: mediaAssets.modes.code.alt,
      },
      {
        id: 'map',
        label: 'Map',
        description: '查看图层、范围、结果和空间关系。',
        image: mediaAssets.modes.map.src,
        alt: mediaAssets.modes.map.alt,
      },
    ],
  },
  useCases: {
    eyebrow: '真实地理空间工作',
    title: '从问题到成果的完整工作过程。',
    subtitle: '每个案例包含输入、过程、工具、输出和当前可用状态，不用抽象形容词替代成果。',
  },
  architecture: {
    eyebrow: '本地优先架构',
    title: '专业地理空间能力，运行在清晰的本地架构之上。',
    subtitle:
      '桌面界面、Go Runtime 与 Python Geo Worker 分层协作，并连接 QGIS、GDAL、Google Earth Engine、模型、Skills 与 MCP。',
  },
  download: {
    eyebrow: '开始使用',
    title: '开始使用 GeoWork。',
    subtitle:
      'GeoWork 当前处于 Developer Preview。请先查看系统要求、版本说明和已知限制。',
  },
} as const;
