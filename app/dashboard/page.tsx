'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

type ApplicationStatus = 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'CANCELLED'

interface Application {
  id: string
  status: ApplicationStatus
  source: string
  applied_at: string
  shift: {
    id: string
    role: string
    date: string
    start_time: string
    end_time: string
    pay_rate: number | null
    hourly_rate_min: number | null
    hourly_rate_max: number | null
    description: string | null
    restaurant: {
      id: string
      name: string
      city: string
      state: string
      reliability_score: number
    }
  }
}

export default function WorkerDashboard() {
  const [applications, setApplications] = useState<Application[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filterStatus, setFilterStatus] = useState<'all' | ApplicationStatus>('all')

  const supabase = createClient()

  useEffect(() => {
    loadApplications()
  }, [])

  const loadApplications = async () => {
    setIsLoading(true)
    setError(null)

    try {
      // TEMPORARY: Get first worker for testing
      const { data: worker } = await supabase
        .from('workers')
        .select('id')
        .limit(1)
        .maybeSingle()

      if (!worker) throw new Error('Worker profile not found')

      // Fetch applications with shift and restaurant data
      const { data: appsData, error: appsError } = await supabase
        .from('shift_applications')
        .select(`
          id,
          status,
          applied_at,
          source,
          shift:shifts (
            id,
            role,
            date,
            start_time,
            end_time,
            pay_rate,
            hourly_rate_min,
            hourly_rate_max,
            description,
            restaurant:restaurants (
              id,
              name,
              city,
              state,
              reliability_score
            )
          )
        `)
        .eq('worker_id', worker.id)
        .order('applied_at', { ascending: false })

      if (appsError) throw appsError

      // Type assertion and mapping to handle Supabase's nested array responses
      const formattedApps: Application[] = (appsData || []).map((app: any) => ({
        id: app.id,
        status: app.status,
        source: app.source,
        applied_at: app.applied_at,
        shift: Array.isArray(app.shift) ? app.shift[0] : app.shift
      })).filter((app: any) => app.shift) // Filter out any without shifts

      setApplications(formattedApps)

    } catch (err: any) {
      console.error('Error loading applications:', err)
      setError(err.message || 'Failed to load applications')
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusColor = (status: ApplicationStatus) => {
    switch (status) {
      case 'PENDING': return 'bg-yellow-100 text-yellow-800 border-yellow-300'
      case 'ACCEPTED': return 'bg-green-100 text-green-800 border-green-300'
      case 'REJECTED': return 'bg-red-100 text-red-800 border-red-300'
      case 'CANCELLED': return 'bg-gray-100 text-gray-800 border-gray-300'
      default: return 'bg-gray-100 text-gray-800 border-gray-300'
    }
  }

  const getStatusIcon = (status: ApplicationStatus) => {
    switch (status) {
      case 'PENDING': return '⏳'
      case 'ACCEPTED': return '✅'
      case 'REJECTED': return '❌'
      case 'CANCELLED': return '🚫'
      default: return '❓'
    }
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    })
  }

  const formatTime = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(':')
    const hour = parseInt(hours)
    const ampm = hour >= 12 ? 'PM' : 'AM'
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour
    return `${displayHour}:${minutes} ${ampm}`
  }

  // Helper to get display rate from new column structure
  const getPayRate = (shift: Application['shift']) => {
    if (shift.pay_rate) return shift.pay_rate
    if (shift.hourly_rate_max) return shift.hourly_rate_max
    if (shift.hourly_rate_min) return shift.hourly_rate_min
    return 0
  }

  const calculateEarnings = (rate: number, startTime: string, endTime: string) => {
    const start = parseInt(startTime.split(':')[0])
    const end = parseInt(endTime.split(':')[0])
    const hours = end > start ? end - start : (24 - start) + end
    return (rate * hours).toFixed(2)
  }

  const filteredApplications = applications.filter(app => 
    filterStatus === 'all' || app.status === filterStatus
  )

  const stats = {
    total: applications.length,
    pending: applications.filter(a => a.status === 'PENDING').length,
    accepted: applications.filter(a => a.status === 'ACCEPTED').length,
    rejected: applications.filter(a => a.status === 'REJECTED').length,
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading your applications...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md text-center">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops!</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={loadApplications}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                🌊 My Applications
              </h1>
              <p className="text-gray-600 mt-1">Track your shift applications</p>
            </div>
            <button
              onClick={() => window.location.href = '/swipe'}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
            >
              Find More Shifts
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-gray-500 text-sm font-medium">Total</div>
            <div className="text-3xl font-bold text-gray-800 mt-2">{stats.total}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-yellow-600 text-sm font-medium">Pending</div>
            <div className="text-3xl font-bold text-yellow-600 mt-2">{stats.pending}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-green-600 text-sm font-medium">Accepted</div>
            <div className="text-3xl font-bold text-green-600 mt-2">{stats.accepted}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-red-600 text-sm font-medium">Rejected</div>
            <div className="text-3xl font-bold text-red-600 mt-2">{stats.rejected}</div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white rounded-lg shadow mb-6 p-2 flex gap-2">
          <button
            onClick={() => setFilterStatus('all')}
            className={`flex-1 px-4 py-2 rounded-lg font-medium transition ${
              filterStatus === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            All ({stats.total})
          </button>
          <button
            onClick={() => setFilterStatus('PENDING')}
            className={`flex-1 px-4 py-2 rounded-lg font-medium transition ${
              filterStatus === 'PENDING'
                ? 'bg-yellow-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Pending ({stats.pending})
          </button>
          <button
            onClick={() => setFilterStatus('ACCEPTED')}
            className={`flex-1 px-4 py-2 rounded-lg font-medium transition ${
              filterStatus === 'ACCEPTED'
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Accepted ({stats.accepted})
          </button>
          <button
            onClick={() => setFilterStatus('REJECTED')}
            className={`flex-1 px-4 py-2 rounded-lg font-medium transition ${
              filterStatus === 'REJECTED'
                ? 'bg-red-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Rejected ({stats.rejected})
          </button>
        </div>

        {/* Applications List */}
        {filteredApplications.length === 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <div className="text-6xl mb-4">📭</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              No {filterStatus === 'all' ? '' : filterStatus.toLowerCase()} applications
            </h3>
            <p className="text-gray-600 mb-6">
              {filterStatus === 'all' 
                ? "Start swiping to apply for shifts!"
                : `You don't have any ${filterStatus.toLowerCase()} applications yet.`
              }
            </p>
            <button
              onClick={() => window.location.href = '/swipe'}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
            >
              Find Shifts to Apply
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredApplications.map((app) => (
              <div
                key={app.id}
                className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6"
              >
                <div className="flex items-start justify-between">
                  
                  {/* Left side - Main info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-800">
                        {app.shift.restaurant.name}
                      </h3>
                      {app.source === 'swipe_priority' && (
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded-full border border-blue-300">
                          ⭐ PRIORITY
                        </span>
                      )}
                    </div>
                    
                    <div className="text-gray-600 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Role:</span>
                        <span>{app.shift.role}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">📅</span>
                        <span>{formatDate(app.shift.date)}</span>
                        <span className="mx-2">•</span>
                        <span className="font-medium">⏰</span>
                        <span>{formatTime(app.shift.start_time)} - {formatTime(app.shift.end_time)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">📍</span>
                        <span>{app.shift.restaurant.city}, {app.shift.restaurant.state}</span>
                      </div>
                      {app.shift.description && (
                        <div className="text-sm text-gray-500 mt-2">
                          {app.shift.description}
                        </div>
                      )}
                    </div>

                    <div className="mt-3 text-sm text-gray-500">
                      Applied {new Date(app.applied_at).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric',
                        hour: 'numeric',
                        minute: '2-digit'
                      })}
                    </div>
                  </div>

                  {/* Right side - Pay & Status */}
                  <div className="text-right space-y-3">
                    <div>
                      <div className="text-3xl font-bold text-green-600">
                        ${getPayRate(app.shift)}/hr
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        Est. ${calculateEarnings(getPayRate(app.shift), app.shift.start_time, app.shift.end_time)} total
                      </div>
                    </div>

                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 font-medium ${getStatusColor(app.status)}`}>
                      <span>{getStatusIcon(app.status)}</span>
                      <span className="capitalize">{app.status}</span>
                    </div>

                    {app.shift.restaurant.reliability_score && (
                      <div className="text-sm text-gray-600">
                        ⭐ {app.shift.restaurant.reliability_score.toFixed(1)} rating
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center text-gray-500 text-sm">
          © 2025 SwipeAShift LLC | compliance@swipeashift.com
        </div>
      </footer>
    </div>
  )
}