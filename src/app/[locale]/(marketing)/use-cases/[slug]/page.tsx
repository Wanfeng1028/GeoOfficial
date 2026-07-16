import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { useCases } from '@/data/use-cases';
import { useCaseContentLoaders, isUseCaseSlug } from '@/content/use-cases';
import { UseCaseDetailClient } from './UseCaseDetailClient';

interface PageProps {
  params: Promise<{ slug: string; locale: string }>;
}

export async function generateStaticParams() {
  return useCases.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const item = useCases.find((entry) => entry.slug === slug);
  if (!item) return {};
  const { getDict } = await import('@/i18n/dict');
  const t = getDict(locale as 'zh' | 'en');
  return {
    title: `${item.title} · ${t.pages.useCases.hero.eyebrow}`,
    description: item.description,
  };
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

  return <UseCaseDetailClient slug={slug} Content={Content} />;
}