import type { Metadata } from 'next';
import { Section } from '@/components/ui/section/Section';
import { Container } from '@/components/ui/container/Container';
import { SectionHeading } from '@/components/ui/section-heading/SectionHeading';
import { siteConfig } from '@/lib/site';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: '隐私',
  description: 'GeoWork 官网数据处理说明，草案。',
};

export default function PrivacyPage() {
  return (
    <Section tone="canvas" spacing="large">
      <Container width="content">
        <SectionHeading
          eyebrow="隐私"
          title="官网数据处理说明。"
          description="本页面为草案，上线前需人工审核。"
        />
        <p className={styles.note}>
          草案 · 最后更新 2026-07-14
        </p>

        <div className={styles.section}>
          <h2 className={styles.h2}>官网数据</h2>
          <p className={styles.p}>
            官网当前不主动启用分析工具。若启用，将仅采集：页面访问、来源域名、下载按钮点击、GitHub / Docs 外链点击、粗粒度平台信息。官网不存储用户工作数据。
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.h2}>GitHub 外链</h2>
          <p className={styles.p}>
            官网通过 GitHub Releases 提供下载入口，并使用 GitHub 公开仓库展示产品状态。访问 GitHub 时适用 GitHub 自身隐私条款。
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.h2}>桌面端数据</h2>
          <p className={styles.p}>
            GeoWork 桌面软件本身采用本地优先架构，核心工作可在本地完成。但本地优先不等于所有数据永远不离开本地：使用 Google Earth Engine、模型服务等联网功能时，相应数据会按各自服务条款传输。
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.h2}>第三方模型或 Earth Engine</h2>
          <p className={styles.p}>
            GeoWork 可连接 QGIS、GDAL、Google Earth Engine、模型提供商等第三方服务。具体使用、数据传输与许可需对照各自条款。
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.h2}>是否启用 Analytics</h2>
          <p className={styles.p}>
            当前未启用分析工具。若未来启用，会在本页面记录日期与采集范围。
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.h2}>不收集什么</h2>
          <ul className={styles.list}>
            <li>个人身份信息（除明确填写表单外）</li>
            <li>精确地理位置</li>
            <li>键盘输入内容</li>
            <li>产品截图中的数据</li>
            <li>跨站广告画像</li>
          </ul>
        </div>

        <div className={styles.section}>
          <h2 className={styles.h2}>更新与联系方式</h2>
          <p className={styles.p}>
            隐私说明变化时会在本页面记录日期。反馈可通过 GitHub Issues 进行。
          </p>
        </div>
      </Container>
    </Section>
  );
}
