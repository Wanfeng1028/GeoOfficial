'use client';

import Link from 'next/link';
import { Container } from '@/components/ui/container/Container';
import { Logo } from '@/components/ui/logo/Logo';
import { LocaleSwitcher } from '@/i18n/LocaleSwitcher';
import { useLocale } from '@/i18n/LocaleProvider';
import { getDict } from '@/i18n/dict';
import { footerNavigation } from '@/data/navigation';
import { siteConfig } from '@/lib/site';
import styles from './SiteFooter.module.css';

// Footer 分组标题的翻译 key 映射（基于中文 label，作为 titleKey 缺失时的回退）
const footerGroupKeys: Record<string, string> = {
  '产品': 'product',
  '平台': 'platform',
  '资源': 'resources',
  '开发': 'developers',
  '项目': 'project',
  '法律': 'legal',
};

// Footer 链接标签的翻译 key 映射（基于中文 label）
const footerLinkKeys: Record<string, string> = {
  '产品概览': 'productOverview',
  '工作方式': 'howItWorks',
  '使用案例': 'useCases',
  '下载': 'download',
  '更新日志': 'changelog',
  'GeoWork 仓库': 'geoWorkRepo',
  'GeoFrontend2.0': 'geoFrontend',
  'GitHub Issues': 'githubIssues',
  'Releases': 'releases',
  '关于': 'about',
  '隐私': 'privacy',
  '条款': 'terms',
  '版本与获取': 'plans',
  '安全': 'security',
};

export function SiteFooter() {
  const { locale } = useLocale();
  const t = getDict(locale);
  const year = new Date().getFullYear();

  const copyrightText = t.footer.copyright.replace('{year}', String(year));

  return (
    <footer className={styles.footer}>
      <Container className={styles.inner}>
        <div className={styles.brand}>
          <Logo wordmark />
          <p className={styles.tagline}>
            {t.footer.tagline}
          </p>
          <p className={styles.copyright}>{copyrightText}</p>
          <div className={styles.localeWrap}>
            <LocaleSwitcher />
          </div>
        </div>

        <nav className={styles.groups} aria-label="页脚导航">
          {footerNavigation.map((group) => {
            const groupTitle = footerGroupKeys[group.title as string]
              ? (t.footer.nav as unknown as Record<string, string>)[footerGroupKeys[group.title as string]] ?? group.title
              : group.title;
            return (
            <div key={group.title} className={styles.group}>
              <p className={styles.groupTitle}>{groupTitle}</p>
              <ul className={styles.links}>
                {group.links.map((link) => {
                  const linkLabel = footerLinkKeys[link.label as string]
                    ? (t.footer.nav.links as Record<string, string>)[footerLinkKeys[link.label as string]] ?? link.label
                    : link.label;
                  return 'external' in link && link.external ? (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className={styles.link}
                      >
                        {linkLabel}
                      </a>
                    </li>
                  ) : (
                    <li key={link.label}>
                      <Link href={link.href} className={styles.link}>
                        {linkLabel}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
          })}
        </nav>
      </Container>

      <Container className={styles.bottom}>
        <div className={styles.bottomLinks}>
          <Link href="/privacy" className={styles.bottomLink}>
            {t.nav.privacy}
          </Link>
          <Link href="/terms" className={styles.bottomLink}>
            {t.nav.terms}
          </Link>
          <a
            href="https://github.com/Wanfeng1028/GeoWork"
            target="_blank"
            rel="noreferrer"
            className={styles.bottomLink}
          >
            GitHub
          </a>
          <span className={styles.bottomStatus}>
            {t.footer.tagline}
          </span>
        </div>
      </Container>
    </footer>
  );
}