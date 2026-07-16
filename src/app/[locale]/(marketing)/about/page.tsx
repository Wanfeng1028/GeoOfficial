import type { Metadata } from 'next';
import Link from 'next/link';
import { Section } from '@/components/ui/section/Section';
import { Container } from '@/components/ui/container/Container';
import { SectionHeading } from '@/components/ui/section-heading/SectionHeading';
import { Button } from '@/components/ui/button/Button';
import { ArrowRightIcon, GithubLogoIcon } from '@phosphor-icons/react/ssr';
import { siteConfig } from '@/lib/site';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: '关于',
  description: 'GeoWork 项目动机、开源方式、许可边界与仓库关系。',
};

export default function AboutPage() {
  return (
    <Section tone="canvas" spacing="large">
      <Container width="content">
        <SectionHeading
          eyebrow="关于"
          title="为地理空间工作而生的桌面工作台。"
          description="GeoWork 把地图、遥感、代码、研究与自动化工作流汇于一个本地优先的桌面工作台，开源开发，当前处于 Developer Preview。"
        />

        <div className={styles.section}>
          <h2 className={styles.h2}>项目初心</h2>
          <p className={styles.p}>
            GeoWork 希望让 GIS、遥感、空间分析与科研工作能在同一上下文中连续推进，而不是反复在工具、脚本、文献和报告之间切换。AI 与 Agent 是产品能力的一部分，但不是品牌视觉或唯一身份。
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.h2}>当前状态</h2>
          <p className={styles.p}>
            {siteConfig.status} · {siteConfig.version}
          </p>
          <ul className={styles.list}>
            <li>桌面工作台与 Work / Code / Map 模式框架已建立。</li>
            <li>Go Runtime 与 Python Geo Worker 接入基础工具。</li>
            <li>自动化能力属于 Developer Preview，不作生产可用承诺。</li>
            <li>macOS 与 Linux 构建尚未提供。</li>
          </ul>
        </div>

        <div className={styles.section}>
          <h2 className={styles.h2}>仓库关系</h2>
          <ul className={styles.list}>
            <li>
              <a
                className={styles.link}
                href={siteConfig.github}
                target="_blank"
                rel="noreferrer"
              >
                <GithubLogoIcon aria-hidden /> GeoWork 主仓库
              </a>
            </li>
            <li>
              <a
                className={styles.link}
                href={siteConfig.frontend}
                target="_blank"
                rel="noreferrer"
              >
                <GithubLogoIcon aria-hidden /> GeoFrontend2.0 桌面前端仓库
              </a>
            </li>
          </ul>
        </div>

        <div className={styles.section}>
          <h2 className={styles.h2}>许可</h2>
          <p className={styles.p}>
            具体许可请查看仓库 LICENSE 文件。官网不在此提供法律建议。
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.h2}>参与贡献</h2>
          <p className={styles.p}>
            可通过 GitHub Issues、Discussions 和 Pull Requests 参与。不承诺商业支持或团队协作功能时间表。
          </p>
        </div>

        <div className={styles.actions}>
          <Button
            asChild
            variant="primary"
            size="md"
            trailingIcon={<GithubLogoIcon aria-hidden />}
          >
            <a
              href="https://github.com/Wanfeng1028/GeoWork"
              target="_blank"
              rel="noreferrer"
            >
              GitHub 仓库
            </a>
          </Button>
          <Button
            asChild
            variant="text"
            size="md"
            trailingIcon={<ArrowRightIcon aria-hidden />}
          >
            <Link href="/download">查看下载</Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
}