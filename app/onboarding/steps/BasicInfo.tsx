'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function BasicInfo({ nextStep }: { nextStep: () => void }) {
  const [user, setUser] = useState<any>(null)
  const [restaurants, setRestaurants] = useState<any[]>([])
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    city: '',
    state: '',
    current_employment_status: '',
    current_employer_id: '',
    custom_employer_name: '',
    start_date: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser()
      if (error) console.error(error)
      setUser(user)
    }
    fetchUser()
  }, [])

  useEffect(() => {
    // Load restaurant options
    const fetchRestaurants = async () => {
      const { data, error } = await supabase.from('restaurants').select('id, name')
      if (error) console.error(error)
      else setRestaurants(data || [])
    }
    fetchRestaurants()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    // Date validation
    if (form.start_date && new Date(form.start_date) > new Date()) {
      setError('Start date cannot be in the future.')
      return
    }

    setLoading(true)
    setError(null)

    try {
      // FIX: Handle empty string and 'other' by converting to null for UUID field
      const employerId = form.current_employer_id && form.current_employer_id !== 'other' 
        ? form.current_employer_id 
        : null;

      const { data, error } = await supabase
        .from('workers')
        .upsert(
          [
            {
              auth_id: user.id,
              email: user.email,
              first_name: form.first_name.trim(),
              last_name: form.last_name.trim(),
              phone: form.phone,
              city: form.city.trim(),
              state: form.state.trim(),
              current_employment_status: form.current_employment_status,
              current_employer_id: employerId,
              custom_employer_name: form.custom_employer_name || null
            }
          ],
          { onConflict: 'auth_id' }
        )
        .select()

      if (error) throw error

      if (form.current_employment_status === 'hospitality') {
        try {
          const workerId = data![0].id
          let restaurantName = ''
          let employerIdLocal = form.current_employer_id

          if (form.current_employer_id === 'other' && form.custom_employer_name.trim()) {
            // Insert new restaurant
            const { data: newRestaurant, error: insertRestaurantError } = await supabase
              .from('restaurants')
              .insert([{ name: form.custom_employer_name.trim() }])
              .select()
              .single()

            if (insertRestaurantError) throw insertRestaurantError

            // Append new restaurant to restaurants state and update form.current_employer_id
            setRestaurants(prev => [...prev, newRestaurant])
            employerIdLocal = newRestaurant.id
            setForm(prev => ({ ...prev, current_employer_id: newRestaurant.id }))

            restaurantName = newRestaurant.name
          } else {
            const matchedRestaurant = restaurants.find(r => r.id === employerIdLocal)
            restaurantName = matchedRestaurant ? matchedRestaurant.name : ''
          }

          const { error: insertError } = await supabase
            .from('worker_employment_history')
            .insert([
              {
                worker_id: workerId,
                restaurant_name: restaurantName,
                city: form.city.trim(),
                start_date: form.start_date || null,
                end_date: null
              }
            ])

          if (insertError) throw insertError
        } catch (err) {
          throw err
        }
      }

      console.log('Worker record saved:', data)
      nextStep()
    } catch (err: any) {
      console.error('Supabase error details:', err)
      setError(err.message || 'There was a problem saving your information.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold mb-2">Basic Information</h2>

      <div className="grid grid-cols-2 gap-4">
        <input type="text" name="first_name" placeholder="First Name" value={form.first_name} onChange={handleChange} required className="border p-2 rounded" />
        <input type="text" name="last_name" placeholder="Last Name" value={form.last_name} onChange={handleChange} required className="border p-2 rounded" />
      </div>

      <input type="tel" name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} className="border p-2 rounded w-full" />

      <div className="grid grid-cols-2 gap-4">
        <input type="text" name="city" placeholder="City" value={form.city} onChange={handleChange} required className="border p-2 rounded" />
        <input type="text" name="state" placeholder="State" value={form.state} onChange={handleChange} required className="border p-2 rounded" />
      </div>

      <label className="block font-medium mt-4">Current Employment Status</label>
      <select name="current_employment_status" value={form.current_employment_status} onChange={handleChange} required className="border p-2 rounded w-full">
        <option value="">Select one...</option>
        <option value="hospitality">I currently work in a restaurant or hospitality venue</option>
        <option value="other_industry">I work in another industry</option>
        <option value="unemployed">I'm not currently employed</option>
      </select>

      {form.current_employment_status === 'hospitality' && (
        <>
          <label className="block font-medium mt-4">Current Employer</label>
          <select
            name="current_employer_id"
            value={form.current_employer_id}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          >
            <option value="">Select a restaurant...</option>
            {restaurants.map(r => (
              <option key={r.id} value={r.id}>{r.name}</option>
            ))}
            <option value="other">Other (not listed)</option>
          </select>

          {form.current_employer_id === 'other' && (
            <input
              type="text"
              name="custom_employer_name"
              placeholder="Enter restaurant name"
              value={form.custom_employer_name}
              onChange={handleChange}
              className="border p-2 rounded w-full mt-2"
            />
          )}

          <label className="block font-medium mt-4">Start Date</label>
          <input
            type="date"
            name="start_date"
            value={form.start_date}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            max={new Date().toISOString().split('T')[0]} // prevents selecting a future date
          />
        </>
      )}

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <div className="flex justify-end mt-6">
        <button type="submit" disabled={loading} className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
          {loading ? 'Saving...' : 'Next →'}
        </button>
      </div>
    </form>
  )
}
