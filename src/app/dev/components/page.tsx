import { notFound } from 'next/navigation';
import { Container } from '@/components/ui/container/Container';
import { Section } from '@/components/ui/section/Section';
import { SectionHeading } from '@/components/ui/section-heading/SectionHeading';
import { Button } from '@/components/ui/button/Button';
import styles from './page.module.css';

export default function DevComponentsPage() {
  if (process.env.NODE_ENV === 'production') {
    notFound();
  }

  return (
    <Section tone="canvas" spacing="large">
      <Container>
        <SectionHeading
          eyebrow="开发"
          title="组件与 Token 展示页。"
          description="仅开发环境可见。生产构建返回 404 或为空。"
        />

        <section className={styles.group}>
          <h2 className={styles.h2}>Token</h2>
          <div className={styles.tokenRow}>
            <div className={styles.token} style={{ background: 'var(--color-canvas)' }}>
              <span>canvas</span>
            </div>
            <div className={styles.token} style={{ background: 'var(--color-surface)' }}>
              <span>surface</span>
            </div>
            <div className={styles.token} style={{ background: 'var(--color-ink)' }}>
              <span style={{ color: '#fff' }}>ink</span>
            </div>
            <div className={styles.token} style={{ background: 'var(--color-accent)' }}>
              <span style={{ color: '#fff' }}>accent</span>
            </div>
            <div className={styles.token} style={{ background: 'var(--color-dark-canvas)' }}>
              <span style={{ color: '#fff' }}>dark-canvas</span>
            </div>
          </div>
        </section>

        <section className={styles.group}>
          <h2 className={styles.h2}>Button</h2>
          <div className={styles.row}>
            <Button variant="primary" size="md">Primary</Button>
            <Button variant="secondary" size="md">Secondary</Button>
            <Button variant="quiet" size="md">Quiet</Button>
            <Button variant="text" size="md">Text</Button>
            <Button variant="primary" size="md" disabled>Disabled</Button>
          </div>
          <div className={styles.row}>
            <Button variant="primary" size="sm">Small</Button>
            <Button variant="secondary" size="md">Medium</Button>
            <Button variant="secondary" size="lg">Large</Button>
          </div>
        </section>
      </Container>
    </Section>
  );
}
