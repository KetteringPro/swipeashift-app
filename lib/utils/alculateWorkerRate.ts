// ============================================================================
// Worker Rate Calculator - Frontend Utility
// Calculates dynamic worker pay rate based on shift urgency and demand
// ============================================================================

interface Shift {
  hourly_rate_min: number
  hourly_rate_max: number
  date: string
  start_time: string
  positions_open: number
  max_workers: number
}

interface ApplicationCounts {
  pending: number
  accepted: number
}

interface RateCalculation {
  workerRate: number
  boostFactor: number
  factors: {
    hoursToStart: number
    urgencyBoost: number
    timePremium: number
    demandBoost: number
    dayOfWeek: number
  }
  reason: string[]
}

// Constants
const PLATFORM_FEE = 0.20  // 20% platform fee
const STRIPE_FEE = 1.00    // ~$1 average Stripe fee per hour

export function calculateWorkerRate(
  shift: Shift,
  applicationCounts?: ApplicationCounts
): RateCalculation {
  
  // ======================================================================
  // STEP 1: Calculate min and max worker rates (after fees)
  // ======================================================================
  const minWorkerRate = Math.max(0, shift.hourly_rate_min * (1 - PLATFORM_FEE) - STRIPE_FEE)
  const maxWorkerRate = Math.max(0, shift.hourly_rate_max * (1 - PLATFORM_FEE) - STRIPE_FEE)
  
  // Start at minimum
  let currentRate = minWorkerRate
  let boostFactor = 1.0
  const reasonParts: string[] = []
  
  // ======================================================================
  // STEP 2: Calculate hours to start (Urgency Factor)
  // ======================================================================
  const shiftDateTime = new Date(`${shift.date}T${shift.start_time}`)
  const now = new Date()
  const hoursToStart = (shiftDateTime.getTime() - now.getTime()) / (1000 * 60 * 60)
  
  let urgencyBoost = 0
  
  if (hoursToStart < 6) {
    urgencyBoost = 0.50  // +50% for shifts starting in < 6 hours
    reasonParts.push('URGENT (< 6hrs)')
  } else if (hoursToStart < 12) {
    urgencyBoost = 0.35  // +35% for shifts starting in < 12 hours
    reasonParts.push('very soon (< 12hrs)')
  } else if (hoursToStart < 24) {
    urgencyBoost = 0.25  // +25% for shifts starting in < 24 hours
    reasonParts.push('tomorrow')
  } else if (hoursToStart < 48) {
    urgencyBoost = 0.15  // +15% for shifts starting in < 48 hours
    reasonParts.push('short notice')
  }
  
  // ======================================================================
  // STEP 3: Day of Week & Time Premium
  // ======================================================================
  const dayOfWeek = shiftDateTime.getDay() // 0=Sunday, 6=Saturday
  const startTime = shift.start_time
  
  let timePremium = 0
  
  // Weekend premium
  if (dayOfWeek === 0 || dayOfWeek === 5 || dayOfWeek === 6) {
    timePremium += 0.10 // +10% weekend
    reasonParts.push('weekend')
  }
  
  // Evening premium (5pm+)
  if (startTime >= '17:00:00') {
    timePremium += 0.08 // +8% evening
    reasonParts.push('evening')
  }
  
  // Late night premium (10pm+)
  if (startTime >= '22:00:00') {
    timePremium += 0.12 // +12% late night
    reasonParts.push('late night')
  }
  
  // ======================================================================
  // STEP 4: Demand Factor (Applications vs Open Positions)
  // ======================================================================
  let demandBoost = 0
  
  if (applicationCounts) {
    const { pending, accepted } = applicationCounts
    const totalApplicants = pending + accepted
    
    if (totalApplicants === 0 && shift.positions_open > 0) {
      demandBoost = 0.20 // +20% for no applications yet
      reasonParts.push('no applicants')
    } else if (totalApplicants < shift.positions_open) {
      demandBoost = 0.12 // +12% for low applications
      reasonParts.push('low interest')
    } else if (totalApplicants < (shift.positions_open * 2)) {
      demandBoost = 0.05 // +5% for moderate interest
      reasonParts.push('moderate interest')
    }
  }
  
  // ======================================================================
  // STEP 5: Calculate Total Boost Factor
  // ======================================================================
  boostFactor = 1.0 + urgencyBoost + timePremium + demandBoost
  
  // Apply boost to minimum rate
  currentRate = minWorkerRate * boostFactor
  
  // Cap at maximum worker rate
  currentRate = Math.min(currentRate, maxWorkerRate)
  
  // Round to 2 decimal places
  currentRate = Math.round(currentRate * 100) / 100
  
  return {
    workerRate: currentRate,
    boostFactor: Math.round(boostFactor * 100) / 100,
    factors: {
      hoursToStart: Math.round(hoursToStart * 10) / 10,
      urgencyBoost,
      timePremium,
      demandBoost,
      dayOfWeek
    },
    reason: reasonParts
  }
}

// Helper to format rate for display
export function formatWorkerRate(calculation: RateCalculation): string {
  return `$${calculation.workerRate}/hr`
}

// Helper to get boost description
export function getBoostDescription(calculation: RateCalculation): string {
  if (calculation.reason.length === 0) {
    return 'Standard rate'
  }
  return calculation.reason.join(' + ')
}