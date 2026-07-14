import { render, screen, waitFor } from '@testing-library/react';
import { CodeBlock } from './CodeBlock';

test('renders filename when provided', async () => {
  const ui = await CodeBlock({
    code: 'const answer = 42',
    language: 'typescript',
    filename: 'answer.ts',
  });
  render(ui);

  expect(screen.getByText('answer.ts')).toBeInTheDocument();
});

test('renders language as filename fallback', async () => {
  const ui = await CodeBlock({
    code: 'print("hi")',
    language: 'python',
  });
  render(ui);

  expect(screen.getByText('python')).toBeInTheDocument();
});

test('outputs highlighted HTML via Shiki', async () => {
  const ui = await CodeBlock({
    code: 'const answer = 42',
    language: 'typescript',
  });
  const { container } = render(ui);

  await waitFor(() => {
    // Shiki produces <pre class="shiki"><code>...</code></pre>
    expect(container.querySelector('pre.shiki')).not.toBeNull();
  });
});

test('renders copy button with raw code value', async () => {
  const ui = await CodeBlock({
    code: 'const answer = 42',
    language: 'typescript',
  });
  render(ui);

  expect(screen.getByRole('button', { name: '复制代码' })).toBeInTheDocument();
});
