import { render, screen } from '@testing-library/react';
import { WorkflowStory } from './WorkflowStory';

test('renders ordered list of workflow steps', () => {
  render(<WorkflowStory />);

  const list = screen.getByRole('list');
  expect(list.tagName).toBe('OL');
  expect(list.querySelectorAll('li').length).toBeGreaterThan(0);
});

test('each step has a label and title', () => {
  render(<WorkflowStory />);
  const items = screen.getAllByRole('listitem');
  for (const item of items) {
    expect(item.querySelector('h3')).not.toBeNull();
  }
});
