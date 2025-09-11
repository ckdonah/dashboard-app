'use client'

import { useAuth, AuthLoader } from './AuthContext'
import { Sidebar } from './Sidebar'
import { usePathname } from 'next/navigation'

export function LayoutContent({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth()
  const pathname = usePathname()

  // Show loading spinner while checking authentication
  if (isLoading) {
    return <AuthLoader />
  }

  // If on login page or not authenticated, show full-width layout
  if (pathname === '/login' || !isAuthenticated) {
    return <>{children}</>
  }

  // If authenticated, show dashboard layout with sidebar
  return (
    <div>
      <Sidebar />
      <div className="lg:pl-72">
        {children}
      </div>
    </div>
  )
}