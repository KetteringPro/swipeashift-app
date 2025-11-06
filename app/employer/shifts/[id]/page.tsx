'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

type ApplicationStatus = 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'CANCELLED'

interface Applicant {
  id: string
  status: ApplicationStatus
  source: string
  applied_at: string
  worker: {
    id: string
    first_name: string
    last_name: string
    email: string
    city: string
    state: string
    reliability_score: number
    total_shifts_completed: number
  }
}

interface ShiftDetail {
  id: string
  role: string
  date: string
  start_time: string
  end_time: string
  pay_rate: number | null
  hourly_rate_min: number | null
  hourly_rate_max: number | null
  status: string
  max_workers: number
  positions_open: number
  description: string | null
  requirements: string | null
  dress_code: string | null
  restaurant: {
    id: string
    name: string
    city: string
    state: string
  }
}

export default function ShiftApplicantsPage({ params }: { params: { id: string } }) {
  const [shift, setShift] = useState<ShiftDetail | null>(null)
  const [applicants, setApplicants] = useState<Applicant[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [processingId, setProcessingId] = useState<string | null>(null)

  const supabase = createClient()
  const router = useRouter()
  const shiftId = params.id

  useEffect(() => {
    loadShiftAndApplicants()
  }, [shiftId])

  const loadShiftAndApplicants = async () => {
    setIsLoading(true)
    setError(null)

    try {
      // Fetch shift details
      const { data: shiftData, error: shiftError } = await supabase
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
          max_workers,
          positions_open,
          description,
          requirements,
          dress_code,
          restaurant:restaurants (
            id,
            name,
            city,
            state
          )
        `)
        .eq('id', params.id)
        .single()

      if (shiftError) throw shiftError
      setShift(shiftData)

      // Fetch applicants
      const { data: applicationsData, error: applicationsError } = await supabase
        .from('shift_applications')
        .select(`
          id,
          status,
          source,
          applied_at,
          worker:workers (
            id,
            first_name,
            last_name,
            email,
            city,
            state,
            reliability_score,
            total_shifts_completed
          )
        `)
        .eq('shift_id', shiftId)
        .order('applied_at', { ascending: true })

      if (applicationsError) throw applicationsError
      setApplicants(applicationsData || [])

    } catch (err: any) {
      console.error('Error loading data:', err)
      setError(err.message || 'Failed to load applicants')
    } finally {
      setIsLoading(false)
    }
  }

  const handleAccept = async (applicationId: string) => {
    setProcessingId(applicationId)
    
    try {
      // Update application status
      const { error: updateError } = await supabase
        .from('shift_applications')
        .update({ 
          status: 'ACCEPTED',
          reviewed_at: new Date().toISOString()
        })
        .eq('id', applicationId)

      if (updateError) throw updateError

      // Update positions_open (decrement by 1)
      if (shift) {
        const newPositionsOpen = Math.max(0, shift.positions_open - 1)
        const { error: shiftError } = await supabase
          .from('shifts')
          .update({ 
            positions_open: newPositionsOpen,
            // If no positions left, mark shift as FILLED
            status: newPositionsOpen === 0 ? 'FILLED' : shift.status
          })
          .eq('id', shift.id)

        if (shiftError) throw shiftError
      }

      // Reload data
      await loadShiftAndApplicants()
      
      alert('Worker accepted! They will be notified.')

    } catch (err: any) {
      console.error('Error accepting applicant:', err)
      alert(`Error: ${err.message}`)
    } finally {
      setProcessingId(null)
    }
  }

  const handleReject = async (applicationId: string) => {
    setProcessingId(applicationId)
    
    try {
      // Update application status
      const { error: updateError } = await supabase
        .from('shift_applications')
        .update({ 
          status: 'REJECTED',
          reviewed_at: new Date().toISOString()
        })
        .eq('id', applicationId)

      if (updateError) throw updateError

      // Reload data
      await loadShiftAndApplicants()
      
      alert('Application rejected.')

    } catch (err: any) {
      console.error('Error rejecting applicant:', err)
      alert(`Error: ${err.message}`)
    } finally {
      setProcessingId(null)
    }
  }

  const getStatusColor = (status: ApplicationStatus) => {
    switch (status) {
      case 'PENDING': return 'bg-yellow-100 text-yellow-800 border-yellow-300'
      case 'ACCEPTED': return 'bg-green-100 text-green-800 border-green-300'
      case 'REJECTED': return 'bg-red-100 text-red-800 border-red-300'
      default: return 'bg-gray-100 text-gray-800 border-gray-300'
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
  const getDisplayRate = (shift: ShiftDetail) => {
    if (shift.pay_rate) return shift.pay_rate
    if (shift.hourly_rate_max) return shift.hourly_rate_max
    if (shift.hourly_rate_min) return shift.hourly_rate_min
    return 0
  }

  const pendingApplicants = applicants.filter(a => a.status === 'PENDING')
  const acceptedApplicants = applicants.filter(a => a.status === 'ACCEPTED')
  const rejectedApplicants = applicants.filter(a => a.status === 'REJECTED')

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-teal-50 to-green-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading applicants...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (error || !shift) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-teal-50 to-green-50 p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md text-center">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops!</h2>
          <p className="text-gray-600 mb-4">{error || 'Shift not found'}</p>
          <button
            onClick={() => router.push('/employer/dashboard')}
            className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
          >
            Back to Dashboard
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
          <button
            onClick={() => router.push('/employer/dashboard')}
            className="text-teal-600 hover:text-teal-800 font-medium mb-2 flex items-center gap-2"
          >
            ← Back to Dashboard
          </button>
          <h1 className="text-3xl font-bold text-gray-800 capitalize">
            {shift.role} - {formatDate(shift.date)}
          </h1>
          <p className="text-gray-600 mt-1">
            {formatTime(shift.start_time)} - {formatTime(shift.end_time)} • ${getDisplayRate(shift)}/hr
          </p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Shift Summary */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <div className="text-gray-500 text-sm font-medium">Total Applicants</div>
              <div className="text-3xl font-bold text-gray-800 mt-1">{applicants.length}</div>
            </div>
            <div>
              <div className="text-yellow-600 text-sm font-medium">Pending Review</div>
              <div className="text-3xl font-bold text-yellow-600 mt-1">{pendingApplicants.length}</div>
            </div>
            <div>
              <div className="text-green-600 text-sm font-medium">Accepted</div>
              <div className="text-3xl font-bold text-green-600 mt-1">{acceptedApplicants.length}</div>
            </div>
            <div>
              <div className="text-gray-500 text-sm font-medium">Positions</div>
              <div className="text-3xl font-bold text-gray-800 mt-1">
                {acceptedApplicants.length}/{shift.max_workers}
              </div>
            </div>
          </div>
        </div>

        {/* Pending Applicants */}
        {pendingApplicants.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              ⏳ Pending Review ({pendingApplicants.length})
            </h2>
            <div className="space-y-4">
              {pendingApplicants.map((applicant) => (
                <div
                  key={applicant.id}
                  className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6"
                >
                  <div className="flex items-start justify-between">
                    
                    {/* Worker Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-800">
                          {applicant.worker.first_name} {applicant.worker.last_name}
                        </h3>
                        {applicant.source === 'swipe_priority' && (
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded-full border border-blue-300">
                            ⭐ PRIORITY
                          </span>
                        )}
                      </div>
                      
                      <div className="text-gray-600 space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">📍</span>
                          <span>{applicant.worker.city}, {applicant.worker.state}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">⭐</span>
                          <span>{applicant.worker.reliability_score?.toFixed(1) || 'New'} rating</span>
                          <span className="mx-2">•</span>
                          <span>{applicant.worker.total_shifts_completed || 0} shifts completed</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">📧</span>
                          <span className="text-sm">{applicant.worker.email}</span>
                        </div>
                        <div className="text-sm text-gray-500 mt-2">
                          Applied {new Date(applicant.applied_at).toLocaleString('en-US', { 
                            month: 'short', 
                            day: 'numeric',
                            hour: 'numeric',
                            minute: '2-digit'
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 ml-6">
                      <button
                        onClick={() => handleReject(applicant.id)}
                        disabled={processingId === applicant.id}
                        className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {processingId === applicant.id ? 'Processing...' : 'Reject'}
                      </button>
                      <button
                        onClick={() => handleAccept(applicant.id)}
                        disabled={processingId === applicant.id || acceptedApplicants.length >= shift.max_workers}
                        className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {processingId === applicant.id ? 'Processing...' : 'Accept'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Accepted Applicants */}
        {acceptedApplicants.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              ✅ Accepted ({acceptedApplicants.length})
            </h2>
            <div className="space-y-4">
              {acceptedApplicants.map((applicant) => (
                <div
                  key={applicant.id}
                  className="bg-white rounded-lg shadow p-6 opacity-75"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">
                        {applicant.worker.first_name} {applicant.worker.last_name}
                      </h3>
                      <div className="text-gray-600 text-sm mt-1">
                        {applicant.worker.city}, {applicant.worker.state} • {applicant.worker.email}
                      </div>
                    </div>
                    <span className={`px-4 py-2 rounded-full border-2 font-medium ${getStatusColor('ACCEPTED')}`}>
                      ✅ Accepted
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Rejected Applicants */}
        {rejectedApplicants.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              ❌ Rejected ({rejectedApplicants.length})
            </h2>
            <div className="space-y-4">
              {rejectedApplicants.map((applicant) => (
                <div
                  key={applicant.id}
                  className="bg-white rounded-lg shadow p-6 opacity-50"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">
                        {applicant.worker.first_name} {applicant.worker.last_name}
                      </h3>
                      <div className="text-gray-600 text-sm mt-1">
                        {applicant.worker.city}, {applicant.worker.state}
                      </div>
                    </div>
                    <span className={`px-4 py-2 rounded-full border-2 font-medium ${getStatusColor('REJECTED')}`}>
                      ❌ Rejected
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No Applicants */}
        {applicants.length === 0 && (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <div className="text-6xl mb-4">👥</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              No applicants yet
            </h3>
            <p className="text-gray-600">
              Workers will see your shift when they browse available positions.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}