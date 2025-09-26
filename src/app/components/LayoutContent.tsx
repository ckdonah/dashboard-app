'use client'

import { useAuth, AuthLoader } from './AuthContext'
import { Sidebar } from './Sidebar'
import { usePathname } from 'next/navigation'

export function LayoutContent({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth()
  const pathname = usePathname()

  if (isLoading) {
    return <AuthLoader />
  }

  if (pathname === '/login' || !isAuthenticated) {
    return <>{children}</>
  }

  return (
    <div>
      <Sidebar />
      <div className="lg:pl-72">
        {children}
      </div>
    </div>
  )
}