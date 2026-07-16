import type { Metadata } from 'next';
import { ProductPageClient } from './ProductPageClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const { getDict } = await import('@/i18n/dict');
  const t = getDict(locale as 'zh' | 'en');
  return {
    title: t.pages.product.meta.title,
    description: t.pages.product.meta.description,
  };
}

export default function ProductPage() {
  return <ProductPageClient />;
}