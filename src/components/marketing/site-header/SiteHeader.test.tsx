import { render, screen } from '@testing-library/react';
import { SiteHeader } from './SiteHeader';

test('renders brand link pointing home', () => {
  render(<SiteHeader />);

  expect(screen.getByRole('link', { name: 'GeoWork 首页' })).toHaveAttribute('href', '/');
});

test('header exposes download CTA', () => {
  render(<SiteHeader />);
  expect(screen.getByRole('link', { name: '下载' })).toHaveAttribute('href', '/download');
});

test('GitHub action points to repository', () => {
  render(<SiteHeader />);
  const github = document.querySelector('a[href="https://github.com/Wanfeng1028/GeoWork"]');
  expect(github).not.toBeNull();
  expect(github?.getAttribute('target')).toBe('_blank');
});

test('primary nav element exists', () => {
  render(<SiteHeader />);
  const nav = document.querySelector('nav[aria-label="主导航"]');
  expect(nav).not.toBeNull();
});
