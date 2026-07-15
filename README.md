# GeoOfficial

GeoWork 官方网站源码。基于 Next.js App Router 构建，承载产品介绍、使用案例、更新日志、下载入口等营销与文档页面。

## 项目简介

GeoWork 是一个将地图、遥感、代码、研究与自动化工作流汇于一个桌面工作台的地理空间软件。本仓库（GeoOfficial）为其官方网站，负责对外展示产品形态、工作方式与生态资源。

当前产品状态：`development`（开发中）。平台支持以 [src/data/product-facts.ts](src/data/product-facts.ts) 为唯一事实来源，未确认的内容不做臆造。

## 项目关系

- **GeoWork**：完整桌面软件与后端 — [Wanfeng1028/GeoWork](https://github.com/Wanfeng1028/GeoWork)
- **GeoFrontend2.0**：桌面端前端重构 — [Wanfeng1028/GeoFrontend2.0](https://github.com/Wanfeng1028/GeoFrontend2.0)
- **GeoOfficial**：官方网站（本仓库）— [Wanfeng1028/GeoOfficial](https://github.com/Wanfeng1028/GeoOfficial)

## 技术栈

- **框架**：Next.js（App Router）+ React 19
- **语言**：TypeScript
- **样式**：CSS Modules + CSS Custom Properties（设计令牌见 [src/styles/tokens.css](src/styles/tokens.css)）
- **UI 基元**：Radix UI Primitives
- **动效**：Motion
- **内容**：MDX + Shiki 代码高亮
- **校验**：Zod
- **测试**：Vitest（单元）+ Playwright（E2E / 视觉回归）+ LHCI（性能）

## 目录结构

```
public/                  静态资源（品牌 logo、占位素材）
scripts/                 资源校验脚本
src/
  app/                   App Router 页面
    (marketing)/         营销页面组（about、product、download、changelog 等）
    dev/                 内部开发预览页
  components/
    content/             内容渲染组件（MDX、代码块、Release 卡片）
    marketing/           营销组件（Hero、MegaMenu、模式展示等）
    primitives/          Radix 封装的基础交互原语
    ui/                  通用 UI 组件（Button、Container、Section 等）
  content/               MDX 长内容（changelog、use-cases）
  data/                  结构化数据（导航、产品事实、工作流等）
  lib/                   工具库（env、site、mdx、github releases）
  styles/                全局样式（令牌、排版、动效、工具类）
  types/                 类型声明
tests/                   E2E 与视觉回归测试
```

## 页面路由

| 路径 | 说明 |
| --- | --- |
| `/` | 首页（Hero、工作流、模式展示、生态、CTA） |
| `/product` | 产品概览（Workspace、Project、Dataset、Layer、Task、Artifact） |
| `/use-cases` | 使用案例列表 |
| `/use-cases/[slug]` | 单个案例详情（城市扩张、NDVI 时序、研究报告） |
| `/developers` | 开发者文档（Skills、MCP、插件） |
| `/changelog` | 更新日志 |
| `/changelog/[slug]` | 单条更新详情 |
| `/download` | 下载入口 |
| `/about` | 关于 |
| `/privacy` `/terms` | 隐私政策、服务条款 |

## 本地运行

前置要求：Node.js 20+ 与 npm。

```bash
npm install
npm run dev
```

默认监听 `http://localhost:3000`。

## 环境变量

复制 [.env.example](.env.example) 为 `.env.local`：

| 变量 | 说明 | 备注 |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | 站点公开 URL | 生产环境必须设置为公开域名 |
| `GITHUB_OWNER` | Release 数据源仓库 owner | 默认 `Wanfeng1028` |
| `GITHUB_REPO` | Release 数据源仓库名 | 默认 `GeoWork` |
| `GITHUB_TOKEN` | GitHub Token（仅服务端） | 不得通过 `NEXT_PUBLIC_` 暴露 |
| `NEXT_PUBLIC_ENABLE_ANALYTICS` | 分析开关 | 默认 `false` |

## 脚本说明

| 命令 | 作用 |
| --- | --- |
| `npm run dev` | 本地开发 |
| `npm run build` | 生产构建 |
| `npm start` | 运行生产构建 |
| `npm run lint` | ESLint 检查 |
| `npm run typecheck` | TypeScript 类型检查 |
| `npm run test` | Vitest 单元测试 |
| `npm run test:watch` | 单测监听模式 |
| `npm run test:e2e` | Playwright E2E |
| `npm run test:e2e:prod` | 生产构建下的 E2E |
| `npm run test:visual` | 视觉回归测试 |
| `npm run test:lighthouse` | Lighthouse CI 性能审计 |
| `npm run verify:assets` | 校验占位素材状态 |
| `npm run verify:assets:release` | 上线前素材终检 |
| `npm run check` | lint + typecheck + test + build |
| `npm run check:release` | 上线前完整检查（含 release 素材校验与 E2E） |

## 测试

```bash
npm run lint            # 代码规范
npm run typecheck       # 类型检查
npm run test            # 单元测试
npm run test:e2e:prod   # 生产构建 E2E
npm run test:visual     # 视觉回归
npm run check           # 日常提交前检查
npm run check:release   # 发布前完整检查
```

测试要求详见 [CONTRIBUTING.md](CONTRIBUTING.md)。

## 素材状态

正式上线前必须替换 [public/media/placeholders/](public/media/placeholders/) 下的占位 SVG 为真实 GeoFrontend2.0 截图（WebP），并将 [src/data/media.ts](src/data/media.ts) 中所有 `status` 改为 `'final'`。

```bash
npm run verify:assets:release
```

素材规范：
- 产品截图必须来自真实 GeoFrontend2.0 运行界面
- 禁止 AI 生成产品界面、霓虹光晕、虚假 Agent 状态
- 禁止将 SVG 改扩展名冒充 WebP

## 安全

安全问题请通过 GitHub Security Advisories 或私信仓库维护者报告，不要在公开 Issue 中提交。详见 [SECURITY.md](SECURITY.md)。

## 贡献

贡献前请阅读 [CONTRIBUTING.md](CONTRIBUTING.md)，了解分支命名、Commit 规范、测试要求与 PR 截图规范。

要点：
- 分支命名：`feat/` `fix/` `docs/` `refactor/` + 描述
- Commit 使用 Conventional Commits：`type(scope): 描述`
- PR 必须通过 `npm run check`
- 涉及视觉变化的 PR 须附 390 / 1280 / 1920 三个视口截图
- 不允许虚构产品事实

## 文档

查看 `doc/` 目录。

## License

许可待项目负责人确认。
