import { render, screen } from '@testing-library/react';
import { SiteHeader } from './SiteHeader';

test('renders brand link pointing home', () => {
  render(<SiteHeader />);

  expect(screen.getByRole('link', { name: 'GeoWork 首页' })).toHaveAttribute('href', '/');
});

test('header exposes primary CTA', () => {
  render(<SiteHeader />);
  expect(screen.getByRole('link', { name: 'Explore GeoWork' })).toHaveAttribute('href', '/product');
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
