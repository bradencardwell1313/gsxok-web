import { type ComponentPropsWithoutRef } from 'react'

// Max-width container with consistent horizontal padding.
// 1280px max, 24px padding on mobile, 48px on md+, 80px on xl+.

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
      className={`w-full px-6 md:px-12 xl:px-20 ${
        narrow ? 'max-w-[800px]' : 'max-w-[1280px]'
      } ${className}`}
      {...props}
    >
      {children}
    </Tag>
  )
}
