'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

interface Restaurant {
  id: string
  name: string
}

export default function PostShiftPage() {
  const router = useRouter()
  const supabase = createClient()

  const [user, setUser] = useState<any>(null)
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    restaurant_id: '',
    role: '',
    shift_date: '',
    start_time: '',
    end_time: '',
    hourly_rate_min: '',
    hourly_rate_max: '',
    description: '',
    requirements: '',
    dress_code: '',
    max_workers: '1',
  })

  // Fetch authenticated user and their restaurants
  useEffect(() => {
    const fetchUserAndRestaurants = async () => {
      const { data: { user }, error: userError } = await supabase.auth.getUser()
      if (userError || !user) {
        router.push('/auth/employer/signin?redirect=/employer/post-shift')
        return
      }
      setUser(user)

      // TEMPORARY: Get first restaurant (same as dashboard does)
      // TODO: Properly link users to restaurants via restaurant_users table
      const { data: restaurantList, error: restError } = await supabase
        .from('restaurants')
        .select('id, name')
        .limit(1)

      if (!restError && restaurantList && restaurantList.length > 0) {
        setRestaurants(restaurantList)
        // Auto-select the first (and only) restaurant
        setFormData(prev => ({ ...prev, restaurant_id: restaurantList[0].id }))
      } else {
        setError('No restaurant found. Please contact support.')
      }
    }
    fetchUserAndRestaurants()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const validateForm = () => {
    // Check required fields
    if (!formData.restaurant_id) {
      setError('Please select a restaurant')
      return false
    }
    if (!formData.role) {
      setError('Please select a role')
      return false
    }
    if (!formData.shift_date) {
      setError('Please select a shift date')
      return false
    }
    if (!formData.start_time || !formData.end_time) {
      setError('Please provide start and end times')
      return false
    }
    if (!formData.hourly_rate_min || !formData.hourly_rate_max) {
      setError('Please provide hourly rate range')
      return false
    }

    // Validate shift date is not in the past
    const shiftDate = new Date(formData.shift_date)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    if (shiftDate < today) {
      setError('Shift date cannot be in the past')
      return false
    }

    // Validate time range
    if (formData.start_time >= formData.end_time) {
      setError('End time must be after start time')
      return false
    }

    // Validate rate range
    const minRate = parseFloat(formData.hourly_rate_min)
    const maxRate = parseFloat(formData.hourly_rate_max)
    if (minRate <= 0 || maxRate <= 0) {
      setError('Hourly rates must be greater than 0')
      return false
    }
    if (minRate > maxRate) {
      setError('Maximum rate must be greater than or equal to minimum rate')
      return false
    }
    if (minRate < 15) {
      setError('Minimum rate must be at least $15/hr (state minimum wage)')
      return false
    }

    // Validate max workers
    const maxWorkers = parseInt(formData.max_workers)
    if (maxWorkers < 1 || maxWorkers > 50) {
      setError('Max workers must be between 1 and 50')
      return false
    }

    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!validateForm()) return

    setLoading(true)

    try {
      const shiftData = {
        restaurant_id: formData.restaurant_id,
        role: formData.role,
        date: formData.shift_date,
        start_time: formData.start_time,
        end_time: formData.end_time,
        hourly_rate_min: parseFloat(formData.hourly_rate_min),
        hourly_rate_max: parseFloat(formData.hourly_rate_max),
        description: formData.description.trim() || null,
        requirements: formData.requirements.trim() || null,
        dress_code: formData.dress_code.trim() || null,
        max_workers: parseInt(formData.max_workers),
        positions_open: parseInt(formData.max_workers), // Set positions_open = max_workers initially
        status: 'OPEN',
        posted_by: user.id,
      }

      const { data, error: insertError } = await supabase
        .from('shifts')
        .insert([shiftData])
        .select()
        .single()

      if (insertError) throw insertError

      console.log('✅ Shift posted successfully:', data)
      
      // Redirect to employer dashboard
      router.push('/employer/dashboard?success=shift_posted')
    } catch (err: any) {
      console.error('Error posting shift:', err)
      setError(err.message || 'Failed to post shift. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const roleOptions = [
    'Server',
    'Bartender',
    'Host/Hostess',
    'Busser',
    'Line Cook',
    'Prep Cook',
    'Dishwasher',
    'Barback',
    'Food Runner',
    'Expeditor',
    'Sous Chef',
    'Kitchen Manager',
    'General Manager',
  ]

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-600">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Post a Shift</h1>
            <p className="text-gray-600">Fill out the details below to post a new shift opportunity</p>
            {restaurants.length > 0 && (
              <p className="text-sm text-teal-600 mt-2">📍 Posting for: {restaurants[0].name}</p>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Restaurant Selection - HIDDEN when auto-selected */}
            {restaurants.length > 1 && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Restaurant <span className="text-red-500">*</span>
                </label>
                <select
                  name="restaurant_id"
                  value={formData.restaurant_id}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
                >
                  <option value="">Select a restaurant</option>
                  {restaurants.map(r => (
                    <option key={r.id} value={r.id}>{r.name}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Role */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Role <span className="text-red-500">*</span>
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
              >
                <option value="">Select a role</option>
                {roleOptions.map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Shift Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="shift_date"
                value={formData.shift_date}
                onChange={handleChange}
                required
                min={new Date().toISOString().split('T')[0]}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
              />
            </div>

            {/* Time Range */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Start Time <span className="text-red-500">*</span>
                </label>
                <input
                  type="time"
                  name="start_time"
                  value={formData.start_time}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  End Time <span className="text-red-500">*</span>
                </label>
                <input
                  type="time"
                  name="end_time"
                  value={formData.end_time}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
                />
              </div>
            </div>

            {/* Hourly Rate Range */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Hourly Rate Range <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Minimum ($/hr)</label>
                  <input
                    type="number"
                    name="hourly_rate_min"
                    value={formData.hourly_rate_min}
                    onChange={handleChange}
                    required
                    min="15"
                    step="0.50"
                    placeholder="20.00"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Maximum ($/hr)</label>
                  <input
                    type="number"
                    name="hourly_rate_max"
                    value={formData.hourly_rate_max}
                    onChange={handleChange}
                    required
                    min="15"
                    step="0.50"
                    placeholder="30.00"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
                  />
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                💡 Dynamic pricing will adjust rates based on demand. Set a range you're comfortable with.
              </p>
            </div>

            {/* Max Workers */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Number of Workers Needed <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="max_workers"
                value={formData.max_workers}
                onChange={handleChange}
                required
                min="1"
                max="50"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Shift Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                placeholder="Describe the shift, responsibilities, and what workers should expect..."
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition resize-none"
              />
            </div>

            {/* Requirements */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Requirements
              </label>
              <textarea
                name="requirements"
                value={formData.requirements}
                onChange={handleChange}
                rows={3}
                placeholder="Required experience, certifications, or skills..."
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition resize-none"
              />
            </div>

            {/* Dress Code */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Dress Code
              </label>
              <input
                type="text"
                name="dress_code"
                value={formData.dress_code}
                onChange={handleChange}
                placeholder="e.g., Black pants, white shirt, non-slip shoes"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
              />
            </div>

            {/* Error Display */}
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm font-medium">{error}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Posting...' : 'Post Shift →'}
              </button>
            </div>
          </form>
        </div>

        {/* Help Text */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Need help? <a href="/support" className="text-teal-600 hover:text-teal-700 font-semibold">Contact Support</a>
          </p>
        </div>
      </div>
    </div>
  )
}
