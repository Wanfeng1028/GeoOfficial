'use client';

import { useState, useCallback, useRef } from 'react';
import Image from 'next/image';
import { ArrowLeftIcon, ArrowRightIcon } from '@phosphor-icons/react/ssr';
import { cn } from '@/lib/cn';
import styles from './ModeShowcase.module.css';

interface ModeItem {
  id: string;
  label: string;
  description: string;
  image: string;
  alt: string;
}

interface ModeShowcaseClientProps {
  modes: readonly ModeItem[];
}

const modeDetails: Record<string, { title: string; features: string[] }> = {
  work: {
    title: '项目管理、任务调度、工具集成、成果汇总。',
    features: [
      '项目导航与文件树',
      '任务列表与执行状态',
      '工具面板与 Skills 集成',
      '进度追踪与成果预览',
    ],
  },
  code: {
    title: '编写、运行、调试地理空间代码和脚本。',
    features: [
      'Python 编辑器与语法高亮',
      '终端与运行日志',
      'GDAL / GEE / QGIS 集成',
      '代码片段与版本追溯',
    ],
  },
  map: {
    title: '浏览、叠加、分析空间数据和制图输出。',
    features: [
      '图层管理与样式配置',
      '多源影像与矢量叠加',
      '空间查询与属性查看',
      '制图输出与导出',
    ],
  },
};

export function ModeShowcaseClient({ modes }: ModeShowcaseClientProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  const goTo = useCallback(
    (index: number) => {
      if (isTransitioning) return;
      const clamped = ((index % modes.length) + modes.length) % modes.length;
      setIsTransitioning(true);
      setActiveIndex(clamped);
      setTimeout(() => setIsTransitioning(false), 300);
    },
    [modes.length, isTransitioning],
  );

  const goPrev = useCallback(() => {
    goTo(activeIndex - 1);
  }, [activeIndex, goTo]);

  const goNext = useCallback(() => {
    goTo(activeIndex + 1);
  }, [activeIndex, goTo]);

  return (
    <div className={styles.carouselWrap}>
      {/* Pill Tab Bar */}
      <div className={styles.pillBar}>
        {modes.map((mode, i) => (
          <button
            key={mode.id}
            className={cn(
              styles.pill,
              i === activeIndex && styles.pillActive,
            )}
            onClick={() => goTo(i)}
            aria-selected={i === activeIndex}
          >
            {mode.label}
          </button>
        ))}
      </div>

      {/* Card Carousel */}
      <div className={styles.carousel}>
        <div className={styles.track} ref={trackRef} style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
          {modes.map((mode) => {
            const details = modeDetails[mode.id];
            return (
              <div key={mode.id} className={styles.slide}>
                <div className={styles.card}>
                  <div className={styles.cardMedia}>
                    <Image
                      src={mode.image}
                      alt={mode.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 36rem"
                    />
                  </div>
                  <div className={styles.cardCopy}>
                    <p className={styles.cardLabel}>{mode.label}</p>
                    <h3 className={styles.cardTitle}>{details?.title ?? mode.description}</h3>
                    <p className={styles.cardDesc}>{mode.description}</p>
                    {details?.features && (
                      <ul className={styles.cardFeatures}>
                        {details.features.map((f) => (
                          <li key={f} className={styles.cardFeature}>
                            {f}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Arrows */}
        <button
          className={`${styles.arrow} ${styles.arrowPrev}`}
          onClick={goPrev}
          aria-label="Previous mode"
        >
          <ArrowLeftIcon size={20} weight="bold" />
        </button>
        <button
          className={`${styles.arrow} ${styles.arrowNext}`}
          onClick={goNext}
          aria-label="Next mode"
        >
          <ArrowRightIcon size={20} weight="bold" />
        </button>
      </div>

      {/* Dot Indicators */}
      <div className={styles.dots}>
        {modes.map((_, i) => (
          <button
            key={i}
            className={cn(styles.dot, i === activeIndex && styles.dotActive)}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
