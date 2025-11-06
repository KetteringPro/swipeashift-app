import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/client'
import type { SwipeDirection } from '@/types/database.types'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerClient()
    
    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get request body
    const body = await request.json()
    const { shift_id, direction } = body as { shift_id: string; direction: SwipeDirection }

    if (!shift_id || !direction) {
      return NextResponse.json(
        { error: 'Missing shift_id or direction' },
        { status: 400 }
      )
    }

    if (!['left', 'right', 'up'].includes(direction)) {
      return NextResponse.json(
        { error: 'Invalid direction' },
        { status: 400 }
      )
    }

    // Get worker profile
    const { data: worker, error: workerError } = await supabase
      .from('workers')
      .select('id, location')
      .eq('auth_id', user.id)
      .single()

    if (workerError || !worker) {
      return NextResponse.json(
        { error: 'Worker profile not found' },
        { status: 404 }
      )
    }

    // Get shift details
    const { data: shift, error: shiftError } = await supabase
      .from('shifts')
      .select(`
        id,
        current_rate,
        surge_factor,
        date,
        start_time,
        restaurant:restaurants!inner(location)
      `)
      .eq('id', shift_id)
      .eq('status', 'OPEN')
      .single()

    if (shiftError || !shift) {
      return NextResponse.json(
        { error: 'Shift not found or no longer available' },
        { status: 404 }
      )
    }

    // Calculate distance (if both have location)
    let distanceMiles: number | undefined
    if (worker.location && shift.restaurant?.location) {
      // Use PostGIS to calculate distance
      const { data: distanceData } = await supabase.rpc('calculate_distance', {
        point1: worker.location,
        point2: shift.restaurant.location
      })
      distanceMiles = distanceData?.distance_miles
    }

    // Calculate time to start
    const shiftDateTime = new Date(`${shift.date}T${shift.start_time}`)
    const hoursToStart = (shiftDateTime.getTime() - Date.now()) / (1000 * 60 * 60)

    // Build swipe context
    const swipeContext = {
      distance_miles: distanceMiles,
      current_rate: shift.current_rate,
      surge_factor: shift.surge_factor,
      hours_to_start: Math.round(hoursToStart * 10) / 10
    }

    // Insert swipe record
    const { data: swipeData, error: swipeInsertError } = await supabase
      .from('shift_swipes')
      .insert({
        worker_id: worker.id,
        shift_id: shift_id,
        direction: direction,
        swipe_context: swipeContext
      })
      .select()
      .single()

    if (swipeInsertError) {
      // Check if already swiped
      if (swipeInsertError.code === '23505') { // Unique violation
        return NextResponse.json(
          { error: 'Already swiped on this shift' },
          { status: 409 }
        )
      }
      throw swipeInsertError
    }

    // If right or up swipe, check if application was created by trigger
    let applicationId: string | undefined
    if (direction === 'right' || direction === 'up') {
      const { data: application } = await supabase
        .from('shift_applications')
        .select('id')
        .eq('worker_id', worker.id)
        .eq('shift_id', shift_id)
        .single()

      applicationId = application?.id

      // Send notification to employer (via Supabase Realtime or webhook)
      // TODO: Implement notification system
    }

    return NextResponse.json({
      success: true,
      swipe_id: swipeData.id,
      application_id: applicationId,
      direction: direction,
      message: direction === 'right' 
        ? 'Applied successfully!' 
        : direction === 'up'
        ? 'Applied with priority!'
        : 'Shift passed'
    })

  } catch (error: any) {
    console.error('Swipe API error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}
