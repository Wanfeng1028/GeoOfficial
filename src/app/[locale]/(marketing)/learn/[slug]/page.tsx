import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getArticlesBySection } from '@/data/articles';
import { learnContentLoaders, isLearnSlug } from '@/content/learn';
import { ArticleDetailLayout } from '@/components/marketing/article-detail/ArticleDetailLayout';

interface PageProps {
  params: Promise<{ slug: string; locale: string }>;
}

const learnArticles = getArticlesBySection('learn');

export async function generateStaticParams() {
  return learnArticles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const article = learnArticles.find((a) => a.slug === slug);
  if (!article) return {};
  const isEn = locale === 'en';
  return {
    title: `${isEn ? article.title.en : article.title.zh} · ${isEn ? 'Learn · GeoWork' : 'Learn · GeoWork'}`,
    description: isEn ? article.description.en : article.description.zh,
  };
}

export default async function LearnArticlePage({ params }: PageProps) {
  const { slug } = await params;

  if (!isLearnSlug(slug)) {
    notFound();
  }

  const article = learnArticles.find((a) => a.slug === slug);
  if (!article) {
    notFound();
  }

  const { default: Content } = await learnContentLoaders[slug]();

  return (
    <ArticleDetailLayout article={article}>
      <Content />
    </ArticleDetailLayout>
  );
}
