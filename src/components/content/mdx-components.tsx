import * as React from 'react';
import styles from './mdx-components.module.css';

export function h2({ children }: { children: React.ReactNode }) {
  return <h2 className={styles.heading2}>{children}</h2>;
}

export function h3({ children }: { children: React.ReactNode }) {
  return <h3 className={styles.heading3}>{children}</h3>;
}

export function p({ children }: { children: React.ReactNode }) {
  return <p className={styles.paragraph}>{children}</p>;
}

export function a({
  href,
  children,
}: {
  href?: string;
  children: React.ReactNode;
}) {
  const isExternal = href?.startsWith('http');
  return (
    <a
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noreferrer' : undefined}
      className={styles.link}
    >
      {children}
    </a>
  );
}

export function ul({ children }: { children: React.ReactNode }) {
  return <ul className={styles.list}>{children}</ul>;
}

export function ol({ children }: { children: React.ReactNode }) {
  return <ol className={styles.listOrdered}>{children}</ol>;
}

export function li({ children }: { children: React.ReactNode }) {
  return <li className={styles.listItem}>{children}</li>;
}

export function code({ children }: { children: React.ReactNode }) {
  return <code className={styles.inlineCode}>{children}</code>;
}
