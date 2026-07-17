'use client';

import { useState } from 'react';
import Link from 'next/link';
import { GithubLogoIcon } from '@phosphor-icons/react/ssr';
import { useLocale } from '@/i18n/LocaleProvider';
import { getDict } from '@/i18n/dict';
import { Button } from '@/components/ui/button/Button';
import { Container } from '@/components/ui/container/Container';
import styles from './Hero.module.css';

type View = 'map' | 'code' | 'layers';

const views: { id: View; label: string }[] = [
  { id: 'map', label: 'Map' },
  { id: 'code', label: 'Code' },
  { id: 'layers', label: 'Layers' },
];

export function Hero() {
  const { locale } = useLocale();
  const t = getDict(locale);
  const [activeView, setActiveView] = useState<View>('map');

  return (
    <section id="hero" className={styles.hero} aria-labelledby="home-title">
      {/* Ambient backdrop */}
      <div className={styles.ambient}>
        <div className={styles.ambientGlow1} />
        <div className={styles.ambientGlow2} />
      </div>

      {/* Hero Copy */}
      <Container width="default">
        <div className={styles.copy}>
          <p className={styles.eyebrow}>{t.hero.eyebrow}</p>
          <h1 id="home-title" className={styles.title}>
            {t.hero.title.split('\n').map((line, i) => (
              <span key={i}>
                {i > 0 && <br />}
                {line}
              </span>
            ))}
          </h1>
          <p className={styles.description}>{t.hero.description}</p>
          <div className={styles.actions}>
            <Button asChild variant="primary" size="lg">
              <Link href="/platform">{t.hero.primaryCta}</Link>
            </Button>
            <Button
              asChild
              variant="secondary"
              size="lg"
              leadingIcon={<GithubLogoIcon aria-hidden />}
            >
              <a href="https://github.com/Wanfeng1028/GeoWork" target="_blank" rel="noreferrer">
                {t.hero.secondaryCta}
              </a>
            </Button>
          </div>
          <div className={styles.status}>
            <span className={styles.statusDot} />
            {t.hero.status}
          </div>
        </div>
      </Container>

      {/* Product Window — Attio 式紧跟文案 */}
      <Container width="wide">
        <div className={styles.stageContainer}>
          {/* Main product window */}
          <div className={styles.mainWindow} role="group" aria-label="GeoWork 桌面工作台产品界面">
            <div className={styles.windowHeader}>
              <div className={styles.windowDots}>
                <span className={styles.dot} style={{ background: '#d95858' }} />
                <span className={styles.dot} style={{ background: '#d79a37' }} />
                <span className={styles.dot} style={{ background: '#29b36a' }} />
              </div>
              <span className={styles.windowTitle}>GeoWork — urban-expansion-study</span>
            </div>

            <div className={styles.workspace}>
              <div className={styles.sidebar}>
                <div className={styles.sidebarSection}>
                  <p className={styles.sidebarLabel}>Project</p>
                  <p className={`${styles.sidebarItem} ${styles.sidebarItemActive}`}>urban-expansion-study</p>
                </div>
                <div className={styles.sidebarSection}>
                  <p className={styles.sidebarLabel}>Datasets</p>
                  <p className={styles.sidebarItem}>Landsat 8 OLI</p>
                  <p className={`${styles.sidebarItem} ${styles.sidebarItemActive}`}>Sentinel-2</p>
                  <p className={styles.sidebarItem}>Boundary.shp</p>
                </div>
                <div className={styles.sidebarSection}>
                  <p className={styles.sidebarLabel}>Tasks</p>
                  <p className={styles.sidebarItem}>NDVI calc</p>
                  <p className={styles.sidebarItem}>Change detect</p>
                  <p className={styles.sidebarItem}>Export map</p>
                </div>
              </div>

              <div className={styles.main}>
                <div className={styles.toolbar}>
                  {views.map((v) => (
                    <button
                      key={v.id}
                      type="button"
                      className={`${styles.toolbarBtn}${activeView === v.id ? ` ${styles.toolbarBtnActive}` : ''}`}
                      onClick={() => setActiveView(v.id)}
                      aria-pressed={activeView === v.id}
                    >
                      {v.label}
                    </button>
                  ))}
                </div>

                <div className={styles.canvas}>
                  {activeView === 'map' && (
                    <div className={styles.mapCanvas}>
                      <div className={styles.mapGrid}>
                        {Array.from({ length: 6 }, (_, i) => (
                          <div key={i} className={styles.mapCell} style={{ opacity: 0.15 + i * 0.06 }} />
                        ))}
                      </div>
                      <div className={styles.mapOverlay}>
                        <div className={styles.mapLegend}>
                          <span className={styles.legendDot} style={{ background: '#55a988' }} />
                          <span className={styles.legendLabel}>NDVI High</span>
                          <span className={styles.legendDot} style={{ background: '#d79a37' }} />
                          <span className={styles.legendLabel}>Urban</span>
                          <span className={styles.legendDot} style={{ background: '#3f7cff' }} />
                          <span className={styles.legendLabel}>Water</span>
                        </div>
                      </div>
                    </div>
                  )}
                  {activeView === 'code' && (
                    <div className={styles.codeCanvas}>
                      <div className={styles.codeLine}>import geowork as gw</div>
                      <div className={styles.codeLine}> </div>
                      <div className={styles.codeLine}>{'project = gw.open_project("urban-expansion-study")'}</div>
                      <div className={styles.codeLine}>ndvi = project.compute_ndvi(</div>
                      <div className={styles.codeIndent}>sentinel_data,</div>
                      <div className={styles.codeIndent}>year_range=(2020, 2025)</div>
                      <div className={styles.codeLine}>)</div>
                      <div className={styles.codeLine}>{'print(f"NDVI change: {ndvi.mean_change:.2f}")'}</div>
                    </div>
                  )}
                  {activeView === 'layers' && (
                    <div className={styles.layersCanvas}>
                      <div className={styles.layerRow}>
                        <span className={styles.layerCheck} />
                        <span className={styles.layerName}>NDVI 2025</span>
                        <span className={styles.layerStatus}>visible</span>
                      </div>
                      <div className={styles.layerRow}>
                        <span className={styles.layerCheck} />
                        <span className={styles.layerName}>NDVI 2020</span>
                        <span className={styles.layerStatus}>visible</span>
                      </div>
                      <div className={styles.layerRow}>
                        <span className={styles.layerCheck} />
                        <span className={styles.layerName}>Urban Boundary</span>
                        <span className={styles.layerStatus}>visible</span>
                      </div>
                      <div className={styles.layerRow}>
                        <span className={styles.layerCheckEmpty} />
                        <span className={styles.layerName} style={{ opacity: 0.5 }}>Building Footprints</span>
                        <span className={styles.layerStatus}>hidden</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className={styles.properties}>
                <div className={styles.propSection}>
                  <p className={styles.propLabel}>Selection</p>
                  <p className={styles.propValue}>NDVI 2025</p>
                </div>
                <div className={styles.propSection}>
                  <p className={styles.propLabel}>Mean</p>
                  <p className={styles.propValue}>0.48</p>
                </div>
                <div className={styles.propSection}>
                  <p className={styles.propLabel}>Change</p>
                  <p className={`${styles.propValue} ${styles.propValuePositive}`}>+0.16</p>
                </div>
                <div className={styles.propSection}>
                  <p className={styles.propLabel}>Area</p>
                  <p className={styles.propValue}>2.3 km²</p>
                </div>
              </div>
            </div>
          </div>

          {/* Left floating panel */}
          <div className={styles.leftPanel}>
            <p className={styles.floatTitle}>Project Info</p>
            <p className={styles.floatContent}>
              Research area: 45 km² urban fringe. Comparing Landsat 8 and Sentinel-2 for NDVI trend analysis.
            </p>
            <div className={styles.floatMeta}>
              <span style={{ color: 'var(--status-green)' }}>Active</span>
              <span>2020–2025</span>
            </div>
          </div>

          {/* Right floating panel */}
          <div className={styles.rightPanel}>
            <p className={styles.floatTitle}>Results</p>
            <p className={styles.floatContent}>
              NDVI mean change: +0.16. Urban expansion detected in NE sector. Export ready.
            </p>
            <div className={styles.floatMeta}>
              <span>2.3 km²</span>
              <span style={{ color: 'var(--brand-text)' }}>+7.2%</span>
            </div>
          </div>

          {/* Bottom command panel */}
          <div className={styles.bottomPanel}>
            <span className={styles.promptArrow}>$</span>
            <span className={styles.promptText}>geowork export --format geotiff --crs EPSG:4326</span>
            <span className={styles.promptCursor} />
          </div>
        </div>
      </Container>
    </section>
  );
}
