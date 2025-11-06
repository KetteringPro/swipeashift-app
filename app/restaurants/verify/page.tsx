'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../../lib/supabase/client'

export default function RestaurantVerify() {
  const router = useRouter()
  const [ackTerms, setAckTerms] = useState(false)
  const [ackNonSolicit, setAckNonSolicit] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      // Get the currently authenticated restaurant user
      const { data: userData, error: userError } = await supabase.auth.getUser()
      if (userError) throw userError
      const userEmail = userData?.user?.email

      if (!userEmail) throw new Error('User email not found. Please sign in again.')

      // Update acknowledgments in restaurants table
      const { error: updateError } = await supabase
        .from('restaurants')
        .update({
          terms_ack: ackTerms,
          non_solicitation_ack: ackNonSolicit,
          signed_at: new Date().toISOString(),
        })
        .eq('email', userEmail)

      if (updateError) throw updateError

      setSuccess(true)

      // Redirect to dashboard
      setTimeout(() => {
        router.push('/restaurants/dashboard')
      }, 1500)
    } catch (err: any) {
      console.error(err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto bg-white bg-opacity-95 rounded-xl shadow-xl p-8">
      <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Final Step: Confirm Your Registration
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            id="terms"
            checked={ackTerms}
            onChange={(e) => setAckTerms(e.target.checked)}
            className="mt-1"
          />
          <label htmlFor="terms" className="text-sm text-gray-700">
            I acknowledge and agree to the <strong>Terms of Service</strong>.
          </label>
        </div>

        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            id="non-solicit"
            checked={ackNonSolicit}
            onChange={(e) => setAckNonSolicit(e.target.checked)}
            className="mt-1"
          />
          <label htmlFor="non-solicit" className="text-sm text-gray-700">
            I agree not to directly solicit or hire workers found through Swipe-A-Shift outside
            of this platform.
          </label>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && <p className="text-green-600 text-sm">Verified successfully! Redirecting…</p>}

        <button
          type="submit"
          disabled={!ackTerms || !ackNonSolicit || loading}
          className="bg-slate-700 text-white px-4 py-2 rounded w-full hover:bg-slate-800 disabled:opacity-60"
        >
          {loading ? 'Saving...' : 'Confirm & Continue →'}
        </button>
      </form>
    </div>
  )
}