import Link from 'next/link'
import { type ComponentPropsWithoutRef } from 'react'

type Variant = 'primary' | 'secondary' | 'text'
type Size = 'sm' | 'md' | 'lg'

interface ButtonBaseProps {
  variant?: Variant
  size?: Size
}

type ButtonAsButton = ButtonBaseProps &
  ComponentPropsWithoutRef<'button'> & { href?: undefined }

type ButtonAsLink = ButtonBaseProps &
  ComponentPropsWithoutRef<typeof Link> & { href: string }

type ButtonProps = ButtonAsButton | ButtonAsLink

const variantStyles: Record<Variant, string> = {
  primary: [
    'bg-[var(--color-green)] text-[var(--color-cream)]',
    'border border-[var(--color-green)]',
    'hover:bg-[#155f3a] hover:border-[#155f3a]',
    'active:bg-[#104830]',
    'disabled:opacity-40 disabled:pointer-events-none',
  ].join(' '),

  secondary: [
    'bg-transparent text-[var(--color-cream)]',
    'border border-[var(--color-cream)]',
    'hover:bg-[rgba(250,248,243,0.08)]',
    'active:bg-[rgba(250,248,243,0.14)]',
    'disabled:opacity-40 disabled:pointer-events-none',
  ].join(' '),

  text: [
    'bg-transparent text-[var(--color-accent)]',
    'border border-transparent',
    'hover:text-[var(--color-cream)] underline-offset-4 hover:underline',
    'disabled:opacity-40 disabled:pointer-events-none',
    'px-0',
  ].join(' '),
}

const sizeStyles: Record<Size, string> = {
  sm: 'text-button px-4 py-2 gap-1.5',
  md: 'text-button px-6 py-3 gap-2',
  lg: 'text-button px-8 py-4 gap-2.5',
}

const base =
  'inline-flex items-center justify-center font-[family-name:var(--font-space-grotesk)] text-button tracking-[0.1em] uppercase transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--color-dark)]'

export function Button({ variant = 'primary', size = 'md', className = '', ...props }: ButtonProps) {
  const styles = `${base} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`

  if ('href' in props && props.href !== undefined) {
    const { href, ...rest } = props as ButtonAsLink
    return (
      <Link href={href} className={styles} {...rest} />
    )
  }

  return <button className={styles} {...(props as ButtonAsButton)} />
}
