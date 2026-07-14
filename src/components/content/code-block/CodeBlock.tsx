import * as React from 'react';
import styles from './code-block.module.css';

export interface CodeBlockProps {
  language: string;
  code: string;
  filename?: string;
}

/**
 * Shiki 服务端高亮的代码块。复制按钮为独立客户端 island。
 * 服务端不渲染 Shiki 客户端对象；高亮通过 src/lib/content/highlight.ts 在服务端完成。
 */
export function CodeBlock({ language, code, filename }: CodeBlockProps): React.ReactElement {
  return (
    <figure className={styles.figure}>
      {filename ? <figcaption className={styles.filename}>{filename}</figcaption> : null}
      <pre className={styles.pre} data-language={language}>
        <code className={styles.code}>{code}</code>
      </pre>
    </figure>
  );
}

/**
 * 独立客户端复制按钮。仅渲染按钮，复制逻辑由父级传入。
 * 这里做成纯客户端 island：在服务端构建时仅占位，可被单独 hydration。
 */
export function CopyButton({
  value,
  label = '复制',
}: {
  value: string;
  label?: string;
}): React.ReactElement {
  const [copied, setCopied] = React.useState(false);
  return (
    <button
      type="button"
      className={styles.copy}
      aria-label={label}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setCopied(true);
          window.setTimeout(() => setCopied(false), 1500);
        } catch {
          setCopied(false);
        }
      }}
    >
      {copied ? '已复制' : label}
    </button>
  );
}
