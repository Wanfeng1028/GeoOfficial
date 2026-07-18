'use client';

import styles from './GeoWorkPreview.module.css';

export function GeoWorkPreview() {
  return (
    <div className={styles.preview}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <span className={styles.brandMark} aria-hidden />
          <span className={styles.brandName}>GeoWork</span>
        </div>
        <nav className={styles.sidebarNav}>
          <button type="button" className={`${styles.navItem} ${styles.navItemActive}`}>
            <span className={styles.navIcon}>+</span>
            新建任务
          </button>
          <button type="button" className={styles.navItem}>
            <span className={styles.navIcon}>★</span>
            专家
          </button>
          <button type="button" className={styles.navItem}>
            <span className={styles.navIcon}>◆</span>
            扩展
          </button>
          <button type="button" className={styles.navItem}>
            <span className={styles.navIcon}>⏱</span>
            定时任务
          </button>
          <button type="button" className={styles.navItem}>
            <span className={styles.navIcon}>#</span>
            频道
          </button>
        </nav>
        <div className={styles.sidebarSection}>
          <div className={styles.sectionLabel}>最近任务</div>
          <div className={styles.recentItem}>杭州城市扩张分析</div>
          <div className={styles.recentItem}>NDVI 时序趋势</div>
          <div className={styles.recentItem}>研究报告导出</div>
        </div>
      </aside>

      <main className={styles.main}>
        <header className={styles.topbar}>
          <div className={styles.projectName}>杭州城市扩张分析</div>
          <nav className={styles.topbarNav}>
            <span className={`${styles.topbarTab} ${styles.topbarTabActive}`}>地图</span>
            <span className={styles.topbarTab}>数据</span>
            <span className={styles.topbarTab}>工作流</span>
            <span className={styles.topbarTab}>报告</span>
          </nav>
          <button type="button" className={styles.shareBtn}>分享</button>
        </header>

        <div className={styles.workspace}>
          <section className={styles.mapCanvas} aria-label="地图画布">
            <div className={styles.mapBase}>
              <svg className={styles.mapSvg} viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
                <rect width="400" height="300" fill="#f4f6f8" />
                <g opacity="0.25">
                  {Array.from({ length: 8 }, (_, i) => (
                    <line
                      key={`h-${i}`}
                      x1="0"
                      y1={i * 40 + 20}
                      x2="400"
                      y2={i * 40 + 20}
                      stroke="#d1d5db"
                      strokeWidth="1"
                    />
                  ))}
                  {Array.from({ length: 10 }, (_, i) => (
                    <line
                      key={`v-${i}`}
                      x1={i * 44 + 22}
                      y1="0"
                      x2={i * 44 + 22}
                      y2="300"
                      stroke="#d1d5db"
                      strokeWidth="1"
                    />
                  ))}
                </g>
                <g>
                  <path
                    d="M60,200 Q120,160 180,190 T300,170 T380,140"
                    fill="none"
                    stroke="#55a988"
                    strokeWidth="3"
                    opacity="0.8"
                  />
                  <path
                    d="M80,220 Q140,180 200,210 T320,190 T390,160"
                    fill="none"
                    stroke="#d79a37"
                    strokeWidth="3"
                    opacity="0.7"
                    strokeDasharray="6 4"
                  />
                  <circle cx="250" cy="120" r="18" fill="#3f7cff" opacity="0.25" />
                  <circle cx="250" cy="120" r="8" fill="#3f7cff" opacity="0.6" />
                </g>
              </svg>
            </div>

            <div className={styles.layerPanel}>
              <div className={styles.panelTitle}>图层</div>
              <ul className={styles.layerList}>
                <li className={styles.layerRow}>
                  <span className={`${styles.layerDot} ${styles.layerDotGreen}`} />
                  <span>建设用地 2026</span>
                </li>
                <li className={styles.layerRow}>
                  <span className={`${styles.layerDot} ${styles.layerDotOrange}`} />
                  <span>建设用地 2020</span>
                </li>
                <li className={styles.layerRow}>
                  <span className={`${styles.layerDot} ${styles.layerDotBlue}`} />
                  <span>水体边界</span>
                </li>
              </ul>
            </div>

            <div className={styles.statusPanel}>
              <div className={styles.panelTitle}>分析状态</div>
              <ul className={styles.taskList}>
                <li className={styles.taskDone}>载入 Sentinel-2 影像</li>
                <li className={styles.taskDone}>执行云掩膜</li>
                <li className={styles.taskActive}>建设用地变化检测</li>
                <li className={styles.taskPending}>生成分析报告</li>
              </ul>
            </div>
          </section>

          <div className={styles.aiInput}>
            <span className={styles.aiPrompt}>分析杭州市 2020—2026 年建设用地变化</span>
            <span className={styles.aiSend} aria-hidden>↑</span>
          </div>
        </div>
      </main>
    </div>
  );
}
