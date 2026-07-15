import Link from 'next/link';
import { GithubLogoIcon, ArrowRightIcon } from '@phosphor-icons/react/ssr';
import { Section } from '@/components/ui/section/Section';
import { Container } from '@/components/ui/container/Container';
import { Button } from '@/components/ui/button/Button';
import styles from './FinalCta.module.css';

export function FinalCta() {
  return (
    <Section tone="surface" spacing="large" id="final-cta">
      <Container className={styles.inner}>
        <h2 className={styles.title}>
          GeoWork is being built in the open.
        </h2>
        <p className={styles.description}>
          仓库公开在 GitHub，当前处于 Developer Preview。
          参与贡献、查看路线图与发布记录均通过仓库入口。
        </p>
        <div className={styles.actions}>
          <Button asChild variant="primary" size="md">
            <a href="https://github.com/Wanfeng1028/GeoWork" target="_blank" rel="noreferrer">
              <GithubLogoIcon aria-hidden />
              View on GitHub
            </a>
          </Button>
          <Button asChild variant="secondary" size="md">
            <Link href="/changelog">
              Follow development
              <ArrowRightIcon aria-hidden />
            </Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
}
