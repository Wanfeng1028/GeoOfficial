import { Section } from '@/components/ui/section/Section';
import { Container } from '@/components/ui/container/Container';
import { SectionHeading } from '@/components/ui/section-heading/SectionHeading';
import { homeContent } from '@/data/home';
import { ModeShowcaseClient } from './ModeShowcaseClient';
import styles from './ModeShowcase.module.css';

export function ModeShowcase() {
  const { modes } = homeContent;

  return (
    <Section tone="white" spacing="default" id="modes">
      <Container>
        <SectionHeading
          eyebrow={modes.eyebrow}
          title={modes.title}
          description={modes.subtitle}
        />
        <div className={styles.wrap}>
          <ModeShowcaseClient modes={modes.items} />
        </div>
      </Container>
    </Section>
  );
}
