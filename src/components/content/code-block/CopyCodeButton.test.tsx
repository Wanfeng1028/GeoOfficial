import { render, screen, act, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CopyCodeButton } from './CopyCodeButton';

vi.mock('./clipboard', () => ({
  copyToClipboard: vi.fn(),
}));

import { copyToClipboard } from './clipboard';

const mockedCopy = vi.mocked(copyToClipboard);

afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
});

test('renders idle label', () => {
  mockedCopy.mockResolvedValue(true);
  render(<CopyCodeButton value="const x = 1" />);
  expect(screen.getByRole('button', { name: '复制代码' })).toBeInTheDocument();
});

test('copies value and shows copied label on success', async () => {
  mockedCopy.mockResolvedValue(true);
  const user = userEvent.setup();
  render(<CopyCodeButton value="const x = 1" />);

  await user.click(screen.getByRole('button', { name: '复制代码' }));
  expect(mockedCopy).toHaveBeenCalledWith('const x = 1');
  expect(screen.getByRole('button', { name: '已复制' })).toBeInTheDocument();
});

test('resets to idle after 1500ms', async () => {
  mockedCopy.mockResolvedValue(true);
  vi.useFakeTimers();
  render(<CopyCodeButton value="const x = 1" />);

  await act(async () => {
    fireEvent.click(screen.getByRole('button', { name: '复制代码' }));
  });
  expect(screen.getByRole('button', { name: '已复制' })).toBeInTheDocument();

  await act(async () => {
    vi.advanceTimersByTime(1600);
  });
  expect(screen.getByRole('button', { name: '复制代码' })).toBeInTheDocument();
});

test('shows failed label when clipboard rejects', async () => {
  mockedCopy.mockResolvedValue(false);
  const user = userEvent.setup();
  render(<CopyCodeButton value="const x = 1" />);

  await user.click(screen.getByRole('button', { name: '复制代码' }));
  await act(async () => {});
  expect(screen.getByRole('button', { name: '复制失败' })).toBeInTheDocument();
});
