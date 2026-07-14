# GeoWork Website — PLAN.md

> 版本：v0.5  
> 日期：2026-07-14  
> 目标：以可验收的小阶段完成 GeoWork 官网 V1，而不是一次性生成整站后再返工。

---

## 0. v0.5 已锁定的工程与设计决策

本节是强制结论，不再留给开发阶段临时选择。除非用户明确重新决策，否则不得替换技术方案。

| 领域 | 最终选择 | 负责内容 |
|---|---|---|
| 官网框架 | Next.js App Router + React + TypeScript | 路由、SEO、静态生成、页面组合 |
| 样式系统 | CSS Modules + CSS Custom Properties | 品牌视觉、响应式、状态与主题 |
| 无障碍交互组件 | Radix UI Primitives | Tabs、Dialog、Dropdown、Tooltip、Accordion、Popover、Navigation Menu |
| 基础组件源码 | GeoWork 自研封装 | Button、Link、Container、Section、MediaFrame、Figure、Logo |
| 动画 | CSS Transition + Motion for React | 进入、切换、布局与产品状态动画 |
| 滚动叙事 | CSS `position: sticky` + Motion progress | Linear / Screen Studio 式分段叙事 |
| 轮播 | Embla Carousel，仅案例确有需要时使用 | 可访问的横向案例轨道 |
| 图标 | Phosphor Icons + GeoWork 自有 SVG | 通用功能图标与品牌地理图标 |
| 代码高亮 | Shiki | Python、TypeScript、Shell 与配置片段 |
| 内容 | MDX + 类型化数据文件 | Changelog、案例、文档与版本说明 |
| 校验 | Zod | GitHub Release 数据和外部内容校验 |
| 测试 | Vitest + Testing Library + Playwright + axe | 组件、交互、端到端、可访问性与视觉回归 |
| 包管理 | npm | 安装、构建与 CI |
| 组件展示 | `/dev/components` 开发路由 | Token 和组件状态验收，生产环境关闭 |

### 明确不使用

- Ant Design、Material UI、Chakra UI、Mantine、Element Plus。
- Tailwind CSS 和整套 shadcn/ui 默认视觉。
- Landing Page 区块模板、Aurora Background、Glowing Border、Animated Beam。
- Three.js、Cesium、MapLibre 作为官网首屏依赖。
- 全局平滑滚动、滚动劫持和依赖特效才能成立的构图。
- 假聊天记录、`Agent running`、自动打勾流程作为 Hero 主视觉。

### 组件方案的核心原则

> Radix UI 只解决行为和无障碍；CSS Modules 决定外观；GeoWork 自有组件决定品牌。

组件库不会自动产生 Raycast、Linear、Attio 或 Craft 的效果。参考网站的质感主要来自字体、尺度、栅格、素材、留白和动画节奏，因此 Hero、产品展示、案例和技术架构必须自定义，不能从模板库直接拼装。

---

## 0. 项目范围

### V1 页面

```text
/
/product
/use-cases
/download
/changelog
/about
```

### V1 外部入口

```text
GitHub
Docs（可先链接仓库 docs）
Releases
```

### V1 不做

- 账号系统
- 付费系统
- 插件市场后台
- 在线运行 GeoWork
- 在线地图编辑器
- 复杂 CMS
- 用户社区
- 企业控制台
- 3D 地球

---

## 1. 里程碑总览

```text
M0 设计、内容与素材确认
M1 工程初始化与依赖锁定
M2 Token、Primitives 与基础组件
M3 首页静态骨架
M4 Hero 与真实产品媒体
M5 核心产品叙事与交互
M6 案例、架构与生态
M7 下载、更新日志与其他页面
M8 测试、响应式、可访问性与性能
M9 发布、视觉回归与最终验收
```

每个里程碑必须单独验收后再进入下一阶段。

---

# M0 — 设计、内容与素材确认

## 目标

在写正式代码前确定品牌方向、首页内容和素材清单。

## 任务

### M0.1 确认核心文案

确认：

- 中文主标题
- 英文主标题
- 副标题
- 产品类别描述
- CTA 文案
- Developer Preview 状态文案

建议默认：

```text
重新想象地理空间工作。
Geospatial work, reimagined.
```

### M0.2 确认页面结构

确认首页 10 个主要 section 是否全部保留。默认不设置全宽 Developer Preview 公告条。

### M0.3 确认品牌资产

收集：

- Logo SVG
- Wordmark SVG
- 深色 / 浅色版本
- favicon
- Open Graph 图

### M0.4 确认产品素材

准备：

- Hero 真实产品媒体，不使用假 Agent 对话原型
- Work / Code / Map 三组截图
- 2–3 个重点案例成果
- 架构信息
- Release 下载信息

### M0.5 去除 AI 模板感设计门槛

在进入工程阶段前，必须完成一轮静态设计审查：

- Hero 不使用胶囊 Eyebrow、标题渐变、彩色光晕和发光窗口的组合。
- 首屏不把 `AI workspace`、`Agent platform` 或 `Agent running` 作为核心信息。
- 首屏至少展示一个真实工作对象：地图、图层、项目、代码、图表或报告。
- 使用真实 GeoFrontend2.0 素材，不用虚构聊天 UI 代替产品。
- 按钮圆角、卡片圆角和阴影必须有层级差异，不能全部胶囊化。
- 设计在关闭所有动画和光效后仍应成立。

需要制作两张对比稿：

1. 纯排版与真实产品素材版本。
2. 加入必要微交互后的版本。

若第一张稿不能成立，不得靠光效和动画补救。

## 输出

- 最终文案表
- 首页低保真线框
- 素材清单
- 内容责任人
- 去 AI 模板感检查表
- Hero 静态无特效稿

## 验收

- 不存在尚未决定的 Hero 文案
- 不存在不明确的产品状态
- 首页 section 顺序确定
- 素材缺口被列出
- Hero 在无渐变、无光晕、无动画时仍然具备清晰层级
- 页面不依赖聊天气泡或 Agent 状态解释 GeoWork

---

# M1 — 工程初始化与依赖锁定

## 目标

建立干净、可持续的 Next.js 官网工程。

## 任务

### M1.1 创建仓库

建议：

```text
GeoWork-Website
```

### M1.2 初始化

- Next.js App Router
- TypeScript strict
- ESLint
- CSS Modules
- Motion for React
- MDX

### M1.3 脚本

确保：

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc --noEmit"
  }
}
```

根据实际 Next.js 版本调整 lint 命令，但必须保留等价能力。

### M1.4 Token

创建：

- `styles/tokens.css`
- `styles/typography.css`
- `styles/motion.css`

### M1.5 应用外壳

创建：

- Root layout
- Metadata
- 字体加载
- 全局样式入口
- 空白营销路由组
- 404 与错误边界

Header、Footer、Container、Section 和 ButtonLink 在 M2 组件阶段实现。

### M1.6 基础 SEO

- sitemap
- robots
- Open Graph 默认图
- canonical

### M1.7 锁定组件依赖

安装并提交 lockfile：

```bash
npm install motion clsx zod shiki @phosphor-icons/react
npm install @radix-ui/react-accordion @radix-ui/react-dialog
npm install @radix-ui/react-dropdown-menu @radix-ui/react-navigation-menu
npm install @radix-ui/react-popover @radix-ui/react-slot
npm install @radix-ui/react-tabs @radix-ui/react-tooltip
npm install -D vitest @testing-library/react @testing-library/jest-dom
npm install -D @playwright/test @axe-core/playwright
```

可选的 Embla 不在初始化阶段安装，只有案例设计确认需要轮播后再添加。

### M1.8 创建组件分层

```text
src/components/primitives/
src/components/ui/
src/components/marketing/
src/components/content/
```

禁止把所有组件直接放进 `components/` 根目录。

### M1.9 创建开发组件页

建立仅开发环境可用的：

```text
/dev/components
```

展示：

- 颜色 Token
- 字体
- Button 状态
- Link
- Tabs
- Dialog
- Dropdown
- Tooltip
- Accordion
- MediaFrame
- Figure

生产构建中返回 404 或通过环境变量关闭。

## 验收

```bash
npm run lint
npm run typecheck
npm run build
```

全部通过。

移动端与桌面端导航均可用。

---

# M2 — Token、Primitives 与基础组件

## 目标

先完成可复用的设计基础，再开始拼首页。不得在 Hero 中临时定义一套独立按钮、字体和圆角。

## 任务

### M2.1 Token

创建并验收：

```text
styles/tokens.css
styles/typography.css
styles/layout.css
styles/motion.css
```

至少包含：

- light / dark surface
- text hierarchy
- border
- accent
- status
- spacing
- radius
- shadow
- z-index
- motion duration
- content widths

### M2.2 Radix Primitives

按顺序完成：

1. Tabs
2. Dialog
3. Navigation Menu
4. Dropdown Menu
5. Tooltip
6. Accordion
7. Popover

每个组件同时完成键盘测试和 focus 样式。

### M2.3 GeoWork UI

按顺序完成：

1. Button / ButtonLink
2. Container
3. Section
4. SectionHeading
5. Figure
6. MediaFrame
7. VideoPlayer
8. Logo / Icon

### M2.4 视觉状态

所有组件必须有：

- default
- hover
- focus-visible
- active / pressed
- disabled
- dark section
- light section
- reduced motion

### M2.5 测试

- Vitest 组件测试。
- Testing Library 键盘交互。
- axe 基础扫描。
- Playwright 组件页截图。

## 验收

- 开发组件页可以独立展示完整组件系统。
- Marketing 组件尚未实现。
- 不存在 Ant Design、Tailwind 或默认 shadcn 视觉。
- Radix 只在 primitives 层被引用。
- Button、Tabs、Dialog 和 Navigation 完整可用。
- 五个视口无溢出。

---

# M3 — 首页静态骨架

## 目标

只完成首页全部 section 的结构、标题与占位，不做复杂动画。

## 任务

按顺序创建：

1. Navigation
2. Hero
3. Product Principles
4. Project to Deliverable
5. Work / Code / Map
6. Use Cases
7. Architecture
8. Skills & Ecosystem
9. Open Development / Download CTA
10. Footer

Developer Preview 状态放在 Download、Release 信息或 Footer，不默认创建全宽公告条。

## 规则

- 使用真实文案，不用 Lorem ipsum。
- 素材不足时使用明确占位块。
- 不在本阶段实现视频和滚动联动。
- 完成 Desktop / Tablet / Mobile 基础布局。

## 验收

- 首页信息顺序清晰
- 深浅章节节奏正确
- 无横向溢出
- Header 锚点可跳转
- 每个 section 有唯一目的
- 不出现通用 AI SaaS Hero 组合
- 首屏包含真实产品对象，而不是只有标题、光晕和按钮

---

# M4 — Hero 与真实产品媒体

## 目标

完成官网第一屏和首个核心产品演示。

## 任务

### M3.1 Hero 内容

- GeoWork Wordmark 或简短产品类别说明
- H1
- 具体 Subtitle
- Download CTA
- Explore GeoWork CTA

默认不使用 Eyebrow 胶囊，不在 Hero 放置 Developer Preview 公告，不让 GitHub 按钮与主 CTA 竞争。

### M3.2 Hero 构图

优先顺序：

1. 非对称编辑式布局：文案与真实产品媒体左右组合。
2. 大标题 + 下方全宽真实产品媒体。
3. 极简浅色构图，色彩来自地图成果。

禁止：

- 居中超大渐变标题
- 蓝绿 / 紫色光晕
- 发光产品窗口
- 假聊天气泡和 `Agent running`
- 胶囊标签 + 双胶囊按钮模板

### M3.3 产品媒体

- 使用最新 GeoFrontend2.0 视觉
- 展示项目、地图、代码、图表和报告之间的连续工作
- 不使用 macOS 三色圆点作为唯一识别
- 产品媒体不依赖霓虹描边或大阴影
- 支持 dark / light 素材，但每一屏只使用一种明确主题

### M3.4 演示方式

优先方案：

- WebM + MP4 视频
- poster 图片
- 无声循环
- reduced motion 静态替代

演示流程：

- 打开项目或数据
- 切换 Work / Code / Map
- 完成一个具体分析步骤
- 查看并导出成果

素材未准备好时：

- 使用真实截图序列或简单状态切换
- 标注 Concept preview
- 不得用虚构 Agent 对话填充画面

### M3.5 性能

- Hero 文本先加载
- 视频 `preload="metadata"` 或按实际优化
- 不阻塞 LCP

## 验收

- 10 秒内理解产品
- CTA 清晰
- 视频可暂停或在 reduced motion 下不播放
- 低网速下仍有 poster
- 手机端可读
- 关闭动画、阴影和渐变后，Hero 仍有完整设计层级
- 首屏不以 AI / Agent 视觉符号为核心

---

# M5 — 核心产品叙事与交互

## 目标

完成最重要的“目标到成果”流程与三模式展示。

## 任务

### M4.1 Product Principles

创建三项：

- Built for geospatial work
- Real tools, working together
- Outputs you can verify

### M4.2 Intent Workflow

四阶段：

- Project / Goal
- Organize
- Work
- Deliver

桌面：sticky + 状态切换。  
移动端：普通纵向步骤。

### M4.3 Work / Code / Map

- 可键盘操作的 Tabs
- 每个模式使用独立媒体和短说明
- 用户操作后停止自动轮播

## 验收

- 流程叙事不依赖长文字
- Tab 完全可键盘操作
- reduced motion 下无强制滚动动画
- 产品状态变化与文字一致

---

# M6 — 案例、架构与生态

## 目标

证明 GeoWork 能处理真实工作，并解释技术和扩展能力。

## 任务

### M5.1 Use Cases

重点案例建议：

1. 城市扩张分析
2. NDVI 时间序列
3. 论文阅读与实验报告

次级案例：

- 洪涝识别
- 土地覆盖分类
- DEM 地形分析

每个重点案例包含：

- 用户目标
- 数据来源
- 使用工具
- 过程摘要
- 输出成果

### M5.2 Architecture

展示：

- Desktop UI
- Go Runtime
- Python Worker
- GIS / Remote Sensing Tools
- Skills / MCP / Plugins
- Models

### M5.3 Ecosystem

- 官方 Skills
- 工具连接
- 社区扩展
- GitHub 贡献入口

## 验收

- 所有案例真实或明确标注演示
- 架构描述与 GeoWork 仓库一致
- 不加载真实地图引擎
- 不做传统节点大屏

---

# M7 — 下载与更新日志

## 目标

提供可信、可维护的版本和下载体验。

## 任务

### M6.1 Release 数据层

优先来源：

- GitHub Releases API

设计 fallback：

- 本地静态 release 数据

### M6.2 Download 页面

展示：

- 推荐平台
- 全部平台
- 版本号
- 发布时间
- 文件大小
- 系统要求
- Release notes
- 校验说明

### M6.3 Changelog

- 使用 MDX
- 列表页
- 详情页
- 支持版本标签

## 验收

- 不显示不存在的安装包
- GitHub API 失败时页面可用
- 外部下载链接安全
- 版本信息有来源

---

## M7.4 其他页面

## Product

内容：

- 产品定位
- 完整工作流
- Work / Code / Map
- Integrations
- Local-first

## Use Cases

内容：

- 按 GIS、遥感、科研、教学分类
- 案例详情入口

## About

内容：

- 项目初心
- 开发状态
- License
- GitHub
- 路线图

## 验收

- 页面不是首页内容复制粘贴
- 每页有唯一 H1
- 页面 metadata 完整
- 移动端可用

---

# M8 — 测试、响应式、可访问性与性能

## 8.1 响应式

检查：

```text
360
390
768
1024
1280
1440
1920
```

## 8.2 可访问性

- 键盘完整走查
- focus 状态
- heading 层级
- 视频控制
- reduced motion
- 对比度

## 8.3 性能

- Bundle 分析
- 图片压缩
- 视频压缩
- 动态导入
- 字体策略
- 第三方脚本检查

## 8.4 去 AI 模板感终审

逐页检查：

- 是否存在无用途的胶囊标签、渐变字、Aurora 光晕或发光边框。
- 是否仍有假聊天记录、`Agent running`、自动打勾步骤占据主要视觉。
- 是否通过真实产品、地图、图表、代码和报告解释能力。
- 是否至少有一半页面在去掉动画后仍保持完整构图。
- 是否存在可以被任意 AI SaaS 替换 Logo 后直接使用的通用区块。

发现通用模板区块时，优先重做信息结构和素材，不通过追加特效进行修饰。

## 8.5 浏览器

至少验证：

- Chrome
- Edge
- Firefox
- Safari（可用环境下）

## 验收

- 无横向溢出
- 无控制台错误
- Lighthouse 指标达到项目目标
- 低性能设备仍可完成导航、阅读和下载

---

# M9 — 发布、视觉回归与最终验收

## 9.1 部署选择

优先：

- Vercel
- Cloudflare Pages

如果使用 GitHub Pages：

- 采用静态导出
- 确认所有功能不依赖运行时服务端能力
- Release 数据使用构建时或客户端 fallback

## 9.2 域名

建议：

- 主域名用于官网
- `docs.` 用于文档
- `download.` 不必单独建立，避免复杂化

## 9.3 发布前清单

- 正式 Logo
- favicon
- OG 图
- sitemap
- robots
- 404 页面
- 下载链接
- License
- 隐私与统计说明
- GitHub 链接
- Developer Preview 标签

## 9.4 发布后

- 添加真实访问分析前先确认隐私方案
- 监控 404 和下载失败
- 更新 README 官网链接
- 在 GeoWork 和 GeoFrontend2.0 仓库加入官网入口

---

## 2. 建议实施顺序

严格顺序：

```text
M0 -> M1 -> M2 -> M3 -> M4 -> M5 -> M6 -> M7 -> M8 -> M9
```

不得直接跳到复杂滚动动画。

---

## 3. 第一轮最小可发布版本

第一轮可以在 M6 前发布 Preview：

```text
首页
GitHub 入口
Developer Preview 状态
静态下载引导
基础 About
```

条件：

- 不展示虚假下载
- 不展示尚未完成的案例
- 页面明确标注 Preview

---

## 4. 素材待办清单

### 必需

- [ ] Logo SVG
- [ ] Wordmark SVG
- [ ] favicon
- [ ] Hero poster
- [ ] Hero 视频
- [ ] Work 模式截图 / 视频
- [ ] Code 模式截图 / 视频
- [ ] Map 模式截图 / 视频
- [ ] 城市扩张案例成果
- [ ] NDVI 案例成果
- [ ] 报告生成案例成果
- [ ] GitHub Release 信息

### 可后置

- [ ] 用户评价
- [ ] 社区贡献者
- [ ] 教学案例
- [ ] 企业案例
- [ ] 完整多语言

不存在真实内容时不得用虚构内容填充。

---

## 5. 风险与处理

### 风险 1：产品 UI 仍在变化

处理：

- 官网产品窗口做独立媒体组件
- 避免将截图写死进 CSS
- 统一替换素材路径

### 风险 2：视频过大

处理：

- poster 优先
- WebM / MP4 双格式
- 分章节延迟加载
- 不使用 4K 原文件直接上线

### 风险 3：动画拖慢开发

处理：

- M2 先完成静态布局
- M3–M5 再逐段加入
- 每个动画必须有静态 fallback

### 风险 4：官网承诺超过产品完成度

处理：

- 每次发布前核对 GeoWork README 与 Release
- 使用 Developer Preview 标签
- 未完成能力标注 Planned / In development

### 风险 5：技术栈过度复杂

处理：

- V1 不引入 3D、地图引擎和 GSAP
- 每个新依赖必须说明必要性
- 优先原生 CSS 和 Motion

---

## 6. 最终完成标准

官网 V1 完成时，应达到：

1. 视觉质量接近 Raycast、Linear、Warp 一类现代桌面软件官网。
2. 不复制它们的品牌资产，具有 GeoWork 自己的空间智能识别度。
3. 用户可快速理解产品、查看真实过程、了解开发状态并下载。
4. 首页在桌面和移动端都完整可用。
5. 网站性能、可访问性和 SEO 达到可公开发布标准。
6. 内容与 GeoWork 当前真实能力一致。
7. 代码可由后续 Agent 按 `AGENT.md` 稳定维护。
8. 全站不存在通用 AI SaaS 模板式 Hero 或假 Agent 主视觉。
9. AI 作为能力被准确表达，但不支配品牌、排版和视觉语言。

---

## 10. 依赖与组件验收清单

### 工程依赖

- [ ] Next.js App Router
- [ ] TypeScript strict
- [ ] CSS Modules
- [ ] Motion for React
- [ ] Radix UI 指定 primitives
- [ ] Phosphor Icons
- [ ] Shiki
- [ ] Zod
- [ ] MDX
- [ ] Vitest
- [ ] Testing Library
- [ ] Playwright
- [ ] axe

### 组件

- [ ] SiteHeader
- [ ] MobileMenu
- [ ] Button / ButtonLink
- [ ] Container
- [ ] Section
- [ ] SectionHeading
- [ ] Figure
- [ ] MediaFrame
- [ ] VideoPlayer
- [ ] Tabs
- [ ] Dialog
- [ ] DropdownMenu
- [ ] Tooltip
- [ ] Accordion
- [ ] Hero
- [ ] ProductStage
- [ ] WorkflowStory
- [ ] ModeShowcase
- [ ] UseCaseStory
- [ ] ArchitectureDiagram
- [ ] EcosystemShowcase
- [ ] DownloadPanel
- [ ] SiteFooter

### 视觉

- [ ] 暖白 Hero，不使用 Aurora。
- [ ] 真实产品媒体，不使用假 Agent 对话。
- [ ] 主标题具体描述地理工作。
- [ ] GitHub 不与下载主 CTA 竞争。
- [ ] 页面色彩来自地图和成果。
- [ ] 深色章节没有霓虹描边。
- [ ] 连续章节不重复卡片模板。
- [ ] 动画关闭后设计仍然成立。

---

## 11. 开始编码前的最终准备材料

必须先准备好：

1. GeoWork Logo SVG。
2. 最新 GeoFrontend2.0 桌面截图。
3. Work / Code / Map 各一组截图或录屏。
4. 城市扩张案例成果。
5. NDVI 或时序遥感案例成果。
6. 报告或科研工作流成果。
7. 当前版本和平台支持信息。
8. 架构信息。
9. GitHub Release 信息。
10. 中英文首页文案。

缺少真实素材时允许先做灰框线稿，但不允许用虚构 AI 聊天界面作为替代。
---

## 12. 项目决策门与依赖关系

每个里程碑必须经过 Gate，不能因为“页面能打开”就进入下一阶段。

| Gate | 必须确认 | 未通过时 |
|---|---|---|
| G0 产品事实 | 定位、平台、版本、能力、许可 | 不写最终文案 |
| G1 视觉方向 | Hero、色彩、字体、真实素材方向 | 不开始完整页面 |
| G2 设计系统 | Token、基础组件、状态、响应式 | 不拼 Marketing Section |
| G3 首页静态 | 无动画布局与内容完整 | 不做复杂动效 |
| G4 产品素材 | 截图、视频、案例真实可用 | 不发布首页 |
| G5 工程质量 | Typecheck、Lint、Test、Build | 不部署 Preview |
| G6 发布质量 | SEO、Legal、下载、监控、回滚 | 不切生产域名 |

依赖顺序：

```text
产品事实
→ 文案与信息架构
→ Figma Wireframe
→ Design Tokens
→ Primitives / UI
→ 静态页面
→ 真实素材
→ 交互与动画
→ 内容页
→ SEO / Legal / Analytics
→ 测试与性能
→ Preview
→ Production
```

---

## 13. M0 补充：产品、内容与设计输入

### M0.6 产品事实表

创建 `docs/product-facts.md`，包含：

- 产品定位。
- 当前版本。
- 当前平台。
- 当前仓库。
- 已完成功能。
- Preview 功能。
- 计划功能。
- 系统要求。
- 开源许可。
- 隐私与联网行为。

所有官网文案必须引用这份事实表。

### M0.7 用户与场景

完成四类用户：

- 教学。
- 科研。
- 开发。
- 行业分析。

为每类用户选择一个首页或案例页可展示的真实任务。

### M0.8 完整 Sitemap

确认：

```text
Home
Product
Workflows
Use Cases
Developers
Download
Changelog
About
Privacy
Terms
404
```

### M0.9 文案表

创建中文与英文文案表：

- 页面标题。
- 描述。
- H1。
- CTA。
- 导航。
- 产品状态。
- 错误与空状态。
- SEO。

### M0.10 Figma Wireframe

先完成灰度线框：

- 首页 Desktop。
- 首页 Mobile。
- Product。
- Use Cases。
- Download。

线框通过后再加颜色和真实素材。

### M0.11 素材拍摄计划

明确：

- 示例项目。
- 统一窗口大小。
- 每个截图的页面与用途。
- 每段视频的脚本。
- 需要隐藏的隐私信息。
- 输出格式与大小预算。

### G0 / G1 验收

- [ ] 产品事实由负责人确认。
- [ ] 主标题与副标题确认。
- [ ] Sitemap 确认。
- [ ] Hero 不使用 AI 胶囊和光晕。
- [ ] 真实产品素材计划可执行。
- [ ] Desktop / Mobile Wireframe 通过。

---

## 14. M1 补充：工程、环境与部署基础

### M1.10 环境变量

创建 `.env.example`：

```text
SITE_URL=
GITHUB_OWNER=Wanfeng1028
GITHUB_REPO=GeoWork
GITHUB_TOKEN=
ANALYTICS_PROVIDER=none
ANALYTICS_SITE_ID=
```

### M1.11 基础配置

- TypeScript strict。
- ESLint。
- Prettier 或统一格式化方案。
- Path aliases。
- Next.js Image remote patterns，若确有外部图片。
- 安全响应头基础配置。
- `sitemap.ts`、`robots.ts`、`manifest.ts`。
- Error、Global Error、Not Found。

### M1.12 CI

创建 Pull Request Workflow：

```text
npm ci
npm run typecheck
npm run lint
npm run test
npm run build
npm run test:e2e
```

视觉回归可在固定 Preview 环境运行。

### M1.13 Preview 部署

- 每个 PR 生成 Preview URL。
- main 保护规则。
- 部署失败不允许合并。
- 配置回滚方式。

### G2 验收

- [ ] 新环境可从 README 独立启动。
- [ ] `.env.example` 完整。
- [ ] CI 通过。
- [ ] Preview 可访问。
- [ ] 安全响应头基础值存在。

---

## 15. M2 补充：设计系统与组件交付

### M2.6 Foundations

完成：

- Color。
- Typography。
- Spacing。
- Grid。
- Radius。
- Shadow。
- Motion。
- Breakpoints。
- Focus ring。

### M2.7 Primitive Tests

每个 Radix 封装测试：

- Mouse。
- Keyboard。
- Focus return。
- Disabled。
- Escape。
- Screen reader label。

### M2.8 UI Components

除现有清单外补充：

- TextLink。
- IconButton。
- SkipLink。
- StatusLabel。
- Breadcrumb。
- EmptyState。
- ErrorState。
- LoadingState。

### M2.9 Figma 对照

建立组件名称映射表：

```text
Figma/Button → components/ui/button
Figma/Tabs → components/primitives/tabs
Figma/MediaFrame → components/ui/media-frame
```

### G3 前置验收

- [ ] `/dev/components` 展示全部状态。
- [ ] Light / Dark 可用。
- [ ] Mobile 可用。
- [ ] axe 无严重问题。
- [ ] 未引入模板组件库。

---

## 16. M3–M6 补充：首页与产品内容

### 首页静态优先

在任何滚动动画前完成：

- 内容顺序。
- 标题层级。
- Desktop / Tablet / Mobile。
- 产品媒体占位比例。
- 键盘路径。
- JavaScript 关闭后的可读性。

### Hero 素材验收

- 真实 GeoFrontend2.0 截图或录屏。
- 无密钥和私人路径。
- 地图成果可读。
- 窗口比例符合实际产品。
- Poster 加载时页面已经成立。

### Work / Code / Map

- 使用 Radix Tabs。
- 每个 Tab 有独立文案和真实媒体。
- 切换不跳动。
- URL 状态可选保存。
- reduced motion 使用淡入或无动画。

### Use Cases

每个案例完成：

- MDX。
- Cover。
- 地图。
- 图表。
- 流程。
- 报告。
- 工具与数据来源。
- 当前可用状态。

### Architecture

只展示真实架构：

```text
Desktop
Go Runtime
Python Worker
GIS / Remote Sensing Tools
Skills / MCP / Plugins
```

不得制作看起来复杂但没有技术含义的连线图。

### G4 验收

- [ ] 首页 70% 以上核心媒体为真实产品或真实成果。
- [ ] 不依赖 AI 文案解释产品。
- [ ] 所有媒体有回退。
- [ ] 案例有事实来源。
- [ ] 动画关闭后版式完整。

---

## 17. M7 补充：内容页、下载与法律页面

### Product

详细说明：

- Workspace。
- Project context。
- Work / Code / Map。
- Terminal / Browser / Events / Logs。
- Research / Report。
- Automation / Extensions。

### Workflows

至少三套流程：

1. 遥感时序分析。
2. 城市扩张研究。
3. 文献到报告的科研流程。

### Developers

- 架构。
- 仓库。
- 本地开发入口。
- Skills。
- MCP。
- 插件。
- 贡献方式。
- API / SDK，只有真实存在时展示。

### Download

- 平台检测。
- 手动选择。
- 版本。
- 文件大小。
- SHA-256，若存在。
- 系统要求。
- 安装说明。
- 已知问题。
- GitHub fallback。

### Legal

完成：

- Privacy。
- Terms。
- Third-party notices。
- Security contact 或 `security.txt`。

### G5 前置验收

- [ ] 下载经过真实设备验证。
- [ ] GitHub API 失败有 fallback。
- [ ] Legal 有负责人审核。
- [ ] 外部链接无 404。

---

## 18. M8 补充：质量、性能与安全

### 测试矩阵

| 维度 | 范围 |
|---|---|
| Viewport | 390、768、1280、1440、1920 |
| Browser | Chrome、Edge、Firefox、Safari |
| Input | Mouse、Keyboard、Touch |
| Motion | Normal、Reduced |
| Network | Fast、Slow、Offline fallback |
| Theme | Light section、Dark section |
| Locale | zh-CN、en |

### 性能检查

- Bundle 分析。
- LCP 媒体。
- 图片 sizes。
- 字体加载。
- 第三方脚本。
- Layout Shift。
- 视频降级。

### 安全检查

- CSP。
- 环境变量。
- 外链 rel。
- 下载 URL。
- MDX 内容。
- Source map 与日志。
- Dependency audit。

### 内容检查

- 拼写。
- 中文标点。
- 英文语法。
- 版本号。
- 平台。
- Release 链接。
- 能力事实。

### G5 验收

- [ ] Typecheck / Lint / Unit / Build 通过。
- [ ] E2E 通过。
- [ ] axe 无严重问题。
- [ ] 无横向溢出。
- [ ] 无控制台错误。
- [ ] 无关键失效链接。
- [ ] 安全响应头通过检查。

---

## 19. M9 补充：发布、监控与运营

### 发布前

- 冻结最终文案。
- 生成 sitemap。
- 检查 canonical / hreflang。
- 检查 OG 图片。
- 检查 Privacy / Terms 日期。
- 检查全部下载。
- 记录当前生产版本。
- 准备回滚版本。

### 发布后 30 分钟

- 首页 Smoke Test。
- 下载 Smoke Test。
- GitHub Release 数据。
- 404。
- 移动端。
- 日志与错误。
- Core Web Vitals 初始数据。

### 发布后 7 天

- 检查 404。
- 检查下载点击和外链点击。
- 检查页面性能。
- 收集反馈。
- 修复高优问题。
- 更新文档和 Changelog。

### 内容运营

每个产品版本：

1. 更新 Release 数据。
2. 更新 Changelog。
3. 更新下载页。
4. 更新截图或能力说明。
5. 检查案例仍然真实。

### G6 验收

- [ ] 生产域名与 HTTPS 正常。
- [ ] 监控生效。
- [ ] 回滚已演练。
- [ ] 发布记录已保存。
- [ ] 负责人完成最终产品事实检查。

---

## 20. V1、V1.1 与后续范围

### V1 必须完成

- 首页。
- Product。
- Workflows。
- Use Cases。
- Developers。
- Download。
- Changelog。
- About。
- Privacy / Terms。
- 中英文工程基础，至少一种语言完整上线。
- 真实产品素材。
- GitHub Release fallback。
- SEO、性能、可访问性、安全和测试。

### V1.1

- 完整双语。
- 更多案例。
- Docs 独立站。
- Roadmap。
- Newsletter，只有真实需要时。
- 自动生成部分 Release 数据。

### 后续

- 插件市场页面。
- 在线 Demo，只有产品和安全条件成熟时。
- 账号系统。
- 云同步或团队功能介绍。
- 社区案例投稿。

禁止在 V1 提前建设尚无产品支撑的大型市场、账户和计费系统。

---

## 21. 项目最终交付清单

### 设计

- [ ] Figma Foundations。
- [ ] Components。
- [ ] Homepage Desktop / Tablet / Mobile。
- [ ] Product / Workflows / Use Cases / Developers / Download。
- [ ] 交互原型。
- [ ] 素材清单。

### 代码

- [ ] Next.js 工程。
- [ ] 组件系统。
- [ ] 页面。
- [ ] 内容数据。
- [ ] Release 数据层。
- [ ] SEO / i18n / Analytics 适配层。
- [ ] 安全响应头。
- [ ] 测试与 CI。

### 内容

- [ ] 中文文案。
- [ ] 英文文案或可扩展结构。
- [ ] 三个真实案例。
- [ ] Changelog。
- [ ] Privacy / Terms。
- [ ] System Requirements。

### 资产

- [ ] Logo 全套。
- [ ] Favicon / App Icon / OG。
- [ ] 产品截图。
- [ ] 视频及 poster。
- [ ] 案例地图、图表、报告。
- [ ] Attribution 与许可记录。

### 发布

- [ ] 域名。
- [ ] HTTPS。
- [ ] Preview / Production。
- [ ] 监控。
- [ ] 回滚。
- [ ] README 与维护说明。---

# v0.5 文件级实施索引

本节只给出阶段与文件映射，具体代码见 `DEVELOPMENT.md`，逐文件职责见 `FILE-MAP.md`。

## 阶段 A：工程与全局基础

创建：

```text
package.json
next.config.ts
tsconfig.json
eslint.config.mjs
vitest.config.ts
vitest.setup.ts
playwright.config.ts
mdx-components.tsx
.env.example
src/app/layout.tsx
src/app/globals.css
src/app/not-found.tsx
src/app/error.tsx
src/app/robots.ts
src/app/sitemap.ts
src/styles/tokens.css
src/styles/typography.css
src/styles/motion.css
src/styles/utilities.css
src/lib/env.ts
src/lib/site.ts
src/lib/cn.ts
```

阶段结束时，空网站必须通过 `lint + typecheck + test + build`。

## 阶段 B：Primitives 与基础 UI

创建：

```text
src/components/primitives/tabs/*
src/components/primitives/dialog/*
src/components/primitives/dropdown-menu/*
src/components/primitives/navigation-menu/*
src/components/primitives/tooltip/*
src/components/primitives/accordion/*
src/components/primitives/popover/*
src/components/ui/button/*
src/components/ui/container/*
src/components/ui/section/*
src/components/ui/section-heading/*
src/components/ui/media-frame/*
src/components/ui/figure/*
src/components/ui/video-player/*
src/components/ui/logo/*
src/app/dev/components/page.tsx
```

阶段结束时，开发组件页必须展示全部状态，且 Radix 只能从 `primitives/` 被直接导入。

## 阶段 C：首页静态结构

创建：

```text
src/app/(marketing)/layout.tsx
src/app/(marketing)/page.tsx
src/components/marketing/site-header/*
src/components/marketing/hero/*
src/components/marketing/product-principles/*
src/components/marketing/workflow-story/*
src/components/marketing/mode-showcase/*
src/components/marketing/use-case-story/*
src/components/marketing/product-details/*
src/components/marketing/architecture-diagram/*
src/components/marketing/open-development/*
src/components/marketing/download-panel/*
src/components/marketing/site-footer/*
```

先做无动画版。Hero 必须用真实产品图或登记为“素材待替换”，不能用假 Agent UI。

## 阶段 D：数据、内容和动态能力

创建：

```text
src/data/navigation.ts
src/data/home.ts
src/data/product.ts
src/data/use-cases.ts
src/data/platforms.ts
src/data/architecture.ts
src/data/changelog.ts
src/lib/github/release-schema.ts
src/lib/github/releases.ts
src/content/changelog/*.mdx
src/content/use-cases/*.mdx
```

GitHub API 失败时显示本地 fallback，不得让下载页白屏。

## 阶段 E：二级页面

创建：

```text
src/app/(marketing)/product/page.tsx
src/app/(marketing)/use-cases/page.tsx
src/app/(marketing)/use-cases/[slug]/page.tsx
src/app/(marketing)/download/page.tsx
src/app/(marketing)/changelog/page.tsx
src/app/(marketing)/changelog/[slug]/page.tsx
src/app/(marketing)/about/page.tsx
src/app/(marketing)/privacy/page.tsx
src/app/(marketing)/terms/page.tsx
```

## 阶段 F：测试、CI 和部署

创建：

```text
tests/e2e/home.spec.ts
tests/e2e/navigation.spec.ts
tests/e2e/download.spec.ts
tests/e2e/accessibility.spec.ts
tests/visual/home.visual.spec.ts
.github/workflows/ci.yml
.github/pull_request_template.md
```

主部署平台锁定为 Vercel：PR 产生 Preview，`main` 产生 Production。Cloudflare Pages 和 GitHub Pages 不作为 V1 主部署目标。
