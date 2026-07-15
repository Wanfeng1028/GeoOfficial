import { productFacts } from '@/data/product-facts';

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
    notes: '源码可构建运行',
  },
  {
    id: 'macos-arm64',
    label: 'macOS Apple Silicon',
    includeAny: [/mac|darwin/i, /\.dmg$/i],
    includeAll: [/arm64|aarch64/i],
    exclude: [/linux/i, /windows/i, /\bwin\b/i],
    notes: '尚未确认提供',
  },
  {
    id: 'macos-x64',
    label: 'macOS Intel',
    includeAny: [/mac|darwin/i, /\.dmg$/i],
    includeAll: [/x64|amd64|intel/i],
    exclude: [/linux/i, /windows/i, /\bwin\b/i, /arm64|aarch64/i],
    notes: '尚未确认提供',
  },
  {
    id: 'linux-x64',
    label: 'Linux x64',
    includeAny: [/linux/i, /\.AppImage$/i, /\.deb$/i, /\.tar\.gz$/i],
    includeAll: [/x64|amd64/i],
    exclude: [/windows/i, /\bwin\b/i, /mac|darwin/i, /arm64|aarch64/i],
    notes: '尚未确认提供',
  },
];

export interface SystemRequirement {
  platform: string;
  requirements: string[];
}

/**
 * 系统要求须经实际安装和运行验证后再填写。
 * 当前 product-facts 标注为 pending-verification，此处不臆造具体数字。
 */
export const systemRequirements: SystemRequirement[] = [
  {
    platform: 'Windows',
    requirements: [
      'GeoWork 当前尚未发布官方安装包',
      '开发者可从源码运行，具体环境要求以 GeoWork 仓库说明为准',
    ],
  },
  {
    platform: 'macOS',
    requirements: ['尚未确认提供官方构建'],
  },
  {
    platform: 'Linux',
    requirements: ['尚未确认提供官方构建'],
  },
];

export const faqs = [
  {
    question: 'GeoWork 是开源软件吗？',
    answer: `GeoWork 仓库公开在 GitHub。许可方案尚待项目负责人确认（当前状态：${productFacts.license.status}），在许可文件正式发布前请勿理解为已经授予再分发或商业使用权。`,
  },
  {
    question: '需要联网才能使用吗？',
    answer:
      'GeoWork 采用本地优先架构，核心工作可在本地完成。部分工具（如 Google Earth Engine、模型服务）需要联网访问。',
  },
  {
    question: '支持 macOS 吗？',
    answer:
      'macOS 与 Linux 当前尚未确认提供官方构建，可通过源码自行尝试构建运行。后续将根据 Release 计划提供。',
  },
];
