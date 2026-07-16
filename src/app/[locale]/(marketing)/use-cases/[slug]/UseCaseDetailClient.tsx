'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Section } from '@/components/ui/section/Section';
import { Container } from '@/components/ui/container/Container';
import { Button } from '@/components/ui/button/Button';
import { ArrowRightIcon } from '@phosphor-icons/react/ssr';
import { useLocale } from '@/i18n/LocaleProvider';
import { getDict } from '@/i18n/dict';
import { useCases } from '@/data/use-cases';
import styles from './entry.module.css';

interface UseCaseDetailClientProps {
  slug: string;
  children: React.ReactNode;
}

export function UseCaseDetailClient({ slug, children }: UseCaseDetailClientProps) {
  const { locale } = useLocale();
  const t = getDict(locale);
  const p = t.pages.useCases;

  const item = useCases.find((entry) => entry.slug === slug)!;

  return (
    <>
      <Section tone="canvas" spacing="compact">
        <Container width="content">
          <nav aria-label="面包屑" className={styles.breadcrumb}>
            <Link href="/use-cases" className={styles.breadcrumbLink}>
              {p.hero.eyebrow}
            </Link>
            <span aria-hidden> · </span>
            <span className={styles.breadcrumbCurrent}>{item.title}</span>
          </nav>

          <p className={styles.audience}>{item.audience}</p>
          <h1 className={styles.title}>{item.title}</h1>
          <p className={styles.status} data-status={item.status}>
            {item.status === 'available'
              ? p.status.available
              : item.status === 'preview'
                ? p.status.preview
                : p.status.planned}
          </p>
          <p className={styles.description}>{item.description}</p>
        </Container>
      </Section>

      <Section tone="canvas" spacing="large">
        <Container width="content">
          <figure className={styles.cover}>
            <Image
              src={item.image}
              alt={item.imageAlt}
              width={1800}
              height={1200}
              sizes="(max-width: 768px) 100vw, 720px"
              className={styles.coverImage}
            />
            <figcaption className={styles.coverCaption}>{item.imageAlt}</figcaption>
          </figure>

          <article className={styles.prose}>
            {children}
          </article>

          <div className={styles.actions}>
            <Button asChild variant="primary" size="md">
              <Link href="/download">{p.downloadGeoWork}</Link>
            </Button>
            <Button
              asChild
              variant="text"
              size="md"
              trailingIcon={<ArrowRightIcon aria-hidden />}
            >
              <Link href="/use-cases">{p.backToList}</Link>
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}