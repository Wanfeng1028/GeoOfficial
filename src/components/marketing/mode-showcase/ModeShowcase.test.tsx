import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ModeShowcaseClient } from './ModeShowcaseClient';

const modes = [
  {
    id: 'work',
    label: 'Work',
    description: '地图与报告',
    image: '/media/modes/work.svg',
    alt: 'GeoWork Work 模式截图',
  },
  {
    id: 'code',
    label: 'Code',
    description: '代码与终端',
    image: '/media/modes/code.svg',
    alt: 'GeoWork Code 模式截图',
  },
  {
    id: 'map',
    label: 'Map',
    description: '制图与可视化',
    image: '/media/modes/map.svg',
    alt: 'GeoWork Map 模式截图',
  },
] as const;

test('renders one tab per mode', () => {
  render(<ModeShowcaseClient modes={modes} />);

  expect(screen.getByRole('tab', { name: /Work/ })).toBeInTheDocument();
  expect(screen.getByRole('tab', { name: /Code/ })).toBeInTheDocument();
  expect(screen.getByRole('tab', { name: /Map/ })).toBeInTheDocument();
});

test('selecting a tab reveals its image', async () => {
  const user = userEvent.setup();
  render(<ModeShowcaseClient modes={modes} />);

  await user.click(screen.getByRole('tab', { name: /Code/ }));
  expect(screen.getByAltText('GeoWork Code 模式截图')).toBeInTheDocument();
});

test('ArrowRight moves focus between tabs', async () => {
  const user = userEvent.setup();
  render(<ModeShowcaseClient modes={modes} />);

  const workTab = screen.getByRole('tab', { name: /Work/ });
  workTab.focus();
  await user.keyboard('{ArrowRight}');
  expect(screen.getByRole('tab', { name: /Code/ })).toHaveFocus();
});
