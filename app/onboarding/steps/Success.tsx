'use client'

interface SuccessProps {
  prevStep?: () => void
}

export default function Success({ prevStep }: SuccessProps) {
  return (
    <div className="flex flex-col items-center text-center space-y-6">
      <h2 className="text-2xl font-bold text-green-700 mt-4">
        🎉 You’re all set!
      </h2>
      <p className="text-gray-700 max-w-md">
        Your onboarding is complete. Our team will review your profile and
        verification details shortly. Once approved, you’ll be able to log in,
        view open shifts, and start earning with SwipeAShift.
      </p>

      <div className="bg-gray-100 rounded-lg p-4 w-full max-w-md text-sm text-gray-600">
        <p>Next Steps:</p>
        <ul className="list-disc ml-6 mt-2 space-y-1 text-left">
          <li>✅ Watch for a confirmation email when your profile is approved.</li>
          <li>✅ Log in to your dashboard to update availability or edit details anytime.</li>
          <li>✅ Once approved, you’ll receive text/email alerts when shifts match your schedule.</li>
        </ul>
      </div>

      <a
        href="/dashboard"
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
      >
        Go to My Dashboard →
      </a>

      {prevStep && (
        <button
          onClick={prevStep}
          className="text-sm text-gray-500 underline hover:text-gray-700"
        >
          Back
        </button>
      )}
    </div>
  )
}