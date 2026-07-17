import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getArticlesBySection } from '@/data/articles';
import { blogContentLoaders, isBlogSlug } from '@/content/blog';
import { ArticleDetailLayout } from '@/components/marketing/article-detail/ArticleDetailLayout';

interface PageProps {
  params: Promise<{ slug: string; locale: string }>;
}

const blogArticles = getArticlesBySection('blog');

export async function generateStaticParams() {
  return blogArticles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const article = blogArticles.find((a) => a.slug === slug);
  if (!article) return {};
  const isEn = locale === 'en';
  return {
    title: `${isEn ? article.title.en : article.title.zh} · ${isEn ? 'Blog · GeoWork' : '博客 · GeoWork'}`,
    description: isEn ? article.description.en : article.description.zh,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;

  if (!isBlogSlug(slug)) {
    notFound();
  }

  const article = blogArticles.find((a) => a.slug === slug);
  if (!article) {
    notFound();
  }

  const { default: Content } = await blogContentLoaders[slug]();

  return (
    <ArticleDetailLayout article={article}>
      <Content />
    </ArticleDetailLayout>
  );
}
