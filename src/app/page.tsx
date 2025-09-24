'use client'

import { useAuth } from './components/AuthContext'
import AdminDashboard from './components/AdminDashboard'
import ManagerDashboard from './components/ManagerDashboard'
import DeveloperDashboard from './components/DeveloperDashboard'

export default function Dashboard() {
  console.log('🏠 Dashboard component rendering...') // Debug log
  
  const { user } = useAuth()

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  console.log('👤 User role detected:', user.role) // Debug log

  // Route to appropriate dashboard based on user role
  switch (user.role) {
    case 'Admin':
      return <AdminDashboard />
    case 'Manager':
      return <ManagerDashboard />
    case 'Developer':
      return <DeveloperDashboard />
    default:
      // Fallback dashboard for unknown roles
      return (
        <div className="min-h-screen bg-gray-50 p-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-yellow-100 border border-yellow-400 rounded-lg p-4 mb-6">
              <h1 className="text-xl font-bold text-yellow-800">⚠️ Unknown Role</h1>
              <p className="text-yellow-700">
                Role "{user.role}" not recognized. Please contact administrator.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow border">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">User Information</h2>
              <div className="space-y-2 text-sm text-gray-600">
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Role:</strong> {user.role}</p>
                <p><strong>User ID:</strong> {user.id}</p>
              </div>
            </div>
          </div>
        </div>
      )
  }
}