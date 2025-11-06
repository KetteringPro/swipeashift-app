'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

type ShiftStatus = 'OPEN' | 'FILLED' | 'CANCELLED'

interface ShiftWithApplicants {
  id: string
  role: string
  date: string
  start_time: string
  end_time: string
  pay_rate: number | null
  hourly_rate_min: number | null
  hourly_rate_max: number | null
  status: ShiftStatus
  positions_open: number
  max_workers: number
  description: string | null
  applicant_count: number
  pending_count: number
  priority_count: number
  accepted_count: number
}

export default function EmployerDashboard() {
  const [shifts, setShifts] = useState<ShiftWithApplicants[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filterStatus, setFilterStatus] = useState<'all' | ShiftStatus>('all')
  const [restaurantName, setRestaurantName] = useState<string>('My Restaurant')

  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    loadShifts()
  }, [])

  const loadShifts = async () => {
    setIsLoading(true)
    setError(null)

    try {
      // TEMPORARY: Get first restaurant for testing
      const { data: restaurant } = await supabase
        .from('restaurants')
        .select('id, name')
        .limit(1)
        .maybeSingle()

      if (!restaurant) throw new Error('Restaurant not found')

      setRestaurantName(restaurant.name)

      // Fetch shifts with application counts - FIXED COLUMNS
      const { data: shiftsData, error: shiftsError } = await supabase
        .from('shifts')
        .select(`
          id,
          role,
          date,
          start_time,
          end_time,
          pay_rate,
          hourly_rate_min,
          hourly_rate_max,
          status,
          positions_open,
          max_workers,
          description
        `)
        .eq('restaurant_id', restaurant.id)
        .order('date', { ascending: true })
        .order('start_time', { ascending: true })

      if (shiftsError) throw shiftsError

      // For each shift, get application counts
      const shiftsWithCounts = await Promise.all(
        (shiftsData || []).map(async (shift) => {
          const { data: applications } = await supabase
            .from('shift_applications')
            .select('id, status, source')
            .eq('shift_id', shift.id)

          const applicant_count = applications?.length || 0
          const pending_count = applications?.filter(a => a.status === 'PENDING').length || 0
          const priority_count = applications?.filter(a => a.source === 'swipe_priority').length || 0
          const accepted_count = applications?.filter(a => a.status === 'ACCEPTED').length || 0

          return {
            ...shift,
            applicant_count,
            pending_count,
            priority_count,
            accepted_count
          }
        })
      )

      setShifts(shiftsWithCounts)

    } catch (err: any) {
      console.error('Error loading shifts:', err)
      setError(err.message || 'Failed to load shifts')
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusColor = (status: ShiftStatus) => {
    switch (status) {
      case 'OPEN': return 'bg-green-100 text-green-800 border-green-300'
      case 'FILLED': return 'bg-blue-100 text-blue-800 border-blue-300'
      case 'CANCELLED': return 'bg-gray-100 text-gray-800 border-gray-300'
      default: return 'bg-gray-100 text-gray-800 border-gray-300'
    }
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    })
  }

  const formatTime = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(':')
    const hour = parseInt(hours)
    const ampm = hour >= 12 ? 'PM' : 'AM'
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour
    return `${displayHour}:${minutes} ${ampm}`
  }

  // Helper function to display pay rate FOR EMPLOYERS
  // Always show the range they entered, not the discounted worker rate
  const getPayRateDisplay = (shift: ShiftWithApplicants) => {
    if (shift.hourly_rate_min && shift.hourly_rate_max) {
      if (shift.hourly_rate_min === shift.hourly_rate_max) {
        return `$${shift.hourly_rate_min}/hr`
      }
      return `$${shift.hourly_rate_min}-${shift.hourly_rate_max}/hr`
    } else if (shift.hourly_rate_min) {
      return `$${shift.hourly_rate_min}+/hr`
    } else if (shift.hourly_rate_max) {
      return `Up to $${shift.hourly_rate_max}/hr`
    }
    return 'Rate TBD'
  }

  // Helper to calculate positions filled
  const getPositionsFilled = (shift: ShiftWithApplicants) => {
    return shift.accepted_count
  }

  const filteredShifts = shifts.filter(shift => 
    filterStatus === 'all' || shift.status === filterStatus
  )

  const stats = {
    total: shifts.length,
    open: shifts.filter(s => s.status === 'OPEN').length,
    filled: shifts.filter(s => s.status === 'FILLED').length,
    totalApplicants: shifts.reduce((sum, s) => sum + s.applicant_count, 0),
    pendingReview: shifts.reduce((sum, s) => sum + s.pending_count, 0),
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-teal-50 to-green-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading your shifts...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-teal-50 to-green-50 p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md text-center">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops!</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={loadShifts}
            className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-green-50">
      
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                🏪 {restaurantName}
              </h1>
              <p className="text-gray-600 mt-1">Manage your shifts and applications</p>
            </div>
            <button
              onClick={() => router.push('/employer/post-shift')}
              className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition font-medium"
            >
              + Post New Shift
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-gray-500 text-sm font-medium">Total Shifts</div>
            <div className="text-3xl font-bold text-gray-800 mt-2">{stats.total}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-green-600 text-sm font-medium">Open</div>
            <div className="text-3xl font-bold text-green-600 mt-2">{stats.open}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-blue-600 text-sm font-medium">Filled</div>
            <div className="text-3xl font-bold text-blue-600 mt-2">{stats.filled}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-purple-600 text-sm font-medium">Total Applicants</div>
            <div className="text-3xl font-bold text-purple-600 mt-2">{stats.totalApplicants}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-orange-600 text-sm font-medium">Pending Review</div>
            <div className="text-3xl font-bold text-orange-600 mt-2">{stats.pendingReview}</div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white rounded-lg shadow mb-6 p-2 flex gap-2">
          <button
            onClick={() => setFilterStatus('all')}
            className={`flex-1 px-4 py-2 rounded-lg font-medium transition ${
              filterStatus === 'all'
                ? 'bg-teal-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            All Shifts ({stats.total})
          </button>
          <button
            onClick={() => setFilterStatus('OPEN')}
            className={`flex-1 px-4 py-2 rounded-lg font-medium transition ${
              filterStatus === 'OPEN'
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Open ({stats.open})
          </button>
          <button
            onClick={() => setFilterStatus('FILLED')}
            className={`flex-1 px-4 py-2 rounded-lg font-medium transition ${
              filterStatus === 'FILLED'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Filled ({stats.filled})
          </button>
        </div>

        {/* Shifts Table */}
        {filteredShifts.length === 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <div className="text-6xl mb-4">📋</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              No {filterStatus === 'all' ? '' : filterStatus.toLowerCase()} shifts
            </h3>
            <p className="text-gray-600 mb-6">
              {filterStatus === 'all' 
                ? "Post your first shift to start hiring!"
                : `You don't have any ${filterStatus.toLowerCase()} shifts yet.`
              }
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Shift Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Pay Rate
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Applicants
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredShifts.map((shift) => (
                  <tr key={shift.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 capitalize">
                        {shift.role}
                      </div>
                      <div className="text-sm text-gray-500">
                        {getPositionsFilled(shift)}/{shift.max_workers || shift.positions_open} positions filled
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{formatDate(shift.date)}</div>
                      <div className="text-sm text-gray-500">
                        {formatTime(shift.start_time)} - {formatTime(shift.end_time)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-green-600">
                        {getPayRateDisplay(shift)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-gray-900">
                          {shift.applicant_count}
                        </span>
                        {shift.pending_count > 0 && (
                          <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs font-bold rounded-full">
                            {shift.pending_count} new
                          </span>
                        )}
                        {shift.priority_count > 0 && (
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded-full">
                            ⭐ {shift.priority_count}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-3 py-1 rounded-full border-2 font-medium text-xs ${getStatusColor(shift.status)}`}>
                        {shift.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => router.push(`/employer/shifts/${shift.id}`)}
                        className="text-teal-600 hover:text-teal-900 font-medium"
                      >
                        View Applicants →
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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