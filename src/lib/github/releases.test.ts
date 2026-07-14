import { describe, expect, it, vi, afterEach } from 'vitest';
import { getLatestRelease } from './releases';
import type { GithubRelease } from './release-schema';

const sampleRelease: GithubRelease = {
  tag_name: 'v0.5.0',
  name: 'v0.5.0',
  body: 'release notes',
  html_url: 'https://github.com/Wanfeng1028/GeoWork/releases/tag/v0.5.0',
  published_at: '2026-07-01T00:00:00Z',
  prerelease: true,
  draft: false,
  assets: [],
};

function mockFetchOk(payload: unknown) {
  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue({
      ok: true,
      json: async () => payload,
    }),
  );
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('getLatestRelease', () => {
  it('returns github source when API returns a release', async () => {
    mockFetchOk([sampleRelease]);
    const result = await getLatestRelease();
    expect(result.source).toBe('github');
    expect(result.release?.tag_name).toBe('v0.5.0');
  });

  it('returns no-release when API returns empty array', async () => {
    mockFetchOk([]);
    const result = await getLatestRelease();
    expect(result.source).toBe('no-release');
    expect(result.release).toBeNull();
  });

  it('skips draft releases and returns no-release when only drafts exist', async () => {
    mockFetchOk([{ ...sampleRelease, draft: true }]);
    const result = await getLatestRelease();
    expect(result.source).toBe('no-release');
    expect(result.release).toBeNull();
  });

  it('returns api-error on HTTP 403', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ ok: false, status: 403, json: async () => ({}) }),
    );
    const result = await getLatestRelease();
    expect(result.source).toBe('api-error');
    expect(result.release).toBeNull();
  });

  it('returns api-error on HTTP 500', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ ok: false, status: 500, json: async () => ({}) }),
    );
    const result = await getLatestRelease();
    expect(result.source).toBe('api-error');
  });

  it('returns api-error when fetch throws', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('network')));
    const result = await getLatestRelease();
    expect(result.source).toBe('api-error');
  });

  it('returns invalid-response when body is not valid JSON text', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => {
          throw new Error('invalid json');
        },
      }),
    );
    const result = await getLatestRelease();
    expect(result.source).toBe('api-error');
  });

  it('returns invalid-response when schema does not match', async () => {
    mockFetchOk([{ wrong: 'shape' }]);
    const result = await getLatestRelease();
    expect(result.source).toBe('invalid-response');
    expect(result.release).toBeNull();
  });
});
