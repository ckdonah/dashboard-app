'use client'

import { useState } from 'react'
import { Save, User, Bell, Shield, Palette, Globe } from 'lucide-react'

// Define settings data structure
interface UserSettings {
  // Profile Settings
  firstName: string
  lastName: string
  email: string
  jobTitle: string
  
  // Notification Settings
  emailNotifications: boolean
  pushNotifications: boolean
  weeklyReports: boolean
  
  // Privacy Settings
  profileVisibility: 'public' | 'private' | 'team'
  dataSharing: boolean
  
  // Appearance Settings
  theme: 'light' | 'dark' | 'system'
  language: string
  timezone: string
}

// Default settings
const defaultSettings: UserSettings = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  jobTitle: 'Product Manager',
  emailNotifications: true,
  pushNotifications: false,
  weeklyReports: true,
  profileVisibility: 'team',
  dataSharing: false,
  theme: 'light',
  language: 'English',
  timezone: 'UTC-5 (Eastern Time)'
}

// Toggle Switch Component
function ToggleSwitch({ 
  enabled, 
  onChange, 
  label 
}: { 
  enabled: boolean
  onChange: (enabled: boolean) => void
  label: string 
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm font-medium text-gray-900">{label}</span>
      <button
        type="button"
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          enabled ? 'bg-blue-600' : 'bg-gray-200'
        }`}
        onClick={() => onChange(!enabled)}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            enabled ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  )
}

function SettingsSection({ 
  title, 
  icon, 
  children 
}: { 
  title: string
  icon: React.ReactNode
  children: React.ReactNode 
}) {
  return (
    <div className="bg-white shadow-sm rounded-lg border">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center">
          <div className="h-8 w-8 bg-blue-50 rounded-lg flex items-center justify-center mr-3">
            {icon}
          </div>
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        </div>
      </div>
      <div className="px-6 py-4">
        {children}
      </div>
    </div>
  )
}


export default function SettingsPage() {
  const [settings, setSettings] = useState<UserSettings>(defaultSettings)
  const [isSaving, setIsSaving] = useState(false)

  
  const updateSetting = (key: keyof UserSettings, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }))
  }

 
  const handleSave = async () => {
    setIsSaving(true)
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSaving(false)
    
    // Show success message (in real app, this would be a toast notification)
    alert('Settings saved successfully!')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
              <p className="text-gray-600">Manage your account preferences and settings</p>
            </div>
            
            {/* Save Button */}
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <Save className="h-4 w-4" />
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        {/* Profile Settings */}
        <SettingsSection 
          title="Profile Settings" 
          icon={<User className="h-5 w-5 text-blue-600" />}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <input
                type="text"
                value={settings.firstName}
                onChange={(e) => updateSetting('firstName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <input
                type="text"
                value={settings.lastName}
                onChange={(e) => updateSetting('lastName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) => updateSetting('email', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Job Title
              </label>
              <input
                type="text"
                value={settings.jobTitle}
                onChange={(e) => updateSetting('jobTitle', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </SettingsSection>

        {/* Notification Settings */}
        <SettingsSection 
          title="Notifications" 
          icon={<Bell className="h-5 w-5 text-blue-600" />}
        >
          <div className="space-y-4">
            <ToggleSwitch
              enabled={settings.emailNotifications}
              onChange={(value) => updateSetting('emailNotifications', value)}
              label="Email Notifications"
            />
            <ToggleSwitch
              enabled={settings.pushNotifications}
              onChange={(value) => updateSetting('pushNotifications', value)}
              label="Push Notifications"
            />
            <ToggleSwitch
              enabled={settings.weeklyReports}
              onChange={(value) => updateSetting('weeklyReports', value)}
              label="Weekly Reports"
            />
          </div>
        </SettingsSection>

        {/* Privacy Settings */}
        <SettingsSection 
          title="Privacy & Security" 
          icon={<Shield className="h-5 w-5 text-blue-600" />}
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Profile Visibility
              </label>
              <select
                value={settings.profileVisibility}
                onChange={(e) => updateSetting('profileVisibility', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="public">Public</option>
                <option value="team">Team Only</option>
                <option value="private">Private</option>
              </select>
            </div>
            <ToggleSwitch
              enabled={settings.dataSharing}
              onChange={(value) => updateSetting('dataSharing', value)}
              label="Allow Data Sharing for Analytics"
            />
          </div>
        </SettingsSection>

        {/* Appearance Settings */}
        <SettingsSection 
          title="Appearance & Language" 
          icon={<Palette className="h-5 w-5 text-blue-600" />}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Theme
              </label>
              <select
                value={settings.theme}
                onChange={(e) => updateSetting('theme', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="system">System</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Language
              </label>
              <select
                value={settings.language}
                onChange={(e) => updateSetting('language', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="English">English</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
                <option value="German">German</option>
              </select>
            </div>
          </div>
        </SettingsSection>

      </main>
    </div>
  )
}