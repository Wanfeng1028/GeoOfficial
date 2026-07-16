import type { Metadata } from 'next';
import { DevelopersPageClient } from './DevelopersPageClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const { getDict } = await import('@/i18n/dict');
  const t = getDict(locale as 'zh' | 'en');
  return {
    title: t.pages.developers.meta.title,
    description: t.pages.developers.meta.description,
  };
}

export default function DevelopersPage() {
  return <DevelopersPageClient />;
}