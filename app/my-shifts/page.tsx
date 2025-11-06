'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

interface Shift {
  id: string
  role: string
  date: string
  start_time: string
  end_time: string
  hourly_rate_min: number | null
  hourly_rate_max: number | null
  pay_rate: number | null
  description: string | null
  restaurant: {
    id: string
    name: string
    city: string
    state: string
    address: string
    phone: string
  }
  application_status: string
  applied_at: string
}

export default function MyShiftsPage() {
  const [upcomingShifts, setUpcomingShifts] = useState<Shift[]>([])
  const [pastShifts, setPastShifts] = useState<Shift[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    loadShifts()
  }, [])

  const loadShifts = async () => {
    setIsLoading(true)
    setError(null)

    try {
      // Get current worker
      const { data: worker } = await supabase
        .from('workers')
        .select('id')
        .limit(1)
        .maybeSingle()

      if (!worker) throw new Error('Worker profile not found')

      // Fetch ACCEPTED applications with shift details
      const { data: acceptedApps, error: appsError } = await supabase
        .from('shift_applications')
        .select(`
          id,
          status,
          applied_at,
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
              address,
              phone
            )
          )
        `)
        .eq('worker_id', worker.id)
        .eq('status', 'ACCEPTED')

      if (appsError) throw appsError

      // Format data and split into upcoming vs past
      const today = new Date().toISOString().split('T')[0]
      const shifts: Shift[] = (acceptedApps || [])
        .map((app: any) => ({
          ...app.shift,
          application_status: app.status,
          applied_at: app.applied_at,
        }))
        .filter(shift => shift.id) // Remove any without shift data
        .sort((a, b) => a.date.localeCompare(b.date)) // Sort by date

      const upcoming = shifts.filter(s => s.date >= today)
      const past = shifts.filter(s => s.date < today).reverse() // Most recent first

      setUpcomingShifts(upcoming)
      setPastShifts(past)

    } catch (err: any) {
      console.error('Error loading shifts:', err)
      setError(err.message || 'Failed to load shifts')
    } finally {
      setIsLoading(false)
    }
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
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

  // Helper to get display rate
  const getPayRate = (shift: Shift) => {
    if (shift.pay_rate) return shift.pay_rate
    if (shift.hourly_rate_max) return shift.hourly_rate_max
    if (shift.hourly_rate_min) return shift.hourly_rate_min
    return 0
  }

  const calculateEarnings = (shift: Shift, startTime: string, endTime: string) => {
    const rate = getPayRate(shift)
    const start = parseInt(startTime.split(':')[0])
    const end = parseInt(endTime.split(':')[0])
    const hours = end > start ? end - start : (24 - start) + end
    return (rate * hours).toFixed(2)
  }

  const getDaysUntil = (dateStr: string) => {
    const shiftDate = new Date(dateStr)
    const today = new Date()
    const diffTime = shiftDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 0) return 'Today'
    if (diffDays === 1) return 'Tomorrow'
    return `In ${diffDays} days`
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading your shifts...</p>
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
            onClick={loadShifts}
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                📅 My Shifts
              </h1>
              <p className="text-gray-600 mt-1">Your confirmed upcoming shifts</p>
            </div>
            <button
              onClick={() => router.push('/swipe')}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
            >
              Find More Shifts
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-blue-600 text-sm font-medium">Upcoming Shifts</div>
            <div className="text-3xl font-bold text-gray-800 mt-2">{upcomingShifts.length}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-green-600 text-sm font-medium">Completed Shifts</div>
            <div className="text-3xl font-bold text-gray-800 mt-2">{pastShifts.length}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-purple-600 text-sm font-medium">Total Earnings (Upcoming)</div>
            <div className="text-3xl font-bold text-green-600 mt-2">
              ${upcomingShifts.reduce((sum, s) => sum + parseFloat(calculateEarnings(s, s.start_time, s.end_time)), 0).toFixed(2)}
            </div>
          </div>
        </div>

        {/* Upcoming Shifts */}
        {upcomingShifts.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              📜 Upcoming Shifts ({upcomingShifts.length})
            </h2>
            <div className="space-y-4">
              {upcomingShifts.map((shift) => (
                <div
                  key={shift.id}
                  className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6 border-l-4 border-green-500"
                >
                  <div className="flex items-start justify-between">
                    
                    {/* Left side - Shift info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-2xl font-bold text-gray-800">
                          {shift.restaurant.name}
                        </h3>
                        <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-bold rounded-full border-2 border-green-300">
                          ✅ CONFIRMED
                        </span>
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-bold rounded-full">
                          {getDaysUntil(shift.date)}
                        </span>
                      </div>
                      
                      <div className="space-y-2 text-gray-700">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">Role:</span>
                          <span>{shift.role}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">📅</span>
                          <span className="font-semibold">{formatDate(shift.date)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">⏰</span>
                          <span>{formatTime(shift.start_time)} - {formatTime(shift.end_time)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">📍</span>
                          <span>{shift.restaurant.address}, {shift.restaurant.city}, {shift.restaurant.state}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">📞</span>
                          <span>{shift.restaurant.phone || 'Contact via app'}</span>
                        </div>
                        {shift.description && (
                          <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                            <span className="text-sm text-gray-600">{shift.description}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Right side - Pay info */}
                    <div className="text-right space-y-3 ml-6">
                      <div>
                        <div className="text-4xl font-bold text-green-600">
                          ${getPayRate(shift)}/hr
                        </div>
                        <div className="text-sm text-gray-500 mt-2">
                          Est. ${calculateEarnings(shift, shift.start_time, shift.end_time)} total
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Past Shifts */}
        {pastShifts.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              ✅ Completed Shifts ({pastShifts.length})
            </h2>
            <div className="space-y-4">
              {pastShifts.map((shift) => (
                <div
                  key={shift.id}
                  className="bg-white rounded-lg shadow p-6 opacity-75 border-l-4 border-gray-400"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">
                        {shift.restaurant.name} - {shift.role}
                      </h3>
                      <div className="text-gray-600 space-y-1">
                        <div>{formatDate(shift.date)}</div>
                        <div>{formatTime(shift.start_time)} - {formatTime(shift.end_time)}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-700">
                        ${getPayRate(shift)}/hr
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        ${calculateEarnings(shift, shift.start_time, shift.end_time)} earned
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No shifts */}
        {upcomingShifts.length === 0 && pastShifts.length === 0 && (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <div className="text-6xl mb-4">📅</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              No confirmed shifts yet
            </h3>
            <p className="text-gray-600 mb-6">
              Start swiping to apply for shifts! Once accepted by restaurants, they'll appear here.
            </p>
            <button
              onClick={() => router.push('/swipe')}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
            >
              Find Shifts Now
            </button>
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
