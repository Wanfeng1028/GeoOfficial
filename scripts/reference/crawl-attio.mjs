/**
 * Attio 全站 URL 发现与归一化脚本（fetch + HTML 解析版）
 *
 * 来源（v2.5 计划 §4.2）：
 *   1. Attio 首页顶部导航（fetch HTML + 解析 <a>）
 *   2. Attio 首页 Footer（同上）
 *   3. 各列表页卡片链接
 *   4. 各页面正文内部链接
 *   5. sitemap.xml
 *   6. llms.txt
 *   7. 状态、信任和开发者外部子域
 *
 * 处理规则：
 *   - 只保留公开 GET 页面
 *   - 去除 URL 参数中的跟踪字段
 *   - 去除 Hash
 *   - 将重定向归一到最终 URL
 *   - 去重
 *   - 标记外部域名
 *   - 记录发现来源
 *   - 记录抓取时间
 *   - 记录 HTTP 状态
 *
 * 用法：node scripts/reference/crawl-attio.mjs
 *
 * 注意：本脚本不依赖 Playwright，使用 Node.js 原生 fetch + 正则解析 HTML。
 * 截图采集由 capture-attio.mjs（基于 browser_use 或 Playwright）单独处理。
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const ATTIO_ORIGIN = 'https://attio.com';
const SEED_LIST_PAGES = [
  `${ATTIO_ORIGIN}/customers`,
  `${ATTIO_ORIGIN}/blog`,
  `${ATTIO_ORIGIN}/engineering/blog`,
  `${ATTIO_ORIGIN}/changelog`,
  `${ATTIO_ORIGIN}/apps`,
  `${ATTIO_ORIGIN}/help`,
  `${ATTIO_ORIGIN}/careers`,
  `${ATTIO_ORIGIN}/partners`,
  `${ATTIO_ORIGIN}/solutions/startup-crm`,
  `${ATTIO_ORIGIN}/platform/ask`,
  `${ATTIO_ORIGIN}/platform/ai`,
  `${ATTIO_ORIGIN}/platform/data`,
  `${ATTIO_ORIGIN}/platform/workflows`,
  `${ATTIO_ORIGIN}/platform/sequences`,
  `${ATTIO_ORIGIN}/platform/call-intelligence`,
  `${ATTIO_ORIGIN}/platform/reporting`,
  `${ATTIO_ORIGIN}/platform/developers`,
  `${ATTIO_ORIGIN}/pricing`,
  `${ATTIO_ORIGIN}/download`,
  `${ATTIO_ORIGIN}/redefine`,
  `${ATTIO_ORIGIN}/startups`,
];

const TRACKING_PARAMS = new Set([
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
  'gclid',
  'fbclid',
  'mc_cid',
  'mc_eid',
  'ref',
  'source',
]);

const OUTPUT_DIR = resolve('docs/reference/attio/manifest');
const ROUTES_PATH = resolve(OUTPUT_DIR, 'routes.json');
const EXTERNAL_ROUTES_PATH = resolve(OUTPUT_DIR, 'external-routes.json');
const ROUTE_TYPES_PATH = resolve(OUTPUT_DIR, 'route-types.json');

const FETCH_TIMEOUT = 20_000;
const INTER_REQUEST_DELAY_MS = 300;

/**
 * @typedef {Object} RouteEntry
 * @property {string} url
 * @property {string} finalUrl
 * @property {string} path
 * @property {boolean} external
 * @property {number} status
 * @property {string[]} sources
 * @property {string} crawledAt
 * @property {string} routeId
 * @property {string} pageType
 * @property {string} [title]
 */

/** @returns {Promise<void>} */
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/**
 * 规范化 URL：去 hash、去跟踪参数、归一化末尾斜杠
 * @param {string} raw
 * @returns {string | null}
 */
function normalizeUrl(raw) {
  try {
    const u = new URL(raw);
    for (const key of [...u.searchParams.keys()]) {
      if (TRACKING_PARAMS.has(key)) {
        u.searchParams.delete(key);
      }
    }
    u.hash = '';
    if (u.pathname.length > 1 && u.pathname.endsWith('/')) {
      u.pathname = u.pathname.replace(/\/+$/, '');
    }
    if (u.searchParams.toString() === '') {
      u.search = '';
    }
    return u.toString();
  } catch {
    return null;
  }
}

/**
 * @param {string} url
 * @returns {boolean}
 */
function isAttioMainSite(url) {
  try {
    const u = new URL(url);
    return u.hostname === 'attio.com' || u.hostname === 'www.attio.com';
  } catch {
    return false;
  }
}

/**
 * @param {string} url
 * @returns {boolean}
 */
function isAttioExternalSubdomain(url) {
  try {
    const u = new URL(url);
    return (
      u.hostname.endsWith('.attio.com') &&
      u.hostname !== 'attio.com' &&
      u.hostname !== 'www.attio.com'
    );
  } catch {
    return false;
  }
}

/**
 * @param {string} url
 * @returns {boolean}
 */
function isSkippableAsset(url) {
  const lowered = url.toLowerCase();
  return /\.(png|jpg|jpeg|gif|svg|webp|avif|ico|css|js|map|woff|woff2|ttf|otf|eot|pdf|zip|tar|gz|mp4|webm|mov|mp3|wav|json|xml|txt|rss)(\?|$)/.test(
    lowered,
  );
}

/**
 * 从 HTML 中提取所有 <a href> 链接
 * 同时尝试识别 header/footer/body 位置（基于粗略启发式）
 * @param {string} html
 * @param {string} baseUrl
 * @returns {Array<{url: string, location: string}>}
 */
function extractLinksFromHtml(html, baseUrl) {
  /** @type {Array<{url: string, location: string}>} */
  const links = [];
  const seen = new Set();

  // 粗略切分 header/footer/main
  const headerMatch = html.match(/<header[\s\S]*?<\/header>/i);
  const footerMatch = html.match(/<footer[\s\S]*?<\/footer>/i);
  const navMatch = html.match(/<nav[\s\S]*?<\/nav>/i);

  /** @param {string} fragment @param {string} location */
  const collectFromFragment = (fragment, location) => {
    if (!fragment) return;
    const aRegex = /<a\s+[^>]*?href=["']([^"']+)["'][^>]*>/gi;
    let m;
    while ((m = aRegex.exec(fragment)) !== null) {
      const href = m[1];
      if (!href || href.startsWith('#') || href.startsWith('javascript:') || href.startsWith('mailto:') || href.startsWith('tel:')) {
        continue;
      }
      try {
        const resolved = new URL(href, baseUrl).toString();
        if (seen.has(resolved + '|' + location)) continue;
        seen.add(resolved + '|' + location);
        links.push({ url: resolved, location });
      } catch {
        // ignore invalid href
      }
    }
  };

  collectFromFragment(headerMatch?.[0] || '', 'header');
  collectFromFragment(navMatch?.[0] || '', 'nav');
  collectFromFragment(footerMatch?.[0] || '', 'footer');
  // 全文扫描以捕获 main/article/section 内链接
  collectFromFragment(html, 'body');

  return links;
}

/**
 * 提取 <title>
 * @param {string} html
 * @returns {string | undefined}
 */
function extractTitle(html) {
  const m = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  return m ? m[1].trim().slice(0, 200) : undefined;
}

/**
 * 解析 sitemap.xml（支持 sitemap index 嵌套）
 * @returns {Promise<string[]>}
 */
async function fetchSitemapUrls() {
  /** @param {string} xmlUrl @returns {Promise<string[]>} */
  const parseSitemap = async (xmlUrl) => {
    try {
      const res = await fetch(xmlUrl, { redirect: 'follow', signal: AbortSignal.timeout(FETCH_TIMEOUT) });
      if (!res.ok) {
        console.warn(`[sitemap] HTTP ${res.status} for ${xmlUrl}`);
        return [];
      }
      const xml = await res.text();
      const urls = [];
      const locMatches = xml.matchAll(/<loc>([^<]+)<\/loc>/g);
      for (const m of locMatches) {
        urls.push(m[1].trim());
      }
      return urls;
    } catch (err) {
      console.warn(`[sitemap] fetch failed for ${xmlUrl}: ${err}`);
      return [];
    }
  };

  try {
    const topLevel = await parseSitemap(`${ATTIO_ORIGIN}/sitemap.xml`);
    console.log(`[sitemap] top-level entries: ${topLevel.length}`);

    // 检测是否为 sitemap index（包含 <sitemap> 标签）
    const allUrls = [];
    let isIndex = false;
    for (const entry of topLevel) {
      if (entry.endsWith('.xml')) {
        isIndex = true;
        console.log(`[sitemap] index → ${entry}`);
        const childUrls = await parseSitemap(entry);
        allUrls.push(...childUrls);
        await sleep(INTER_REQUEST_DELAY_MS);
      } else {
        allUrls.push(entry);
      }
    }

    if (!isIndex) {
      console.log(`[sitemap] flat sitemap with ${allUrls.length} URLs`);
    } else {
      console.log(`[sitemap] resolved ${allUrls.length} URLs from index`);
    }
    return allUrls;
  } catch (err) {
    console.warn(`[sitemap] fatal: ${err}`);
    return [];
  }
}

/**
 * 解析 llms.txt
 * @returns {Promise<string[]>}
 */
async function fetchLlmsTxtUrls() {
  try {
    const res = await fetch(`${ATTIO_ORIGIN}/llms.txt`, {
      redirect: 'follow',
      signal: AbortSignal.timeout(FETCH_TIMEOUT),
    });
    if (!res.ok) {
      console.warn(`[llms.txt] HTTP ${res.status}`);
      return [];
    }
    const text = await res.text();
    const urls = [];
    const lines = text.split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      const mdMatch = trimmed.match(/\]\((https?:\/\/[^)]+)\)/);
      if (mdMatch) {
        urls.push(mdMatch[1]);
        continue;
      }
      const bareMatch = trimmed.match(/^(https?:\/\/\S+)$/);
      if (bareMatch) {
        urls.push(bareMatch[1]);
      }
    }
    console.log(`[llms.txt] found ${urls.length} URLs`);
    return urls;
  } catch (err) {
    console.warn(`[llms.txt] fetch failed: ${err}`);
    return [];
  }
}

/**
 * 根据 path 推断页面类型
 * @param {string} pathname
 * @returns {string}
 */
function inferPageType(pathname) {
  if (pathname === '/' || pathname === '') return 'home';
  if (pathname.startsWith('/platform/')) return 'platform-detail';
  if (pathname === '/apps') return 'apps-listing';
  if (pathname.startsWith('/apps/')) return 'app-detail';
  if (pathname === '/customers') return 'customers-listing';
  if (pathname.startsWith('/customers/')) return 'customer-detail';
  if (pathname === '/blog') return 'blog-listing';
  if (pathname.startsWith('/blog/')) return 'blog-detail';
  if (pathname === '/engineering/blog') return 'engineering-listing';
  if (pathname.startsWith('/engineering/blog/')) return 'engineering-detail';
  if (pathname === '/changelog') return 'changelog-listing';
  if (pathname.startsWith('/changelog/')) return 'changelog-detail';
  if (pathname === '/help' || pathname.startsWith('/help/')) return 'help';
  if (pathname === '/pricing') return 'pricing';
  if (pathname === '/download') return 'download';
  if (pathname === '/careers') return 'careers';
  if (pathname === '/partners') return 'partners';
  if (pathname.startsWith('/solutions/')) return 'solutions-detail';
  if (pathname.startsWith('/legal/')) return 'legal';
  if (pathname === '/startups') return 'startups';
  if (pathname === '/redefine') return 'manifesto';
  if (pathname === '/contact/sales' || pathname === '/contact') return 'contact';
  return 'other';
}

/**
 * @param {string} pathname
 * @returns {string}
 */
function pathToRouteId(pathname) {
  if (pathname === '/' || pathname === '') return 'home';
  return pathname
    .replace(/^\//, '')
    .replace(/\//g, '-')
    .replace(/[^a-z0-9-]/gi, '')
    .toLowerCase();
}

/**
 * @param {string} url
 * @returns {Promise<{status: number, finalUrl: string, html?: string} | null>}
 */
async function fetchUrl(url) {
  try {
    const res = await fetch(url, {
      redirect: 'follow',
      signal: AbortSignal.timeout(FETCH_TIMEOUT),
      headers: {
        'user-agent':
          'Mozilla/5.0 (compatible; GeoOfficial-Reference-Crawler/2.5; +https://github.com/Wanfeng1028/GeoOfficial)',
        accept: 'text/html,application/xhtml+xml',
      },
    });
    const finalUrl = res.url;
    let html;
    const contentType = res.headers.get('content-type') || '';
    if (contentType.includes('text/html') || contentType.includes('application/xhtml')) {
      html = await res.text();
    }
    return { status: res.status, finalUrl, html };
  } catch (err) {
    console.warn(`[fetch] ${url} failed: ${err}`);
    return null;
  }
}

async function main() {
  console.log('=== Attio URL Discovery ===');
  await mkdir(OUTPUT_DIR, { recursive: true });

  /** @type {Map<string, RouteEntry>} */
  const routeMap = new Map();
  const crawledAt = new Date().toISOString();

  /**
   * @param {string} rawUrl
   * @param {string} source
   * @param {number} [status]
   * @param {string} [finalUrl]
   * @param {string} [title]
   */
  const upsertRoute = (rawUrl, source, status, finalUrl, title) => {
    const normalized = normalizeUrl(rawUrl);
    if (!normalized) return;
    if (isSkippableAsset(normalized)) return;

    const isAttio = isAttioMainSite(normalized) || isAttioExternalSubdomain(normalized);
    const external = !isAttio;
    if (!isAttio && !external) return;

    const finalNormalized = finalUrl ? normalizeUrl(finalUrl) || normalized : normalized;
    const finalU = new URL(finalNormalized);
    const path = finalU.pathname;
    const routeId = isAttioMainSite(finalNormalized)
      ? pathToRouteId(path)
      : `external-${pathToRouteId(finalU.hostname.replace(/\./g, '-') + path)}`;

    const existing = routeMap.get(finalNormalized);
    if (existing) {
      if (!existing.sources.includes(source)) {
        existing.sources.push(source);
      }
      if (status && existing.status === 0) {
        existing.status = status;
      }
      if (title && !existing.title) {
        existing.title = title;
      }
      return;
    }

    routeMap.set(finalNormalized, {
      url: normalized,
      finalUrl: finalNormalized,
      path,
      external,
      status: status || 0,
      sources: [source],
      crawledAt,
      routeId,
      pageType: inferPageType(path),
      ...(title ? { title } : {}),
    });
  };

  // 1. sitemap.xml
  console.log('\n[1/6] Fetch sitemap.xml...');
  const sitemapUrls = await fetchSitemapUrls();
  for (const url of sitemapUrls) {
    upsertRoute(url, 'sitemap');
  }
  console.log(`  sitemap contributed ${sitemapUrls.length} URLs`);

  // 2. llms.txt
  console.log('\n[2/6] Fetch llms.txt...');
  const llmsUrls = await fetchLlmsTxtUrls();
  for (const url of llmsUrls) {
    upsertRoute(url, 'llms.txt');
  }
  console.log(`  llms.txt contributed ${llmsUrls.length} URLs`);

  // 3. 首页 HTML 解析
  console.log('\n[3/6] Fetch homepage HTML...');
  const homeResult = await fetchUrl(ATTIO_ORIGIN);
  if (homeResult?.html) {
    upsertRoute(ATTIO_ORIGIN, 'seed:home', homeResult.status, homeResult.finalUrl, extractTitle(homeResult.html));
    const homeLinks = extractLinksFromHtml(homeResult.html, homeResult.finalUrl);
    console.log(`  homepage extracted ${homeLinks.length} links`);
    for (const link of homeLinks) {
      upsertRoute(link.url, `home:${link.location}`);
    }
  } else {
    console.warn('  homepage fetch failed');
  }

  // 4. 列表页 HTML 解析
  console.log('\n[4/6] Fetch list pages for detail links...');
  for (const listUrl of SEED_LIST_PAGES) {
    await sleep(INTER_REQUEST_DELAY_MS);
    const result = await fetchUrl(listUrl);
    if (result?.html) {
      upsertRoute(listUrl, 'seed:list', result.status, result.finalUrl, extractTitle(result.html));
      const listLinks = extractLinksFromHtml(result.html, result.finalUrl);
      console.log(`  ${listUrl} → ${listLinks.length} links (status ${result.status})`);
      for (const link of listLinks) {
        upsertRoute(link.url, `list:${new URL(listUrl).pathname}:${link.location}`);
      }
    } else {
      console.warn(`  ${listUrl} fetch failed`);
    }
  }

  // 5. 先保存一次 manifest（sitemap URL 视为 200，避免探测阶段被中断后无输出）
  console.log('\n[5/7] Save interim manifest (pre-probe)...');
  // sitemap 来源的路由视为有效（200），未探测的标记为 0
  for (const route of routeMap.values()) {
    if (route.status === 0 && route.sources.includes('sitemap')) {
      route.status = 200;
    }
  }
  await writeManifest(routeMap, crawledAt);

  // 6. 探测非 sitemap 来源的主站路由（HEAD 请求，限并发）
  console.log('\n[6/7] Probe HTTP status for non-sitemap routes...');
  const routesToProbe = [...routeMap.values()].filter(
    (r) => !r.external && r.status === 0,
  );
  console.log(`  ${routesToProbe.length} routes to probe`);
  const CONCURRENCY = 6;
  /** @param {RouteEntry[]} batch */
  const probeBatch = async (batch) => {
    await Promise.all(
      batch.map(async (route) => {
        try {
          const res = await fetch(route.url, {
            method: 'GET',
            redirect: 'follow',
            signal: AbortSignal.timeout(FETCH_TIMEOUT),
            headers: {
              'user-agent':
                'Mozilla/5.0 (compatible; GeoOfficial-Reference-Crawler/2.5; +https://github.com/Wanfeng1028/GeoOfficial)',
              accept: 'text/html,application/xhtml+xml',
            },
          });
          route.status = res.status;
          const finalUrl = res.url;
          const finalNorm = normalizeUrl(finalUrl);
          if (finalNorm && finalNorm !== route.url) {
            route.finalUrl = finalNorm;
            route.path = new URL(finalNorm).pathname;
            route.routeId = pathToRouteId(route.path);
            route.pageType = inferPageType(route.path);
          }
          const contentType = res.headers.get('content-type') || '';
          if (contentType.includes('text/html')) {
            const html = await res.text();
            const title = extractTitle(html);
            if (title) route.title = title;
            const moreLinks = extractLinksFromHtml(html, finalUrl);
            for (const link of moreLinks) {
              upsertRoute(link.url, `body:${route.path}:${link.location}`);
            }
          }
        } catch (err) {
          route.status = -1;
          console.warn(`  probe failed: ${route.url} → ${err}`);
        }
      }),
    );
  };

  for (let i = 0; i < routesToProbe.length; i += CONCURRENCY) {
    const batch = routesToProbe.slice(i, i + CONCURRENCY);
    await probeBatch(batch);
    if ((i / CONCURRENCY) % 5 === 0) {
      console.log(`  progress: ${Math.min(i + CONCURRENCY, routesToProbe.length)}/${routesToProbe.length}`);
    }
    await sleep(100);
  }
  console.log(`  probed ${routesToProbe.length} routes`);

  // 7. 输出最终 manifest
  console.log('\n[7/7] Write final manifest...');
  await writeManifest(routeMap, crawledAt);

  const allRoutes = [...routeMap.values()].sort((a, b) => a.url.localeCompare(b.url));
  const validMainRoutes = allRoutes.filter((r) => !r.external && (r.status === 200 || r.status === 0 || (r.status >= 300 && r.status < 400)));
  const externalRoutes = allRoutes.filter((r) => r.external);

  console.log('\n=== Done ===');
  console.log(`Main-site valid routes: ${validMainRoutes.length}`);
  console.log(`External routes: ${externalRoutes.length}`);
  console.log(`Page types: ${Object.keys(inferAllPageTypes(routeMap)).join(', ')}`);
  console.log('\nOutput:');
  console.log(`  ${ROUTES_PATH}`);
  console.log(`  ${EXTERNAL_ROUTES_PATH}`);
  console.log(`  ${ROUTE_TYPES_PATH}`);
}

/**
 * 写入 manifest 文件
 * @param {Map<string, RouteEntry>} routeMap
 * @param {string} crawledAt
 */
async function writeManifest(routeMap, crawledAt) {
  const allRoutes = [...routeMap.values()].sort((a, b) => a.url.localeCompare(b.url));
  const mainRoutes = allRoutes.filter((r) => !r.external);
  const externalRoutes = allRoutes.filter((r) => r.external);

  const validMainRoutes = mainRoutes.filter(
    (r) => r.status === 200 || r.status === 0 || (r.status >= 300 && r.status < 400),
  );
  const failedRoutes = mainRoutes.filter((r) => r.status >= 400 || r.status === -1);

  /** @type {Record<string, string[]>} */
  const routeTypes = {};
  for (const route of validMainRoutes) {
    if (!routeTypes[route.pageType]) routeTypes[route.pageType] = [];
    routeTypes[route.pageType].push(route.routeId);
  }

  const manifest = {
    generatedAt: crawledAt,
    origin: ATTIO_ORIGIN,
    summary: {
      totalDiscovered: allRoutes.length,
      mainSiteValid: validMainRoutes.length,
      mainSiteFailed: failedRoutes.length,
      external: externalRoutes.length,
      pageTypes: Object.fromEntries(
        Object.entries(routeTypes).map(([k, v]) => [k, v.length]),
      ),
    },
    routes: validMainRoutes,
    failed: failedRoutes,
  };

  await writeFile(ROUTES_PATH, JSON.stringify(manifest, null, 2), 'utf8');
  await writeFile(EXTERNAL_ROUTES_PATH, JSON.stringify(externalRoutes, null, 2), 'utf8');
  await writeFile(ROUTE_TYPES_PATH, JSON.stringify(routeTypes, null, 2), 'utf8');
}

/**
 * @param {Map<string, RouteEntry>} routeMap
 * @returns {Record<string, number>}
 */
function inferAllPageTypes(routeMap) {
  /** @type {Record<string, number>} */
  const counts = {};
  for (const route of routeMap.values()) {
    if (route.external) continue;
    counts[route.pageType] = (counts[route.pageType] || 0) + 1;
  }
  return counts;
}

main().catch((err) => {
  console.error('Fatal:', err);
  process.exit(1);
});
