import { notFound } from 'next/navigation';
import { Container } from '@/components/ui/container/Container';
import { Section } from '@/components/ui/section/Section';
import { SectionHeading } from '@/components/ui/section-heading/SectionHeading';
import { Button } from '@/components/ui/button/Button';
import { MediaFrame } from '@/components/ui/media-frame/MediaFrame';
import { Figure } from '@/components/ui/figure/Figure';
import styles from './page.module.css';

export default function RedesignPage() {
  if (process.env.NODE_ENV === 'production') {
    notFound();
  }

  return (
    <>
      <Section tone="canvas" spacing="large">
        <Container>
          <SectionHeading
            eyebrow="设计系统 v1.1"
            title="GeoWork Linear × Attio Redesign"
            description="设计系统展示页，仅开发环境可见。对照 Linear 65% + Attio 35% 规范验证。"
            align="center"
          />
        </Container>
      </Section>

      {/* 字体层级 */}
      <Section tone="surface" spacing="default">
        <Container>
          <SectionHeading
            eyebrow="Typography"
            title="字体层级"
            description="Hero H1 最大 68px，Section H2 最大 46px。中文标题使用 text-wrap: balance。"
          />
          <div className={styles.typoGrid}>
            <div className={styles.typoItem}>
              <p className={styles.typoLabel}>Display</p>
              <p className={styles.display}>GeoWork Spatial</p>
            </div>
            <div className={styles.typoItem}>
              <p className={styles.typoLabel}>H1 / Hero</p>
              <p className={styles.h1}>地图、遥感、代码与研究</p>
            </div>
            <div className={styles.typoItem}>
              <p className={styles.typoLabel}>H2 / Section</p>
              <p className={styles.h2}>为地理空间工作而生的桌面工作台</p>
            </div>
            <div className={styles.typoItem}>
              <p className={styles.typoLabel}>H3 / Feature</p>
              <p className={styles.h3}>项目优先 · 上下文连续 · 可扩展</p>
            </div>
            <div className={styles.typoItem}>
              <p className={styles.typoLabel}>Body Large</p>
              <p className={styles.bodyLg}>GeoWork 将地图、遥感、代码、研究与自动化工作流汇于一个桌面工作台。</p>
            </div>
            <div className={styles.typoItem}>
              <p className={styles.typoLabel}>Body</p>
              <p className={styles.body}>围绕真实项目组织数据、工具、文件与成果，而不是围绕一次对话组织工作。</p>
            </div>
            <div className={styles.typoItem}>
              <p className={styles.typoLabel}>Small</p>
              <p className={styles.small}>Developer Preview · 查看当前可用平台</p>
            </div>
            <div className={styles.typoItem}>
              <p className={styles.typoLabel}>Caption</p>
              <p className={styles.caption}>FIG 01 · 工作区与地图</p>
            </div>
          </div>
        </Container>
      </Section>

      {/* 颜色 Token */}
      <Section tone="raised" spacing="default">
        <Container>
          <SectionHeading
            eyebrow="Colors"
            title="颜色 Token"
            description="品牌绿仅占全站 5–8%。不使用 Aurora、Glow、Mesh Gradient。"
          />
          <div className={styles.tokenGroup}>
            <p className={styles.tokenGroupLabel}>Light</p>
            <div className={styles.tokenRow}>
              <div className={styles.token} style={{ background: 'var(--color-page)' }}>
                <span>page</span>
              </div>
              <div className={styles.token} style={{ background: 'var(--color-page-alt)' }}>
                <span>page-alt</span>
              </div>
              <div className={styles.token} style={{ background: 'var(--color-surface)' }}>
                <span>surface</span>
              </div>
              <div className={styles.token} style={{ background: 'var(--color-surface-raised)' }}>
                <span>raised</span>
              </div>
              <div className={styles.token} style={{ background: 'var(--color-text-primary)' }}>
                <span style={{ color: '#fff' }}>text-primary</span>
              </div>
              <div className={styles.token} style={{ background: 'var(--color-text-secondary)' }}>
                <span style={{ color: '#fff' }}>text-secondary</span>
              </div>
              <div className={styles.token} style={{ background: 'var(--color-brand)' }}>
                <span style={{ color: '#fff' }}>brand</span>
              </div>
              <div className={styles.token} style={{ background: 'var(--color-brand-soft)' }}>
                <span>brand-soft</span>
              </div>
            </div>
            <p className={styles.tokenGroupLabel}>Dark</p>
            <div className={styles.tokenRow}>
              <div className={styles.token} style={{ background: 'var(--color-dark-page)' }}>
                <span style={{ color: '#fff' }}>dark-page</span>
              </div>
              <div className={styles.token} style={{ background: 'var(--color-dark-surface)' }}>
                <span style={{ color: '#fff' }}>dark-surface</span>
              </div>
              <div className={styles.token} style={{ background: 'var(--color-dark-raised)' }}>
                <span style={{ color: '#fff' }}>dark-raised</span>
              </div>
              <div className={styles.token} style={{ background: 'var(--color-dark-text-primary)' }}>
                <span style={{ color: '#fff' }}>dark-text</span>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Button */}
      <Section tone="surface" spacing="default">
        <Container>
          <SectionHeading
            eyebrow="Buttons"
            title="按钮变体"
            description="圆角 8–10px，禁用胶囊。Attio 风格黑色主按钮，克制绿色点缀。"
          />
          <div className={styles.group}>
            <p className={styles.groupLabel}>Variants</p>
            <div className={styles.row}>
              <Button variant="primary" size="md">Primary</Button>
              <Button variant="secondary" size="md">Secondary</Button>
              <Button variant="quiet" size="md">Quiet</Button>
              <Button variant="text" size="md">Text</Button>
              <Button variant="primary" size="md" disabled>Disabled</Button>
            </div>
          </div>
          <div className={styles.group}>
            <p className={styles.groupLabel}>Sizes</p>
            <div className={styles.row}>
              <Button variant="primary" size="sm">Small</Button>
              <Button variant="primary" size="md">Medium</Button>
              <Button variant="primary" size="lg">Large</Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* Container 宽度 */}
      <Section tone="canvas" spacing="default">
        <Container>
          <SectionHeading
            eyebrow="Container"
            title="容器宽度"
            description="Wide 1440px / Default 1280px / Content 880px / Text 720px"
          />
        </Container>
        <div className={styles.demoContainer} style={{ '--container-width': 'var(--container-wide)' } as React.CSSProperties}>
          <div className={styles.containerLabel}>Wide (1440px)</div>
        </div>
        <div className={styles.demoContainer}>
          <div className={styles.containerLabel}>Default (1280px)</div>
        </div>
        <div className={styles.demoContainer} style={{ '--container-width': 'var(--container-content)' } as React.CSSProperties}>
          <div className={styles.containerLabel}>Content (880px)</div>
        </div>
        <div className={styles.demoContainer} style={{ '--container-width': 'var(--container-text)' } as React.CSSProperties}>
          <div className={styles.containerLabel}>Text (720px)</div>
        </div>
      </Section>

      {/* Section 色调 */}
      <Section tone="surface" spacing="default">
        <Container>
          <SectionHeading
            eyebrow="Sections"
            title="Section 色调"
            description="暗色层次：page → raised → surface → dark"
          />
        </Container>
      </Section>
      <Section tone="raised" spacing="compact">
        <Container>
          <p className={styles.sectionDemo}>raised — 暗色层次 1</p>
        </Container>
      </Section>
      <Section tone="surface" spacing="compact">
        <Container>
          <p className={styles.sectionDemo}>surface — 暗色层次 2</p>
        </Container>
      </Section>
      <Section tone="dark" spacing="compact">
        <Container>
          <p className={styles.sectionDemo} style={{ color: 'var(--color-text-primary)' }}>
            dark — 深色背景
          </p>
        </Container>
      </Section>

      {/* MediaFrame + Figure */}
      <Section tone="surface" spacing="default">
        <Container>
          <SectionHeading
            eyebrow="Media"
            title="MediaFrame & Figure"
            description="大圆角 (20–28px)、无发光。阴影只用于浮层和产品媒体。"
          />
          <div className={styles.mediaDemo}>
            <Figure
              fig="01"
              title="GeoWork 桌面工作台示例"
              note="16:10 比例，深色 tone 带阴影，用于产品媒体展示。"
            >
              <MediaFrame ratio="16:10" tone="dark">
                <p className={styles.mediaPlaceholder}>
                  待替换：GeoFrontend2.0 截图
                </p>
              </MediaFrame>
            </Figure>
          </div>
        </Container>
      </Section>
    </>
  );
}