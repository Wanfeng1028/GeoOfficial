import type { Metadata } from 'next';
import { getRouteMeta } from '@/data/routes';
import { getPlatformPage } from '@/data/platform-pages';
import { PlatformPageLayout } from '@/components/marketing/platform-page/PlatformPageLayout';

const route = getRouteMeta('/platform/context')!;
const pageData = getPlatformPage('context')!;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: route.title[locale as 'zh' | 'en'],
    description: route.description[locale as 'zh' | 'en'],
  };
}

export default function PlatformContextPage() {
  return <PlatformPageLayout data={pageData} />;
}
