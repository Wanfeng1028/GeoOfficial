import type { Metadata } from 'next';
import { AboutPageClient } from './AboutPageClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const { getDict } = await import('@/i18n/dict');
  const t = getDict(locale as 'zh' | 'en');
  return {
    title: t.pages.about.meta.title,
    description: t.pages.about.meta.description,
  };
}

export default function AboutPage() {
  return <AboutPageClient />;
}