# GeoWork Website — FILE-MAP.md

> 文档版本：v0.5  
> 用途：逐文件说明“写什么代码”，用于任务拆分、代码审查和 Agent 执行。

---

## 1. 根目录与配置

| 文件 | 创建/修改 | 写入内容 | 依赖 | 验收 |
|---|---|---|---|---|
| `package.json` | 修改 | scripts、由 npm 固定的依赖 | npm | `npm run check` |
| `package-lock.json` | 自动生成 | 禁止手改 | npm | 与 package.json 同步 |
| `next.config.ts` | 创建/修改 | MDX、图片格式、安全头 | `@next/mdx` | build 通过，响应头存在 |
| `tsconfig.json` | 修改 | strict、`@/*` 别名 | TypeScript | typecheck 通过 |
| `eslint.config.mjs` | 修改 | Next、React、TS 规则；忽略 `.next` | ESLint | lint 通过 |
| `vitest.config.ts` | 创建 | jsdom、alias、setup | Vitest | 单测可执行 |
| `vitest.setup.ts` | 创建 | jest-dom | Testing Library | matcher 可用 |
| `playwright.config.ts` | 创建 | baseURL、webServer、desktop/mobile | Playwright | E2E 可运行 |
| `mdx-components.tsx` | 创建 | MDX 组件映射 | `@next/mdx` | MDX 页面可渲染 |
| `.env.example` | 创建 | 公开和服务端环境变量名 | Zod | 无真实密钥 |

## 2. App Router

| 文件 | 类型 | 写什么 | 不写什么 |
|---|---|---|---|
| `src/app/layout.tsx` | Server | metadata、html/body、全局 CSS | Header、动画、客户端状态 |
| `src/app/globals.css` | Global CSS | reset、基础元素、focus、selection | 某个组件专属样式 |
| `src/app/error.tsx` | Client | 错误提示、重试按钮、日志钩子 | 业务页面内容 |
| `src/app/not-found.tsx` | Server | 404 文案和返回首页 | 假搜索功能 |
| `src/app/robots.ts` | Server metadata | allow、disallow `/dev`、sitemap | 环境密钥 |
| `src/app/sitemap.ts` | Server metadata | 所有公开路由 | `/dev`、Preview URL |
| `src/app/(marketing)/layout.tsx` | Server | SiteHeader、main、SiteFooter | 每页重复导航 |
| `src/app/(marketing)/page.tsx` | Server | 首页 section 组合顺序 | 大段 CSS、数据常量 |
| `src/app/(marketing)/product/page.tsx` | Server | Product 页面 section 组合 | 首页组件硬复制 |
| `src/app/(marketing)/use-cases/page.tsx` | Server | 案例列表 | 虚构案例 |
| `src/app/(marketing)/use-cases/[slug]/page.tsx` | Server | 查找案例、metadata、notFound | 客户端拉全文 |
| `src/app/(marketing)/download/page.tsx` | Server | Release、平台、要求、FAQ | 虚构下载地址 |
| `src/app/(marketing)/changelog/page.tsx` | Server | 更新日志索引 | Git commit 流水账 |
| `src/app/(marketing)/changelog/[slug]/page.tsx` | Server | MDX 正文、metadata | 未校验 slug |
| `src/app/(marketing)/about/page.tsx` | Server | 项目动机、仓库关系、许可 | 虚构公司/团队 |
| `src/app/(marketing)/privacy/page.tsx` | Server | 网站实际数据处理 | 无依据的合规承诺 |
| `src/app/(marketing)/terms/page.tsx` | Server | 使用条款草案 | 未审核的商业条款 |
| `src/app/dev/components/page.tsx` | Server | Token 与组件状态页；生产 404 | 公开索引 |

## 3. Styles

| 文件 | 写什么 |
|---|---|
| `src/styles/tokens.css` | 颜色、字体、字号、间距、圆角、阴影、容器、动效时长 |
| `src/styles/typography.css` | display、heading、body、caption 工具类 |
| `src/styles/motion.css` | reduced motion 和通用进入状态 |
| `src/styles/utilities.css` | sr-only、nowrap、visually-hidden 等少量工具类 |

## 4. Lib

| 文件 | 写什么 | 错误处理 |
|---|---|---|
| `src/lib/cn.ts` | clsx 合并 class | 无 |
| `src/lib/env.ts` | Zod 校验环境变量 | 启动时明确失败 |
| `src/lib/site.ts` | 站点 URL、标题、描述、仓库链接 | 不放页面长文案 |
| `src/lib/github/release-schema.ts` | GitHub Release Zod schema | safeParse |
| `src/lib/github/releases.ts` | 服务端 fetch、缓存、fallback | 不抛到页面白屏 |
| `src/lib/content/mdx.ts` | slug 查找、显式动态 import | notFound 前返回 null |

## 5. Data

| 文件 | 写什么 |
|---|---|
| `src/data/navigation.ts` | 主导航、Footer 导航 |
| `src/data/home.ts` | 首页文案、CTA、section 标题 |
| `src/data/product.ts` | 产品原则、对象、模式、能力边界 |
| `src/data/use-cases.ts` | 案例摘要、图片、alt、结果 |
| `src/data/platforms.ts` | 平台名称、系统要求、资产匹配规则 |
| `src/data/architecture.ts` | Desktop/Runtime/Worker/Tools/Skills 关系 |
| `src/data/changelog.ts` | 显式 changelog 索引与 MDX loader |

## 6. Primitives

每个目录均包含 `Component.tsx`、`Component.module.css`、`Component.test.tsx`。

| 目录 | 写什么代码 | 使用页面 |
|---|---|---|
| `primitives/tabs` | Radix Tabs 包装、data-state 样式 | ModeShowcase |
| `primitives/dialog` | Overlay、Content、Close、Portal | MobileMenu、媒体预览 |
| `primitives/dropdown-menu` | 平台与版本动作菜单 | Download |
| `primitives/navigation-menu` | 桌面多层导航；无下拉时可不用 | Header |
| `primitives/tooltip` | 图标按钮说明 | Header、媒体控件 |
| `primitives/accordion` | 系统要求、FAQ | Download |
| `primitives/popover` | 版本补充信息 | Download/Changelog |

## 7. UI Components

| 目录 | TSX 代码 | CSS 代码 | 测试 |
|---|---|---|---|
| `ui/button` | variant/size/asChild/icons | 非胶囊按钮状态 | click、disabled、asChild |
| `ui/container` | 多宽度 polymorphic container | gutter、max-width | class 输出 |
| `ui/section` | tone/spacing | 背景与纵向节奏 | 语义 section |
| `ui/section-heading` | eyebrow/title/description/alignment | 排版层级 | heading level |
| `ui/media-frame` | aspect ratio、tone、caption | border、裁切、占位 | alt 由子项负责 |
| `ui/figure` | FIG 编号、标题、说明 | Linear 式图注 | 语义 figure/figcaption |
| `ui/video-player` | poster、sources、controls、reduced motion | 控件和遮罩 | pause、reduced motion |
| `ui/logo` | SVG mark + wordmark | 尺寸与 dark/light | aria-label |

## 8. Marketing Components

| 目录 | 主要文件 | 精确职责 | 完成标准 |
|---|---|---|---|
| `marketing/site-header` | `SiteHeader.tsx`, `MobileMenu.tsx`, CSS, test | 桌面导航、移动 Dialog、GitHub、下载 | 键盘可用；64–72px；无公告条 |
| `marketing/hero` | `Hero.tsx`, CSS | 5:7 左文案右真实产品媒体 | 无 AI 胶囊/光晕；5 视口通过 |
| `marketing/product-principles` | TSX, CSS | 本地工作、上下文统一、可扩展三原则 | 用分隔线，不是三张模板卡片 |
| `marketing/workflow-story` | Server wrapper、Client progress、CSS、test | Project→Organize→Work→Deliver sticky 叙事 | reduced motion 切成普通列表 |
| `marketing/mode-showcase` | Server wrapper、Client Tabs、CSS、test | Work/Code/Map 三模式 | Arrow/Home/End 可用 |
| `marketing/use-case-story` | TSX, CSS | 3 个真实案例大图叙事 | 每例有输入/过程/输出 |
| `marketing/product-details` | TSX, CSS | 地图/代码/终端/报告协同 | FIG 编号、无卡片堆叠 |
| `marketing/architecture-diagram` | TSX, CSS | 三层架构和扩展连接 | 不做科技大屏或粒子 |
| `marketing/open-development` | TSX, CSS | 开发状态、GitHub、许可、Roadmap | v0.4.x-dev 表述准确 |
| `marketing/download-panel` | async TSX, CSS, test | Release 读取、平台资产、fallback | API 失败不白屏 |
| `marketing/site-footer` | TSX, CSS | 产品/资源/法律/仓库 | 移动端单列、链接有效 |

## 9. Content

| 文件/目录 | 写什么 |
|---|---|
| `src/content/changelog/*.mdx` | 正式版本说明；每篇只写一个版本 |
| `src/content/use-cases/*.mdx` | 问题、输入、方法、工具、输出、限制 |
| `src/components/content/code-block` | Shiki 服务端高亮；复制按钮单独 client island |
| `src/components/content/release-card` | Release 名称、日期、预览状态、资产 |
| `src/components/content/mdx-components` | h2、p、a、table、figure 的统一样式 |

## 10. Public Assets

| 路径 | 内容 | 验收 |
|---|---|---|
| `public/brand/logo-mark.svg` | GeoWork 标志 | 不含外部字体 |
| `public/brand/logo-wordmark-*.svg` | 深浅文字标 | 清晰、可缩放 |
| `public/media/hero/*` | Hero 真实截图/录屏 | 无假聊天和光效 |
| `public/media/modes/*` | Work/Code/Map | 同一版本、同一窗口尺寸 |
| `public/media/use-cases/*` | 地图、图表、报告 | 有来源和 alt |
| `src/app/opengraph-image.png` | 1200×630 | 小于 Next 限制、文字安全区正确 |

## 11. Tests

| 文件 | 测试内容 |
|---|---|
| `Button.test.tsx` | 点击、禁用、asChild |
| `Tabs.test.tsx` | 选择、方向键、Home/End |
| `Dialog.test.tsx` | 打开、Esc、焦点返回 |
| `ModeShowcase.test.tsx` | tab 与图片同步 |
| `tests/e2e/home.spec.ts` | H1、CTA、Hero 图片、section 顺序 |
| `tests/e2e/navigation.spec.ts` | 桌面/移动导航 |
| `tests/e2e/download.spec.ts` | API 正常与 fallback |
| `tests/e2e/accessibility.spec.ts` | axe |
| `tests/visual/home.visual.spec.ts` | 5 视口截图 |

## 12. Code Review 文件级检查

每个 PR 至少回答：

1. 新建/修改了哪些具体文件？
2. 是否有不必要的 Client Component？
3. 是否把文案放回 `data/`？
4. 是否把组件样式放在同目录 CSS Module？
5. 是否增加真实 alt？
6. 是否增加对应测试？
7. 是否影响 5 个规定视口？
8. 是否重新引入 AI SaaS 视觉组合？
9. GitHub 数据失败时是否可降级？
10. build、lint、typecheck、test 是否全部通过？
