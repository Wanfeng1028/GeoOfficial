import type { Metadata } from 'next';
import { getRouteMeta } from '@/data/routes';
import { getPlatformPage } from '@/data/platform-pages';
import { PlatformPageLayout } from '@/components/marketing/platform-page/PlatformPageLayout';

const route = getRouteMeta('/platform/reporting')!;
const pageData = getPlatformPage('reporting')!;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: route.title[locale as 'zh' | 'en'],
    description: route.description[locale as 'zh' | 'en'],
  };
}

export default function PlatformReportingPage() {
  return <PlatformPageLayout data={pageData} />;
}
