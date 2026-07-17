import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getArticlesBySection } from '@/data/articles';
import { helpContentLoaders, isHelpSlug } from '@/content/help';
import { ArticleDetailLayout } from '@/components/marketing/article-detail/ArticleDetailLayout';

interface PageProps {
  params: Promise<{ slug: string; locale: string }>;
}

const helpArticles = getArticlesBySection('help');

export async function generateStaticParams() {
  return helpArticles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const article = helpArticles.find((a) => a.slug === slug);
  if (!article) return {};
  const isEn = locale === 'en';
  return {
    title: `${isEn ? article.title.en : article.title.zh} · ${isEn ? 'Help Center · GeoWork' : '帮助中心 · GeoWork'}`,
    description: isEn ? article.description.en : article.description.zh,
  };
}

export default async function HelpArticlePage({ params }: PageProps) {
  const { slug } = await params;

  if (!isHelpSlug(slug)) {
    notFound();
  }

  const article = helpArticles.find((a) => a.slug === slug);
  if (!article) {
    notFound();
  }

  const { default: Content } = await helpContentLoaders[slug]();

  return (
    <ArticleDetailLayout article={article}>
      <Content />
    </ArticleDetailLayout>
  );
}
