'use client'

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#dbeafe] via-[#a7f3d0] to-[#0d9488] flex items-center justify-center p-6">
      <div className="bg-white bg-opacity-95 shadow-xl rounded-xl w-full max-w-2xl p-8">
        {children}
      </div>
    </div>
  )
}