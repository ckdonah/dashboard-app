import { BarChart3, Users, Euro, TrendingUp, Activity } from 'lucide-react'
import { AnalyticsChart } from './components/Chart'

interface StatCardProps {
  title: string
  value: string
  change: string
  icon: React.ReactNode
  changeType: 'positive' | 'negative'
}

// Stat Card Component
function StatCard({ title, value, change, icon, changeType }: StatCardProps) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
        <div className="h-12 w-12 bg-blue-50 rounded-lg flex items-center justify-center">
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

// Recent Activity Component
function RecentActivity() {
  const activities = [
    { id: 1, user: 'John Doe', action: 'Created new project', time: '2 hours ago' },
    { id: 2, user: 'Jane Smith', action: 'Updated dashboard', time: '4 hours ago' },
    { id: 3, user: 'Mike Johnson', action: 'Completed task', time: '6 hours ago' },
    { id: 4, user: 'Sarah Wilson', action: 'Added new user', time: '8 hours ago' },
  ]

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-center space-x-3">
            <div className="h-8 w-8 bg-gray-100 rounded-full flex items-center justify-center">
              <Activity className="h-4 w-4 text-gray-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">{activity.user}</p>
              <p className="text-sm text-gray-600">{activity.action}</p>
            </div>
            <span className="text-xs text-gray-500">{activity.time}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Dashboard() {
 
  const stats = [
    {
      title: 'Total Users',
      value: '2,543',
      change: '+12.5%',
      icon: <Users className="h-6 w-6 text-blue-600" />,
      changeType: 'positive' as const
    },
    {
      title: 'Revenue',
      value: '$23,456',
      change: '+8.2%',
      icon: <Euro className="h-6 w-6 text-green-600" />,
      changeType: 'positive' as const
    },
    {
      title: 'Growth Rate',
      value: '15.3%',
      change: '+2.1%',
      icon: <TrendingUp className="h-6 w-6 text-purple-600" />,
      changeType: 'positive' as const
    },
    {
      title: 'Conversion',
      value: '3.2%',
      change: '-0.5%',
      icon: <BarChart3 className="h-6 w-6 text-orange-600" />,
      changeType: 'negative' as const
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
   
      <div className="bg-white shadow-sm border-b">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600">Welcome back! Here's what's happening.</p>
            </div>
            <div className="text-sm text-gray-500">
              Last updated: {new Date().toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>

      <main className="px-4 sm:px-6 lg:px-8 py-8">
     
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

  
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
          <div className="lg:col-span-2 bg-white rounded-lg p-6 shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Analytics Overview</h3>
            <AnalyticsChart />
          </div>

          <RecentActivity />
        </div>
      </main>
    </div>
  )
}