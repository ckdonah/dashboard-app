'use client'

import { useState } from 'react'

export default function TestPage() {
  const [user, setUser] = useState<any>(null)

  const handleSimpleLogin = () => {
    const testUser = {
      id: 1,
      name: 'Test User',
      email: 'test@example.de',
      role: 'Admin',
      avatar: 'TU'
    }
    
    localStorage.setItem('dashboard-user', JSON.stringify(testUser))
    setUser(testUser)
    console.log('✅ Simple login successful:', testUser)
  }

  const checkStorage = () => {
    const stored = localStorage.getItem('dashboard-user')
    console.log('📦 Stored user:', stored)
    if (stored) {
      setUser(JSON.parse(stored))
    }
  }

  const clearStorage = () => {
    localStorage.removeItem('dashboard-user')
    setUser(null)
    console.log('🗑️ Storage cleared')
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-md mx-auto bg-white rounded-lg p-6 shadow-lg">
        <h1 className="text-2xl font-bold mb-6">🧪 Test Page</h1>
        
        <div className="space-y-4">
          <button
            onClick={handleSimpleLogin}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
          >
            🔑 Simple Login Test
          </button>
          
          <button
            onClick={checkStorage}
            className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
          >
            📦 Check Storage
          </button>
          
          <button
            onClick={clearStorage}
            className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700"
          >
            🗑️ Clear Storage
          </button>
        </div>

        {user && (
          <div className="mt-6 p-4 bg-green-50 rounded-lg">
            <h3 className="font-semibold text-green-800">✅ User Logged In:</h3>
            <p className="text-green-700">Name: {user.name}</p>
            <p className="text-green-700">Email: {user.email}</p>
            <p className="text-green-700">Role: {user.role}</p>
          </div>
        )}

        <div className="mt-6 text-sm text-gray-600">
          <p><strong>Navigate to test:</strong></p>
          <ul className="list-disc list-inside space-y-1">
            <li><a href="/dashboard" className="text-blue-600 hover:underline">/dashboard</a></li>
            <li><a href="/users" className="text-blue-600 hover:underline">/users</a></li>
            <li><a href="/login" className="text-blue-600 hover:underline">/login</a></li>
            <li><a href="/" className="text-blue-600 hover:underline">/ (root)</a></li>
          </ul>
        </div>
      </div>
    </div>
  )
}