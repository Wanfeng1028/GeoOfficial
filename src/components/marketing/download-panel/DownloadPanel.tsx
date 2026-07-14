import Link from 'next/link';
import { ArrowRightIcon, GithubLogoIcon } from '@phosphor-icons/react/ssr';
import { Section } from '@/components/ui/section/Section';
import { Container } from '@/components/ui/container/Container';
import { SectionHeading } from '@/components/ui/section-heading/SectionHeading';
import { Button } from '@/components/ui/button/Button';
import { homeContent } from '@/data/home';
import { getLatestRelease } from '@/lib/github/releases';
import { formatBytes, formatDate } from '@/lib/content/mdx';
import { platformRules } from '@/data/platforms';
import styles from './DownloadPanel.module.css';

export async function DownloadPanel() {
  const release = await getLatestRelease();
  const { download } = homeContent;

  const assetsByPlatform = platformRules.map((rule) => {
    const matched = release.assets.filter((asset) =>
      rule.patterns.some((pattern) => pattern.test(asset.name)),
    );
    return { rule, matched };
  });

  const hasAssets = release.assets.length > 0;

  return (
    <Section tone="white" spacing="large" id="download">
      <Container>
        <SectionHeading
          eyebrow={download.eyebrow}
          title={download.title}
          description={download.subtitle}
        />

        <div className={styles.panel}>
          <div className={styles.release}>
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
              <GithubLogoIcon aria-hidden /> 查看 GitHub Releases
            </a>
          </div>

          {hasAssets ? (
            <ul className={styles.assets}>
              {assetsByPlatform.map(({ rule, matched }) => (
                <li key={rule.id} className={styles.assetRow}>
                  <div className={styles.assetInfo}>
                    <p className={styles.assetPlatform}>{rule.label}</p>
                    <p className={styles.assetNotes}>{rule.notes}</p>
                  </div>
                  {matched.length > 0 ? (
                    <ul className={styles.assetFiles}>
                      {matched.map((asset) => (
                        <li key={asset.id}>
                          <a
                            className={styles.assetLink}
                            href={asset.browser_download_url}
                            rel="noreferrer"
                          >
                            {asset.name}
                            <span className={styles.assetSize}>
                              {formatBytes(asset.size)}
                            </span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className={styles.assetEmpty}>尚未提供官方构建</p>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <div className={styles.fallback}>
              <p className={styles.fallbackTitle}>当前 Release 暂无下载资产。</p>
              <p className={styles.fallbackBody}>
                可前往 GitHub Releases 查看仓库构建，或通过源码自行运行。
              </p>
              <Button
                asChild
                variant="secondary"
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
            </div>
          )}

          <div className={styles.systemReq}>
            <h3 className={styles.systemReqTitle}>系统要求与说明</h3>
            <ul className={styles.systemReqList}>
              <li>Windows 10 / 11 64-bit</li>
              <li>8 GB 或以上内存</li>
              <li>QGIS（可选）、Python 3.10+（可选）</li>
              <li>macOS 与 Linux 暂未提供官方构建</li>
            </ul>
            <Link className={styles.systemLink} href="/download">
              查看完整下载说明与 FAQ
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}
