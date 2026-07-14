import Link from 'next/link';
import { Button } from '@/components/ui/button/Button';
import styles from './not-found.module.css';

export default function NotFound() {
  return (
    <div className={styles.wrap}>
      <p className={styles.code}>404</p>
      <h1 className={styles.title}>页面未找到。</h1>
      <p className={styles.description}>
        这个地址没有对应内容。可以返回首页，或前往 GitHub、Releases 和文档继续。
      </p>
      <div className={styles.actions}>
        <Button asChild variant="primary">
          <Link href="/">返回首页</Link>
        </Button>
        <Button asChild variant="text">
          <a
            href="https://github.com/Wanfeng1028/GeoWork"
            target="_blank"
            rel="noreferrer"
          >
            GitHub 仓库
          </a>
        </Button>
        <Button asChild variant="text">
          <Link href="/download">查看下载</Link>
        </Button>
      </div>
    </div>
  );
}
