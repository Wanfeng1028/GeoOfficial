# GeoWork Website — DESIGN.md

> 文档版本：v0.5  
> 日期：2026-07-14  
> 项目：GeoWork 官网  
> 建议仓库名：`GeoWork-Website`  
> 文档用途：确定官网的品牌方向、信息架构、视觉系统、交互原则、页面结构与实现边界。

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

## 1. 项目背景

GeoWork 是面向 GIS、遥感、地理空间分析、科研与自动化工作流的本地优先桌面工作台。AI 与 Agent 是产品能力的一部分，但不是官网的视觉主题，也不应成为品牌的唯一身份。

当前产品仓库：

- GeoWork：https://github.com/Wanfeng1028/GeoWork
- GeoFrontend2.0：https://github.com/Wanfeng1028/GeoFrontend2.0

参考产品仓库：

- OpenGIS：https://github.com/Wanfeng1028/OpenGIS
- GeoCode-Release：https://github.com/Wanfeng1028/GeoCode-Release

GeoWork 当前公开能力包括：

- 自然语言驱动 GIS / 遥感任务
- QGIS、GDAL 与 Python 工作流
- Google Earth Engine 工作流
- 论文阅读、研究总结与报告生成
- 工作流自动化与任务调度
- 模型路由、MCP、Skills 与插件生态
- Electron + React + TypeScript 桌面层
- Go Runtime 核心层
- Python FastAPI 地理空间 Worker

官网不是 GeoFrontend2.0 的网页版本，也不是把桌面软件界面直接搬到浏览器中。官网必须作为一个独立品牌产品存在，用更精炼的视觉语言解释 GeoWork 是什么、能解决什么问题、为什么值得下载和参与。

---

## 2. 官网目标

### 2.1 第一目标

访问者在 10 秒内理解：

> GeoWork 不是聊天机器人，也不是套着地图外观的 AI 页面，而是一套把地图、遥感、代码、研究与自动化放在同一处的专业地理空间桌面工作台。

### 2.2 第二目标

让访问者完成至少一个关键动作：

1. 下载 GeoWork
2. 查看 GitHub
3. 阅读文档
4. 查看产品演示
5. 了解开发状态与路线图

### 2.3 第三目标

建立区别于传统 GIS 软件官网的品牌形象：

- 不做“地球 + 蓝色科技线 + 粒子背景”的传统 GIS 科技站
- 不做紫蓝渐变的通用 AI SaaS 模板
- 不做 Ant Design 中后台页面
- 不把全部能力压缩成小图标和九宫格卡片
- 不夸大尚未完成的生产能力

---

## 3. 对标网站清单

本次设计重点研究以下八个网站：

1. Raycast — https://www.raycast.com/
2. Linear — https://linear.app/
3. Warp — https://www.warp.dev/
4. Attio — https://attio.com/
5. Screen Studio — https://screen.studio/
6. Craft — https://www.craft.do/
7. Arc — https://arc.net/
8. Superlist — https://www.superlist.com/

---

## 4. 对标网站分析

### 4.1 Raycast

#### 技术栈

- 可确认营销站使用 Next.js / React：公开资源路径存在 `/_next/`。
- Raycast 产品本身采用 TypeScript、Swift、C#、Rust、Node 和 React 的混合架构，但这不等同于官网完整技术栈。
- 官网具体样式方案和动画库未公开，不应凭外观断言使用 Tailwind、Framer Motion 或 GSAP。

#### 样式

- 深色背景为主，带低饱和紫红、蓝色和暖色光晕。
- 产品窗口是主视觉，不依赖大面积装饰插画。
- 标题大、短、强，正文控制在两到三行。
- 卡片具有明显层级，但边框和阴影很克制。
- 视觉气质：高端桌面工具、快捷、精致、带一点未来感。

#### 交互

- 导航吸顶，主 CTA 始终清晰。
- 产品窗口和功能模块具有轻量进入动画。
- 扩展生态通过横向流动、图标阵列和真实插件内容建立丰富度。
- 动效主要服务于“速度”“搜索”“快捷调用”，而非纯装饰。

#### 页面内容

- 核心产品定位
- AI 能力
- 命令与快捷操作
- 扩展商店
- Pro / Teams
- 下载与平台支持

#### 布局

- 深色 Hero + 大产品窗口
- 能力章节穿插产品 UI
- 生态内容逐步放大
- 末尾下载 CTA

#### GeoWork 借鉴

- 深色 Hero 氛围
- 大尺寸桌面软件窗口
- Skills / MCP / 插件生态的展示方法
- 下载按钮和平台状态

#### 不照搬

- 不使用 Raycast 的紫红品牌色
- 不复制它的快捷启动器叙事
- 不让光晕覆盖全部页面

---

### 4.2 Linear

#### 技术栈

- Linear 官方文章明确提到其营销网站基于 Next.js。
- Linear 官方招聘信息说明其系统端到端使用 TypeScript，核心前端技术包括 React 与 TypeScript。
- 官网具体动画库未公开。

#### 样式

- 黑、灰、白为主，彩色仅作为状态和产品内容。
- 极强的栅格、细线、编号和图注系统。
- 产品界面被重新编排成官网视觉，而不是简单截图。
- 文字排版具有编辑设计与技术文档感。
- 页面密度高，但利用间距和层级保持秩序。

#### 交互

- 滚动过程中产品状态逐渐变化。
- 大量微交互通过产品 UI 自身完成。
- 标签页、流程状态、问题卡片和 Agent 活动形成“正在运行”的感觉。
- 不依赖夸张的 3D 或粒子特效。

#### 页面内容

- 产品定位
- 人与 Agent 协作
- Intake、Plan、Build 等工作流程
- 客户证明
- 产品方法论
- 下载与注册入口

#### 布局

- 超大 Hero 产品组合图
- 三个价值原则
- 按工作流分段的长页面
- 多处细线网格与 FIG 编号
- 尾部强 CTA

#### GeoWork 借鉴

- 信息架构和页面秩序
- “FIG 0.x”式技术图注
- 将复杂软件 UI 重新编排为可读的叙事画面
- 将 GeoWork 流程拆分为 Intent、Plan、Execute、Deliver

#### 不照搬

- 不做完整黑白复制
- 不用过度密集的小字号
- 不把 GeoWork 讲成项目管理软件

---

### 4.3 Warp

#### 技术栈

- 公开营销资源存在 `/_next/`，可确认使用 Next.js / React。
- Warp 官方文档站使用 Astro + Starlight，内容以 MDX 管理；这说明产品营销站和文档站可以采用不同技术方案。
- 官网具体动画库与 CSS 方案未公开。

#### 样式

- 深色、高对比、偏开发者工具。
- 产品窗口、终端内容和工作流图是核心视觉。
- 蓝紫光晕存在，但受控于局部容器。
- 产品模块分区明确，下载区域非常完整。

#### 交互

- Tab 切换产品能力
- 终端演示和 Agent 执行流程
- 本地到云端的过程可视化
- 下载区域按平台与架构切换

#### 页面内容

- Terminal
- Agent
- Cloud / orchestration
- 团队与企业
- 开源信息
- 多平台下载

#### 布局

- 产品平台总览
- 多产品 Tab
- 开源公告
- 客户评价
- 多平台下载矩阵

#### GeoWork 借鉴

- Work / Code / Map 模式切换
- 本地 Runtime、Python Worker、QGIS、GEE 的架构表达
- Windows / macOS 下载区
- 开源与社区章节

#### 不照搬

- 不把官网做成纯开发者终端风
- 不使用过多代码终端画面取代地图成果

---

### 4.4 Attio

#### 技术栈

- 公开资源路径存在 `/_next/`，可确认使用 Next.js / React。
- 官网具体样式系统与动画库未公开。

#### 样式

- 明亮、极简、精致，产品数据本身形成视觉。
- 大量白色和极浅灰色表面，配细边框。
- 产品卡片像真实系统中的独立对象，排列有空间感。
- 动画和内容围绕“系统自动理解并工作”。

#### 交互

- 信息卡片和关系对象逐层进入。
- 页面中的产品数据会变化或重组。
- 交互重点是让复杂系统显得自动、连贯且可理解。

#### 页面内容

- 自动构建系统
- Context
- Agent / Workflows
- 数据、记录、沟通与自动化
- 注册 CTA

#### 布局

- Hero 产品工作区
- 自动构建叙事
- 大标题 + 真实数据模块
- 多个连续的产品状态

#### GeoWork 借鉴

- 让任务、图层、工具、结果像真实对象一样进入画面
- 浅色内容章节
- 复杂工作流的轻量表达

#### 不照搬

- 不使用 CRM 记录卡片逻辑
- 不让官网变成白色后台面板集合

---

### 4.5 Screen Studio

#### 技术栈

- 未找到官方公开的营销站框架说明。
- 不对其前端框架和动画库作确定性判断。
- 对 GeoWork 有价值的是其媒体策略，而不是照搬技术栈。

#### 样式

- Apple 式产品表达：文案少、产品演示大、圆角和阴影精致。
- 背景较明亮，产品视频是页面视觉中心。
- 每一屏通常只讲一个能力。

#### 交互

- 自动播放但可暂停的视频
- 产品镜头自动缩放
- 功能和演示严格同步
- 操作结果比抽象图形更重要

#### 页面内容

- 核心产品定位
- 使用品牌证明
- 产品演示作品
- 自动缩放、光标、录制、导出等能力
- 用户评价
- 下载与定价

#### 布局

- Hero + 演示视频
- 一项能力一个大章节
- 大媒体、小文字
- 用户评价和下载收尾

#### GeoWork 借鉴

- 10–20 秒无声循环产品演示
- 重点展示任务从输入到成果的完整过程
- 截图和视频必须经过官网专门裁切与包装

#### 不照搬

- 不让整站只剩视频
- 不过度使用 macOS 风格窗口控制点

---

### 4.6 Craft

#### 技术栈

- 公开资源路径存在 `/_next/`，可确认使用 Next.js / React。
- 官网具体动画和样式库未公开。

#### 样式

- 暖白、纸张纹理、生活方式与编辑设计结合。
- 产品内容、用户身份和使用情境比技术参数更重要。
- 有较强的人文感，降低复杂产品的学习压力。

#### 交互

- 内容切换和作品展示
- 轻量轮播、标签与展开
- 产品示例跟随不同人群变化

#### 页面内容

- 用户身份与场景
- 写作、任务、日历、白板
- MCP 与连接生态
- 社区模板
- 奖项、价格、下载

#### 布局

- 用户场景条带
- 大章节故事
- 内容示例与评价穿插
- 社区和生态放在后半段

#### GeoWork 借鉴

- 教师、学生、科研人员、GIS 工程师的场景表达
- 地图、报告、代码、论文成果展示
- 适度的暖色和人文气质

#### 不照搬

- 不使用纸张纹理作为全站核心
- 不把 GeoWork 弱化成笔记工具

---

### 4.7 Arc

#### 技术栈

- 当前官网未公开完整技术栈。
- 不对具体框架和动画库作确定性判断。

#### 样式

- 品牌表达大胆，但文案非常直接。
- 大标题、产品画面、个性化色彩和场景结合。
- 页面强调体验感，而非参数表。

#### 交互

- 大型产品展示
- 场景切换
- 下载入口明显
- 页面文案带有强烈品牌语气

#### 页面内容

- 产品主张
- 下载
- AI 能力
- 移动端与特定人群
- 品牌故事

#### GeoWork 借鉴

- 更有记忆点的品牌文案
- 将“地理工作”讲成一种新的工作方式

#### 不照搬

- 不使用过度跳跃的彩色视觉
- 不采用强烈娱乐化语气

---

### 4.8 Superlist

#### 技术栈

- 当前官网未找到官方公开的完整技术栈。
- 不对具体框架和动画库作确定性判断。

#### 样式

- 黑白、红色与产品彩色内容形成强对比。
- 大标题、模块化画面和丰富动画结合。
- 比 Linear 更活泼，比 Craft 更有任务工具感。

#### 交互

- 产品模块在滚动中组合和切换
- 任务、笔记、日历等内容形成连续故事
- 适量使用横向滚动、卡片变换和大面积图形

#### 页面内容

- 核心定位
- AI 自动整理
- 工作与生活场景
- 功能集合
- 多设备体验
- 用户评价和 CTA

#### GeoWork 借鉴

- 使用场景组合
- 让复杂功能显得轻松、可接近
- 适度活泼的产品动画

#### 不照搬

- 不使用大面积红色
- 不做过多弹跳和高频动画

---

## 5. 结论：GeoWork 官网设计方向

最终采用以下融合方案：

> Raycast 的桌面软件质感与克制暗色  
> + Linear 的信息秩序、栅格与产品叙事  
> + Warp 的模式切换、技术信息与下载区  
> + Attio 的明亮对象展示与清晰流程  
> + Screen Studio 的大型真实产品媒体  
> + Craft 的温度、留白与使用场景  
> + Superlist 的少量节奏感，但不采用高饱和视觉

核心判断：

> **AI 是 GeoWork 的能力，不是官网的视觉主题。**

官网首先要像一款成熟、专业、有明确对象的地理空间桌面软件；只有在用户继续阅读产品能力时，才逐步说明自动规划、模型调用和 Agent 执行。

设计代号：

# GeoWork Product Editorial

中文内部名称：

# 「地理工作，清晰呈现」

---

## 6. 品牌定位与核心文案

### 6.1 产品类别

首选：

> Geospatial desktop workspace

中文：

> 面向 GIS、遥感、空间分析与科研的桌面工作台

可在产品能力页或技术页补充：

> AI-assisted workflows and tool orchestration

但首页首屏不以“AI workspace”“Agent platform”或“智能体平台”作为类别标签。

避免只写：

- GIS AI 助手
- 遥感聊天机器人
- AI 地图软件
- Agentic geospatial platform

这些描述会缩小 GeoWork 的产品边界，并让官网落入通用 AI SaaS 模板。

### 6.2 Hero 主标题候选

首选英文：

> Geospatial work, reimagined.

首选中文：

> 重新想象地理空间工作。

备选英文：

> From intent to spatial insight.

备选中文：

> 从一个目标，到完整的空间洞察。

### 6.3 Hero 副标题

首选英文：

> GeoWork brings mapping, remote sensing, code, research and automation into one desktop workspace.

首选中文：

> GeoWork 把地图、遥感、代码、科研与自动化放进同一个桌面工作台。

第二层能力说明可在 Hero 下方或产品页出现：

> Describe a goal, connect the tools you already use, and move from data to a result in one continuous workflow.

中文：

> 描述目标，连接已有工具，在同一条工作流中完成数据处理、分析与成果交付。

首屏副标题不得连续堆叠 `AI`、`Agent`、`智能`、`自动执行` 等词。

### 6.4 CTA

主按钮：

- 下载 GeoWork
- Download for Windows

次按钮：

- 查看 GitHub
- Watch the demo

开发阶段需增加状态说明：

> Developer Preview · v0.4.x-dev

状态说明放在下载区、版本信息或页脚，不默认做成首屏顶部整行公告，也不与主标题争抢注意力。

禁止把开发版描述为稳定生产版本。

### 6.5 AI 能力的内容层级

AI / Agent 的表达遵循以下层级：

1. **品牌层**：GeoWork 是地理空间桌面工作台，不以 AI 命名品牌类别。
2. **产品层**：重点解释地图、遥感、代码、研究、工作流和成果。
3. **能力层**：再说明任务规划、模型调用、工具编排、Skills 和 MCP。
4. **技术层**：在架构页说明 Agent Runtime、模型提供商与执行机制。

首页前两屏最多出现一次 `AI`，且不能出现在装饰性胶囊标签、发光徽标或重复状态文案中。

---

## 7. 视觉方向

### 7.1 总体模式

采用“静默深色开场、明亮产品解释、真实案例、克制技术章节、浅色收尾”的节奏：

1. Neutral Dark Hero
2. Light Product Story
3. Light Use Cases
4. Neutral Dark Architecture / Ecosystem
5. Light Final CTA

深色章节使用接近中性的黑灰，不使用 Aurora、霓虹、彩色雾化光斑或大面积渐变。页面的色彩主要来自真实产品界面、地图成果和内容素材，而不是背景特效。

页面不能全黑，也不能全白。

### 7.2 基础颜色

```css
:root {
  --bg-dark: #090a0c;
  --bg-dark-elevated: #111317;
  --bg-light: #f6f6f3;
  --bg-white: #ffffff;

  --text-dark-primary: #f7f8f8;
  --text-dark-secondary: #9da3aa;
  --text-light-primary: #101214;
  --text-light-secondary: #686d73;

  --border-dark: rgba(255, 255, 255, 0.10);
  --border-light: rgba(16, 18, 20, 0.11);

  --accent-primary: #2fbf83;
  --accent-primary-strong: #1f9f6a;
  --accent-blue: #5f86b8;
  --accent-sand: #b89d63;
}
```

GeoWork 现有品牌中的地理青、信号蓝和沙金可以保留，但必须降低使用面积。

### 7.3 色彩比例

- 55% 暖白 / 白色
- 35% 深黑 / 深灰
- 8% 地理青与蓝
- 2% 沙金及状态色

### 7.4 禁止色彩方向

- 大面积绿色渐变
- 紫蓝 AI 模板渐变
- 深海军蓝铺满全站
- 霓虹描边
- 彩虹光晕
- 标题渐变字
- 产品窗口外的发光描边
- 以状态绿代替品牌设计

### 7.5 去除“AI 模板感”的视觉硬约束

以下组合一旦同时出现，即视为设计失败，必须返工：

- 居中超大标题 + 胶囊 Eyebrow + 两个胶囊 CTA
- 黑色背景 + 蓝绿或紫色光晕 + 发光产品窗口
- 假聊天记录 + `Agent running` + 自动打勾步骤
- 浮动卡片、玻璃拟态、细网格和粒子背景同时出现
- 每个章节都用圆角卡片承载内容
- 以“智能、Agent、AI-powered、reimagine the future”等抽象词代替具体产品说明

必须采用：

- 清晰的编辑式排版或非对称栅格
- 真实 GeoWork 截图、录屏、地图、图表和报告
- 普通矩形或小圆角按钮，胶囊只用于极少数状态或筛选
- 无渐变或单色标题
- 静态、稳定、可读的背景
- 通过内容尺度、留白、摄影式裁切和产品细节建立高级感

设计检查问题：

1. 隐去 Logo 后，页面是否仍像任何一个通用 AI SaaS 模板？
2. 删除所有光晕后，构图和排版是否仍然成立？
3. 不出现 `AI` 和 `Agent` 时，用户能否理解 GeoWork 做什么？
4. 页面是否展示了真实地理成果，而不只是聊天和任务状态？
5. 每一屏是否有一个明确对象，而不是一组抽象能力词？

---

## 8. 字体与排版

### 8.1 字体

英文与数字：

- Geist Sans 或 Inter

中文：

- `PingFang SC`
- `Microsoft YaHei`
- `Noto Sans SC`
- 系统无衬线回退

代码：

- Geist Mono
- JetBrains Mono
- `ui-monospace`

### 8.2 字号建议

```text
Hero H1: 72–112 px desktop / 48–64 px mobile
Section H2: 48–72 px desktop / 36–48 px mobile
Section lead: 20–26 px
Body: 16–18 px
Caption: 12–14 px
Navigation: 14 px
```

### 8.3 排版规则

- 标题每行尽量不超过 12 个中文字符或 8 个英文单词。
- 正文宽度限制在 560–720 px。
- 每一屏只表达一个主概念。
- 避免大段居中文字，Hero 之后以左对齐为主。
- 使用 FIG 编号、状态标签和小标题建立 Linear 式秩序。

---

## 9. 栅格、间距与圆角

### 9.1 页面宽度

```text
最大内容宽度：1280 px
常规内容宽度：1120 px
文字内容宽度：720 px
页面左右留白：24 / 40 / 64 px 自适应
```

### 9.2 栅格

- 12 列桌面栅格
- 6 列平板栅格
- 4 列移动端栅格

### 9.3 间距

基础间距单位：4 px

常用：

- 8 px
- 12 px
- 16 px
- 24 px
- 32 px
- 48 px
- 64 px
- 96 px
- 128 px

### 9.4 圆角

```text
小控件：8–10 px
按钮：10–12 px 或胶囊形
产品窗口：16–20 px
大型媒体容器：24–32 px
```

不允许所有元素都使用相同的大圆角。

---

## 10. 首页最终结构

Developer Preview 不设置为默认全宽公告条。版本状态放在下载区、Release 信息或页脚；只有出现安全更新、重大版本或服务中断时，才临时启用公告。

### Section 1 — Navigation

左侧：

- GeoWork Logo + Wordmark

中间：

- Product
- Capabilities
- Use Cases
- Docs
- Changelog

右侧：

- GitHub
- Download

行为：

- 首屏透明
- 滚动后增加模糊背景和细边框
- 移动端改为抽屉菜单

### Section 2 — Hero

内容：

- GeoWork Wordmark 或一句极短的产品类别说明
- H1：重新想象地理空间工作。
- 一段具体副标题
- Download / Explore GeoWork CTA

默认不使用：

- 胶囊 Eyebrow
- `AI workspace for geospatial work`
- Developer Preview 顶部公告
- GitHub 作为首要视觉按钮
- 标题渐变或发光描边

视觉：

- 中性深色或暖白背景，二选一，不叠加彩色光晕
- 推荐使用非对称编辑式布局：左侧文案，右侧产品媒体；或上方标题，下方全宽真实产品视频
- 产品画面使用最新 GeoFrontend2.0 截图或录屏，不制作假的 Agent 面板
- 产品画面边框、阴影和圆角保持接近真实桌面软件，不使用发光外框

演示脚本：

1. 打开一个真实地理项目或数据目录
2. 选择或描述需要完成的分析任务
3. GeoWork 在 Work / Code / Map 之间保持同一项目上下文
4. 地图、脚本、图表或报告逐步形成
5. 用户查看、修改并导出成果

演示重点是“工作连续性”和“成果”，不是聊天气泡、自动打勾和 `Agent running` 状态。

### Section 3 — Product Principles

Linear 式三原则：

- FIG 0.1 — Built for geospatial work
- FIG 0.2 — Real tools, working together
- FIG 0.3 — Outputs you can keep and verify

每项使用大标题、短说明和一个局部产品画面。

### Section 4 — From Intent to Deliverable

标题：

> 从一个目标，到完整成果。

四阶段：

1. Intent — 描述目标、数据和范围
2. Plan — GeoWork 组织步骤、数据与工具
3. Execute — 调用 QGIS、GEE、Python 与 Skills
4. Deliver — 输出地图、数据、代码、图表与报告

布局：

- 左侧 sticky 阶段标题
- 右侧产品窗口随滚动变化
- 不做强制滚动劫持
- 使用 IntersectionObserver / Motion 驱动状态切换

### Section 5 — Work / Code / Map

Warp 式 Tab 切换：

- Work：对话与任务执行
- Code：脚本、终端、日志与调试
- Map：图层、地图、成果与导出

要求：

- 三个 Tab 使用同一个产品框架，内容切换
- 不加载三个独立大视频
- 默认自动播放一次，用户交互后停止自动切换

### Section 6 — Real Geospatial Work

Craft / Screen Studio 式大案例：

1. 城市扩张分析
2. NDVI 时间序列
3. 洪涝范围识别
4. DEM 地形分析
5. 遥感分类
6. 论文阅读与报告生成

每个案例包含：

- 一句任务
- 一张成果图
- 使用的工具
- 输出类型
- 查看详情

禁止做成六个等大的普通卡片。使用 2–3 个重点案例 + 次级案例列表。

### Section 7 — Local-first Architecture

深色技术章节：

> Your data. Your tools. Your workflow.

展示：

```text
GeoWork Desktop
├── React / TypeScript UI
├── Go Runtime
├── Python Geo Worker
├── QGIS / GDAL
├── Google Earth Engine
├── MCP / Skills / Plugins
└── Model Providers
```

表现形式：

- 细网格
- 节点连接
- 静态连接关系或用户触发的轻量状态变化
- 不使用发光脉冲
- 不使用 3D 地球
- 不使用粒子网络

### Section 8 — Skills & Ecosystem

借鉴 Raycast 扩展商店和 Craft MCP 生态：

- Official Skills
- GIS tools
- Remote sensing workflows
- Research workflows
- MCP servers
- Community plugins

使用横向滑动或可拖动轨道，但需支持键盘操作和 reduced motion。

### Section 9 — Open Development

说明：

- 当前开发阶段
- GitHub 仓库
- License
- Roadmap
- 参与贡献方式

必须透明表达开发状态，不使用虚假的企业客户 Logo 和不存在的用户数据。

### Section 10 — Download

Warp 式下载区：

- Windows x64
- Windows ARM64（仅在真实可用后显示）
- macOS Apple Silicon（仅在真实可用后显示）
- macOS Intel（仅在真实可用后显示）

自动检测平台只能作为默认推荐，必须允许手动选择。

开发版下载需显示：

- 版本号
- 发布时间
- 文件大小
- 校验值入口
- Release notes
- 系统要求

### Section 11 — Footer

分组：

- Product
- Resources
- Community
- Legal

保留 GitHub、文档、版本、License 和开发状态。

---

## 11. 页面信息架构

### V1 必做

```text
/
/product
/use-cases
/download
/changelog
/about
```

### 外部链接

```text
GitHub -> GeoWork repository
Docs -> 第一阶段可链接 GitHub docs 或独立文档站
```

### V1.1

```text
/docs
/docs/getting-started
/docs/concepts
/docs/integrations
/docs/skills
/docs/development
```

### 后续

```text
/blog
/community
/skills
/roadmap
```

---

## 12. 技术栈与组件体系决定

### 12.1 固定技术栈

```text
Next.js App Router
React
TypeScript strict
CSS Modules
CSS Custom Properties
Motion for React
MDX
```

### 12.2 固定交互与内容依赖

```text
Radix UI Primitives
@phosphor-icons/react
Shiki
Zod
clsx
```

### 12.3 固定测试依赖

```text
Vitest
React Testing Library
Playwright
@axe-core/playwright
```

### 12.4 可选依赖

```text
Embla Carousel：仅真实案例轨道需要时
next-intl：启用中英文路由时
```

### 12.5 不使用

```text
Ant Design
Element Plus
Material UI
Chakra UI
Mantine
Bootstrap
Tailwind CSS
shadcn/ui CLI 与整套默认视觉
Three.js / Cesium / MapLibre 作为首屏依赖
Lottie 动画包
GSAP
全局平滑滚动和滚动劫持库
Landing Page 区块模板
```

### 12.6 组件体系原则

- Radix UI 只负责行为、键盘操作和无障碍。
- CSS Modules 与 Token 负责视觉。
- Hero、ProductStage、WorkflowStory、UseCaseStory 等品牌组件全部自定义。
- 不安装整套 shadcn/ui，不继承其 Tailwind 默认主题。
- V1 使用 CSS sticky 与 Motion 完成滚动叙事，不引入 GSAP。

### 12.7 为什么不用 GeoFrontend2.0 的 Ant Design

GeoFrontend2.0 是复杂产品工作台，适合表单、菜单、设置、数据表和地图操作。官网是品牌叙事和产品展示，需要自定义排版、大媒体、克制品牌组件与更小运行体积。两者只共享品牌 Token、Logo 和产品素材，不共享 UI 组件库。

---

## 13. 推荐目录结构

```text
GeoWork-Website/
├── src/
│   ├── app/
│   │   ├── (marketing)/
│   │   │   ├── page.tsx
│   │   │   ├── product/page.tsx
│   │   │   ├── use-cases/page.tsx
│   │   │   ├── download/page.tsx
│   │   │   ├── changelog/page.tsx
│   │   │   └── about/page.tsx
│   │   ├── dev/components/page.tsx
│   │   ├── layout.tsx
│   │   ├── globals.css
│   │   ├── sitemap.ts
│   │   └── robots.ts
│   ├── components/
│   │   ├── primitives/
│   │   ├── ui/
│   │   ├── marketing/
│   │   └── content/
│   ├── content/
│   │   ├── changelog/
│   │   ├── use-cases/
│   │   └── pages/
│   ├── lib/
│   │   ├── content/
│   │   ├── github/
│   │   ├── motion/
│   │   ├── validation/
│   │   └── seo/
│   └── styles/
│       ├── tokens.css
│       ├── typography.css
│       ├── layout.css
│       └── motion.css
├── public/
│   ├── brand/
│   ├── screenshots/
│   ├── videos/
│   ├── use-cases/
│   └── og/
├── tests/
│   ├── unit/
│   ├── e2e/
│   └── visual/
├── AGENT.md
├── DESIGN.md
└── PLAN.md
```

---

## 14. 组件边界

### 基础组件

- `Container`
- `Section`
- `ButtonLink`
- `Eyebrow`
- `SectionHeading`
- `MediaFrame`
- `ProductWindow`
- `StatusBadge`
- `Tabs`

基础组件只封装可复用结构，不建立庞大的 UI 组件库。

### 业务组件

- `HeroProductDemo`
- `IntentWorkflowStory`
- `WorkCodeMapDemo`
- `UseCaseFeature`
- `ArchitectureDiagram`
- `SkillsRail`
- `ReleaseDownloadPanel`

---

## 15. 产品素材规范

### 15.1 截图

- 必须使用 GeoFrontend2.0 最新界面
- 不直接截全屏后原样放入
- 根据官网章节裁切为单一叙事
- 隐去真实 API Key、路径、账号与私人信息
- 使用统一虚构项目数据

### 15.2 视频

Hero 视频：

- 12–18 秒
- 1920 × 1080 或更高
- WebM + MP4 双格式
- 无声循环
- 首帧提供 poster
- 体积目标小于 6 MB
- 用户开启 reduced motion 时展示静态 poster

详情视频：

- 可播放 / 暂停
- 不自动播放声音
- 提供字幕或文字说明

### 15.3 地图成果

- 每张图必须标明任务、数据来源、时间范围和输出类型
- 不使用无法解释的随机地图
- 演示数据可使用公开数据或明确标注为模拟数据

---

## 16. 动效规范

### 16.1 原则

- 动效必须解释状态变化
- 动效速度要快于用户注意力转移
- 不影响阅读和操作
- 支持 `prefers-reduced-motion`

### 16.2 时长

```text
Hover: 120–180 ms
按钮 / 小控件: 160–220 ms
内容进入: 280–420 ms
大型产品状态切换: 450–700 ms
```

### 16.3 允许

- 轻微淡入和位移
- 产品窗口内容切换
- Tab 状态切换
- 架构节点状态脉冲
- 横向生态轨道
- 导航背景变化

### 16.4 禁止

- 粒子背景
- 鼠标跟随大光球
- 无意义视差
- 页面整体倾斜
- 无限弹跳卡片
- 滚动劫持
- 强制横向滚动整页
- 大量文字逐字动画

---

## 17. 响应式规则

### Desktop ≥ 1200

- 完整产品窗口和 sticky 叙事
- 12 列栅格

### Tablet 768–1199

- 产品窗口适当裁切
- sticky 章节缩短
- 复杂架构图改为两层

### Mobile < 768

- Hero 左对齐
- 产品演示使用竖向裁切或静态关键帧
- 四阶段工作流改为普通垂直列表
- 生态横向轨道可手动滑动
- 下载 CTA 固定清晰，但不使用永久底栏遮挡内容

禁止仅把桌面版按比例缩小。

---

## 18. 可访问性

必须满足：

- 文本对比度符合 WCAG AA
- 所有按钮和链接可键盘访问
- 可见焦点样式
- Tab 具有正确 ARIA 语义
- 视频有暂停能力
- 动画支持 reduced motion
- 图片有准确 alt
- 不以颜色作为唯一状态表达
- 触控目标至少 44 × 44 px

---

## 19. 性能目标

目标：

```text
LCP < 2.5 s
CLS < 0.1
INP < 200 ms
首页初始 JS 尽量 < 170 KB gzip
Hero 视频不阻塞首屏文本与 CTA
```

策略：

- 服务端渲染静态内容
- 视频延迟加载，poster 优先
- 产品 Demo 按 section 动态加载
- 使用 AVIF / WebP
- 避免在首屏引入地图引擎
- 不在官网加载 MapLibre、deck.gl、Cesium
- 非首屏内容使用 `content-visibility`

---

## 20. SEO 与内容

首页必须具备：

- 唯一 H1
- Title 与 description
- Open Graph 图片
- SoftwareApplication 结构化数据
- 清晰 canonical
- sitemap 与 robots

推荐标题：

> GeoWork — AI Workspace for Geospatial Work

推荐中文描述：

> GeoWork 是面向 GIS、遥感、科研与空间分析的本地优先 AI 工作台，可连接 QGIS、GDAL、Python、Google Earth Engine、Skills 与 MCP 工作流。

---

## 21. 验收标准

设计验收：

- 第一眼不像传统 GIS 科技大屏
- 第一眼不像 Ant Design 后台
- 第一眼能看出是成熟桌面软件官网
- 10 秒内理解“目标 → Agent → 工具 → 成果”
- 产品截图与网页视觉融合，而不是孤立图片
- 深浅章节节奏清晰
- 不复制任一对标网站的品牌资产

功能验收：

- Header、CTA、Tab、视频控制、下载选择均可用
- 所有页面支持移动端
- reduced motion 可用
- 下载信息来自真实 Release 或明确的占位数据
- 所有外部链接正确
- 无虚假客户、虚假数字或未实现承诺

工程验收：

- TypeScript 严格模式
- ESLint / format / typecheck / build 全部通过
- Lighthouse Performance、Accessibility、SEO 均达到合理水平
- 无控制台报错
- 无大体积未使用依赖

---

## 22. 研究来源

- Raycast：https://www.raycast.com/
- Raycast 技术文章：https://www.raycast.com/blog/a-technical-deep-dive-into-the-new-raycast
- Linear：https://linear.app/
- Linear 营销站说明：https://linear.app/now/startups-write-changelogs
- Linear Careers：https://linear.app/careers/
- Warp：https://www.warp.dev/
- Warp Docs repo：https://github.com/warpdotdev/docs
- Attio：https://attio.com/
- Screen Studio：https://screen.studio/
- Craft：https://www.craft.do/
- Arc：https://arc.net/
- Superlist：https://www.superlist.com/
- GeoWork：https://github.com/Wanfeng1028/GeoWork
- GeoFrontend2.0：https://github.com/Wanfeng1028/GeoFrontend2.0
- OpenGIS：https://github.com/Wanfeng1028/OpenGIS
- GeoCode-Release：https://github.com/Wanfeng1028/GeoCode-Release

---

## 23. 组件库与设计系统详细规范

### 23.1 为什么使用 Radix UI

官网要达到 Raycast、Linear、Attio 一类网站的精细度，不能让组件库决定视觉。Radix UI 提供的是未设定外观的交互原语，适合建立 GeoWork 自己的组件体系。

V1 使用以下包：

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

按需增加，不允许一次安装 Radix 全家桶。

### 23.2 组件与库的职责映射

| 官网功能 | 实现方案 | 视觉归属 |
|---|---|---|
| 桌面导航 | 自定义 `SiteHeader` + Radix Navigation Menu | GeoWork |
| 移动导航 | Radix Dialog 封装 `MobileMenu` | GeoWork |
| Work / Code / Map | Radix Tabs | GeoWork |
| 下载平台选择 | Radix Dropdown Menu | GeoWork |
| 产品视频大图查看 | Radix Dialog | GeoWork |
| 图标说明 | Radix Tooltip | GeoWork |
| FAQ / 系统要求 | Radix Accordion | GeoWork |
| 版本详情 | Radix Popover 或 Dialog | GeoWork |
| 案例横向轨道 | Embla Carousel，可选 | GeoWork |
| 代码示例 | Shiki | GeoWork |
| 动画进入与状态切换 | Motion for React | GeoWork |

Radix 默认结构只能作为交互基础。禁止保留默认示例中的圆角、阴影、字体、颜色和页面布局。

### 23.3 组件分层

```text
src/components/
├─ primitives/              # Radix 的薄封装，仅处理交互与无障碍
│  ├─ accordion/
│  ├─ dialog/
│  ├─ dropdown-menu/
│  ├─ navigation-menu/
│  ├─ popover/
│  ├─ tabs/
│  └─ tooltip/
├─ ui/                      # GeoWork 基础设计系统
│  ├─ button/
│  ├─ container/
│  ├─ figure/
│  ├─ icon/
│  ├─ logo/
│  ├─ media-frame/
│  ├─ section/
│  ├─ section-heading/
│  ├─ text-link/
│  └─ video-player/
├─ marketing/               # 官网品牌组件，必须自定义
│  ├─ site-header/
│  ├─ hero/
│  ├─ product-stage/
│  ├─ workflow-story/
│  ├─ mode-showcase/
│  ├─ use-case-story/
│  ├─ architecture-diagram/
│  ├─ ecosystem-showcase/
│  ├─ download-panel/
│  └─ site-footer/
└─ content/                 # 内容型组件
   ├─ code-block/
   ├─ mdx-components/
   ├─ release-card/
   └─ changelog-entry/
```

### 23.4 基础组件清单

#### Button

必须支持：

- `primary`
- `secondary`
- `quiet`
- `text`
- `icon`
- `danger`，仅管理或确认场景使用

按钮不是全部胶囊形。默认圆角为 8–12 px；只有平台筛选、状态过滤等紧凑控件可以使用胶囊。

#### Container

固定四档：

```text
wide: 1440 px
default: 1240 px
content: 880 px
text: 720 px
```

#### Section

支持：

- `light`
- `dark`
- `white`
- `bordered`
- `compact`
- `hero`

Section 只处理结构与背景，不包含具体营销内容。

#### Figure

Linear 式图注组件，支持：

```text
FIG 01
标题
补充说明
可选来源
```

#### MediaFrame

统一管理真实产品截图、视频和成果图：

- 4:3、16:10、16:9 三种比例
- 深色和浅色边框
- 无默认发光
- 可选顶部工具栏
- 移动端裁切策略
- poster 与视频回退

### 23.5 图标方案

使用 `@phosphor-icons/react`，原因是：

- 线宽和填充风格可切换。
- 比通用 Landing Page 常见的 Lucide 更容易形成产品气质。
- 适合桌面软件、命令、地图、图层和文件对象。

GeoWork Logo、地图图层、遥感轨道、空间范围等关键图标使用自有 SVG，不用通用图标冒充品牌资产。

### 23.6 动画方案

Motion for React 负责：

- Section 进入
- Tabs 内容切换
- 产品媒体状态切换
- Header 状态变化
- Sticky 叙事进度
- 布局重排

CSS 负责：

- hover
- focus
- pressed
- 颜色
- 边框
- 小范围 transform

禁止使用动画制造“高级感”。静态页面必须先通过设计验收。

推荐参数：

```text
快速反馈：120–180 ms
普通切换：220–320 ms
大型媒体进入：420–650 ms
弹簧：只用于拖动或有物理含义的对象
```

### 23.7 测试方案

#### 组件测试

- Button、Tabs、Dialog、Dropdown、Accordion。
- 键盘操作与焦点返回。
- reduced motion 状态。

#### 端到端测试

- Header 导航。
- 移动端菜单。
- Work / Code / Map 切换。
- 下载平台选择。
- GitHub Release fallback。
- 视频暂停。
- Changelog 路由。

#### 视觉回归

Playwright 固定视口：

```text
390 × 844
768 × 1024
1280 × 800
1440 × 1000
1920 × 1080
```

重点截图：

- Header
- Hero
- ProductStage
- WorkflowStory
- ModeShowcase
- UseCaseStory
- DownloadPanel

---

## 24. GeoWork 官网 V1 最终视觉方案

### 24.1 设计方向

正式方案名称：

> **GeoWork Product Editorial**

不是 AI SaaS 风格，也不是传统 GIS 科技大屏。总体感觉应是：

- Linear 的秩序。
- Raycast 的桌面产品质感。
- Attio 的明亮产品对象。
- Screen Studio 的真实媒体。
- Craft 的温度。
- Superlist 的少量动感。

### 24.2 页面基调

官网默认采用暖白背景，深色用于产品媒体和技术章节。这样能保留 Raycast / Linear 的专业感，同时避免黑底、光晕和渐变形成 AI 模板感。

推荐节奏：

```text
暖白 Header 与 Hero
→ 深色真实产品媒体
→ 暖白产品流程
→ 白色 Work / Code / Map
→ 暖白真实案例
→ 中性深色技术架构
→ 白色下载区
```

### 24.3 Hero 最终结构

不再使用居中大标题和 `AI workspace` 胶囊。

桌面端采用 5:7 非对称布局：

```text
左侧：
GeoWork
地图、遥感、代码与研究，
汇于一个工作台。
具体副标题
下载 / 查看产品

右侧：
真实 GeoFrontend2.0 产品画面
默认展示地图、项目树和成果
```

推荐主标题：

> 地图、遥感、代码与研究，汇于一个工作台。

推荐英文：

> Geospatial work, in one place.

产品媒体要求：

- 不使用假聊天界面。
- 不显示 `Agent running`。
- 不使用绿色霓虹描边。
- 不使用蓝绿雾化背景。
- 色彩来自地图、图层和真实成果。
- 可以展示“处理中 / 已完成 / 等待确认”等普通产品状态。

### 24.4 Header 最终结构

```text
GeoWork
Product
Workflows
Use cases
Developers
Changelog
GitHub
Download
```

- 高度 64–72 px。
- 主下载按钮为小圆角矩形，不发光。
- GitHub 使用文字链接或安静次按钮。
- 无顶部 Developer Preview 公告条。
- Developer Preview 放在下载按钮下方、Release 区或 Footer。

### 24.5 首页主要章节

1. Hero：具体产品定位与真实产品媒体。
2. Product principles：三条产品原则，不做三张普通卡片。
3. Workflow story：Project → Organize → Work → Deliver。
4. Work / Code / Map：Radix Tabs + 三组真实媒体。
5. Use cases：城市扩张、时序遥感、科研报告。
6. Product details：地图、代码、终端、浏览器、事件、报告之间的协同。
7. Architecture：Desktop、Go Runtime、Python Worker、GIS Tools、Skills。
8. Open development：GitHub、Roadmap、Developer Preview。
9. Download：系统、版本、Release Notes。
10. Footer。

### 24.6 参考网站效果的具体落地

| 参考网站 | GeoWork 使用方式 | 不使用的部分 |
|---|---|---|
| Raycast | 产品媒体尺度、下载体验、生态展示 | 紫红光晕、快捷启动器叙事 |
| Linear | 栅格、图注、工作流和内容密度 | 全站压暗、过小字体 |
| Warp | 模式选择、开发者技术信息 | 终端画面占据全部叙事 |
| Attio | 浅色对象、边框和复杂信息编排 | CRM 卡片拼贴 |
| Screen Studio | 大型真实演示媒体 | macOS 装饰和过度镜头缩放 |
| Craft | 案例、人群与暖白背景 | 纸张纹理和笔记产品语气 |
| Arc | 品牌文案和体验表达 | 过度彩色与娱乐化 |
| Superlist | 章节节奏和少量动态构图 | 高频弹跳、大红色视觉 |

### 24.7 视觉验收标准

以下全部满足才算达到设计目标：

- Hero 隐去 Logo 后仍能看出是地理空间软件。
- 页面不依赖 `AI`、`Agent` 和光效解释产品。
- 至少 70% 主要视觉来自真实产品与真实成果。
- 全站最多两种主要背景色和一种品牌强调色。
- 首页不能出现连续三屏卡片网格。
- 每个交互都可键盘使用。
- 动画关闭后布局仍完整。
- 参考网站的影响可被识别为设计方法，而不是复制外观。
---

## 25. 产品边界、目标用户与使用场景

### 25.1 官网必须准确表达的产品边界

GeoWork 是地理空间桌面工作台，不是下列产品的简单替代品：

- 不是网页地图浏览器。
- 不是纯聊天机器人。
- 不是 QGIS 的换皮版本。
- 不是单一遥感算法工具。
- 不是只有代码编辑功能的 IDE。
- 不是承诺“一句话自动完成所有 GIS 工作”的黑盒服务。

官网应将 GeoWork 表达为一个统一工作环境：用户在其中组织项目、查看地图、编写或运行代码、调用工具、阅读材料、检查过程并交付成果。

### 25.2 核心用户

#### A. GIS / 遥感学生与教师

核心任务：

- 完成实验、课程项目和毕业设计。
- 理解分析步骤而不是只得到结果。
- 整理数据、代码、地图和实验报告。
- 在课堂或演示中复现完整工作过程。

官网内容重点：清晰、可学习、过程可见、成果可复用。

#### B. 科研人员与研究生

核心任务：

- 管理文献、研究数据、代码和空间成果。
- 复现实验与记录参数。
- 组合 GEE、Python、QGIS、GDAL 等工具。
- 形成论文图件、统计表和研究报告。

官网内容重点：本地优先、可复现、可扩展、真实成果。

#### C. GIS / 遥感开发者

核心任务：

- 编写和调试空间分析代码。
- 接入模型、Skills、MCP、插件和本地工具。
- 构建重复可用的工作流。
- 查看日志、终端、事件与任务状态。

官网内容重点：开发架构、扩展接口、开源仓库和技术文档。

#### D. 行业分析与专业用户

核心任务：

- 快速组织分析项目。
- 减少数据、工具和报告之间的切换。
- 审核任务过程和输出结果。
- 将重复流程保存为工作流。

官网内容重点：效率、可控、结果完整、数据留在本地。

### 25.3 核心 Jobs to Be Done

访问者必须能从首页理解以下工作：

1. 创建或打开一个地理空间项目。
2. 导入数据、影像、代码、文献或已有成果。
3. 在 Work / Code / Map 等工作区之间保持同一上下文。
4. 运行 GIS、遥感或科研处理流程。
5. 查看终端、日志、事件和中间结果。
6. 复核并修改地图、代码、图表和报告。
7. 保存、导出或分享最终成果。

---

## 26. 信息架构与页面清单

### 26.1 V1 正式路由

| 路由 | 页面 | 主要目标 |
|---|---|---|
| `/` | 首页 | 建立产品认知并引导下载 |
| `/product` | 产品 | 详细解释工作台、地图、代码、研究与自动化 |
| `/workflows` | 工作流 | 展示完整任务从项目到成果的过程 |
| `/use-cases` | 使用案例 | 展示教学、科研、遥感和空间分析案例 |
| `/developers` | 开发者 | 架构、扩展、Skills、MCP、插件和仓库入口 |
| `/download` | 下载 | 平台、版本、系统要求、校验与安装说明 |
| `/changelog` | 更新日志 | 版本变化、发布日期、修复和已知问题 |
| `/about` | 关于 | 产品愿景、开源状态、贡献方式和联系方式 |
| `/privacy` | 隐私 | 官网数据、分析工具与外部服务说明 |
| `/terms` | 使用条款 | 官网、下载、第三方服务与免责声明 |
| `/404` | 404 | 返回产品、文档、下载和 GitHub 的明确入口 |

### 26.2 外部入口

- GitHub 主仓库。
- GeoFrontend2.0 仓库。
- 文档站，未完成时先指向 GitHub 文档目录。
- Issue / Discussions。
- Releases。
- Roadmap，只有真实存在时才展示。

### 26.3 导航优先级

桌面导航：

```text
GeoWork | Product | Workflows | Use cases | Developers | Changelog | GitHub | Download
```

移动导航：

```text
Product
Workflows
Use cases
Developers
Changelog
GitHub
Download
```

Download 是唯一主 CTA。GitHub 是次级入口，不能和 Download 使用同样的视觉重量。

---

## 27. 首页正式内容框架与文案约束

### 27.1 Hero

中文主标题：

> 地图、遥感、代码与研究，汇于一个工作台。

英文主标题：

> Geospatial work, in one place.

中文副标题：

> GeoWork 是面向 GIS、遥感、空间分析与科研工作的桌面工作台。组织项目、运行工具、检查过程，并交付地图、代码、数据和报告。

主 CTA：

> 下载 GeoWork

次 CTA：

> 查看产品

辅助信息只允许出现真实状态，例如：

```text
Windows Developer Preview
Open source
Local-first architecture
```

不得出现：

```text
The future of geospatial AI
Your ultimate AI copilot
One prompt to solve everything
Revolutionize your workflow
```

### 27.2 产品原则

建议使用三条编辑式叙事，而不是三张普通卡片：

1. **一个项目，一个上下文**：地图、代码、数据、文献和成果不再分散。
2. **过程可见，结果可改**：任务步骤、工具调用、中间结果和最终输出都可以检查。
3. **连接现有工具**：围绕 QGIS、GDAL、GEE、Python、Skills 和插件扩展能力。

### 27.3 工作流叙事

统一使用：

```text
Project → Organize → Work → Review → Deliver
```

不再使用过度 AI 化的：

```text
Prompt → Think → Agent → Magic
```

### 27.4 案例文案结构

每个案例必须包含：

- 研究或业务问题。
- 使用的数据。
- 主要过程。
- 真实输出。
- 适合的人群。
- 当前是否已经可运行。

案例不允许只写“提升效率”“释放生产力”等抽象结果。

---

## 28. 品牌系统最终规范

### 28.1 品牌关键词

```text
清晰
专业
克制
可信
本地
开放
可复现
地理空间
```

### 28.2 品牌语气

- 用具体名词和动作表达产品。
- 少用营销感形容词。
- 不把 AI 作为每句话的主语。
- 不宣称产品已具备尚未完成的能力。
- 中文自然、直接，不使用机器翻译式短句。
- 英文简洁，不强行追求口号押韵。

### 28.3 Logo 文件要求

必须准备：

```text
logo-symbol.svg
logo-horizontal.svg
logo-horizontal-dark.svg
logo-monochrome.svg
favicon.svg
favicon-32.png
apple-touch-icon.png
og-mark.png
```

Logo 必须满足：

- 16 px 仍可识别。
- 单色版本可用于深浅背景。
- 不依赖发光和渐变才能成立。
- 不直接复制地图图钉、地球或聊天气泡的通用图标。

### 28.4 颜色 Token

正式 Token 命名：

```css
--gw-bg-canvas
--gw-bg-surface
--gw-bg-subtle
--gw-bg-inverse
--gw-text-primary
--gw-text-secondary
--gw-text-tertiary
--gw-text-inverse
--gw-border-subtle
--gw-border-strong
--gw-accent
--gw-accent-hover
--gw-accent-muted
--gw-success
--gw-warning
--gw-danger
--gw-focus-ring
```

颜色原则：

- 暖白或中性白作为主背景。
- 深灰黑用于产品媒体和技术章节。
- 品牌绿色只用于主 CTA、选中状态和少量关键标识。
- 地图和案例可以使用自身数据色彩，不强制全部染成品牌绿。
- 不使用紫蓝 Aurora、彩虹渐变和大面积霓虹。

### 28.5 字体

优先顺序：

```text
英文与数字：Geist Sans / Inter / system-ui
中文：PingFang SC / Microsoft YaHei / system-ui
代码：Geist Mono / SFMono-Regular / Consolas
```

若引入 Web Font：

- 必须本地托管或由 Next.js Font 构建时处理。
- 不允许页面加载后明显跳字。
- 中文不得为了“高级感”加载体积巨大的完整字体文件。

### 28.6 图标

- 通用图标：Phosphor Icons。
- 品牌与地理对象：自有 SVG。
- 默认线宽保持统一。
- 图标必须有语义，不用于填满空白。
- 不使用 Emoji 代替正式 UI 图标。

---

## 29. 设计 Token 与响应式基线

### 29.1 宽度

```text
wide      1440 px
container 1240 px
content    880 px
text       720 px
```

### 29.2 Breakpoints

```text
mobile-small  360 px
mobile        480 px
tablet        768 px
desktop      1024 px
wide         1280 px
large        1440 px
```

断点用于内容重排，不用于针对具体设备品牌写特殊规则。

### 29.3 间距系统

基础单位 4 px：

```text
4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128, 160
```

### 29.4 圆角

```text
control  8–10 px
panel    14–18 px
media    20–28 px
pill     999 px，仅筛选和状态控件
```

### 29.5 阴影

- 默认依靠边框和背景层级。
- 只有浮层、对话框和大型产品媒体允许阴影。
- 不使用彩色阴影。
- 不使用发光边框。

### 29.6 动效

```text
interaction-fast  140 ms
interaction       220 ms
section-enter     420 ms
media-enter       560 ms
```

动效必须支持 `prefers-reduced-motion`。

---

## 30. 组件状态与交互矩阵

### 30.1 Button

必须覆盖：

- primary / secondary / quiet / text / icon。
- default / hover / focus-visible / active / disabled / loading。
- light / dark 背景。
- 链接与按钮语义分离。

Loading 状态只在真实异步操作中使用。官网普通链接不得伪装加载。

### 30.2 Navigation

- Header 滚动后可出现实色或模糊背景，但不能改变布局高度。
- 当前页面需要 `aria-current="page"`。
- 移动菜单打开后锁定背景滚动。
- Esc 关闭，关闭后焦点回到触发按钮。

### 30.3 Tabs

用于 Work / Code / Map：

- 支持键盘方向键。
- URL 可选同步 `?mode=work`。
- 首次加载只展示当前媒体，其他媒体按需加载。
- 切换动画不能改变容器高度造成页面跳动。

### 30.4 Dialog / Media viewer

- 用于放大产品截图、播放演示、查看 Release 详情。
- 必须有标题、关闭按钮、焦点圈和 Esc 关闭。
- 视频关闭后停止播放。
- 移动端采用全屏或接近全屏布局。

### 30.5 Download selector

- 自动检测只作为建议，不能替用户做不可逆选择。
- 必须明确平台、架构、版本、文件大小和发布时间。
- 无对应版本时给出 GitHub Releases 和构建说明。

### 30.6 Error / Empty / Loading

必须设计：

- GitHub API 加载失败。
- Releases 为空。
- 视频加载失败。
- 图片加载失败。
- JavaScript 关闭时的基础内容。
- 网络慢时的 poster 与静态回退。

---

## 31. 真实产品素材制作规范

### 31.1 截图场景清单

必须拍摄以下真实场景：

1. 首页 Hero：项目树 + 地图 + 右侧成果或属性面板。
2. Work：任务、步骤、文件与中间结果。
3. Code：编辑器、终端、运行结果与错误定位。
4. Map：图层、图例、空间选择和成果地图。
5. Research：文献、笔记、引用和报告片段。
6. Automation：定时任务、事件和运行历史。
7. Extension：Skills / MCP / 插件管理。
8. Settings：模型、工具和本地环境配置，谨慎展示密钥区域。

### 31.2 截图要求

- 使用统一窗口尺寸和缩放比例。
- 隐藏真实 API Key、个人目录、邮箱和敏感数据。
- 示例项目命名一致。
- 内容必须可读，不使用纯装饰假数据。
- 光标、选中状态和 Tooltip 不应遮挡关键内容。
- 截图不叠加浏览器式假窗口，除非产品真实存在对应外壳。

### 31.3 视频要求

- Hero 视频 10–20 秒，无声循环，展示一段完整操作。
- 详细演示 30–90 秒，提供控制器和字幕。
- 输出 WebM 与 MP4。
- 提供 poster。
- 不自动播放有声音的视频。
- 不用镜头缩放掩盖界面本身不清晰的问题。

### 31.4 案例成果

V1 至少准备三套：

1. 城市扩张与土地利用变化。
2. NDVI / LST / 时序遥感分析。
3. 文献、代码、地图和报告协同的科研流程。

每套包含：

```text
cover.webp
map.webp
chart.webp
workflow.webp
report.webp
case.md
```

---

## 32. 内容数据模型与维护方式

### 32.1 内容文件

```text
content/
├─ changelog/
├─ use-cases/
├─ pages/
└─ legal/
```

### 32.2 Use Case Frontmatter

```yaml
title:
slug:
summary:
audience:
status: available | preview | planned
data_sources:
tools:
outputs:
cover:
published_at:
updated_at:
```

### 32.3 Changelog Frontmatter

```yaml
version:
date:
channel: stable | preview | nightly
platforms:
summary:
highlights:
fixes:
known_issues:
release_url:
```

### 32.4 内容治理

- 页面内容必须有负责人。
- 产品能力变化时同步更新官网。
- 删除能力前先搜索所有相关文案、案例和截图。
- Changelog 不得仅从 Commit 自动拼接。
- Legal 页面变化需记录日期。

---

## 33. SEO、社交分享与结构化数据

### 33.1 每页必须配置

- `title`。
- `description`。
- canonical URL。
- Open Graph。
- Twitter / X Card。
- robots。
- 语言与地区。

### 33.2 结构化数据

根据实际页面使用：

- `SoftwareApplication`。
- `Organization` 或 `Person`，必须与真实主体一致。
- `BreadcrumbList`。
- `Article`，用于 Changelog 或案例。

不得填写虚构评分、价格和用户数量。

### 33.3 技术文件

```text
sitemap.xml
robots.txt
manifest.webmanifest
favicon.ico
security.txt
```

### 33.4 搜索关键词方向

中文：

```text
地理空间工作台
GIS 桌面软件
遥感分析工具
GIS 自动化
GeoAI 工作流
QGIS AI 工具
Google Earth Engine 桌面工作台
```

英文：

```text
geospatial workspace
GIS desktop workspace
remote sensing workflow
spatial analysis desktop app
local-first geospatial tools
```

关键词服务于内容，不做堆砌。

---

## 34. 国际化与语言策略

### 34.1 V1 策略

推荐 V1 同时支持中文和英文，但开发顺序为：

1. 先完成中文内容与布局。
2. 完成英文专业翻译。
3. 检查英文文本增长和中文换行。
4. 再开放语言切换。

若发布时间受限，V1 可先中文，但工程结构必须预留国际化。

### 34.2 路由

推荐：

```text
/zh-CN/...
/en/...
```

若默认语言不带前缀，必须统一 canonical 和 hreflang 规则。

### 34.3 翻译规则

- 产品名、Skills、MCP、QGIS、GDAL、GEE 不强行翻译。
- 不使用逐词机器翻译。
- 英文标题可重写，不要求与中文字数一致。
- 截图中的语言尽量与页面语言一致；无法一致时明确标注。

---

## 35. 下载、版本与 GitHub Release 规则

### 35.1 数据来源

下载页优先读取官方 GitHub Releases。必须保留静态 fallback，避免 API 限流或网络失败导致页面不可用。

### 35.2 下载信息

每个文件展示：

- 版本。
- 发布渠道。
- 操作系统。
- CPU 架构。
- 文件类型。
- 文件大小。
- SHA-256，若发布流程提供。
- 发布时间。
- Release Notes。

### 35.3 平台状态

必须基于真实构建产物：

```text
Available
Developer Preview
Planned
Unsupported
```

不得显示无法下载的平台按钮。

### 35.4 GitHub API 失败回退

- 使用构建时缓存或服务端缓存。
- 超时后显示仓库 Releases 链接。
- 不显示无限骨架屏。
- 错误不影响系统要求和安装文档阅读。

---

## 36. 分析、隐私与第三方服务

### 36.1 分析原则

官网分析只采集产品改进所需的最少数据：

- 页面访问。
- 来源域名。
- 下载按钮点击。
- GitHub / Docs 外链点击。
- 语言和平台的粗粒度信息。

不采集：

- 表单之外的个人身份信息。
- 精确地理位置。
- 键盘输入内容。
- 产品截图中的数据。
- 跨站广告画像。

### 36.2 推荐方案

优先无 Cookie 或低隐私负担方案。未确定分析服务前，工程通过统一 `analytics` 适配层预留，不直接在组件内写第三方脚本。

### 36.3 Cookie Banner

只有实际使用需要同意的非必要 Cookie 时才显示。不要为了“看起来正规”添加无意义弹窗。

### 36.4 外部资源

- 字体尽量本地托管。
- 不从不可信 CDN 加载脚本。
- YouTube 等嵌入内容需要隐私增强模式或点击后加载。
- 外部链接使用正确的 `rel`。

---

## 37. 安全、法律与许可

### 37.1 安全响应头

部署时配置：

- Content-Security-Policy。
- Strict-Transport-Security。
- X-Content-Type-Options。
- Referrer-Policy。
- Permissions-Policy。
- frame-ancestors 或 X-Frame-Options。

CSP 应根据实际资源生成，不使用长期宽泛的 `unsafe-eval`。

### 37.2 密钥与环境变量

- GitHub Token 仅服务端使用。
- `NEXT_PUBLIC_*` 不得存放密钥。
- `.env.example` 只写变量名和说明。
- 构建日志不得输出 Token。
- 截图与录屏不得出现真实密钥。

### 37.3 开源与第三方许可

- 建立 `THIRD_PARTY_NOTICES.md`。
- 检查字体、图标、图片、地图底图和示例数据许可。
- 不直接复制参考网站的图片、文案、代码和品牌资源。
- 引用第三方地图或数据时显示必要 attribution。

### 37.4 Legal 页面最低内容

隐私页：

- 收集什么。
- 为什么收集。
- 保存多久。
- 第三方服务。
- 联系方式。
- 更新日期。

条款页：

- Developer Preview 说明。
- 软件与官网的责任边界。
- 第三方数据与服务。
- 下载和安装风险提示。
- 开源许可链接。

法律文本上线前应由项目负责人审核；本文档不构成法律意见。

---

## 38. 性能预算与浏览器支持

### 38.1 性能预算

以生产构建和常见移动网络测试：

- 首屏不加载 Cesium、MapLibre、Three.js。
- Hero 媒体必须有 poster。
- 首屏视频不得阻塞 LCP。
- 第三方脚本默认延迟加载。
- 非首屏图片 lazy load。
- 页面不因字体加载发生明显布局偏移。
- JavaScript 关闭时仍能阅读核心内容和下载说明。

目标预算建议：

```text
初始 JS：尽量小于 180 KB gzip，按真实构建持续监控
Hero poster：小于 250 KB
首屏视频：建议小于 4 MB，并按设备降级
普通产品截图：单张优先小于 350 KB
```

预算是质量门槛，不是通过降低图片可读性硬凑数字。

### 38.2 浏览器

支持：

- 最近两个主要版本的 Chrome、Edge、Firefox、Safari。
- iOS Safari 与 Android Chrome 的主流版本。

不保证 Internet Explorer。

### 38.3 降级

- 不支持 `backdrop-filter` 时使用实色背景。
- 不支持高级动画时显示静态内容。
- 视频失败时显示 poster 和文字链接。
- WebP / AVIF 不可用时提供合适回退。

---

## 39. 测试、监控与质量保证

### 39.1 测试层级

1. 类型检查。
2. ESLint。
3. 单元测试。
4. 组件交互测试。
5. 可访问性测试。
6. 端到端测试。
7. 视觉回归。
8. Lighthouse / 性能检查。
9. 生产 Smoke Test。

### 39.2 视觉回归页面

- 首页全页。
- Header 桌面与移动。
- Hero。
- Product Stage。
- Work / Code / Map。
- Use Case。
- Download。
- Dialog。
- 404。

### 39.3 生产监控

至少监控：

- 站点可用性。
- 404 数量。
- GitHub Release 数据错误。
- JavaScript 运行错误。
- Core Web Vitals 趋势。
- 下载链接失效。

监控工具未确定前使用抽象适配层和部署平台基础日志。

---

## 40. 设计交付物与 Figma 规范

### 40.1 Figma 页面

```text
00 Cover
01 Foundations
02 Components
03 Homepage Desktop
04 Homepage Tablet
05 Homepage Mobile
06 Product
07 Workflows
08 Use Cases
09 Developers
10 Download
11 Changelog
12 Legal & System
13 Prototypes
14 Archive
```

### 40.2 Foundations

必须包含：

- Color Variables。
- Typography Styles。
- Spacing。
- Grid。
- Radius。
- Shadow。
- Motion Notes。
- Icon rules。

### 40.3 Components

每个组件展示：

- Variants。
- States。
- Light / dark。
- Desktop / mobile。
- Keyboard / focus 说明。
- 与代码组件名称的对应关系。

### 40.4 交付要求

- 设计稿命名与代码组件一致。
- 图片和视频标明原始文件路径。
- 不只交付一张长图。
- 所有关键页面至少包含 Desktop 和 Mobile。
- Prototype 只演示关键交互，不为每个 hover 建复杂原型。

---

## 41. 发布前内容与产品事实确认

上线前必须由项目负责人逐项确认：

- 产品正式名称和一句话定位。
- 当前版本号。
- 支持的平台与架构。
- 下载文件真实可用。
- 系统要求。
- 开源许可证。
- 当前可用与计划中的能力。
- 数据隐私与本地运行说明。
- 联系方式。
- GitHub、Docs、Issues、Releases 链接。
- Logo、截图、视频和案例使用许可。

未确认的内容必须标记为 `TODO`，不得由开发 Agent 猜测后上线。

---

## 42. 最终上线验收总表

### 品牌

- [ ] 页面看起来是 GeoWork，而不是通用 AI 模板。
- [ ] 地理属性来自真实产品和成果，不是装饰地球。
- [ ] Logo、颜色、字体和图标一致。

### 内容

- [ ] 10 秒内能理解产品是什么。
- [ ] 首页所有能力都有依据。
- [ ] Developer Preview 状态清楚。
- [ ] 中文与英文无机器翻译感。

### 组件

- [ ] Radix 只位于 primitives 层。
- [ ] 自有组件覆盖所有状态。
- [ ] 无 Ant Design、Tailwind 和默认 shadcn 页面模板。

### 交互

- [ ] 键盘可用。
- [ ] 焦点清晰。
- [ ] reduced motion 正常。
- [ ] 移动菜单、Tabs、Dialog、Dropdown 全部正确。

### 素材

- [ ] 主要视觉使用真实产品。
- [ ] 无密钥、路径和私人数据。
- [ ] 视频有 poster、字幕与暂停。
- [ ] 地图和数据 attribution 完整。

### 工程

- [ ] TypeScript、Lint、Test、Build 全部通过。
- [ ] Playwright 与 axe 通过。
- [ ] 没有控制台错误。
- [ ] 没有失效链接。
- [ ] 性能预算无重大超标。
- [ ] 安全响应头生效。

### 发布

- [ ] 域名、HTTPS、canonical、sitemap、robots 正确。
- [ ] 404、隐私、条款、security.txt 可访问。
- [ ] GitHub Release 失败时有回退。
- [ ] 下载链接经过真实设备验证。
- [ ] 发布后监控和回滚方案可用。---

## v0.5 开发实现文档关系

从 v0.5 开始，本文件不再单独承担“怎么写代码”的职责。以下文件共同构成完整开发规范，任何开发者或编程 Agent 必须全部阅读：

1. `DESIGN.md`：确定品牌、视觉、页面内容和禁止事项。
2. `COMPONENT-SPECS.md`：确定每个组件的 Props、状态、交互和验收。
3. `CONTENT-ASSETS.md`：确定文案、图片、视频、案例和文件命名。
4. `DEVELOPMENT.md`：确定工程架构，并给出关键文件的完整代码范式。
5. `FILE-MAP.md`：逐文件说明“创建什么文件、写什么代码、依赖什么、如何验收”。
6. `SETUP-WINDOWS.md`：给出 Windows / PowerShell 的初始化与运行步骤。
7. `PLAN.md`：确定开发顺序和阶段验收。
8. `AGENT.md`：约束自动化开发行为。

如果文档发生冲突，优先级为：

```text
用户最新明确要求
> DESIGN.md
> COMPONENT-SPECS.md
> CONTENT-ASSETS.md
> DEVELOPMENT.md
> FILE-MAP.md
> PLAN.md
> AGENT.md 中的通用执行规则
```
