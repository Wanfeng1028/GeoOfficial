import Image from 'next/image';
import Link from 'next/link';
import { ArrowRightIcon } from '@phosphor-icons/react/ssr';
import { homeContent } from '@/data/home';
import { mediaAssets } from '@/data/media';
import { Button } from '@/components/ui/button/Button';
import { Container } from '@/components/ui/container/Container';
import { MediaFrame } from '@/components/ui/media-frame/MediaFrame';
import styles from './Hero.module.css';

export function Hero() {
  const { hero } = homeContent;

  return (
    <section id="hero" className={styles.hero} aria-labelledby="home-title">
      <Container width="wide" className={styles.grid}>
        <div className={styles.copy}>
          <p className={styles.productName}>{hero.eyebrow}</p>
          <h1 id="home-title" className={styles.title}>
            {hero.title}
          </h1>
          <p className={styles.description}>{hero.description}</p>
          <div className={styles.actions}>
            <Button asChild variant="primary" size="lg">
              <Link href={hero.primaryCta.href}>{hero.primaryCta.label}</Link>
            </Button>
            <Button
              asChild
              variant="text"
              size="lg"
              trailingIcon={<ArrowRightIcon aria-hidden />}
            >
              <Link href={hero.secondaryCta.href}>{hero.secondaryCta.label}</Link>
            </Button>
          </div>
          <p className={styles.status}>{hero.status}</p>
        </div>

        <MediaFrame className={styles.media} ratio="16:10" tone="dark">
          <Image
            src={mediaAssets.hero.src}
            alt={mediaAssets.hero.alt}
            fill
            priority
            sizes="(max-width: 900px) 100vw, 58vw"
          />
        </MediaFrame>
      </Container>
    </section>
  );
}
