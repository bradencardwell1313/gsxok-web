import { type ComponentPropsWithoutRef } from 'react'

// Max-width container with consistent horizontal padding.
// 1280px max, 24px padding on mobile, 64px on md+, 96px on xl+.
// Matches the `G` grid constant in app/page.tsx and Nav.tsx — keep in sync.

interface ContainerProps extends ComponentPropsWithoutRef<'div'> {
  as?: 'div' | 'section' | 'article' | 'main' | 'header' | 'footer'
  narrow?: boolean // 800px max — for text-heavy content like articles
}

export function Container({
  as: Tag = 'div',
  narrow = false,
  className = '',
  children,
  ...props
}: ContainerProps) {
  return (
    <Tag
      className={`w-full px-6 md:px-16 xl:px-24 ${
        narrow ? 'max-w-[800px]' : 'max-w-[1280px]'
      } ${className}`}
      {...props}
    >
      {children}
    </Tag>
  )
}
