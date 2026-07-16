import type { Metadata } from 'next';
import { DownloadPageClient } from './DownloadPageClient';
import { getLatestRelease } from '@/lib/github/releases';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const { getDict } = await import('@/i18n/dict');
  const t = getDict(locale as 'zh' | 'en');
  return {
    title: t.pages.download.meta.title,
    description: t.pages.download.meta.description,
  };
}

export default async function DownloadPage() {
  const result = await getLatestRelease();
  return <DownloadPageClient result={result} />;
}