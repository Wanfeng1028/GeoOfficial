import { render, screen } from '@testing-library/react';
import { Logo } from './Logo';

test('renders logo with accessible label', () => {
  render(<Logo />);
  expect(screen.getByAltText('GeoWork')).toBeInTheDocument();
});

test('renders the official horizontal wordmark when enabled', () => {
  render(<Logo wordmark />);
  expect(screen.getByAltText('GeoWork')).toBeInTheDocument();
});
