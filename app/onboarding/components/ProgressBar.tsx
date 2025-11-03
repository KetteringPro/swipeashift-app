'use client'
import { useEffect, useState } from 'react'

export default function ProgressBar() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const storedStep = parseInt(localStorage.getItem('onboarding_step') || '1')
    const percentage = ((storedStep - 1) / 5) * 100
    setProgress(percentage)
  }, [])

  useEffect(() => {
    const handleStorage = () => {
      const storedStep = parseInt(localStorage.getItem('onboarding_step') || '1')
      const percentage = ((storedStep - 1) / 5) * 100
      setProgress(percentage)
    }
    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [])

  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
      <div
        className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  )
}