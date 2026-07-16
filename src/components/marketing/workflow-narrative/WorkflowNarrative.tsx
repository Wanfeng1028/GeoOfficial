'use client';

import { useRef } from 'react';
import { useScroll, motion, type UseScrollOptions } from 'motion/react';
import { useLocale } from '@/i18n/LocaleProvider';
import { getDict } from '@/i18n/dict';
import { useScrollStep } from '@/components/scroll/use-scroll-step';
import { Container } from '@/components/ui/container/Container';
import { workflowSteps } from '@/data/workflow-steps';
import styles from './WorkflowNarrative.module.css';

export function WorkflowNarrative() {
  const { locale } = useLocale();
  const t = getDict(locale);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'] as UseScrollOptions['offset'],
  });

  const activeStep = useScrollStep(scrollYProgress, [0, 0.17, 0.34, 0.51, 0.68, 0.85]);

  return (
    <section ref={sectionRef} id="workflow" className={styles.section} aria-labelledby="workflow-title">
      <div className={styles.stickyWrap}>
        <Container>
          <div className={styles.intro}>
            <p className={styles.eyebrow}>{t.workflow.eyebrow}</p>
            <h2 id="workflow-title" className={styles.title}>
              {t.workflow.title}
            </h2>
            <p className={styles.description}>{t.workflow.description}</p>
          </div>

          <div className={styles.layout}>
            {/* 左侧步骤列表 */}
            <ol className={styles.steps}>
              {workflowSteps.map((step, i) => (
                <li
                  key={step.id}
                  className={`${styles.step}${activeStep >= i ? ` ${styles.stepActive}` : ''}`}
                >
                  <div className={styles.stepHead}>
                    <span className={styles.stepNumber}>{step.number}</span>
                    <span className={styles.stepLabel}>{step.label}</span>
                  </div>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepDesc}>{step.description}</p>
                </li>
              ))}
            </ol>

            {/* 右侧 Workflow Canvas */}
            <div className={styles.canvasWrap}>
              <div className={styles.canvas}>
                {/* Dot grid background */}
                <div className={styles.dotGrid} />

                {/* SVG nodes */}
                <svg className={styles.canvasSvg} viewBox="0 0 400 320" preserveAspectRatio="xMidYMid meet">
                  {/* Node 1: Trigger */}
                  <g className={activeStep >= 0 ? styles.nodeVisible : styles.nodeHidden}>
                    <rect x="20" y="140" width="80" height="40" rx="8" fill="var(--surface)" stroke="var(--border)" strokeWidth="1" />
                    <text x="60" y="164" textAnchor="middle" fill="var(--text-primary)" fontSize="11" fontWeight="600">Trigger</text>
                  </g>

                  {/* Node 2: Load Data */}
                  <g className={activeStep >= 1 ? styles.nodeVisible : styles.nodeHidden}>
                    <rect x="140" y="60" width="80" height="40" rx="8" fill="var(--surface)" stroke="var(--border)" strokeWidth="1" />
                    <text x="180" y="84" textAnchor="middle" fill="var(--text-primary)" fontSize="11" fontWeight="600">Load Data</text>
                    {/* Connection line */}
                    {activeStep >= 1 && (
                      <path d="M 100 160 L 140 80" stroke="var(--border-strong)" strokeWidth="1.5" fill="none" markerEnd="url(#arrow)" />
                    )}
                  </g>

                  {/* Node 3: Preprocess */}
                  <g className={activeStep >= 2 ? styles.nodeVisible : styles.nodeHidden}>
                    <rect x="160" y="220" width="80" height="40" rx="8" fill="var(--surface)" stroke="var(--border)" strokeWidth="1" />
                    <text x="200" y="244" textAnchor="middle" fill="var(--text-primary)" fontSize="11" fontWeight="600">Preprocess</text>
                    {activeStep >= 2 && (
                      <path d="M 180 100 L 200 220" stroke="var(--border-strong)" strokeWidth="1.5" fill="none" markerEnd="url(#arrow)" />
                    )}
                  </g>

                  {/* Node 4: Analyze */}
                  <g className={activeStep >= 3 ? styles.nodeVisible : styles.nodeHidden}>
                    <rect x="260" y="140" width="80" height="40" rx="8" fill="var(--surface)" stroke="var(--brand)" strokeWidth="1.5" />
                    <text x="300" y="164" textAnchor="middle" fill="var(--brand)" fontSize="11" fontWeight="600">Analyze</text>
                    {activeStep >= 3 && (
                      <path d="M 240 240 L 260 160" stroke="var(--border-strong)" strokeWidth="1.5" fill="none" markerEnd="url(#arrow)" />
                    )}
                  </g>

                  {/* Node 5: Verify */}
                  <g className={activeStep >= 4 ? styles.nodeVisible : styles.nodeHidden}>
                    <rect x="300" y="60" width="80" height="40" rx="8" fill="var(--surface)" stroke="var(--border)" strokeWidth="1" />
                    <text x="340" y="84" textAnchor="middle" fill="var(--text-primary)" fontSize="11" fontWeight="600">Verify</text>
                    {activeStep >= 4 && (
                      <path d="M 300 160 L 300 100" stroke="var(--border-strong)" strokeWidth="1.5" fill="none" markerEnd="url(#arrow)" />
                    )}
                  </g>

                  {/* Node 6: Export */}
                  <g className={activeStep >= 5 ? styles.nodeVisible : styles.nodeHidden}>
                    <rect x="300" y="260" width="80" height="40" rx="8" fill="var(--surface)" stroke="var(--status-green)" strokeWidth="1.5" />
                    <text x="340" y="284" textAnchor="middle" fill="var(--status-green)" fontSize="11" fontWeight="600">Export</text>
                    {activeStep >= 5 && (
                      <path d="M 340 100 L 340 260" stroke="var(--border-strong)" strokeWidth="1.5" fill="none" markerEnd="url(#arrow)" />
                    )}
                  </g>

                  <defs>
                    <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--border-strong)" />
                    </marker>
                  </defs>
                </svg>

                {/* Run History sidebar */}
                <div className={styles.runHistory}>
                  <p className={styles.runHistoryTitle}>Run History</p>
                  {['Queued', 'Running', 'Completed', 'Warning', 'Failed'].map((status, i) => (
                    <div
                      key={status}
                      className={`${styles.runItem}${activeStep >= i * 1.2 ? ` ${styles.runItemVisible}` : ''}`}
                    >
                      <span className={`${styles.runDot} ${styles[`run${status}`]}`} />
                      <span className={styles.runStatus}>{status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}