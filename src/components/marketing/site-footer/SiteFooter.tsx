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

const footerGroupLabels: Record<string, string> = {
  "平台": "Platform",
  "资源": "Resources",
  "项目": "Project",
  "法律": "Legal",
};

const zhFooterLinkLabels: Record<string, string> = {
  Assistant: "助手",
  "Data model": "数据模型",
  Workflows: "工作流",
  Ecosystem: "生态",
  "Help Center": "帮助中心",
  Learn: "学习",
  Docs: "文档",
  Changelog: "更新日志",
  Blog: "博客",
  Engineering: "工程",
  Manifesto: "宣言",
  Careers: "职业与贡献",
  Status: "状态",
};

const enFooterLinkLabels: Record<string, string> = {
  "使用案例": "Use Cases",
  "版本与获取": "Plans",
  "关于": "About",
  "隐私": "Privacy",
  "条款": "Terms",
  "安全": "Security",
  "下载": "Download",
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
          <Logo wordmark variant="on-dark" />
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
            const groupTitle = locale === "en"
              ? footerGroupLabels[group.title] ?? group.title
              : group.title;
            return (
            <div key={group.title} className={styles.group}>
              <p className={styles.groupTitle}>{groupTitle}</p>
              <ul className={styles.links}>
                {group.links.map((link) => {
                  const linkLabel = locale === "zh"
                    ? zhFooterLinkLabels[link.label] ?? link.label
                    : enFooterLinkLabels[link.label] ?? link.label;
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