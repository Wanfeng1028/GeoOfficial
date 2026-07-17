import { siteConfig } from '@/lib/site';
import { productFacts } from '@/data/product-facts';

/**
 * /llms.txt — LLM-friendly summary of GeoWork.
 * Per v2.5 plan section 7.7.
 *
 * Spec: https://llmstxt.org/
 * Provides a concise, plain-text overview that LLMs can ingest.
 */
export async function GET() {
  const body = `# GeoWork

> ${siteConfig.title}
> ${siteConfig.description}

## Status
${productFacts.status}${productFacts.version ? ` · Version ${productFacts.version}` : ' · no public release yet'}

## What it is
GeoWork is a desktop workspace for geospatial work. It brings maps, remote sensing, code, research, and automation into one continuous workspace, organized around a single project context.

## Core concepts
- Project / Dataset / Layer / Task / Artifact — five core objects sharing one context.
- Work / Code / Map — three modes that don't lose context when you switch.
- Skills, MCP, plugins, and tool adapters extend the workspace rather than replacing existing tools.

## Repositories
- GeoWork main: ${productFacts.repositories.product}
- GeoFrontend (desktop): ${productFacts.repositories.frontend}
- GeoOfficial (website): ${productFacts.repositories.website}

## Key routes
- /platform — platform overview
- /platform/assistant — Assistant
- /platform/ai — AI agents
- /platform/data — data model
- /platform/context — project context
- /platform/workflows — workflows
- /ecosystem — tool ecosystem (QGIS, GDAL, Python, PostGIS, GEE, MCP, Skills, plugins)
- /use-cases — real geospatial work cases
- /docs — developer documentation
- /changelog — version history
- /download — get GeoWork
- /plans — current stage and roadmap

## Contact
GitHub Issues: ${productFacts.repositories.product}/issues
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
