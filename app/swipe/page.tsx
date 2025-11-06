'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { calculateWorkerRate } from '@/lib/utils/calculateWorkerRate'

interface Restaurant {
  id: string
  name: string
  city: string
  state: string
  reliability_score: number
}

interface Shift {
  id: string
  role: string
  date: string
  start_time: string
  end_time: string
  hourly_rate_min: number
  hourly_rate_max: number
  positions_open: number
  max_workers: number
  description: string | null
  requirements: string | null
  restaurant: Restaurant
}

interface ShiftWithRate extends Shift {
  calculated_rate: number
  boost_description: string
}

export default function SwipePage() {
  const [shifts, setShifts] = useState<ShiftWithRate[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [workerId, setWorkerId] = useState<string | null>(null)
  const [isApplying, setIsApplying] = useState(false)

  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    loadShiftsAndWorker()
  }, [])

  const loadShiftsAndWorker = async () => {
    setIsLoading(true)
    setError(null)

    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/auth/worker/signin')
        return
      }

      // Get worker profile
      const { data: worker, error: workerError } = await supabase
        .from('workers')
        .select('id')
        .eq('auth_id', user.id)
        .single()

      if (workerError) throw workerError
      if (!worker) throw new Error('Worker profile not found')

      setWorkerId(worker.id)

      // Fetch open shifts
      const { data: shiftsData, error: shiftsError } = await supabase
        .from('shifts')
        .select(`
          id,
          role,
          date,
          start_time,
          end_time,
          hourly_rate_min,
          hourly_rate_max,
          positions_open,
          max_workers,
          description,
          requirements,
          restaurant:restaurants (
            id,
            name,
            city,
            state,
            reliability_score
          )
        `)
        .eq('status', 'OPEN')
        .gte('date', new Date().toISOString().split('T')[0])
        .order('date', { ascending: true })

      if (shiftsError) throw shiftsError

      // Filter out shifts already applied to
      const { data: applications } = await supabase
        .from('shift_applications')
        .select('shift_id')
        .eq('worker_id', worker.id)

      const appliedShiftIds = new Set(applications?.map(a => a.shift_id) || [])
      const availableShifts = (shiftsData || []).filter(shift => !appliedShiftIds.has(shift.id))

      // Calculate rates for each shift
      const shiftsWithRates = await Promise.all(
        availableShifts.map(async (shift) => {
          // Get application counts for demand calculation
          const { data: appData } = await supabase
            .from('shift_applications')
            .select('status')
            .eq('shift_id', shift.id)

          const pending = appData?.filter(a => a.status === 'PENDING').length || 0
          const accepted = appData?.filter(a => a.status === 'ACCEPTED').length || 0

          // Calculate worker rate in real-time
          const rateCalc = calculateWorkerRate(shift, { pending, accepted })

          return {
            ...shift,
            calculated_rate: rateCalc.workerRate,
            boost_description: rateCalc.reason.join(' + ') || 'Standard rate'
          }
        })
      )

      setShifts(shiftsWithRates)

    } catch (err: any) {
      console.error('Error loading shifts:', err)
      setError(err.message || 'Failed to load shifts')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSwipe = async (direction: 'left' | 'right') => {
    if (!workerId || currentIndex >= shifts.length || isApplying) return

    const currentShift = shifts[currentIndex]

    // Record swipe
    await supabase
      .from('shift_swipes')
      .insert({
        worker_id: workerId,
        shift_id: currentShift.id,
        direction: direction
      })

    // If swiping right, create application with LOCKED RATE
    if (direction === 'right') {
      setIsApplying(true)
      
      try {
        const { error: applyError } = await supabase
          .from('shift_applications')
          .insert({
            shift_id: currentShift.id,
            worker_id: workerId,
            status: 'PENDING',
            source: 'swipe',
            locked_rate: currentShift.calculated_rate  // LOCK THE RATE!
          })

        if (applyError) throw applyError

        // Show success message briefly
        alert(`Applied! Rate locked at $${currentShift.calculated_rate}/hr`)

      } catch (err: any) {
        console.error('Error applying:', err)
        alert(`Error: ${err.message}`)
      } finally {
        setIsApplying(false)
      }
    }

    // Move to next shift
    setCurrentIndex(currentIndex + 1)
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

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-teal-50 to-green-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading shifts...</p>
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
            onClick={loadShiftsAndWorker}
            className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  // No shifts available
  if (shifts.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-teal-50 to-green-50 p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">All caught up!</h2>
          <p className="text-gray-600 mb-4">
            You've seen all available shifts. Check back later for new opportunities!
          </p>
          <button
            onClick={() => router.push('/dashboard')}
            className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
          >
            View My Applications
          </button>
        </div>
      </div>
    )
  }

  // All shifts swiped
  if (currentIndex >= shifts.length) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-teal-50 to-green-50 p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md text-center">
          <div className="text-6xl mb-4">✅</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">No more shifts!</h2>
          <p className="text-gray-600 mb-4">
            You've reviewed all available shifts for now.
          </p>
          <button
            onClick={() => router.push('/dashboard')}
            className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
          >
            View My Applications
          </button>
        </div>
      </div>
    )
  }

  const currentShift = shifts[currentIndex]

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-green-50 flex items-center justify-center p-4">
      
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-teal-700">🍽️ SwipeAShift</h1>
        </div>
        <div className="text-gray-600 font-medium">
          {shifts.length - currentIndex} shifts remaining
        </div>
      </div>

      {/* Shift Card */}
      <div className="w-full max-w-md mt-16">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          
          {/* Card Header */}
          <div className="bg-gradient-to-r from-teal-600 to-blue-600 p-6 text-white">
            <h2 className="text-3xl font-bold mb-2">{currentShift.role}</h2>
            <p className="text-lg opacity-90">{currentShift.restaurant.name}</p>
            <p className="text-sm opacity-75">
              {currentShift.restaurant.city}, {currentShift.restaurant.state}
            </p>
          </div>

          {/* Card Body */}
          <div className="p-6">
            
            {/* Date & Time */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">📅</span>
                <span className="font-semibold text-gray-800">{formatDate(currentShift.date)}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">⏰</span>
                <span className="font-semibold text-gray-800">
                  {formatTime(currentShift.start_time)} - {formatTime(currentShift.end_time)}
                </span>
              </div>
            </div>

            {/* CALCULATED RATE - This is what worker sees */}
            <div className="bg-gradient-to-r from-green-50 to-teal-50 border-2 border-green-300 rounded-lg p-4 mb-4">
              <div className="text-sm text-gray-600 font-medium mb-1">Your Hourly Rate</div>
              <div className="text-4xl font-bold text-green-700">
                ${currentShift.calculated_rate}/hr
              </div>
              {currentShift.boost_description && currentShift.boost_description !== 'Standard rate' && (
                <div className="text-xs text-green-600 mt-2 font-medium">
                  🔥 {currentShift.boost_description}
                </div>
              )}
            </div>

            {/* Restaurant Rating */}
            <div className="mb-4">
              <div className="text-sm text-gray-600 mb-1">Restaurant Rating:</div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400">⭐</span>
                ))}
                <span className="ml-2 text-gray-700 font-semibold">
                  {currentShift.restaurant.reliability_score.toFixed(1)}
                </span>
              </div>
            </div>

            {/* Description */}
            {currentShift.description && (
              <div className="mb-4">
                <div className="text-sm text-gray-600 font-medium mb-1">Details:</div>
                <p className="text-gray-700">{currentShift.description}</p>
              </div>
            )}

            {/* Requirements */}
            {currentShift.requirements && (
              <div className="mb-4">
                <div className="text-sm text-gray-600 font-medium mb-1">Requirements:</div>
                <p className="text-gray-700">{currentShift.requirements}</p>
              </div>
            )}

            {/* Positions */}
            <div className="text-sm text-gray-600">
              {currentShift.positions_open} position{currentShift.positions_open !== 1 ? 's' : ''} available
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 p-6 bg-gray-50 border-t">
            <button
              onClick={() => handleSwipe('left')}
              disabled={isApplying}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-red-500 hover:bg-red-600 text-white rounded-lg font-bold text-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="text-2xl">👈</span>
              <span>Pass</span>
            </button>

            <button
              onClick={() => handleSwipe('right')}
              disabled={isApplying}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-green-500 hover:bg-green-600 text-white rounded-lg font-bold text-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isApplying ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Applying...</span>
                </>
              ) : (
                <>
                  <span>Apply</span>
                  <span className="text-2xl">👍</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}