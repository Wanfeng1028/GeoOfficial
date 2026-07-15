import { Container } from '@/components/ui/container/Container';
import { ecosystemNodes, ecosystemConnections } from '@/data/ecosystem';
import styles from './EcosystemShowcase.module.css';

export function EcosystemShowcase() {
  return (
    <section id="ecosystem" className={styles.section} aria-labelledby="eco-title">
      <Container>
        <div className={styles.intro}>
          <p className={styles.eyebrow}>Ecosystem</p>
          <h2 id="eco-title" className={styles.title}>
            GeoWork 生态连接。
          </h2>
          <p className={styles.description}>
            Core 通过 Skills 连接专业工具和 MCP 扩展，输出可复用的成果。
          </p>
        </div>

        <div className={styles.diagram} role="img" aria-label="GeoWork 生态关系图：Core → Skills → 工具/MCP → Outputs">
          {ecosystemNodes.map((node) => (
            <div key={node.id} className={`${styles.node} ${styles[node.type]}`}>
              <span className={styles.nodeLabel}>{node.label}</span>
              <span className={styles.nodeDesc}>{node.description}</span>
            </div>
          ))}
          {ecosystemConnections.map((conn) => (
            <div
              key={`${conn.source}-${conn.target}`}
              className={styles.connector}
              data-source={conn.source}
              data-target={conn.target}
              aria-hidden
            />
          ))}
        </div>
      </Container>
    </section>
  );
}