import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getArticlesBySection } from '@/data/articles';
import { engineeringContentLoaders, isEngineeringSlug } from '@/content/engineering';
import { ArticleDetailLayout } from '@/components/marketing/article-detail/ArticleDetailLayout';

interface PageProps {
  params: Promise<{ slug: string; locale: string }>;
}

const engineeringArticles = getArticlesBySection('engineering');

export async function generateStaticParams() {
  return engineeringArticles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const article = engineeringArticles.find((a) => a.slug === slug);
  if (!article) return {};
  const isEn = locale === 'en';
  return {
    title: `${isEn ? article.title.en : article.title.zh} · ${isEn ? 'Engineering · GeoWork' : '工程实践 · GeoWork'}`,
    description: isEn ? article.description.en : article.description.zh,
  };
}

export default async function EngineeringArticlePage({ params }: PageProps) {
  const { slug } = await params;

  if (!isEngineeringSlug(slug)) {
    notFound();
  }

  const article = engineeringArticles.find((a) => a.slug === slug);
  if (!article) {
    notFound();
  }

  const { default: Content } = await engineeringContentLoaders[slug]();

  return (
    <ArticleDetailLayout article={article}>
      <Content />
    </ArticleDetailLayout>
  );
}
