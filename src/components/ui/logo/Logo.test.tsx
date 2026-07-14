import { render, screen } from '@testing-library/react';
import { Logo } from './Logo';

test('renders logo with aria-label', () => {
  render(<Logo />);
  expect(screen.getByLabelText('GeoWork')).toBeInTheDocument();
});

test('renders wordmark when enabled', () => {
  render(<Logo wordmark />);
  expect(screen.getByText('GeoWork')).toBeInTheDocument();
});
