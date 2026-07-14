import Link from 'next/link';
import { ArrowRightIcon } from '@phosphor-icons/react/ssr';
import { Section } from '@/components/ui/section/Section';
import { Container } from '@/components/ui/container/Container';
import { SectionHeading } from '@/components/ui/section-heading/SectionHeading';
import { Button } from '@/components/ui/button/Button';
import { homeContent } from '@/data/home';
import { useCases } from '@/data/use-cases';
import { MediaFrame } from '@/components/ui/media-frame/MediaFrame';
import styles from './UseCaseStory.module.css';

export function UseCaseStory() {
  const { useCases: sectionCopy } = homeContent;
  const featured = useCases.slice(0, 3);

  return (
    <Section tone="canvas" spacing="large" id="use-cases">
      <Container>
        <SectionHeading
          eyebrow={sectionCopy.eyebrow}
          title={sectionCopy.title}
          description={sectionCopy.subtitle}
        />
        <ol className={styles.list}>
          {featured.map((item) => (
            <li key={item.slug} className={styles.item}>
              <MediaFrame className={styles.media} ratio="16:9" tone="light">
                <span className={styles.mediaInner}>待替换：{item.title} 成果截图</span>
              </MediaFrame>
              <div className={styles.copy}>
                <p className={styles.audience}>{item.audience}</p>
                <h3 className={styles.title}>{item.title}</h3>
                <p className={styles.description}>{item.description}</p>
                <p className={styles.status} data-status={item.status}>
                  {item.status === 'available'
                    ? '当前可运行'
                    : item.status === 'preview'
                      ? 'Developer Preview'
                      : '计划中'}
                </p>
                <Button
                  asChild
                  variant="text"
                  size="sm"
                  trailingIcon={<ArrowRightIcon aria-hidden />}
                  className={styles.cta}
                >
                  <Link href={`/use-cases/${item.slug}`}>查看详情</Link>
                </Button>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
