'use client'

import { useState } from 'react'
import { Search, Plus, MoreVertical, Mail, Phone, MapPin } from 'lucide-react'

// Define what a User looks like (TypeScript Interface)
interface User {
  id: number
  name: string
  email: string
  role: string
  status: 'active' | 'inactive'
  location: string
  phone: string
  joinDate: string
  avatar: string
}

// Mock user data (in real app, this comes from API)
const mockUsers: User[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Admin',
    status: 'active',
    location: 'New York, NY',
    phone: '+1 (555) 123-4567',
    joinDate: '2024-01-15',
    avatar: 'JD'
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'Manager',
    status: 'active',
    location: 'Los Angeles, CA',
    phone: '+1 (555) 987-6543',
    joinDate: '2024-02-20',
    avatar: 'JS'
  },
  {
    id: 3,
    name: 'Mike Johnson',
    email: 'mike@example.com',
    role: 'Developer',
    status: 'inactive',
    location: 'Chicago, IL',
    phone: '+1 (555) 456-7890',
    joinDate: '2024-03-10',
    avatar: 'MJ'
  },
  {
    id: 4,
    name: 'Sarah Wilson',
    email: 'sarah@example.com',
    role: 'Designer',
    status: 'active',
    location: 'Seattle, WA',
    phone: '+1 (555) 321-0987',
    joinDate: '2024-04-05',
    avatar: 'SW'
  },
  {
    id: 5,
    name: 'David Brown',
    email: 'david@example.com',
    role: 'Developer',
    status: 'active',
    location: 'Austin, TX',
    phone: '+1 (555) 654-3210',
    joinDate: '2024-05-12',
    avatar: 'DB'
  }
]

// Status Badge Component
function StatusBadge({ status }: { status: 'active' | 'inactive' }) {
  return (
    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
      status === 'active' 
        ? 'bg-green-100 text-green-800' 
        : 'bg-red-100 text-red-800'
    }`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  )
}

// User Row Component
function UserRow({ user }: { user: User }) {
  return (
    <tr className="hover:bg-gray-50">
      {/* Avatar and Name */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center">
            <span className="text-sm font-medium text-white">{user.avatar}</span>
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{user.name}</div>
            <div className="text-sm text-gray-500 flex items-center">
              <Mail className="h-3 w-3 mr-1" />
              {user.email}
            </div>
          </div>
        </div>
      </td>

      {/* Role */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{user.role}</div>
      </td>

      {/* Status */}
      <td className="px-6 py-4 whitespace-nowrap">
        <StatusBadge status={user.status} />
      </td>

      {/* Location */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900 flex items-center">
          <MapPin className="h-3 w-3 mr-1 text-gray-400" />
          {user.location}
        </div>
      </td>

      {/* Phone */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900 flex items-center">
          <Phone className="h-3 w-3 mr-1 text-gray-400" />
          {user.phone}
        </div>
      </td>

      {/* Join Date */}
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {new Date(user.joinDate).toLocaleDateString()}
      </td>

      {/* Actions */}
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <button className="text-gray-400 hover:text-gray-600">
          <MoreVertical className="h-4 w-4" />
        </button>
      </td>
    </tr>
  )
}

// Main Users Page Component
export default function UsersPage() {
  // State for search functionality
  const [searchTerm, setSearchTerm] = useState('')
  
  // Filter users based on search term
  const filteredUsers = mockUsers.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Users</h1>
              <p className="text-gray-600">Manage your team members and their permissions</p>
            </div>
            
            {/* Add User Button */}
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add User
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search users..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full sm:w-96 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white shadow-sm rounded-lg border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              {/* Table Header */}
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Joined
                  </th>
                  <th className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              
              {/* Table Body */}
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <UserRow key={user.id} user={user} />
                ))}
              </tbody>
            </table>
          </div>

          {/* No Results */}
          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No users found matching your search.</p>
            </div>
          )}
        </div>

        {/* Stats Summary */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg border">
            <div className="text-2xl font-bold text-gray-900">{mockUsers.length}</div>
            <div className="text-sm text-gray-600">Total Users</div>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="text-2xl font-bold text-green-600">
              {mockUsers.filter(u => u.status === 'active').length}
            </div>
            <div className="text-sm text-gray-600">Active Users</div>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="text-2xl font-bold text-red-600">
              {mockUsers.filter(u => u.status === 'inactive').length}
            </div>
            <div className="text-sm text-gray-600">Inactive Users</div>
          </div>
        </div>
      </main>
    </div>
  )
}