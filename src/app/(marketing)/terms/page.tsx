import type { Metadata } from 'next';
import { Section } from '@/components/ui/section/Section';
import { Container } from '@/components/ui/container/Container';
import { SectionHeading } from '@/components/ui/section-heading/SectionHeading';
import { siteConfig } from '@/lib/site';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: '使用条款',
  description: 'GeoWork 官网与下载使用条款，草案。',
};

export default function TermsPage() {
  return (
    <Section tone="canvas" spacing="large">
      <Container width="content">
        <SectionHeading
          eyebrow="条款"
          title="使用条款。"
          description="本页面为草案，上线前需人工审核。"
        />
        <p className={styles.note}>
          草案 · 最后更新 2026-07-14 · 当前版本 {siteConfig.version}
        </p>

        <div className={styles.section}>
          <h2 className={styles.h2}>Developer Preview</h2>
          <p className={styles.p}>
            GeoWork 当前处于 {siteConfig.status}。不承诺稳定性、数据兼容性或功能完成度。后续版本可能调整能力、接口与构建。
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.h2}>官网与软件边界</h2>
          <p className={styles.p}>
            本网站为 GeoWork 产品的官网，负责展示、下载和文档入口。GeoWork 桌面软件的运行、数据处理和扩展由用户本地负责。
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.h2}>第三方数据与服务</h2>
          <p className={styles.p}>
            GeoWork 可连接 QGIS、GDAL、Google Earth Engine、模型提供商等第三方服务。具体使用与许可需对照各自条款。
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.h2}>下载与安装风险</h2>
          <p className={styles.p}>
            下载文件来自 GitHub Releases。请核对版本、校验值（若提供）后再使用。自行承担安装与运行风险。
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.h2}>开源许可</h2>
          <p className={styles.p}>
            具体许可请查看仓库 LICENSE 文件。本页面不构成法律建议。
          </p>
        </div>
      </Container>
    </Section>
  );
}
