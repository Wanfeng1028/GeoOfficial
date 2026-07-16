import type { Metadata } from 'next';
import { ChangelogPageClient } from './ChangelogPageClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const { getDict } = await import('@/i18n/dict');
  const t = getDict(locale as 'zh' | 'en');
  return {
    title: t.pages.changelog.meta.title,
    description: t.pages.changelog.meta.description,
  };
}

export default function ChangelogPage() {
  return <ChangelogPageClient />;
}