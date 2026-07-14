import Link from 'next/link';
import { Container } from '@/components/ui/container/Container';
import { Logo } from '@/components/ui/logo/Logo';
import { footerNavigation } from '@/data/navigation';
import { siteConfig } from '@/lib/site';
import styles from './SiteFooter.module.css';

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <Container className={styles.inner}>
        <div className={styles.brand}>
          <Logo wordmark />
          <p className={styles.tagline}>
            {siteConfig.status} · {siteConfig.version}
          </p>
          <p className={styles.copyright}>© {year} GeoWork contributors. 仓库公开于 GitHub。</p>
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
    </footer>
  );
}
