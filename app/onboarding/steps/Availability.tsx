'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface AvailabilityProps {
  nextStep: () => void
  prevStep: () => void
}

const daysOfWeek = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
]

interface DayAvailability {
  day_of_week: string
  available: boolean
  start_time: string
  end_time: string
}

export default function Availability({ nextStep, prevStep }: AvailabilityProps) {
  const [availability, setAvailability] = useState<DayAvailability[]>(
    daysOfWeek.map(day => ({
      day_of_week: day,
      available: false,
      start_time: '',
      end_time: ''
    }))
  )
  const [flexibility, setFlexibility] = useState('fixed')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleToggle = (day: string) => {
    setAvailability(prev =>
      prev.map(d =>
        d.day_of_week === day ? { ...d, available: !d.available } : d
      )
    )
  }

  const handleTimeChange = (day: string, field: 'start_time' | 'end_time', value: string) => {
    setAvailability(prev =>
      prev.map(d =>
        d.day_of_week === day ? { ...d, [field]: value } : d
      )
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const {
        data: { user },
        error: userError
      } = await supabase.auth.getUser()
      if (userError || !user) throw userError

      const { data: workerData, error: workerErr } = await supabase
        .from('workers')
        .select('id')
        .eq('auth_id', user.id)
        .single()
      if (workerErr) throw workerErr

      const worker_id = workerData.id

      // Remove existing rows (so resubmissions don't duplicate)
      await supabase.from('worker_availability').delete().eq('worker_id', worker_id)

      // Filter only active days
      const records = availability
        .filter(a => a.available)
        .map(a => ({
          ...a,
          worker_id,
          flexibility
        }))

      if (records.length) {
        const { error: insertError } = await supabase
          .from('worker_availability')
          .insert(records)
        if (insertError) throw insertError
      }

      nextStep()
    } catch (err: any) {
      console.error(err)
      setError('There was a problem saving your availability.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const saved = localStorage.getItem('availability_flexibility')
    if (saved) setFlexibility(saved)
  }, [])

  const handleFlexibility = (value: string) => {
    setFlexibility(value)
    localStorage.setItem('availability_flexibility', value)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold mb-2">Availability & Schedule</h2>

      <p className="text-sm text-gray-600 mb-2">
        Specify when you’re available for shifts. Only days marked “available” will be visible to restaurants.
      </p>

      {/* Weekly Availability Grid */}
      <div className="overflow-x-auto border rounded-lg">
        <table className="w-full text-sm border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-2">Day</th>
              <th className="text-left p-2">Available</th>
              <th className="text-left p-2">Start Time</th>
              <th className="text-left p-2">End Time</th>
            </tr>
          </thead>
          <tbody>
            {availability.map(day => (
              <tr key={day.day_of_week} className="border-t">
                <td className="p-2">{day.day_of_week}</td>
                <td className="p-2">
                  <input
                    type="checkbox"
                    checked={day.available}
                    onChange={() => handleToggle(day.day_of_week)}
                  />
                </td>
                <td className="p-2">
                  <input
                    type="time"
                    value={day.start_time || ''}
                    placeholder="--:--"
                    onChange={e =>
                      handleTimeChange(day.day_of_week, 'start_time', e.target.value)
                    }
                    className="border p-1 rounded w-28"
                    disabled={!day.available}
                  />
                </td>
                <td className="p-2">
                  <input
                    type="time"
                    value={day.end_time || ''}
                    placeholder="--:--"
                    onChange={e =>
                      handleTimeChange(day.day_of_week, 'end_time', e.target.value)
                    }
                    className="border p-1 rounded w-28"
                    disabled={!day.available}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Flexibility */}
      <div className="mt-4">
        <label className="font-medium block mb-1">Schedule Flexibility</label>
        <select
          value={flexibility}
          onChange={e => handleFlexibility(e.target.value)}
          className="border p-2 rounded w-full"
        >
          <option value="fixed">Fixed – I only work these times</option>
          <option value="occasional">Occasional – I can sometimes pick up extra shifts</option>
          <option value="variable">Variable – My schedule changes weekly</option>
        </select>
      </div>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <div className="flex justify-between mt-6">
        <button
          type="button"
          onClick={prevStep}
          className="bg-gray-200 px-6 py-2 rounded hover:bg-gray-300"
        >
          ← Back
        </button>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? 'Saving...' : 'Next →'}
        </button>
      </div>
    </form>
  )
}