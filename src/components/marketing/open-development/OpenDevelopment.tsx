import Link from 'next/link';
import { GithubLogoIcon, BookOpenIcon } from '@phosphor-icons/react/ssr';
import { Section } from '@/components/ui/section/Section';
import { Container } from '@/components/ui/container/Container';
import { SectionHeading } from '@/components/ui/section-heading/SectionHeading';
import { siteConfig } from '@/lib/site';
import styles from './OpenDevelopment.module.css';

export function OpenDevelopment() {
  return (
    <Section tone="white" spacing="default" id="development">
      <Container>
        <SectionHeading
          eyebrow="开放开发"
          title="透明表达当前开发状态。"
          description="GeoWork 仓库公开在 GitHub，当前处于 Developer Preview。参与贡献、查看路线图与发布记录均通过仓库入口。"
        />
        <div className={styles.grid}>
          <article className={styles.card}>
            <h3 className={styles.cardTitle}>当前状态</h3>
            <p className={styles.cardBody}>
              {siteConfig.status} · {siteConfig.version}
            </p>
            <p className={styles.cardNote}>
              自动化能力、macOS 与 Linux 构建属于后续计划，不作生产可用承诺。
            </p>
          </article>
          <article className={styles.card}>
            <h3 className={styles.cardTitle}>参与贡献</h3>
            <p className={styles.cardBody}>
              通过 GitHub Issues、Discussions 和 Pull Requests 参与。
            </p>
            <a
              className={styles.cardLink}
              href="https://github.com/Wanfeng1028/GeoWork/issues"
              target="_blank"
              rel="noreferrer"
            >
              <GithubLogoIcon aria-hidden /> Issues 入口
            </a>
          </article>
          <article className={styles.card}>
            <h3 className={styles.cardTitle}>文档与发布</h3>
            <p className={styles.cardBody}>
              当前文档指向仓库 docs，更新日志页面汇总每次 Release。
            </p>
            <div className={styles.cardLinks}>
              <a
                className={styles.cardLink}
                href={siteConfig.github}
                target="_blank"
                rel="noreferrer"
              >
                <GithubLogoIcon aria-hidden /> GitHub 仓库
              </a>
              <Link className={styles.cardLink} href="/changelog">
                <BookOpenIcon aria-hidden /> 更新日志
              </Link>
            </div>
          </article>
        </div>
      </Container>
    </Section>
  );
}
