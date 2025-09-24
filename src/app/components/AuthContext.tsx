'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useRouter, usePathname } from 'next/navigation'


interface User {
  id: number
  name: string
  email: string
  role: string
  avatar: string
  loginTime: string
}


interface AuthContextType {
  user: User | null
  login: (user: User) => void
  logout: () => void
  isLoading: boolean
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const protectedRoutes = ['/', '/users', '/analytics', '/settings']
const publicRoutes = ['/login']

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [hasCheckedAuth, setHasCheckedAuth] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const checkAuth = () => {
      console.log('🔍 Checking authentication...')
      
      try {
        const savedUser = localStorage.getItem('dashboard-user')
        if (savedUser) {
          const userData = JSON.parse(savedUser)
          console.log('👤 Found saved user:', userData)
          setUser(userData)
        } else {
          console.log('❌ No saved user found')
        }
      } catch (error) {
        console.error('💥 Error loading user session:', error)
        localStorage.removeItem('dashboard-user')
      } finally {
        setIsLoading(false)
        setHasCheckedAuth(true)
      }
    }

    checkAuth()
  }, [])

  useEffect(() => {
    if (!isLoading && hasCheckedAuth) {
      console.log('🛡️ Checking route protection...', { 
        pathname, 
        user: !!user, 
        isLoading, 
        hasCheckedAuth 
      })

      const isProtectedRoute = protectedRoutes.includes(pathname)
      const isPublicRoute = publicRoutes.includes(pathname)
      
      if (isProtectedRoute && !user) {
        console.log('🚫 Protected route without auth - redirecting to login')
        router.push('/login')
      } else if (isPublicRoute && user) {
        console.log('✅ Already authenticated - redirecting to dashboard')
        router.push('/')
      } else {
        console.log('✅ Route access allowed')
      }
    }
  }, [user, pathname, isLoading, hasCheckedAuth, router])

  const login = (userData: User) => {
    console.log('🔑 Logging in user:', userData)
    setUser(userData)
    localStorage.setItem('dashboard-user', JSON.stringify(userData))
   
  }

  const logout = () => {
    console.log('🚪 Logging out user')
    setUser(null)
    localStorage.removeItem('dashboard-user')
    localStorage.removeItem('dashboard-remember')
    router.push('/login')
  }

  const contextValue: AuthContextType = {
    user,
    login,
    logout,
    isLoading,
    isAuthenticated: !!user
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}


export function AuthLoader() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading...</p>
      </div>
    </div>
  )
}