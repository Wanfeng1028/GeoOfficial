'use client';

import { Container } from '@/components/ui/container/Container';
import { ProductStage } from '@/components/marketing/product-stage/ProductStage';
import { workflowSteps } from '@/data/workflow-steps';
import styles from './WorkflowNarrative.module.css';

export function WorkflowNarrative() {
  return (
    <section id="workflow" className={styles.section} aria-labelledby="workflow-title">
      <Container>
        <div className={styles.intro}>
          <p className={styles.eyebrow}>Workflow</p>
          <h2 id="workflow-title" className={styles.title}>
            从项目开始，以可继续工作的成果结束。
          </h2>
          <p className={styles.description}>
            一个 GeoWork 项目贯穿 Define → Organize → Analyze → Verify → Deliver 五个阶段，
            每个阶段的工作成果自然成为下一阶段的输入。
          </p>
        </div>

        <div className={styles.layout}>
          {/* 左侧步骤列表 */}
          <ol className={styles.steps}>
            {workflowSteps.map((step) => (
              <li key={step.id} className={styles.step}>
                <div className={styles.stepHead}>
                  <span className={styles.stepNumber}>{step.number}</span>
                  <span className={styles.stepLabel}>{step.label}</span>
                </div>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDesc}>{step.description}</p>
              </li>
            ))}
          </ol>

          {/* 右侧产品舞台 */}
          <div className={styles.mediaWrap}>
            <ProductStage />
            <p className={styles.mediaCaption}>
              同一项目在 Define → Organize → Analyze → Verify → Deliver 各阶段的状态变化
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
