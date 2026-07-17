import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ecosystemEntryMap } from '@/data/routes';
import { getEcosystemPage } from '@/data/ecosystem-pages';
import { EcosystemDetailLayout } from '@/components/marketing/ecosystem-detail/EcosystemDetailLayout';

interface PageProps {
  params: Promise<{ slug: string; locale: string }>;
}

export async function generateStaticParams() {
  return Object.keys(ecosystemEntryMap).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const entry = ecosystemEntryMap[slug];
  if (!entry) return {};
  return {
    title: entry.title[locale as 'zh' | 'en'],
    description: entry.description[locale as 'zh' | 'en'],
  };
}

export default async function EcosystemDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const pageData = getEcosystemPage(slug);
  if (!pageData) {
    notFound();
  }
  return <EcosystemDetailLayout data={pageData} />;
}
