import type { Metadata } from 'next';
import { UseCasesPageClient } from './UseCasesPageClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const { getDict } = await import('@/i18n/dict');
  const t = getDict(locale as 'zh' | 'en');
  return {
    title: t.pages.useCases.meta.title,
    description: t.pages.useCases.meta.description,
  };
}

export default function UseCasesPage() {
  return <UseCasesPageClient />;
}