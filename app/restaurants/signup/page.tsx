'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../../lib/supabaseClient'

interface RestaurantOption {
  id: string
  name: string
}

export default function RestaurantSignup() {
  const router = useRouter()

  // Existing form fields
  const [formData, setFormData] = useState({
    contact_name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    password: '',
  })

  // Business selector state
  const [restaurants, setRestaurants] = useState<RestaurantOption[]>([])
  const [selectedRestaurantId, setSelectedRestaurantId] = useState('')
  const [newBusinessName, setNewBusinessName] = useState('')

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Fetch existing restaurants for dropdown
  useEffect(() => {
    const fetchRestaurants = async () => {
      const { data, error } = await supabase
        .from('restaurants')
        .select('id, name')
        .order('name', { ascending: true })
      if (!error && data) setRestaurants(data as RestaurantOption[])
    }
    fetchRestaurants()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // Basic validation
    if (!selectedRestaurantId) {
      setError('Please select your business (or choose Other to add it).')
      return
    }
    if (selectedRestaurantId === 'other' && !newBusinessName.trim()) {
      setError('Please enter the new business name.')
      return
    }

    setLoading(true)

    try {
      // 1) Create Auth user
      const { error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      })
      if (signUpError) throw signUpError

      // Grab the authenticated user (id used for joins)
      const { data: userData, error: userErr } = await supabase.auth.getUser()
      if (userErr) throw userErr
      const user = userData?.user
      if (!user) throw new Error('Could not obtain authenticated user after signup.')

      // 2) Upsert/insert restaurant
      let restaurantId: string | null = null

      if (selectedRestaurantId !== 'other') {
        // Update selected existing restaurant and mark it registered
        const { error: updateError } = await supabase
          .from('restaurants')
          .update({
            contact_name: formData.contact_name,
            email: formData.email,
            phone: formData.phone,
            address: formData.address,
            city: formData.city,
            state: formData.state,
            zip: formData.zip,
            is_registered: true,
          })
          .eq('id', selectedRestaurantId)
        if (updateError) throw updateError
        restaurantId = selectedRestaurantId
      } else {
        // Insert a brand new restaurant
        const { data: inserted, error: insertErr } = await supabase
          .from('restaurants')
          .insert([
            {
              name: newBusinessName.trim(),
              contact_name: formData.contact_name,
              email: formData.email,
              phone: formData.phone,
              address: formData.address,
              city: formData.city,
              state: formData.state,
              zip: formData.zip,
              is_registered: true,
            },
          ])
          .select('id')
          .single()
        if (insertErr) throw insertErr
        restaurantId = inserted?.id ?? null
      }

      if (!restaurantId) throw new Error('Failed to resolve restaurant id.')

      // 3) Link the user to the restaurant as OWNER (first registrant)
      const { error: linkErr } = await supabase
        .from('restaurant_users')
        .insert([
          {
            restaurant_id: restaurantId,
            auth_id: user.id,
            role: 'owner',
          },
        ])
      if (linkErr) throw linkErr

      // 4) Go to dashboard
      router.push('/restaurants/dashboard')
    } catch (err: any) {
      console.error(err)
      setError(err.message || 'There was a problem completing signup.')
    } finally {
      setLoading(false)
    }
  }

  const isOther = selectedRestaurantId === 'other'

  return (
    <div className="w-full max-w-md mx-auto bg-white bg-opacity-95 rounded-xl shadow-xl p-8">
      <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Register Your Restaurant
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Business selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Business Name</label>
          <select
            name="restaurant_id"
            value={selectedRestaurantId}
            onChange={(e) => setSelectedRestaurantId(e.target.value)}
            className="w-full border rounded p-2"
            required
          >
            <option value="">Select a business</option>
            {restaurants.map((r) => (
              <option key={r.id} value={r.id}>{r.name}</option>
            ))}
            <option value="other">Other (not listed)</option>
          </select>
        </div>

        {isOther && (
          <div>
            <label className="block text-sm font-medium text-gray-700">New Business Name</label>
            <input
              type="text"
              name="newBusinessName"
              value={newBusinessName}
              onChange={(e) => setNewBusinessName(e.target.value)}
              className="w-full border rounded p-2"
              placeholder="Enter business name"
              required
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700">Contact Name</label>
          <input
            type="text"
            name="contact_name"
            value={formData.contact_name}
            onChange={handleChange}
            required
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">State</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Zip</label>
          <input
            type="text"
            name="zip"
            value={formData.zip}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full border rounded p-2"
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="bg-slate-700 text-white px-4 py-2 rounded w-full hover:bg-slate-800 disabled:opacity-60"
        >
          {loading ? 'Registering...' : 'Create Account →'}
        </button>
      </form>
    </div>
  )
}
