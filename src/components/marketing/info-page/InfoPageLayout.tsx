'use client';

import { Section } from '@/components/ui/section/Section';
import { Container } from '@/components/ui/container/Container';
import { SectionHeading } from '@/components/ui/section-heading/SectionHeading';
import { FinalCta } from '@/components/marketing/final-cta/FinalCta';
import styles from './InfoPageLayout.module.css';

/**
 * 信息/声明类页面共享布局 — v2.5 plan Iteration 9
 *
 * 用于 /plans, /manifesto, /status, /trust, /security 等以"段落 + 列表"为主的页面。
 *
 * 结构:
 * - Hero (eyebrow + H1 + description)
 * - 草案标记(可选)
 * - 多个 section (title + body + 可选 items 列表)
 * - FinalCta
 *
 * 与 /privacy /terms 的 PrivacyPageClient/TermsPageClient 模式一致,但增加了 H1 与 FinalCta。
 */
export interface InfoSection {
  title: string;
  body: string;
  items?: readonly string[];
}

export interface InfoPageLayoutProps {
  hero: {
    eyebrow: string;
    title: string;
    description: string;
  };
  draft?: string;
  sections: readonly InfoSection[];
}

export function InfoPageLayout({ hero, draft, sections }: InfoPageLayoutProps) {
  return (
    <>
      <Section tone="canvas" spacing="large">
        <Container width="content">
          <SectionHeading
            eyebrow={hero.eyebrow}
            title={hero.title}
            description={hero.description}
            level={1}
          />
          {draft && <p className={styles.note}>{draft}</p>}

          {sections.map((section, i) => (
            <div key={i} className={styles.section}>
              <h2 className={styles.h2}>{section.title}</h2>
              <p className={styles.p}>{section.body}</p>
              {section.items && section.items.length > 0 && (
                <ul className={styles.list}>
                  {section.items.map((item, j) => (
                    <li key={j} className={styles.listItem}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </Container>
      </Section>
      <FinalCta />
    </>
  );
}
