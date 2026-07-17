'use client';

import Link from 'next/link';
import { GithubLogoIcon, BookOpenIcon } from '@phosphor-icons/react/ssr';
import { useLocale } from '@/i18n/LocaleProvider';
import { getDict } from '@/i18n/dict';
import { Section } from '@/components/ui/section/Section';
import { Container } from '@/components/ui/container/Container';
import { SectionHeading } from '@/components/ui/section-heading/SectionHeading';
import { siteConfig } from '@/lib/site';
import styles from './OpenDevelopment.module.css';

export function OpenDevelopment() {
  const { locale } = useLocale();
  const t = getDict(locale);
  const isEn = locale === 'en';

  const eyebrow = isEn ? 'Open Development' : '开放开发';
  const cards = [
    {
      title: isEn ? 'Current Status' : '当前状态',
      body: `${siteConfig.status} · ${siteConfig.version}`,
      note: isEn
        ? 'Automation, macOS, and Linux builds are on the roadmap. No production-readiness guarantee.'
        : '自动化能力、macOS 与 Linux 构建属于后续计划，不作生产可用承诺。',
    },
    {
      title: isEn ? 'Contributing' : '参与贡献',
      body: isEn
        ? 'Participate via GitHub Issues, Discussions, and Pull Requests.'
        : '通过 GitHub Issues、Discussions 和 Pull Requests 参与。',
    },
    {
      title: isEn ? 'Docs & Releases' : '文档与发布',
      body: isEn
        ? 'Current docs point to the repository. The changelog page summarizes each release.'
        : '当前文档指向仓库 docs，更新日志页面汇总每次 Release。',
    },
  ];
  const issuesLabel = isEn ? 'Issues' : 'Issues 入口';
  const repoLabel = isEn ? 'GitHub Repository' : 'GitHub 仓库';
  const changelogLabel = isEn ? 'Changelog' : '更新日志';

  return (
    <Section tone="surface" spacing="default" id="open-development">
      <Container>
        <SectionHeading
          eyebrow={eyebrow}
          title={t.openDev.title}
          description={t.openDev.description}
        />
        <div className={styles.grid}>
          <article className={styles.card}>
            <h3 className={styles.cardTitle}>{cards[0].title}</h3>
            <p className={styles.cardBody}>{cards[0].body}</p>
            <p className={styles.cardNote}>{cards[0].note}</p>
          </article>
          <article className={styles.card}>
            <h3 className={styles.cardTitle}>{cards[1].title}</h3>
            <p className={styles.cardBody}>{cards[1].body}</p>
            <a
              className={styles.cardLink}
              href="https://github.com/Wanfeng1028/GeoWork/issues"
              target="_blank"
              rel="noreferrer"
            >
              <GithubLogoIcon aria-hidden /> {issuesLabel}
            </a>
          </article>
          <article className={styles.card}>
            <h3 className={styles.cardTitle}>{cards[2].title}</h3>
            <p className={styles.cardBody}>{cards[2].body}</p>
            <div className={styles.cardLinks}>
              <a
                className={styles.cardLink}
                href={siteConfig.github}
                target="_blank"
                rel="noreferrer"
              >
                <GithubLogoIcon aria-hidden /> {repoLabel}
              </a>
              <Link className={styles.cardLink} href="/changelog">
                <BookOpenIcon aria-hidden /> {changelogLabel}
              </Link>
            </div>
          </article>
        </div>
      </Container>
    </Section>
  );
}
