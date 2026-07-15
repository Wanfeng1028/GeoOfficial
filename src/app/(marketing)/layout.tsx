import type { ReactNode } from 'react';
import { AnnouncementBar } from '@/components/marketing/announcement-bar/AnnouncementBar';
import { SiteHeader } from '@/components/marketing/site-header/SiteHeader';
import { SiteFooter } from '@/components/marketing/site-footer/SiteFooter';

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <AnnouncementBar />
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </>
  );
}
