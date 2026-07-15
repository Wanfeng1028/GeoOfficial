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

const modeDetails: Record<string, { title: string; features: string[] }> = {
  work: {
    title: '项目管理、任务调度、工具集成、成果汇总。',
    features: [
      '项目导航与文件树',
      '任务列表与执行状态',
      '工具面板与 Skills 集成',
      '进度追踪与成果预览',
    ],
  },
  code: {
    title: '编写、运行、调试地理空间代码和脚本。',
    features: [
      'Python 编辑器与语法高亮',
      '终端与运行日志',
      'GDAL / GEE / QGIS 集成',
      '代码片段与版本追溯',
    ],
  },
  map: {
    title: '浏览、叠加、分析空间数据和制图输出。',
    features: [
      '图层管理与样式配置',
      '多源影像与矢量叠加',
      '空间查询与属性查看',
      '制图输出与导出',
    ],
  },
};

export function ModeShowcaseClient({ modes }: { modes: readonly ModeItem[] }) {
  return (
    <Tabs defaultValue={modes[0]?.id} orientation="horizontal" className={styles.tabs}>
      <TabsList aria-label="GeoWork 工作模式" className={styles.list}>
        {modes.map((mode) => (
          <TabsTrigger key={mode.id} value={mode.id} className={styles.trigger}>
            {mode.label}
          </TabsTrigger>
        ))}
      </TabsList>

      <div className={styles.panels}>
        {modes.map((mode) => {
          const details = modeDetails[mode.id];
          return (
            <TabsContent key={mode.id} value={mode.id} className={styles.panel}>
              <div className={styles.panelLayout}>
                {/* 左 30%：说明 */}
                <div className={styles.panelCopy}>
                  <h3 className={styles.panelTitle}>{details?.title ?? mode.description}</h3>
                  {details?.features && (
                    <ul className={styles.featureList}>
                      {details.features.map((f) => (
                        <li key={f} className={styles.featureItem}>
                          {f}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* 右 70%：媒体 */}
                <div className={styles.mediaWrap}>
                  <Image
                    src={mode.image}
                    alt={mode.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 65vw"
                  />
                </div>
              </div>
            </TabsContent>
          );
        })}
      </div>
    </Tabs>
  );
}