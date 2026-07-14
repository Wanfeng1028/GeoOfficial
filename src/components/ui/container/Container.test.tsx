import { render, screen } from '@testing-library/react';
import { Container } from './Container';

test('renders div with children by default', () => {
  render(
    <Container>
      <span>内容</span>
    </Container>,
  );

  expect(screen.getByText('内容')).toBeInTheDocument();
});

test('applies width class for width prop', () => {
  const { container } = render(
    <Container width="wide">
      <span>宽</span>
    </Container>,
  );

  expect(container.firstElementChild).not.toBeNull();
});
