import Link from 'next/link';
import { GithubLogoIcon } from '@phosphor-icons/react/ssr';
import { mainNavigation } from '@/data/navigation';
import { Button } from '@/components/ui/button/Button';
import { Container } from '@/components/ui/container/Container';
import { Logo } from '@/components/ui/logo/Logo';
import { MobileMenu } from './MobileMenu';
import styles from './SiteHeader.module.css';

export function SiteHeader() {
  return (
    <header className={styles.header}>
      <Container className={styles.inner}>
        <Link href="/" aria-label="GeoWork 首页" className={styles.brand}>
          <Logo wordmark />
        </Link>

        <nav className={styles.desktopNav} aria-label="主导航">
          {mainNavigation.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              target={'external' in item ? '_blank' : undefined}
              rel={'external' in item ? 'noreferrer' : undefined}
              className={styles.navLink}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className={styles.actions}>
          <Button asChild variant="quiet" size="sm" className={styles.githubBtn}>
            <a
              href="https://github.com/Wanfeng1028/GeoWork"
              target="_blank"
              rel="noreferrer"
            >
              <GithubLogoIcon aria-hidden /> GitHub
            </a>
          </Button>
          <Button asChild variant="primary" size="sm">
            <Link href="/download">下载</Link>
          </Button>
          <div className={styles.mobileOnly}>
            <MobileMenu />
          </div>
        </div>
      </Container>
    </header>
  );
}
