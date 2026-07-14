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
export type GithubReleaseAsset = z.infer<typeof releaseAssetSchema>;
