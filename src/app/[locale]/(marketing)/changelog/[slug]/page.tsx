import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { changelogEntries } from '@/data/changelog';
import { ChangelogDetailClient } from './ChangelogDetailClient';

interface PageProps {
  params: Promise<{ slug: string; locale: string }>;
}

export async function generateStaticParams() {
  return changelogEntries.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const entry = changelogEntries.find((item) => item.slug === slug);
  if (!entry) return {};
  const { getDict } = await import('@/i18n/dict');
  const t = getDict(locale as 'zh' | 'en');
  return {
    title: t.pages.changelog.changelogOf.replace('{version}', entry.version),
    description: entry.summary,
  };
}

export default async function ChangelogDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const entry = changelogEntries.find((item) => item.slug === slug);
  if (!entry) notFound();

  const { default: Body } = await entry.load();

  return <ChangelogDetailClient slug={slug}><Body /></ChangelogDetailClient>;
}