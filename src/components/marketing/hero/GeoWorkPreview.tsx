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
            <span className={styles.navIcon}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                <rect x="6" y="1" width="2" height="12" rx="1" fill="currentColor" />
                <rect x="1" y="6" width="12" height="2" rx="1" fill="currentColor" />
              </svg>
            </span>
            新建任务
          </button>
          <button type="button" className={styles.navItem}>
            <span className={styles.navIcon}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path d="M7 1L9.05 5.25L13 5.91L10.5 8.54L11.18 12.84L7 10.67L2.82 12.84L3.5 8.54L1 5.91L4.95 5.25L7 1Z" fill="currentColor" />
              </svg>
            </span>
            专家
          </button>
          <button type="button" className={styles.navItem}>
            <span className={styles.navIcon}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                <rect x="1" y="1" width="12" height="12" rx="2" fill="currentColor" />
                <path d="M4 4L10 10M10 4L4 10" stroke="#FBFBFB" strokeWidth="1.5" />
              </svg>
            </span>
            扩展
          </button>
          <button type="button" className={styles.navItem}>
            <span className={styles.navIcon}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                <circle cx="7" cy="7" r="6" fill="currentColor" />
                <path d="M7 4V7L9 9" stroke="#FBFBFB" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </span>
            定时任务
          </button>
          <button type="button" className={styles.navItem}>
            <span className={styles.navIcon}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path d="M1 3H13M1 7H13M1 11H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </span>
            频道
          </button>
        </nav>
        <div className={styles.sidebarSection}>
          <div className={styles.sectionLabel}>最近任务</div>
          <div className={styles.recentItem}>
            <span className={styles.recentDot} />
            杭州城市扩张分析
          </div>
          <div className={styles.recentItem}>
            <span className={styles.recentDot} />
            NDVI 时序趋势
          </div>
          <div className={styles.recentItem}>
            <span className={styles.recentDot} />
            研究报告导出
          </div>
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
              <svg className={styles.mapSvg} viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice">
                {/* Base terrain */}
                <rect width="800" height="500" fill="#eef1f5" />
                {/* Grid lines */}
                <g stroke="#d6dbe3" strokeWidth="0.5" opacity="0.6">
                  {Array.from({ length: 14 }, (_, i) => (
                    <line key={`h-${i}`} x1="0" y1={i * 38 + 19} x2="800" y2={i * 38 + 19} />
                  ))}
                  {Array.from({ length: 22 }, (_, i) => (
                    <line key={`v-${i}`} x1={i * 38 + 19} y1="0" x2={i * 38 + 19} y2="500" />
                  ))}
                </g>
                {/* Water bodies */}
                <path d="M520,80 Q580,60 640,90 Q680,110 660,160 Q640,200 590,210 Q530,220 510,180 Q490,140 520,80Z" fill="#b8d4e8" opacity="0.5" />
                <path d="M100,340 Q160,320 200,350 Q240,380 200,420 Q160,450 110,430 Q70,410 80,370 Q90,345 100,340Z" fill="#b8d4e8" opacity="0.4" />
                {/* Urban area 2026 - green built-up */}
                <path d="M240,180 Q300,160 360,190 Q400,210 380,260 Q360,300 300,310 Q240,320 220,280 Q200,240 240,180Z" fill="#55a988" opacity="0.55" />
                <path d="M280,200 Q320,185 350,210 Q370,230 350,260 Q330,280 290,285 Q250,290 240,260 Q230,230 280,200Z" fill="#55a988" opacity="0.35" />
                {/* Urban expansion 2020-2026 - orange dashed */}
                <path d="M220,200 Q260,170 300,195 Q330,210 310,250 Q290,280 250,290 Q215,295 205,265 Q195,235 220,200Z" fill="none" stroke="#d79a37" strokeWidth="2" strokeDasharray="5 3" opacity="0.8" />
                {/* Roads */}
                <g stroke="#c8ccd4" strokeWidth="2" opacity="0.7">
                  <line x1="180" y1="100" x2="300" y2="380" />
                  <line x1="100" y1="200" x2="500" y2="220" />
                  <line x1="350" y1="150" x2="450" y2="400" />
                </g>
                {/* Analysis boundary */}
                <rect x="195" y="165" width="220" height="160" fill="none" stroke="#3f7cff" strokeWidth="2" rx="4" opacity="0.7" />
                <rect x="195" y="165" width="220" height="160" fill="#3f7cff" opacity="0.06" />
                {/* Analysis markers */}
                <g>
                  <circle cx="310" cy="220" r="5" fill="#3f7cff" opacity="0.8" />
                  <circle cx="310" cy="220" r="2" fill="#ffffff" />
                  <circle cx="260" cy="260" r="4" fill="#e06050" opacity="0.7" />
                  <circle cx="370" cy="240" r="4" fill="#e06050" opacity="0.7" />
                  <circle cx="340" cy="300" r="4" fill="#e06050" opacity="0.7" />
                </g>
                {/* Scale bar */}
                <g transform="translate(30, 460)">
                  <line x1="0" y1="0" x2="80" y2="0" stroke="#5a6070" strokeWidth="2" />
                  <line x1="0" y1="-4" x2="0" y2="4" stroke="#5a6070" strokeWidth="1.5" />
                  <line x1="80" y1="-4" x2="80" y2="4" stroke="#5a6070" strokeWidth="1.5" />
                  <text x="40" y="14" textAnchor="middle" fill="#5a6070" fontSize="10" fontFamily="system-ui">2 km</text>
                </g>
              </svg>
            </div>

            <div className={styles.layerPanel}>
              <div className={styles.panelTitle}>图层</div>
              <ul className={styles.layerList}>
                <li className={styles.layerRow}>
                  <span className={`${styles.layerDot} ${styles.layerDotGreen}`} />
                  <span className={styles.layerName}>建设用地 2026</span>
                  <span className={styles.layerBadge}>新建</span>
                </li>
                <li className={styles.layerRow}>
                  <span className={`${styles.layerDot} ${styles.layerDotOrange}`} />
                  <span className={styles.layerName}>建设用地 2020</span>
                  <span className={styles.layerBadge}>对比</span>
                </li>
                <li className={styles.layerRow}>
                  <span className={`${styles.layerDot} ${styles.layerDotBlue}`} />
                  <span className={styles.layerName}>水体边界</span>
                </li>
                <li className={styles.layerRow}>
                  <span className={`${styles.layerDot} ${styles.layerDotGray}`} />
                  <span className={styles.layerName}>道路网络</span>
                </li>
              </ul>
            </div>

            <div className={styles.statusPanel}>
              <div className={styles.panelTitle}>任务状态</div>
              <ul className={styles.taskList}>
                <li className={styles.taskDone}>
                  <span className={styles.taskIcon}>✓</span>
                  载入 Sentinel-2 影像
                </li>
                <li className={styles.taskDone}>
                  <span className={styles.taskIcon}>✓</span>
                  执行云掩膜
                </li>
                <li className={styles.taskActive}>
                  <span className={styles.taskIcon}>⟳</span>
                  建设用地变化检测
                </li>
                <li className={styles.taskPending}>
                  <span className={styles.taskIcon}>○</span>
                  生成分析报告
                </li>
              </ul>
              <div className={styles.taskProgress}>
                <div className={styles.progressBar}>
                  <div className={styles.progressFill} style={{ width: '75%' }} />
                </div>
                <span className={styles.progressLabel}>3/4 完成</span>
              </div>
            </div>

            <div className={styles.toolbar}>
              <button type="button" className={styles.toolBtn} aria-label="选择">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                  <path d="M2 1L12 5L8 7L12 12L7 8L5 12L2 1Z" fill="currentColor" />
                </svg>
              </button>
              <button type="button" className={styles.toolBtn} aria-label="平移">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                  <path d="M7 1V13M1 7H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
              <button type="button" className={`${styles.toolBtn} ${styles.toolBtnActive}`} aria-label="测量">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                  <rect x="1" y="10" width="12" height="3" rx="1" fill="currentColor" />
                  <path d="M3 10V4M7 10V6M11 10V7" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </button>
              <span className={styles.toolSeparator} />
              <span className={styles.toolInfo}>+12.3456, +123.4567</span>
            </div>
          </section>

          <div className={styles.aiInput}>
            <span className={styles.aiPrompt}>分析杭州市 2020—2026 年建设用地变化</span>
            <span className={styles.aiSend} aria-hidden>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                <path d="M1 1L11 6L1 11V7.5L8 6L1 4.5V1Z" fill="currentColor" />
              </svg>
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}