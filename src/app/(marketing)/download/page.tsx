import type { Metadata } from 'next';
import Link from 'next/link';
import { Section } from '@/components/ui/section/Section';
import { Container } from '@/components/ui/container/Container';
import { SectionHeading } from '@/components/ui/section-heading/SectionHeading';
import { Button } from '@/components/ui/button/Button';
import { ArrowRightIcon, GithubLogoIcon } from '@phosphor-icons/react/ssr';
import { getLatestRelease } from '@/lib/github/releases';
import { formatBytes, formatDate } from '@/lib/content/mdx';
import { platformRules, systemRequirements, faqs } from '@/data/platforms';
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionTrigger,
  AccordionContent,
} from '@/components/primitives/accordion/Accordion';
import styles from './download.module.css';

export const metadata: Metadata = {
  title: '下载',
  description: 'GeoWork 下载、版本、平台与系统要求。当前处于 Developer Preview。',
};

export default async function DownloadPage() {
  const release = await getLatestRelease();

  return (
    <Section tone="canvas" spacing="large">
      <Container>
        <SectionHeading
          eyebrow="下载"
          title="开始使用 GeoWork。"
          description="GeoWork 当前处于 Developer Preview。请先查看系统要求、版本说明和已知限制。"
          width="content"
        />

        <div className={styles.release}>
          <div className={styles.releaseInfo}>
            <p className={styles.releaseVersion}>
              {release.tag_name}
              {release.prerelease ? ' · Developer Preview' : ''}
            </p>
            {release.published_at ? (
              <p className={styles.releaseDate}>
                发布时间 · {formatDate(release.published_at)}
              </p>
            ) : null}
            <p className={styles.releaseBody}>
              {release.body ??
                'GeoWork 当前处于开发阶段。请前往 GitHub 查看最新构建与说明。'}
            </p>
            <a
              className={styles.releaseLink}
              href={release.html_url}
              target="_blank"
              rel="noreferrer"
            >
              <GithubLogoIcon aria-hidden /> GitHub Releases
            </a>
          </div>
        </div>

        <h2 className={styles.h2}>平台</h2>
        <ul className={styles.platforms}>
          {platformRules.map((rule) => {
            const matched = release.assets.filter((asset) =>
              rule.patterns.some((pattern) => pattern.test(asset.name)),
            );
            return (
              <li key={rule.id} className={styles.platform}>
                <div className={styles.platformInfo}>
                  <p className={styles.platformLabel}>{rule.label}</p>
                  <p className={styles.platformNotes}>{rule.notes}</p>
                </div>
                {matched.length > 0 ? (
                  <ul className={styles.platformFiles}>
                    {matched.map((asset) => (
                      <li key={asset.id}>
                        <a
                          className={styles.platformLink}
                          href={asset.browser_download_url}
                          rel="noreferrer"
                        >
                          {asset.name}
                          <span className={styles.platformSize}>
                            {formatBytes(asset.size)}
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className={styles.platformEmpty}>尚未提供官方构建</p>
                )}
              </li>
            );
          })}
        </ul>

        <h2 className={styles.h2}>系统要求</h2>
        <div className={styles.requirements}>
          {systemRequirements.map((req) => (
            <div key={req.platform} className={styles.requirement}>
              <h3 className={styles.requirementTitle}>{req.platform}</h3>
              <ul className={styles.requirementList}>
                {req.requirements.map((r) => (
                  <li key={r} className={styles.requirementItem}>{r}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <h2 className={styles.h2}>安装说明</h2>
        <ol className={styles.install}>
          <li>下载对应平台的构建（当前仅 Windows x64）。</li>
          <li>解压或运行安装包，按需配置 QGIS、Python 环境。</li>
          <li>启动 GeoWork，创建首个项目并导入数据。</li>
          <li>如遇问题可前往 GitHub Issues 反馈。</li>
        </ol>

        <h2 className={styles.h2}>常见问题</h2>
        <Accordion type="multiple" className={styles.faq}>
          {faqs.map((faq, idx) => (
            <AccordionItem key={faq.question} value={`faq-${idx}`}>
              <AccordionHeader>
                <AccordionTrigger className={styles.faqTrigger}>
                  {faq.question}
                </AccordionTrigger>
              </AccordionHeader>
              <AccordionContent className={styles.faqContent}>
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className={styles.actions}>
          <Button
            asChild
            variant="primary"
            size="md"
            trailingIcon={<ArrowRightIcon aria-hidden />}
          >
            <a
              href="https://github.com/Wanfeng1028/GeoWork/releases"
              target="_blank"
              rel="noreferrer"
            >
              前往 GitHub Releases
            </a>
          </Button>
          <Button asChild variant="text" size="md">
            <Link href="/changelog">查看更新日志</Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
}
