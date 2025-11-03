// /app/onboarding/page.tsx
import StepManager from './StepManager'

export default function OnboardingPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-center">SwipeAShift Worker Onboarding</h1>
      <StepManager />
    </div>
  )
}