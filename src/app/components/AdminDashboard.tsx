'use client'

import { BarChart3, Users, Euro, TrendingUp, Activity, Shield, Settings, Database, AlertTriangle } from 'lucide-react'

// Define TypeScript interfaces
interface StatCardProps {
  title: string
  value: string
  change: string
  icon: React.ReactNode
  changeType: 'positive' | 'negative'
  bgColor?: string
}

// Admin-themed Stat Card Component
function AdminStatCard({ title, value, change, icon, changeType, bgColor = "bg-red-50" }: StatCardProps) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`h-12 w-12 ${bgColor} rounded-lg flex items-center justify-center`}>
          {icon}
        </div>
      </div>
      <div className="mt-4">
        <span className={`text-sm font-medium ${
          changeType === 'positive' ? 'text-green-600' : 'text-red-600'
        }`}>
          {change}
        </span>
        <span className="text-sm text-gray-600 ml-1">from last month</span>
      </div>
    </div>
  )
}

// System Status Component
function SystemStatus() {
  const systemMetrics = [
    { label: 'Server Uptime', value: '99.9%', status: 'healthy' },
    { label: 'Database Performance', value: 'Optimal', status: 'healthy' },
    { label: 'API Response Time', value: '142ms', status: 'healthy' },
    { label: 'Active Sessions', value: '1,247', status: 'warning' },
  ]

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">System Status</h3>
        <div className="flex items-center text-green-600">
          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
          <span className="text-sm font-medium">All Systems Operational</span>
        </div>
      </div>
      <div className="space-y-3">
        {systemMetrics.map((metric, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span className="text-sm font-medium text-gray-700">{metric.label}</span>
            <div className="flex items-center">
              <span className="text-sm text-gray-900 mr-2">{metric.value}</span>
              <div className={`w-2 h-2 rounded-full ${
                metric.status === 'healthy' ? 'bg-green-500' : 
                metric.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
              }`}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Admin Actions Component
function AdminActions() {
  const adminActions = [
    { title: 'User Management', description: 'Manage user accounts and permissions', icon: <Users className="h-5 w-5" />, color: 'text-blue-600' },
    { title: 'System Settings', description: 'Configure system parameters', icon: <Settings className="h-5 w-5" />, color: 'text-gray-600' },
    { title: 'Database Management', description: 'Monitor and maintain database', icon: <Database className="h-5 w-5" />, color: 'text-green-600' },
    { title: 'Security Center', description: 'Review security logs and alerts', icon: <Shield className="h-5 w-5" />, color: 'text-red-600' },
  ]

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {adminActions.map((action, index) => (
          <button
            key={index}
            className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-left"
          >
            <div className="flex items-center mb-2">
              <div className={`${action.color} mr-3`}>
                {action.icon}
              </div>
              <h4 className="font-medium text-gray-900">{action.title}</h4>
            </div>
            <p className="text-sm text-gray-600">{action.description}</p>
          </button>
        ))}
      </div>
    </div>
  )
}

// Recent Admin Activity
function RecentAdminActivity() {
  const activities = [
    { id: 1, action: 'User "Max Weber" created', type: 'user', time: '5 minutes ago', severity: 'info' },
    { id: 2, action: 'Security alert resolved', type: 'security', time: '15 minutes ago', severity: 'success' },
    { id: 3, action: 'Database backup completed', type: 'system', time: '1 hour ago', severity: 'success' },
    { id: 4, action: 'Failed login attempts detected', type: 'security', time: '2 hours ago', severity: 'warning' },
    { id: 5, action: 'System settings updated', type: 'system', time: '3 hours ago', severity: 'info' },
  ]

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'success': return 'text-green-600 bg-green-100'
      case 'warning': return 'text-yellow-600 bg-yellow-100'
      case 'error': return 'text-red-600 bg-red-100'
      default: return 'text-blue-600 bg-blue-100'
    }
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Admin Activity</h3>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3">
            <div className={`h-8 w-8 rounded-full flex items-center justify-center ${getSeverityColor(activity.severity)}`}>
              <Activity className="h-4 w-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">{activity.action}</p>
              <p className="text-xs text-gray-500">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Main Admin Dashboard Component
export default function AdminDashboard() {
  const adminStats = [
    {
      title: 'Total Revenue',
      value: '€184,320',
      change: '+18.2%',
      icon: <Euro className="h-6 w-6 text-red-600" />,
      changeType: 'positive' as const,
      bgColor: 'bg-red-50'
    },
    {
      title: 'Total Users',
      value: '2,543',
      change: '+12.5%',
      icon: <Users className="h-6 w-6 text-orange-600" />,
      changeType: 'positive' as const,
      bgColor: 'bg-orange-50'
    },
    {
      title: 'System Performance',
      value: '99.9%',
      change: '+0.1%',
      icon: <TrendingUp className="h-6 w-6 text-red-600" />,
      changeType: 'positive' as const,
      bgColor: 'bg-red-50'
    },
    {
      title: 'Security Alerts',
      value: '3',
      change: '-15%',
      icon: <AlertTriangle className="h-6 w-6 text-orange-600" />,
      changeType: 'positive' as const,
      bgColor: 'bg-orange-50'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
     
      <div className="bg-gradient-to-r from-red-600 to-orange-600 shadow-sm border-b">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
              <p className="text-red-100">Complete system overview and controls</p>
            </div>
            <div className="flex items-center text-red-100">
              <Shield className="h-5 w-5 mr-2" />
              <span className="text-sm font-medium">Administrator Access</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Admin Alert */}
        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <Shield className="h-5 w-5 text-red-600 mr-3" />
            <div>
              <h3 className="text-sm font-medium text-red-800">Administrator Dashboard</h3>
              <p className="text-sm text-red-700 mt-1">
                You have full system access. All administrative functions are available.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {adminStats.map((stat, index) => (
            <AdminStatCard key={index} {...stat} />
          ))}
        </div>

       
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
         
          <SystemStatus />

          <AdminActions />

          <RecentAdminActivity />
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Euro className="h-5 w-5 text-red-600 mr-2" />
            Financial Overview (Admin Access)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <h4 className="text-sm font-medium text-gray-600">Monthly Revenue</h4>
              <p className="text-2xl font-bold text-red-600">€184,320</p>
              <p className="text-sm text-green-600 mt-1">+18.2% vs last month</p>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <h4 className="text-sm font-medium text-gray-600">Operating Costs</h4>
              <p className="text-2xl font-bold text-orange-600">€89,450</p>
              <p className="text-sm text-red-600 mt-1">+5.1% vs last month</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <h4 className="text-sm font-medium text-gray-600">Net Profit</h4>
              <p className="text-2xl font-bold text-green-600">€94,870</p>
              <p className="text-sm text-green-600 mt-1">+28.7% vs last month</p>
            </div>
          </div>
        </div>

      </main>
    </div>
  )
}