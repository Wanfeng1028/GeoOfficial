'use client';

import { useState } from 'react';
import { copyToClipboard } from './clipboard';
import styles from './CodeBlock.module.css';

interface CopyCodeButtonProps {
  value: string;
}

export function CopyCodeButton({ value }: CopyCodeButtonProps) {
  const [status, setStatus] = useState<'idle' | 'copied' | 'failed'>('idle');

  async function handleCopy() {
    const ok = await copyToClipboard(value);
    if (ok) {
      setStatus('copied');
      globalThis.setTimeout(() => {
        setStatus('idle');
      }, 1500);
    } else {
      setStatus('failed');
    }
  }

  const label =
    status === 'copied'
      ? '已复制'
      : status === 'failed'
        ? '复制失败'
        : '复制代码';

  return (
    <button
      type="button"
      className={styles.copyButton}
      onClick={handleCopy}
      aria-live="polite"
    >
      {label}
    </button>
  );
}
