'use client';

import Link from 'next/link';
import { Container } from '@/components/ui/container/Container';
import { Logo } from '@/components/ui/logo/Logo';
import { LocaleSwitcher } from '@/i18n/LocaleSwitcher';
import { useLocale } from '@/i18n/LocaleProvider';
import { footerNavigation } from '@/data/navigation';
import { siteConfig } from '@/lib/site';
import styles from './SiteFooter.module.css';

export function SiteFooter() {
  const { locale } = useLocale();
  const year = new Date().getFullYear();

  const copyrightText =
    locale === 'zh'
      ? `© ${year} GeoWork contributors. 仓库公开于 GitHub。`
      : `© ${year} GeoWork contributors. Repository on GitHub.`;

  return (
    <footer className={styles.footer}>
      <Container className={styles.inner}>
        <div className={styles.brand}>
          <Logo wordmark />
          <p className={styles.tagline}>
            Developer Preview
          </p>
          <p className={styles.copyright}>{copyrightText}</p>
          <div className={styles.localeWrap}>
            <LocaleSwitcher />
          </div>
        </div>

        <nav className={styles.groups} aria-label="页脚导航">
          {footerNavigation.map((group) => (
            <div key={group.title} className={styles.group}>
              <p className={styles.groupTitle}>{group.title}</p>
              <ul className={styles.links}>
                {group.links.map((link) =>
                  'external' in link && link.external ? (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className={styles.link}
                      >
                        {link.label}
                      </a>
                    </li>
                  ) : (
                    <li key={link.label}>
                      <Link href={link.href} className={styles.link}>
                        {link.label}
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </div>
          ))}
        </nav>
      </Container>

      <Container className={styles.bottom}>
        <div className={styles.bottomLinks}>
          <Link href="/privacy" className={styles.bottomLink}>
            {locale === 'zh' ? '隐私' : 'Privacy'}
          </Link>
          <Link href="/terms" className={styles.bottomLink}>
            {locale === 'zh' ? '条款' : 'Terms'}
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
            {locale === 'zh' ? 'Developer Preview' : 'Developer Preview'}
          </span>
        </div>
      </Container>
    </footer>
  );
}