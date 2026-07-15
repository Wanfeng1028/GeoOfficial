# 贡献指南

感谢参与 GeoOfficial。

## 分支命名

- `feat/描述`：新功能
- `fix/描述`：缺陷修复
- `docs/描述`：文档
- `refactor/描述`：重构

## Commit 规范

使用 Conventional Commits：`type(scope): 描述`。例如 `fix(media): 修正 Hero 图片路径`。

## 测试要求

- PR 必须通过 `npm run check`（lint、typecheck、test、build）。
- 涉及交互组件须补单测。
- 涉及页面流程须补 E2E。
- 不允许跳过真实图片加载测试。

## 素材要求

- 产品截图必须来自真实 GeoFrontend2.0 运行界面。
- 禁止 AI 生成产品界面、霓虹光晕、虚假 Agent 状态。
- 禁止将 SVG 改扩展名冒充 WebP。
- 替换占位素材后运行 `npm run verify:assets:release`。

## 不允许虚构产品事实

- 未确认的平台不写成已支持。
- 未确认的系统要求不臆造数字。
- 未确认的许可不宣称具体协议。
- 未发布的 Release 不宣称可下载。

## PR 截图要求

涉及视觉变化的 PR 须附 390 / 1280 / 1920 三个视口截图。
