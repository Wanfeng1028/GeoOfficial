import type { Metadata } from 'next';
import { PrivacyPageClient } from './PrivacyPageClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const { getDict } = await import('@/i18n/dict');
  const t = getDict(locale as 'zh' | 'en');
  return {
    title: t.pages.privacy.meta.title,
    description: t.pages.privacy.meta.description,
  };
}

export default function PrivacyPage() {
  return <PrivacyPageClient />;
}