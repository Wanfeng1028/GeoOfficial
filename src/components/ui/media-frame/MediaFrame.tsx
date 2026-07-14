import type { CSSProperties, ReactNode } from 'react';
import { cn } from '@/lib/cn';
import styles from './MediaFrame.module.css';

type Ratio = '16:10' | '16:9' | '4:3' | 'auto';
type Tone = 'light' | 'dark' | 'none';

interface MediaFrameProps {
  className?: string;
  ratio?: Ratio;
  tone?: Tone;
  caption?: string;
  assetStatus?: 'missing';
  children?: ReactNode;
  style?: CSSProperties;
}

export function MediaFrame({
  className,
  ratio = '16:10',
  tone = 'light',
  caption,
  assetStatus,
  children,
  style,
}: MediaFrameProps) {
  return (
    <div
      className={cn(styles.frame, styles[tone], className)}
      data-ratio={ratio}
      data-asset-status={assetStatus}
      style={style}
    >
      <div className={styles.inner}>
        {children ?? (
          <p className={styles.missing}>
            待替换：GeoFrontend2.0 {ratio} 截图或录屏 poster
          </p>
        )}
      </div>
      {caption ? <p className={styles.caption}>{caption}</p> : null}
    </div>
  );
}
