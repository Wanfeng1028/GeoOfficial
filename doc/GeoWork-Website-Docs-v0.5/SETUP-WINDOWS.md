# GeoWork Website — SETUP-WINDOWS.md

> 文档版本：v0.5  
> 环境：Windows 10/11、PowerShell 7、Node.js LTS、Git。

---

## 1. 检查环境

```powershell
node --version
npm --version
git --version
pwsh --version
```

Node 使用当前 LTS。不要用实验版 Node 作为 CI 基线。

## 2. 创建项目

```powershell
Set-Location E:\github
npx create-next-app@latest GeoWork-Website `
  --typescript `
  --eslint `
  --app `
  --src-dir `
  --import-alias "@/*" `
  --use-npm

Set-Location .\GeoWork-Website
```

如果询问 Tailwind，选择 `No`。

## 3. 安装依赖

```powershell
npm install motion clsx zod shiki @phosphor-icons/react
npm install @next/mdx @mdx-js/loader @mdx-js/react @types/mdx
npm install @radix-ui/react-accordion @radix-ui/react-dialog
npm install @radix-ui/react-dropdown-menu @radix-ui/react-navigation-menu
npm install @radix-ui/react-popover @radix-ui/react-slot
npm install @radix-ui/react-tabs @radix-ui/react-tooltip
npm install -D vitest jsdom @vitejs/plugin-react
npm install -D @testing-library/react @testing-library/jest-dom @testing-library/user-event
npm install -D @playwright/test @axe-core/playwright
npx playwright install
```

## 4. 建立目录

```powershell
$dirs = @(
  'src\components\primitives',
  'src\components\ui',
  'src\components\marketing',
  'src\components\content',
  'src\content\changelog',
  'src\content\use-cases',
  'src\data',
  'src\lib\github',
  'src\lib\content',
  'src\styles',
  'src\types',
  'public\brand',
  'public\media\hero',
  'public\media\modes',
  'public\media\use-cases',
  'tests\e2e',
  'tests\visual'
)

$dirs | ForEach-Object { New-Item -ItemType Directory -Force -Path $_ | Out-Null }
```

## 5. 环境变量

```powershell
Copy-Item .env.example .env.local
notepad .env.local
```

不要提交 `.env.local`。

## 6. 启动

```powershell
npm run dev
```

打开：

```text
http://localhost:3000
```

## 7. 每个阶段结束执行

```powershell
npm run lint
npm run typecheck
npm run test
npm run build
npm run test:e2e
```

## 8. 常见问题

### PowerShell 拒绝脚本

优先直接运行 `npm.cmd`：

```powershell
npm.cmd run dev
```

不要为了运行项目随意降低整个系统执行策略。

### 3000 端口占用

```powershell
Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue
```

或临时运行：

```powershell
npm run dev -- -p 3001
```

### 图片不显示

确认文件确实位于 `public/`，引用路径从 `/` 开始，例如：

```tsx
<Image src="/media/hero/geowork-workspace.webp" ... />
```

### Build 与 Dev 样式不同

每次阶段验收必须运行 `npm run build`。CSS 顺序问题不能只在 dev 中判断。
