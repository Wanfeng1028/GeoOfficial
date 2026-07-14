export interface PlatformRule {
  id: string;
  label: string;
  patterns: RegExp[];
  available: boolean;
  notes?: string;
}

export const platformRules: PlatformRule[] = [
  {
    id: 'windows-x64',
    label: 'Windows x64',
    patterns: [/win/i, /x64/i, /\.exe$/i, /\.msi$/i],
    available: true,
    notes: 'Windows 10 / 11 64-bit',
  },
  {
    id: 'macos-arm64',
    label: 'macOS Apple Silicon',
    patterns: [/mac/i, /arm64/i, /\.dmg$/i],
    available: false,
    notes: '尚未提供官方构建',
  },
  {
    id: 'macos-x64',
    label: 'macOS Intel',
    patterns: [/mac/i, /x64/i, /\.dmg$/i],
    available: false,
    notes: '尚未提供官方构建',
  },
  {
    id: 'linux-x64',
    label: 'Linux x64',
    patterns: [/linux/i, /x64/i, /\.tar\.gz$/i, /\.deb$/i, /\.AppImage$/i],
    available: false,
    notes: '尚未提供官方构建',
  },
];

export interface SystemRequirement {
  platform: string;
  requirements: string[];
}

export const systemRequirements: SystemRequirement[] = [
  {
    platform: 'Windows',
    requirements: [
      'Windows 10 / 11 64-bit',
      '8 GB 或以上内存',
      '2 GB 可用磁盘空间',
      'QGIS（可选，用于 GIS 工具连接）',
      'Python 3.10+（可选，用于 Worker）',
    ],
  },
  {
    platform: 'macOS',
    requirements: ['尚未提供官方构建', '可通过源码自行构建运行'],
  },
  {
    platform: 'Linux',
    requirements: ['尚未提供官方构建', '可通过源码自行构建运行'],
  },
];

export const faqs = [
  {
    question: 'GeoWork 是开源软件吗？',
    answer:
      'GeoWork 仓库公开在 GitHub，当前处于 Developer Preview。具体许可请查看仓库 LICENSE。',
  },
  {
    question: '需要联网才能使用吗？',
    answer:
      'GeoWork 采用本地优先架构，核心工作可在本地完成。部分工具（如 Google Earth Engine）需要联网访问。',
  },
  {
    question: '支持 macOS 吗？',
    answer: '当前尚未提供 macOS 官方构建，可通过源码自行构建。后续将根据 Release 计划提供。',
  },
];
