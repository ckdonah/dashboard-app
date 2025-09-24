'use client'

import { Code, GitBranch, Bug, TrendingUp, Activity, Terminal, Zap, Clock, CheckCircle2, AlertCircle } from 'lucide-react'

// Define TypeScript interfaces
interface StatCardProps {
  title: string
  value: string
  change: string
  icon: React.ReactNode
  changeType: 'positive' | 'negative'
  bgColor?: string
}

// Developer-themed Stat Card Component
function DeveloperStatCard({ title, value, change, icon, changeType, bgColor = "bg-green-50" }: StatCardProps) {
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
        <span className="text-sm text-gray-600 ml-1">from last week</span>
      </div>
    </div>
  )
}

// Code Activity Component
function CodeActivity() {
  const activities = [
    { 
      project: 'User Authentication System', 
      commits: 12, 
      linesAdded: 847, 
      linesRemoved: 234, 
      status: 'active',
      language: 'TypeScript'
    },
    { 
      project: 'Analytics Dashboard', 
      commits: 8, 
      linesAdded: 592, 
      linesRemoved: 123, 
      status: 'completed',
      language: 'React'
    },
    { 
      project: 'API Optimization', 
      commits: 15, 
      linesAdded: 234, 
      linesRemoved: 456, 
      status: 'review',
      language: 'Node.js'
    },
    { 
      project: 'Database Migration', 
      commits: 6, 
      linesAdded: 178, 
      linesRemoved: 89, 
      status: 'testing',
      language: 'SQL'
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100'
      case 'active': return 'text-blue-600 bg-blue-100'
      case 'review': return 'text-yellow-600 bg-yellow-100'
      case 'testing': return 'text-purple-600 bg-purple-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getLanguageColor = (language: string) => {
    switch (language) {
      case 'TypeScript': return 'bg-blue-500'
      case 'React': return 'bg-cyan-500'
      case 'Node.js': return 'bg-green-500'
      case 'SQL': return 'bg-orange-500'
      default: return 'bg-gray-500'
    }
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Projects</h3>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full mr-3 ${getLanguageColor(activity.language)}`}></div>
                <h4 className="font-medium text-gray-900">{activity.project}</h4>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(activity.status)}`}>
                {activity.status}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
              <div className="flex items-center">
                <GitBranch className="h-3 w-3 mr-1" />
                {activity.commits} commits
              </div>
              <div className="flex items-center text-green-600">
                <span className="text-lg mr-1">+</span>
                {activity.linesAdded}
              </div>
              <div className="flex items-center text-red-600">
                <span className="text-lg mr-1">-</span>
                {activity.linesRemoved}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Bug Tracking Component
function BugTracking() {
  const bugs = [
    { id: '#1247', title: 'Login form validation error', priority: 'high', status: 'in-progress', assignee: 'You' },
    { id: '#1246', title: 'Chart tooltip positioning', priority: 'medium', status: 'testing', assignee: 'You' },
    { id: '#1245', title: 'Mobile responsive issues', priority: 'low', status: 'completed', assignee: 'Petra H.' },
    { id: '#1244', title: 'Database connection timeout', priority: 'critical', status: 'open', assignee: 'Michael F.' },
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'text-red-600 bg-red-100'
      case 'high': return 'text-orange-600 bg-orange-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      case 'low': return 'text-green-600 bg-green-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle2 className="h-4 w-4 text-green-600" />
      case 'in-progress': return <Clock className="h-4 w-4 text-blue-600" />
      case 'testing': return <Zap className="h-4 w-4 text-purple-600" />
      default: return <AlertCircle className="h-4 w-4 text-red-600" />
    }
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Bug Tracker</h3>
      <div className="space-y-3">
        {bugs.map((bug, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="flex items-center space-x-3">
              {getStatusIcon(bug.status)}
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-mono text-gray-500">{bug.id}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(bug.priority)}`}>
                    {bug.priority}
                  </span>
                </div>
                <h4 className="text-sm font-medium text-gray-900">{bug.title}</h4>
                <p className="text-xs text-gray-500">Assigned to {bug.assignee}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Performance Metrics Component
function PerformanceMetrics() {
  const metrics = [
    { metric: 'Code Coverage', value: '87%', target: '90%', status: 'warning' },
    { metric: 'Build Time', value: '2.3s', target: '< 3s', status: 'good' },
    { metric: 'Test Success Rate', value: '94%', target: '95%', status: 'warning' },
    { metric: 'API Response Time', value: '142ms', target: '< 200ms', status: 'excellent' },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-600 bg-green-100'
      case 'good': return 'text-blue-600 bg-blue-100'
      case 'warning': return 'text-yellow-600 bg-yellow-100'
      case 'critical': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h3>
      <div className="space-y-4">
        {metrics.map((item, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">{item.metric}</h4>
              <p className="text-sm text-gray-600">Target: {item.target}</p>
            </div>
            <div className="text-right">
              <div className="flex items-center">
                <span className="text-lg font-bold text-gray-900 mr-2">{item.value}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                  {item.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Development Tools Component
function DevelopmentTools() {
  const tools = [
    { name: 'VS Code', status: 'active', version: '1.84.2', usage: '8h 24m today' },
    { name: 'Git', status: 'active', version: '2.42.0', usage: '15 commits today' },
    { name: 'Docker', status: 'running', version: '24.0.6', usage: '3 containers' },
    { name: 'Node.js', status: 'active', version: '18.18.2', usage: 'v18.18.2 LTS' },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100'
      case 'running': return 'text-blue-600 bg-blue-100'
      case 'idle': return 'text-yellow-600 bg-yellow-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Development Environment</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {tools.map((tool, index) => (
          <div key={index} className="p-3 bg-green-50 rounded-lg">
            <div className="flex items-center justify-between mb-1">
              <h4 className="font-medium text-gray-900">{tool.name}</h4>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(tool.status)}`}>
                {tool.status}
              </span>
            </div>
            <p className="text-sm text-gray-600">{tool.version}</p>
            <p className="text-xs text-gray-500">{tool.usage}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// Main Developer Dashboard Component
export default function DeveloperDashboard() {
  const developerStats = [
    {
      title: 'Lines of Code',
      value: '2,847',
      change: '+234',
      icon: <Code className="h-6 w-6 text-green-600" />,
      changeType: 'positive' as const,
      bgColor: 'bg-green-50'
    },
    {
      title: 'Commits This Week',
      value: '47',
      change: '+12',
      icon: <GitBranch className="h-6 w-6 text-emerald-600" />,
      changeType: 'positive' as const,
      bgColor: 'bg-emerald-50'
    },
    {
      title: 'Bugs Fixed',
      value: '8',
      change: '+3',
      icon: <Bug className="h-6 w-6 text-green-600" />,
      changeType: 'positive' as const,
      bgColor: 'bg-green-50'
    },
    {
      title: 'Code Quality',
      value: '94%',
      change: '+2.1%',
      icon: <TrendingUp className="h-6 w-6 text-emerald-600" />,
      changeType: 'positive' as const,
      bgColor: 'bg-emerald-50'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Developer Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 shadow-sm border-b">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-white">Developer Dashboard</h1>
              <p className="text-green-100">Code metrics, projects, and development tools</p>
            </div>
            <div className="flex items-center text-green-100">
              <Terminal className="h-5 w-5 mr-2" />
              <span className="text-sm font-medium">Development Environment</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Developer Alert */}
        <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center">
            <Terminal className="h-5 w-5 text-green-600 mr-3" />
            <div>
              <h3 className="text-sm font-medium text-green-800">Developer Dashboard</h3>
              <p className="text-sm text-green-700 mt-1">
                Track your coding activity, project progress, and technical metrics.
              </p>
            </div>
          </div>
        </div>

        {/* Developer Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {developerStats.map((stat, index) => (
            <DeveloperStatCard key={index} {...stat} />
          ))}
        </div>

        {/* Developer Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Code Activity */}
          <CodeActivity />

          {/* Bug Tracking */}
          <BugTracking />
        </div>

        {/* Second Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Performance Metrics */}
          <PerformanceMetrics />

          {/* Development Tools */}
          <DevelopmentTools />
        </div>

        {/* Developer Summary */}
        <div className="mt-8 bg-white rounded-lg p-6 shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Code className="h-5 w-5 text-green-600 mr-2" />
            Development Summary
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <h4 className="text-sm font-medium text-gray-600">Active Projects</h4>
              <p className="text-2xl font-bold text-green-600">4</p>
              <p className="text-sm text-gray-500 mt-1">2 in review</p>
            </div>
            <div className="text-center p-4 bg-emerald-50 rounded-lg">
              <h4 className="text-sm font-medium text-gray-600">Code Reviews</h4>
              <p className="text-2xl font-bold text-emerald-600">12</p>
              <p className="text-sm text-gray-500 mt-1">3 pending</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <h4 className="text-sm font-medium text-gray-600">Tests Written</h4>
              <p className="text-2xl font-bold text-green-600">156</p>
              <p className="text-sm text-gray-500 mt-1">94% pass rate</p>
            </div>
            <div className="text-center p-4 bg-emerald-50 rounded-lg">
              <h4 className="text-sm font-medium text-gray-600">Documentation</h4>
              <p className="text-2xl font-bold text-emerald-600">23</p>
              <p className="text-sm text-gray-500 mt-1">pages updated</p>
            </div>
          </div>
        </div>

      </main>
    </div>
  )
}