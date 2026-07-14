import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './Accordion';
import { Button } from '@/components/ui/button/Button';

test('toggles panel on trigger click', async () => {
  const user = userEvent.setup();
  render(
    <Accordion type="single" collapsible>
      <AccordionItem value="windows">
        <AccordionTrigger asChild>
          <Button>Windows 要求</Button>
        </AccordionTrigger>
        <AccordionContent>Windows 10 1909+</AccordionContent>
      </AccordionItem>
      <AccordionItem value="mac">
        <AccordionTrigger asChild>
          <Button>macOS 要求</Button>
        </AccordionTrigger>
        <AccordionContent>暂未提供</AccordionContent>
      </AccordionItem>
    </Accordion>,
  );

  await user.click(screen.getByRole('button', { name: 'Windows 要求' }));
  expect(screen.getByText('Windows 10 1909+')).toBeInTheDocument();
});
