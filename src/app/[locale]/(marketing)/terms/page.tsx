import type { Metadata } from 'next';
import { TermsPageClient } from './TermsPageClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const { getDict } = await import('@/i18n/dict');
  const t = getDict(locale as 'zh' | 'en');
  return {
    title: t.pages.terms.meta.title,
    description: t.pages.terms.meta.description,
  };
}

export default function TermsPage() {
  return <TermsPageClient />;
}