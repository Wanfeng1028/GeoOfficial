'use client';

import Image from 'next/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/primitives/tabs/Tabs';
import styles from './ModeShowcase.module.css';

interface ModeItem {
  id: string;
  label: string;
  description: string;
  image: string;
  alt: string;
}

export function ModeShowcaseClient({ modes }: { modes: readonly ModeItem[] }) {
  return (
    <Tabs defaultValue={modes[0]?.id} orientation="horizontal" className={styles.tabs}>
      <TabsList aria-label="GeoWork 工作模式" className={styles.list}>
        {modes.map((mode) => (
          <TabsTrigger key={mode.id} value={mode.id} className={styles.trigger}>
            <strong className={styles.triggerLabel}>{mode.label}</strong>
            <span className={styles.triggerDesc}>{mode.description}</span>
          </TabsTrigger>
        ))}
      </TabsList>

      <div className={styles.panels}>
        {modes.map((mode) => (
          <TabsContent key={mode.id} value={mode.id} className={styles.panel}>
            <div className={styles.mediaWrap}>
              <Image
                src={mode.image}
                alt={mode.alt}
                fill
                sizes="(max-width: 768px) 100vw, 65vw"
              />
            </div>
          </TabsContent>
        ))}
      </div>
    </Tabs>
  );
}
