'use client';

import * as DialogPrimitive from '@radix-ui/react-dialog';
import { forwardRef, useEffect, useRef, useState } from 'react';
import type * as React from 'react';
import { cn } from '@/lib/cn';
import styles from './Dialog.module.css';

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogPortal = DialogPrimitive.Portal;
export const DialogClose = DialogPrimitive.Close;

export const DialogOverlay = forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(styles.overlay, className)}
    {...props}
  />
));
DialogOverlay.displayName = 'DialogOverlay';

export const DialogContent = forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const savedPaddingRef = useRef('');

  // 弹窗打开时去掉 Radix 自动加的 padding-right（与 scrollbar-gutter 双重补偿导致右侧空白）
  useEffect(() => {
    if (!isOpen) return;
    savedPaddingRef.current = document.body.style.paddingRight;
    document.body.style.paddingRight = '0';
    return () => {
      document.body.style.paddingRight = savedPaddingRef.current;
    };
  }, [isOpen]);

  return (
    <DialogPrimitive.Portal>
      <DialogOverlay />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(styles.content, className)}
        onOpenAutoFocus={() => setIsOpen(true)}
        onCloseAutoFocus={() => setIsOpen(false)}
        {...props}
      >
        {children}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
});
DialogContent.displayName = 'DialogContent';

export const DialogTitle = forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title ref={ref} className={cn(styles.title, className)} {...props} />
));
DialogTitle.displayName = 'DialogTitle';

export const DialogDescription = forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn(styles.description, className)}
    {...props}
  />
));
DialogDescription.displayName = 'DialogDescription';
