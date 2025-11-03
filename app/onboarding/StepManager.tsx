'use client'

import { useState, useEffect } from 'react'
import BasicInfo from './steps/BasicInfo'
import Experience from './steps/Experience'
import Availability from './steps/Availability'
import Verification from './steps/Verification'
import Agreements from './steps/Agreements'
import Success from './steps/Success'

const steps = [
  { id: 1, name: 'Basic Info', component: BasicInfo },
  { id: 2, name: 'Experience', component: Experience },
  { id: 3, name: 'Availability', component: Availability },
  { id: 4, name: 'Verification', component: Verification },
  { id: 5, name: 'Agreements', component: Agreements },
  { id: 6, name: 'Success', component: Success }
]

export default function StepManager() {
  const [step, setStep] = useState<number>(1)

  useEffect(() => {
    const saved = localStorage.getItem('onboarding_step')
    if (saved) setStep(parseInt(saved))
  }, [])

  const nextStep = () => {
    setStep(prev => {
      const newStep = Math.min(prev + 1, steps.length)
      localStorage.setItem('onboarding_step', newStep.toString())
      return newStep
    })
  }

  const prevStep = () => {
    setStep(prev => {
      const newStep = Math.max(prev - 1, 1)
      localStorage.setItem('onboarding_step', newStep.toString())
      return newStep
    })
  }

  const CurrentComponent = steps[step - 1].component

  return (
    <div>
      {/* @ts-ignore */}
      <CurrentComponent nextStep={nextStep} prevStep={prevStep} />
    </div>
  )
}