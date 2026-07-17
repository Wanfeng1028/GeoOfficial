'use client';

import Link from 'next/link';
import { Section } from '@/components/ui/section/Section';
import { Container } from '@/components/ui/container/Container';
import { SectionHeading } from '@/components/ui/section-heading/SectionHeading';
import { Button } from '@/components/ui/button/Button';
import { ArrowRightIcon, GithubLogoIcon } from '@phosphor-icons/react/ssr';
import { useLocale } from '@/i18n/LocaleProvider';
import { getDict } from '@/i18n/dict';
import { matchAssetToPlatform } from '@/lib/github/match-release-assets';
import { formatBytes, formatDate } from '@/lib/content/mdx';
import { platformRules, systemRequirements, faqs } from '@/data/platforms';
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionTrigger,
  AccordionContent,
} from '@/components/primitives/accordion/Accordion';
import styles from './page.module.css';
import type { ReleaseResult } from '@/lib/github/releases';

const REPO_RELEASES_URL = 'https://github.com/Wanfeng1028/GeoWork/releases';

/** Map kebab-case ReleaseResult source to camelCase dict keys */
const fallbackKeyMap: Record<string, 'noRelease' | 'apiError' | 'invalidResponse'> = {
  'no-release': 'noRelease',
  'api-error': 'apiError',
  'invalid-response': 'invalidResponse',
};

interface DownloadPageClientProps {
  result: ReleaseResult;
}

export function DownloadPageClient({ result }: DownloadPageClientProps) {
  const { locale } = useLocale();
  const t = getDict(locale);
  const p = t.pages.download;
  const { source, release } = result;

  const assetsByPlatform = platformRules.map((rule) => {
    const matched = release
      ? release.assets.filter((asset) => matchAssetToPlatform(asset.name, rule))
      : [];
    return { rule, matched };
  });

  const hasRelease = source === 'github' && release !== null;

  return (
    <Section tone="canvas" spacing="large">
      <Container>
        <SectionHeading
          eyebrow={p.hero.eyebrow}
          title={p.hero.title}
          description={p.hero.description}
          level={1}
          width="content"
        />

        <div className={styles.release}>
          {release ? (
            <div className={styles.releaseInfo}>
              <p className={styles.releaseVersion}>
                {release.tag_name}
                {release.prerelease ? ' · Developer Preview' : ''}
              </p>
              {release.published_at ? (
                <p className={styles.releaseDate}>
                  {p.publishedAt} · {formatDate(release.published_at)}
                </p>
              ) : null}
              <p className={styles.releaseBody}>
                {release.body ?? p.noBody}
              </p>
              <a
                className={styles.releaseLink}
                href={release.html_url}
                target="_blank"
                rel="noreferrer"
              >
                <GithubLogoIcon aria-hidden /> GitHub Releases
              </a>
            </div>
          ) : (
            <div className={styles.releaseInfo} role="status" aria-live="polite">
              <p className={styles.releaseVersion}>
                {p.fallback[fallbackKeyMap[source] ?? 'apiError'].title}
              </p>
              <p className={styles.releaseBody}>{p.fallback[fallbackKeyMap[source] ?? 'apiError'].body}</p>
              <a
                className={styles.releaseLink}
                href={REPO_RELEASES_URL}
                target="_blank"
                rel="noreferrer"
              >
                <GithubLogoIcon aria-hidden /> GitHub Releases
              </a>
            </div>
          )}
        </div>

        {hasRelease && (
          <>
            <h2 className={styles.h2}>{p.platforms}</h2>
            <ul className={styles.platforms}>
              {assetsByPlatform.map(({ rule, matched }) => (
                <li key={rule.id} className={styles.platform}>
                  <div className={styles.platformInfo}>
                    <p className={styles.platformLabel}>{rule.label}</p>
                    <p className={styles.platformNotes}>{rule.notes ?? ''}</p>
                  </div>
                  {matched.length > 0 ? (
                    <ul className={styles.platformFiles}>
                      {matched.map((asset) => (
                        <li key={asset.id}>
                          <a
                            className={styles.platformLink}
                            href={asset.browser_download_url}
                            rel="noreferrer"
                          >
                            {asset.name}
                            <span className={styles.platformSize}>
                              {formatBytes(asset.size)}
                            </span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className={styles.platformEmpty}>{p.noBuild}</p>
                  )}
                </li>
              ))}
            </ul>
          </>
        )}

        <h2 className={styles.h2}>{p.systemRequirements}</h2>
        <div className={styles.requirements}>
          {systemRequirements.map((req) => (
            <div key={req.platform} className={styles.requirement}>
              <h3 className={styles.requirementTitle}>{req.platform}</h3>
              <ul className={styles.requirementList}>
                {req.requirements.map((r) => (
                  <li key={r} className={styles.requirementItem}>{r}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <h2 className={styles.h2}>{p.installGuide}</h2>
        <ol className={styles.install}>
          {p.installSteps.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>

        <h2 className={styles.h2}>{p.faq}</h2>
        <Accordion type="multiple" className={styles.faq}>
          {faqs.map((faq, idx) => (
            <AccordionItem key={faq.question} value={`faq-${idx}`}>
              <AccordionHeader>
                <AccordionTrigger className={styles.faqTrigger}>
                  {faq.question}
                </AccordionTrigger>
              </AccordionHeader>
              <AccordionContent className={styles.faqContent}>
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className={styles.actions}>
          <Button
            asChild
            variant="primary"
            size="md"
            trailingIcon={<ArrowRightIcon aria-hidden />}
          >
            <a href={REPO_RELEASES_URL} target="_blank" rel="noreferrer">
              {p.gotoReleases}
            </a>
          </Button>
          <Button asChild variant="text" size="md">
            <Link href="/changelog">{p.viewChangelog}</Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
}