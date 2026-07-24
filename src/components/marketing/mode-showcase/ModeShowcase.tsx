'use client';

import { useLocale } from '@/i18n/LocaleProvider';
import { getDict } from '@/i18n/dict';
import { useReveal } from '@/hooks/useReveal';
import { mediaAssets } from '@/data/media';
import { ModeShowcaseClient } from './ModeShowcaseClient';
import styles from './ModeShowcase.module.css';

const modeImages = {
  work: mediaAssets.modes.work,
  code: mediaAssets.modes.code,
  map: mediaAssets.modes.map,
};

export function ModeShowcase() {
  const { locale } = useLocale();
  const t = getDict(locale);
  const revealRef = useReveal();

  const modes = [
    {
      id: 'work',
      label: locale === 'zh' ? 'Work' : 'Work',
      description: locale === 'zh' ? '组织任务、文件、工具和成果。' : 'Organize tasks, files, tools, and outputs.',
      image: modeImages.work.src,
      alt: modeImages.work.alt,
    },
    {
      id: 'code',
      label: locale === 'zh' ? 'Code' : 'Code',
      description: locale === 'zh' ? '编写、运行和检查地理空间代码。' : 'Write, run, and inspect geospatial code.',
      image: modeImages.code.src,
      alt: modeImages.code.alt,
    },
    {
      id: 'map',
      label: locale === 'zh' ? 'Map' : 'Map',
      description: locale === 'zh' ? '查看图层、范围、结果和空间关系。' : 'View layers, extents, results, and spatial relationships.',
      image: modeImages.map.src,
      alt: modeImages.map.alt,
    },
  ];

  return (
    <section
      id="modes"
      ref={revealRef as React.RefObject<HTMLDivElement | null>}
      className={styles.section}
      aria-labelledby="modes-title"
    >
      <div className={styles.intro}>
        <p className={`${styles.eyebrow} reveal`} data-reveal-delay="0ms">
          {t.modes.eyebrow}
        </p>
        <h2 id="modes-title" className={`${styles.title} reveal`} data-reveal-delay="100ms">
          {t.modes.title}
        </h2>
        <p className={`${styles.description} reveal`} data-reveal-delay="200ms">
          {t.modes.description}
        </p>
      </div>

      <div className={`reveal`} data-reveal-delay="300ms">
        <ModeShowcaseClient modes={modes} />
      </div>
    </section>
  );
}
