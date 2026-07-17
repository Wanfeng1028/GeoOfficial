import type { Metadata } from 'next';
import { getRouteMeta } from '@/data/routes';
import { getResourcePage } from '@/data/resource-pages';
import { ResourceIndexLayout } from '@/components/marketing/resource-page/ResourceIndexLayout';

const route = getRouteMeta('/partners')!;
const pageData = getResourcePage('partners')!;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: route.title[locale as 'zh' | 'en'],
    description: route.description[locale as 'zh' | 'en'],
  };
}

export default function PartnersPage() {
  return <ResourceIndexLayout data={pageData} />;
}
