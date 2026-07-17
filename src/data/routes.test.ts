import { describe, expect, it } from 'vitest';
import {
  routes,
  routeMap,
  getRouteMeta,
  staticRoutePaths,
  dynamicRouteConfigs,
  ecosystemEntries,
  ecosystemEntryMap,
} from './routes';

describe('routes registry', () => {
  describe('completeness', () => {
    it('contains all v2.5 core routes', () => {
      const corePaths = routes.filter((r) => r.category === 'core').map((r) => r.path);
      expect(corePaths).toContain('');
      expect(corePaths).toContain('/platform');
      expect(corePaths).toContain('/resources');
      expect(corePaths).toContain('/plans');
      // /use-cases is categorized under 'use-cases' (it's both a core nav item and the use-case listing)
      expect(routeMap['/use-cases']).toBeDefined();
    });

    it('contains all v2.5 platform routes', () => {
      const platformPaths = routes
        .filter((r) => r.category === 'platform')
        .map((r) => r.path);
      const expected = [
        '/platform/assistant',
        '/platform/ai',
        '/platform/data',
        '/platform/context',
        '/platform/workflows',
        '/platform/task-sequences',
        '/platform/research-intelligence',
        '/platform/reporting',
        '/platform/developers',
      ];
      for (const path of expected) {
        expect(platformPaths, `expected ${path} in platform routes`).toContain(path);
      }
    });

    it('contains ecosystem route', () => {
      expect(routeMap['/ecosystem']).toBeDefined();
    });

    it('contains all v2.5 get-started routes', () => {
      const paths = routes.filter((r) => r.category === 'get-started').map((r) => r.path);
      expect(paths).toContain('/getting-started');
      expect(paths).toContain('/community/experts');
      expect(paths).toContain('/programs/education-research');
      expect(paths).toContain('/contact');
    });

    it('contains all v2.5 resources routes', () => {
      const paths = routes.filter((r) => r.category === 'resources').map((r) => r.path);
      expect(paths).toContain('/help');
      expect(paths).toContain('/learn');
      expect(paths).toContain('/docs');
      expect(paths).toContain('/partners');
      expect(paths).toContain('/blog');
      expect(paths).toContain('/engineering');
      expect(paths).toContain('/careers');
      expect(paths).toContain('/changelog');
    });

    it('contains all v2.5 use-case fixed slugs', () => {
      const paths = routes.filter((r) => r.category === 'use-cases').map((r) => r.path);
      expect(paths).toContain('/use-cases');
      expect(paths).toContain('/use-cases/urban-expansion');
      expect(paths).toContain('/use-cases/ndvi-time-series');
      expect(paths).toContain('/use-cases/research-report');
    });

    it('contains all v2.5 project routes', () => {
      const paths = routes.filter((r) => r.category === 'project').map((r) => r.path);
      expect(paths).toContain('/about');
      expect(paths).toContain('/manifesto');
    });

    it('contains all v2.5 distribution/trust routes', () => {
      const paths = routes.filter((r) => r.category === 'distribution').map((r) => r.path);
      expect(paths).toContain('/download');
      expect(paths).toContain('/status');
      expect(paths).toContain('/trust');
      expect(paths).toContain('/security');
      expect(paths).toContain('/privacy');
      expect(paths).toContain('/terms');
    });
  });

  describe('bilingual metadata', () => {
    it('every route has zh and en title', () => {
      for (const route of routes) {
        expect(route.title.zh, `${route.path} title.zh`).toBeTypeOf('string');
        expect(route.title.zh.length, `${route.path} title.zh empty`).toBeGreaterThan(0);
        expect(route.title.en, `${route.path} title.en`).toBeTypeOf('string');
        expect(route.title.en.length, `${route.path} title.en empty`).toBeGreaterThan(0);
      }
    });

    it('every route has zh and en description', () => {
      for (const route of routes) {
        expect(route.description.zh, `${route.path} desc.zh`).toBeTypeOf('string');
        expect(route.description.zh.length, `${route.path} desc.zh empty`).toBeGreaterThan(0);
        expect(route.description.en, `${route.path} desc.en`).toBeTypeOf('string');
        expect(route.description.en.length, `${route.path} desc.en empty`).toBeGreaterThan(0);
      }
    });

    it('every route has zh and en h1', () => {
      for (const route of routes) {
        expect(route.h1.zh, `${route.path} h1.zh`).toBeTypeOf('string');
        expect(route.h1.zh.length, `${route.path} h1.zh empty`).toBeGreaterThan(0);
        expect(route.h1.en, `${route.path} h1.en`).toBeTypeOf('string');
        expect(route.h1.en.length, `${route.path} h1.en empty`).toBeGreaterThan(0);
      }
    });
  });

  describe('unique H1 per locale', () => {
    it('zh H1s are unique across all static routes', () => {
      const h1s = routes.map((r) => r.h1.zh);
      const duplicates = h1s.filter((h, i) => h1s.indexOf(h) !== i);
      expect(duplicates, `duplicate zh H1s: ${duplicates.join(' | ')}`).toEqual([]);
    });

    it('en H1s are unique across all static routes', () => {
      const h1s = routes.map((r) => r.h1.en);
      const duplicates = h1s.filter((h, i) => h1s.indexOf(h) !== i);
      expect(duplicates, `duplicate en H1s: ${duplicates.join(' | ')}`).toEqual([]);
    });
  });

  describe('attio reference binding', () => {
    it('most routes have an attioRef', () => {
      const withoutRef = routes.filter((r) => !r.attioRef);
      // Some routes (community/experts, docs, about, status, trust, security, privacy, terms)
      // legitimately have no direct Attio equivalent — that's expected.
      const allowedWithoutRef = new Set([
        '/community/experts',
        '/docs',
        '/about',
        '/status',
        '/trust',
        '/security',
        '/privacy',
        '/terms',
        '/product',
      ]);
      const unexpected = withoutRef.filter((r) => !allowedWithoutRef.has(r.path));
      expect(
        unexpected.map((r) => r.path),
        `routes unexpectedly missing attioRef`,
      ).toEqual([]);
    });
  });

  describe('getRouteMeta', () => {
    it('returns metadata for known path', () => {
      const meta = getRouteMeta('/platform/assistant');
      expect(meta).toBeDefined();
      expect(meta?.h1.zh).toContain('Assistant');
    });

    it('returns undefined for unknown path', () => {
      expect(getRouteMeta('/does-not-exist')).toBeUndefined();
    });
  });

  describe('staticRoutePaths', () => {
    it('excludes dynamic [slug] patterns', () => {
      for (const path of staticRoutePaths) {
        expect(path.includes('[')).toBe(false);
      }
    });

    it('includes home, platform, resources, plans', () => {
      expect(staticRoutePaths).toContain('');
      expect(staticRoutePaths).toContain('/platform');
      expect(staticRoutePaths).toContain('/resources');
      expect(staticRoutePaths).toContain('/plans');
    });
  });

  describe('dynamicRouteConfigs', () => {
    it('includes ecosystem with 8 concrete slugs', () => {
      const eco = dynamicRouteConfigs.find((c) => c.pattern === '/ecosystem/[slug]');
      expect(eco).toBeDefined();
      expect(eco?.slugs).toHaveLength(8);
      expect(eco?.slugs).toContain('qgis');
      expect(eco?.slugs).toContain('gdal');
      expect(eco?.slugs).toContain('python');
      expect(eco?.slugs).toContain('postgis');
      expect(eco?.slugs).toContain('google-earth-engine');
      expect(eco?.slugs).toContain('mcp');
      expect(eco?.slugs).toContain('skills');
      expect(eco?.slugs).toContain('plugins');
    });

    it('includes use-cases with 3 concrete slugs', () => {
      const uc = dynamicRouteConfigs.find((c) => c.pattern === '/use-cases/[slug]');
      expect(uc).toBeDefined();
      expect(uc?.slugs).toHaveLength(3);
      expect(uc?.slugs).toContain('urban-expansion');
      expect(uc?.slugs).toContain('ndvi-time-series');
      expect(uc?.slugs).toContain('research-report');
    });
  });

  describe('ecosystemEntries', () => {
    it('has 8 entries matching dynamicRouteConfigs slugs', () => {
      expect(ecosystemEntries).toHaveLength(8);
      const slugs = ecosystemEntries.map((e) => e.slug);
      expect(slugs).toEqual(
        dynamicRouteConfigs.find((c) => c.pattern === '/ecosystem/[slug]')?.slugs,
      );
    });

    it('every entry has bilingual metadata', () => {
      for (const entry of ecosystemEntries) {
        expect(entry.title.zh.length).toBeGreaterThan(0);
        expect(entry.title.en.length).toBeGreaterThan(0);
        expect(entry.description.zh.length).toBeGreaterThan(0);
        expect(entry.description.en.length).toBeGreaterThan(0);
        expect(entry.h1.zh.length).toBeGreaterThan(0);
        expect(entry.h1.en.length).toBeGreaterThan(0);
      }
    });

    it('ecosystemEntryMap keys match entry slugs', () => {
      for (const entry of ecosystemEntries) {
        expect(ecosystemEntryMap[entry.slug]).toBe(entry);
      }
    });
  });
});
