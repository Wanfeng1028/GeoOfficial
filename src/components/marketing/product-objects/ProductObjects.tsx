'use client';

import { useState } from 'react';
import { Container } from '@/components/ui/container/Container';
import { productObjects } from '@/data/product-objects';
import { MediaFrame } from '@/components/ui/media-frame/MediaFrame';
import styles from './ProductObjects.module.css';

export function ProductObjects() {
  const [activeId, setActiveId] = useState(productObjects[0]?.id);

  const active = productObjects.find((o) => o.id === activeId) ?? productObjects[0];

  return (
    <section id="product-objects" className={styles.section} aria-labelledby="objects-title">
      <Container>
        <div className={styles.intro}>
          <p className={styles.eyebrow}>Product Objects</p>
          <h2 id="objects-title" className={styles.title}>
            Project / Dataset / Layer / Task / Artifact
          </h2>
          <p className={styles.description}>
            GeoWork 围绕五个核心对象组织工作。点击任意对象查看它在工作区中的位置。
          </p>
        </div>

        <div className={styles.layout}>
          {/* 左：对象列表 */}
          <div className={styles.objectsList}>
            {productObjects.map((obj) => (
              <button
                key={obj.id}
                type="button"
                className={`${styles.objectBtn}${activeId === obj.id ? ` ${styles.active}` : ''}`}
                onClick={() => setActiveId(obj.id)}
                aria-current={activeId === obj.id ? 'true' : undefined}
              >
                <span className={styles.objectIndex}>
                  {String(productObjects.indexOf(obj) + 1).padStart(2, '0')}
                </span>
                <span className={styles.objectLabel}>{obj.label}</span>
              </button>
            ))}
          </div>

          {/* 右：当前对象详情 */}
          <div className={styles.detail}>
            <h3 className={styles.objectTitle}>{active.title}</h3>
            <p className={styles.objectDesc}>{active.description}</p>
          </div>
        </div>

        {/* 产品媒体 — 模拟工作区截图 */}
        <MediaFrame className={styles.media} ratio="16:10" tone="dark">
          <div className={styles.workspace}>
            <p className={styles.workspacePlaceholder}>
              待替换：GeoFrontend2.0 工作区截图（含 {active.label} 高亮位置）
            </p>
            {active.highlight && (
              <div
                className={styles.highlight}
                style={{
                  top: active.highlight.top,
                  left: active.highlight.left,
                  width: active.highlight.width,
                  height: active.highlight.height,
                }}
                aria-hidden
              />
            )}
          </div>
        </MediaFrame>
      </Container>
    </section>
  );
}