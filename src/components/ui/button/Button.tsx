import { Slot } from '@radix-ui/react-slot';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/cn';
import styles from './Button.module.css';

type Variant = 'primary' | 'secondary' | 'quiet' | 'text';
type Size = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: Variant;
  size?: Size;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
}

export function Button({
  asChild = false,
  variant = 'secondary',
  size = 'md',
  className,
  leadingIcon,
  trailingIcon,
  children,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      className={cn(styles.button, styles[variant], styles[size], className)}
      {...props}
    >
      {asChild ? (
        children
      ) : (
        <>
          {leadingIcon ? <span aria-hidden>{leadingIcon}</span> : null}
          {children != null ? <span>{children}</span> : null}
          {trailingIcon ? <span aria-hidden>{trailingIcon}</span> : null}
        </>
      )}
    </Comp>
  );
}
