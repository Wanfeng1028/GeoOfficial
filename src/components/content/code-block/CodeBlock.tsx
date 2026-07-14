import { codeToHtml } from 'shiki';
import { CopyCodeButton } from './CopyCodeButton';
import styles from './CodeBlock.module.css';

interface CodeBlockProps {
  code: string;
  language: string;
  filename?: string;
}

export async function CodeBlock({ code, language, filename }: CodeBlockProps) {
  const html = await codeToHtml(code, {
    lang: language,
    theme: 'github-light',
  });

  return (
    <figure className={styles.root}>
      <figcaption className={styles.header}>
        <span className={styles.filename}>{filename ?? language}</span>
        <CopyCodeButton value={code} />
      </figcaption>

      <div
        className={styles.highlight}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </figure>
  );
}
