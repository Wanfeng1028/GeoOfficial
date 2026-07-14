import { serverEnv } from '@/lib/env';
import { githubReleaseListSchema, type GithubRelease } from './release-schema';

export interface ReleaseResult {
  source:
    | 'github'
    | 'no-release'
    | 'api-error'
    | 'invalid-response';
  release: GithubRelease | null;
}

const noReleaseResult: ReleaseResult = {
  source: 'no-release',
  release: null,
};

/**
 * 获取最新非 draft Release。
 *
 * 返回 `ReleaseResult`，明确区分：
 * - `github`：成功获得真实 Release
 * - `no-release`：API 成功但仓库当前没有任何 Release
 * - `api-error`：fetch 抛异常或 HTTP 非 2xx
 * - `invalid-response`：JSON 解析或 schema 校验失败
 *
 * 不再返回伪造的 v0.4.x-dev fallback。调用方据此渲染降级 UI。
 */
export async function getLatestRelease(): Promise<ReleaseResult> {
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

    if (!response.ok) {
      return { source: 'api-error', release: null };
    }

    const json: unknown = await response.json();
    const parsed = githubReleaseListSchema.safeParse(json);
    if (!parsed.success) {
      return { source: 'invalid-response', release: null };
    }

    const release = parsed.data.find((item) => !item.draft);
    if (!release) {
      return noReleaseResult;
    }

    return { source: 'github', release };
  } catch {
    return { source: 'api-error', release: null };
  }
}
