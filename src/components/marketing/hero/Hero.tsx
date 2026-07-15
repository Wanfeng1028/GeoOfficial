import Link from 'next/link';
import { GithubLogoIcon } from '@phosphor-icons/react/ssr';
import { homeContent } from '@/data/home';
import { Button } from '@/components/ui/button/Button';
import { Container } from '@/components/ui/container/Container';
import { ProductStage } from '@/components/marketing/product-stage/ProductStage';
import styles from './Hero.module.css';

export function Hero() {
  const { hero } = homeContent;

  return (
    <section id="hero" className={styles.hero} aria-labelledby="home-title">
      <Container width="default">
        <div className={styles.copy}>
          <p className={styles.eyebrow}>{hero.eyebrow}</p>

          <h1 id="home-title" className={styles.title}>
            {hero.title}
          </h1>

          <p className={styles.description}>
            {hero.description}
          </p>

          <div className={styles.actions}>
            <Button asChild variant="primary" size="lg">
              <Link href={hero.primaryCta.href}>{hero.primaryCta.label}</Link>
            </Button>
            <Button
              asChild
              variant="secondary"
              size="lg"
              leadingIcon={<GithubLogoIcon aria-hidden />}
            >
              <a
                href={hero.secondaryCta.href}
                target="_blank"
                rel="noreferrer"
              >
                {hero.secondaryCta.label}
              </a>
            </Button>
          </div>
        </div>

        <div className={styles.stage}>
          <ProductStage />
        </div>
      </Container>
    </section>
  );
}
