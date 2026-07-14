import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Popover, PopoverTrigger, PopoverContent } from './Popover';
import { Button } from '@/components/ui/button/Button';

test('opens popover on trigger click and closes via Esc', async () => {
  const user = userEvent.setup();
  render(
    <Popover>
      <PopoverTrigger asChild>
        <Button>版本说明</Button>
      </PopoverTrigger>
      <PopoverContent>当前为 Developer Preview</PopoverContent>
    </Popover>,
  );

  await user.click(screen.getByRole('button', { name: '版本说明' }));
  expect(screen.getByText('当前为 Developer Preview')).toBeInTheDocument();

  await user.keyboard('{Escape}');
  expect(screen.queryByText('当前为 Developer Preview')).not.toBeInTheDocument();
});
