import { render, screen } from '@testing-library/react';
import { SiteHeader } from './SiteHeader';

// LocaleSwitcher 依赖 next/navigation 的 useRouter/usePathname，jsdom 无 Next router 挂载，需 mock
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn(), prefetch: vi.fn() }),
  usePathname: () => '/zh',
}));

test('renders brand link pointing home', () => {
  render(<SiteHeader />);

  expect(screen.getByRole('link', { name: 'GeoWork 首页' })).toHaveAttribute('href', '/');
});

test('header exposes primary CTA', () => {
  render(<SiteHeader />);
  expect(screen.getByRole('link', { name: '了解 GeoWork' })).toHaveAttribute('href', '/platform');
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
