/**
 * Generate Iteration 0 analysis reports from routes.json:
 * 1. route-inventory.md
 * 2. navigation-anatomy.md
 * 3. page-types.md
 * 4. route-parity.md
 */

import { readFileSync, writeFileSync } from 'node:fs';

const ROOT = 'E:/code/javascript/project/GeoOfficial';
const data = JSON.parse(readFileSync(`${ROOT}/docs/reference/attio/manifest/routes.json`, 'utf8'));
const routes = data.routes;
const DATE = '2026-07-17';

const byType = {};
for (const r of routes) {
  const pt = r.pageType || 'unknown';
  if (!byType[pt]) byType[pt] = [];
  byType[pt].push(r);
}

const typeCount = Object.entries(byType)
  .map(([t, list]) => ({ type: t, count: list.length }))
  .sort((a, b) => b.count - a.count);

// =====================================================================
// 1. route-inventory.md
// =====================================================================
const routeInventory = `# Attio Route Inventory

> Generated: ${DATE}
> Source: docs/reference/attio/manifest/routes.json
> Total discovered: ${data.summary.totalDiscovered}
> Main-site valid: ${data.summary.mainSiteValid}
> External: ${data.summary.external}
> Failed: ${data.summary.mainSiteFailed}

## Summary by Page Type

| Page Type | Count |
|-----------|-------|
${typeCount.map((t) => `| ${t.type} | ${t.count} |`).join('\n')}

## Core Navigation Pages (must capture and analyze)

| Route | URL | Type |
|-------|-----|------|
${byType.home?.filter(r => !r.external).slice(0, 3).map(r => `| ${r.routeId} | ${r.url} | home |`).join('\n') || '' }
${byType['platform-detail']?.map(r => `| ${r.routeId} | ${r.url} | platform-detail |`).join('\n') || ''}
${byType.pricing?.map(r => `| ${r.routeId} | ${r.url} | pricing |`).join('\n') || ''}
${byType['customers-listing']?.map(r => `| ${r.routeId} | ${r.url} | customers-listing |`).join('\n') || ''}
${byType['apps-listing']?.map(r => `| ${r.routeId} | ${r.url} | apps-listing |`).join('\n') || ''}
${byType['blog-listing']?.map(r => `| ${r.routeId} | ${r.url} | blog-listing |`).join('\n') || ''}
${byType['changelog-listing']?.map(r => `| ${r.routeId} | ${r.url} | changelog-listing |`).join('\n') || ''}
${byType['engineering-listing']?.map(r => `| ${r.routeId} | ${r.url} | engineering-listing |`).join('\n') || ''}
${byType.help?.slice(0, 1).map(r => `| ${r.routeId} | ${r.url} | help |`).join('\n') || ''}
${byType.careers?.map(r => `| ${r.routeId} | ${r.url} | careers |`).join('\n') || ''}
${byType.partners?.map(r => `| ${r.routeId} | ${r.url} | partners |`).join('\n') || ''}
${byType.contact?.map(r => `| ${r.routeId} | ${r.url} | contact |`).join('\n') || ''}
${byType.download?.map(r => `| ${r.routeId} | ${r.url} | download |`).join('\n') || ''}
${byType.startups?.map(r => `| ${r.routeId} | ${r.url} | startups |`).join('\n') || ''}
${byType.manifesto?.map(r => `| ${r.routeId} | ${r.url} | manifesto |`).join('\n') || ''}
${byType.legal?.slice(0, 5).map(r => `| ${r.routeId} | ${r.url} | legal |`).join('\n') || ''}
${byType['solutions-detail']?.map(r => `| ${r.routeId} | ${r.url} | solutions-detail |`).join('\n') || ''}

## Content Detail Pages (template-based, sample for analysis)

### Customer Stories (${byType['customer-detail']?.length || 0} total)
${byType['customer-detail']?.slice(0, 5).map(r => `- ${r.url}`).join('\n') || ''}

### Blog Posts (${byType['blog-detail']?.length || 0} total)
${byType['blog-detail']?.slice(0, 5).map(r => `- ${r.url}`).join('\n') || ''}

### Engineering Posts (${byType['engineering-detail']?.length || 0} total)
${byType['engineering-detail']?.slice(0, 5).map(r => `- ${r.url}`).join('\n') || ''}

### Changelog Entries (${byType['changelog-detail']?.length || 0} total)
${byType['changelog-detail']?.slice(0, 5).map(r => `- ${r.url}`).join('\n') || ''}

### App Details (${byType['app-detail']?.length || 0} total)
${byType['app-detail']?.slice(0, 5).map(r => `- ${r.url}`).join('\n') || ''}

### Help Articles (${byType.help?.length || 0} total)
${byType.help?.slice(0, 5).map(r => `- ${r.url}`).join('\n') || ''}

## External Routes

${data.failed?.length ? '### Failed Routes\n' + data.failed.map(f => `- ${f.url}: ${f.error || 'unknown'}`).join('\n') : 'No failed routes.'}

## Capture Status

- Screenshots directory: docs/reference/attio/screenshots/
- Capture plan: 44 key targets selected for screenshot capture
- Viewports: 1440x900 (desktop), 390x844 (mobile)
- For long pages: top, middle, bottom scroll positions captured
`;

writeFileSync(`${ROOT}/docs/reference/attio/analysis/route-inventory.md`, routeInventory);
console.log('1/4 route-inventory.md written');

// =====================================================================
// 2. navigation-anatomy.md
// =====================================================================
const navigationAnatomy = `# Attio Navigation Anatomy

> Generated: ${DATE}
> Source: live inspection of attio.com + v2.5 plan analysis

## Desktop Header Structure

\`\`\`
Announcement Bar (top, dismissible)
└─ Site Header (sticky, theme-aware)
   ├─ Logo (left)
   ├─ Platform ▼ (mega menu trigger)
   ├─ Resources ▼ (mega menu trigger)
   ├─ Customers (direct link)
   ├─ Pricing (direct link)
   ├─ Sign in (ghost button, right)
   └─ Main CTA "Get started" (primary button, right)
\`\`\`

## Platform Mega Menu Structure

Large floating panel, not a narrow dropdown.

### Layout
- Left: main feature area (2 columns of items)
- Right: Get Started auxiliary area
- Width: related to page main container
- Border, dividers, rounded corners, shadows: very restrained

### Item structure
Each entry has:
- Independent graphic icon (not generic arrows)
- Title (primary text)
- One-line description (secondary gray)
- Group title: small, uppercase, low contrast, wide letter-spacing

### Platform Groups

\`\`\`
CRM PLATFORM
  Ask Attio        - AI agent for records
  AI               - Geospatial intelligence overview
  Data model       - Objects and properties
  Universal Context - Cross-record context

AGENTS AND AUTOMATIONS
  Workflows        - Trigger, agent, branch, result
  Sequences        - Time-driven continuous execution

INSIGHTS
  Call Intelligence - Recording, transcript, insight
  Reporting        - Charts, dashboards, metrics

ECOSYSTEM
  Developer Platform - API, SDK, MCP, Skills
  Apps & integrations - Logo cloud, search, categories

GET STARTED
  Attio 101
  Hire an expert
  Startup program
  Talk to sales
\`\`\`

## Resources Mega Menu Structure

Separate information architecture from Platform.

\`\`\`
SUPPORT
  Help center
  Academy

DEVELOPERS
  Developer docs

PARTNERS
  Partner programs

COMPANY
  Changelog
  Announcements
  Engineering blog
  Careers
\`\`\`

## Footer Structure

\`\`\`
Logo + tagline
Product column
Resources column
Company column
Legal column
Social links
Language switcher
Status indicator
Copyright
\`\`\`

## Mobile Navigation

- Hamburger menu (top right)
- Accordion-style navigation
- Same data source as desktop mega menus
- Platform and Resources as expandable sections
- CTA remains visible

## Interaction States (must capture)

\`\`\`
1. Header default (top of page)
2. Header scrolled (sticky, theme may change)
3. Platform mega menu open
4. Resources mega menu open
5. Mobile menu open
6. Focus visible state
7. Hover state on menu items
\`\`\`

## GeoWork Adaptation Rules

- Platform and Resources both need Mega Menu
- Each entry must have independent route
- Each core entry must have independent graphic icon
- Icons cannot be generic arrows
- Menu title and description from unified data source
- Desktop Mega Menu and mobile Accordion use same data
- Hover, Focus, Open, Active states all implemented
- Menu doesn't flicker when moving to panel
- Dark section Header theme switch must be stable

## Reference URLs

- Home: https://attio.com
- Platform pages: https://attio.com/platform/{ask,ai,data,workflows,sequences,call-intelligence,reporting,developers}
- Apps: https://attio.com/apps
- Pricing: https://attio.com/pricing
- Customers: https://attio.com/customers
- Blog: https://attio.com/blog
- Engineering: https://attio.com/engineering/blog
- Changelog: https://attio.com/changelog
- Help: https://attio.com/help
- Careers: https://attio.com/careers
- Partners: https://attio.com/partners
- Download: https://attio.com/download
- Manifesto: https://attio.com/redefine
- Startups: https://attio.com/startups
`;

writeFileSync(`${ROOT}/docs/reference/attio/analysis/navigation-anatomy.md`, navigationAnatomy);
console.log('2/4 navigation-anatomy.md written');

// =====================================================================
// 3. page-types.md
// =====================================================================
const pageTypesReport = `# Attio Page Types Analysis

> Generated: ${DATE}
> Source: routes.json + live inspection

## Overview

Attio uses ${typeCount.length} distinct page types. Content detail pages (changelog, help, app-detail) dominate by count, but marketing page types define the brand experience.

## Page Type Classification

### 1. Home (${byType.home?.length || 0} routes)
- URL: https://attio.com
- Role: Brand entry, product narrative, conversion
- Structure: Announcement → Header → Hero → Product Canvas → Platform Narrative → Context → Ecosystem → Developers → Use Cases → Changelog → Newsletter → Final CTA → Footer
- Key feature: Multiple "visual climaxes" not just Hero
- Reference for: GeoWork home page

### 2. Platform Detail (${byType['platform-detail']?.length || 0} routes)
- URLs: /platform/{ask,ai,data,workflows,sequences,call-intelligence,reporting,developers,automations}
- Role: Individual feature education
- Shared structure:
  - Shared Header
  - Feature label
  - Large feature title
  - One-line value statement
  - Primary CTA
  - Large product media
  - 3-6 capability sections
  - User quote or credibility info
  - Platform horizontal navigation
  - Final CTA
  - Footer
- Variation by content:
  - Data: object/property graphs
  - Workflows: node/agent flows
  - Sequences: timeline
  - Call Intelligence: recording/transcript/insight
  - Reporting: charts/dashboards
  - Developers: code/MCP/API/SDK
- Reference for: GeoWork Platform pages (Assistant, AI, Data, Context, Workflows, Task Sequences, Research Intelligence, Reporting, Developer Platform)

### 3. Pricing (${byType.pricing?.length || 0} route)
- URL: /pricing
- Structure: Large title → Monthly/Annual toggle → Multiple plan cards → Feature comparison → Add-ons → FAQ → CTA
- Reference for: GeoWork Plans page (no fake prices, use "Planned" / "Contact")

### 4. Customers Listing (${byType['customers-listing']?.length || 0} route)
- URL: /customers
- Structure: Large title → Logo wall → Featured case cards → Multi-industry cases → Result metrics
- Reference for: GeoWork Use Cases listing

### 5. Customer Detail (${byType['customer-detail']?.length || 0} routes)
- URLs: /customers/{slug}
- Structure: Breadcrumb + case number → Large title → Interviewee → Brand media → Company info → Key features used → Challenge → Solution → Results → Long story → Quote → Related cases
- Reference for: GeoWork Use Case detail pages

### 6. Apps Listing (${byType['apps-listing']?.length || 0} route)
- URL: /apps
- Structure: Large Logo Cloud → Featured apps → Search → Category filter → App directory → App Partner entry
- Reference for: GeoWork Ecosystem listing

### 7. App Detail (${byType['app-detail']?.length || 0} routes)
- URLs: /apps/{slug}
- Structure: Breadcrumb → Version → App icon → Title + description → Install button → Developer → Category → Docs and support → Overview → How it works → Configure → Related apps
- Reference for: GeoWork Ecosystem detail pages (QGIS, GDAL, Python, PostGIS, GEE, MCP, Skills, Plugins)

### 8. Blog Listing (${byType['blog-listing']?.length || 0} route)
- URL: /blog
- Structure: Editorial content grid
- Reference for: GeoWork Blog listing

### 9. Blog Detail (${byType['blog-detail']?.length || 0} routes)
- URLs: /blog/{slug}
- Structure: Category → Date → Reading time → Author and position → Hero image → Table of Contents → Long article → Embedded media → Related articles
- Reference for: GeoWork Blog detail

### 10. Engineering Listing (${byType['engineering-listing']?.length || 0} route)
- URL: /engineering/blog
- Same visual as Blog but technical content
- Reference for: GeoWork Engineering listing

### 11. Engineering Detail (${byType['engineering-detail']?.length || 0} routes)
- URLs: /engineering/blog/{slug}
- Same template as Blog Detail
- Reference for: GeoWork Engineering detail

### 12. Changelog Listing (${byType['changelog-listing']?.length || 0} route)
- URL: /changelog
- Structure: Year navigation → Update count → Subscribe → Update cards (date, title, one-line, category tag)
- Reference for: GeoWork Changelog listing

### 13. Changelog Detail (${byType['changelog-detail']?.length || 0} routes)
- URLs: /changelog/{year}/{slug} and /changelog/{slug}
- Individual update detail page
- Reference for: GeoWork Changelog detail (generated from GitHub Releases)

### 14. Help (${byType.help?.length || 0} routes)
- URLs: /help and /help/{path}
- Structure: Global search → Category navigation → Breadcrumb → Left doc tree → Content TOC → Long article → FAQ → Article feedback
- Reference for: GeoWork Help (initial: /help, /getting-started, /glossary)

### 15. Legal (${byType.legal?.length || 0} routes)
- URLs: /legal/{slug}
- Structure: Legal doc navigation → Last updated → TOC → Long reading width → Anchor → Unified Header/Footer
- Reference for: GeoWork Legal pages (Privacy, Terms, Security)

### 16. Careers (${byType.careers?.length || 0} route)
- URL: /careers
- Structure: Video/timeline → Team people → Values → Job list → Office locations and benefits
- Reference for: GeoWork Careers/Contribute

### 17. Partners (${byType.partners?.length || 0} route)
- URL: /partners
- Structure: Numbered partnership types → Each with description and visual → Apply entry
- Reference for: GeoWork Partners

### 18. Solutions Detail (${byType['solutions-detail']?.length || 0} routes)
- URLs: /solutions/{slug}
- Industry-specific landing pages
- Reference for: GeoWork industry solutions (future iteration)

### 19. Download (${byType.download?.length || 0} route)
- URL: /download
- Structure: Supported platforms → Clear version → Install button → Requirements → Extension entry
- Reference for: GeoWork Download

### 20. Manifesto (${byType.manifesto?.length || 0} route)
- URL: /redefine
- Structure: Highly editorial → Text-focused → Large titles and short paragraphs → Minimal cards → Expresses why product exists
- Reference for: GeoWork Manifesto

### 21. Startups (${byType.startups?.length || 0} route)
- URL: /startups
- Structure: Program value → Brand logos → Benefits → Conditions → Application steps → FAQ
- Reference for: GeoWork Education & Research program

### 22. Contact (${byType.contact?.length || 0} route)
- URL: /contact/sales
- Structure: Left title + customer quote → Right structured form → Clear privacy notice → Success/error states
- Reference for: GeoWork Contact

### 23. Other (${byType.other?.length || 0} routes)
- Mixed: redirects, utility pages, uncategorized
- Need individual review for relevance

## GeoWork Page Template Strategy

GeoWork should establish these reusable templates:
1. **MarketingPageShell** - for home, platform pages
2. **ListingPageShell** - for blog, changelog, customers, apps, engineering listings
3. **DetailPageShell** - for blog posts, changelog entries, customer stories
4. **LegalPageShell** - for privacy, terms, security
5. **FormPageShell** - for contact
6. **UtilityPageShell** - for download, status, 404
`;

writeFileSync(`${ROOT}/docs/reference/attio/analysis/page-types.md`, pageTypesReport);
console.log('3/4 page-types.md written');

// =====================================================================
// 4. route-parity.md
// =====================================================================
const routeParity = `# Attio ↔ GeoWork Route Parity Matrix

> Generated: ${DATE}
> Source: v2.5 plan section 7 + routes.json
> Status: Pending user confirmation

## Core Routes

| Attio Route | GeoWork Route (zh) | GeoWork Route (en) | Status | Notes |
|-------------|-------------------|-------------------|--------|-------|
| / | /zh | /en | EXISTS | Home page, needs rebuild |
| /pricing | /zh/plans | /en/plans | NEW | /pricing → redirect to /plans |
| /customers | /zh/use-cases | /en/use-cases | EXISTS | Rename customers → use-cases |
| /redefine | /zh/manifesto | /en/manifesto | NEW | Manifesto page |
| /download | /zh/download | /en/download | EXISTS | Rebuild |

## Platform Routes

| Attio Route | GeoWork Route (zh) | GeoWork Route (en) | Status | Notes |
|-------------|-------------------|-------------------|--------|-------|
| /platform/ask | /zh/platform/assistant | /en/platform/assistant | NEW | Ask Attio → GeoWork Assistant |
| /platform/ai | /zh/platform/ai | /en/platform/ai | NEW | AI overview page |
| /platform/data | /zh/platform/data | /en/platform/data | NEW | Data model page |
| /platform/(context) | /zh/platform/context | /en/platform/context | NEW | Universal Context → Project Context |
| /platform/workflows | /zh/platform/workflows | /en/platform/workflows | NEW | Workflows page |
| /platform/sequences | /zh/platform/task-sequences | /en/platform/task-sequences | NEW | Sequences → Task Sequences |
| /platform/call-intelligence | /zh/platform/research-intelligence | /en/platform/research-intelligence | NEW | Call Intel → Research Intel |
| /platform/reporting | /zh/platform/reporting | /en/platform/reporting | NEW | Reporting page |
| /platform/developers | /zh/platform/developers | /en/platform/developers | EXISTS | Rebuild Developer page |
| /apps | /zh/ecosystem | /en/ecosystem | NEW | Apps → Ecosystem |

## Ecosystem Detail Routes

| Attio Route | GeoWork Route (zh) | GeoWork Route (en) | Status | Notes |
|-------------|-------------------|-------------------|--------|-------|
| /apps/{slug} | /zh/ecosystem/qgis | /en/ecosystem/qgis | NEW | QGIS |
| /apps/{slug} | /zh/ecosystem/gdal | /en/ecosystem/gdal | NEW | GDAL |
| /apps/{slug} | /zh/ecosystem/python | /en/ecosystem/python | NEW | Python |
| /apps/{slug} | /zh/ecosystem/postgis | /en/ecosystem/postgis | NEW | PostGIS |
| /apps/{slug} | /zh/ecosystem/google-earth-engine | /en/ecosystem/google-earth-engine | NEW | GEE |
| /apps/{slug} | /zh/ecosystem/mcp | /en/ecosystem/mcp | NEW | MCP |
| /apps/{slug} | /zh/ecosystem/skills | /en/ecosystem/skills | NEW | Skills |
| /apps/{slug} | /zh/ecosystem/plugins | /en/ecosystem/plugins | NEW | Plugins |

## Get Started Routes

| Attio Route | GeoWork Route (zh) | GeoWork Route (en) | Status | Notes |
|-------------|-------------------|-------------------|--------|-------|
| /help/reference/attio-101 | /zh/getting-started | /en/getting-started | NEW | Getting started |
| (no direct equiv) | /zh/community/experts | /en/community/experts | NEW | Experts/contributors |
| /startups | /zh/programs/education-research | /en/programs/education-research | NEW | Education & Research program |
| /contact/sales | /zh/contact | /en/contact | NEW | Contact page |

## Resources Routes

| Attio Route | GeoWork Route (zh) | GeoWork Route (en) | Status | Notes |
|-------------|-------------------|-------------------|--------|-------|
| /help | /zh/help | /en/help | NEW | Help center |
| /help/{slug} | /zh/help/{slug} | /en/help/{slug} | NEW | Help articles |
| /help/academy | /zh/learn | /en/learn | NEW | Academy → Learn |
| /help/academy/{slug} | /zh/learn/{slug} | /en/learn/{slug} | NEW | Learn articles |
| (docs.attio.com) | /zh/docs | /en/docs | NEW | Docs gateway (external link) |
| /partners | /zh/partners | /en/partners | NEW | Partners page |
| /changelog | /zh/changelog | /en/changelog | EXISTS | Rebuild |
| /changelog/{slug} | /zh/changelog/{slug} | /en/changelog/{slug} | EXISTS | Rebuild |
| /blog | /zh/blog | /en/blog | NEW | Blog listing |
| /blog/{slug} | /zh/blog/{slug} | /en/blog/{slug} | NEW | Blog detail |
| /engineering/blog | /zh/engineering | /en/engineering | NEW | Engineering listing |
| /engineering/blog/{slug} | /zh/engineering/{slug} | /en/engineering/{slug} | NEW | Engineering detail |
| /careers | /zh/careers | /en/careers | NEW | Careers/Contribute |

## Use Cases Routes

| Attio Route | GeoWork Route (zh) | GeoWork Route (en) | Status | Notes |
|-------------|-------------------|-------------------|--------|-------|
| /customers | /zh/use-cases | /en/use-cases | EXISTS | Rename |
| /customers/{slug} | /zh/use-cases/urban-expansion | /en/use-cases/urban-expansion | EXISTS | Use case detail |
| /customers/{slug} | /zh/use-cases/ndvi-time-series | /en/use-cases/ndvi-time-series | EXISTS | Use case detail |
| /customers/{slug} | /zh/use-cases/research-report | /en/use-cases/research-report | EXISTS | Use case detail |

## Project / Company Routes

| Attio Route | GeoWork Route (zh) | GeoWork Route (en) | Status | Notes |
|-------------|-------------------|-------------------|--------|-------|
| (about page) | /zh/about | /en/about | NEW | About page |
| /redefine | /zh/manifesto | /en/manifesto | NEW | Manifesto |
| /partners | /zh/partners | /en/partners | NEW | Partners |
| /careers | /zh/careers | /en/careers | NEW | Careers |
| /contact/sales | /zh/contact | /en/contact | NEW | Contact |

## Distribution / Trust Routes

| Attio Route | GeoWork Route (zh) | GeoWork Route (en) | Status | Notes |
|-------------|-------------------|-------------------|--------|-------|
| /download | /zh/download | /en/download | EXISTS | Rebuild |
| (status.attio.com) | /zh/status | /en/status | NEW | Status page |
| (trust.attio.com) | /zh/trust | /en/trust | NEW | Trust page |
| (trust.attio.com/security) | /zh/security | /en/security | NEW | Security page |
| /legal/privacy | /zh/privacy | /en/privacy | EXISTS | Rebuild |
| /legal/services-agreement | /zh/terms | /en/terms | EXISTS | Rebuild |
| /llms.txt | /llms.txt | /llms.txt | NEW | LLMs file |
| /sitemap.xml | /sitemap.xml | /sitemap.xml | EXISTS | Update |
| /robots.txt | /robots.txt | /robots.txt | EXISTS | Update |

## Gap List (Attio routes with no direct GeoWork equivalent)

| Attio Route | Reason | Recommendation |
|-------------|--------|----------------|
| /platform/automations | Redirects to /platform/workflows | Map to /platform/workflows |
| /solutions/* | Industry-specific CRM solutions | Defer to future iteration |
| /apps/{most apps} | 195 app details, CRM-specific | Replace with GeoWork ecosystem: QGIS, GDAL, etc. |
| /help/{most articles} | 234 help articles, CRM-specific | Start with /help, /getting-started, /glossary; link to docs |
| /changelog/{year}/{slug} | 211 changelog entries | Generate from GeoWork GitHub Releases |
| /blog/{most posts} | 29 blog posts, Attio-specific | Create GeoWork blog with own content |
| /engineering/blog/{posts} | 12 engineering posts | Create GeoWork engineering blog |
| /customers/{most stories} | 13 customer stories, CRM-specific | Create GeoWork use cases with real geospatial scenarios |
| /legal/* | 11 legal docs | Create GeoWork legal: Privacy, Terms, Security, DPA |

## Summary

- **Total GeoWork target routes**: ~50 unique routes (zh + en = ~100 page instances)
- **New routes to create**: ~35
- **Existing routes to rebuild**: ~15
- **Detail page templates**: 4 (blog, changelog, use-case, ecosystem)
- **Routes requiring user confirmation**: Solutions pages, specific blog/changelog content strategy

## Next Steps

1. User confirms Route Parity Matrix
2. Proceed to Iteration 1: Create route skeleton with metadata
3. Each route gets unique H1, metadata, and Attio reference mapping
`;

writeFileSync(`${ROOT}/docs/reference/attio/analysis/route-parity.md`, routeParity);
console.log('4/4 route-parity.md written');
console.log('\nAll analysis reports generated successfully.');
