'use client'

import { useState, useEffect } from 'react'
import { SwipeCard } from '@/components/SwipeCard'
import type { ShiftCardData, SwipeDirection } from '@/types/database.types'
import { createClient } from '@/lib/supabase/client'

export default function SwipeShiftsPage() {
  const [shifts, setShifts] = useState<ShiftCardData[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const supabase = createClient()
  const currentShift = shifts[currentIndex]

  // Load shifts on mount
  useEffect(() => {
    loadShifts()
  }, [])

  // Preload next batch when running low
  useEffect(() => {
    if (shifts.length - currentIndex <= 3) {
      loadMoreShifts()
    }
  }, [currentIndex, shifts.length])

  const loadShifts = async () => {
    setIsLoading(true)
    setError(null)
    
    try {
      // TEMPORARY: Bypass auth for testing
      // Get the first worker from database
      const { data: worker, error: workerError } = await supabase
        .from('workers')
        .select('id, location, max_commute_miles, city, state')
        .limit(1)
        .maybeSingle()
      
      if (workerError) throw workerError
      if (!worker) throw new Error('Worker profile not found')

      // Get shifts already swiped on
      const { data: swipedShifts, error: swipesError } = await supabase
        .from('shift_swipes')
        .select('shift_id')
        .eq('worker_id', worker.id)
      
      if (swipesError) throw swipesError

      const swipedShiftIds = swipedShifts?.map(s => s.shift_id) || []

      // Fetch available shifts
      let query = supabase
        .from('shifts')
        .select(`
          *,
          restaurant:restaurants!inner (
            id,
            name,
            city,
            state,
            location,
            reliability_score
          )
        `)
        .eq('status', 'OPEN')
        .gte('date', new Date().toISOString().split('T')[0]) // Today or later
        .order('date', { ascending: true })
        .order('start_time', { ascending: true })
        .limit(20)

      // Exclude already swiped shifts
      if (swipedShiftIds.length > 0) {
        query = query.not('id', 'in', `(${swipedShiftIds.join(',')})`)
      }

      const { data: shiftsData, error: shiftsError } = await query

      if (shiftsError) throw shiftsError

      // Format the data
      const formattedShifts: ShiftCardData[] = (shiftsData || []).map(shift => ({
        ...shift,
        restaurant: shift.restaurant,
        distance_miles: calculateDistance(worker, shift.restaurant)
      }))

      setShifts(formattedShifts)
      
    } catch (err: any) {
      console.error('Error loading shifts:', err)
      setError(err.message || 'Failed to load shifts')
    } finally {
      setIsLoading(false)
    }
  }

  const loadMoreShifts = async () => {
    // Similar to loadShifts but append to existing
    // Implementation would fetch next page
    console.log('Loading more shifts...')
  }

  const calculateDistance = (worker: any, restaurant: any): number | undefined => {
    // Simplified distance calculation
    // In production, use PostGIS ST_Distance
    if (!worker.city || !restaurant.city) return undefined
    if (worker.city === restaurant.city) return 5 // Same city approximation
    return 15 // Different city approximation
  }

  const handleSwipe = async (direction: SwipeDirection) => {
    if (!currentShift) return

    try {
      // TEMPORARY: Use first worker for testing
      const { data: worker } = await supabase
        .from('workers')
        .select('id')
        .limit(1)
        .maybeSingle()

      if (!worker) throw new Error('Worker profile not found')

      // Calculate swipe context
      const swipeContext = {
        distance_miles: currentShift.distance_miles,
        pay_rate: currentShift.pay_rate,
        time_to_start: calculateTimeToStart(currentShift)
      }

      // Record the swipe
      const { error: swipeError } = await supabase
        .from('shift_swipes')
        .insert({
          worker_id: worker.id,
          shift_id: currentShift.id,
          direction,
          swipe_context: swipeContext
        })

      if (swipeError) throw swipeError

      // The trigger will automatically create application if right/up swipe
      
      // Show feedback
      if (direction === 'right' || direction === 'up') {
        console.log('Applied to shift!', direction === 'up' ? '(Priority)' : '')
      }

    } catch (err: any) {
      console.error('Error recording swipe:', err)
      setError(err.message)
    }
  }

  const calculateTimeToStart = (shift: ShiftCardData): number => {
    const shiftDateTime = new Date(`${shift.date}T${shift.start_time}`)
    const now = new Date()
    const hoursToStart = (shiftDateTime.getTime() - now.getTime()) / (1000 * 60 * 60)
    return Math.round(hoursToStart)
  }

  const handleSwipeComplete = () => {
    // Move to next card
    setCurrentIndex(prev => prev + 1)
  }

  const handleUndo = async () => {
    if (currentIndex === 0) return // Can't undo if we're at the first card

    try {
      // Get the previous shift
      const previousShift = shifts[currentIndex - 1]
      if (!previousShift) return

      // Get worker
      const { data: worker } = await supabase
        .from('workers')
        .select('id')
        .limit(1)
        .maybeSingle()

      if (!worker) {
        console.error('Worker not found for undo')
        return
      }

      // Delete the swipe record
      const { error: deleteSwipeError } = await supabase
        .from('shift_swipes')
        .delete()
        .eq('worker_id', worker.id)
        .eq('shift_id', previousShift.id)

      if (deleteSwipeError) {
        console.error('Error deleting swipe:', deleteSwipeError)
        return
      }

      // Delete any application that was created (trigger handles this automatically via CASCADE)
      // But we'll explicitly delete to be sure
      const { error: deleteAppError } = await supabase
        .from('shift_applications')
        .delete()
        .eq('worker_id', worker.id)
        .eq('shift_id', previousShift.id)

      if (deleteAppError) {
        console.error('Error deleting application:', deleteAppError)
        // Don't return - the swipe is already deleted, so we can still undo
      }

      // Move back to previous card
      setCurrentIndex(prev => prev - 1)
      
      console.log('Undo successful - swipe deleted')

    } catch (err: any) {
      console.error('Error in undo:', err)
      setError('Failed to undo swipe')
    }
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading shifts...</p>
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

  // No more shifts
  if (!currentShift) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            You've Seen All Available Shifts!
          </h2>
          <p className="text-gray-600 mb-4">
            Check back later for new opportunities, or view your applications.
          </p>
          <div className="space-y-2">
            <button
              onClick={loadShifts}
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
            >
              Refresh Shifts
            </button>
            <button
              onClick={() => window.location.href = '/dashboard'}
              className="w-full px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition font-medium"
            >
              View My Applications
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Main swipe interface
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      
      {/* Header */}
      <header className="max-w-md mx-auto mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">
          🌊 SwipeAShift
        </h1>
        <div className="text-sm text-gray-600">
          {shifts.length - currentIndex} shifts remaining
        </div>
      </header>

      {/* Swipe Card Stack */}
      <div className="relative max-w-md mx-auto" style={{ height: '600px' }}>
        
        {/* Next cards (stack preview) */}
        {shifts.slice(currentIndex + 1, currentIndex + 3).map((shift, index) => (
          <div
            key={shift.id}
            className="absolute w-full h-full"
            style={{
              zIndex: -index - 1,
              transform: `scale(${1 - (index + 1) * 0.05}) translateY(${(index + 1) * -10}px)`,
              opacity: 1 - (index + 1) * 0.3
            }}
          >
            <div className="w-full h-full bg-white rounded-2xl shadow-lg"></div>
          </div>
        ))}

        {/* Current card */}
        {currentShift && (
          <SwipeCard
            key={currentShift.id}
            shift={currentShift}
            onSwipe={handleSwipe}
            onSwipeComplete={handleSwipeComplete}
          />
        )}
      </div>

      {/* Action Buttons (alternative to swipe) */}
      <div className="max-w-md mx-auto mt-6 flex items-center justify-center gap-4">
        
        {/* Undo */}
        {currentIndex > 0 && (
          <button
            onClick={handleUndo}
            className="p-4 bg-yellow-500 hover:bg-yellow-600 text-white rounded-full shadow-lg transition-transform hover:scale-110"
            title="Undo"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
            </svg>
          </button>
        )}

        {/* Pass */}
        <button
          onClick={() => {
            handleSwipe('left')
            handleSwipeComplete()
          }}
          className="p-5 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg transition-transform hover:scale-110"
          title="Pass"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Super Like */}
        <button
          onClick={() => {
            handleSwipe('up')
            handleSwipeComplete()
          }}
          className="p-5 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg transition-transform hover:scale-110"
          title="Priority Apply"
        >
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        </button>

        {/* Like */}
        <button
          onClick={() => {
            handleSwipe('right')
            handleSwipeComplete()
          }}
          className="p-5 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg transition-transform hover:scale-110"
          title="Apply"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </button>
      </div>

      {/* Tips */}
      <div className="max-w-md mx-auto mt-8 text-center text-sm text-gray-500">
        <p>👈 Swipe left to pass • 👉 Swipe right to apply • 👆 Swipe up for priority</p>
      </div>

    </div>
  )
}
