import { render, screen } from '@testing-library/react';
import { DownloadPanel } from './DownloadPanel';

test('renders download panel heading', async () => {
  render(await DownloadPanel());

  expect(
    screen.getByRole('heading', { name: '开始使用 GeoWork。' }),
  ).toBeInTheDocument();
});

test('exposes GitHub Releases link as fallback', async () => {
  render(await DownloadPanel());

  expect(screen.getAllByRole('link', { name: /GitHub Releases/ }).length).toBeGreaterThan(0);
});
