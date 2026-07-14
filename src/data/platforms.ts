export interface PlatformRule {
  id:
    | 'windows-x64'
    | 'macos-arm64'
    | 'macos-x64'
    | 'linux-x64';
  label: string;
  includeAll?: RegExp[];
  includeAny?: RegExp[];
  exclude?: RegExp[];
  notes?: string;
}

export const platformRules: PlatformRule[] = [
  {
    id: 'windows-x64',
    label: 'Windows x64',
    includeAny: [/windows/i, /\bwin\b/i, /\.exe$/i, /\.msi$/i],
    includeAll: [/x64|amd64/i],
    exclude: [/linux/i, /mac|darwin/i, /arm64/i],
    notes: 'Windows 10 / 11 64-bit',
  },
  {
    id: 'macos-arm64',
    label: 'macOS Apple Silicon',
    includeAny: [/mac|darwin/i, /\.dmg$/i],
    includeAll: [/arm64|aarch64/i],
    exclude: [/linux/i, /windows/i, /\bwin\b/i],
    notes: '尚未提供官方构建',
  },
  {
    id: 'macos-x64',
    label: 'macOS Intel',
    includeAny: [/mac|darwin/i, /\.dmg$/i],
    includeAll: [/x64|amd64|intel/i],
    exclude: [/linux/i, /windows/i, /\bwin\b/i, /arm64|aarch64/i],
    notes: '尚未提供官方构建',
  },
  {
    id: 'linux-x64',
    label: 'Linux x64',
    includeAny: [/linux/i, /\.AppImage$/i, /\.deb$/i, /\.tar\.gz$/i],
    includeAll: [/x64|amd64/i],
    exclude: [/windows/i, /\bwin\b/i, /mac|darwin/i, /arm64|aarch64/i],
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
