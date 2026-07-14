import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogClose,
} from './Dialog';
import { Button } from '@/components/ui/button/Button';

test('opens and closes via Esc', async () => {
  const user = userEvent.setup();
  render(
    <Dialog>
      <DialogTrigger asChild>
        <Button>打开菜单</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>菜单</DialogTitle>
        <DialogClose asChild>
          <Button>关闭</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>,
  );

  await user.click(screen.getByRole('button', { name: '打开菜单' }));
  expect(screen.getByRole('heading', { name: '菜单' })).toBeInTheDocument();

  await user.keyboard('{Escape}');
  expect(screen.queryByRole('heading', { name: '菜单' })).not.toBeInTheDocument();
});
