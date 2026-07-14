import * as React from 'react';
import styles from './release-card.module.css';

export interface ReleaseAsset {
  name: string;
  url: string;
  size?: number;
  arch?: string;
}

export interface ReleaseCardProps {
  tagName: string;
  name?: string;
  publishedAt: string;
  prerelease: boolean;
  htmlUrl: string;
  body?: string;
  assets?: readonly ReleaseAsset[];
}

export function ReleaseCard({
  tagName,
  name,
  publishedAt,
  prerelease,
  htmlUrl,
  body,
  assets,
}: ReleaseCardProps): React.ReactElement {
  const date = new Date(publishedAt);
  const dateLabel = Number.isNaN(date.getTime())
    ? publishedAt
    : date.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <article className={styles.card}>
      <header className={styles.header}>
        <h3 className={styles.tagName}>{tagName}</h3>
        {prerelease ? <span className={styles.badge}>预览版</span> : null}
        {name && name !== tagName ? <span className={styles.name}>{name}</span> : null}
        <time className={styles.date} dateTime={publishedAt}>
          {dateLabel}
        </time>
      </header>

      {assets && assets.length > 0 ? (
        <ul className={styles.assets}>
          {assets.map((asset) => (
            <li key={asset.name} className={styles.asset}>
              <a href={asset.url} className={styles.assetLink}>
                {asset.name}
              </a>
              {asset.arch ? <span className={styles.arch}>{asset.arch}</span> : null}
            </li>
          ))}
        </ul>
      ) : null}

      {body ? <p className={styles.body}>{body}</p> : null}

      <footer className={styles.footer}>
        <a href={htmlUrl} target="_blank" rel="noreferrer" className={styles.viewLink}>
          在 GitHub 查看
        </a>
      </footer>
    </article>
  );
}
