export default function RoleSelectionPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            🍽️ SwipeAShift
          </h1>
          <p className="text-xl text-gray-600">
            Choose how you want to get started
          </p>
        </div>

        {/* Two Card Layout */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          
          {/* Worker Card */}
          <a
            href="/auth/worker/signin"
            className="group bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-8 border-2 border-transparent hover:border-blue-500 hover:scale-105 flex flex-col"
          >
            <div className="text-center flex-1 flex flex-col">
              <div className="text-6xl mb-6">👨‍🍳</div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                I'm a Worker
              </h2>
              <p className="text-gray-600 mb-6 text-lg">
                Find restaurant shifts that fit your schedule. Work when you want, where you want.
              </p>
              <ul className="text-left space-y-3 mb-8 text-gray-700 flex-1">
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Flexible scheduling</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Browse available shifts</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Instant applications</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Get paid quickly</span>
                </li>
              </ul>
              <div className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold group-hover:bg-blue-700 transition">
                Sign In as Worker →
              </div>
            </div>
          </a>

          {/* Restaurant Card */}
          <a
            href="/auth/employer/signin"
            className="group bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-8 border-2 border-transparent hover:border-teal-500 hover:scale-105 flex flex-col"
          >
            <div className="text-center flex-1 flex flex-col">
              <div className="text-6xl mb-6">🏪</div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                I'm a Restaurant
              </h2>
              <p className="text-gray-600 mb-6 text-lg">
                Post shifts and find qualified staff instantly. Fill your schedule with ease.
              </p>
              <ul className="text-left space-y-3 mb-8 text-gray-700 flex-1">
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Post shifts in seconds</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Review qualified applicants</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Fill last-minute gaps</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Manage your team</span>
                </li>
              </ul>
              <div className="px-6 py-3 bg-teal-600 text-white rounded-lg font-semibold group-hover:bg-teal-700 transition">
                Sign In as Restaurant →
              </div>
            </div>
          </a>

        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-500 text-sm">
          <p>Don't have an account? Sign up links are on the login pages.</p>
        </div>

      </div>
    </div>
  )
}