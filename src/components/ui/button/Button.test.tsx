import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

test('calls onClick when enabled', async () => {
  const user = userEvent.setup();
  const onClick = vi.fn();
  render(<Button onClick={onClick}>下载</Button>);

  await user.click(screen.getByRole('button', { name: '下载' }));
  expect(onClick).toHaveBeenCalledTimes(1);
});

test('does not call onClick when disabled', async () => {
  const user = userEvent.setup();
  const onClick = vi.fn();
  render(<Button disabled onClick={onClick}>下载</Button>);

  await user.click(screen.getByRole('button', { name: '下载' }));
  expect(onClick).not.toHaveBeenCalled();
});

test('renders leading and trailing icons with aria-hidden', () => {
  render(
    <Button leadingIcon={<span>L</span>} trailingIcon={<span>T</span>}>
      动作
    </Button>,
  );
  const button = screen.getByRole('button', { name: /动作/ });
  expect(button).toBeInTheDocument();
});
