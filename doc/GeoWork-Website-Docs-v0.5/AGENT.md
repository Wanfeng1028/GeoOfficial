# GeoWork Website — AGENT.md

> 适用仓库：`GeoWork-Website`  
> 适用对象：Codex、Claude Code、Qoder、TRAE、WorkBuddy、Cursor 等 AI 编程 Agent，以及人工开发者。  
> 文档版本：v0.5  
> 优先级：本文件高于普通任务提示；`DESIGN.md` 是视觉与产品设计的最高依据；`PLAN.md` 是实施顺序依据。

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

## 1. 开始工作前必须阅读

每次开始任务前，必须按顺序阅读：

1. `AGENT.md`
2. `DESIGN.md`
3. `PLAN.md`
4. 当前任务相关文件
5. `package.json`
6. 当前 Git 状态与最近提交

不得只根据用户一句话直接修改代码。

---

## 2. 项目目标

GeoWork 官网是独立的品牌和产品营销网站，不是 GeoFrontend2.0 的浏览器版本。

网站必须：

- 解释 GeoWork 的定位
- 展示真实产品过程与成果
- 提供下载、GitHub、文档和更新日志入口
- 表达当前 Developer Preview 状态
- 建立高质量国际化桌面软件官网形象
- 让 GeoWork 首先被理解为专业地理空间工作台，而不是通用 AI SaaS 或聊天机器人

设计融合：

- Raycast：深色产品氛围与生态
- Linear：信息秩序、产品叙事与图注系统
- Warp：模式切换、架构和下载区
- Attio：明亮产品对象与流程
- Screen Studio：大型演示媒体
- Craft：使用场景与人文表达
- Superlist：适度活力

不得复制任何对标网站的 Logo、文案、插画、代码或品牌资产。

---

## 3. 固定技术栈与依赖边界

### 3.1 必须使用

```text
Next.js App Router
React
TypeScript strict
CSS Modules
CSS Custom Properties
Radix UI Primitives
Motion for React
MDX
Phosphor Icons
Shiki
Zod
```

### 3.2 测试必须使用

```text
Vitest
React Testing Library
Playwright
@axe-core/playwright
```

### 3.3 可按需使用

```text
clsx
Embla Carousel
next-intl
```

Embla 只有在案例轨道确实需要拖动、按钮、键盘和触摸支持时才可加入。普通内容列表不得为了动画改成轮播。

### 3.4 Radix UI 允许包

```text
@radix-ui/react-accordion
@radix-ui/react-dialog
@radix-ui/react-dropdown-menu
@radix-ui/react-navigation-menu
@radix-ui/react-popover
@radix-ui/react-slot
@radix-ui/react-tabs
@radix-ui/react-tooltip
```

新增其他 Radix 包前需要说明具体交互需求。

### 3.5 明确禁止

```text
Ant Design
Material UI
Element Plus
Chakra UI
Mantine
Bootstrap
Tailwind CSS
shadcn/ui CLI 与整套默认主题
GSAP
Three.js
Cesium
MapLibre
Lottie
全局平滑滚动库
Landing Page 区块模板
```

说明：

- 可以研究 shadcn/ui 的组件实现，但不得安装其整套默认视觉、复制默认 Card / Hero 或引入 Tailwind。
- GeoWork 产品本身可使用 Ant Design、MapLibre 和 deck.gl，但官网默认不加载这些依赖。
- Hero 不允许使用虚构地图引擎演示代替真实产品截图。

### 3.6 依赖安装基线

工程初始化后应安装：

```bash
npm install motion clsx zod shiki @phosphor-icons/react
npm install @radix-ui/react-accordion @radix-ui/react-dialog
npm install @radix-ui/react-dropdown-menu @radix-ui/react-navigation-menu
npm install @radix-ui/react-popover @radix-ui/react-slot
npm install @radix-ui/react-tabs @radix-ui/react-tooltip
npm install -D vitest @testing-library/react @testing-library/jest-dom
npm install -D @playwright/test @axe-core/playwright
```

MDX 使用与当前 Next.js App Router 兼容的官方方案，安装前检查工程版本并保留最少依赖。

### 3.7 组件库使用规则

Radix 只允许存在于 `components/primitives/` 封装层。业务 section 不得到处直接 import Radix 包。

正确：

```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/primitives/tabs';
```

错误：

```tsx
import * as Tabs from '@radix-ui/react-tabs';
```

营销组件只能依赖 GeoWork 自有 `ui/` 和 `primitives/`，不得依赖第三方默认样式。

## 4. 工作流程

### 4.1 修改前

必须先输出：

1. 当前问题判断
2. 本步骤目标
3. 将修改的文件
4. 不会修改的范围
5. 验收方式

等待用户确认后再进行大范围修改。

小范围、低风险、用户指令明确的修复可以直接执行，但仍应说明修改内容。

### 4.2 修改中

- 一次只完成一个 PLAN 阶段或一个明确任务。
- 不提前实现后续页面。
- 不随意改动已验收章节。
- 不为了“顺便优化”重构无关代码。
- 新增依赖前先说明原因、体积和替代方案。

### 4.3 修改后

必须运行：

```bash
npm run lint
npm run typecheck
npm run build
```

如项目配置了测试，再运行：

```bash
npm test
```

必须汇报：

- 修改文件
- 核心变化
- 验证结果
- 已知限制
- 下一步建议

---

## 5. 文件与目录规则

推荐目录：

```text
app/
components/
content/
lib/
public/
styles/
```

### `app/`

- 只负责路由、页面组合、metadata 和服务端数据入口。
- 不在 `page.tsx` 中堆放数百行动画和样式逻辑。

### `components/ui/`

只允许非常小的官网基础组件：

- ButtonLink
- Container
- Section
- Eyebrow
- MediaFrame
- Tabs

禁止发展成自研大型设计系统。

### `components/sections/`

每个首页 section 独立文件夹：

```text
Hero/
ProductPrinciples/
IntentWorkflow/
ModeShowcase/
UseCases/
Architecture/
Ecosystem/
DownloadCTA/
```

### `content/`

- changelog、案例和可编辑文案优先放入 MDX / 内容文件。
- 不把长篇营销文案硬编码在复杂组件内部。

### `public/`

- 图片、视频和品牌资源按用途分目录。
- 文件名使用小写 kebab-case。
- 禁止上传含 API Key、用户名、私人路径和隐私信息的截图。

---

## 6. TypeScript 规则

- 启用严格模式。
- 禁止无理由使用 `any`。
- 组件 Props 必须有明确类型。
- 外部数据必须校验。
- Release 数据、案例数据和导航数据使用类型化对象。
- 不使用不安全的类型断言绕过问题。

示例：

```ts
type ReleaseAsset = {
  name: string;
  platform: 'windows' | 'macos' | 'linux';
  architecture: 'x64' | 'arm64';
  sizeBytes: number;
  downloadUrl: string;
};
```

---

## 7. React 与 Next.js 规则

- 默认使用 Server Components。
- 只有需要交互、浏览器 API 或动画的组件才加 `'use client'`。
- 不把整个首页设为 Client Component。
- 使用 `next/image` 管理静态图片。
- 视频必须有 poster、尺寸与 preload 策略。
- Metadata 使用 Next.js Metadata API。
- 路由链接使用 `next/link`。
- 可静态生成的内容优先静态生成。

禁止：

- 在客户端重复请求静态内容
- 在页面加载时一次性加载全部视频
- 为简单 hover 引入 JS 动画
- 在首屏引入地图引擎

---

## 8. CSS 规则

允许：

```text
CSS Modules
CSS Custom Properties
少量 globals.css
styles/tokens.css
styles/typography.css
styles/motion.css
```

规则：

- 颜色必须优先使用 Token。
- 间距优先使用 4 px 基础尺度。
- 不使用随意魔法数字。
- 页面 section 使用稳定的 Container 和 Grid。
- 复杂产品 UI 可在局部组件中使用 CSS Grid。

禁止：

- 大量 inline style
- 每个组件重复声明相同颜色
- `!important`
- 全局类名污染
- 大面积 neon glow
- 滤镜叠加导致可读性下降
- 隐藏横向溢出来掩盖布局错误

---

## 9. 视觉规则

### 必须保持

- Hero 使用中性深色或暖白背景，不使用 Aurora 与霓虹光晕
- 浅色产品解释区
- 中性深色架构区
- 浅色 CTA 收尾
- GeoWork 地理青只作为少量强调色
- 真实产品画面、地图成果和工作对象是主要视觉
- 一屏一个重点
- 使用编辑式排版、明确栅格和克制留白建立品牌感
- AI / Agent 只作为能力信息出现，不作为装饰主题

### 禁止

- 传统 GIS 科技大屏
- 旋转 3D 地球作为 Hero
- 粒子、星空和经纬网铺满背景
- 紫蓝通用 AI 渐变
- 蓝绿雾化光斑与标题渐变
- 九宫格功能卡片
- Ant Design 后台外观
- 玻璃拟态全站化
- 所有元素统一大圆角
- 胶囊 Eyebrow + 居中超大标题 + 双胶囊 CTA 的模板组合
- 假聊天记录、`Agent running`、自动打勾步骤作为 Hero 主视觉
- 产品窗口发光边框、霓虹地图描边和无意义状态脉冲

### 去除 AI 模板感的硬性检查

任意页面提交前，必须回答以下问题：

1. 删除 `AI`、`Agent` 和光晕后，页面是否仍然成立？
2. 页面是否展示 GeoWork 的真实工作对象：地图、数据、代码、图层、图表、报告或项目？
3. 隐去 Logo 后，页面是否会被误认为通用 AI SaaS 模板？
4. Hero 是否依赖假对话和自动执行动画解释产品？
5. 所有圆角、阴影、渐变和动画是否有明确用途？

若第 2 项为“否”，或第 3、4 项为“是”，当前设计不得进入验收。

---

## 9.1 设计参考与审查工作流

设计与实现可以参考以下方法，但不得直接套模板：

- Anthropic Frontend Design Skill：用于建立独特构图，避免通用 AI 页面。
- Vercel Web Design Guidelines：用于交互、可访问性和响应式审查。
- Untitled UI / Geist / Radix：只借用基础 Token、组件状态和可访问性规范。
- SaaSFrame / Refero：用于采集真实产品网站的布局模式。

使用这些资源时，禁止直接引入 Aurora Background、Glowing Border、Animated Beam、Floating Cards、Particle Background 等高识别度 AI 模板组件。

## 10. 内容与真实性规则

必须基于 GeoWork 当前真实能力和开发状态。

### 允许表达

- Developer Preview
- 本地优先
- 面向 GIS、遥感、空间分析与科研的桌面工作台
- 连接 QGIS、GDAL、Python、GEE
- Skills、MCP 和插件体系
- 输出地图、数据、代码与报告
- AI-assisted / Agent capabilities，但应放在产品能力或技术层，不作为品牌标题反复出现

### 禁止表达

- 已经生产可用（除非事实发生变化）
- 已有大量企业客户
- 虚构用户数字
- 虚构性能指标
- 未实现的平台下载
- 未验证的“完全离线”或“绝对安全”承诺

页面文案如涉及版本、平台、Release、License 或功能完成度，修改前必须核对 GeoWork 仓库和 Release。

---

## 11. 产品截图与演示规则

- 使用最新 GeoFrontend2.0 UI。
- 使用统一的演示项目和虚构数据。
- 所有截图进行裁切、清理和隐私检查。
- 录屏突出一个任务，不展示无关操作。
- Hero 视频 12–18 秒，无声循环。
- Hero 优先展示项目、地图、代码与成果之间的连续工作，不以聊天窗口和 Agent 状态为中心。
- 产品演示中的任务状态使用普通产品语言，如“处理中”“已完成”“等待确认”，避免为制造 AI 感反复显示 `Agent running`。
- reduced motion 模式显示静态 poster。
- 视频必须提供暂停控制或遵循浏览器可访问性规则。

不得：

- 使用模糊低清截图
- 使用旧 GeoWork UI 混入新界面
- 在同一画面堆叠过多浮层
- 伪造产品功能动画而不标注概念演示

如果演示属于概念原型，必须标注：

> Concept preview

---

## 12. 动画规则

优先级：

1. CSS transition
2. Motion for React
3. 原生 IntersectionObserver
4. 经用户确认后才考虑 GSAP

允许：

- opacity / transform
- 产品状态切换
- Tab 切换
- 导航状态变化
- 用户触发的轻量架构状态变化

禁止：

- layout thrashing
- 高频 mousemove 动画
- 页面级滚动劫持
- 无限无意义动画
- 影响文本可读性的视差
- 霓虹脉冲、光线扫描、自动打字和无意义的“思考中”动画

所有动画必须考虑：

```css
@media (prefers-reduced-motion: reduce) {
  /* 禁用或显著减少动画 */
}
```

---

## 13. 响应式规则

每个 section 开发时必须同时完成：

- Desktop
- Tablet
- Mobile

不得先完成桌面后长期留下移动端。

移动端：

- 取消复杂 sticky 动画
- 改为顺序内容
- 产品画面可裁切但不可缩到无法阅读
- 保留清晰 CTA
- 横向内容必须可触摸滑动且有可见提示

---

## 14. 可访问性规则

- 所有交互可键盘操作。
- 所有 focus 状态可见。
- Tab 使用 WAI-ARIA Tab 模式。
- 链接文本必须说明目标。
- 图片 alt 描述实际内容，不写“图片”。
- 装饰图使用空 alt。
- 视频可暂停。
- 文字对比度符合 WCAG AA。
- 不以颜色作为唯一状态。

---

## 15. 性能规则

- 不在首屏加载非必要客户端脚本。
- Hero 文本和 CTA 必须先于视频可用。
- 产品 Demo 动态导入。
- 每个视频设置明确尺寸。
- 优先使用 WebM，保留 MP4 fallback。
- 避免一次加载多个 4K 演示视频。
- 图片使用 AVIF / WebP。
- 第三方分析脚本默认不引入，需用户确认。

禁止为了视觉效果牺牲首屏可用性。

---

## 16. Git 与提交规则

提交前：

```bash
git status
git diff --check
npm run lint
npm run typecheck
npm run build
```

提交信息建议：

```text
feat(home): build hero product demo
feat(download): add release asset selector
style(home): refine section spacing
fix(nav): prevent mobile menu overflow
docs: update website design constraints
```

不得：

- 把无关修改混入一个提交
- 提交构建产物或密钥
- 删除用户现有代码而不说明
- 使用高风险清理命令

---

## 17. 任务提示词最低要求

当用户要求“写给 Agent 的提示词”时，必须包含：

1. 项目背景
2. 当前状态
3. 本步骤目标
4. 参考文件
5. 允许修改范围
6. 禁止事项
7. 具体实现要求
8. 响应式要求
9. 可访问性要求
10. 性能要求
11. 验收标准
12. 执行命令
13. 输出与汇报格式

不得只写一两句模糊提示。

---

## 18. 完成定义

一个任务只有同时满足以下条件才算完成：

- 功能与设计符合 `DESIGN.md`
- 当前 PLAN 阶段验收项完成
- Desktop / Tablet / Mobile 可用
- 键盘和 reduced motion 可用
- lint / typecheck / build 通过
- 无控制台错误
- 无明显布局溢出
- 无虚假内容
- 修改文件和验证结果已汇报

---

## 19. 组件实现责任清单

### 19.1 Primitives 层

只封装交互，不包含营销文案和页面布局：

- `Accordion`
- `Dialog`
- `DropdownMenu`
- `NavigationMenu`
- `Popover`
- `Tabs`
- `Tooltip`

每个 primitive 必须：

- 转发 ref。
- 支持 `className`。
- 保留 Radix 的 keyboard behavior。
- 有可见 focus。
- 有单元测试。
- 不内置大阴影、渐变和营销风格。

### 19.2 UI 层

必须由项目自行实现：

- `Button`
- `ButtonLink`
- `Container`
- `Section`
- `SectionHeading`
- `Figure`
- `MediaFrame`
- `VideoPlayer`
- `Logo`
- `Icon`

Button 使用 Radix Slot 支持 `asChild`，但视觉完全由 CSS Modules 决定。

### 19.3 Marketing 层

以下组件严禁从模板站复制：

- `SiteHeader`
- `Hero`
- `ProductStage`
- `WorkflowStory`
- `ModeShowcase`
- `UseCaseStory`
- `ArchitectureDiagram`
- `EcosystemShowcase`
- `DownloadPanel`
- `SiteFooter`

这些组件决定 GeoWork 是否有独立品牌，开发时必须对照 `DESIGN.md` 的页面结构和真实素材。

---

## 20. 设计还原与质量门槛

### 20.1 每个 section 的开发顺序

1. 无动画静态布局。
2. Desktop / Tablet / Mobile。
3. 真实产品素材。
4. Keyboard 与 focus。
5. 动画。
6. reduced motion。
7. Playwright 截图。
8. 与设计稿对比。

不得先做光效和动画，再补内容与响应式。

### 20.2 AI 模板感阻断规则

出现下列任一情况必须停止并返工：

- Hero 使用 `AI workspace` 胶囊。
- 标题渐变。
- 蓝绿或紫色 Aurora 光斑。
- 产品窗口发光。
- 假聊天对话占首屏。
- `Agent running`、自动打勾、思考动画占主视觉。
- 所有按钮、卡片、标签全部为胶囊。
- 连续多个 section 使用同一种三列卡片模板。
- 用抽象词代替地图、代码、图表、报告等具体成果。

### 20.3 参考网站验收问题

- 是否有 Raycast 的产品完成度，而不是 Raycast 的配色复制？
- 是否有 Linear 的秩序，而不是 Linear 的黑白复制？
- 是否有 Attio 的对象编排，而不是 CRM 卡片拼贴？
- 是否有 Screen Studio 的媒体质量，而不是装饰窗口？
- 是否有 Craft 的温度，而不是把产品做成笔记软件？

### 20.4 完成定义

一个 section 只有同时满足以下条件才可标记完成：

- 内容准确。
- 组件使用符合分层。
- 无 TypeScript 错误。
- 无控制台错误。
- 键盘可操作。
- reduced motion 可用。
- 五个规定视口无溢出。
- Playwright 截图通过。
- 不存在 AI SaaS 模板组合。
---

## 21. 指令优先级与禁止猜测

执行优先级：

1. 用户当前明确要求。
2. `AGENT.md`。
3. `DESIGN.md`。
4. `PLAN.md`。
5. 仓库现有规范。
6. Agent 自身偏好。

遇到冲突时不得默默选择。应在执行记录中说明冲突、采用的规则和原因。

以下事实不得猜测：

- 当前版本号。
- 支持平台。
- 下载地址。
- 用户数量。
- 性能提升百分比。
- 已经完成的功能。
- 公司、团队和联系方式。
- 隐私与数据处理方式。

缺失时使用明确 TODO 或静态占位，不生成看似可信的虚构内容。

---

## 22. 仓库、分支与文件管理

### 22.1 建议仓库

```text
GeoWork-Website
```

官网不直接放入 GeoWork Desktop 或 GeoFrontend2.0 仓库。

### 22.2 分支

```text
main          生产
preview/*     功能预览
feat/*        功能
fix/*         修复
content/*     内容
chore/*       工程维护
```

### 22.3 提交

使用清楚的 Conventional Commits：

```text
feat(home): add product workflow story
fix(download): handle empty GitHub releases
content(use-cases): add urban expansion case
refactor(ui): isolate radix tabs wrapper
test(header): cover mobile keyboard navigation
```

### 22.4 禁止

- 一个提交同时重写设计、依赖和全部页面。
- 直接修改 lockfile 而不说明依赖变化。
- 提交 `.env.local`、密钥、录屏原文件和未压缩大文件。
- 在 `public/` 中堆放无引用资产。

---

## 23. 推荐目录结构最终版

```text
src/
├─ app/
│  ├─ [locale]/
│  │  ├─ page.tsx
│  │  ├─ product/
│  │  ├─ workflows/
│  │  ├─ use-cases/
│  │  ├─ developers/
│  │  ├─ download/
│  │  ├─ changelog/
│  │  ├─ about/
│  │  ├─ privacy/
│  │  └─ terms/
│  ├─ api/
│  ├─ sitemap.ts
│  ├─ robots.ts
│  ├─ manifest.ts
│  ├─ not-found.tsx
│  ├─ error.tsx
│  └─ global-error.tsx
├─ components/
│  ├─ primitives/
│  ├─ ui/
│  ├─ marketing/
│  └─ content/
├─ content/
│  ├─ changelog/
│  ├─ use-cases/
│  ├─ pages/
│  └─ legal/
├─ data/
│  ├─ navigation.ts
│  ├─ releases.ts
│  ├─ site.ts
│  └─ social.ts
├─ lib/
│  ├─ analytics/
│  ├─ github/
│  ├─ i18n/
│  ├─ mdx/
│  ├─ seo/
│  ├─ validation/
│  └─ utils/
├─ styles/
│  ├─ globals.css
│  ├─ tokens.css
│  ├─ typography.css
│  ├─ layout.css
│  └─ motion.css
└─ types/

public/
├─ brand/
├─ images/
├─ video/
├─ icons/
└─ downloads/

tests/
├─ unit/
├─ e2e/
├─ visual/
└─ fixtures/
```

生产环境必须关闭 `/dev/components`。

---

## 24. Server / Client Component 规则

### 24.1 默认 Server Component

页面、内容读取、MDX、SEO、Release 数据读取默认使用 Server Component。

### 24.2 仅在必要时使用 Client Component

- Radix 交互。
- Tabs。
- Dialog。
- 移动导航。
- 视频控制器。
- 动画。
- 浏览器平台检测。

不得因为一个 hover 或简单样式把整页声明为 `use client`。

### 24.3 数据传递

Server Component 完成数据读取与校验，将最小化、可序列化的数据传入 Client Component。

### 24.4 Suspense

只有存在真实异步边界时使用。不得为了视觉效果添加无意义 Suspense 和骨架屏。

---

## 25. 数据获取、缓存与 GitHub Release

### 25.1 GitHub 数据

- 使用服务端请求。
- 使用 Zod 校验响应。
- 设置明确超时。
- 使用构建时或增量缓存。
- 处理限流、404、空列表和字段缺失。
- 永远提供静态 fallback。

### 25.2 Token

服务端变量示例：

```text
GITHUB_TOKEN=
GITHUB_OWNER=Wanfeng1028
GITHUB_REPO=GeoWork
SITE_URL=
```

任何 Token 不得暴露为 `NEXT_PUBLIC_*`。

### 25.3 Release 规范化

统一转换为内部类型，不允许组件直接依赖 GitHub 原始 JSON。

```ts
type Release = {
  version: string;
  channel: 'stable' | 'preview' | 'nightly';
  publishedAt: string;
  notesUrl: string;
  assets: ReleaseAsset[];
};
```

---

## 26. 内容与 MDX 规则

### 26.1 Frontmatter

所有 MDX 使用 Zod Schema 校验。构建遇到必填字段缺失应失败，而不是静默忽略。

### 26.2 MDX 组件白名单

只开放经过审查的组件，例如：

- Callout。
- Figure。
- CodeBlock。
- Steps。
- Comparison。
- DownloadLink。

不允许内容文件任意执行脚本或导入未知客户端组件。

### 26.3 内容安全

- 不渲染未经处理的用户 HTML。
- 外部内容进入页面前进行验证。
- Markdown 链接检查协议。
- `target="_blank"` 配置安全 rel。

---

## 27. SEO 实现规则

- 使用 Next.js Metadata API。
- 每个页面必须有独立 title 和 description。
- canonical 基于 `SITE_URL` 生成。
- 多语言页面生成 hreflang。
- OG 图片使用统一模板和真实产品媒体。
- 不在客户端动态设置关键 SEO 元数据。
- 结构化数据必须由类型化对象生成，并通过验证工具检查。

不得添加虚构的评分、评论、价格或用户数字。

---

## 28. 国际化规则

- 页面文案不得散落硬编码在 JSX 中。
- 导航、按钮、状态、错误信息进入 locale 文件。
- 案例和 Changelog 可使用各自语言 MDX。
- URL 语言策略必须全站一致。
- Locale 切换后尽量停留在对应页面。
- 日期、文件大小和数字使用 Intl API。
- 中文标点与英文空格分别检查。

---

## 29. 媒体处理规则

### 图片

- 使用 `next/image` 或可控静态优化方案。
- 明确 width / height 或 aspect-ratio。
- 设置正确 sizes。
- 只有 Hero LCP 图设置 priority。
- alt 描述内容，不写“图片”。
- 装饰图使用空 alt。

### 视频

- 提供 WebM、MP4、poster。
- muted autoplay 仅用于无声 Hero 演示。
- `playsInline`。
- 页面不可见时允许暂停。
- reduced motion 时默认显示 poster。
- Dialog 关闭后停止和重置视频。

### 大文件

Git 仓库只保留发布所需压缩资源。原始视频和设计源文件放独立资产目录或受控存储，不直接提交到官网仓库。

---

## 30. CSS 与视觉实现补充规则

- Token 只能在 `styles/tokens.css` 定义。
- 业务组件不得使用大量无语义魔法数。
- 禁止 `!important`，第三方兼容例外需注释。
- 不使用全局选择器修改 Radix 内部结构。
- CSS Modules 类名表达结构和状态，不表达颜色值。
- 使用 `data-state`、`data-side`、`aria-*` 编写 Radix 状态样式。
- 对齐优先 Grid / Flex，不使用大量绝对定位拼画面。
- Sticky section 必须有移动端非 sticky 版本。

---

## 31. 分析与隐私实现规则

- 所有埋点通过 `lib/analytics`。
- 组件不得直接 import 第三方分析 SDK。
- 事件名使用稳定命名：`download_click`、`github_click`、`video_play`。
- 事件属性不包含输入内容、文件名、精确位置和个人信息。
- 未启用分析时适配层为空实现。
- 需要同意的脚本必须在同意后加载。

---

## 32. 安全规则

- 设置 CSP 和其他安全响应头。
- 不在 HTML 中输出密钥、内部路径和构建环境。
- 不使用 `dangerouslySetInnerHTML`，结构化数据等必要场景需使用受控序列化。
- 外部 URL 必须来自允许域或经过验证。
- 下载 URL 必须使用 HTTPS 或 GitHub 官方地址。
- API Route 处理超时、方法限制和输入校验。
- 依赖新增前检查维护状态、体积、许可和必要性。

---

## 33. 测试命令与 CI 门槛

建议 scripts：

```json
{
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "typecheck": "tsc --noEmit",
  "test": "vitest run",
  "test:watch": "vitest",
  "test:e2e": "playwright test",
  "test:a11y": "playwright test tests/e2e/accessibility.spec.ts",
  "test:visual": "playwright test tests/visual",
  "check": "npm run typecheck && npm run lint && npm run test && npm run build"
}
```

若当前 Next.js 版本不再提供 `next lint`，应改用项目 ESLint 命令，并同步更新文档。

Pull Request 必须通过：

- install。
- typecheck。
- lint。
- unit test。
- build。
- Playwright 核心流程。
- 可访问性测试。
- 视觉差异人工审查。

---

## 34. 错误、空状态与回退

每个异步模块必须实现：

- 正常。
- Loading。
- Empty。
- Error。
- Offline / timeout。
- Static fallback。

错误文案应告诉用户下一步，例如：

> 暂时无法读取最新版本。你仍可前往 GitHub Releases 查看全部构建。

禁止只显示：

> Something went wrong.

---

## 35. 可访问性完整规则

- 跳转到主要内容链接。
- 语义化 landmark。
- 每页仅一个主要 H1。
- 标题层级连续。
- 所有交互可键盘操作。
- focus-visible 不可关闭。
- 色彩不是唯一状态表达。
- 视频有字幕或文字说明。
- 图表提供文本摘要。
- Dialog 与菜单焦点正确管理。
- 触控目标建议至少 44 × 44 px。
- 文本缩放 200% 不丢失内容。
- 使用 axe 之外仍需人工键盘和屏幕阅读器检查。

---

## 36. 依赖与许可规则

新增依赖前必须记录：

- 用途。
- 为什么原生能力不足。
- 客户端体积。
- 是否维护。
- 许可。
- 是否存在更轻方案。

禁止仅为一个小动画引入大型库。

项目需维护：

```text
LICENSE
THIRD_PARTY_NOTICES.md
```

---

## 37. 发布与回滚规则

- Preview 分支生成预览环境。
- main 合并后部署生产。
- 生产部署必须可回滚到上一成功版本。
- 发布前真实点击所有下载链接。
- 发布后检查首页、下载、Changelog、404、Legal。
- 数据错误时优先关闭动态模块，不影响静态内容。
- 域名或重定向变更必须验证 canonical 和 sitemap。

---

## 38. Agent 每次任务的输出格式

完成任务后必须报告：

1. 修改了什么。
2. 文件路径。
3. 关键实现决定。
4. 测试命令及结果。
5. 尚未完成或受阻内容。
6. 是否影响 DESIGN / PLAN / AGENT。
7. 需要人工确认的视觉或产品事实。

不得只回复“已完成”。

---

## 39. 最终 Definition of Done

功能只有在以下全部成立时才算完成：

- 与 DESIGN.md 一致。
- 位于正确组件层。
- 使用真实或明确占位素材。
- TypeScript、Lint、Unit、Build 通过。
- 核心 E2E 通过。
- axe 无严重问题。
- 五个视口无横向溢出。
- 键盘和 reduced motion 正常。
- Loading / Empty / Error 有处理。
- 无控制台错误。
- 无失效链接。
- 没有新增 AI SaaS 模板元素。
- 文档和测试同步更新。---

## v0.5 强制文件级开发规则

### 开始编码前的阅读顺序

```text
AGENT.md
→ DESIGN.md
→ COMPONENT-SPECS.md
→ CONTENT-ASSETS.md
→ DEVELOPMENT.md
→ FILE-MAP.md
→ PLAN.md
→ 当前代码与 Git 状态
```

不得只读 `PLAN.md` 就生成页面，也不得只看截图自行发明目录和组件。

### 修改说明必须精确到文件

每次实施前必须说明：

```text
创建：src/components/marketing/hero/Hero.tsx
创建：src/components/marketing/hero/Hero.module.css
修改：src/app/(marketing)/page.tsx
不修改：下载页、GitHub Release 数据层
```

完成后必须说明：

```text
文件：src/components/marketing/hero/Hero.tsx
改动：完成左文案、右产品媒体的 5:7 Hero 结构
验证：390 / 768 / 1280 / 1440 / 1920 五个视口截图通过
```

### 禁止用占位代码冒充完成

以下内容不算完成：

- `TODO` 后直接通过验收。
- 只有空 `<section>`。
- 用渐变矩形替代产品截图，却没有登记素材缺口。
- 用假的 GitHub Release 数据，却没有显式 `fallback` 标记。
- 组件只有桌面端，没有移动端状态。
- 只写 JSX，不写对应 CSS Module、测试和可访问性状态。

### 组件完成的最小文件集

营销组件通常至少包含：

```text
Component.tsx
Component.module.css
Component.test.tsx（有交互时必须）
对应 Playwright 页面测试或视觉截图
```

Radix primitive 通常至少包含：

```text
primitive.tsx
primitive.module.css
primitive.test.tsx
```
