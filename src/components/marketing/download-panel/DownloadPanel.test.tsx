import { render, screen } from '@testing-library/react';
import { DownloadPanel } from './DownloadPanel';
import type { ReleaseResult } from '@/lib/github/releases';

vi.mock('@/lib/github/releases', () => ({
  getLatestRelease: vi.fn<() => Promise<ReleaseResult>>(),
}));

import { getLatestRelease } from '@/lib/github/releases';

const mockedGetLatestRelease = vi.mocked(getLatestRelease);

beforeEach(() => {
  mockedGetLatestRelease.mockReset();
});

test('renders download panel heading', async () => {
  mockedGetLatestRelease.mockResolvedValue({
    source: 'no-release',
    release: null,
  });

  render(await DownloadPanel());

  expect(
    screen.getByRole('heading', { name: '开始使用 GeoWork。' }),
  ).toBeInTheDocument();
});

test('shows no-release fallback when GitHub has no release', async () => {
  mockedGetLatestRelease.mockResolvedValue({
    source: 'no-release',
    release: null,
  });

  render(await DownloadPanel());

  expect(
    screen.getByText('GeoWork 当前尚未发布官方安装包。'),
  ).toBeInTheDocument();
  expect(screen.getAllByRole('link', { name: /GitHub Releases/ }).length).toBeGreaterThan(0);
});

test('shows release tag when GitHub returns a release', async () => {
  mockedGetLatestRelease.mockResolvedValue({
    source: 'github',
    release: {
      tag_name: 'v0.5.0',
      name: 'v0.5.0',
      body: '测试 Release 正文',
      html_url: 'https://github.com/Wanfeng1028/GeoWork/releases/tag/v0.5.0',
      published_at: '2026-07-01T00:00:00Z',
      prerelease: true,
      draft: false,
      assets: [
        {
          id: 1,
          name: 'GeoWork-windows-x64.exe',
          browser_download_url: 'https://example.com/win.exe',
          size: 50000000,
          content_type: 'application/octet-stream',
        },
      ],
    },
  });

  render(await DownloadPanel());

  expect(screen.getByText('v0.5.0 · Developer Preview')).toBeInTheDocument();
  expect(screen.getByText('测试 Release 正文')).toBeInTheDocument();
});

test('shows api-error fallback when GitHub fetch fails', async () => {
  mockedGetLatestRelease.mockResolvedValue({
    source: 'api-error',
    release: null,
  });

  render(await DownloadPanel());

  expect(
    screen.getByText('暂时无法读取 GitHub Release 信息。'),
  ).toBeInTheDocument();
});
