import * as React from 'react';

export function h2({ children }: { children: React.ReactNode }) {
  return <h2 style={{ marginTop: '1.5rem', fontSize: '1.25rem', fontWeight: 600 }}>{children}</h2>;
}

export function p({ children }: { children: React.ReactNode }) {
  return <p style={{ margin: '0.6rem 0', lineHeight: 1.7 }}>{children}</p>;
}

export function a({
  href,
  children,
}: {
  href?: string;
  children: React.ReactNode;
}) {
  return (
    <a href={href} target={href?.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
      {children}
    </a>
  );
}

export function ul({ children }: { children: React.ReactNode }) {
  return <ul style={{ paddingLeft: '1.4rem' }}>{children}</ul>;
}

export function ol({ children }: { children: React.ReactNode }) {
  return <ol style={{ paddingLeft: '1.4rem' }}>{children}</ol>;
}

export function li({ children }: { children: React.ReactNode }) {
  return <li style={{ margin: '0.25rem 0' }}>{children}</li>;
}

export function code({ children }: { children: React.ReactNode }) {
  return (
    <code
      style={{
        background: 'var(--color-surface)',
        padding: '0.1rem 0.35rem',
        borderRadius: 'var(--radius-sm)',
        fontFamily: 'var(--font-mono, monospace)',
        fontSize: '0.9em',
      }}
    >
      {children}
    </code>
  );
}
