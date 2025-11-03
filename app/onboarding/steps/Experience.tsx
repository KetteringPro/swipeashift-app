'use client'

import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface ExperienceProps {
  nextStep: () => void
  prevStep?: () => void
}

export default function Experience({ nextStep, prevStep }: ExperienceProps) {
  const [form, setForm] = useState({
    experience_level: '',
    preferred_roles: [] as string[],
    skills: [] as string[],
    certifications: [] as string[],
    has_food_handler_card: false,
    has_alcohol_cert: false,
    willing_entry_level: false,
    about_me: ''
  })

  const [employmentHistory, setEmploymentHistory] = useState([
    { restaurant_name: '', city: '', role: '', start_date: '', end_date: '', willing_to_return: true, reason_not_returning: '' }
  ])

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const target = e.target as HTMLInputElement
    const { name, value, type } = target
    const checked = target.type === 'checkbox' ? target.checked : undefined
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleHistoryChange = (index: number, field: string, value: string | boolean) => {
    const updated = [...employmentHistory]
    // @ts-ignore
    updated[index][field] = value
    setEmploymentHistory(updated)
  }

  const addEmployer = () => {
    setEmploymentHistory(prev => [...prev, { restaurant_name: '', city: '', role: '', start_date: '', end_date: '', willing_to_return: true, reason_not_returning: '' }])
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

      const workerRes = await supabase
        .from('workers')
        .select('id')
        .eq('auth_id', user.id)
        .single()

      if (workerRes.error) throw workerRes.error
      const worker_id = workerRes.data.id

      // Insert profile
      const { error: profileError } = await supabase.from('worker_profiles').upsert([
        {
          worker_id,
          experience_level: form.experience_level,
          preferred_roles: form.preferred_roles,
          skills: form.skills,
          certifications: form.certifications,
          has_food_handler_card: form.has_food_handler_card,
          has_alcohol_cert: form.has_alcohol_cert,
          willing_entry_level: form.willing_entry_level,
          about_me: form.about_me
        }
      ])
      if (profileError) throw profileError

      // Insert employment history
      const records = employmentHistory
        .filter(emp => emp.restaurant_name.trim() !== '')
        .map(emp => ({ ...emp, worker_id }))
      if (records.length) {
        const { error: historyError } = await supabase.from('worker_employment_history').insert(records)
        if (historyError) throw historyError
      }

      nextStep()
    } catch (err: any) {
      console.error(err)
      setError('There was a problem saving your experience.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold mb-2">Work Experience & Skills</h2>

      {/* Experience Level */}
      <label className="block font-medium">Experience Level</label>
      <select
        name="experience_level"
        value={form.experience_level}
        onChange={handleChange}
        required
        className="border p-2 rounded w-full"
      >
        <option value="">Select one...</option>
        <option value="new_to_industry">New to Industry</option>
        <option value="experienced">Experienced (1–3 years)</option>
        <option value="veteran">Veteran (3+ years)</option>
      </select>

      {/* Certifications */}
      <div className="mt-3 space-y-1">
        <label className="font-medium">Certifications</label>
        <div className="flex flex-col space-y-1">
          <label>
            <input
              type="checkbox"
              name="has_food_handler_card"
              checked={form.has_food_handler_card}
              onChange={handleChange}
            />{' '}
            Food Handler Card
          </label>
          <label>
            <input
              type="checkbox"
              name="has_alcohol_cert"
              checked={form.has_alcohol_cert}
              onChange={handleChange}
            />{' '}
            Alcohol Service Certification
          </label>
        </div>
      </div>

      {/* Employment History */}
      <div className="mt-4">
        <h3 className="font-medium mb-2">Previous Employers</h3>
        {employmentHistory.map((emp, idx) => (
          <div key={idx} className="border rounded p-3 mb-2 bg-gray-50 space-y-2">
            <input
              type="text"
              placeholder="Restaurant Name"
              value={emp.restaurant_name}
              onChange={e => handleHistoryChange(idx, 'restaurant_name', e.target.value)}
              className="border p-2 rounded w-full"
            />
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="City"
                value={emp.city}
                onChange={e => handleHistoryChange(idx, 'city', e.target.value)}
                className="border p-2 rounded"
              />
              <input
                type="text"
                placeholder="Role (Server, Bartender, etc.)"
                value={emp.role}
                onChange={e => handleHistoryChange(idx, 'role', e.target.value)}
                className="border p-2 rounded"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="date"
                value={emp.start_date}
                onChange={e => handleHistoryChange(idx, 'start_date', e.target.value)}
                className="border p-2 rounded"
              />
              <input
                type="date"
                value={emp.end_date}
                onChange={e => handleHistoryChange(idx, 'end_date', e.target.value)}
                className="border p-2 rounded"
              />
            </div>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={emp.willing_to_return}
                onChange={e => handleHistoryChange(idx, 'willing_to_return', e.target.checked)}
              />
              Willing to take shifts there again?
            </label>

            {!emp.willing_to_return && (
              <input
                type="text"
                placeholder="Reason you would not return"
                value={emp.reason_not_returning}
                onChange={e => handleHistoryChange(idx, 'reason_not_returning', e.target.value)}
                className="border p-2 rounded w-full"
              />
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addEmployer}
          className="text-blue-600 text-sm mt-2 hover:underline"
        >
          + Add another employer
        </button>
      </div>

      {/* About Me */}
      <textarea
        name="about_me"
        placeholder="Tell us a bit about your work style, strengths, or goals..."
        value={form.about_me}
        onChange={handleChange}
        className="border p-2 rounded w-full h-24"
      />

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