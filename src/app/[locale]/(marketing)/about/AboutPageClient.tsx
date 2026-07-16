'use client';

import Link from 'next/link';
import { Section } from '@/components/ui/section/Section';
import { Container } from '@/components/ui/container/Container';
import { SectionHeading } from '@/components/ui/section-heading/SectionHeading';
import { Button } from '@/components/ui/button/Button';
import { ArrowRightIcon, GithubLogoIcon } from '@phosphor-icons/react/ssr';
import { useLocale } from '@/i18n/LocaleProvider';
import { getDict } from '@/i18n/dict';
import { siteConfig } from '@/lib/site';
import styles from './page.module.css';

export function AboutPageClient() {
  const { locale } = useLocale();
  const t = getDict(locale);
  const p = t.pages.about;

  const statusText = p.status.body
    .replace('{status}', siteConfig.status)
    .replace('{version}', siteConfig.version ?? '');

  return (
    <Section tone="canvas" spacing="large">
      <Container width="content">
        <SectionHeading
          eyebrow={p.hero.eyebrow}
          title={p.hero.title}
          description={p.hero.description}
        />

        <div className={styles.section}>
          <h2 className={styles.h2}>{p.motivation.title}</h2>
          <p className={styles.p}>{p.motivation.body}</p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.h2}>{p.status.title}</h2>
          <p className={styles.p}>{statusText}</p>
          <ul className={styles.list}>
            {p.status.items.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>

        <div className={styles.section}>
          <h2 className={styles.h2}>{p.repos.title}</h2>
          <ul className={styles.list}>
            <li>
              <a
                className={styles.link}
                href={siteConfig.github}
                target="_blank"
                rel="noreferrer"
              >
                <GithubLogoIcon aria-hidden /> {p.repos.mainRepo}
              </a>
            </li>
            <li>
              <a
                className={styles.link}
                href={siteConfig.frontend}
                target="_blank"
                rel="noreferrer"
              >
                <GithubLogoIcon aria-hidden /> {p.repos.frontendRepo}
              </a>
            </li>
          </ul>
        </div>

        <div className={styles.section}>
          <h2 className={styles.h2}>{p.license.title}</h2>
          <p className={styles.p}>{p.license.body}</p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.h2}>{p.contribute.title}</h2>
          <p className={styles.p}>{p.contribute.body}</p>
        </div>

        <div className={styles.actions}>
          <Button
            asChild
            variant="primary"
            size="md"
            trailingIcon={<GithubLogoIcon aria-hidden />}
          >
            <a
              href="https://github.com/Wanfeng1028/GeoWork"
              target="_blank"
              rel="noreferrer"
            >
              {p.cta.github}
            </a>
          </Button>
          <Button
            asChild
            variant="text"
            size="md"
            trailingIcon={<ArrowRightIcon aria-hidden />}
          >
            <Link href="/download">{p.cta.download}</Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
}