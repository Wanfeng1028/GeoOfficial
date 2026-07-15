'use client';

import { useState } from 'react';
import { Container } from '@/components/ui/container/Container';
import { productObjects } from '@/data/product-objects';
import { ProductStage } from '@/components/marketing/product-stage/ProductStage';
import styles from './ProductObjects.module.css';

export function ProductObjects() {
  const [activeId, setActiveId] = useState(productObjects[0]?.id);

  const active = productObjects.find((o) => o.id === activeId) ?? productObjects[0];

  return (
    <section id="product-objects" className={styles.section} aria-labelledby="objects-title">
      <Container>
        <div className={styles.intro}>
          <p className={styles.eyebrow}>FIG 1.1 · Product Objects</p>
          <h2 id="objects-title" className={styles.title}>
            项目中的每个对象，始终保持上下文。
          </h2>
          <p className={styles.description}>
            Project / Dataset / Layer / Task / Artifact — 五个核心对象在同一个工作区中连续工作。
          </p>
        </div>

        <div className={styles.layout}>
          {/* 左：对象索引导航 */}
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

        {/* 产品工作区展示 */}
        <div className={styles.stage}>
          <ProductStage />
        </div>
      </Container>
    </section>
  );
}
