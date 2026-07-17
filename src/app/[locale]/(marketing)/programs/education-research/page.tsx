import type { Metadata } from 'next';
import { InfoPageLayout } from '@/components/marketing/info-page/InfoPageLayout';
import { getDict } from '@/i18n/dict';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = getDict(locale as 'zh' | 'en');
  return {
    title: t.pages.programs.meta.title,
    description: t.pages.programs.meta.description,
  };
}

export default async function ProgramsEducationResearchPage({ params }: PageProps) {
  const { locale } = await params;
  const t = getDict(locale as 'zh' | 'en');
  const p = t.pages.programs;
  return (
    <InfoPageLayout
      hero={p.hero}
      draft={p.draft}
      sections={p.sections}
    />
  );
}
