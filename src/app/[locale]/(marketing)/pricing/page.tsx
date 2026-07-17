import { redirect } from 'next/navigation';

interface PageProps {
  params: Promise<{ locale: string }>;
}

/**
 * /pricing → /plans redirect
 * Per v2.5 plan section 7.1: /[locale]/pricing → 重定向到 /[locale]/plans
 * Attio uses /pricing; GeoWork uses /plans to reflect open-source Developer Preview.
 */
export default async function PricingRedirectPage({ params }: PageProps) {
  const { locale } = await params;
  redirect(`/${locale}/plans`);
}
