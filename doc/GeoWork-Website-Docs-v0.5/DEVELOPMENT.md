# GeoWork Website — DEVELOPMENT.md

> 文档版本：v0.5  
> 目标：把设计规范翻译为可以直接实施的工程结构，精确说明关键文件应写什么代码。  
> 主部署：Vercel。  
> 运行环境：Node.js 当前 LTS、npm、Windows PowerShell 7 优先。

---

## 1. 最终工程结构

```text
GeoWork-Website/
├─ .github/
│  ├─ workflows/
│  │  └─ ci.yml
│  └─ pull_request_template.md
├─ public/
│  ├─ brand/
│  │  ├─ logo-mark.svg
│  │  ├─ logo-wordmark-dark.svg
│  │  ├─ logo-wordmark-light.svg
│  │  └─ favicon.svg
│  ├─ media/
│  │  ├─ hero/
│  │  │  ├─ geowork-workspace.webp
│  │  │  ├─ geowork-workspace-poster.webp
│  │  │  ├─ geowork-workspace.webm
│  │  │  └─ geowork-workspace.mp4
│  │  ├─ modes/
│  │  │  ├─ work.webp
│  │  │  ├─ code.webp
│  │  │  └─ map.webp
│  │  └─ use-cases/
│  │     ├─ urban-expansion/
│  │     ├─ ndvi-series/
│  │     └─ research-report/
│  └─ og/
│     └─ default.png
├─ src/
│  ├─ app/
│  │  ├─ (marketing)/
│  │  │  ├─ layout.tsx
│  │  │  ├─ page.tsx
│  │  │  ├─ product/page.tsx
│  │  │  ├─ use-cases/page.tsx
│  │  │  ├─ use-cases/[slug]/page.tsx
│  │  │  ├─ download/page.tsx
│  │  │  ├─ changelog/page.tsx
│  │  │  ├─ changelog/[slug]/page.tsx
│  │  │  ├─ about/page.tsx
│  │  │  ├─ privacy/page.tsx
│  │  │  └─ terms/page.tsx
│  │  ├─ dev/components/page.tsx
│  │  ├─ error.tsx
│  │  ├─ globals.css
│  │  ├─ icon.svg
│  │  ├─ layout.tsx
│  │  ├─ not-found.tsx
│  │  ├─ opengraph-image.png
│  │  ├─ robots.ts
│  │  └─ sitemap.ts
│  ├─ components/
│  │  ├─ primitives/
│  │  │  ├─ accordion/
│  │  │  ├─ dialog/
│  │  │  ├─ dropdown-menu/
│  │  │  ├─ navigation-menu/
│  │  │  ├─ popover/
│  │  │  ├─ tabs/
│  │  │  └─ tooltip/
│  │  ├─ ui/
│  │  │  ├─ button/
│  │  │  ├─ container/
│  │  │  ├─ figure/
│  │  │  ├─ logo/
│  │  │  ├─ media-frame/
│  │  │  ├─ section/
│  │  │  ├─ section-heading/
│  │  │  └─ video-player/
│  │  ├─ marketing/
│  │  │  ├─ site-header/
│  │  │  ├─ hero/
│  │  │  ├─ product-principles/
│  │  │  ├─ workflow-story/
│  │  │  ├─ mode-showcase/
│  │  │  ├─ use-case-story/
│  │  │  ├─ product-details/
│  │  │  ├─ architecture-diagram/
│  │  │  ├─ open-development/
│  │  │  ├─ download-panel/
│  │  │  └─ site-footer/
│  │  └─ content/
│  │     ├─ code-block/
│  │     ├─ mdx-components/
│  │     └─ release-card/
│  ├─ content/
│  │  ├─ changelog/
│  │  └─ use-cases/
│  ├─ data/
│  │  ├─ architecture.ts
│  │  ├─ changelog.ts
│  │  ├─ home.ts
│  │  ├─ navigation.ts
│  │  ├─ platforms.ts
│  │  ├─ product.ts
│  │  └─ use-cases.ts
│  ├─ lib/
│  │  ├─ cn.ts
│  │  ├─ env.ts
│  │  ├─ site.ts
│  │  ├─ github/
│  │  │  ├─ release-schema.ts
│  │  │  └─ releases.ts
│  │  └─ content/
│  │     └─ mdx.ts
│  ├─ styles/
│  │  ├─ motion.css
│  │  ├─ tokens.css
│  │  ├─ typography.css
│  │  └─ utilities.css
│  └─ types/
│     └─ content.ts
├─ tests/
│  ├─ e2e/
│  └─ visual/
├─ .env.example
├─ eslint.config.mjs
├─ mdx-components.tsx
├─ next.config.ts
├─ package.json
├─ playwright.config.ts
├─ tsconfig.json
├─ vitest.config.ts
└─ vitest.setup.ts
```

---

## 2. 初始化命令

在空目录中运行：

```powershell
npx create-next-app@latest GeoWork-Website `
  --typescript `
  --eslint `
  --app `
  --src-dir `
  --import-alias "@/*" `
  --use-npm

Set-Location GeoWork-Website

npm install motion clsx zod shiki @phosphor-icons/react
npm install @next/mdx @mdx-js/loader @mdx-js/react @types/mdx
npm install @radix-ui/react-accordion @radix-ui/react-dialog
npm install @radix-ui/react-dropdown-menu @radix-ui/react-navigation-menu
npm install @radix-ui/react-popover @radix-ui/react-slot
npm install @radix-ui/react-tabs @radix-ui/react-tooltip
npm install -D vitest jsdom @vitejs/plugin-react @testing-library/react @testing-library/jest-dom
npm install -D @testing-library/user-event @playwright/test @axe-core/playwright
npx playwright install
```

不要安装 Tailwind。若 `create-next-app` 交互式询问 Tailwind，选择 `No`。

---

## 3. package.json

`package.json` 不手写依赖版本；由上面的 npm 命令和 lockfile 固定。只核对 scripts：

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint .",
    "typecheck": "tsc --noEmit",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "test:visual": "playwright test tests/visual",
    "check": "npm run lint && npm run typecheck && npm run test && npm run build"
  }
}
```

---

## 4. 核心配置文件

### 4.1 `next.config.ts`

负责 MDX、图片格式、安全响应头和隐藏 `X-Powered-By`。

```ts
import createMDX from '@next/mdx';
import type { NextConfig } from 'next';

const withMDX = createMDX({
  extension: /\\.mdx?$/,
});

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
];

const nextConfig: NextConfig = {
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
};

export default withMDX(nextConfig);
```

CSP 暂不在这里写死。上线前根据实际脚本、字体和分析工具生成 CSP，避免开发阶段被错误策略阻塞。

### 4.2 `tsconfig.json`

保留 create-next-app 默认项，并确认别名：

```json
{
  "compilerOptions": {
    "strict": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

不要把完整默认文件替换成只有上面几行；这里只表示必须存在的字段。

### 4.3 `vitest.config.ts`

```ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    css: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(rootDir, './src'),
    },
  },
});
```

需要额外安装：

```powershell
npm install -D @vitejs/plugin-react
```

### 4.4 `vitest.setup.ts`

```ts
import '@testing-library/jest-dom/vitest';
```

### 4.5 `playwright.config.ts`

```ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? 'github' : 'html',
  use: {
    baseURL: 'http://127.0.0.1:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  webServer: {
    command: 'npm run dev',
    url: 'http://127.0.0.1:3000',
    reuseExistingServer: !process.env.CI,
  },
  projects: [
    { name: 'desktop-chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile-chromium', use: { ...devices['Pixel 7'] } },
  ],
});
```

---

## 5. 环境变量

### 5.1 `.env.example`

```dotenv
NEXT_PUBLIC_SITE_URL=http://localhost:3000
GITHUB_OWNER=Wanfeng1028
GITHUB_REPO=GeoWork
GITHUB_TOKEN=
NEXT_PUBLIC_ENABLE_ANALYTICS=false
```

### 5.2 `src/lib/env.ts`

```ts
import { z } from 'zod';

const serverSchema = z.object({
  GITHUB_OWNER: z.string().min(1).default('Wanfeng1028'),
  GITHUB_REPO: z.string().min(1).default('GeoWork'),
  GITHUB_TOKEN: z.string().optional(),
});

const publicSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url().default('http://localhost:3000'),
  NEXT_PUBLIC_ENABLE_ANALYTICS: z.enum(['true', 'false']).default('false'),
});

export const serverEnv = serverSchema.parse({
  GITHUB_OWNER: process.env.GITHUB_OWNER,
  GITHUB_REPO: process.env.GITHUB_REPO,
  GITHUB_TOKEN: process.env.GITHUB_TOKEN,
});

export const publicEnv = publicSchema.parse({
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_ENABLE_ANALYTICS: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS,
});
```

`GITHUB_TOKEN` 只能在 Server Component 或 `src/lib/github/` 中使用，禁止通过 `NEXT_PUBLIC_` 暴露。

### 5.3 `src/lib/site.ts`

```ts
import { publicEnv } from '@/lib/env';

export const siteConfig = {
  name: 'GeoWork',
  url: publicEnv.NEXT_PUBLIC_SITE_URL,
  title: 'GeoWork — Geospatial work, in one place.',
  description:
    'GeoWork 将地图、遥感、代码、研究与自动化工作流汇于一个桌面工作台。',
  github: 'https://github.com/Wanfeng1028/GeoWork',
  frontend: 'https://github.com/Wanfeng1028/GeoFrontend2.0',
} as const;
```

### 5.4 `src/lib/cn.ts`

```ts
import clsx, { type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
```

---

## 6. 全局样式

### 6.1 `src/styles/tokens.css`

```css
:root {
  color-scheme: light;

  --color-canvas: #f5f5f2;
  --color-surface: #ffffff;
  --color-surface-subtle: #ecece8;
  --color-ink: #101112;
  --color-ink-muted: #656a70;
  --color-border: rgb(16 17 18 / 12%);
  --color-border-strong: rgb(16 17 18 / 22%);

  --color-dark-canvas: #0d0f12;
  --color-dark-surface: #15181d;
  --color-dark-ink: #f4f5f6;
  --color-dark-muted: #949aa3;
  --color-dark-border: rgb(255 255 255 / 10%);

  --color-accent: #2b8c6b;
  --color-accent-hover: #24775b;
  --color-accent-soft: #dcefe8;
  --color-focus: #1769d2;

  --font-sans: Arial, "PingFang SC", "Microsoft YaHei", sans-serif;
  --font-mono: "SFMono-Regular", Consolas, "Liberation Mono", monospace;

  --text-display: clamp(3.4rem, 7vw, 7.4rem);
  --text-h1: clamp(2.8rem, 5.4vw, 5.6rem);
  --text-h2: clamp(2.2rem, 4.2vw, 4.3rem);
  --text-h3: clamp(1.5rem, 2vw, 2.25rem);
  --text-body-lg: clamp(1.05rem, 1.4vw, 1.28rem);
  --text-body: 1rem;
  --text-small: 0.875rem;

  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-5: 1.5rem;
  --space-6: 2rem;
  --space-7: 3rem;
  --space-8: 4rem;
  --space-9: 6rem;
  --space-10: 8rem;

  --radius-sm: 0.5rem;
  --radius-md: 0.75rem;
  --radius-lg: 1.25rem;
  --radius-xl: 2rem;

  --shadow-media: 0 30px 80px rgb(16 17 18 / 12%);
  --shadow-menu: 0 18px 50px rgb(16 17 18 / 16%);

  --container-wide: 90rem;
  --container-default: 77.5rem;
  --container-content: 55rem;
  --container-text: 45rem;

  --duration-fast: 140ms;
  --duration-normal: 260ms;
  --duration-slow: 520ms;
  --ease-standard: cubic-bezier(0.2, 0.8, 0.2, 1);
}
```

不要使用纯绿色霓虹或蓝绿 Aurora。强调色只用于链接、状态、选中项和少量地图成果。

### 6.2 `src/styles/typography.css`

```css
.display {
  font-size: var(--text-display);
  font-weight: 600;
  line-height: 0.94;
  letter-spacing: -0.065em;
}

.heading1 {
  font-size: var(--text-h1);
  font-weight: 600;
  line-height: 0.98;
  letter-spacing: -0.055em;
}

.heading2 {
  font-size: var(--text-h2);
  font-weight: 600;
  line-height: 1;
  letter-spacing: -0.05em;
}

.bodyLarge {
  font-size: var(--text-body-lg);
  line-height: 1.65;
}
```

### 6.3 `src/styles/motion.css`

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    scroll-behavior: auto !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### 6.4 `src/app/globals.css`

```css
@import '../styles/tokens.css';
@import '../styles/typography.css';
@import '../styles/motion.css';
@import '../styles/utilities.css';

*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  background: var(--color-canvas);
  scroll-padding-top: 5rem;
}

body {
  margin: 0;
  color: var(--color-ink);
  background: var(--color-canvas);
  font-family: var(--font-sans);
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
}

a {
  color: inherit;
  text-decoration: none;
}

button,
input,
textarea,
select {
  font: inherit;
}

img,
video {
  display: block;
  max-width: 100%;
}

:focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: 3px;
}

::selection {
  color: #fff;
  background: var(--color-accent);
}
```

---

## 7. Root Layout 与 SEO

### 7.1 `src/app/layout.tsx`

默认保持 Server Component。不要在这里写 `'use client'`。

```tsx
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import '@/app/globals.css';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    images: ['/opengraph-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: ['/opengraph-image.png'],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
```

### 7.2 `src/app/robots.ts`

```ts
import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/dev/'],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
```

### 7.3 `src/app/sitemap.ts`

```ts
import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site';

const routes = [
  '',
  '/product',
  '/use-cases',
  '/download',
  '/changelog',
  '/about',
  '/privacy',
  '/terms',
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : 0.7,
  }));
}
```

---

## 8. 基础 UI 代码

### 8.1 Button

#### `src/components/ui/button/Button.tsx`

```tsx
import { Slot } from '@radix-ui/react-slot';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/cn';
import styles from './Button.module.css';

type Variant = 'primary' | 'secondary' | 'quiet' | 'text';
type Size = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: Variant;
  size?: Size;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
}

export function Button({
  asChild = false,
  variant = 'secondary',
  size = 'md',
  className,
  leadingIcon,
  trailingIcon,
  children,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      className={cn(styles.button, styles[variant], styles[size], className)}
      {...props}
    >
      {leadingIcon ? <span aria-hidden>{leadingIcon}</span> : null}
      <span>{children}</span>
      {trailingIcon ? <span aria-hidden>{trailingIcon}</span> : null}
    </Comp>
  );
}
```

#### `src/components/ui/button/Button.module.css`

```css
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.55rem;
  border: 1px solid transparent;
  border-radius: var(--radius-md);
  font-weight: 600;
  cursor: pointer;
  transition:
    color var(--duration-fast) var(--ease-standard),
    background var(--duration-fast) var(--ease-standard),
    border-color var(--duration-fast) var(--ease-standard),
    transform var(--duration-fast) var(--ease-standard);
}

.button:hover:not(:disabled) {
  transform: translateY(-1px);
}

.button:active:not(:disabled) {
  transform: translateY(0);
}

.button:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.sm { min-height: 2.25rem; padding: 0 0.85rem; font-size: 0.875rem; }
.md { min-height: 2.75rem; padding: 0 1.1rem; font-size: 0.9375rem; }
.lg { min-height: 3.25rem; padding: 0 1.35rem; font-size: 1rem; }

.primary {
  color: #fff;
  background: var(--color-ink);
}
.primary:hover:not(:disabled) { background: #292b2f; }

.secondary {
  color: var(--color-ink);
  background: var(--color-surface);
  border-color: var(--color-border);
}
.secondary:hover:not(:disabled) { border-color: var(--color-border-strong); }

.quiet {
  color: var(--color-ink);
  background: transparent;
}
.quiet:hover:not(:disabled) { background: rgb(16 17 18 / 6%); }

.text {
  min-height: auto;
  padding: 0;
  color: var(--color-ink);
  background: transparent;
  border-radius: 0;
}
```

按钮不是默认胶囊。下载平台筛选等紧凑控件另建 Toggle/SegmentedControl，不用 Button 强行承担。

### 8.2 Container

#### `src/components/ui/container/Container.tsx`

```tsx
import type { ComponentPropsWithoutRef, ElementType } from 'react';
import { cn } from '@/lib/cn';
import styles from './Container.module.css';

type Width = 'wide' | 'default' | 'content' | 'text';

type Props<T extends ElementType> = {
  as?: T;
  width?: Width;
} & Omit<ComponentPropsWithoutRef<T>, 'as'>;

export function Container<T extends ElementType = 'div'>({
  as,
  width = 'default',
  className,
  ...props
}: Props<T>) {
  const Comp = as ?? 'div';
  return <Comp className={cn(styles.container, styles[width], className)} {...props} />;
}
```

#### `Container.module.css`

```css
.container {
  width: min(calc(100% - 2rem), var(--container-default));
  margin-inline: auto;
}
.wide { max-width: var(--container-wide); }
.default { max-width: var(--container-default); }
.content { max-width: var(--container-content); }
.text { max-width: var(--container-text); }

@media (min-width: 768px) {
  .container { width: min(calc(100% - 4rem), var(--container-default)); }
}
```

### 8.3 Section

`Section.tsx` 只负责语义、背景和间距，不放标题文案。

```tsx
import type { ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/cn';
import styles from './Section.module.css';

type Tone = 'canvas' | 'white' | 'dark';
type Spacing = 'compact' | 'default' | 'large';

interface SectionProps extends ComponentPropsWithoutRef<'section'> {
  tone?: Tone;
  spacing?: Spacing;
}

export function Section({
  tone = 'canvas',
  spacing = 'default',
  className,
  ...props
}: SectionProps) {
  return <section className={cn(styles.section, styles[tone], styles[spacing], className)} {...props} />;
}
```

---

## 9. Radix Primitive 范式

### 9.1 Tabs

#### `src/components/primitives/tabs/Tabs.tsx`

```tsx
'use client';

import * as TabsPrimitive from '@radix-ui/react-tabs';
import { forwardRef } from 'react';
import type * as React from 'react';
import { cn } from '@/lib/cn';
import styles from './Tabs.module.css';

export const Tabs = TabsPrimitive.Root;

export const TabsList = forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List ref={ref} className={cn(styles.list, className)} {...props} />
));
TabsList.displayName = 'TabsList';

export const TabsTrigger = forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(styles.trigger, className)}
    {...props}
  />
));
TabsTrigger.displayName = 'TabsTrigger';

export const TabsContent = forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(styles.content, className)}
    {...props}
  />
));
TabsContent.displayName = 'TabsContent';
```

#### `Tabs.module.css`

```css
.list {
  display: flex;
  gap: 0.25rem;
  padding: 0.25rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: rgb(255 255 255 / 72%);
}

.trigger {
  min-height: 2.5rem;
  padding: 0 0.9rem;
  border: 0;
  border-radius: 0.55rem;
  color: var(--color-ink-muted);
  background: transparent;
  cursor: pointer;
}

.trigger[data-state='active'] {
  color: var(--color-ink);
  background: var(--color-surface);
  box-shadow: 0 1px 3px rgb(16 17 18 / 8%);
}

.content:focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: 4px;
}
```

Dialog、Dropdown、Tooltip、Accordion 的实现遵循同一原则：

- `Root/Trigger/Content` 等 Radix 结构在 primitive 文件中封装。
- `Portal`、Overlay、焦点返回由 Radix 处理。
- CSS 只使用 GeoWork Token。
- 测试键盘操作，不测试 Radix 内部实现。

---

## 10. 数据文件

### 10.1 `src/data/navigation.ts`

```ts
export const mainNavigation = [
  { label: '产品', href: '/product' },
  { label: '工作方式', href: '/#workflow' },
  { label: '使用案例', href: '/use-cases' },
  { label: '开发者', href: 'https://github.com/Wanfeng1028/GeoWork', external: true },
  { label: '更新日志', href: '/changelog' },
] as const;
```

### 10.2 `src/data/home.ts`

所有首页文案集中管理，避免散落在 JSX：

```ts
export const homeContent = {
  hero: {
    eyebrow: 'GeoWork',
    title: '地图、遥感、代码与研究，汇于一个工作台。',
    description:
      'GeoWork 是面向 GIS、遥感与空间研究的桌面工作台，让项目、工具、数据和成果保持在同一个上下文中。',
    primaryCta: { label: '下载 GeoWork', href: '/download' },
    secondaryCta: { label: '了解产品', href: '/product' },
  },
  workflow: {
    title: '从项目开始，以可继续工作的成果结束。',
  },
} as const;
```

这里不使用“重新想象”“赋能”“释放潜力”等通用营销套话作为唯一信息。

### 10.3 `src/data/use-cases.ts`

```ts
export interface UseCaseSummary {
  slug: string;
  title: string;
  description: string;
  result: string;
  image: string;
  imageAlt: string;
}

export const useCases: UseCaseSummary[] = [
  {
    slug: 'urban-expansion',
    title: '城市扩张与土地利用变化',
    description: '组织多时相影像、变化检测、统计结果和制图输出。',
    result: '变化图、面积统计、方法记录与报告草稿',
    image: '/media/use-cases/urban-expansion/result.webp',
    imageAlt: '城市扩张分析结果地图与面积统计图',
  },
  // 其余案例必须有真实素材后再添加。
];
```

---

## 11. Header

### 11.1 文件拆分

```text
site-header/
├─ SiteHeader.tsx          # Server Component，输出桌面导航和 MobileMenu
├─ MobileMenu.tsx          # Client Component，Radix Dialog
├─ SiteHeader.module.css
└─ SiteHeader.test.tsx
```

### 11.2 `SiteHeader.tsx`

```tsx
import Link from 'next/link';
import { GithubLogoIcon } from '@phosphor-icons/react/ssr';
import { mainNavigation } from '@/data/navigation';
import { Button } from '@/components/ui/button/Button';
import { Container } from '@/components/ui/container/Container';
import { Logo } from '@/components/ui/logo/Logo';
import { MobileMenu } from './MobileMenu';
import styles from './SiteHeader.module.css';

export function SiteHeader() {
  return (
    <header className={styles.header}>
      <Container className={styles.inner}>
        <Link href="/" aria-label="GeoWork 首页" className={styles.brand}>
          <Logo />
        </Link>

        <nav className={styles.desktopNav} aria-label="主导航">
          {mainNavigation.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              target={item.external ? '_blank' : undefined}
              rel={item.external ? 'noreferrer' : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className={styles.actions}>
          <Button asChild variant="quiet" size="sm">
            <a href="https://github.com/Wanfeng1028/GeoWork" target="_blank" rel="noreferrer">
              <GithubLogoIcon aria-hidden /> GitHub
            </a>
          </Button>
          <Button asChild variant="primary" size="sm">
            <Link href="/download">下载</Link>
          </Button>
          <MobileMenu />
        </div>
      </Container>
    </header>
  );
}
```

注意：若 Phosphor 的 SSR 导入路径在安装版本中不同，应按官方导出方式调整，但必须避免为了一个图标把整个 Header 变为 Client Component。

---

## 12. Hero

### 12.1 文件

```text
hero/
├─ Hero.tsx
└─ Hero.module.css
```

Hero 为 Server Component，不需要 Motion。首屏先靠排版、真实媒体和空间关系成立。

### 12.2 `Hero.tsx`

```tsx
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRightIcon } from '@phosphor-icons/react/ssr';
import { homeContent } from '@/data/home';
import { Button } from '@/components/ui/button/Button';
import { Container } from '@/components/ui/container/Container';
import { MediaFrame } from '@/components/ui/media-frame/MediaFrame';
import styles from './Hero.module.css';

export function Hero() {
  const { hero } = homeContent;

  return (
    <section className={styles.hero} aria-labelledby="home-title">
      <Container width="wide" className={styles.grid}>
        <div className={styles.copy}>
          <p className={styles.productName}>{hero.eyebrow}</p>
          <h1 id="home-title">{hero.title}</h1>
          <p className={styles.description}>{hero.description}</p>
          <div className={styles.actions}>
            <Button asChild variant="primary" size="lg">
              <Link href={hero.primaryCta.href}>{hero.primaryCta.label}</Link>
            </Button>
            <Button asChild variant="text" size="lg" trailingIcon={<ArrowRightIcon />}>
              <Link href={hero.secondaryCta.href}>{hero.secondaryCta.label}</Link>
            </Button>
          </div>
          <p className={styles.status}>Developer Preview · 查看当前可用平台</p>
        </div>

        <MediaFrame className={styles.media} ratio="16:10" tone="dark">
          <Image
            src="/media/hero/geowork-workspace.webp"
            alt="GeoWork 工作台，包含项目导航、地图画布、代码与成果面板"
            fill
            priority
            sizes="(max-width: 900px) 100vw, 58vw"
          />
        </MediaFrame>
      </Container>
    </section>
  );
}
```

### 12.3 `Hero.module.css`

```css
.hero {
  padding: clamp(5rem, 10vw, 9rem) 0 clamp(5rem, 9vw, 8rem);
  overflow: clip;
}

.grid {
  display: grid;
  grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
  gap: clamp(2.5rem, 5vw, 6rem);
  align-items: center;
}

.copy {
  max-width: 38rem;
}

.productName {
  margin: 0 0 1.4rem;
  color: var(--color-ink-muted);
  font-size: 0.875rem;
  font-weight: 650;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.copy h1 {
  margin: 0;
  font-size: var(--text-h1);
  line-height: 0.98;
  letter-spacing: -0.055em;
  font-weight: 600;
}

.description {
  max-width: 34rem;
  margin: 1.8rem 0 0;
  color: var(--color-ink-muted);
  font-size: var(--text-body-lg);
  line-height: 1.65;
}

.actions {
  display: flex;
  align-items: center;
  gap: 1.15rem;
  margin-top: 2rem;
  flex-wrap: wrap;
}

.status {
  margin: 1rem 0 0;
  color: var(--color-ink-muted);
  font-size: 0.8125rem;
}

.media {
  min-height: 34rem;
}

@media (max-width: 900px) {
  .grid {
    grid-template-columns: 1fr;
  }

  .copy {
    max-width: 46rem;
  }

  .media {
    min-height: auto;
  }
}
```

禁止在 Hero 增加：Aurora、霓虹绿描边、渐变标题、AI workspace 胶囊、假聊天记录。

---

## 13. 首页组合

### 13.1 `src/app/(marketing)/layout.tsx`

```tsx
import type { ReactNode } from 'react';
import { SiteHeader } from '@/components/marketing/site-header/SiteHeader';
import { SiteFooter } from '@/components/marketing/site-footer/SiteFooter';

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </>
  );
}
```

### 13.2 `src/app/(marketing)/page.tsx`

只负责按顺序组合 section，不在这里写复杂 JSX。

```tsx
import { Hero } from '@/components/marketing/hero/Hero';
import { ProductPrinciples } from '@/components/marketing/product-principles/ProductPrinciples';
import { WorkflowStory } from '@/components/marketing/workflow-story/WorkflowStory';
import { ModeShowcase } from '@/components/marketing/mode-showcase/ModeShowcase';
import { UseCaseStory } from '@/components/marketing/use-case-story/UseCaseStory';
import { ProductDetails } from '@/components/marketing/product-details/ProductDetails';
import { ArchitectureDiagram } from '@/components/marketing/architecture-diagram/ArchitectureDiagram';
import { OpenDevelopment } from '@/components/marketing/open-development/OpenDevelopment';
import { DownloadPanel } from '@/components/marketing/download-panel/DownloadPanel';

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProductPrinciples />
      <WorkflowStory />
      <ModeShowcase />
      <UseCaseStory />
      <ProductDetails />
      <ArchitectureDiagram />
      <OpenDevelopment />
      <DownloadPanel />
    </>
  );
}
```

每个 section 的 DOM、CSS 和媒体在自己的目录中维护。

---

## 14. Work / Code / Map 模式

### 14.1 文件

```text
mode-showcase/
├─ ModeShowcase.tsx
├─ ModeShowcase.client.tsx
├─ ModeShowcase.module.css
└─ ModeShowcase.test.tsx
```

`ModeShowcase.tsx` 负责标题和 Server 数据；`ModeShowcase.client.tsx` 只负责 Radix Tabs。不要整节都写成 Client Component。

### 14.2 Client 组件核心代码

```tsx
'use client';

import Image from 'next/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/primitives/tabs/Tabs';
import styles from './ModeShowcase.module.css';

const modes = [
  {
    id: 'work',
    label: 'Work',
    description: '组织任务、工具、文件和成果。',
    image: '/media/modes/work.webp',
    alt: 'GeoWork Work 模式界面',
  },
  {
    id: 'code',
    label: 'Code',
    description: '编写、运行和检查地理空间代码。',
    image: '/media/modes/code.webp',
    alt: 'GeoWork Code 模式界面',
  },
  {
    id: 'map',
    label: 'Map',
    description: '查看图层、范围、结果和空间关系。',
    image: '/media/modes/map.webp',
    alt: 'GeoWork Map 模式界面',
  },
] as const;

export function ModeShowcaseClient() {
  return (
    <Tabs defaultValue="work" orientation="vertical" className={styles.tabs}>
      <TabsList aria-label="GeoWork 工作模式" className={styles.list}>
        {modes.map((mode) => (
          <TabsTrigger key={mode.id} value={mode.id} className={styles.trigger}>
            <strong>{mode.label}</strong>
            <span>{mode.description}</span>
          </TabsTrigger>
        ))}
      </TabsList>

      <div className={styles.panels}>
        {modes.map((mode) => (
          <TabsContent key={mode.id} value={mode.id} className={styles.panel}>
            <Image src={mode.image} alt={mode.alt} fill sizes="(max-width: 900px) 100vw, 65vw" />
          </TabsContent>
        ))}
      </div>
    </Tabs>
  );
}
```

切换动画只做 180–260ms 的淡入和轻微位移，不做图片飞入、3D 翻转或光线扫描。

---

## 15. GitHub Release 数据层

### 15.1 `src/lib/github/release-schema.ts`

```ts
import { z } from 'zod';

export const releaseAssetSchema = z.object({
  id: z.number(),
  name: z.string(),
  browser_download_url: z.string().url(),
  size: z.number(),
  content_type: z.string(),
});

export const githubReleaseSchema = z.object({
  tag_name: z.string(),
  name: z.string().nullable(),
  body: z.string().nullable(),
  html_url: z.string().url(),
  published_at: z.string().nullable(),
  prerelease: z.boolean(),
  draft: z.boolean(),
  assets: z.array(releaseAssetSchema),
});

export const githubReleaseListSchema = z.array(githubReleaseSchema);
export type GithubRelease = z.infer<typeof githubReleaseSchema>;
```

### 15.2 `src/lib/github/releases.ts`

```ts
import { serverEnv } from '@/lib/env';
import { githubReleaseListSchema, type GithubRelease } from './release-schema';

const fallbackRelease: GithubRelease = {
  tag_name: 'v0.4.x-dev',
  name: 'Developer Preview',
  body: 'GeoWork 当前处于开发阶段。请前往 GitHub 查看最新构建与说明。',
  html_url: 'https://github.com/Wanfeng1028/GeoWork/releases',
  published_at: null,
  prerelease: true,
  draft: false,
  assets: [],
};

export async function getLatestRelease(): Promise<GithubRelease> {
  const headers: HeadersInit = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  };

  if (serverEnv.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${serverEnv.GITHUB_TOKEN}`;
  }

  try {
    const response = await fetch(
      `https://api.github.com/repos/${serverEnv.GITHUB_OWNER}/${serverEnv.GITHUB_REPO}/releases?per_page=10`,
      {
        headers,
        next: { revalidate: 3600 },
      },
    );

    if (!response.ok) return fallbackRelease;

    const json: unknown = await response.json();
    const parsed = githubReleaseListSchema.safeParse(json);
    if (!parsed.success) return fallbackRelease;

    const release = parsed.data.find((item) => !item.draft);
    return release ?? fallbackRelease;
  } catch {
    return fallbackRelease;
  }
}
```

下载页必须清晰区分：

- 官方 Release 资产。
- 只有源码、没有安装包。
- Developer Preview。
- 平台未支持。

不得生成不存在的 Windows / macOS 下载链接。

---

## 16. DownloadPanel

`DownloadPanel.tsx` 为 async Server Component，调用 `getLatestRelease()`。平台资产匹配写在 `src/data/platforms.ts`：

```ts
export const platformRules = [
  {
    id: 'windows-x64',
    label: 'Windows x64',
    patterns: [/win/i, /x64/i, /\.exe$/i, /\.msi$/i],
  },
  {
    id: 'macos-arm64',
    label: 'macOS Apple Silicon',
    patterns: [/mac/i, /arm64/i, /\.dmg$/i],
  },
] as const;
```

匹配逻辑必须要求多个条件合理满足，不能看到 `.zip` 就判断为安装包。若无资产，主 CTA 改为“查看 GitHub Releases”。

---

## 17. MDX 内容

### 17.1 `mdx-components.tsx`

```tsx
import type { MDXComponents } from 'mdx/types';
import { CodeBlock } from '@/components/content/code-block/CodeBlock';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    pre: CodeBlock,
    ...components,
  };
}
```

### 17.2 Changelog 数据

不在运行时遍历文件系统。V1 使用显式索引，保证类型与排序稳定：

```ts
export const changelogEntries = [
  {
    slug: 'v0-4-developer-preview',
    title: 'GeoWork v0.4 Developer Preview',
    date: '2026-07-14',
    summary: '完善桌面工作台、运行时和地理空间 Worker 的开发版能力。',
    load: () => import('@/content/changelog/v0-4-developer-preview.mdx'),
  },
] as const;
```

`changelog/[slug]/page.tsx` 根据 slug 查找，未找到时调用 `notFound()`。

---

## 18. 二级页面职责

### `/product`

写：产品工作区、核心对象、工作模式、工具连接、Local First。  
不写：价格、企业能力、已经完成的团队协作。

### `/use-cases`

写：真实案例列表和成果。  
每个案例必须包含：问题、输入、过程、工具、输出、限制、素材来源。

### `/download`

写：当前版本、支持平台、安装要求、Release Notes、开发状态。  
不能把 README 的 `npm run dev` 当普通用户安装方式。

### `/changelog`

写：按时间排序的正式变更。  
不能自动把每次 commit 展示为更新日志。

### `/about`

写：产品动机、开源方式、许可边界、仓库关系。  
不能虚构团队成员、公司主体或融资信息。

### `/privacy` 与 `/terms`

在没有法律主体前标注草案，并只描述网站真实收集的数据。上线前需人工审核。

---

## 19. 测试代码

### 19.1 Button 单元测试

`src/components/ui/button/Button.test.tsx`

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

test('calls onClick when enabled', async () => {
  const user = userEvent.setup();
  const onClick = vi.fn();
  render(<Button onClick={onClick}>下载</Button>);

  await user.click(screen.getByRole('button', { name: '下载' }));
  expect(onClick).toHaveBeenCalledTimes(1);
});

test('does not call onClick when disabled', async () => {
  const user = userEvent.setup();
  const onClick = vi.fn();
  render(<Button disabled onClick={onClick}>下载</Button>);

  await user.click(screen.getByRole('button', { name: '下载' }));
  expect(onClick).not.toHaveBeenCalled();
});
```

### 19.2 首页 E2E

`tests/e2e/home.spec.ts`

```ts
import { expect, test } from '@playwright/test';

test('homepage communicates product and exposes primary actions', async ({ page }) => {
  await page.goto('/');

  await expect(
    page.getByRole('heading', {
      level: 1,
      name: '地图、遥感、代码与研究，汇于一个工作台。',
    }),
  ).toBeVisible();

  await expect(page.getByRole('link', { name: '下载 GeoWork' })).toBeVisible();
  await expect(page.getByAltText(/GeoWork 工作台/)).toBeVisible();
});
```

### 19.3 可访问性

`tests/e2e/accessibility.spec.ts`

```ts
import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

for (const path of ['/', '/product', '/use-cases', '/download']) {
  test(`${path} has no automatically detectable accessibility violations`, async ({ page }) => {
    await page.goto(path);
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  });
}
```

### 19.4 视觉回归

`tests/visual/home.visual.spec.ts`

```ts
import { expect, test } from '@playwright/test';

const viewports = [
  { width: 390, height: 844 },
  { width: 768, height: 1024 },
  { width: 1280, height: 800 },
  { width: 1440, height: 1000 },
  { width: 1920, height: 1080 },
];

for (const viewport of viewports) {
  test(`home ${viewport.width}x${viewport.height}`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.goto('/');
    await expect(page).toHaveScreenshot(`home-${viewport.width}.png`, {
      fullPage: true,
      animations: 'disabled',
    });
  });
}
```

---

## 20. GitHub Actions

`.github/workflows/ci.yml`

```yaml
name: CI

on:
  pull_request:
  push:
    branches: [main]

jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: lts/*
          cache: npm
      - run: npm ci
      - run: npm run lint
      - run: npm run typecheck
      - run: npm run test
      - run: npm run build

  e2e:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: lts/*
          cache: npm
      - run: npm ci
      - run: npx playwright install --with-deps chromium
      - run: npm run test:e2e
```

Vercel 负责 PR Preview 和 main Production。CI 失败时不合并。

---

## 21. 每个营销组件应写什么

| 目录 | TSX 代码 | CSS 代码 | 交互/测试 |
|---|---|---|---|
| `site-header` | Logo、主导航、GitHub、下载、移动菜单 | 透明/实色状态、断点、焦点 | Mobile Dialog、导航 E2E |
| `hero` | 左文案、右真实产品媒体 | 5:7 栅格、响应式，不发光 | 无客户端交互；视觉回归 |
| `product-principles` | 三条产品原则，以分隔线组织 | 不用三张同款卡片 | 无 |
| `workflow-story` | Project/Organize/Work/Deliver | sticky 双栏与进度线 | Motion useScroll；reduced motion |
| `mode-showcase` | Work/Code/Map | 标签与大媒体面板 | Radix Tabs、键盘测试 |
| `use-case-story` | 案例问题、过程、成果 | 交替大图，不做九宫格 | 可选 Embla，但默认不用 |
| `product-details` | 地图、代码、终端、报告协同 | Linear 式细线与 FIG 编号 | 局部媒体切换 |
| `architecture-diagram` | Desktop/Go/Python/Tools/Skills | 中性深色、线性关系 | 无 3D/粒子 |
| `open-development` | GitHub、许可、路线图、开发状态 | 白底文本与仓库信息 | 外链 |
| `download-panel` | Release、平台、系统要求 | 清晰状态和错误回退 | 数据层测试、下载 E2E |
| `site-footer` | 产品、资源、法律、仓库 | 4 列到移动端单列 | 链接检查 |

---

## 22. 真实素材替换规则

开发阶段允许以下临时状态：

```tsx
<MediaFrame data-asset-status="missing">
  <p>待替换：GeoFrontend2.0 Work 模式 1440×900 截图</p>
</MediaFrame>
```

但必须同时在 `CONTENT-ASSETS.md` 标记缺口。禁止用 AI 生成的假桌面截图替代真实产品。

图片规范：

- Hero：至少 1800×1125，WebP/AVIF，建议小于 500KB。
- 模式图：至少 1600×1000。
- 案例主图：至少 1800px 宽。
- OG：1200×630。
- 所有非装饰图必须写具体 alt。

视频：

- 无声自动播放必须 `muted playsInline loop`。
- 提供 poster、WebM、MP4。
- 用户设置 reduced motion 时显示 poster，不自动播放。
- 不把浏览器缩放动画烘焙得过于夸张。

---

## 23. 性能边界

首页初始加载目标：

- 首屏不加载 Cesium、MapLibre、Monaco、ECharts、Plotly。
- Hero 只加载一张优先级图片或一段短视频。
- 非首屏图片 `loading="lazy"`。
- Client Component 只用于移动菜单、Tabs、视频控制、滚动进度。
- 不因 Motion 把整个页面标记为 Client Component。
- 第三方分析默认关闭。

---

## 24. 参考与依据

实现时优先核对官方文档：

- Next.js App Router、文件路由、Server/Client Components、CSS Modules、Metadata、MDX。
- Radix Primitives 的 Tabs、Dialog、Navigation Menu 和 styling 指南。
- Motion for React 的 scroll 与 reduced motion。
- Playwright 的 role locator、视觉对比和 axe 可访问性测试。
- Vercel 的 Git Preview Deployment。

本开发文档使用的产品事实来自 GeoWork 当前公开仓库：当前为 `v0.4.x-dev`，桌面层为 Electron + React + TypeScript，核心为 Go Runtime，地理空间 Worker 为 Python FastAPI；安装平台和 Release 资产必须在开发时重新读取仓库，不得仅依赖本文快照。
