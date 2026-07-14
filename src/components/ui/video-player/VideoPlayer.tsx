'use client';

import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { cn } from '@/lib/cn';
import styles from './VideoPlayer.module.css';

export interface VideoSource {
  src: string;
  type: string;
}

interface VideoPlayerProps {
  poster: string;
  sources: VideoSource[];
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  ariaLabel: string;
  className?: string;
  style?: CSSProperties;
}

export function VideoPlayer({
  poster,
  sources,
  autoPlay = false,
  loop = false,
  muted = true,
  ariaLabel,
  className,
  style,
}: VideoPlayerProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [reduced, setReduced] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = () => setReduced(media.matches);
    handler();
    media.addEventListener('change', handler);
    return () => media.removeEventListener('change', handler);
  }, []);

  // Pause when tab hidden
  useEffect(() => {
    if (!ref.current) return;
    const video = ref.current;
    const onVisibility = () => {
      if (document.hidden && !video.paused) video.pause();
    };
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  if (reduced) {
    // reduced motion: show poster only
    return (
      <img
        src={poster}
        alt={ariaLabel}
        className={cn(styles.poster, className)}
        style={style}
      />
    );
  }

  return (
    <video
      ref={ref}
      className={cn(styles.video, className)}
      poster={poster}
      autoPlay={autoPlay}
      loop={loop}
      muted={muted}
      playsInline
      preload="metadata"
      aria-label={ariaLabel}
      style={style}
      onPlay={() => setPlaying(true)}
      onPause={() => setPlaying(false)}
    >
      {sources.map((source) => (
        <source key={source.src} src={source.src} type={source.type} />
      ))}
    </video>
  );
}
