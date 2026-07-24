'use client';

import { useRef } from 'react';
import { useScroll, motion, AnimatePresence, type UseScrollOptions } from 'motion/react';
import { useLocale } from '@/i18n/LocaleProvider';
import { getDict } from '@/i18n/dict';
import { useScrollStep } from '@/components/scroll/use-scroll-step';
import { motionTokens } from '@/styles/motion-tokens';
import { Container } from '@/components/ui/container/Container';
import { productObjects } from '@/data/product-objects';
import styles from './ProductObjects.module.css';

const objectVisuals: Record<string, { icon: string; stats: { label: string; value: string }[]; preview: string }> = {
  project: {
    icon: 'P',
    stats: [
      { label: 'Area', value: '45 km²' },
      { label: 'Datasets', value: '12' },
      { label: 'Tasks', value: '8' },
    ],
    preview: 'Urban expansion study · 2020–2025',
  },
  dataset: {
    icon: 'D',
    stats: [
      { label: 'Landsat 8', value: '6 scenes' },
      { label: 'Sentinel-2', value: '4 scenes' },
      { label: 'Vectors', value: '3 files' },
    ],
    preview: 'Raster · Vector · CSV · PDF',
  },
  layer: {
    icon: 'L',
    stats: [
      { label: 'NDVI', value: 'visible' },
      { label: 'Urban', value: 'visible' },
      { label: 'Water', value: 'hidden' },
    ],
    preview: 'Style · Opacity · Filter · Label',
  },
  task: {
    icon: 'T',
    stats: [
      { label: 'NDVI calc', value: 'done' },
      { label: 'Change det.', value: 'running' },
      { label: 'Export', value: 'queued' },
    ],
    preview: 'Python · GDAL · GEE · Skills',
  },
  artifact: {
    icon: 'A',
    stats: [
      { label: 'Map', value: 'GeoTIFF' },
      { label: 'Report', value: 'PDF' },
      { label: 'Code', value: '.py' },
    ],
    preview: 'Export · Version · Share',
  },
};

export function ProductObjects() {
  const { locale } = useLocale();
  const t = getDict(locale);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'] as UseScrollOptions['offset'],
  });

  const activeStep = useScrollStep(scrollYProgress, [0, 0.2, 0.4, 0.6, 0.8]);

  const active = productObjects[activeStep] ?? productObjects[0];
  const visual = objectVisuals[active.id] ?? objectVisuals.project;

  return (
    <section ref={sectionRef} id="product-objects" className={styles.section} aria-labelledby="objects-title">
      <div className={styles.stickyWrap}>
        <Container>
          <div className={styles.intro}>
            <p className={`${styles.eyebrow} reveal`} data-reveal-delay="0ms">{t.productObjects.eyebrow}</p>
            <h2 id="objects-title" className={`${styles.title} reveal`} data-reveal-delay="100ms">
              {t.productObjects.title}
            </h2>
            <p className={`${styles.description} reveal`} data-reveal-delay="200ms">{t.productObjects.description}</p>
          </div>

          <div className={styles.layout}>
            {/* 左侧对象索引导航 */}
            <div className={styles.objectsList}>
              {productObjects.map((obj, i) => (
                <div
                  key={obj.id}
                  className={`${styles.objectBtn} reveal${activeStep === i ? ` ${styles.active}` : ''}`}
                  data-reveal-delay={`${300 + i * 60}ms`}
                >
                  <span className={styles.objectIndex}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className={styles.objectLabel}>{obj.label}</span>
                </div>
              ))}
            </div>

            {/* 右侧产品窗口 + 说明 */}
            <div className={styles.detailWrap}>
              {/* 产品窗口 */}
              <div className={styles.productWindow}>
                <div className={styles.windowHeader}>
                  <div className={styles.windowDots}>
                    <span className={styles.dot} style={{ background: '#d95858' }} />
                    <span className={styles.dot} style={{ background: '#d79a37' }} />
                    <span className={styles.dot} style={{ background: '#29b36a' }} />
                  </div>
                  <span className={styles.windowTitle}>GeoWork — {active.label}</span>
                </div>

                <div className={styles.windowBody}>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={active.id}
                      className={styles.objectVisual}
                      initial={{ opacity: 0, y: 12, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -12, scale: 0.98 }}
                      transition={{
                        duration: motionTokens.durationNormal,
                        ease: motionTokens.easeStandard,
                      }}
                    >
                      <div className={styles.visualIcon}>
                        <span>{visual.icon}</span>
                      </div>
                      <div className={styles.visualPreview}>
                        {visual.preview}
                      </div>
                      <div className={styles.visualStats}>
                        {visual.stats.map((stat) => (
                          <div key={stat.label} className={styles.visualStat}>
                            <span className={styles.visualStatValue}>{stat.value}</span>
                            <span className={styles.visualStatLabel}>{stat.label}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* 说明文字 */}
              <motion.div
                key={active.id}
                className={styles.detail}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: motionTokens.durationNormal,
                  ease: motionTokens.easeStandard,
                  delay: 0.06,
                }}
              >
                <h3 className={styles.objectTitle}>
                  {locale === 'en' ? active.enTitle : active.title}
                </h3>
                <p className={styles.objectDesc}>
                  {locale === 'en' ? active.enDescription : active.description}
                </p>
              </motion.div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}