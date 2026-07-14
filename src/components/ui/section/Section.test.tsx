import { render, screen } from '@testing-library/react';
import { Section } from './Section';

test('renders semantic section with tone class', () => {
  const { container } = render(
    <Section tone="canvas" spacing="default">
      <p>段落</p>
    </Section>,
  );

  expect(container.firstElementChild?.tagName).toBe('SECTION');
  expect(screen.getByText('段落')).toBeInTheDocument();
});
