export const mainNavigation = [
  { label: '产品', href: '/product' },
  { label: '工作方式', href: '/#workflow' },
  { label: '使用案例', href: '/use-cases' },
  { label: '开发者', href: '/developers' },
  { label: '更新日志', href: '/changelog' },
] as const;

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
