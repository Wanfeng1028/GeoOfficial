'use client';

import { useRef } from 'react';
import { useScroll, useTransform, motion, type UseScrollOptions } from 'motion/react';
import { useLocale } from '@/i18n/LocaleProvider';
import { getDict } from '@/i18n/dict';
import { ThemeObserver } from '@/components/scroll/ThemeObserver';
import { Container } from '@/components/ui/container/Container';
import styles from './ContextShowcase.module.css';

export function ContextShowcase() {
  const { locale } = useLocale();
  const t = getDict(locale);
  const arcRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: arcRef,
    offset: ['start end', 'end start'] as UseScrollOptions['offset'],
  });

  const arcRotate = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const arcOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const middleArcRotate = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const innerArcRotate = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const orbitOpacity0 = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const orbitOpacity1 = useTransform(scrollYProgress, [0.2, 0.5], [0, 1]);
  const orbitOpacity2 = useTransform(scrollYProgress, [0.4, 0.7], [0, 1]);
  const orbitOpacity3 = useTransform(scrollYProgress, [0.6, 0.9], [0, 1]);
  const orbitOpacity4 = useTransform(scrollYProgress, [0.8, 1.1], [0, 1]);
  const orbitOpacities = [orbitOpacity0, orbitOpacity1, orbitOpacity2, orbitOpacity3, orbitOpacity4];

  return (
    <ThemeObserver theme="dark">
      <section ref={arcRef} id="context" className={styles.section} aria-labelledby="context-title">
        <Container>
          <div className={styles.intro}>
            <p className={styles.eyebrow}>{t.universalContext.eyebrow}</p>
            <h2 id="context-title" className={styles.title}>
              {t.universalContext.title.split('\n').map((line, i) => (
                <span key={i}>
                  {i > 0 && <br />}
                  {line}
                </span>
              ))}
            </h2>
            <p className={styles.description}>{t.universalContext.description}</p>
          </div>

          {/* Arc visualization */}
          <div className={styles.arcContainer}>
            <motion.svg
              className={styles.arc}
              viewBox="0 0 600 320"
              style={{ opacity: arcOpacity }}
            >
              {/* Outer arc */}
              <motion.path
                d="M 40 300 A 260 260 0 0 1 560 300"
                fill="none"
                stroke="rgba(255,255,255,0.06)"
                strokeWidth="1"
                style={{ rotate: arcRotate, transformOrigin: '300px 300px' }}
              />
              {/* Middle arc */}
              <motion.path
                d="M 80 300 A 220 220 0 0 1 520 300"
                fill="none"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="1.5"
                style={{ rotate: middleArcRotate, transformOrigin: '300px 300px' }}
              />
              {/* Inner arc */}
              <motion.path
                d="M 140 300 A 160 160 0 0 1 460 300"
                fill="none"
                stroke="rgba(85, 169, 136, 0.15)"
                strokeWidth="2"
                strokeDasharray="4 6"
                style={{ rotate: innerArcRotate, transformOrigin: '300px 300px' }}
              />
              {/* Center dot */}
              <motion.circle
                cx="300"
                cy="300"
                r="3"
                fill="rgba(85, 169, 136, 0.6)"
                style={{ opacity: arcOpacity }}
              />
              {/* Orbiting dots */}
              {[0, 72, 144, 216, 288].map((angle, i) => {
                const rad = ((angle + 45) * Math.PI) / 180;
                const r = 260;
                const cx = 300 + r * Math.cos(rad);
                const cy = 300 + r * Math.sin(rad);
                return (
                  <motion.circle
                    key={i}
                    cx={cx}
                    cy={cy}
                    r="2"
                    fill="rgba(255,255,255,0.2)"
                    style={{ opacity: orbitOpacities[i] }}
                  />
                );
              })}
            </motion.svg>
          </div>

          {/* Context items grid */}
          <div className={styles.grid}>
            {t.universalContext.items.map((item, i) => (
              <motion.div
                key={item.label}
                className={styles.item}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <div className={styles.itemIndex}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className={styles.itemLabel}>{item.label}</h3>
                <p className={styles.itemDesc}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>
    </ThemeObserver>
  );
}