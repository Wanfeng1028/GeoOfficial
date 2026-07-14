import { serverEnv } from '@/lib/env';
import { githubReleaseListSchema, type GithubRelease } from './release-schema';

const fallbackRelease: GithubRelease = {
  tag_name: 'v0.4.x-dev',
  name: 'Developer Preview',
  body:
    'GeoWork 当前处于开发阶段。请前往 GitHub 查看最新构建与说明。',
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

export { fallbackRelease as fallbackReleaseObject };
