'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button/Button';
import styles from './error.module.css';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className={styles.wrap}>
      <h1 className={styles.title}>页面出现问题。</h1>
      <p className={styles.description}>
        可以尝试重新加载，或前往 GitHub 查看最新状态。错误编号：
        {error.digest ?? 'unknown'}。
      </p>
      <div className={styles.actions}>
        <Button variant="primary" onClick={reset}>
          重新加载
        </Button>
        <Button asChild variant="text">
          <a
            href="https://github.com/Wanfeng1028/GeoWork/issues"
            target="_blank"
            rel="noreferrer"
          >
            前往 GitHub
          </a>
        </Button>
      </div>
    </div>
  );
}
