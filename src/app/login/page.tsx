'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Lock, Mail, User, AlertCircle } from 'lucide-react'

// Demo users for authentication
const demoUsers = [
  {
    id: 1,
    email: 'admin@example.de',
    password: 'admin123',
    name: 'Hans Müller',
    role: 'Admin',
    avatar: 'HM'
  },
  {
    id: 2,
    email: 'user@example.de',
    password: 'user123',
    name: 'Anna Schmidt',
    role: 'Manager',
    avatar: 'AS'
  },
  {
    id: 3,
    email: 'demo@example.de',
    password: 'demo123',
    name: 'Klaus Weber',
    role: 'Developer',
    avatar: 'KW'
  }
]

interface LoginFormData {
  email: string
  password: string
  rememberMe: boolean
}

interface RegisterFormData {
  name: string
  email: string
  password: string
  confirmPassword: string
}

// Login Form Component
function LoginForm({ onLogin }: { onLogin: (email: string, password: string, rememberMe: boolean) => void }) {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
    rememberMe: false
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate loading delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    onLogin(formData.email, formData.password, formData.rememberMe)
    setIsLoading(false)
  }

  const updateField = (field: keyof LoginFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Email Address
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => updateField('email', e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your email"
          />
        </div>
      </div>

      {/* Password */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type={showPassword ? 'text' : 'password'}
            required
            value={formData.password}
            onChange={(e) => updateField('password', e.target.value)}
            className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Remember Me */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="rememberMe"
            checked={formData.rememberMe}
            onChange={(e) => updateField('rememberMe', e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-700">
            Remember me
          </label>
        </div>
        <button type="button" className="text-sm text-blue-600 hover:text-blue-800">
          Forgot password?
        </button>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-3 px-4 rounded-lg transition-colors"
      >
        {isLoading ? 'Signing in...' : 'Sign In'}
      </button>
    </form>
  )
}

// Register Form Component
function RegisterForm({ onRegister }: { onRegister: (data: RegisterFormData) => void }) {
  const [formData, setFormData] = useState<RegisterFormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<string[]>([])

  const validateForm = (): boolean => {
    const newErrors: string[] = []

    if (formData.name.length < 2) {
      newErrors.push('Name must be at least 2 characters')
    }

    if (!formData.email.includes('@')) {
      newErrors.push('Please enter a valid email')
    }

    if (formData.password.length < 6) {
      newErrors.push('Password must be at least 6 characters')
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.push('Passwords do not match')
    }

    setErrors(newErrors)
    return newErrors.length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onRegister(formData)
    }
  }

  const updateField = (field: keyof RegisterFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Errors */}
      {errors.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex">
            <AlertCircle className="h-5 w-5 text-red-400" />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                Please fix the following errors:
              </h3>
              <ul className="mt-2 text-sm text-red-700 list-disc list-inside">
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Full Name
        </label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => updateField('name', e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your full name"
          />
        </div>
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Email Address
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => updateField('email', e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your email"
          />
        </div>
      </div>

      {/* Password */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type={showPassword ? 'text' : 'password'}
            required
            value={formData.password}
            onChange={(e) => updateField('password', e.target.value)}
            className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Create a password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Confirm Password */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Confirm Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type={showPassword ? 'text' : 'password'}
            required
            value={formData.confirmPassword}
            onChange={(e) => updateField('confirmPassword', e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Confirm your password"
          />
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
      >
        Create Account
      </button>
    </form>
  )
}

// Main Login Page Component
export default function LoginPage() {
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async (email: string, password: string, rememberMe: boolean) => {
    console.log('🔑 Login attempt started:', { email })
    setError('') // Clear any previous errors
    
    try {
      // Find user in demo data
      const user = demoUsers.find(u => u.email === email && u.password === password)
      
      console.log('👤 Found user:', user)
      
      if (user) {
        // Create user session
        const userSession = {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          avatar: user.avatar,
          loginTime: new Date().toISOString()
        }
        
        console.log('💾 Creating session:', userSession)
        
        // Store in localStorage first
        localStorage.setItem('dashboard-user', JSON.stringify(userSession))
        if (rememberMe) {
          localStorage.setItem('dashboard-remember', 'true')
        }
        
        console.log('✅ Session saved, forcing redirect to dashboard')
        
        // Force redirect immediately
        window.location.href = '/'
        
      } else {
        console.log('❌ Login failed - invalid credentials')
        setError('Invalid email or password')
      }
    } catch (error) {
      console.error('💥 Login error:', error)
      setError('Login failed. Please try again.')
    }
  }

  const handleRegister = (data: RegisterFormData) => {
    // Create new user with "User" role (not admin/manager/developer)
    const newUser = {
      id: Date.now(),
      name: data.name,
      email: data.email,
      role: 'User', // Default role for new registrations
      avatar: data.name.split(' ').map(n => n[0]).join('').toUpperCase(),
      loginTime: new Date().toISOString()
    }

    console.log('📝 Creating new user account:', newUser)

    // Save to localStorage so they can login
    const existingUsers = localStorage.getItem('dashboard-registered-users')
    let registeredUsers = []
    
    if (existingUsers) {
      try {
        registeredUsers = JSON.parse(existingUsers)
      } catch (error) {
        console.error('Error parsing registered users:', error)
      }
    }

    // Add password to user data for future logins
    const userWithPassword = {
      ...newUser,
      password: data.password
    }

    registeredUsers.push(userWithPassword)
    localStorage.setItem('dashboard-registered-users', JSON.stringify(registeredUsers))

    console.log('✅ User registered successfully, auto-logging in...')

    // Auto-login the new user
    const userSession = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      avatar: newUser.avatar,
      loginTime: newUser.loginTime
    }

    localStorage.setItem('dashboard-user', JSON.stringify(userSession))
    
    // Force redirect to dashboard
    window.location.href = '/'
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            {mode === 'login' ? 'Sign in to your account' : 'Create your account'}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {mode === 'login' ? (
              <>
                Or{' '}
                <button
                  onClick={() => setMode('register')}
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  create a new account
                </button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button
                  onClick={() => setMode('login')}
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Sign in
                </button>
              </>
            )}
          </p>
        </div>

        {/* Demo Credentials */}
        {mode === 'login' && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="text-sm font-medium text-blue-800 mb-2">Demo Credentials:</h3>
            <div className="text-xs text-blue-700 space-y-1">
              <div><strong>Admin:</strong> admin@example.de / admin123</div>
              <div><strong>Manager:</strong> user@example.de / user123</div>
              <div><strong>Developer:</strong> demo@example.de / demo123</div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex">
              <AlertCircle className="h-5 w-5 text-red-400" />
              <div className="ml-3">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Form */}
        <div className="bg-white py-8 px-6 shadow-lg rounded-lg">
          {mode === 'login' ? (
            <LoginForm onLogin={handleLogin} />
          ) : (
            <RegisterForm onRegister={handleRegister} />
          )}
        </div>
      </div>
    </div>
  )
}