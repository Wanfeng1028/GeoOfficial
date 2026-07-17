import { notFound } from 'next/navigation';
import { Container } from '@/components/ui/container/Container';
import { Section } from '@/components/ui/section/Section';
import { SectionHeading } from '@/components/ui/section-heading/SectionHeading';
import { Button } from '@/components/ui/button/Button';
import styles from './page.module.css';

/**
 * v2.5 Iteration 2 — Design system showcase.
 *
 * Exit criteria: `/dev/components` can view all states.
 * Shows: Token, Container, Grid, Typography, Button, Section, Border, Motion.
 * Production builds return 404.
 */
export default function DevComponentsPage() {
  if (process.env.NODE_ENV === 'production') {
    notFound();
  }

  return (
    <Section tone="canvas" spacing="large">
      <Container>
        <SectionHeading
          eyebrow="开发 · v2.5 Iteration 2"
          title="组件与 Token 展示页。"
          description="仅开发环境可见。展示所有设计基础状态：Token、Container、Grid、Typography、Button、Section、Border、Motion。"
        />

        {/* ─── Token ─── */}
        <section className={styles.group}>
          <h2 className={styles.h2}>Token · 颜色</h2>
          <p className={styles.hint}>切换主题（页面 data-page-theme）查看暗色值。</p>
          <div className={styles.tokenGrid}>
            <div className={styles.tokenCell} style={{ background: 'var(--page)' }}>
              <span>--page</span>
            </div>
            <div className={styles.tokenCell} style={{ background: 'var(--page-soft)' }}>
              <span>--page-soft</span>
            </div>
            <div className={styles.tokenCell} style={{ background: 'var(--page-muted)' }}>
              <span>--page-muted</span>
            </div>
            <div className={styles.tokenCell} style={{ background: 'var(--surface)' }}>
              <span>--surface</span>
            </div>
            <div className={styles.tokenCell} style={{ background: 'var(--surface-subtle)' }}>
              <span>--surface-subtle</span>
            </div>
            <div className={styles.tokenCell} style={{ background: 'var(--surface-hover)' }}>
              <span>--surface-hover</span>
            </div>
            <div className={styles.tokenCell} style={{ background: 'var(--text-primary)' }}>
              <span style={{ color: 'var(--page)' }}>--text-primary</span>
            </div>
            <div className={styles.tokenCell} style={{ background: 'var(--text-secondary)' }}>
              <span style={{ color: 'var(--page)' }}>--text-secondary</span>
            </div>
            <div className={styles.tokenCell} style={{ background: 'var(--text-tertiary)' }}>
              <span style={{ color: 'var(--page)' }}>--text-tertiary</span>
            </div>
            <div className={styles.tokenCell} style={{ background: 'var(--brand)' }}>
              <span style={{ color: '#fff' }}>--brand</span>
            </div>
            <div className={styles.tokenCell} style={{ background: 'var(--brand-soft)' }}>
              <span>--brand-soft</span>
            </div>
            <div className={styles.tokenCell} style={{ background: 'var(--status-green)' }}>
              <span style={{ color: '#fff' }}>--status-green</span>
            </div>
            <div className={styles.tokenCell} style={{ background: 'var(--status-blue)' }}>
              <span style={{ color: '#fff' }}>--status-blue</span>
            </div>
            <div className={styles.tokenCell} style={{ background: 'var(--status-yellow)' }}>
              <span style={{ color: '#fff' }}>--status-yellow</span>
            </div>
            <div className={styles.tokenCell} style={{ background: 'var(--status-red)' }}>
              <span style={{ color: '#fff' }}>--status-red</span>
            </div>
          </div>
        </section>

        {/* ─── Container ─── */}
        <section className={styles.group}>
          <h2 className={styles.h2}>Container · 宽度变体</h2>
          <div className={styles.containerDemo}>
            <Container width="wide">
              <div className={styles.containerBox}>wide · 90rem</div>
            </Container>
            <Container width="default">
              <div className={styles.containerBox}>default · 80rem</div>
            </Container>
            <Container width="content">
              <div className={styles.containerBox}>content · 55rem</div>
            </Container>
            <Container width="text">
              <div className={styles.containerBox}>text · 45rem</div>
            </Container>
          </div>
        </section>

        {/* ─── Grid ─── */}
        <section className={styles.group}>
          <h2 className={styles.h2}>Grid · 网格</h2>
          <p className={styles.hint}>响应式：移动 1 列，平板 2 列，桌面 3 列，宽屏 4 列。</p>
          <div className={styles.grid}>
            {Array.from({ length: 8 }, (_, i) => (
              <div key={i} className={styles.gridCell}>Cell {i + 1}</div>
            ))}
          </div>
        </section>

        {/* ─── Typography ─── */}
        <section className={styles.group}>
          <h2 className={styles.h2}>Typography · 排版</h2>
          <p className={styles.hint}>中文与英文独立适配（html lang 切换时字号变化）。</p>
          <div className={styles.typoStack}>
            <div>
              <span className={styles.typoLabel}>display</span>
              <p className="display">地理空间工作，汇聚一处</p>
            </div>
            <div>
              <span className={styles.typoLabel}>heading1</span>
              <p className="heading1">一个工作台，贯穿项目到成果</p>
            </div>
            <div>
              <span className={styles.typoLabel}>heading2</span>
              <p className="heading2">从问题到成果的完整工作过程</p>
            </div>
            <div>
              <span className={styles.typoLabel}>heading3</span>
              <p className="heading3">Work / Code / Map 三种模式</p>
            </div>
            <div>
              <span className={styles.typoLabel}>bodyLarge</span>
              <p className="bodyLarge">GeoWork 将项目、地图、遥感数据、代码、工具与研究 outcome 组织在同一个连续工作区中。</p>
            </div>
            <div>
              <span className={styles.typoLabel}>body</span>
              <p className="body">每个对象、每个操作和每份成果，都关联同一个项目上下文。</p>
            </div>
            <div>
              <span className={styles.typoLabel}>small</span>
              <p className="small">Developer Preview · 当前处于开发阶段</p>
            </div>
            <div>
              <span className={styles.typoLabel}>caption</span>
              <p className="caption">© 2026 GeoWork contributors</p>
            </div>
            <div>
              <span className={styles.typoLabel}>eyebrow</span>
              <p className="eyebrow">Universal Context</p>
            </div>
          </div>
        </section>

        {/* ─── Button ─── */}
        <section className={styles.group}>
          <h2 className={styles.h2}>Button · 按钮</h2>
          <p className={styles.hint}>变体 × 尺寸 × 状态</p>
          <div className={styles.buttonStack}>
            <div className={styles.row}>
              <span className={styles.rowLabel}>primary</span>
              <Button variant="primary" size="sm">Small</Button>
              <Button variant="primary" size="md">Medium</Button>
              <Button variant="primary" size="lg">Large</Button>
              <Button variant="primary" size="md" disabled>Disabled</Button>
            </div>
            <div className={styles.row}>
              <span className={styles.rowLabel}>secondary</span>
              <Button variant="secondary" size="sm">Small</Button>
              <Button variant="secondary" size="md">Medium</Button>
              <Button variant="secondary" size="lg">Large</Button>
              <Button variant="secondary" size="md" disabled>Disabled</Button>
            </div>
            <div className={styles.row}>
              <span className={styles.rowLabel}>quiet</span>
              <Button variant="quiet" size="sm">Small</Button>
              <Button variant="quiet" size="md">Medium</Button>
              <Button variant="quiet" size="lg">Large</Button>
              <Button variant="quiet" size="md" disabled>Disabled</Button>
            </div>
            <div className={styles.row}>
              <span className={styles.rowLabel}>text</span>
              <Button variant="text" size="sm">Small</Button>
              <Button variant="text" size="md">Medium</Button>
              <Button variant="text" size="lg">Large</Button>
              <Button variant="text" size="md" disabled>Disabled</Button>
            </div>
          </div>
        </section>

        {/* ─── Section ─── */}
        <section className={styles.group}>
          <h2 className={styles.h2}>Section · 区块</h2>
          <p className={styles.hint}>tone × spacing 组合</p>
          <div className={styles.sectionStack}>
            <Section tone="canvas" spacing="compact">
              <div className={styles.sectionDemo}>tone=canvas · spacing=compact</div>
            </Section>
            <Section tone="surface" spacing="default">
              <div className={styles.sectionDemo}>tone=surface · spacing=default</div>
            </Section>
            <Section tone="raised" spacing="large">
              <div className={styles.sectionDemo}>tone=raised · spacing=large</div>
            </Section>
            <Section tone="dark" spacing="default">
              <div className={styles.sectionDemo}>tone=dark · spacing=default</div>
            </Section>
          </div>
        </section>

        {/* ─── Border ─── */}
        <section className={styles.group}>
          <h2 className={styles.h2}>Border · 边框与圆角</h2>
          <div className={styles.borderRow}>
            <div className={styles.borderCell} style={{ borderRadius: 'var(--radius-control)' }}>
              radius-control · 6px
            </div>
            <div className={styles.borderCell} style={{ borderRadius: 'var(--radius-panel)' }}>
              radius-panel · 12px
            </div>
            <div className={styles.borderCell} style={{ borderRadius: 'var(--radius-media)' }}>
              radius-media · 20px
            </div>
            <div className={styles.borderCell} style={{ borderRadius: 'var(--radius-large)' }}>
              radius-large · 28px
            </div>
            <div className={styles.borderCell} style={{ borderRadius: 'var(--radius-pill)' }}>
              radius-pill · 999px
            </div>
          </div>
          <div className={styles.borderRow}>
            <div className={styles.borderCellStrong}>border · subtle</div>
            <div className={styles.borderCellStrong} style={{ borderColor: 'var(--border-strong)', borderWidth: '1px' }}>
              border · strong
            </div>
          </div>
        </section>

        {/* ─── Motion ─── */}
        <section className={styles.group}>
          <h2 className={styles.h2}>Motion · 动效</h2>
          <p className={styles.hint}>遵循 prefers-reduced-motion。刷新页面查看进入动效。</p>
          <div className={styles.motionRow}>
            <div className={`${styles.motionCell} enter-fade`}>enter-fade · 260ms</div>
            <div className={`${styles.motionCell} enter-rise`}>enter-rise · 520ms</div>
            <div className={`${styles.motionCell} enter-rise-fast`}>enter-rise-fast · 260ms</div>
          </div>
          <div className={styles.motionMeta}>
            <code>--duration-fast: 140ms</code>
            <code>--duration-normal: 260ms</code>
            <code>--duration-slow: 520ms</code>
            <code>--ease-standard: cubic-bezier(0.2, 0.8, 0.2, 1)</code>
          </div>
        </section>

        {/* ─── Spacing ─── */}
        <section className={styles.group}>
          <h2 className={styles.h2}>Spacing · 间距</h2>
          <div className={styles.spacingRow}>
            {[
              ['--space-1', '0.25rem'],
              ['--space-2', '0.5rem'],
              ['--space-3', '0.75rem'],
              ['--space-4', '1rem'],
              ['--space-5', '1.5rem'],
              ['--space-6', '2rem'],
              ['--space-7', '3rem'],
              ['--space-8', '4rem'],
              ['--space-9', '6rem'],
              ['--space-10', '8rem'],
            ].map(([token, val]) => (
              <div key={token} className={styles.spacingCell}>
                <div className={styles.spacingBar} style={{ width: val }} />
                <span>{token}</span>
                <span className={styles.spacingVal}>{val}</span>
              </div>
            ))}
          </div>
        </section>
      </Container>
    </Section>
  );
}
