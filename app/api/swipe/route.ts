import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import type { SwipeDirection } from '@/types/database.types'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    
    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { shiftId, direction } = body as { shiftId: string; direction: SwipeDirection }

    if (!shiftId || !direction) {
      return NextResponse.json({ error: 'Missing shiftId or direction' }, { status: 400 })
    }

    if (direction === 'right') {
      const { data, error } = await supabase
        .from('shift_applications')
        .insert({
          shift_id: shiftId,
          worker_id: user.id,
          status: 'pending'
        })
        .select()
        .single()

      if (error) {
        console.error('Error applying for shift:', error)
        return NextResponse.json({ error: 'Failed to apply for shift' }, { status: 500 })
      }

      return NextResponse.json({ success: true, data })
    } else {
      return NextResponse.json({ success: true, skipped: true })
    }
  } catch (error) {
    console.error('Swipe API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
