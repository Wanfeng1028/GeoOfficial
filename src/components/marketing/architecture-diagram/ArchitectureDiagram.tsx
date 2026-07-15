import { Section } from '@/components/ui/section/Section';
import { Container } from '@/components/ui/container/Container';
import { SectionHeading } from '@/components/ui/section-heading/SectionHeading';
import { architectureLayers } from '@/data/architecture';
import { ecosystemGroups } from '@/data/product';
import styles from './ArchitectureDiagram.module.css';

export function ArchitectureDiagram() {
  return (
    <Section tone="surface" spacing="large" id="architecture">
      <Container>
        <SectionHeading
          eyebrow="本地优先架构"
          title="专业地理空间能力，运行在清晰的本地架构之上。"
          description="桌面界面、Go Runtime 与 Python Geo Worker 分层协作，并连接 QGIS、GDAL、Google Earth Engine、模型、Skills 与 MCP。"
        />
        <ol className={styles.layers}>
          {architectureLayers.map((node) => (
            <li key={node.id} className={styles.layer} data-layer={node.layer}>
              <div className={styles.layerHead}>
                <span className={styles.layerLabel}>{node.label}</span>
                <span className={styles.layerLayer}>{node.layer}</span>
              </div>
              <p className={styles.layerDesc}>{node.description}</p>
            </li>
          ))}
        </ol>

        <div className={styles.ecosystem}>
          <h3 className={styles.ecosystemTitle}>生态连接</h3>
          <div className={styles.ecosystemGrid}>
            {ecosystemGroups.map((group) => (
              <div key={group.title} className={styles.ecosystemGroup}>
                <p className={styles.ecosystemGroupTitle}>{group.title}</p>
                <ul className={styles.ecosystemItems}>
                  {group.items.map((item) => (
                    <li key={item} className={styles.ecosystemItem}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
