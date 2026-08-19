'use client'

import { useEffect, useRef } from 'react'

// Uses the native <dialog> element for built-in focus trap,
// Escape key handling, and accessibility semantics.

interface ModalProps {
  open: boolean
  onClose: () => void
  title: string
  description?: string
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg'
}

const sizeStyles = {
  sm: 'max-w-sm',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
}

export function Modal({ open, onClose, title, description, children, size = 'md' }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open) {
      if (!dialog.open) dialog.showModal()
    } else {
      if (dialog.open) dialog.close()
    }
  }, [open])

  // Close on native dialog cancel (Escape key)
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    const handler = () => onClose()
    dialog.addEventListener('cancel', handler)
    return () => dialog.removeEventListener('cancel', handler)
  }, [onClose])

  // Close on backdrop click
  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) onClose()
  }

  return (
    <dialog
      ref={dialogRef}
      onClick={handleBackdropClick}
      aria-labelledby="modal-title"
      aria-describedby={description ? 'modal-description' : undefined}
      className={[
        'w-full bg-[#111d15] text-[var(--color-cream)] p-0 m-auto border border-[rgba(250,248,243,0.1)]',
        'backdrop:bg-[rgba(0,0,0,0.6)] backdrop:backdrop-blur-sm',
        'open:flex open:flex-col',
        'focus-visible:outline-none',
        sizeStyles[size],
      ].join(' ')}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-[rgba(250,248,243,0.08)]">
        <div>
          <h2 id="modal-title" className="text-h4 text-[var(--color-cream)]">{title}</h2>
          {description && (
            <p id="modal-description" className="text-body-sm text-[rgba(250,248,243,0.5)] mt-1">
              {description}
            </p>
          )}
        </div>
        <button
          onClick={onClose}
          aria-label="Close dialog"
          className="w-8 h-8 flex items-center justify-center text-[rgba(250,248,243,0.4)] hover:text-[var(--color-cream)] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:rounded-sm"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/>
          </svg>
        </button>
      </div>

      {/* Body */}
      <div className="px-6 py-6 flex-1 overflow-y-auto">{children}</div>
    </dialog>
  )
}
