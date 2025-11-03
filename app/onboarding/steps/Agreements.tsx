'use client'

import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface AgreementsProps {
  nextStep: () => void
  prevStep: () => void
}

export default function Agreements({ nextStep, prevStep }: AgreementsProps) {
  const [form, setForm] = useState({
    code_of_conduct_ack: false,
    insurance_ack: false,
    privacy_ack: false,
    non_solicitation_ack: false,
    digital_signature: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = e.target
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
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

      const { error: insertError } = await supabase.from('worker_agreements').upsert([
        {
          worker_id,
          code_of_conduct_ack: form.code_of_conduct_ack,
          insurance_ack: form.insurance_ack,
          privacy_ack: form.privacy_ack,
          non_solicitation_ack: form.non_solicitation_ack,
          digital_signature: form.digital_signature,
          signed_at: new Date().toISOString()
        }
      ])
      if (insertError) throw insertError

      nextStep()
    } catch (err: any) {
      console.error(err)
      setError('There was a problem saving your agreement.')
    } finally {
      setLoading(false)
    }
  }

  const allChecked =
    form.code_of_conduct_ack &&
    form.insurance_ack &&
    form.privacy_ack &&
    form.non_solicitation_ack &&
    form.digital_signature.trim() !== ''

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold mb-2">Agreements & Code of Conduct</h2>

      <div className="space-y-2">
        <label className="flex items-start gap-2">
          <input
            type="checkbox"
            name="code_of_conduct_ack"
            checked={form.code_of_conduct_ack}
            onChange={handleChange}
          />
          <span>
            I agree to uphold professional conduct, arrive on time, and communicate promptly about
            any shift conflicts.
          </span>
        </label>

        <label className="flex items-start gap-2">
          <input
            type="checkbox"
            name="insurance_ack"
            checked={form.insurance_ack}
            onChange={handleChange}
          />
          <span>
            I acknowledge that SwipeAShift provides workers’ compensation and liability coverage
            only during active, approved shifts.
          </span>
        </label>

        <label className="flex items-start gap-2">
          <input
            type="checkbox"
            name="privacy_ack"
            checked={form.privacy_ack}
            onChange={handleChange}
          />
          <span>
            I agree to the <a href="/docs/legal/worker_terms.md" className="text-blue-600 underline" target="_blank">Privacy Policy and Terms of Service</a>.
          </span>
        </label>

        <label className="flex items-start gap-2">
          <input
            type="checkbox"
            name="non_solicitation_ack"
            checked={form.non_solicitation_ack}
            onChange={handleChange}
          />
          <span>
            I understand and agree not to accept direct employment or contract offers from
            restaurants I connect with through SwipeAShift without written authorization.
          </span>
        </label>
      </div>

      <div className="mt-4">
        <label className="block font-medium mb-1">Digital Signature</label>
        <input
          type="text"
          name="digital_signature"
          placeholder="Type your full name here"
          value={form.digital_signature}
          onChange={handleChange}
          required
          className="border p-2 rounded w-full"
        />
        <p className="text-xs text-gray-500 mt-1">
          Typing your full name acts as your digital signature for this agreement.
        </p>
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
          disabled={!allChecked || loading}
          className={`px-6 py-2 rounded text-white transition ${
            allChecked ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          {loading ? 'Saving...' : 'Next →'}
        </button>
      </div>
    </form>
  )
}