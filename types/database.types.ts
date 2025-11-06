// ============================================================================
// SwipeAShift - TypeScript Database Types
// Updated for MVP schema with new column names
// ============================================================================

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

// ============================================================================
// ENUMS
// ============================================================================

export type UserRole = 'worker' | 'employer' | 'admin'
export type ShiftRole = 'Server' | 'Bartender' | 'Host/Hostess' | 'Busser' | 'Line Cook' | 'Prep Cook' | 'Dishwasher' | 'Barback' | 'Food Runner' | 'Expeditor' | 'Sous Chef' | 'Kitchen Manager' | 'General Manager'
export type ShiftStatus = 'OPEN' | 'FILLED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED'
export type ExperienceLevel = 'entry' | 'experienced' | 'expert'
export type SwipeDirection = 'left' | 'right' | 'up'
export type ApplicationStatus = 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'WITHDRAWN' | 'COMPLETED' | 'CANCELLED'
export type ApplicationSource = 'swipe' | 'favorite' | 'invite' | 'manual'
export type PaymentStatus = 'PENDING' | 'AUTHORIZED' | 'CAPTURED' | 'COMPLETED' | 'REFUNDED' | 'FAILED'
export type TipType = 'cash' | 'credit' | 'pooled'
export type VerificationStatus = 'pending' | 'approved' | 'denied'
export type EmploymentStatus = 'hospitality' | 'other_industry' | 'unemployed'
export type RestaurantUserRole = 'owner' | 'manager' | 'staff'
export type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday'

// ============================================================================
// DATABASE TABLES
// ============================================================================

export interface Worker {
  id: string
  auth_id: string
  first_name: string
  last_name: string
  email: string
  phone: string | null
  profile_photo_url: string | null
  city: string | null
  state: string | null
  zip: string | null
  location: string | null // PostGIS geography type
  max_commute_miles: number
  current_employment_status: EmploymentStatus | null
  current_employer_id: string | null
  custom_employer_name: string | null
  is_verified: boolean
  is_active: boolean
  reliability_score: number
  total_shifts_completed: number
  created_at: string
  updated_at: string
}

export interface Restaurant {
  id: string
  name: string
  contact_name: string | null
  email: string | null
  phone: string | null
  address: string | null
  city: string | null
  state: string | null
  zip: string | null
  location: string | null
  market: string | null
  region: string | null
  is_verified: boolean
  is_active: boolean
  reliability_score: number
  terms_ack: boolean
  non_solicitation_ack: boolean
  signed_at: string | null
  is_registered: boolean
  created_at: string
  updated_at: string
}

export interface RestaurantUser {
  id: string
  restaurant_id: string
  auth_id: string
  role: RestaurantUserRole
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Shift {
  id: string
  restaurant_id: string
  role: ShiftRole
  date: string
  start_time: string
  end_time: string
  pay_rate: number | null
  hourly_rate_min: number | null
  hourly_rate_max: number | null
  estimated_tips: number | null
  status: ShiftStatus
  max_workers: number
  positions_open: number
  experience_level: ExperienceLevel | null
  description: string | null
  requirements: string | null
  dress_code: string | null
  market: string | null
  posted_by: string | null
  created_at: string
  updated_at: string
  filled_at: string | null
  completed_at: string | null
}

export interface ShiftSwipe {
  id: string
  worker_id: string
  shift_id: string
  direction: SwipeDirection
  swipe_context: Json | null
  swiped_at: string
}

export interface ShiftApplication {
  id: string
  shift_id: string
  worker_id: string
  status: ApplicationStatus
  source: ApplicationSource
  locked_rate: number | null
  applied_at: string
  reviewed_at: string | null
  accepted_at: string | null
  started_at: string | null
  completed_at: string | null
  worker_notes: string | null
  employer_notes: string | null
}

export interface ShiftFavorite {
  id: string
  worker_id: string
  shift_id: string
  priority_rank: number | null
  created_at: string
}

export interface ShiftPricing {
  id: string
  shift_id: string
  base_rate: number
  dynamic_rate: number
  surge_factor: number
  factors: Json | null
  reason: string | null
  calculated_at: string
}

export interface Payment {
  id: string
  shift_application_id: string
  shift_id: string
  worker_id: string
  restaurant_id: string
  stripe_payment_intent_id: string | null
  stripe_transfer_id: string | null
  base_amount: number
  bonus_amount: number
  tip_amount: number
  total_amount: number
  status: PaymentStatus
  created_at: string
  authorized_at: string | null
  captured_at: string | null
  completed_at: string | null
}

export interface TipDeclaration {
  id: string
  payment_id: string
  shift_application_id: string
  amount: number
  tip_type: TipType
  declared_by_restaurant_user_id: string | null
  declared_at: string
  worker_confirmed: boolean
  worker_confirmed_at: string | null
  notes: string | null
}

export interface Rating {
  id: string
  shift_application_id: string
  from_worker_id: string | null
  to_restaurant_id: string | null
  from_restaurant_id: string | null
  to_worker_id: string | null
  score: number
  comment: string | null
  created_at: string
}

export interface WorkerProfile {
  id: string
  worker_id: string
  experience_level: ExperienceLevel | null
  preferred_roles: string[]
  skills: string[]
  certifications: string[]
  has_food_handler_card: boolean
  has_alcohol_cert: boolean
  willing_entry_level: boolean
  about_me: string | null
  created_at: string
  updated_at: string
}

export interface WorkerAvailability {
  id: string
  worker_id: string
  day_of_week: DayOfWeek
  available: boolean
  start_time: string | null
  end_time: string | null
  created_at: string
}

export interface WorkerVerification {
  id: string
  worker_id: string
  id_upload_url: string | null
  background_check_consent: boolean
  background_check_status: VerificationStatus
  background_check_completed_at: string | null
  stripe_account_id: string | null
  stripe_connected: boolean
  stripe_connected_at: string | null
  created_at: string
  updated_at: string
}

export interface Message {
  id: string
  shift_application_id: string | null
  shift_id: string
  sender_worker_id: string | null
  sender_restaurant_user_id: string | null
  content: string
  sent_at: string
  read_at: string | null
}

export interface AdminLog {
  id: number
  actor_auth_id: string | null
  action: string
  entity_type: string | null
  entity_id: string | null
  details: Json | null
  created_at: string
}

// ============================================================================
// VIEW MODELS (For UI)
// ============================================================================

export interface ShiftCardData extends Shift {
  restaurant: Pick<Restaurant, 'id' | 'name' | 'city' | 'location' | 'reliability_score'>
  distance_miles?: number
  is_favorited?: boolean
  has_applied?: boolean
}

export interface WorkerProfileComplete extends Worker {
  profile: WorkerProfile
  availability: WorkerAvailability[]
  verification: WorkerVerification
}

export interface ApplicationWithDetails extends ShiftApplication {
  shift: ShiftCardData
  worker: Pick<Worker, 'id' | 'first_name' | 'last_name' | 'profile_photo_url' | 'reliability_score'>
  payment?: Payment
}

// ============================================================================
// API REQUEST/RESPONSE TYPES
// ============================================================================

export interface SwipeRequest {
  shift_id: string
  direction: SwipeDirection
}

export interface SwipeResponse {
  success: boolean
  application_id?: string
  match?: boolean
  message: string
}

export interface GetShiftsRequest {
  worker_location?: {
    lat: number
    lng: number
  }
  max_distance_miles?: number
  roles?: ShiftRole[]
  date_from?: string
  date_to?: string
  experience_level?: ExperienceLevel
  min_rate?: number
  limit?: number
  offset?: number
}

export interface GetShiftsResponse {
  shifts: ShiftCardData[]
  total_count: number
  has_more: boolean
}

export interface ApplyToShiftRequest {
  shift_id: string
  worker_notes?: string
}

export interface ApplyToShiftResponse {
  success: boolean
  application_id: string
  message: string
}

// ============================================================================
// SUPABASE QUERY HELPERS
// ============================================================================

export interface Database {
  public: {
    Tables: {
      workers: {
        Row: Worker
        Insert: Omit<Worker, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Worker, 'id' | 'auth_id' | 'created_at'>>
      }
      restaurants: {
        Row: Restaurant
        Insert: Omit<Restaurant, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Restaurant, 'id' | 'created_at'>>
      }
      shifts: {
        Row: Shift
        Insert: Omit<Shift, 'id' | 'created_at' | 'updated_at' | 'filled_at' | 'completed_at'>
        Update: Partial<Omit<Shift, 'id' | 'restaurant_id' | 'created_at'>>
      }
      shift_swipes: {
        Row: ShiftSwipe
        Insert: Omit<ShiftSwipe, 'id' | 'swiped_at'>
        Update: never // Swipes are immutable
      }
      shift_applications: {
        Row: ShiftApplication
        Insert: Omit<ShiftApplication, 'id' | 'applied_at' | 'reviewed_at' | 'accepted_at' | 'started_at' | 'completed_at'>
        Update: Partial<Omit<ShiftApplication, 'id' | 'shift_id' | 'worker_id' | 'applied_at'>>
      }
      shift_favorites: {
        Row: ShiftFavorite
        Insert: Omit<ShiftFavorite, 'id' | 'created_at'>
        Update: Partial<Omit<ShiftFavorite, 'id' | 'worker_id' | 'shift_id'>>
      }
      payments: {
        Row: Payment
        Insert: Omit<Payment, 'id' | 'created_at' | 'authorized_at' | 'captured_at' | 'completed_at'>
        Update: Partial<Omit<Payment, 'id' | 'shift_application_id' | 'created_at'>>
      }
      // Add other tables as needed
    }
    Functions: {
      // Add RPC functions here
    }
  }
}