'use client'

import { useState, useEffect } from 'react'
import { Search, Plus, MoreVertical, Mail, Phone, MapPin, X, Edit, Trash2, Save } from 'lucide-react'

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

// German cities and phone numbers
const germanCities = [
  'Berlin', 'Hamburg', 'Munich', 'Cologne', 'Frankfurt am Main',
  'Stuttgart', 'Düsseldorf', 'Leipzig', 'Dortmund', 'Essen',
  'Bremen', 'Dresden', 'Hanover', 'Nuremberg', 'Duisburg'
]

// Default users data with German locations
const defaultUsers: User[] = [
  {
    id: 1,
    name: 'Hans Müller',
    email: 'hans.mueller@example.de',
    role: 'Admin',
    status: 'active',
    location: 'Berlin, Germany',
    phone: '+49 30 12345678',
    joinDate: '2024-01-15',
    avatar: 'HM'
  },
  {
    id: 2,
    name: 'Anna Schmidt',
    email: 'anna.schmidt@example.de',
    role: 'Manager',
    status: 'active',
    location: 'Munich, Germany',
    phone: '+49 89 87654321',
    joinDate: '2024-02-20',
    avatar: 'AS'
  },
  {
    id: 3,
    name: 'Klaus Weber',
    email: 'klaus.weber@example.de',
    role: 'Developer',
    status: 'inactive',
    location: 'Hamburg, Germany',
    phone: '+49 40 11223344',
    joinDate: '2024-03-10',
    avatar: 'KW'
  },
  {
    id: 4,
    name: 'Petra Hoffmann',
    email: 'petra.hoffmann@example.de',
    role: 'Designer',
    status: 'active',
    location: 'Cologne, Germany',
    phone: '+49 221 55667788',
    joinDate: '2024-04-05',
    avatar: 'PH'
  },
  {
    id: 5,
    name: 'Michael Fischer',
    email: 'michael.fischer@example.de',
    role: 'Developer',
    status: 'active',
    location: 'Frankfurt am Main, Germany',
    phone: '+49 69 99887766',
    joinDate: '2024-05-12',
    avatar: 'MF'
  },
  {
    id: 6,
    name: 'Sarah Wagner',
    email: 'sarah.wagner@example.de',
    role: 'Marketing',
    status: 'active',
    location: 'Stuttgart, Germany',
    phone: '+49 711 44556677',
    joinDate: '2024-06-18',
    avatar: 'SW'
  },
  {
    id: 7,
    name: 'Thomas Becker',
    email: 'thomas.becker@example.de',
    role: 'Sales',
    status: 'active',
    location: 'Düsseldorf, Germany',
    phone: '+49 211 33445566',
    joinDate: '2024-07-22',
    avatar: 'TB'
  },
  {
    id: 8,
    name: 'Julia Richter',
    email: 'julia.richter@example.de',
    role: 'HR',
    status: 'inactive',
    location: 'Leipzig, Germany',
    phone: '+49 341 22334455',
    joinDate: '2024-08-14',
    avatar: 'JR'
  }
]

// Form data interface
interface UserFormData {
  name: string
  email: string
  role: string
  status: 'active' | 'inactive'
  location: string
  phone: string
}

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

// User Modal Component (for both Add and Edit)
function UserModal({ 
  isOpen, 
  onClose, 
  onSubmit,
  user = null,
  mode = 'add'
}: { 
  isOpen: boolean
  onClose: () => void
  onSubmit: (user: UserFormData) => void
  user?: User | null
  mode?: 'add' | 'edit'
}) {
  const [formData, setFormData] = useState<UserFormData>({
    name: '',
    email: '',
    role: 'Developer',
    status: 'active',
    location: 'Berlin, Germany',
    phone: '+49 30 '
  })

  // Load user data when editing
  useEffect(() => {
    if (mode === 'edit' && user) {
      setFormData({
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
        location: user.location,
        phone: user.phone
      })
    } else {
      // Reset form for add mode
      setFormData({
        name: '',
        email: '',
        role: 'Developer',
        status: 'active',
        location: 'Berlin, Germany',
        phone: '+49 30 '
      })
    }
  }, [mode, user, isOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.name && formData.email) {
      onSubmit(formData)
      if (mode === 'add') {
        // Reset form only for add mode
        setFormData({
          name: '',
          email: '',
          role: 'Developer',
          status: 'active',
          location: 'Berlin, Germany',
          phone: '+49 30 '
        })
      }
    }
  }

  const updateField = (field: keyof UserFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            {mode === 'edit' ? 'Edit User' : 'Add New User'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => updateField('name', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., Max Mustermann"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email *
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => updateField('email', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="max.mustermann@example.de"
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role
            </label>
            <select
              value={formData.role}
              onChange={(e) => updateField('role', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Developer">Developer</option>
              <option value="Designer">Designer</option>
              <option value="Manager">Manager</option>
              <option value="Admin">Admin</option>
              <option value="Marketing">Marketing</option>
              <option value="Sales">Sales</option>
              <option value="HR">HR</option>
            </select>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <select
              value={formData.location}
              onChange={(e) => updateField('location', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              {germanCities.map(city => (
                <option key={city} value={`${city}, Germany`}>
                  {city}, Germany
                </option>
              ))}
            </select>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => updateField('phone', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="+49 30 12345678"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => updateField('status', e.target.value as 'active' | 'inactive')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center justify-center gap-2"
            >
              <Save className="h-4 w-4" />
              {mode === 'edit' ? 'Update User' : 'Add User'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// User Row Component
function UserRow({ 
  user, 
  onEdit,
  onDelete 
}: { 
  user: User
  onEdit: (user: User) => void
  onDelete: (id: number) => void 
}) {
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
        <div className="flex items-center gap-2">
          <button 
            onClick={() => onEdit(user)}
            className="text-blue-600 hover:text-blue-900"
            title="Edit user"
          >
            <Edit className="h-4 w-4" />
          </button>
          <button 
            onClick={() => onDelete(user.id)}
            className="text-red-600 hover:text-red-900"
            title="Delete user"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </td>
    </tr>
  )
}

// Main Users Page Component
export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add')
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [nextId, setNextId] = useState(9)

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedUsers = localStorage.getItem('dashboard-users')
    const savedNextId = localStorage.getItem('dashboard-next-id')
    
    if (savedUsers) {
      try {
        const parsedUsers = JSON.parse(savedUsers)
        setUsers(parsedUsers)
      } catch (error) {
        console.error('Error loading users from localStorage:', error)
        setUsers(defaultUsers)
      }
    } else {
      setUsers(defaultUsers)
    }

    if (savedNextId) {
      setNextId(parseInt(savedNextId))
    }
  }, [])

  // Save data to localStorage whenever users change
  useEffect(() => {
    if (users.length > 0) {
      localStorage.setItem('dashboard-users', JSON.stringify(users))
      localStorage.setItem('dashboard-next-id', nextId.toString())
    }
  }, [users, nextId])

  // Filter users based on search term
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.location.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Generate avatar from name
  const generateAvatar = (name: string): string => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  // Add new user
  const handleAddUser = (userData: UserFormData) => {
    const newUser: User = {
      id: nextId,
      ...userData,
      joinDate: new Date().toISOString().split('T')[0],
      avatar: generateAvatar(userData.name)
    }
    
    setUsers(prev => [...prev, newUser])
    setNextId(prev => prev + 1)
    setIsModalOpen(false)
  }

  // Edit existing user
  const handleEditUser = (userData: UserFormData) => {
    if (editingUser) {
      const updatedUser: User = {
        ...editingUser,
        ...userData,
        avatar: generateAvatar(userData.name)
      }
      
      setUsers(prev => prev.map(user => 
        user.id === editingUser.id ? updatedUser : user
      ))
      setIsModalOpen(false)
      setEditingUser(null)
    }
  }

  // Open edit modal
  const openEditModal = (user: User) => {
    setEditingUser(user)
    setModalMode('edit')
    setIsModalOpen(true)
  }

  // Open add modal
  const openAddModal = () => {
    setEditingUser(null)
    setModalMode('add')
    setIsModalOpen(true)
  }

  // Delete user
  const handleDeleteUser = (id: number) => {
    if (confirm('Are you sure you want to delete this user?')) {
      setUsers(prev => prev.filter(user => user.id !== id))
    }
  }

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false)
    setEditingUser(null)
  }

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
            <button 
              onClick={openAddModal}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
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
                  <UserRow 
                    key={user.id} 
                    user={user} 
                    onEdit={openEditModal}
                    onDelete={handleDeleteUser}
                  />
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
            <div className="text-2xl font-bold text-gray-900">{users.length}</div>
            <div className="text-sm text-gray-600">Total Users</div>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="text-2xl font-bold text-green-600">
              {users.filter(u => u.status === 'active').length}
            </div>
            <div className="text-sm text-gray-600">Active Users</div>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="text-2xl font-bold text-red-600">
              {users.filter(u => u.status === 'inactive').length}
            </div>
            <div className="text-sm text-gray-600">Inactive Users</div>
          </div>
        </div>
      </main>

      {/* User Modal (Add/Edit) */}
      <UserModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={modalMode === 'edit' ? handleEditUser : handleAddUser}
        user={editingUser}
        mode={modalMode}
      />
    </div>
  )
}