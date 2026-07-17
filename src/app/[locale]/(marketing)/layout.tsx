import type { ReactNode } from 'react';
import { AnnouncementBar } from '@/components/marketing/announcement-bar/AnnouncementBar';
import { SiteHeader } from '@/components/marketing/site-header/SiteHeader';
import { SiteFooter } from '@/components/marketing/site-footer/SiteFooter';
import styles from './layout.module.css';

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.shell}>
      <AnnouncementBar />
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}