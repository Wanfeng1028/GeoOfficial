'use client';

import { useState } from 'react';
import styles from './ProductStage.module.css';

type View = 'map' | 'code' | 'layers';

const views: { id: View; label: string }[] = [
  { id: 'map', label: 'Map' },
  { id: 'code', label: 'Code' },
  { id: 'layers', label: 'Layers' },
];

export function ProductStage() {
  const [activeView, setActiveView] = useState<View>('map');

  return (
    <div className={styles.stage} role="img" aria-label="GeoWork 桌面工作台产品界面">
      {/* 窗口标题栏 */}
      <div className={styles.windowHeader}>
        <div className={styles.windowDots}>
          <span className={styles.dot} style={{ background: '#ec7b7b' }} />
          <span className={styles.dot} style={{ background: '#e8b86d' }} />
          <span className={styles.dot} style={{ background: '#6fcf9f' }} />
        </div>
        <span className={styles.windowTitle}>GeoWork — urban-expansion-study</span>
      </div>

      <div className={styles.workspace}>
        {/* 左侧项目导航 */}
        <div className={styles.sidebar}>
          <div className={styles.sidebarSection}>
            <p className={styles.sidebarLabel}>Project</p>
            <p className={styles.sidebarItem}>urban-expansion-study</p>
          </div>
          <div className={styles.sidebarSection}>
            <p className={styles.sidebarLabel}>Datasets</p>
            <p className={styles.sidebarItem}>Landsat 8 OLI</p>
            <p className={styles.sidebarItem}>Sentinel-2</p>
            <p className={styles.sidebarItem}>Boundary.shp</p>
          </div>
          <div className={styles.sidebarSection}>
            <p className={styles.sidebarLabel}>Tasks</p>
            <p className={styles.sidebarItem}>NDVI calc</p>
            <p className={styles.sidebarItem}>Change detect</p>
            <p className={styles.sidebarItem}>Export map</p>
          </div>
        </div>

        {/* 中央工作区 */}
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
                    <span className={styles.legendDot} style={{ background: 'var(--color-brand)' }} />
                    <span className={styles.legendLabel}>NDVI High</span>
                    <span className={styles.legendDot} style={{ background: '#e8b86d' }} />
                    <span className={styles.legendLabel}>Urban</span>
                    <span className={styles.legendDot} style={{ background: '#7aa2ff' }} />
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

        {/* 右侧属性面板 */}
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
            <p className={styles.propValue} style={{ color: 'var(--color-brand)' }}>+0.16</p>
          </div>
          <div className={styles.propSection}>
            <p className={styles.propLabel}>Area</p>
            <p className={styles.propValue}>2.3 km²</p>
          </div>
        </div>
      </div>
    </div>
  );
}