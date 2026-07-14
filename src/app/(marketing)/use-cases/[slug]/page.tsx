import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Section } from '@/components/ui/section/Section';
import { Container } from '@/components/ui/container/Container';
import { Button } from '@/components/ui/button/Button';
import { ArrowRightIcon } from '@phosphor-icons/react/ssr';
import { useCases } from '@/data/use-cases';
import { useCaseContentLoaders, isUseCaseSlug } from '@/content/use-cases';
import styles from './entry.module.css';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return useCases.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = useCases.find((entry) => entry.slug === slug);
  if (!item) return {};
  return {
    title: item.title,
    description: item.description,
  };
}

function UseCaseHeader({ item }: { item: (typeof useCases)[number] }) {
  return (
    <Section tone="canvas" spacing="compact">
      <Container width="content">
        <nav aria-label="面包屑" className={styles.breadcrumb}>
          <Link href="/use-cases" className={styles.breadcrumbLink}>
            使用案例
          </Link>
          <span aria-hidden> · </span>
          <span className={styles.breadcrumbCurrent}>{item.title}</span>
        </nav>

        <p className={styles.audience}>{item.audience}</p>
        <h1 className={styles.title}>{item.title}</h1>
        <p className={styles.status} data-status={item.status}>
          {item.status === 'available'
            ? '当前可运行'
            : item.status === 'preview'
              ? 'Developer Preview'
              : '计划中'}
        </p>
        <p className={styles.description}>{item.description}</p>
      </Container>
    </Section>
  );
}

export default async function UseCaseDetailPage({ params }: PageProps) {
  const { slug } = await params;

  if (!isUseCaseSlug(slug)) {
    notFound();
  }

  const item = useCases.find((entry) => entry.slug === slug);
  if (!item) {
    notFound();
  }

  const { default: Content } = await useCaseContentLoaders[slug]();

  return (
    <>
      <UseCaseHeader item={item} />

      <Section tone="canvas" spacing="large">
        <Container width="content">
          <figure className={styles.cover}>
            <Image
              src={item.image}
              alt={item.imageAlt}
              width={1800}
              height={1200}
              sizes="(max-width: 768px) 100vw, 720px"
              className={styles.coverImage}
            />
            <figcaption className={styles.coverCaption}>{item.imageAlt}</figcaption>
          </figure>

          <article className={styles.prose}>
            <Content />
          </article>

          <div className={styles.actions}>
            <Button asChild variant="primary" size="md">
              <Link href="/download">下载 GeoWork</Link>
            </Button>
            <Button
              asChild
              variant="text"
              size="md"
              trailingIcon={<ArrowRightIcon aria-hidden />}
            >
              <Link href="/use-cases">返回案例列表</Link>
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
