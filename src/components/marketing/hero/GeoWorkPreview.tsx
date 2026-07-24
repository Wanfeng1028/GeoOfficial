'use client';

import {
  AnimatePresence,
  motion,
  useDragControls,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionStyle,
  type PanInfo,
} from 'motion/react';
import { useEffect, useRef, useState, type FormEvent, type PointerEvent as ReactPointerEvent, type ReactNode, type RefObject } from 'react';

import { motionTokens } from '@/styles/motion-tokens';
import styles from './GeoWorkPreview.module.css';

type ProductView = 'overview' | 'map' | 'data' | 'workflow';

type DraggableFrameProps = {
  children: ReactNode;
  className: string;
  handleLabel: string;
  dragEnabled: boolean;
  constraintsRef: RefObject<HTMLDivElement | null>;
  scrollStyle?: MotionStyle;
};

function DraggableFrame({
  children,
  className,
  handleLabel,
  dragEnabled,
  constraintsRef,
  scrollStyle,
}: DraggableFrameProps) {
  const controls = useDragControls();
  const [dragging, setDragging] = useState(false);

  const startDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragEnabled) return;
    event.preventDefault();
    controls.start(event);
  };

  return (
    <motion.div className={className} style={scrollStyle}>
      <motion.div
        className={styles.dragLayer}
        drag={dragEnabled}
        dragControls={controls}
        dragListener={false}
        dragConstraints={constraintsRef}
        dragElastic={0.03}
        dragMomentum={false}
        onDragStart={() => setDragging(true)}
        onDragEnd={(_event: PointerEvent, _info: PanInfo) => setDragging(false)}
        data-dragging={dragging}
      >
        <div
          className={styles.windowHandle}
          onPointerDown={startDrag}
          aria-label={handleLabel}
          role='button'
          tabIndex={dragEnabled ? 0 : -1}
        >
          <span className={styles.dotRed} />
          <span className={styles.dotYellow} />
          <span className={styles.dotGreen} />
        </div>
        {children}
      </motion.div>
    </motion.div>
  );
}

function useFinePointer() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(min-width: 768px) and (pointer: fine)');
    const update = () => setEnabled(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  return enabled;
}

const views: { id: ProductView; label: string }[] = [
  { id: 'overview', label: '概览' },
  { id: 'map', label: '地图' },
  { id: 'data', label: '数据' },
  { id: 'workflow', label: '工作流' },
];

const sceneForProgress = (progress: number): ProductView => {
  if (progress < 0.32) return 'overview';
  if (progress < 0.61) return 'map';
  if (progress < 0.82) return 'data';
  return 'workflow';
};

export function GeoWorkPreview() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const finePointer = useFinePointer();
  const [view, setView] = useState<ProductView>('overview');
  const [stageReady, setStageReady] = useState(false);
  const [prompt, setPrompt] = useState('比较杭州 2020—2026 年建设用地变化');
  const [isAnalysing, setIsAnalysing] = useState(false);
  const [floating, setFloating] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 115, damping: 28, mass: 0.24 });

  const mainY = useTransform(progress, [0, 0.15, 1], [60, 0, -30]);
  const mainScale = useTransform(progress, [0, 0.15, 1], [0.92, 1, 0.985]);
  const mainOpacity = useTransform(progress, [0, 0.06, 0.15, 1], [0.7, 0.88, 1, 0.92]);
  const mainRotateX = useTransform(progress, [0, 0.15], [6, 0]);
  const glowOpacity = useTransform(progress, [0, 0.3, 0.74, 1], [0.12, 0.3, 0.6, 0.76]);
  const glowScale = useTransform(progress, [0, 0.5, 1], [0.95, 1.02, 1.08]);

  const [leftTopVisible, setLeftTopVisible] = useState(false);
  const [rightVisible, setRightVisible] = useState(false);
  const [terminalVisible, setTerminalVisible] = useState(false);

  useMotionValueEvent(progress, 'change', (latest) => {
    setStageReady((current) => {
      const next = latest > 0.15;
      return current === next ? current : current;
    });
    const nextScene = sceneForProgress(latest);
    setView((current) => (current === nextScene ? current : nextScene));
  });

  useEffect(() => {
    if (stageReady && !reducedMotion) {
      const t1 = window.setTimeout(() => setLeftTopVisible(true), 300);
      const t2 = window.setTimeout(() => setRightVisible(true), 480);
      const t3 = window.setTimeout(() => setTerminalVisible(true), 660);
      return () => {
        window.clearTimeout(t1);
        window.clearTimeout(t2);
        window.clearTimeout(t3);
      };
    }
    setLeftTopVisible(false);
    setRightVisible(false);
    setTerminalVisible(false);
  }, [stageReady, reducedMotion]);

  useEffect(() => {
    if (!isAnalysing) return;
    const timer = window.setTimeout(() => setIsAnalysing(false), 1100);
    return () => window.clearTimeout(timer);
  }, [isAnalysing]);

  useEffect(() => {
    if (stageReady && !reducedMotion) {
      const timer = window.setTimeout(() => setFloating(true), 600);
      return () => window.clearTimeout(timer);
    }
    setFloating(false);
  }, [stageReady, reducedMotion]);

  const runAnalysis = (event: FormEvent) => {
    event.preventDefault();
    if (prompt.trim()) setIsAnalysing(true);
  };

  const dragEnabled = stageReady && finePointer && !reducedMotion;
  const mainStyle: MotionStyle = reducedMotion
    ? { opacity: 1, scale: 1, y: 0, rotateX: 0 }
    : { y: mainY, scale: mainScale, opacity: mainOpacity, rotateX: mainRotateX };

  return (
    <section ref={sectionRef} className={styles.scrollSection} role='group' aria-label='GeoWork 桌面工作台产品界面'>
      <div ref={stageRef} className={styles.stickyStage}>
        <motion.div className={styles.backgroundGlow} style={reducedMotion ? { opacity: 0.68, scale: 1 } : { opacity: glowOpacity, scale: glowScale }} />
        <div className={styles.verticalGrid} aria-hidden='true' />

        <DraggableFrame
          className={`${styles.leftTopFrame}${floating ? ` ${styles.floating}` : ''}`}
          handleLabel='拖动任务通知窗口'
          dragEnabled={dragEnabled}
          constraintsRef={stageRef}
          scrollStyle={{ opacity: (leftTopVisible || reducedMotion) ? 1 : 0 }}
        >
          <div className={styles.noticeWindow}>
            <p className={styles.floatTitle}>任务通知</p>
            <p><b>✓</b> Sentinel-2 影像已同步</p>
            <p><b>✓</b> 云掩膜任务完成</p>
            <p><b>→</b> 生成变化检测报告</p>
            <div className={styles.miniProgress}><i /></div>
          </div>
        </DraggableFrame>

        <DraggableFrame
          className={styles.mainFrame}
          handleLabel='拖动 GeoWork 主窗口'
          dragEnabled={dragEnabled}
          constraintsRef={stageRef}
          scrollStyle={mainStyle}
        >
          <div className={styles.productWindow}>
            <aside className={styles.sidebar}>
              <div className={styles.workspaceBrand}><span /><strong>GeoWork</strong></div>
              <button type='button' className={styles.sidebarAction}>＋ 新建任务</button>
              <button type='button' className={styles.sidebarItem}>◆ 项目空间</button>
              <button type='button' className={styles.sidebarItem}>○ 图层库</button>
              <button type='button' className={styles.sidebarItem}>⌁ 工作流</button>
              <button type='button' className={styles.sidebarItem}>▣ 研究报告</button>
              <div className={styles.sidebarDivider} />
              <p className={styles.sidebarLabel}>最近项目</p>
              <button type='button' className={styles.recentProjectActive}>杭州城市扩张分析</button>
              <button type='button' className={styles.recentProject}>NDVI 时序趋势</button>
              <button type='button' className={styles.recentProject}>海岸线提取</button>
            </aside>

            <main className={styles.appMain}>
              <header className={styles.appHeader}>
                <div><span className={styles.projectDiamond}>◆</span> 杭州城市扩张分析</div>
                <div className={styles.headerTools}>＋　⋮</div>
              </header>
              <nav className={styles.tabBar} aria-label='产品视图切换'>
                {views.map((item) => (
                  <button
                    key={item.id}
                    type='button'
                    aria-pressed={view === item.id}
                    className={view === item.id ? styles.tabActive : ''}
                    onClick={() => setView(item.id)}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
              <div className={styles.canvas}>
                <AnimatePresence mode='wait' initial={false}>
                  <motion.div
                    key={view}
                    className={styles.sceneContent}
                    initial={reducedMotion ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reducedMotion ? undefined : { opacity: 0, y: -8 }}
                    transition={{
                      duration: motionTokens.durationNormal,
                      ease: motionTokens.easeStandard,
                    }}
                  >
                    {view === 'overview' && <OverviewScene />}
                    {view === 'map' && <MapScene />}
                    {view === 'data' && <DataScene />}
                    {view === 'workflow' && <WorkflowScene />}
                  </motion.div>
                </AnimatePresence>
              </div>
              <form className={styles.composer} onSubmit={runAnalysis}>
                <input value={prompt} onChange={(event) => setPrompt(event.target.value)} aria-label='输入空间分析任务' />
                <span>{isAnalysing ? '分析中' : '自动'}</span>
                <button type='submit' aria-label='运行分析'>{isAnalysing ? '…' : '↑'}</button>
              </form>
            </main>
          </div>
        </DraggableFrame>

        <DraggableFrame
          className={`${styles.rightFrame}${floating ? ` ${styles.floating}` : ''}`}
          handleLabel='拖动空间分析结果窗口'
          dragEnabled={dragEnabled}
          constraintsRef={stageRef}
          scrollStyle={{ opacity: (rightVisible || reducedMotion) ? 1 : 0 }}
        >
          <div className={styles.resultWindow}>
            <p className={styles.resultEyebrow}>空间分析结果</p>
            <strong>建设用地变化</strong>
            <p>2020–2026 年增长 18.4%，主要集中在东部新城</p>
            <div className={styles.resultBars}><i /><i /><i /><i /></div>
            <span>45% 完成</span>
          </div>
        </DraggableFrame>

        <DraggableFrame
          className={`${styles.terminalFrame}${floating ? ` ${styles.floating}` : ''}`}
          handleLabel='拖动运行日志窗口'
          dragEnabled={dragEnabled}
          constraintsRef={stageRef}
          scrollStyle={{ opacity: (terminalVisible || reducedMotion) ? 1 : 0 }}
        >
          <div className={styles.terminalWindow}>
            <p>urban-growth · run 08</p>
            <code><b>$</b> 载入 Sentinel-2 影像</code>
            <code><b>✓</b> 云掩膜与裁剪完成</code>
            <code><b>›</b> 正在运行变化检测…</code>
            <div><i /></div>
          </div>
        </DraggableFrame>
      </div>
    </section>
  );
}

function OverviewScene() {
  return <div className={styles.overviewScene}>
    <h2>早上好，Alex</h2><p>你的空间研究工作台已就绪</p>
    <div className={styles.overviewPrompt}>比较杭州 2020—2026 年建设用地变化 <b>↑</b></div>
    <div className={styles.metricGrid}>
      <div><span>运行中的任务</span><strong>03</strong><em>＋1 本周</em></div>
      <div><span>已连接数据</span><strong>12</strong><em>全部同步</em></div>
      <div><span>最新洞察</span><strong>18.4%</strong><em>建设用地增长</em></div>
    </div>
    <div className={styles.activityList}><span>● 杭州城市扩张分析已完成预处理</span><span>● Sentinel-2 影像正在同步</span><span>● 研究报告草稿等待确认</span></div>
  </div>;
}

function MapScene() {
  return <div className={styles.mapScene}>
    <div className={styles.mapGrid} /><div className={styles.waterOne} /><div className={styles.waterTwo} /><div className={styles.terrain} /><div className={styles.terrainInner} /><div className={styles.boundary}><i /><i /><i /></div><div className={styles.roadOne} /><div className={styles.roadTwo} />
    <div className={styles.layerPanel}><b>图层</b><span>● 建设用地 2026</span><span>● 建设用地 2020</span><span>● 水体边界</span></div>
  </div>;
}

function DataScene() {
  const rows = ['Sentinel-2 / 2026', 'Sentinel-2 / 2020', '建设用地矢量', '水体边界'];
  return <div className={styles.dataScene}><div className={styles.dataToolbar}>数据目录　　筛选 2　　排序</div><div className={styles.dataTable}>{rows.map((row, index) => <div key={row}><span className={styles.dataDot} />{row}<em>{index === 3 ? '已验证' : '已连接'}</em></div>)}</div></div>;
}

function WorkflowScene() {
  return <div className={styles.workflowScene}><div className={styles.workflowNode}>影像采集<small>已完成</small></div><i /><div className={styles.workflowNode}>云掩膜与裁剪<small>已完成</small></div><i /><div className={styles.workflowNode}>变化检测<small>运行中</small></div><i /><div className={styles.workflowNode}>研究报告<small>等待</small></div></div>;
}
