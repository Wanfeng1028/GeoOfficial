'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { CaretDownIcon } from '@phosphor-icons/react';
import styles from './MegaMenu.module.css';

export interface MegaMenuGroup {
  label: string;
  items: { label: string; href: string; external?: boolean }[];
}

export interface MegaMenuData {
  label: string;
  groups: MegaMenuGroup[];
}

interface MegaMenuProps {
  item: MegaMenuData;
}

export function MegaMenu({ item }: MegaMenuProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleOpen = useCallback(() => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    timeoutRef.current = setTimeout(() => setOpen(false), 150);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      className={styles.root}
      onMouseEnter={handleOpen}
      onMouseLeave={handleClose}
      onFocusCapture={handleOpen}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
          handleClose();
        }
      }}
    >
      <button
        ref={triggerRef}
        className={`${styles.trigger}${open ? ` ${styles.triggerOpen}` : ''}`}
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen(!open)}
        type="button"
      >
        {item.label}
        <CaretDownIcon
          aria-hidden
          className={`${styles.caret}${open ? ` ${styles.caretOpen}` : ''}`}
        />
      </button>
      {open && (
        <div
          ref={contentRef}
          className={styles.content}
          role="menu"
          onMouseEnter={handleOpen}
          onMouseLeave={handleClose}
        >
          <div className={styles.grid}>
            {item.groups.map((group) => (
              <div key={group.label} className={styles.group}>
                <div className={styles.groupLabel}>{group.label}</div>
                <ul className={styles.items}>
                  {group.items.map((menuItem) => (
                    <li key={menuItem.label} role="none">
                      <Link
                        href={menuItem.href}
                        target={menuItem.external ? '_blank' : undefined}
                        rel={menuItem.external ? 'noreferrer' : undefined}
                        className={styles.item}
                        role="menuitem"
                        onClick={() => setOpen(false)}
                      >
                        {menuItem.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
