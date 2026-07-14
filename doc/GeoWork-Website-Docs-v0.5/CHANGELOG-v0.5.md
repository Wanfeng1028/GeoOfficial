# GeoWork Website Docs v0.5 更新说明

v0.5 将“全面但不够具体”的文档改为文件级实施规范。

新增：

- `DEVELOPMENT.md`：完整工程结构、初始化命令、配置、Token、Root Layout、Button、Container、Tabs、Header、Hero、首页组合、模式切换、GitHub Releases、MDX、测试和 CI 的具体代码。
- `FILE-MAP.md`：逐文件说明创建/修改、写入内容、依赖和验收。
- `COMPONENT-SPECS.md`：组件 Props、状态、响应式和交互边界。
- `CONTENT-ASSETS.md`：确定首页文案、禁用套话、素材文件名、截图规范、案例模板和事实确认表。
- `SETUP-WINDOWS.md`：PowerShell 初始化、安装、目录创建、运行和排错。

更新：

- `DESIGN.md` 增加文档优先级与开发文档关系。
- `AGENT.md` 增加文件级修改说明、最小文件集和禁止占位交付规则。
- `PLAN.md` 增加每阶段精确文件清单，主部署锁定 Vercel。

关键变化：

- 不再只写“实现 Hero”，而是明确 `Hero.tsx`、`Hero.module.css`、首页组合文件、媒体路径和验收视口。
- 不再只写“使用 Radix”，而是明确 primitive 的目录、代码范式和测试职责。
- 不再只写“接入 GitHub Release”，而是给出 Zod schema、fetch、缓存和 fallback 代码。
