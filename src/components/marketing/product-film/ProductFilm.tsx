'use client';

import { useCallback, useRef, useState } from 'react';
import { PauseIcon, PlayIcon } from '@phosphor-icons/react/ssr';
import styles from './ProductFilm.module.css';

interface ProductFilmProps {
  videoSrc?: string;
  posterSrc?: string;
  /** Fallback poster for reduced-motion / non-video environments */
  fallbackPoster?: string;
}

export function ProductFilm({
  videoSrc,
  posterSrc,
  fallbackPoster,
}: ProductFilmProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [prefersReduced, setPrefersReduced] = useState(false);

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      void video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }, []);

  return (
    <div className={styles.wrapper}>
      {/* 视频 — 仅在 no-preference 时显示 */}
      {videoSrc ? (
        <video
          ref={videoRef}
          className={styles.video}
          src={videoSrc}
          poster={posterSrc}
          muted
          autoPlay
          playsInline
          loop
          aria-label="GeoWork 产品演示"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />
      ) : (
        <div className={styles.poster}>
          <span className={styles.posterPlaceholder}>
            待替换：GeoFrontend2.0 产品录屏 12–20s
          </span>
        </div>
      )}

      {/* 暂停/播放按钮 — 视频模式 */}
      {videoSrc && (
        <button
          className={styles.control}
          onClick={togglePlay}
          aria-label={isPlaying ? '暂停' : '播放'}
          type="button"
        >
          {isPlaying ? (
            <PauseIcon size={16} aria-hidden />
          ) : (
            <PlayIcon size={16} aria-hidden />
          )}
        </button>
      )}
    </div>
  );
}