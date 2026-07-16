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
          草案 · 最后更新 2026-07-14
          {siteConfig.version
            ? ` · 当前版本 ${siteConfig.version}`
            : ' · 当前尚未发布公开版本'}
        </p>

        <div className={styles.section}>
          <h2 className={styles.h2}>开发状态</h2>
          <p className={styles.p}>
            GeoWork 当前处于开发阶段，尚未发布公开版本。不承诺稳定性、数据兼容性或功能完成度。后续版本可能调整能力、接口与构建。
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
            GeoWork 与 GeoOfficial 的许可方案尚待项目负责人确认。在许可文件正式发布前，请勿将本网站内容理解为已经授予再分发或商业使用权。本页面不构成法律建议。
          </p>
        </div>
      </Container>
    </Section>
  );
}