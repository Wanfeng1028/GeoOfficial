import { render, screen } from '@testing-library/react';
import { Figure } from './Figure';

test('renders figure with figcaption and fig index', () => {
  render(
    <Figure fig="1" title="Work 模式协同" note="地图、代码与报告同屏">
      <img src="/media/modes/work.svg" alt="Work 模式协同" />
    </Figure>,
  );

  expect(screen.getByRole('figure')).toBeInTheDocument();
  expect(screen.getByText(/FIG 1/)).toBeInTheDocument();
  expect(screen.getByText('Work 模式协同')).toBeInTheDocument();
});
