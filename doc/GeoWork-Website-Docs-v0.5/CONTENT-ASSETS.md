# GeoWork Website — CONTENT-ASSETS.md

> 文档版本：v0.5  
> 用途：锁定文案与真实素材，防止开发者临时写 AI 营销套话或生成假产品画面。

---

## 1. 首页文案

### Hero

```text
产品名：GeoWork
主标题：地图、遥感、代码与研究，汇于一个工作台。
副标题：GeoWork 是面向 GIS、遥感与空间研究的桌面工作台，让项目、工具、数据和成果保持在同一个上下文中。
主按钮：下载 GeoWork
次按钮：了解产品
状态：Developer Preview · 查看当前可用平台
```

macOS 是否显示，必须根据真实 Release 决定。

### 产品原则

```text
01 项目优先
围绕真实项目组织数据、工具、文件与成果，而不是围绕一次对话组织工作。

02 上下文连续
地图、代码、终端、文献和报告共享同一个项目上下文。

03 可扩展
通过 Skills、MCP 与插件连接专业工具和可复用工作流。
```

### Workflow

```text
标题：从项目开始，以可继续工作的成果结束。
Project：定义研究对象、范围和交付目标。
Organize：组织数据、文件、工具和项目上下文。
Work：在地图、代码、终端与研究材料之间推进任务。
Deliver：得到地图、数据、代码、图表和报告。
```

### Work / Code / Map

```text
Work：组织任务、文件、工具和成果。
Code：编写、运行和检查地理空间代码。
Map：查看图层、范围、结果和空间关系。
```

### Architecture

```text
标题：专业地理空间能力，运行在清晰的本地架构之上。
说明：桌面界面、Go Runtime 与 Python Geo Worker 分层协作，并连接 QGIS、GDAL、Google Earth Engine、模型、Skills 与 MCP。
```

### Download

```text
标题：开始使用 GeoWork。
说明：GeoWork 当前处于 Developer Preview。请先查看系统要求、版本说明和已知限制。
```

---

## 2. 明确禁用的词语组合

除非上下文确有必要，不使用：

- 下一代 AI 平台
- 重新定义未来
- 释放无限潜力
- 一键赋能
- 智能驱动一切
- AI-native workspace
- Agentic revolution
- 魔法般完成

“AI”“Agent”可以在产品能力、架构和工具说明中出现，但不能连续占据 Hero、导航和前三个章节标题。

---

## 3. 素材清单

| ID | 文件路径 | 内容 | 尺寸 | 状态 |
|---|---|---|---|---|
| A01 | `public/brand/logo-mark.svg` | GeoWork 标志 | SVG | 待从项目导出 |
| A02 | `public/brand/logo-wordmark-dark.svg` | 深色文字标 | SVG | 待导出 |
| A03 | `public/brand/logo-wordmark-light.svg` | 浅色文字标 | SVG | 待导出 |
| A04 | `public/media/hero/geowork-workspace.webp` | 最新 GeoFrontend2.0 主工作区 | ≥1800×1125 | 必需 |
| A05 | `public/media/hero/geowork-workspace.webm` | 12–18 秒真实操作 | 1080p | 可后补 |
| A06 | `public/media/modes/work.webp` | Work 模式 | ≥1600×1000 | 必需 |
| A07 | `public/media/modes/code.webp` | Code 模式 | ≥1600×1000 | 必需 |
| A08 | `public/media/modes/map.webp` | Map 模式 | ≥1600×1000 | 必需 |
| A09 | `public/media/use-cases/urban-expansion/result.webp` | 城市扩张成果 | ≥1800px 宽 | 必需 |
| A10 | `public/media/use-cases/ndvi-series/result.webp` | NDVI 图与地图 | ≥1800px 宽 | 必需 |
| A11 | `public/media/use-cases/research-report/result.webp` | 报告成果 | ≥1800px 宽 | 必需 |
| A12 | `src/app/opengraph-image.png` | 分享图 | 1200×630 | 必需 |

---

## 4. 截图制作要求

1. 所有截图来自同一版本的 GeoFrontend2.0。
2. 统一窗口尺寸、缩放、字体和主题。
3. 隐去 API Key、账号、私人路径和真实个人数据。
4. 不在 Photoshop 中增加虚假功能。
5. 可以裁切、加背景、加图注，但不能改变功能状态。
6. 地图要有真实图层、图例或成果，不用随机绿色多边形。
7. 代码示例必须能运行或明确标注示例。
8. 报告截图不得使用版权不明论文内容。

---

## 5. 案例内容模板

```markdown
# 案例标题

## 问题
真实任务是什么？

## 输入
数据、区域、时间和约束。

## 工作过程
GeoWork 中实际完成的步骤。

## 使用工具
QGIS / GDAL / GEE / Python / Skills 等。

## 输出
地图、数据、代码、图表或报告。

## 限制
数据质量、方法适用范围和当前开发版限制。
```

案例不得声称达到未经验证的精度或商业生产能力。

---

## 6. Alt 文本示例

差：`产品截图`  
好：`GeoWork 工作区，左侧为项目导航，中间为杭州城市扩张地图，右侧为统计结果与报告文件。`

差：`NDVI 图片`  
好：`2019 至 2025 年 NDVI 时间序列折线图，并列展示研究区植被指数分布地图。`

装饰性背景使用空 alt；产品和成果图必须具体描述。

---

## 7. 内容事实确认表

上线前人工确认：

- 当前公开版本号。
- Windows/macOS/Linux 实际支持情况。
- 是否存在可供普通用户下载的安装包。
- QGIS、GEE、GDAL 能力的真实完成度。
- 许可证名称和商业使用边界。
- Docs 实际入口。
- 联系邮箱或反馈入口。
- 隐私与法律主体。

这些内容不允许 Agent 猜测。
