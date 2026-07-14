import { render, screen } from '@testing-library/react';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from './Tooltip';

test('renders trigger with accessible name', () => {
  render(
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button aria-label="帮助">?</button>
        </TooltipTrigger>
        <TooltipContent>这是说明</TooltipContent>
      </Tooltip>
    </TooltipProvider>,
  );

  expect(screen.getByRole('button', { name: '帮助' })).toBeInTheDocument();
});
