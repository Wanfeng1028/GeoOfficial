# GeoWork Website — COMPONENT-SPECS.md

> 文档版本：v0.5  
> 用途：定义组件 API、状态、响应式和验收，不允许开发者临时发明行为。

---

## 1. Button

```ts
type ButtonVariant = 'primary' | 'secondary' | 'quiet' | 'text';
type ButtonSize = 'sm' | 'md' | 'lg';
```

必须支持：`asChild`、`disabled`、leading/trailing icon。  
默认圆角 12px 左右，不是胶囊。  
Primary 每个视口首屏最多一个。

## 2. Container

```ts
type ContainerWidth = 'wide' | 'default' | 'content' | 'text';
```

- wide：1440px
- default：1240px
- content：880px
- text：720px

移动端 gutter 16px，平板以上 32px。

## 3. Section

```ts
type SectionTone = 'canvas' | 'white' | 'dark';
type SectionSpacing = 'compact' | 'default' | 'large';
```

Section 不得同时负责标题、网格和业务文案。

## 4. SectionHeading

Props：

```ts
interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  level?: 1 | 2 | 3;
  width?: 'text' | 'content';
}
```

首页除 Hero 外只允许一个 `h2` 作为每节主标题。

## 5. MediaFrame

```ts
type MediaRatio = '16:10' | '16:9' | '4:3' | 'auto';
type MediaTone = 'light' | 'dark' | 'none';
```

必须支持：

- `children`
- `caption`
- `data-asset-status="missing"`
- 移动端裁切
- 不发光的边框与阴影

## 6. VideoPlayer

必须支持：

```ts
interface VideoSource { src: string; type: string }
interface VideoPlayerProps {
  poster: string;
  sources: VideoSource[];
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  ariaLabel: string;
}
```

规则：

- 自动播放必须 muted。
- reduced motion 时只显示 poster。
- 页面不可见时暂停。
- 控件可键盘操作。

## 7. SiteHeader

状态：

- 顶部：透明/暖白。
- 滚动：暖白 92% + blur + 底边线。
- 移动：仅 Logo、Download、Menu。

不允许：顶部公告条、发光下载按钮、超大下拉导航。

## 8. Hero

Props 不需要暴露所有文案，直接从 `homeContent` 读取。  
布局：桌面 5:7；小于 900px 单列。  
媒体优先真实截图，其次真实录屏 poster。  
状态文案放在 CTA 下方，不做胶囊 Badge。

## 9. ProductPrinciples

数据：

```ts
interface Principle {
  index: string;
  title: string;
  description: string;
}
```

桌面三列但使用共享分隔线；移动端纵向。禁止三张独立浮卡。

## 10. WorkflowStory

步骤：

1. Project — 创建项目与研究目标。
2. Organize — 组织数据、文件、工具和上下文。
3. Work — 在地图、代码、终端和研究材料之间工作。
4. Deliver — 输出地图、数据、代码和报告。

桌面：左侧 sticky 文案，右侧真实媒体。  
移动/reduced motion：普通顺序列表，不 sticky。

## 11. ModeShowcase

Radix Tabs：`work | code | map`。  
桌面 vertical，移动 horizontal。  
每个 tab 必须有 label、说明、image、alt。  
键盘 Arrow/Home/End 通过。

## 12. UseCaseStory

每个案例结构：

```ts
interface UseCaseStoryItem {
  slug: string;
  problem: string;
  inputs: string[];
  workflow: string[];
  outputs: string[];
  image: string;
  imageAlt: string;
  limitations: string[];
}
```

首页展示摘要；详情页展示完整结构。

## 13. ArchitectureDiagram

节点：

```text
Desktop UI
Go Runtime
Python Geo Worker
QGIS / GDAL / GEE / Models
Skills / MCP / Plugins
```

使用 HTML/CSS/SVG 线条，不使用 Canvas、WebGL、3D。  
移动端改为纵向节点，不允许横向溢出。

## 14. DownloadPanel

状态：

- loading：Server 渲染中无需骨架。
- release available：显示版本和真实资产。
- no matching asset：显示 Releases 链接。
- API failure：显示本地 Developer Preview fallback。
- unsupported platform：明确“尚未提供”。

不能自动根据 User-Agent 直接下载；可以默认选中，但必须让用户确认平台。

## 15. Dialog / MobileMenu

- 打开后焦点进入 Dialog。
- Esc 关闭。
- 关闭后焦点返回菜单按钮。
- 背景 inert。
- 动画 180–240ms。
- 移动菜单链接点击后关闭。

## 16. Footer

栏目：Product、Resources、Development、Legal。  
必须包含开发状态、许可说明入口、两个仓库链接。  
不得放不存在的社交媒体账号。
