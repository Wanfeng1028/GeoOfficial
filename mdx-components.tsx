import type { MDXComponents } from 'mdx/types';
import * as contentComponents from '@/components/content/mdx-components';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...contentComponents,
    ...components,
  };
}
