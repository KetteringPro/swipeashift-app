'use client'

import { useState } from 'react'
import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion'
import type { ShiftCardData } from '@/types/database.types'

interface SwipeCardProps {
  shift: ShiftCardData
  onSwipe: (direction: 'left' | 'right' | 'up') => void
  onSwipeComplete: () => void
}

export function SwipeCard({ shift, onSwipe, onSwipeComplete }: SwipeCardProps) {
  const [exitX, setExitX] = useState(0)
  const [exitY, setExitY] = useState(0)
  
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  // Rotation based on drag
  const rotate = useTransform(x, [-200, 200], [-25, 25])
  
  // Opacity indicators for swipe direction
  const opacityLeft = useTransform(x, [-150, -50, 0], [1, 0.5, 0])
  const opacityRight = useTransform(x, [0, 50, 150], [0, 0.5, 1])
  const opacityUp = useTransform(y, [-150, -50, 0], [1, 0.5, 0])

  const handleDragEnd = (_: any, info: PanInfo) => {
    const threshold = 100
    const velocity = info.velocity
    
    // Super like (swipe up)
    if (info.offset.y < -threshold || velocity.y < -500) {
      setExitY(-1000)
      onSwipe('up')
      onSwipeComplete()
      return
    }
    
    // Swipe right (interested)
    if (info.offset.x > threshold || velocity.x > 500) {
      setExitX(1000)
      onSwipe('right')
      onSwipeComplete()
      return
    }
    
    // Swipe left (pass)
    if (info.offset.x < -threshold || velocity.x < -500) {
      setExitX(-1000)
      onSwipe('left')
      onSwipeComplete()
      return
    }
  }

  // Format pay rate
  const payDisplay = shift.surge_factor > 1.2 
    ? `$${shift.pay_rate}/hr 🔥` 
    : `$${shift.pay_rate}/hr`

  // Format date and time
  const shiftDate = new Date(shift.date)
  const dateStr = shiftDate.toLocaleDateString('en-US', { 
    weekday: 'short', 
    month: 'short', 
    day: 'numeric' 
  })

  return (
    <motion.div
      className="absolute w-full h-full"
      style={{
        x,
        y,
        rotate,
        cursor: 'grab'
      }}
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      onDragEnd={handleDragEnd}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ 
        scale: 1, 
        opacity: 1,
        x: exitX,
        y: exitY
      }}
      transition={{ 
        type: 'spring',
        damping: 20,
        stiffness: 300
      }}
      whileTap={{ cursor: 'grabbing' }}
    >
      {/* Card Container */}
      <div className="relative w-full h-full bg-white rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Swipe Indicators */}
        <motion.div 
          style={{ opacity: opacityLeft }}
          className="absolute top-8 right-8 z-10 px-4 py-2 border-4 border-red-500 rounded-lg rotate-12"
        >
          <span className="text-red-500 text-3xl font-bold">PASS</span>
        </motion.div>
        
        <motion.div 
          style={{ opacity: opacityRight }}
          className="absolute top-8 left-8 z-10 px-4 py-2 border-4 border-green-500 rounded-lg -rotate-12"
        >
          <span className="text-green-500 text-3xl font-bold">APPLY</span>
        </motion.div>
        
        <motion.div 
          style={{ opacity: opacityUp }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 px-6 py-3 border-4 border-blue-500 rounded-lg"
        >
          <span className="text-blue-500 text-4xl font-bold">⭐ PRIORITY</span>
        </motion.div>

        {/* Card Content */}
        <div className="flex flex-col h-full">
          
          {/* Top Section - Restaurant & Role */}
          <div className="bg-gradient-to-b from-gray-900/80 to-transparent p-6 text-white">
            <h2 className="text-3xl font-bold mb-1">
              {shift.role.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
            </h2>
            <p className="text-xl text-gray-200">{shift.restaurant.name}</p>
            <p className="text-sm text-gray-300">{shift.restaurant.city}</p>
            
            {shift.distance_miles && (
              <p className="text-sm text-gray-400 mt-1">
                📍 {shift.distance_miles.toFixed(1)} miles away
              </p>
            )}
          </div>

          {/* Middle Section - Details */}
          <div className="flex-1 p-6 overflow-y-auto">
            
            {/* Date & Time */}
            <div className="mb-4">
              <div className="flex items-center gap-2 text-gray-700 mb-2">
                <span className="text-2xl">📅</span>
                <span className="text-lg font-semibold">{dateStr}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <span className="text-2xl">⏰</span>
                <span className="text-lg">{shift.start_time} - {shift.end_time}</span>
              </div>
            </div>

            {/* Pay Rate */}
            <div className="mb-4 p-4 bg-green-50 rounded-lg border-2 border-green-200">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 font-medium">Hourly Rate</span>
                <span className="text-3xl font-bold text-green-600">{payDisplay}</span>
              </div>
              {shift.surge_factor > 1.2 && (
                <p className="text-sm text-orange-600 mt-1">
                  🔥 High Demand - {((shift.surge_factor - 1) * 100).toFixed(0)}% surge bonus!
                </p>
              )}
              {shift.estimated_tips > 0 && (
                <p className="text-sm text-gray-600 mt-1">
                  💰 Estimated tips: ${shift.estimated_tips}
                </p>
              )}
            </div>

            {/* Experience Level */}
            {shift.experience_level && (
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  {shift.experience_level === 'entry' && '👋 Entry Level Welcome'}
                  {shift.experience_level === 'experienced' && '⭐ Experience Required'}
                  {shift.experience_level === 'expert' && '🏆 Expert Level'}
                </span>
              </div>
            )}

            {/* Description */}
            {shift.description && (
              <div className="mb-4">
                <h3 className="font-semibold text-gray-800 mb-2">Shift Details</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {shift.description}
                </p>
              </div>
            )}

            {/* Requirements */}
            {shift.requirements && (
              <div className="mb-4">
                <h3 className="font-semibold text-gray-800 mb-2">Requirements</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {shift.requirements}
                </p>
              </div>
            )}

            {/* Restaurant Reliability */}
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>Restaurant Rating:</span>
              <span className="text-yellow-500">
                {'⭐'.repeat(Math.round(shift.restaurant.reliability_score / 20))}
              </span>
              <span className="font-medium">
                {(shift.restaurant.reliability_score / 20).toFixed(1)}
              </span>
            </div>

          </div>

          {/* Bottom Section - Instructions */}
          <div className="bg-gray-50 p-6 border-t border-gray-200">
            <div className="flex justify-between items-center text-sm text-gray-600">
              <div className="text-center">
                <div className="text-2xl mb-1">👈</div>
                <div className="font-medium">Pass</div>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-1">👆</div>
                <div className="font-medium text-blue-600">Priority Apply</div>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-1">👉</div>
                <div className="font-medium text-green-600">Apply</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </motion.div>
  )
}
