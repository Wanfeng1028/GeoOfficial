import { z } from 'zod';

const serverSchema = z.object({
  GITHUB_OWNER: z.string().min(1).default('Wanfeng1028'),
  GITHUB_REPO: z.string().min(1).default('GeoWork'),
  GITHUB_TOKEN: z.string().optional(),
});

const publicSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url(),
  NEXT_PUBLIC_ENABLE_ANALYTICS: z.enum(['true', 'false']).default('false'),
});

export const serverEnv = serverSchema.parse({
  GITHUB_OWNER: process.env.GITHUB_OWNER,
  GITHUB_REPO: process.env.GITHUB_REPO,
  GITHUB_TOKEN: process.env.GITHUB_TOKEN,
});

const vercelUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : undefined;

const parsedPublicEnv = publicSchema.parse({
  NEXT_PUBLIC_SITE_URL:
    process.env.NEXT_PUBLIC_SITE_URL ??
    vercelUrl ??
    'http://localhost:3000',
  NEXT_PUBLIC_ENABLE_ANALYTICS: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS,
});

if (
  process.env.NODE_ENV === 'production' &&
  process.env.VERCEL === '1' &&
  parsedPublicEnv.NEXT_PUBLIC_SITE_URL.includes('localhost')
) {
  throw new Error(
    'NEXT_PUBLIC_SITE_URL must be set to a public URL in production deployment.',
  );
}

export const publicEnv = parsedPublicEnv;
