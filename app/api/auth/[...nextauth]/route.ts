import { handlers } from '@/lib/auth'

// Export Next.js route handlers for GET and POST.
// This file must live at app/api/auth/[...nextauth]/route.ts
// per the NextAuth v5 App Router convention.
export const { GET, POST } = handlers
