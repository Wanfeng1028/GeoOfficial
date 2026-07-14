import type { ReactNode } from 'react';
import { SiteHeader } from '@/components/marketing/site-header/SiteHeader';
import { SiteFooter } from '@/components/marketing/site-footer/SiteFooter';

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </>
  );
}
