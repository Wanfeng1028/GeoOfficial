'use client';

import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { CaretDownIcon } from '@phosphor-icons/react';
import { NavigationIcon, type NavigationIconName } from '@/components/icons/navigation/NavigationIcon';
import { useLocale } from '@/i18n/LocaleProvider';
import type { NavMegaMenu, NavItem } from '@/data/navigation';
import styles from './MegaMenu.module.css';

// 向后兼容：让旧导入 `MegaMenuData` 仍可工作
export type MegaMenuData = NavMegaMenu;
export type MegaMenuGroup = NavMegaMenu['groups'][number];

interface MegaMenuProps {
  item: NavMegaMenu;
}

interface IndexedItem {
  item: NavItem;
  index: number;
}

function pickLocaleText(zh: string, en: string | undefined, locale: 'zh' | 'en'): string {
  if (locale === 'en') return en ?? zh;
  return zh;
}

export function MegaMenu({ item }: MegaMenuProps) {
  const { locale } = useLocale();
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 预计算扁平化项列表（含全局索引）
  const allItems: IndexedItem[] = useMemo(() => {
    let i = -1;
    const list: IndexedItem[] = [];
    for (const group of item.groups) {
      for (const it of group.items) {
        i += 1;
        list.push({ item: it, index: i });
      }
    }
    return list;
  }, [item.groups]);

  const totalCount = allItems.length;

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

  const focusItem = useCallback(
    (index: number) => {
      const clamped = (index + totalCount) % totalCount;
      itemRefs.current[clamped]?.focus();
    },
    [totalCount],
  );

  // 全局键盘：Escape 关闭并回到 trigger
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open]);

  // 内容区键盘导航：↑↓ 移动
  const onContentKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const currentIndex = itemRefs.current.findIndex((el) => el === document.activeElement);
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      focusItem(currentIndex < 0 ? 0 : currentIndex + 1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      focusItem(currentIndex < 0 ? totalCount - 1 : currentIndex - 1);
    } else if (e.key === 'Tab' && currentIndex === totalCount - 1 && !e.shiftKey) {
      setOpen(false);
    }
  };

  // trigger 键盘：Enter/Space/ArrowDown 打开
  const onTriggerKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setOpen(true);
      requestAnimationFrame(() => focusItem(0));
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // 预构建按 group 索引的结构（纯函数式，无 mutable 计数器）
  const groupsWithIndex = useMemo(() => {
    return item.groups.map((group, gi) => {
      // 通过累加前面所有 group 的 items 数量计算当前 group 的起始索引
      const startIndex = item.groups
        .slice(0, gi)
        .reduce((sum, g) => sum + g.items.length, 0);
      return {
        ...group,
        items: group.items.map((it, ii) => ({ item: it, index: startIndex + ii })),
      };
    });
  }, [item.groups]);

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
        onKeyDown={onTriggerKeyDown}
        type="button"
      >
        {pickLocaleText(item.label, item.label, locale)}
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
          onKeyDown={onContentKeyDown}
          onMouseEnter={handleOpen}
          onMouseLeave={handleClose}
        >
          <div className={styles.grid}>
            {groupsWithIndex.map((group) => (
              <div key={group.label} className={styles.group}>
                <div className={styles.groupLabel}>
                  {pickLocaleText(group.label, group.enLabel, locale)}
                </div>
                <ul className={styles.items}>
                  {group.items.map(({ item: menuItem, index }) => {
                    const title = pickLocaleText(menuItem.label, menuItem.enLabel, locale);
                    const desc =
                      locale === 'en'
                        ? (menuItem.enDescription ?? menuItem.description)
                        : menuItem.description;
                    return (
                      <li key={menuItem.label} role="none" className={styles.itemLi}>
                        <Link
                          ref={(el) => {
                            itemRefs.current[index] = el;
                          }}
                          href={menuItem.href}
                          target={menuItem.external ? '_blank' : undefined}
                          rel={menuItem.external ? 'noreferrer' : undefined}
                          className={styles.item}
                          role="menuitem"
                          onClick={() => setOpen(false)}
                        >
                          {menuItem.iconKey ? (
                            <span className={styles.iconWrap} aria-hidden>
                              <NavigationIcon
                                name={menuItem.iconKey as NavigationIconName}
                                decorative
                                className={styles.icon}
                              />
                            </span>
                          ) : null}
                          <span className={styles.itemText}>
                            <span className={styles.itemTitle}>{title}</span>
                            {desc ? <span className={styles.itemDesc}>{desc}</span> : null}
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
