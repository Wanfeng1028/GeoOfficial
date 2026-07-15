import type { MegaMenuData } from '@/components/marketing/mega-menu/MegaMenu';

export const mainNavigation = [
  { label: 'Product', href: '/product', hasMega: true },
  { label: 'Workflows', href: '/#workflow', hasMega: true },
  { label: 'Use Cases', href: '/use-cases' },
  { label: 'Developers', href: '/developers' },
  { label: 'Changelog', href: '/changelog' },
] as const;

export const productMegaMenu: MegaMenuData = {
  label: 'Product',
  groups: [
    {
      label: 'Platform',
      items: [
        { label: 'Workspace', href: '/product#workspace' },
        { label: 'Project', href: '/product#project' },
        { label: 'Dataset', href: '/product#dataset' },
        { label: 'Layer', href: '/product#layer' },
        { label: 'Task', href: '/product#task' },
        { label: 'Artifact', href: '/product#artifact' },
      ],
    },
    {
      label: 'Modes',
      items: [
        { label: 'Work', href: '/product#work' },
        { label: 'Code', href: '/product#code' },
        { label: 'Map', href: '/product#map' },
      ],
    },
    {
      label: 'Tools',
      items: [
        { label: 'Terminal', href: '/product#terminal' },
        { label: 'Browser', href: '/product#browser' },
        { label: 'Events', href: '/product#events' },
        { label: 'Logs', href: '/product#logs' },
      ],
    },
  ],
};

export const workflowsMegaMenu: MegaMenuData = {
  label: 'Workflows',
  groups: [
    {
      label: 'Analyze',
      items: [
        { label: 'Urban expansion', href: '/use-cases/urban-expansion' },
        { label: 'Remote sensing', href: '/use-cases/ndvi-series' },
        { label: 'NDVI time series', href: '/use-cases/ndvi-series' },
      ],
    },
    {
      label: 'Research',
      items: [
        { label: 'Literature review', href: '/use-cases/research-report' },
        { label: 'Report generation', href: '/use-cases/research-report' },
      ],
    },
    {
      label: 'Automation',
      items: [
        { label: 'Scheduled tasks', href: '/product#tasks' },
        { label: 'Skills', href: '/developers#skills' },
        { label: 'MCP', href: '/developers#mcp' },
        { label: 'Plugins', href: '/developers#plugins' },
      ],
    },
  ],
};

export const footerNavigation = [
  {
    title: '产品',
    links: [
      { label: '产品概览', href: '/product' },
      { label: '工作方式', href: '/#workflow' },
      { label: '使用案例', href: '/use-cases' },
      { label: '下载', href: '/download' },
    ],
  },
  {
    title: '资源',
    links: [
      { label: '更新日志', href: '/changelog' },
      {
        label: 'GeoWork 仓库',
        href: 'https://github.com/Wanfeng1028/GeoWork',
        external: true,
      },
      {
        label: 'GeoFrontend2.0',
        href: 'https://github.com/Wanfeng1028/GeoFrontend2.0',
        external: true,
      },
    ],
  },
  {
    title: '开发',
    links: [
      {
        label: 'GitHub Issues',
        href: 'https://github.com/Wanfeng1028/GeoWork/issues',
        external: true,
      },
      {
        label: 'Releases',
        href: 'https://github.com/Wanfeng1028/GeoWork/releases',
        external: true,
      },
      { label: '关于', href: '/about' },
    ],
  },
  {
    title: '法律',
    links: [
      { label: '隐私', href: '/privacy' },
      { label: '条款', href: '/terms' },
    ],
  },
] as const;

