import type { SVGProps } from 'react';

/**
 * GeoWork 导航图形图标系统 — Geospatial Blueprint Icons
 *
 * 依据：doc/GeoOfficial-官网全站开发计划-v2.5.0-Attio截图驱动版.md 第 8 节
 *
 * 视觉规范：
 * - 画布 40 × 40
 * - 核心图形 24–30px
 * - 线宽 1–1.25px
 * - 圆角 2–4px
 * - 默认色 currentColor（中性灰）
 * - Hover 由 CSS 控制（品牌绿 --brand）
 * - 16px 缩略仍可识别
 *
 * 不复制 Attio、不使用 Emoji、不混用图标库、不使用占位方框。
 * 每个图标有语义说明，可访问（aria-label + title）。
 */

export type NavigationIconName =
  // Platform
  | 'assistant'
  | 'ai'
  | 'dataModel'
  | 'projectContext'
  | 'workflows'
  | 'taskSequences'
  | 'researchIntelligence'
  | 'reporting'
  | 'developerPlatform'
  | 'toolsIntegrations'
  // Resources
  | 'help'
  | 'learn'
  | 'docs'
  | 'partners'
  | 'educationResearch'
  | 'changelog'
  | 'blog'
  | 'engineering'
  | 'careers';

interface IconSpec {
  /** 给屏幕阅读器的语义描述 */
  title: string;
  /** 图标故事 — 设计语义说明 */
  story: string;
  /** SVG 路径 / 图形 */
  content: React.ReactNode;
}

const STROKE = 1.1;

/**
 * 共用画布：40×40，留 6px 外边距，核心图形区域 7–33。
 */
function Canvas({
  title,
  children,
  ...props
}: { title: string; children: React.ReactNode } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      stroke="currentColor"
      strokeWidth={STROKE}
      strokeLinecap="round"
      strokeLinejoin="round"
      role="img"
      aria-label={title}
      {...props}
    >
      <title>{title}</title>
      {children}
    </svg>
  );
}

const iconSpecs: Record<NavigationIconName, IconSpec> = {
  // ─── Platform ───
  assistant: {
    title: 'Assistant · 地理空间助手',
    story: '对话气泡中嵌入定位标记，象征“提问即定位”。',
    content: (
      <>
        <path d="M9 11h22a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H17l-5 4v-4H9a2 2 0 0 1-2-2V13a2 2 0 0 1 2-2Z" />
        <path d="M20 14.5v6' M17 17.5h6" />
        <circle cx="20" cy="20" r="0.6" fill="currentColor" stroke="none" />
      </>
    ),
  },
  ai: {
    title: 'AI · 地理空间智能',
    story: '中心节点向四周辐射，象征 Agent 网络协同推理。',
    content: (
      <>
        <circle cx="20" cy="20" r="3" />
        <circle cx="11" cy="11" r="1.8" />
        <circle cx="29" cy="11" r="1.8" />
        <circle cx="11" cy="29" r="1.8" />
        <circle cx="29" cy="29" r="1.8" />
        <path d="M17.7 17.7 12.4 12.4M22.3 17.7 27.6 12.4M17.7 22.3 12.4 27.6M22.3 22.3 27.6 27.6" />
      </>
    ),
  },
  dataModel: {
    title: 'Data model · 项目对象模型',
    story: '三层堆叠的菱形/方块，象征项目、数据、图层分层组织。',
    content: (
      <>
        <path d="M20 8 32 14v12L20 32 8 26V14Z" />
        <path d="M8 14 20 20 32 14M20 20v12" />
      </>
    ),
  },
  projectContext: {
    title: 'Project Context · 项目上下文',
    story: '中心节点连接四个象限，象征数据、地图、代码、工具统一在同一上下文。',
    content: (
      <>
        <circle cx="20" cy="20" r="3.2" />
        <rect x="9" y="9" width="5" height="5" rx="1" />
        <rect x="26" y="9" width="5" height="5" rx="1" />
        <rect x="9" y="26" width="5" height="5" rx="1" />
        <rect x="26" y="26" width="5" height="5" rx="1" />
        <path d="M14 14 17 17M26 14 23 17M14 26 17 23M26 26 23 23" />
      </>
    ),
  },
  workflows: {
    title: 'Workflows · 工作流',
    story: '从问题到成果的连续步骤，节点连成执行链。',
    content: (
      <>
        <rect x="7" y="9" width="8" height="6" rx="1.5" />
        <rect x="22" y="9" width="8" height="6" rx="1.5" />
        <rect x="14.5" y="25" width="11" height="6" rx="1.5" />
        <path d="M15 12h7M20 15v6M14 25v-3h12v3" />
        <path d="M20 21v-1" />
      </>
    ),
  },
  taskSequences: {
    title: 'Task sequences · 任务序列',
    story: '横向序列方块象征批量、定时、多阶段任务排队执行。',
    content: (
      <>
        <rect x="6" y="14" width="6" height="12" rx="1" />
        <rect x="17" y="14" width="6" height="12" rx="1" />
        <rect x="28" y="14" width="6" height="12" rx="1" />
        <path d="M12 20h5M23 20h5" />
        <circle cx="9" cy="10" r="0.7" fill="currentColor" stroke="none" />
        <circle cx="20" cy="10" r="0.7" fill="currentColor" stroke="none" />
        <circle cx="31" cy="10" r="0.7" fill="currentColor" stroke="none" />
      </>
    ),
  },
  researchIntelligence: {
    title: 'Research intelligence · 研究信息智能',
    story: '文档与放大镜组合，象征整理文献、提取信息。',
    content: (
      <>
        <path d="M10 8h13l5 5v19a1 1 0 0 1-1 1H10a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z" />
        <path d="M23 8v5h5M13 18h9M13 22h7" />
        <circle cx="24" cy="25.5" r="3.5" />
        <path d="m29 30 3.5 3.5" />
      </>
    ),
  },
  reporting: {
    title: 'Reporting · 成果与报告',
    story: '文档内嵌柱状图，象征生成地图、图表、报告。',
    content: (
      <>
        <path d="M10 8h20a1 1 0 0 1 1 1v22a1 1 0 0 1-1 1H10a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z" />
        <path d="M14 22v5M18 18v9M22 24v3M26 16v11" />
      </>
    ),
  },
  developerPlatform: {
    title: 'Developer Platform · 开发者平台',
    story: '尖括号嵌入齿轮，象征 API/SDK/MCP/插件扩展。',
    content: (
      <>
        <path d="M14 14 8 20l6 6M26 14l6 6-6 6" />
        <circle cx="20" cy="20" r="2.4" />
        <path d="M20 14v1.5M20 24.5V26M14 20h1.5M24.5 20H26M16.4 16.4l1 1M22.6 22.6l1 1M22.6 17.4l-1 1M16.4 23.6l1-1" />
      </>
    ),
  },
  toolsIntegrations: {
    title: 'Tools & integrations · 工具与集成',
    story: '拼图块象征 QGIS、GDAL、Python、PostGIS、GEE 等外部工具拼接。',
    content: (
      <>
        <path d="M9 13h8a2 2 0 0 1 2 2v2h2v-2a2 2 0 0 1 2-2h8a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-3a2 2 0 0 0 0 4h3a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-7a1 1 0 0 1-1-1v-2a2 2 0 0 0-4 0v2a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-5a1 1 0 0 1 1-1h3a2 2 0 0 0 0-4H9a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1Z" />
      </>
    ),
  },

  // ─── Resources ───
  help: {
    title: 'Help · 帮助中心',
    story: '对话气泡中的问号，象征入门、使用、故障排查。',
    content: (
      <>
        <path d="M9 11h22a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H17l-5 4v-4H9a2 2 0 0 1-2-2V13a2 2 0 0 1 2-2Z" />
        <path d="M17 17.5a3 3 0 0 1 6 0c0 2-3 2-3 4M20 24v.5" />
      </>
    ),
  },
  learn: {
    title: 'Learn · 学习',
    story: '书本上方箭头，象征以真实任务学习并向上成长。',
    content: (
      <>
        <path d="M8 12h10a3 3 0 0 1 3 3v14a2 2 0 0 0-2-2H8Z" />
        <path d="M32 12H22a3 3 0 0 0-3 3v14a2 2 0 0 1 2-2h11Z" />
        <path d="M20 7v3M17 8.5l3-3 3 3" />
      </>
    ),
  },
  docs: {
    title: 'Docs · 文档',
    story: '文档与代码尖括号，象征 API/SDK/MCP/Skills 文档。',
    content: (
      <>
        <path d="M10 8h13l5 5v19a1 1 0 0 1-1 1H10a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z" />
        <path d="M23 8v5h5M14 19l-2 2 2 2M19 23l2-2-2-2M22 26l-4-8" />
      </>
    ),
  },
  partners: {
    title: 'Partners · 合作伙伴',
    story: '两个互锁圆环，象征高校、科研、开源、工具生态互联。',
    content: (
      <>
        <circle cx="15" cy="20" r="6" />
        <circle cx="25" cy="20" r="6" />
        <path d="M15 14v12M25 14v12" opacity="0" />
      </>
    ),
  },
  educationResearch: {
    title: 'Education & Research · 教育与科研',
    story: '烧瓶与书本叠加，象征教育、科研、早期体验计划。',
    content: (
      <>
        <path d="M16 8h8M18 8v8l-6 12a2 2 0 0 0 1.8 3h12.4a2 2 0 0 0 1.8-3l-6-12V8" />
        <path d="M14 24h12M17 28h6" />
      </>
    ),
  },
  changelog: {
    title: 'Changelog · 更新日志',
    story: '时钟与时钟内箭头，象征按时间记录的演进。',
    content: (
      <>
        <circle cx="20" cy="20" r="11" />
        <path d="M20 13v7l5 3" />
        <path d="M20 6v3M20 31v3M6 20h3M31 20h3" />
      </>
    ),
  },
  blog: {
    title: 'Blog · 博客',
    story: '文档内嵌图像方块，象征产品、案例、项目动态。',
    content: (
      <>
        <path d="M10 8h20a1 1 0 0 1 1 1v22a1 1 0 0 1-1 1H10a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z" />
        <path d="M13 13h14M13 17h14M13 27h8" />
        <rect x="13" y="20" width="14" height="5" rx="0.5" />
        <circle cx="16" cy="22.5" r="0.8" fill="currentColor" stroke="none" />
        <path d="M19 24l2-2 2 2 3-3 1 1v1H19Z" />
      </>
    ),
  },
  engineering: {
    title: 'Engineering · 工程',
    story: '齿轮与代码尖括号组合，象征架构、GIS、遥感、AI 工程实践。',
    content: (
      <>
        <path d="M14 14 8 20l6 6M26 14l6 6-6 6" />
        <circle cx="20" cy="20" r="3" />
        <path d="M20 14v1.8M20 24.2V26M14 20h1.8M24.2 20H26M16.6 16.6l1.2 1.2M22.2 22.2l1.2 1.2M22.2 17.8l-1.2 1.2M16.6 23.4l1.2-1.2" />
      </>
    ),
  },
  careers: {
    title: 'Careers · 加入与贡献',
    story: '公文包加向上箭头，象征加入项目、社区贡献、未来机会。',
    content: (
      <>
        <rect x="7" y="14" width="26" height="18" rx="2" />
        <path d="M15 14v-2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2" />
        <path d="M20 19v6M17 22l3-3 3 3" />
      </>
    ),
  },
};

export interface NavigationIconProps extends Omit<SVGProps<SVGSVGElement>, 'title'> {
  name: NavigationIconName;
  /** 覆盖默认 title；传空字符串则隐藏 title */
  title?: string;
  /** 是否隐藏语义说明（用于已包含说明的上下文） */
  decorative?: boolean;
}

/**
 * 单一入口，按 name 渲染对应导航图标。
 * 默认带 title 与 aria-label，可通过 decorative 隐藏。
 */
export function NavigationIcon({
  name,
  title,
  decorative = false,
  ...props
}: NavigationIconProps) {
  const spec = iconSpecs[name];
  if (!spec) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(`[NavigationIcon] unknown icon name: ${name}`);
    }
    return null;
  }
  if (decorative) {
    return (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        stroke="currentColor"
        strokeWidth={STROKE}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
        {...props}
      >
        {spec.content}
      </svg>
    );
  }
  return (
    <Canvas title={title ?? spec.title} {...props}>
      {spec.content}
    </Canvas>
  );
}

/** 获取图标语义说明（用于文档/dev 页展示） */
export function getNavigationIconStory(name: NavigationIconName): string {
  return iconSpecs[name]?.story ?? '';
}

/** 所有图标名（用于 dev 页或测试） */
export const navigationIconNames = Object.keys(iconSpecs) as NavigationIconName[];
