'use client';

import Link from 'next/link';
import { ArrowRightIcon, ArrowUpRightIcon } from '@phosphor-icons/react/ssr';
import { useLocale } from '@/i18n/LocaleProvider';
import { Section } from '@/components/ui/section/Section';
import { Container } from '@/components/ui/container/Container';
import { Button } from '@/components/ui/button/Button';
import { FinalCta } from '@/components/marketing/final-cta/FinalCta';
import type { ResourcePageData } from '@/data/resource-pages';
import styles from './ResourceIndexLayout.module.css';

interface ResourceIndexLayoutProps {
  data: ResourcePageData;
}

/**
 * 资源索引页共享布局 — v2.5 plan Iteration 8
 *
 * 结构:Hero (含 CTA) → 多个 Section (每个 section 含卡片网格) → 底部说明 → Final CTA
 *
 * 用于 9 个资源页:Getting Started, Help, Learn, Docs, Partners, Blog, Engineering, Careers, Contact
 */
export function ResourceIndexLayout({ data }: ResourceIndexLayoutProps) {
  const { locale } = useLocale();
  const isEn = locale === 'en';

  const eyebrow = isEn ? data.eyebrow.en : data.eyebrow.zh;
  const title = isEn ? data.title.en : data.title.zh;
  const description = isEn ? data.description.en : data.description.zh;

  return (
    <>
      {/* ─── Hero ─────────────────────────────────────────── */}
      <Section tone="canvas" spacing="compact">
        <Container width="content">
          <p className={styles.heroEyebrow}>{eyebrow}</p>
          <h1 className={styles.heroTitle}>
            {title.split('\n').map((line, i) => (
              <span key={i}>
                {i > 0 && <br />}
                {line}
              </span>
            ))}
          </h1>
          <p className={styles.heroDesc}>{description}</p>

          {(data.primaryCta || data.secondaryCta) && (
            <div className={styles.heroActions}>
              {data.primaryCta && (
                <Button asChild variant="primary" size="md">
                  {data.primaryCta.external ? (
                    <a href={data.primaryCta.href} target="_blank" rel="noreferrer">
                      {isEn ? data.primaryCta.label.en : data.primaryCta.label.zh}
                      <ArrowUpRightIcon aria-hidden />
                    </a>
                  ) : (
                    <Link href={data.primaryCta.href}>
                      {isEn ? data.primaryCta.label.en : data.primaryCta.label.zh}
                    </Link>
                  )}
                </Button>
              )}
              {data.secondaryCta && (
                <Button
                  asChild
                  variant="text"
                  size="md"
                  trailingIcon={<ArrowRightIcon aria-hidden />}
                >
                  {data.secondaryCta.external ? (
                    <a href={data.secondaryCta.href} target="_blank" rel="noreferrer">
                      {isEn ? data.secondaryCta.label.en : data.secondaryCta.label.zh}
                    </a>
                  ) : (
                    <Link href={data.secondaryCta.href}>
                      {isEn ? data.secondaryCta.label.en : data.secondaryCta.label.zh}
                    </Link>
                  )}
                </Button>
              )}
            </div>
          )}
        </Container>
      </Section>

      {/* ─── 各 Section ──────────────────────────────────── */}
      {data.sections.map((section) => {
        const sTitle = isEn ? section.title.en : section.title.zh;
        const sDesc = section.description
          ? isEn
            ? section.description.en
            : section.description.zh
          : null;
        return (
          <Section key={section.id} tone="surface" spacing="default">
            <Container>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>{sTitle}</h2>
                {sDesc && <p className={styles.sectionDesc}>{sDesc}</p>}
              </div>
              <div className={styles.cardGrid}>
                {section.cards.map((card) => {
                  const cTitle = isEn ? card.title.en : card.title.zh;
                  const cDesc = isEn ? card.description.en : card.description.zh;
                  const cMeta = card.meta
                    ? isEn
                      ? card.meta.en
                      : card.meta.zh
                    : null;
                  const CardIcon = card.external ? ArrowUpRightIcon : ArrowRightIcon;
                  return (
                    <Link
                      key={card.id}
                      href={card.href}
                      {...(card.external
                        ? { target: '_blank', rel: 'noreferrer' }
                        : {})}
                      className={styles.card}
                    >
                      <div className={styles.cardHeader}>
                        <h3 className={styles.cardTitle}>{cTitle}</h3>
                        <CardIcon aria-hidden className={styles.cardIcon} />
                      </div>
                      <p className={styles.cardDesc}>{cDesc}</p>
                      {cMeta && <span className={styles.cardMeta}>{cMeta}</span>}
                    </Link>
                  );
                })}
              </div>
            </Container>
          </Section>
        );
      })}

      {/* ─── 底部说明 ────────────────────────────────────── */}
      {data.finalNote && (
        <Section tone="canvas" spacing="default">
          <Container width="content">
            <div className={styles.finalNote}>
              <p className={styles.finalNoteText}>
                {isEn ? data.finalNote.text.en : data.finalNote.text.zh}
              </p>
              <Button
                asChild
                variant="text"
                size="md"
                trailingIcon={<ArrowRightIcon aria-hidden />}
              >
                <Link href={data.finalNote.linkHref}>
                  {isEn ? data.finalNote.linkLabel.en : data.finalNote.linkLabel.zh}
                </Link>
              </Button>
            </div>
          </Container>
        </Section>
      )}

      <FinalCta />
    </>
  );
}
