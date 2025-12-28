import { ReactNode, HTMLAttributes } from 'react';

interface TypographyProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  className?: string;
}

export function Heading1({ children, className = '', ...props }: TypographyProps) {
  return (
    <h1
      className={`text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight ${className}`}
      style={{
        fontWeight: 'var(--font-weight-bold)',
        lineHeight: 'var(--line-height-tight)',
      }}
      {...props}
    >
      {children}
    </h1>
  );
}

export function Heading2({ children, className = '', ...props }: TypographyProps) {
  return (
    <h2
      className={`text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight ${className}`}
      style={{
        fontWeight: 'var(--font-weight-bold)',
        lineHeight: 'var(--line-height-tight)',
      }}
      {...props}
    >
      {children}
    </h2>
  );
}

export function Heading3({ children, className = '', ...props }: TypographyProps) {
  return (
    <h3
      className={`text-2xl md:text-3xl font-bold tracking-tight ${className}`}
      style={{
        fontWeight: 'var(--font-weight-bold)',
        lineHeight: 'var(--line-height-snug)',
      }}
      {...props}
    >
      {children}
    </h3>
  );
}

export function Heading4({ children, className = '', ...props }: TypographyProps) {
  return (
    <h4
      className={`text-xl md:text-2xl font-semibold ${className}`}
      style={{
        fontWeight: 'var(--font-weight-semibold)',
        lineHeight: 'var(--line-height-snug)',
      }}
      {...props}
    >
      {children}
    </h4>
  );
}

export function Heading5({ children, className = '', ...props }: TypographyProps) {
  return (
    <h5
      className={`text-lg md:text-xl font-semibold ${className}`}
      style={{
        fontWeight: 'var(--font-weight-semibold)',
        lineHeight: 'var(--line-height-snug)',
      }}
      {...props}
    >
      {children}
    </h5>
  );
}

export function Heading6({ children, className = '', ...props }: TypographyProps) {
  return (
    <h6
      className={`text-base md:text-lg font-semibold ${className}`}
      style={{
        fontWeight: 'var(--font-weight-semibold)',
        lineHeight: 'var(--line-height-normal)',
      }}
      {...props}
    >
      {children}
    </h6>
  );
}

export function Text({ children, className = '', ...props }: TypographyProps) {
  return (
    <p
      className={`text-base ${className}`}
      style={{
        color: 'var(--color-text-primary)',
        lineHeight: 'var(--line-height-normal)',
      }}
      {...props}
    >
      {children}
    </p>
  );
}

export function TextSecondary({ children, className = '', ...props }: TypographyProps) {
  return (
    <p
      className={`text-base ${className}`}
      style={{
        color: 'var(--color-text-secondary)',
        lineHeight: 'var(--line-height-normal)',
      }}
      {...props}
    >
      {children}
    </p>
  );
}

export function TextSmall({ children, className = '', ...props }: TypographyProps) {
  return (
    <p
      className={`text-sm ${className}`}
      style={{
        color: 'var(--color-text-secondary)',
        lineHeight: 'var(--line-height-normal)',
      }}
      {...props}
    >
      {children}
    </p>
  );
}

export function Lead({ children, className = '', ...props }: TypographyProps) {
  return (
    <p
      className={`text-lg md:text-xl ${className}`}
      style={{
        color: 'var(--color-text-primary)',
        lineHeight: 'var(--line-height-relaxed)',
      }}
      {...props}
    >
      {children}
    </p>
  );
}
