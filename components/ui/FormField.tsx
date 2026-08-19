'use client'

import { type ComponentPropsWithoutRef, useId } from 'react'

// ── Shared styles ─────────────────────────────────────────────────────────────

const inputBase = [
  'w-full bg-[rgba(250,248,243,0.06)] text-[var(--color-cream)]',
  'border border-[rgba(250,248,243,0.2)]',
  'placeholder:text-[rgba(250,248,243,0.35)]',
  'focus:outline-none focus:border-[var(--color-accent)]',
  'disabled:opacity-40 disabled:cursor-not-allowed',
  'transition-colors duration-150',
  'text-body px-4',
  'font-[family-name:var(--font-manrope)]',
].join(' ')

const errorBorder = 'border-red-400 focus:border-red-400'
const normalBorder = 'border-[rgba(250,248,243,0.2)] focus:border-[var(--color-accent)]'

// ── FormField wrapper ─────────────────────────────────────────────────────────

interface FormFieldProps {
  label: string
  error?: string
  hint?: string
  required?: boolean
  children: (id: string, hasError: boolean) => React.ReactNode
}

export function FormField({ label, error, hint, required, children }: FormFieldProps) {
  const id = useId()
  const hasError = Boolean(error)

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-label text-[rgba(250,248,243,0.7)]">
        {label}
        {required && <span className="text-[var(--color-accent)] ml-1">*</span>}
      </label>
      {children(id, hasError)}
      {hint && !error && (
        <p className="text-caption text-[rgba(250,248,243,0.45)]">{hint}</p>
      )}
      {error && (
        <p className="text-caption text-red-400">{error}</p>
      )}
    </div>
  )
}

// ── Input ─────────────────────────────────────────────────────────────────────

interface InputProps extends ComponentPropsWithoutRef<'input'> {
  hasError?: boolean
}

export function Input({ hasError, className = '', ...props }: InputProps) {
  return (
    <input
      className={`${inputBase} h-12 ${hasError ? errorBorder : normalBorder} ${className}`}
      {...props}
    />
  )
}

// ── Select ────────────────────────────────────────────────────────────────────

interface SelectProps extends ComponentPropsWithoutRef<'select'> {
  hasError?: boolean
}

export function Select({ hasError, className = '', children, ...props }: SelectProps) {
  return (
    <div className="relative">
      <select
        className={`${inputBase} h-12 pr-10 appearance-none cursor-pointer ${hasError ? errorBorder : normalBorder} ${className}`}
        {...props}
      >
        {children}
      </select>
      {/* Chevron icon */}
      <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[rgba(250,248,243,0.5)]">
        <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
          <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/>
        </svg>
      </span>
    </div>
  )
}

// ── Textarea ──────────────────────────────────────────────────────────────────

interface TextareaProps extends ComponentPropsWithoutRef<'textarea'> {
  hasError?: boolean
}

export function Textarea({ hasError, className = '', ...props }: TextareaProps) {
  return (
    <textarea
      rows={4}
      className={`${inputBase} py-3 resize-y min-h-[100px] ${hasError ? errorBorder : normalBorder} ${className}`}
      {...props}
    />
  )
}
