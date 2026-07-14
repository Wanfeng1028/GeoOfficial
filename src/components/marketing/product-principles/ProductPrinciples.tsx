import { Section } from '@/components/ui/section/Section';
import { Container } from '@/components/ui/container/Container';
import { SectionHeading } from '@/components/ui/section-heading/SectionHeading';
import { homeContent } from '@/data/home';
import styles from './ProductPrinciples.module.css';

export function ProductPrinciples() {
  const { principles } = homeContent;

  return (
    <Section tone="white" spacing="default" id="principles">
      <Container>
        <SectionHeading
          eyebrow="产品原则"
          title={principles.title}
          description={principles.subtitle}
        />
        <div className={styles.row}>
          {principles.items.map((item) => (
            <article key={item.index} className={styles.item}>
              <p className={styles.index}>{item.index}</p>
              <h3 className={styles.title}>{item.title}</h3>
              <p className={styles.description}>{item.description}</p>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
