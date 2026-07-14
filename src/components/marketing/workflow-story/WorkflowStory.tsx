import { Section } from '@/components/ui/section/Section';
import { Container } from '@/components/ui/container/Container';
import { SectionHeading } from '@/components/ui/section-heading/SectionHeading';
import { homeContent } from '@/data/home';
import { MediaFrame } from '@/components/ui/media-frame/MediaFrame';
import styles from './WorkflowStory.module.css';

export function WorkflowStory() {
  const { workflow } = homeContent;

  return (
    <Section tone="canvas" spacing="large" id="workflow">
      <Container>
        <SectionHeading
          eyebrow={workflow.eyebrow}
          title={workflow.title}
          description={workflow.subtitle}
        />
        <ol className={styles.steps}>
          {workflow.steps.map((step) => (
            <li key={step.id} className={styles.step}>
              <div className={styles.stepHead}>
                <span className={styles.stepLabel}>{step.label}</span>
                <h3 className={styles.stepTitle}>{step.title}</h3>
              </div>
              <p className={styles.stepDescription}>{step.description}</p>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
