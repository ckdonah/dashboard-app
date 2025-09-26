'use client'

import { Users, Euro, TrendingUp, Activity, Target, Calendar, Clock, CheckCircle } from 'lucide-react'

interface StatCardProps {
  title: string
  value: string
  change: string
  icon: React.ReactNode
  changeType: 'positive' | 'negative'
  bgColor?: string
}

function ManagerStatCard({ title, value, change, icon, changeType, bgColor = "bg-blue-50" }: StatCardProps) {
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


function TeamPerformance() {
  const teamMembers = [
    { name: 'Klaus Weber', role: 'Developer', performance: 92, tasks: 24, status: 'excellent' },
    { name: 'Petra Hoffmann', role: 'Designer', performance: 87, tasks: 18, status: 'good' },
    { name: 'Michael Fischer', role: 'Developer', performance: 94, tasks: 28, status: 'excellent' },
    { name: 'Sarah Wagner', role: 'Marketing', performance: 79, tasks: 15, status: 'average' },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-600 bg-green-100'
      case 'good': return 'text-blue-600 bg-blue-100'
      case 'average': return 'text-yellow-600 bg-yellow-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Team Performance</h3>
      <div className="space-y-4">
        {teamMembers.map((member, index) => (
          <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center mr-3">
                <span className="text-sm font-medium text-white">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">{member.name}</h4>
                <p className="text-sm text-gray-600">{member.role}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center mb-1">
                <span className="text-sm font-medium text-gray-900 mr-2">{member.performance}%</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(member.status)}`}>
                  {member.status}
                </span>
              </div>
              <p className="text-xs text-gray-500">{member.tasks} tasks completed</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function TeamGoals() {
  const goals = [
    { title: 'Q4 Revenue Target', progress: 78, target: '€75,000', current: '€58,500', status: 'on-track' },
    { title: 'Customer Satisfaction', progress: 92, target: '90%', current: '92%', status: 'achieved' },
    { title: 'Project Delivery', progress: 65, target: '12 projects', current: '8 projects', status: 'behind' },
    { title: 'Team Training Hours', progress: 88, target: '40 hours', current: '35 hours', status: 'on-track' },
  ]

  const getProgressColor = (status: string) => {
    switch (status) {
      case 'achieved': return 'bg-green-500'
      case 'on-track': return 'bg-blue-500'
      case 'behind': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Team Goals</h3>
      <div className="space-y-4">
        {goals.map((goal, index) => (
          <div key={index} className="p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-medium text-gray-900">{goal.title}</h4>
              <span className="text-sm font-medium text-gray-600">{goal.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
              <div 
                className={`h-2 rounded-full ${getProgressColor(goal.status)}`}
                style={{ width: `${goal.progress}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Current: {goal.current}</span>
              <span>Target: {goal.target}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function UpcomingMeetings() {
  const meetings = [
    { title: 'Weekly Team Standup', time: 'Today, 10:00 AM', attendees: 6, type: 'team' },
    { title: 'Client Review Meeting', time: 'Tomorrow, 2:00 PM', attendees: 4, type: 'client' },
    { title: 'Budget Planning', time: 'Friday, 9:00 AM', attendees: 3, type: 'planning' },
    { title: 'Performance Reviews', time: 'Next Week, 3:00 PM', attendees: 8, type: 'hr' },
  ]

  const getMeetingIcon = (type: string) => {
    switch (type) {
      case 'team': return <Users className="h-4 w-4" />
      case 'client': return <Target className="h-4 w-4" />
      case 'planning': return <Calendar className="h-4 w-4" />
      default: return <Clock className="h-4 w-4" />
    }
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Meetings</h3>
      <div className="space-y-4">
        {meetings.map((meeting, index) => (
          <div key={index} className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
            <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
              {getMeetingIcon(meeting.type)}
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-gray-900">{meeting.title}</h4>
              <p className="text-sm text-gray-600">{meeting.time}</p>
            </div>
            <div className="text-right">
              <span className="text-sm text-gray-600">{meeting.attendees} attendees</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Main Manager Dashboard Component
export default function ManagerDashboard() {
  const managerStats = [
    {
      title: 'Team Budget',
      value: '€45,200',
      change: '+8.5%',
      icon: <Euro className="h-6 w-6 text-blue-600" />,
      changeType: 'positive' as const,
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Team Members',
      value: '12',
      change: '+2',
      icon: <Users className="h-6 w-6 text-indigo-600" />,
      changeType: 'positive' as const,
      bgColor: 'bg-indigo-50'
    },
    {
      title: 'Team Performance',
      value: '88%',
      change: '+5.2%',
      icon: <TrendingUp className="h-6 w-6 text-blue-600" />,
      changeType: 'positive' as const,
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Projects Complete',
      value: '24',
      change: '+3',
      icon: <CheckCircle className="h-6 w-6 text-indigo-600" />,
      changeType: 'positive' as const,
      bgColor: 'bg-indigo-50'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Manager Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 shadow-sm border-b">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-white">Manager Dashboard</h1>
              <p className="text-blue-100">Team oversight and performance management</p>
            </div>
            <div className="flex items-center text-blue-100">
              <Target className="h-5 w-5 mr-2" />
              <span className="text-sm font-medium">Team Leadership</span>
            </div>
          </div>
        </div>
      </div>

      
      <main className="px-4 sm:px-6 lg:px-8 py-8">
        
        <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center">
            <Target className="h-5 w-5 text-blue-600 mr-3" />
            <div>
              <h3 className="text-sm font-medium text-blue-800">Manager Dashboard</h3>
              <p className="text-sm text-blue-700 mt-1">
                Focus on team performance, project management, and goal achievement.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {managerStats.map((stat, index) => (
            <ManagerStatCard key={index} {...stat} />
          ))}
        </div>

  
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
   
          <TeamPerformance />


          <TeamGoals />
        </div>

   
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
          <div className="lg:col-span-2">
            <UpcomingMeetings />
          </div>

       
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">Active Projects</span>
                <span className="font-semibold text-blue-600">8</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">Completed This Month</span>
                <span className="font-semibold text-green-600">24</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">Pending Reviews</span>
                <span className="font-semibold text-yellow-600">5</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">Team Satisfaction</span>
                <span className="font-semibold text-purple-600">4.2/5</span>
              </div>
            </div>
          </div>
        </div>

      </main>
    </div>
  )
}