'use client';

import Link from 'next/link';
import { Section } from '@/components/ui/section/Section';
import { Container } from '@/components/ui/container/Container';
import { SectionHeading } from '@/components/ui/section-heading/SectionHeading';
import { Button } from '@/components/ui/button/Button';
import { ArrowRightIcon } from '@phosphor-icons/react/ssr';
import { useLocale } from '@/i18n/LocaleProvider';
import { getDict } from '@/i18n/dict';
import { productObjects } from '@/data/product-objects';
import { ecosystemNodes } from '@/data/ecosystem';
import styles from './page.module.css';

export function ProductPageClient() {
  const { locale } = useLocale();
  const t = getDict(locale);
  const p = t.pages.product;

  return (
    <>
      <Section tone="canvas" spacing="compact">
        <Container>
          <SectionHeading
            eyebrow={p.hero.eyebrow}
            title={p.hero.title}
            description={p.hero.description}
            level={1}
          />
          <div className={styles.actions}>
            <Button asChild variant="primary" size="md">
              <Link href="/#hero">{p.cta.explore}</Link>
            </Button>
            <Button
              asChild
              variant="text"
              size="md"
              trailingIcon={<ArrowRightIcon aria-hidden />}
            >
              <Link href="/use-cases">{p.cta.viewCases}</Link>
            </Button>
          </div>
        </Container>
      </Section>

      <Section tone="surface" spacing="default">
        <Container>
          <SectionHeading
            eyebrow={p.objects.eyebrow}
            title={p.objects.title}
            description={p.objects.description}
          />
          <div className={styles.objects}>
            {productObjects.map((obj) => (
              <article key={obj.id} className={styles.object}>
                <h3 className={styles.objectTitle}>{obj.label}</h3>
                <p className={styles.objectDesc}>{obj.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="canvas" spacing="default">
        <Container>
          <SectionHeading
            eyebrow={p.modes.eyebrow}
            title={p.modes.title}
            description={p.modes.description}
          />
          <div className={styles.modes}>
            <div className={styles.mode}>
              <h3 className={styles.modeTitle}>{p.modes.work.title}</h3>
              <p className={styles.modeDesc}>{p.modes.work.desc}</p>
            </div>
            <div className={styles.mode}>
              <h3 className={styles.modeTitle}>{p.modes.code.title}</h3>
              <p className={styles.modeDesc}>{p.modes.code.desc}</p>
            </div>
            <div className={styles.mode}>
              <h3 className={styles.modeTitle}>{p.modes.map.title}</h3>
              <p className={styles.modeDesc}>{p.modes.map.desc}</p>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="surface" spacing="default">
        <Container>
          <SectionHeading
            eyebrow={p.ecosystem.eyebrow}
            title={p.ecosystem.title}
            description={p.ecosystem.description}
          />
          <div className={styles.ecosystem}>
            {ecosystemNodes.map((node) => (
              <div key={node.id} className={styles.ecoNode}>
                <p className={styles.ecoLabel}>{node.label}</p>
                <p className={styles.ecoDesc}>{node.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}