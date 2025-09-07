'use client'

import { useState } from 'react'
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts'
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  DollarSign, 
  Eye, 
  MousePointer,
  Calendar,
  Download
} from 'lucide-react'

// Sample data for different charts
const revenueData = [
  { month: 'Jan', revenue: 12000, expenses: 8000, profit: 4000 },
  { month: 'Feb', revenue: 15000, expenses: 9000, profit: 6000 },
  { month: 'Mar', revenue: 18000, expenses: 11000, profit: 7000 },
  { month: 'Apr', revenue: 22000, expenses: 12000, profit: 10000 },
  { month: 'May', revenue: 25000, expenses: 14000, profit: 11000 },
  { month: 'Jun', revenue: 28000, expenses: 15000, profit: 13000 },
  { month: 'Jul', revenue: 32000, expenses: 16000, profit: 16000 },
  { month: 'Aug', revenue: 29000, expenses: 15500, profit: 13500 },
]

const userActivityData = [
  { day: 'Mon', newUsers: 120, activeUsers: 890, sessions: 1200 },
  { day: 'Tue', newUsers: 98, activeUsers: 756, sessions: 980 },
  { day: 'Wed', newUsers: 156, activeUsers: 1024, sessions: 1450 },
  { day: 'Thu', newUsers: 134, activeUsers: 923, sessions: 1320 },
  { day: 'Fri', newUsers: 201, activeUsers: 1156, sessions: 1680 },
  { day: 'Sat', newUsers: 89, activeUsers: 567, sessions: 890 },
  { day: 'Sun', newUsers: 67, activeUsers: 432, sessions: 720 },
]

const trafficSourcesData = [
  { name: 'Direct', value: 35, color: '#3B82F6' },
  { name: 'Google', value: 28, color: '#10B981' },
  { name: 'Social Media', value: 20, color: '#F59E0B' },
  { name: 'Email', value: 12, color: '#EF4444' },
  { name: 'Other', value: 5, color: '#8B5CF6' },
]

const deviceData = [
  { device: 'Desktop', users: 45, sessions: 2100 },
  { device: 'Mobile', users: 38, sessions: 1800 },
  { device: 'Tablet', users: 17, sessions: 800 },
]

// Metric Card Component
interface MetricCardProps {
  title: string
  value: string | number
  change: string
  changeType: 'positive' | 'negative'
  icon: React.ReactNode
}

function MetricCard({ title, value, change, changeType, icon }: MetricCardProps) {
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
      <div className="mt-4 flex items-center">
        {changeType === 'positive' ? (
          <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
        ) : (
          <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
        )}
        <span className={`text-sm font-medium ${
          changeType === 'positive' ? 'text-green-600' : 'text-red-600'
        }`}>
          {change}
        </span>
        <span className="text-sm text-gray-600 ml-1">vs last month</span>
      </div>
    </div>
  )
}

// Chart Container Component
function ChartContainer({ 
  title, 
  children, 
  className = "lg:col-span-2" 
}: { 
  title: string
  children: React.ReactNode
  className?: string 
}) {
  return (
    <div className={`bg-white rounded-lg p-6 shadow-sm border ${className}`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <button className="text-sm text-gray-500 hover:text-gray-700 flex items-center">
          <Download className="h-4 w-4 mr-1" />
          Export
        </button>
      </div>
      {children}
    </div>
  )
}

// Time Period Selector
function TimePeriodSelector() {
  const [selectedPeriod, setSelectedPeriod] = useState('7d')
  
  const periods = [
    { value: '24h', label: '24 Hours' },
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: '90d', label: '90 Days' },
  ]

  return (
    <div className="flex rounded-lg border border-gray-200 p-1 bg-gray-50">
      {periods.map((period) => (
        <button
          key={period.value}
          onClick={() => setSelectedPeriod(period.value)}
          className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
            selectedPeriod === period.value
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          {period.label}
        </button>
      ))}
    </div>
  )
}

// Main Analytics Page
export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
              <p className="text-gray-600">Track your business performance and user engagement</p>
            </div>
            
            {/* Time Period Selector */}
            <TimePeriodSelector />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Total Revenue"
            value="$184,320"
            change="+18.2%"
            changeType="positive"
            icon={<DollarSign className="h-6 w-6 text-green-600" />}
          />
          <MetricCard
            title="Total Users"
            value="12,543"
            change="+12.5%"
            changeType="positive"
            icon={<Users className="h-6 w-6 text-blue-600" />}
          />
          <MetricCard
            title="Page Views"
            value="89,432"
            change="+8.1%"
            changeType="positive"
            icon={<Eye className="h-6 w-6 text-purple-600" />}
          />
          <MetricCard
            title="Conversion Rate"
            value="3.24%"
            change="-0.3%"
            changeType="negative"
            icon={<MousePointer className="h-6 w-6 text-orange-600" />}
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          
          {/* Revenue Chart */}
          <ChartContainer title="Revenue vs Expenses">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
                />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stackId="1"
                  stroke="#3B82F6" 
                  fill="#3B82F6"
                  fillOpacity={0.6}
                  name="Revenue"
                />
                <Area 
                  type="monotone" 
                  dataKey="expenses" 
                  stackId="2"
                  stroke="#EF4444" 
                  fill="#EF4444"
                  fillOpacity={0.6}
                  name="Expenses"
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>

          {/* Traffic Sources */}
          <ChartContainer title="Traffic Sources" className="">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={trafficSourcesData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {trafficSourcesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, 'Share']} />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>

        {/* User Activity Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <ChartContainer title="User Activity (Last 7 Days)" className="">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={userActivityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="newUsers" 
                  stroke="#10B981" 
                  strokeWidth={2}
                  name="New Users"
                />
                <Line 
                  type="monotone" 
                  dataKey="activeUsers" 
                  stroke="#3B82F6" 
                  strokeWidth={2}
                  name="Active Users"
                />
                <Line 
                  type="monotone" 
                  dataKey="sessions" 
                  stroke="#F59E0B" 
                  strokeWidth={2}
                  name="Sessions"
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>

          {/* Device Analytics */}
          <ChartContainer title="Users by Device" className="">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={deviceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="device" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar 
                  dataKey="users" 
                  fill="#3B82F6" 
                  name="Users (%)"
                />
                <Bar 
                  dataKey="sessions" 
                  fill="#10B981" 
                  name="Sessions"
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg. Session Duration</p>
                <p className="text-2xl font-bold text-gray-900">4m 32s</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-500" />
            </div>
            <p className="text-sm text-gray-500 mt-2">+12% from last week</p>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Bounce Rate</p>
                <p className="text-2xl font-bold text-gray-900">32.4%</p>
              </div>
              <TrendingDown className="h-8 w-8 text-green-500" />
            </div>
            <p className="text-sm text-gray-500 mt-2">-5% from last week</p>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Return Visitors</p>
                <p className="text-2xl font-bold text-gray-900">68.2%</p>
              </div>
              <Users className="h-8 w-8 text-purple-500" />
            </div>
            <p className="text-sm text-gray-500 mt-2">+8% from last week</p>
          </div>
        </div>

      </main>
    </div>
  )
}