# GeoOfficial

GeoWork 官方网站源码。

## 项目关系

- **GeoWork**：完整桌面软件与后端
- **GeoFrontend2.0**：桌面端前端重构
- **GeoOfficial**：官方网站

## 技术栈

- Next.js（App Router）
- React
- TypeScript
- CSS Modules + CSS Custom Properties
- Radix UI Primitives
- Motion
- MDX
- Shiki
- Vitest
- Playwright

## 本地运行

```bash
npm install
npm run dev
```

## 环境变量

复制 `.env.example` 为 `.env.local`。生产环境必须设置 `NEXT_PUBLIC_SITE_URL` 为公开域名。

## 测试

```bash
npm run lint
npm run typecheck
npm run test
npm run test:e2e:prod
npm run test:visual
npm run check
npm run check:release
```

## 素材状态

正式上线前必须替换 `public/media/placeholders/` 下的占位 SVG 为真实 GeoFrontend2.0 截图（WebP），并将 `src/data/media.ts` 中所有 `status` 改为 `'final'`。运行 `npm run verify:assets:release` 验证。

## 文档

查看 `doc/` 目录。

## License

许可待项目负责人确认。
