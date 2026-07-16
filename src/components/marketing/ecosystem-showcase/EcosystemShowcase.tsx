'use client';

import { useLocale } from '@/i18n/LocaleProvider';
import { getDict } from '@/i18n/dict';
import { Container } from '@/components/ui/container/Container';
import { ThemeObserver } from '@/components/scroll/ThemeObserver';
import styles from './EcosystemShowcase.module.css';

const integrations = [
  { label: 'QGIS', desc: 'Desktop GIS engineering & cartography', status: 'connected' as const },
  { label: 'GDAL', desc: 'Raster & vector data conversion', status: 'connected' as const },
  { label: 'Google Earth Engine', desc: 'Cloud-based remote sensing', status: 'connected' as const },
  { label: 'Python', desc: 'Geo Worker scripting & analysis', status: 'connected' as const },
  { label: 'PostGIS', desc: 'Spatial database queries', status: 'planned' as const },
  { label: 'MCP', desc: 'Model routing & tool invocation', status: 'connected' as const },
  { label: 'Skills', desc: 'Reusable GIS commands & workflows', status: 'connected' as const },
  { label: 'Plugins', desc: 'Third-party extension interface', status: 'planned' as const },
];

export function EcosystemShowcase() {
  const { locale } = useLocale();
  const t = getDict(locale);

  return (
    <ThemeObserver theme="dark">
      <section id="ecosystem" className={styles.section}>
        <Container>
          <div className={styles.intro}>
            <p className={styles.eyebrow}>{t.ecosystem.eyebrow}</p>
            <h2 className={styles.title}>{t.ecosystem.title}</h2>
            <p className={styles.description}>{t.ecosystem.description}</p>
          </div>

          {/* Icon track */}
          <div className={styles.track}>
            <div className={styles.trackInner}>
              {[...integrations, ...integrations].map((item, i) => (
                <div key={`${item.label}-${i}`} className={styles.trackItem}>
                  <span className={styles.trackLabel}>{item.label}</span>
                  <span className={`${styles.trackStatus} ${styles[item.status]}`}>
                    {item.status === 'connected' ? 'Connected' : 'Planned'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* SDK / Skills / MCP blocks */}
          <div className={styles.blocks}>
            <div className={styles.block}>
              <h3 className={styles.blockTitle}>Skills</h3>
              <p className={styles.blockDesc}>Reusable command units for GIS, remote sensing, and reporting workflows.</p>
            </div>
            <div className={styles.block}>
              <h3 className={styles.blockTitle}>MCP</h3>
              <p className={styles.blockDesc}>Model Context Protocol extensions for AI-assisted geospatial work.</p>
            </div>
            <div className={styles.block}>
              <h3 className={styles.blockTitle}>Tool Adapters</h3>
              <p className={styles.blockDesc}>Connect QGIS, GDAL, GEE, and Python tools through standardized interfaces.</p>
            </div>
            <div className={styles.block}>
              <h3 className={styles.blockTitle}>Runtime</h3>
              <p className={styles.blockDesc}>Go runtime with Python Geo Worker for local-first, high-performance execution.</p>
            </div>
          </div>

          <p className={styles.note}>
            Developer Preview — Connection status reflects current development stage.
          </p>
        </Container>
      </section>
    </ThemeObserver>
  );
}