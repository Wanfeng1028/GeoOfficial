import { render, screen } from '@testing-library/react';
import { SectionHeading } from './SectionHeading';

test('renders eyebrow, title at given heading level, description', () => {
  render(
    <SectionHeading
      eyebrow="原则"
      title="本地工作。"
      description="上下文统一。"
      level={2}
    />,
  );

  expect(screen.getByText('原则')).toBeInTheDocument();
  expect(screen.getByRole('heading', { level: 2, name: '本地工作。' })).toBeInTheDocument();
  expect(screen.getByText('上下文统一。')).toBeInTheDocument();
});
