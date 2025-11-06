'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function Navigation() {
  const [user, setUser] = useState<any>(null)
  const [userType, setUserType] = useState<'worker' | 'restaurant' | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check current user
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
      if (user) {
        determineUserType(user.id)
      } else {
        setLoading(false)
      }
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        determineUserType(session.user.id)
      } else {
        setUserType(null)
        setLoading(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const determineUserType = async (userId: string) => {
    try {
      // Check if worker
      const { data: worker } = await supabase
        .from('workers')
        .select('id')
        .eq('auth_id', userId)
        .maybeSingle()

      if (worker) {
        setUserType('worker')
        setLoading(false)
        return
      }

      // Check if restaurant
      const { data: restaurant } = await supabase
        .from('restaurant_users')
        .select('id')
        .eq('auth_id', userId)
        .maybeSingle()

      if (restaurant) {
        setUserType('restaurant')
        setLoading(false)
        return
      }

      // No profile found
      setUserType(null)
      setLoading(false)
    } catch (error) {
      console.error('Error determining user type:', error)
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setUserType(null)
    router.push('/')
  }

  return (
    <nav className="absolute top-0 left-0 right-0 flex justify-between items-center px-8 py-4 text-sm font-medium text-white z-50">
      <Link href="/" className="tracking-wide font-semibold text-white text-lg">
        SwipeAShift
      </Link>

      <div className="flex items-center gap-6">
        {!user ? (
          <>
            <Link href="/auth/worker/signin" className="hover:text-teal-200 transition">
              Login
            </Link>
            <Link 
              href="/onboarding" 
              className="bg-white text-teal-600 px-4 py-2 rounded-lg hover:bg-teal-50 transition font-semibold"
            >
              Sign Up
            </Link>
          </>
        ) : loading ? (
          <div className="text-white/50">Loading...</div>
        ) : (
          <>
            {userType === 'worker' && (
              <>
                <Link href="/swipe" className="hover:text-teal-200 transition">
                  Find Shifts
                </Link>
                <Link href="/dashboard" className="hover:text-teal-200 transition">
                  My Applications
                </Link>
                <Link href="/my-shifts" className="hover:text-teal-200 transition">
                  My Shifts
                </Link>
              </>
            )}
            {userType === 'restaurant' && (
              <>
                <Link href="/employer/dashboard" className="hover:text-teal-200 transition">
                  Dashboard
                </Link>
                <Link href="/employer/team" className="hover:text-teal-200 transition">
                  Team
                </Link>
                <Link href="/post-shift" className="hover:text-teal-200 transition">
                  Post Shift
                </Link>
              </>
            )}
            <button 
              onClick={handleLogout}
              className="hover:text-teal-200 transition"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  )
}
