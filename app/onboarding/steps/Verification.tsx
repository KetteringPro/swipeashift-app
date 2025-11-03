'use client'

import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface VerificationProps {
  nextStep: () => void
  prevStep: () => void
}

export default function Verification({ nextStep, prevStep }: VerificationProps) {
  const [idFile, setIdFile] = useState<File | null>(null)
  const [backgroundConsent, setBackgroundConsent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setIdFile(file)
  }

  const handleUpload = async (worker_id: string) => {
    if (!idFile) return null

    const filePath = `verifications/${worker_id}-${Date.now()}-${idFile.name}`
    const { data, error: uploadError } = await supabase.storage
      .from('verifications')
      .upload(filePath, idFile, {
        cacheControl: '3600',
        upsert: false
      })

    if (uploadError) throw uploadError

    const { data: publicUrl } = supabase.storage
      .from('verifications')
      .getPublicUrl(filePath)

    return publicUrl.publicUrl
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

      // Fetch worker_id
      const { data: workerData, error: workerErr } = await supabase
        .from('workers')
        .select('id')
        .eq('auth_id', user.id)
        .single()
      if (workerErr) throw workerErr

      const worker_id = workerData.id
      let id_upload_url: string | null = null

      if (idFile) {
        id_upload_url = await handleUpload(worker_id)
      }

      // Insert or update record
      const { error: insertError } = await supabase.from('worker_verifications').upsert([
        {
          worker_id,
          id_upload_url,
          background_check_consent: backgroundConsent,
          background_check_status: backgroundConsent ? 'pending' : 'skipped',
          stripe_connected: false,
          tax_status: 'pending'
        }
      ])

      if (insertError) throw insertError

      nextStep()
    } catch (err: any) {
      console.error(err)
      setError('There was a problem saving your verification information.')
    } finally {
      setLoading(false)
    }
  }

  const handleStripeRedirect = () => {
    // TODO: Replace with your actual Stripe Connect onboarding link or API call
    window.location.href = 'https://connect.stripe.com/express/oauth/authorize'
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold mb-2">Verification & Payment Setup</h2>

      {/* ID Upload */}
      <div>
        <label className="block font-medium mb-1">Upload a Valid Photo ID</label>
        <input
          type="file"
          accept="image/*,application/pdf"
          onChange={handleFileChange}
          className="border p-2 rounded w-full"
        />
        <p className="text-xs text-gray-500 mt-1">
          Acceptable formats: JPEG, PNG, or PDF. Max size: 10MB.
        </p>
      </div>

      {/* Background Check */}
      <div className="mt-4">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={backgroundConsent}
            onChange={e => setBackgroundConsent(e.target.checked)}
          />
          I consent to an optional background check for Verified Worker status.
        </label>
        {backgroundConsent && (
          <p className="text-xs text-gray-500 ml-6 mt-1">
            Your consent authorizes SwipeAShift and its third-party partner to process this check.
          </p>
        )}
      </div>

      {/* Stripe Connect */}
      <div className="mt-6 border-t pt-4">
        <label className="block font-medium mb-1">Payment Setup</label>
        <p className="text-sm text-gray-600 mb-2">
          SwipeAShift uses Stripe Connect for secure payouts. You’ll need to complete this setup before accepting paid shifts.
        </p>
        <button
          type="button"
          onClick={handleStripeRedirect}
          className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition"
        >
          Connect Stripe Account
        </button>
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