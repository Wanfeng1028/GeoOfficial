import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from './DropdownMenu';
import { Button } from '@/components/ui/button/Button';

test('opens menu and closes on item select', async () => {
  const user = userEvent.setup();
  const onSelect = vi.fn();
  render(
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>平台</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onSelect={onSelect}>Windows</DropdownMenuItem>
        <DropdownMenuItem onSelect={onSelect}>macOS</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>,
  );

  await user.click(screen.getByRole('button', { name: '平台' }));
  await user.click(screen.getByRole('menuitem', { name: 'Windows' }));
  expect(onSelect).toHaveBeenCalled();
  expect(screen.queryByRole('menuitem', { name: 'Windows' })).not.toBeInTheDocument();
});
