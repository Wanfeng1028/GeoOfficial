import type { Metadata } from 'next';
import { getRouteMeta } from '@/data/routes';
import { EcosystemIndexClient } from './EcosystemIndexClient';

const route = getRouteMeta('/ecosystem')!;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: route.title[locale as 'zh' | 'en'],
    description: route.description[locale as 'zh' | 'en'],
  };
}

export default function EcosystemPage() {
  return <EcosystemIndexClient />;
}
