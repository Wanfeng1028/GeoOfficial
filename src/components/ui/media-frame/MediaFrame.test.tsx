import { render, screen } from '@testing-library/react';
import { MediaFrame } from './MediaFrame';

test('renders frame with caption', () => {
  render(
    <MediaFrame ratio="16:9" caption="GeoWork Work 模式截图">
      <img src="/media/modes/work.svg" alt="GeoWork Work 模式截图" />
    </MediaFrame>,
  );

  expect(screen.getByRole('img', { name: 'GeoWork Work 模式截图' })).toBeInTheDocument();
  expect(screen.getByText('GeoWork Work 模式截图')).toBeInTheDocument();
});
