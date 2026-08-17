import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({ baseDirectory: __dirname })

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    rules: {
      // Enforce consistent imports — warn rather than error during active dev
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      // Allow explicit `any` in migration/legacy helper code
      '@typescript-eslint/no-explicit-any': 'warn',
      // next/image fills most cases; allow <img> only where next/image isn't applicable
      '@next/next/no-img-element': 'warn',
    },
  },
  {
    // Sanity Studio config lives outside the Next.js app router — relax some rules
    files: ['sanity/**/*.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
]

export default eslintConfig
