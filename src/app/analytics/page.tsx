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
  Euro,
  Eye, 
  MousePointer,
  Calendar,
  Download,
  Filter,
  RefreshCw
} from 'lucide-react'

// Sample data for different time periods
const data24h = [
  { time: '00:00', users: 45, revenue: 1200, sessions: 89 },
  { time: '04:00', users: 23, revenue: 800, sessions: 45 },
  { time: '08:00', users: 89, revenue: 2400, sessions: 156 },
  { time: '12:00', users: 156, revenue: 3200, sessions: 234 },
  { time: '16:00', users: 134, revenue: 2800, sessions: 198 },
  { time: '20:00', users: 98, revenue: 2100, sessions: 167 },
]

const data7d = [
  { time: 'Mon', users: 890, revenue: 24000, sessions: 1567 },
  { time: 'Tue', users: 756, revenue: 18900, sessions: 1234 },
  { time: 'Wed', users: 1024, revenue: 28500, sessions: 1789 },
  { time: 'Thu', users: 923, revenue: 25600, sessions: 1456 },
  { time: 'Fri', users: 1156, revenue: 32100, sessions: 1923 },
  { time: 'Sat', users: 567, revenue: 15200, sessions: 892 },
  { time: 'Sun', users: 432, revenue: 12800, sessions: 678 },
]

const data30d = [
  { time: 'Week 1', users: 5240, revenue: 156000, sessions: 8960 },
  { time: 'Week 2', users: 4890, revenue: 142000, sessions: 8234 },
  { time: 'Week 3', users: 6120, revenue: 178000, sessions: 9876 },
  { time: 'Week 4', users: 5650, revenue: 164000, sessions: 9234 },
]

// Revenue breakdown data
const revenueData = [
  { month: 'Jan', revenue: 45000, expenses: 32000, profit: 13000 },
  { month: 'Feb', revenue: 52000, expenses: 35000, profit: 17000 },
  { month: 'Mar', revenue: 48000, expenses: 33000, profit: 15000 },
  { month: 'Apr', revenue: 61000, expenses: 38000, profit: 23000 },
  { month: 'May', revenue: 55000, expenses: 36000, profit: 19000 },
  { month: 'Jun', revenue: 67000, expenses: 41000, profit: 26000 },
]

// Traffic sources data
const trafficData = [
  { name: 'Organic Search', value: 35, color: '#3B82F6', users: 2450 },
  { name: 'Direct', value: 25, color: '#10B981', users: 1750 },
  { name: 'Social Media', value: 20, color: '#F59E0B', users: 1400 },
  { name: 'Email', value: 12, color: '#EF4444', users: 840 },
  { name: 'Referral', value: 5, color: '#8B5CF6', users: 350 },
  { name: 'Other', value: 3, color: '#6B7280', users: 210 },
]

// Device data
const deviceData = [
  { device: 'Desktop', users: 3200, percentage: 45, sessions: 5400 },
  { device: 'Mobile', users: 2800, percentage: 39, sessions: 4200 },
  { device: 'Tablet', users: 1100, percentage: 16, sessions: 1600 },
]

// Geographic data
const geoData = [
  { country: 'Germany', users: 2100, flag: '🇩🇪' },
  { country: 'United States', users: 1800, flag: '🇺🇸' },
  { country: 'United Kingdom', users: 1200, flag: '🇬🇧' },
  { country: 'France', users: 900, flag: '🇫🇷' },
  { country: 'Netherlands', users: 600, flag: '🇳🇱' },
]

// Time periods
type TimePeriod = '24h' | '7d' | '30d' | '90d'

const timePeriods = [
  { value: '24h' as TimePeriod, label: '24 Hours' },
  { value: '7d' as TimePeriod, label: '7 Days' },
  { value: '30d' as TimePeriod, label: '30 Days' },
  { value: '90d' as TimePeriod, label: '90 Days' },
]

// Get data for selected period
function getDataForPeriod(period: TimePeriod) {
  switch (period) {
    case '24h': return data24h
    case '7d': return data7d
    case '30d': return data30d
    case '90d': return data30d // Using 30d data for demo
    default: return data7d
  }
}

// Metric Card Component
interface MetricCardProps {
  title: string
  value: string | number
  change: string
  changeType: 'positive' | 'negative'
  icon: React.ReactNode
  subtitle?: string
}

function MetricCard({ title, value, change, changeType, icon, subtitle }: MetricCardProps) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
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
        <span className="text-sm text-gray-600 ml-1">vs last period</span>
      </div>
    </div>
  )
}

// Chart Container Component
function ChartContainer({ 
  title, 
  children, 
  className = "",
  onExport 
}: { 
  title: string
  children: React.ReactNode
  className?: string
  onExport?: () => void
}) {
  return (
    <div className={`bg-white rounded-lg p-6 shadow-sm border ${className}`}>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <div className="flex gap-2">
          <button className="text-sm text-gray-500 hover:text-gray-700 flex items-center px-3 py-1 rounded-md hover:bg-gray-50">
            <RefreshCw className="h-4 w-4 mr-1" />
            Refresh
          </button>
          {onExport && (
            <button 
              onClick={onExport}
              className="text-sm text-gray-500 hover:text-gray-700 flex items-center px-3 py-1 rounded-md hover:bg-gray-50"
            >
              <Download className="h-4 w-4 mr-1" />
              Export
            </button>
          )}
        </div>
      </div>
      {children}
    </div>
  )
}

// Time Period Selector
function TimePeriodSelector({ 
  selected, 
  onSelect 
}: { 
  selected: TimePeriod
  onSelect: (period: TimePeriod) => void 
}) {
  return (
    <div className="flex rounded-lg border border-gray-200 p-1 bg-gray-50">
      {timePeriods.map((period) => (
        <button
          key={period.value}
          onClick={() => onSelect(period.value)}
          className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
            selected === period.value
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
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>('7d')
  const [isLoading, setIsLoading] = useState(false)
  
  const currentData = getDataForPeriod(selectedPeriod)

  const handlePeriodChange = (period: TimePeriod) => {
    setIsLoading(true)
    setSelectedPeriod(period)
    // Simulate loading delay
    setTimeout(() => setIsLoading(false), 500)
  }

  const handleExport = (chartType: string) => {
    // Simulate export functionality
    alert(`Exporting ${chartType} data...`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-6 gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
              <p className="text-gray-600">Track your business performance and user engagement</p>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Time Period Selector */}
              <TimePeriodSelector 
                selected={selectedPeriod} 
                onSelect={handlePeriodChange} 
              />
              
              {/* Quick Actions */}
              <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Loading State */}
        {isLoading && (
          <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center">
              <RefreshCw className="h-4 w-4 animate-spin text-blue-600 mr-2" />
              <p className="text-blue-800 text-sm">Updating analytics data...</p>
            </div>
          </div>
        )}
        
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Total Revenue"
            value="€184,320"
            change="+18.2%"
            changeType="positive"
            icon={<Euro className="h-6 w-6 text-green-600" />}
            subtitle="vs previous period"
          />
          <MetricCard
            title="Active Users"
            value="12,543"
            change="+12.5%"
            changeType="positive"
            icon={<Users className="h-6 w-6 text-blue-600" />}
            subtitle="unique visitors"
          />
          <MetricCard
            title="Page Views"
            value="89,432"
            change="+8.1%"
            changeType="positive"
            icon={<Eye className="h-6 w-6 text-purple-600" />}
            subtitle="total sessions"
          />
          <MetricCard
            title="Conversion Rate"
            value="3.24%"
            change="-0.3%"
            changeType="negative"
            icon={<MousePointer className="h-6 w-6 text-orange-600" />}
            subtitle="from visitors"
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          
          {/* Main Chart - User Activity */}
          <ChartContainer 
            title={`User Activity (${selectedPeriod})`} 
            className="lg:col-span-2"
            onExport={() => handleExport('User Activity')}
          >
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={currentData}>
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorSessions" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="time" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="users" 
                  stroke="#3B82F6" 
                  fill="url(#colorUsers)"
                  strokeWidth={2}
                  name="Users"
                />
                <Area 
                  type="monotone" 
                  dataKey="sessions" 
                  stroke="#10B981" 
                  fill="url(#colorSessions)"
                  strokeWidth={2}
                  name="Sessions"
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>

          {/* Traffic Sources Pie Chart */}
          <ChartContainer 
            title="Traffic Sources" 
            onExport={() => handleExport('Traffic Sources')}
          >
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={trafficData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  innerRadius={40}
                  dataKey="value"
                  label={({ name, value }) => `${value}%`}
                >
                  {trafficData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value, name) => [`${value}%`, name]} />
              </PieChart>
            </ResponsiveContainer>
            
            {/* Traffic Legend */}
            <div className="mt-4 grid grid-cols-1 gap-2">
              {trafficData.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-gray-700">{item.name}</span>
                  </div>
                  <div className="text-gray-600">
                    {item.users.toLocaleString()} users
                  </div>
                </div>
              ))}
            </div>
          </ChartContainer>
        </div>

        {/* Second Row Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          
          {/* Revenue Chart */}
          <ChartContainer 
            title="Revenue vs Expenses" 
            onExport={() => handleExport('Revenue')}
          >
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`€${value?.toLocaleString()}`, '']} />
                <Legend />
                <Bar dataKey="revenue" fill="#3B82F6" name="Revenue" />
                <Bar dataKey="expenses" fill="#EF4444" name="Expenses" />
                <Bar dataKey="profit" fill="#10B981" name="Profit" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>

          {/* Device Analytics */}
          <ChartContainer 
            title="Device Analytics" 
            onExport={() => handleExport('Device Analytics')}
          >
            <div className="space-y-4">
              {deviceData.map((device) => (
                <div key={device.device} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">{device.device}</h4>
                    <p className="text-sm text-gray-600">{device.users.toLocaleString()} users</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{device.percentage}%</p>
                    <p className="text-sm text-gray-600">{device.sessions.toLocaleString()} sessions</p>
                  </div>
                  <div className="w-20 h-2 bg-gray-200 rounded-full ml-4">
                    <div 
                      className="h-2 bg-blue-600 rounded-full"
                      style={{ width: `${device.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </ChartContainer>
        </div>

        {/* Geographic Data & Summary Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Geographic Distribution */}
          <ChartContainer title="Top Countries" className="lg:col-span-1">
            <div className="space-y-3">
              {geoData.map((country) => (
                <div key={country.country} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <span className="text-xl mr-3">{country.flag}</span>
                    <span className="text-sm font-medium text-gray-900">{country.country}</span>
                  </div>
                  <span className="text-sm text-gray-600">{country.users.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </ChartContainer>

          {/* Summary Statistics */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
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
            
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Goal Completions</p>
                  <p className="text-2xl font-bold text-gray-900">1,247</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-500" />
              </div>
              <p className="text-sm text-gray-500 mt-2">+23% from last week</p>
            </div>
          </div>
        </div>

      </main>
    </div>
  )
}