/**
 * Attio 截图采集脚本
 *
 * 功能（v2.5 计划 §4.3–§4.7）：
 *   - 读取 routes.json，按模板类型选取代表性页面
 *   - 每页至少采集 1440×900 和 390×844 full-page 截图
 *   - 核心页面增加 1920×1080 和 1024×768
 *   - 每页保存 full-page + top + middle + bottom
 *   - 核心长页拍摄 0%/25%/50%/75%/100% 滚动位置
 *   - 交互状态：Platform/Resources Mega Menu 打开、Header 滚动后
 *   - 文件命名：<route-id>__<viewport>__<state>__<date>.png
 *
 * 用法：
 *   node scripts/reference/capture-attio.mjs              # 执行采集（需 Playwright）
 *   node scripts/reference/capture-attio.mjs --plan-only   # 仅生成采集计划
 *   node scripts/reference/capture-attio.mjs --filter home # 仅采集匹配 routeId 的页面
 */
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { existsSync } from 'node:fs';

const ROUTES_PATH = resolve('docs/reference/attio/manifest/routes.json');
const SCREENSHOTS_DIR = resolve('docs/reference/attio/screenshots');
const STATES_DIR = resolve('docs/reference/attio/states');
const PLAN_PATH = resolve('docs/reference/attio/manifest/capture-plan.json');

const TODAY = new Date().toISOString().slice(0, 10);

// 视口定义
const VIEWPORTS = {
  'desktop-1440': { width: 1440, height: 900 },
  'desktop-1920': { width: 1920, height: 1080 },
  'tablet-1024': { width: 1024, height: 768 },
  'mobile-390': { width: 390, height: 844 },
};

// 核心页面 routeId（需要 4 视口 + 滚动位置 + 交互状态）
const CORE_ROUTE_IDS = new Set([
  'home',
  'platform-ask',
  'platform-ai',
  'platform-data',
  'platform-workflows',
  'platform-sequences',
  'platform-call-intelligence',
  'platform-reporting',
  'platform-developers',
  'pricing',
  'customers',
  'apps',
  'download',
  'redefine',
  'changelog',
  'blog',
  'engineering-blog',
  'help',
  'careers',
  'partners',
  'startups',
]);

// 每种详情模板选取的代表性 routeId 数量上限
const DETAIL_SAMPLE_LIMIT = {
  'app-detail': 3,
  'blog-detail': 2,
  'customer-detail': 3,
  'changelog-detail': 3,
  'engineering-detail': 2,
  help: 3,
  legal: 2,
  'solutions-detail': 2,
  other: 0, // 跳过 other 类型
};

/**
 * @typedef {Object} CaptureTarget
 * @property {string} routeId
 * @property {string} url
 * @property {string} path
 * @property {string} pageType
 * @property {string[]} viewports
 * @property {string[]} shots - ['full-page', 'top', 'middle', 'bottom']
 * @property {string[]} [scrollPositions] - ['0', '25', '50', '75', '100']
 * @property {string[]} [interactions] - ['platform-menu-open', 'resources-menu-open', 'scrolled-header']
 * @property {boolean} core
 */

/**
 * 从 routes.json 选取代表性采集目标
 * @param {Array<{routeId: string; url: string; path: string; pageType: string; status: number}>} routes
 * @returns {CaptureTarget[]}
 */
function selectCaptureTargets(routes) {
  /** @type {Map<string, Array<typeof routes[number]>>} */
  const byType = new Map();
  for (const route of routes) {
    if (route.status !== 200 && route.status !== 0) continue;
    if (!byType.has(route.pageType)) byType.set(route.pageType, []);
    byType.get(route.pageType)?.push(route);
  }

  /** @type {CaptureTarget[]} */
  const targets = [];
  /** @param {typeof routes[number]} route @param {boolean} core */
  const makeTarget = (route, core) => {
    const viewports = core
      ? ['desktop-1440', 'desktop-1920', 'tablet-1024', 'mobile-390']
      : ['desktop-1440', 'mobile-390'];
    /** @type {CaptureTarget} */
    const target = {
      routeId: route.routeId,
      url: route.url,
      path: route.path,
      pageType: route.pageType,
      viewports,
      shots: ['full-page', 'top', 'middle', 'bottom'],
      core,
    };
    if (core) {
      target.scrollPositions = ['0', '25', '50', '75', '100'];
      if (route.routeId === 'home' || route.path.startsWith('/platform/')) {
        target.interactions = ['platform-menu-open', 'resources-menu-open', 'scrolled-header'];
      }
    }
    return target;
  };

  // 1. 核心页面
  for (const route of routes) {
    if (CORE_ROUTE_IDS.has(route.routeId)) {
      targets.push(makeTarget(route, true));
    }
  }

  // 2. 代表性详情页（每种类型取前 N 个）
  for (const [pageType, limit] of Object.entries(DETAIL_SAMPLE_LIMIT)) {
    if (limit <= 0) continue;
    const candidates = byType.get(pageType) || [];
    // 排除已选为核心页面的
    const remaining = candidates.filter((r) => !targets.some((t) => t.routeId === r.routeId));
    for (const route of remaining.slice(0, limit)) {
      targets.push(makeTarget(route, false));
    }
  }

  return targets;
}

/**
 * 生成文件名（§4.7）
 * @param {string} routeId
 * @param {string} viewport
 * @param {string} state
 * @returns {string}
 */
function makeFileName(routeId, viewport, state) {
  return `${routeId}__${viewport}__${state}__${TODAY}.png`;
}

/**
 * 生成采集计划
 * @param {CaptureTarget[]} targets
 * @returns {Object}
 */
function buildPlan(targets) {
  /** @type {Array<{routeId: string; url: string; file: string; viewport: string; state: string}>} */
  const shots = [];
  for (const target of targets) {
    for (const vp of target.viewports) {
      for (const shot of target.shots) {
        shots.push({
          routeId: target.routeId,
          url: target.url,
          viewport: vp,
          state: shot,
          file: makeFileName(target.routeId, vp, shot),
          dir: join(SCREENSHOTS_DIR, vp),
        });
      }
      if (target.scrollPositions) {
        for (const pos of target.scrollPositions) {
          shots.push({
            routeId: target.routeId,
            url: target.url,
            viewport: vp,
            state: `scroll-${pos}`,
            file: makeFileName(target.routeId, vp, `scroll-${pos}`),
            dir: join(SCREENSHOTS_DIR, vp),
          });
        }
      }
    }
    if (target.interactions) {
      for (const interaction of target.interactions) {
        shots.push({
          routeId: target.routeId,
          url: target.url,
          viewport: 'desktop-1440',
          state: interaction,
          file: makeFileName(target.routeId, 'desktop-1440', interaction),
          dir: join(STATES_DIR, interaction.replace('-open', '').replace('-header', '-header')),
        });
      }
    }
  }
  return {
    generatedAt: new Date().toISOString(),
    totalShots: shots.length,
    totalTargets: targets.length,
    targets: targets.map((t) => ({
      routeId: t.routeId,
      url: t.url,
      pageType: t.pageType,
      core: t.core,
      viewports: t.viewports,
      shots: t.shots,
      ...(t.scrollPositions ? { scrollPositions: t.scrollPositions } : {}),
      ...(t.interactions ? { interactions: t.interactions } : {}),
    })),
    shots,
  };
}

/**
 * 执行采集（使用 Playwright）
 * @param {CaptureTarget[]} targets
 */
async function executeCapture(targets) {
  const { chromium } = await import('playwright');
  // 优先使用系统 Edge（channel: 'msedge'），避免 Playwright 自带 Chromium 的 DLL 问题
  let browser;
  try {
    browser = await chromium.launch({ headless: true, channel: 'msedge' });
    console.log('Browser launched (channel: msedge).');
  } catch {
    console.warn('msedge channel unavailable, falling back to bundled chromium');
    browser = await chromium.launch({ headless: true });
  }
  console.log(`Capturing ${targets.length} targets...`);

  for (const target of targets) {
    for (const viewportName of target.viewports) {
      const vp = VIEWPORTS[viewportName];
      const context = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
        deviceScaleFactor: 1,
        locale: 'en-US',
      });
      const page = await context.newPage();
      try {
        // 确保 URL 使用 https
        const captureUrl = target.url.replace(/^http:\/\/attio\.com/, 'https://attio.com');
        console.log(`  [${viewportName}] ${captureUrl}`);
        await page.goto(captureUrl, { waitUntil: 'domcontentloaded', timeout: 20_000 });
        await page.waitForTimeout(2000);

        const dir = join(SCREENSHOTS_DIR, viewportName);
        await mkdir(dir, { recursive: true });

        // full-page
        await page.screenshot({
          path: join(dir, makeFileName(target.routeId, viewportName, 'full-page')),
          fullPage: true,
        });

        // top
        await page.evaluate(() => window.scrollTo(0, 0));
        await page.waitForTimeout(300);
        await page.screenshot({
          path: join(dir, makeFileName(target.routeId, viewportName, 'top')),
        });

        // middle
        const midY = await page.evaluate(() => document.body.scrollHeight / 2);
        await page.evaluate((y) => window.scrollTo(0, y), midY);
        await page.waitForTimeout(300);
        await page.screenshot({
          path: join(dir, makeFileName(target.routeId, viewportName, 'middle')),
        });

        // bottom
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await page.waitForTimeout(300);
        await page.screenshot({
          path: join(dir, makeFileName(target.routeId, viewportName, 'bottom')),
        });

        // scroll positions
        if (target.scrollPositions) {
          for (const pos of target.scrollPositions) {
            const pct = Number(pos) / 100;
            const y = await page.evaluate(
              (p) => (document.body.scrollHeight - window.innerHeight) * p,
              pct,
            );
            await page.evaluate((yVal) => window.scrollTo(0, yVal), y);
            await page.waitForTimeout(300);
            await page.screenshot({
              path: join(dir, makeFileName(target.routeId, viewportName, `scroll-${pos}`)),
            });
          }
        }

        // interactions
        if (target.interactions && viewportName === 'desktop-1440') {
          for (const interaction of target.interactions) {
            await page.evaluate(() => window.scrollTo(0, 0));
            await page.waitForTimeout(500);
            const stateDir = join(STATES_DIR, interaction.includes('menu') ? interaction.replace('-open', '') : 'scrolled-header');
            await mkdir(stateDir, { recursive: true });
            if (interaction === 'platform-menu-open') {
              // 尝试 hover Platform 触发器
              const trigger = await page.locator('text=Platform').first();
              if (await trigger.isVisible()) {
                await trigger.hover();
                await page.waitForTimeout(800);
              }
            } else if (interaction === 'resources-menu-open') {
              const trigger = await page.locator('text=Resources').first();
              if (await trigger.isVisible()) {
                await trigger.hover();
                await page.waitForTimeout(800);
              }
            } else if (interaction === 'scrolled-header') {
              await page.evaluate(() => window.scrollTo(0, 400));
              await page.waitForTimeout(500);
            }
            await page.screenshot({
              path: join(stateDir, makeFileName(target.routeId, 'desktop-1440', interaction)),
            });
          }
        }
      } catch (err) {
        console.warn(`  failed: ${target.url} @ ${viewportName}: ${err}`);
      } finally {
        await context.close();
      }
    }
  }
  await browser.close();
  console.log('Capture complete.');
}

async function main() {
  const args = process.argv.slice(2);
  const planOnly = args.includes('--plan-only');
  const quick = args.includes('--quick');
  const filterArg = args.find((a) => a.startsWith('--filter='));
  const filter = filterArg ? filterArg.slice(9) : null;

  console.log('=== Attio Screenshot Capture ===');
  if (quick) console.log('[quick mode: full-page only, 1440+390]');

  const routesRaw = await readFile(ROUTES_PATH, 'utf8');
  const manifest = JSON.parse(routesRaw);
  console.log(`Loaded ${manifest.routes.length} routes from manifest`);

  let targets = selectCaptureTargets(manifest.routes);
  if (filter) {
    targets = targets.filter((t) => t.routeId.includes(filter));
    console.log(`Filtered to ${targets.length} targets matching "${filter}"`);
  }

  // quick 模式：仅 full-page，仅 1440 + 390
  if (quick) {
    targets = targets.map((t) => ({
      ...t,
      viewports: ['desktop-1440', 'mobile-390'],
      shots: ['full-page'],
      scrollPositions: undefined,
      interactions: undefined,
    }));
  }

  console.log(`Selected ${targets.length} capture targets`);

  const plan = buildPlan(targets);
  await mkdir(resolve('docs/reference/attio/manifest'), { recursive: true });
  await writeFile(PLAN_PATH, JSON.stringify(plan, null, 2), 'utf8');
  console.log(`Capture plan written: ${PLAN_PATH}`);
  console.log(`Total shots planned: ${plan.totalShots}`);

  if (planOnly) {
    console.log('\n--plan-only mode: skipping execution');
    return;
  }

  await executeCapture(targets);
}

main().catch((err) => {
  console.error('Fatal:', err);
  process.exit(1);
});
