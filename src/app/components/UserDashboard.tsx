'use client'

import { Users, Euro, TrendingUp, Activity, Star, Calendar, FileText, Award } from 'lucide-react'

interface StatCardProps {
  title: string
  value: string
  change?: string
  icon: React.ReactNode
  changeType?: 'positive' | 'negative'
  bgColor?: string
}


function UserStatCard({ title, value, change, icon, changeType, bgColor = "bg-purple-50" }: StatCardProps) {
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
      {change && (
        <div className="mt-4">
          <span className={`text-sm font-medium ${
            changeType === 'positive' ? 'text-green-600' : 'text-red-600'
          }`}>
            {change}
          </span>
          <span className="text-sm text-gray-600 ml-1">from last month</span>
        </div>
      )}
    </div>
  )
}


function PersonalActivities() {
  const activities = [
    { id: 1, action: 'Completed profile setup', time: '2 hours ago', type: 'profile' },
    { id: 2, action: 'Updated personal information', time: '1 day ago', type: 'update' },
    { id: 3, action: 'Viewed analytics dashboard', time: '2 days ago', type: 'view' },
    { id: 4, action: 'Downloaded monthly report', time: '1 week ago', type: 'download' },
  ]

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'profile': return <Users className="h-4 w-4" />
      case 'update': return <FileText className="h-4 w-4" />
      case 'view': return <Activity className="h-4 w-4" />
      case 'download': return <TrendingUp className="h-4 w-4" />
      default: return <Activity className="h-4 w-4" />
    }
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-center space-x-3">
            <div className="h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
              {getActivityIcon(activity.type)}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">{activity.action}</p>
              <p className="text-xs text-gray-500">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}


function QuickActions() {
  const actions = [
    { title: 'Update Profile', description: 'Edit your personal information', icon: <Users className="h-5 w-5" />, color: 'text-purple-600' },
    { title: 'View Reports', description: 'Access your personal reports', icon: <FileText className="h-5 w-5" />, color: 'text-blue-600' },
    { title: 'Schedule Meeting', description: 'Book time with your team', icon: <Calendar className="h-5 w-5" />, color: 'text-green-600' },
    { title: 'Help Center', description: 'Get support and documentation', icon: <Award className="h-5 w-5" />, color: 'text-orange-600' },
  ]

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {actions.map((action, index) => (
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


function Achievements() {
  const achievements = [
    { title: 'Welcome Aboard!', description: 'Successfully created your account', earned: true, date: 'Today' },
    { title: 'Profile Complete', description: 'Completed your profile setup', earned: true, date: '2 hours ago' },
    { title: 'First Login', description: 'Logged in for the first time', earned: true, date: 'Today' },
    { title: 'Explorer', description: 'Visited all dashboard sections', earned: false, date: 'Not yet earned' },
  ]

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Achievements</h3>
      <div className="space-y-3">
        {achievements.map((achievement, index) => (
          <div key={index} className={`flex items-center p-3 rounded-lg ${
            achievement.earned ? 'bg-purple-50 border border-purple-200' : 'bg-gray-50'
          }`}>
            <div className={`h-8 w-8 rounded-full flex items-center justify-center mr-3 ${
              achievement.earned ? 'bg-purple-100 text-purple-600' : 'bg-gray-200 text-gray-400'
            }`}>
              <Star className="h-4 w-4" />
            </div>
            <div className="flex-1">
              <h4 className={`font-medium ${achievement.earned ? 'text-purple-900' : 'text-gray-600'}`}>
                {achievement.title}
              </h4>
              <p className="text-sm text-gray-600">{achievement.description}</p>
              <p className="text-xs text-gray-500">{achievement.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function WelcomeBanner({ userName }: { userName: string }) {
  return (
    <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-6 text-white mb-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-2">Welcome, {userName}! 👋</h2>
          <p className="text-purple-100">
            You're all set up and ready to explore your dashboard. Here's your personal overview.
          </p>
        </div>
        <div className="hidden md:block">
          <div className="text-6xl opacity-20">🎉</div>
        </div>
      </div>
    </div>
  )
}


export default function UserDashboard() {
  
  const userStats = [
    {
      title: 'Your Progress',
      value: '75%',
      change: '+15%',
      icon: <TrendingUp className="h-6 w-6 text-purple-600" />,
      changeType: 'positive' as const,
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Tasks Completed',
      value: '12',
      change: '+3',
      icon: <Award className="h-6 w-6 text-pink-600" />,
      changeType: 'positive' as const,
      bgColor: 'bg-pink-50'
    },
    {
      title: 'Time Saved',
      value: '2.5 hrs',
      change: '+30 min',
      icon: <Calendar className="h-6 w-6 text-purple-600" />,
      changeType: 'positive' as const,
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Achievements',
      value: '3/8',
      icon: <Star className="h-6 w-6 text-pink-600" />,
      bgColor: 'bg-pink-50'
    }
  ]

  // Get user data from localStorage for personalization
  const userData = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('dashboard-user') || '{}') : {}
  const userName = userData.name || 'User'

  return (
    <div className="min-h-screen bg-gray-50">
      {/* User Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Your Dashboard</h1>
              <p className="text-gray-600">Personal overview and activities</p>
            </div>
            <div className="flex items-center text-purple-600">
              <Users className="h-5 w-5 mr-2" />
              <span className="text-sm font-medium">Standard User</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Welcome Banner */}
        <WelcomeBanner userName={userName} />

        {/* User Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {userStats.map((stat, index) => (
            <UserStatCard key={index} {...stat} />
          ))}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Personal Activities */}
          <PersonalActivities />

          {/* Quick Actions */}
          <QuickActions />
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Achievements */}
          <div className="lg:col-span-2">
            <Achievements />
          </div>

          {/* Personal Stats */}
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Stats</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">Profile Completion</span>
                <span className="font-semibold text-purple-600">85%</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-pink-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">Account Age</span>
                <span className="font-semibold text-pink-600">New</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">Last Activity</span>
                <span className="font-semibold text-purple-600">Today</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-pink-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">Security Score</span>
                <span className="font-semibold text-pink-600">Good</span>
              </div>
            </div>
          </div>
        </div>

      </main>
    </div>
  )
}