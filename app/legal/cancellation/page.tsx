// File: /app/legal/cancellation/page.tsx
import Link from "next/link";

export default function CancellationPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0f9ea5] via-[#33b5b9] to-[#b1e4e8] flex justify-center items-start">
      <div className="max-w-5xl w-full mx-auto px-8 py-16">
        <h1 className="text-4xl font-bold text-white mb-6 border-b border-white/30 pb-2">
          Cancellation & Refund Policy
        </h1>

        <section className="bg-white/80 rounded-2xl p-8 shadow-lg backdrop-blur text-gray-800 leading-relaxed space-y-8">
          
          {/* Introduction */}
          <div className="bg-teal-50 border-l-4 border-teal-600 p-6 rounded">
            <p className="text-lg">
              <strong>Life happens, we get it.</strong> But when you commit to a shift, someone is counting on you. This policy explains when you can cancel without penalty, when fees apply, and how to handle emergencies. We balance flexibility with fairness for everyone.
            </p>
          </div>

          {/* 1. Quick Reference Guide */}
          <div>
            <h2 className="text-2xl font-semibold text-teal-700 mb-3">1. Quick Reference Guide</h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              {/* Worker Cancellations */}
              <div className="bg-blue-50 p-4 rounded border border-blue-300">
                <p className="font-semibold text-blue-900 mb-3">👷 WORKER CANCELLATIONS</p>
                
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-semibold text-green-700">✅ >24 hours before shift</p>
                    <p className="text-xs">FREE - Cancel anytime, no penalty</p>
                  </div>

                  <div>
                    <p className="font-semibold text-yellow-700">⚠️ 2-24 hours before</p>
                    <p className="text-xs">WARNING - 3 strikes in 90 days = suspension</p>
                  </div>

                  <div>
                    <p className="font-semibold text-orange-700">💵 <2 hours before</p>
                    <p className="text-xs">PENALTY - $25 or 1 hour of pay (whichever is greater)</p>
                  </div>

                  <div>
                    <p className="font-semibold text-red-700">🚫 No-show</p>
                    <p className="text-xs">SEVERE - 30-day suspension + $50 penalty. Second = permanent ban</p>
                  </div>

                  <div>
                    <p className="font-semibold text-purple-700">🏥 Emergency</p>
                    <p className="text-xs">EXCUSED - With documentation within 24 hours</p>
                  </div>
                </div>
              </div>

              {/* Venue Cancellations */}
              <div className="bg-green-50 p-4 rounded border border-green-300">
                <p className="font-semibold text-green-900 mb-3">🏢 VENUE CANCELLATIONS</p>
                
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-semibold text-green-700">✅ >24 hours before shift</p>
                    <p className="text-xs">FREE - Full refund, no penalty</p>
                  </div>

                  <div>
                    <p className="font-semibold text-orange-700">💵 <24 hours before</p>
                    <p className="text-xs">PENALTY - 2-hour cancellation fee (rest refunded)</p>
                  </div>

                  <div>
                    <p className="font-semibold text-red-700">🚫 Worker no-show</p>
                    <p className="text-xs">FULL REFUND - Report immediately for refund + worker suspension</p>
                  </div>

                  <div>
                    <p className="font-semibold text-purple-700">🏥 Emergency</p>
                    <p className="text-xs">FULL REFUND - With documentation (power outage, health dept closure, etc.)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Worker Cancellation Policy (Detailed) */}
          <div>
            <h2 className="text-2xl font-semibold text-teal-700 mb-3">2. Worker Cancellation Policy (Detailed)</h2>
            
            <p className="mb-4">
              You're an independent contractor with the freedom to choose your shifts. But once you accept a shift, a venue is counting on you. Here's our policy:
            </p>

            <div className="space-y-4">
              {/* Free Cancellation */}
              <div className="bg-green-50 p-6 rounded border border-green-400">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">✅</span>
                  <p className="text-xl font-semibold text-green-800">Free Cancellation (>24 hours notice)</p>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <p className="font-semibold text-sm">When it applies:</p>
                    <ul className="list-disc pl-6 text-sm space-y-1 mt-1">
                      <li>You cancel MORE than 24 hours before shift start time</li>
                      <li>Example: Shift is Friday at 5pm → Cancel before Thursday 5pm = FREE</li>
                    </ul>
                  </div>

                  <div>
                    <p className="font-semibold text-sm">What happens:</p>
                    <ul className="list-disc pl-6 text-sm space-y-1 mt-1">
                      <li>No penalty, no fees, no impact on your rating</li>
                      <li>Shift immediately goes back to the marketplace</li>
                      <li>Another worker can claim it</li>
                      <li>Venue is notified (gives them time to find coverage)</li>
                      <li>You can cancel as many times as you want with >24hr notice</li>
                    </ul>
                  </div>

                  <div className="bg-white p-3 rounded">
                    <p className="text-xs font-semibold mb-1">💡 Pro tip:</p>
                    <p className="text-xs">If something comes up, cancel ASAP so another worker can grab the shift. The sooner you cancel, the better for everyone.</p>
                  </div>
                </div>
              </div>

              {/* Warning Zone */}
              <div className="bg-yellow-50 p-6 rounded border border-yellow-400">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">⚠️</span>
                  <p className="text-xl font-semibold text-yellow-800">Warning Zone (2-24 hours notice)</p>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <p className="font-semibold text-sm">When it applies:</p>
                    <ul className="list-disc pl-6 text-sm space-y-1 mt-1">
                      <li>You cancel between 2-24 hours before shift start</li>
                      <li>Example: Shift is Friday at 5pm → Cancel between Thursday 5pm and Friday 3pm</li>
                    </ul>
                  </div>

                  <div>
                    <p className="font-semibold text-sm">What happens:</p>
                    <ul className="list-disc pl-6 text-sm space-y-1 mt-1">
                      <li><strong>No financial penalty</strong></li>
                      <li>But: You receive a <strong>warning</strong></li>
                      <li>3 warnings in 90 days = 7-day suspension</li>
                      <li>Shift goes back to marketplace (but harder to fill at this point)</li>
                      <li>Venue is frustrated (may rate you lower if you've worked for them before)</li>
                    </ul>
                  </div>

                  <div className="bg-white p-3 rounded">
                    <p className="text-xs font-semibold mb-1">Why this matters:</p>
                    <p className="text-xs">Cancelling with <24 hours notice is really hard on venues. They're counting on you and may not find coverage in time. We don't charge a fee, but repeated last-minute cancellations will impact your ability to work.</p>
                  </div>
                </div>
              </div>

              {/* Penalty Zone */}
              <div className="bg-orange-50 p-6 rounded border border-orange-400">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">💵</span>
                  <p className="text-xl font-semibold text-orange-800">Penalty Zone (<2 hours notice)</p>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <p className="font-semibold text-sm">When it applies:</p>
                    <ul className="list-disc pl-6 text-sm space-y-1 mt-1">
                      <li>You cancel LESS than 2 hours before shift start</li>
                      <li>Example: Shift is Friday at 5pm → Cancel after Friday 3pm</li>
                    </ul>
                  </div>

                  <div>
                    <p className="font-semibold text-sm">What happens:</p>
                    <ul className="list-disc pl-6 text-sm space-y-1 mt-1">
                      <li><strong>Cancellation fee charged:</strong> $25 OR 1 hour of shift pay (whichever is GREATER)</li>
                      <li>Example: $20/hr shift = $25 fee | $30/hr shift = $30 fee | $18/hr shift = $25 fee (minimum)</li>
                      <li>Fee charged to your saved payment method</li>
                      <li>Shift goes back to marketplace (very hard to fill)</li>
                      <li>You also receive a warning (counts toward 3-strike rule)</li>
                    </ul>
                  </div>

                  <div className="bg-white p-3 rounded">
                    <p className="text-xs font-semibold mb-1">Why we charge a fee:</p>
                    <p className="text-xs">Cancelling <2 hours before puts venues in an impossible position. They can't find coverage, can't serve all their customers, and lose money. The fee compensates them for this disruption.</p>
                  </div>

                  <div>
                    <p className="font-semibold text-sm">How the fee is used:</p>
                    <ul className="list-disc pl-6 text-sm space-y-1 mt-1">
                      <li>50% goes to the venue (partial compensation for disruption)</li>
                      <li>50% kept by SwipeAShift (administrative costs, not profit)</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* No-Show */}
              <div className="bg-red-50 p-6 rounded border border-red-500">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">🚫</span>
                  <p className="text-xl font-semibold text-red-800">No-Show (Zero Tolerance)</p>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <p className="font-semibold text-sm">What counts as a no-show:</p>
                    <ul className="list-disc pl-6 text-sm space-y-1 mt-1">
                      <li>You don't show up at all</li>
                      <li>You show up more than 30 minutes late without calling ahead</li>
                      <li>You leave mid-shift without permission (except emergencies)</li>
                    </ul>
                  </div>

                  <div className="bg-white p-4 rounded border-2 border-red-400">
                    <p className="font-semibold text-red-800 mb-2">FIRST NO-SHOW:</p>
                    <ul className="list-disc pl-6 text-sm space-y-1">
                      <li><strong>Immediate 30-day suspension</strong> (account frozen)</li>
                      <li><strong>$50 penalty</strong> OR full shift value (whichever is LESS)</li>
                      <li>Example: 6-hour shift at $20/hr = $120 total, but fee capped at $50</li>
                      <li>Must complete a <strong>re-training module</strong> to reactivate</li>
                      <li>Venue gets full refund</li>
                      <li>Your rating takes a major hit</li>
                    </ul>
                  </div>

                  <div className="bg-white p-4 rounded border-2 border-red-600">
                    <p className="font-semibold text-red-800 mb-2">SECOND NO-SHOW:</p>
                    <ul className="list-disc pl-6 text-sm space-y-1">
                      <li><strong>PERMANENT ACCOUNT TERMINATION</strong></li>
                      <li>No exceptions, no appeals</li>
                      <li>You're banned from SwipeAShift forever</li>
                    </ul>
                  </div>

                  <div className="bg-white p-3 rounded">
                    <p className="text-xs font-semibold mb-1">Why zero tolerance:</p>
                    <p className="text-xs">No-shows devastate venues. They've planned their evening around you being there. When you don't show up, they can't serve customers, staff members have to cover (ruining their night too), and the venue loses money. We take this extremely seriously.</p>
                  </div>

                  <div>
                    <p className="font-semibold text-sm text-red-800">⚠️ CRITICAL: If you're going to be late or can't make it, CALL THE VENUE IMMEDIATELY</p>
                    <p className="text-xs mt-1">Even if you're only going to be 10 minutes late, call ahead. Communication makes all the difference. A no-call/no-show is unforgivable.</p>
                  </div>
                </div>
              </div>

              {/* Emergency Exceptions */}
              <div className="bg-purple-50 p-6 rounded border border-purple-400">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">🏥</span>
                  <p className="text-xl font-semibold text-purple-800">Emergency Exceptions (Documented)</p>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <p className="font-semibold text-sm">We understand true emergencies happen. These are EXCUSED if you provide documentation within 24 hours:</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="bg-white p-3 rounded border border-purple-300">
                      <p className="font-semibold text-xs text-purple-800 mb-2">✅ EXCUSED EMERGENCIES:</p>
                      <ul className="list-disc pl-4 text-xs space-y-1">
                        <li><strong>Hospitalization:</strong> ER records, admission papers</li>
                        <li><strong>Death in immediate family:</strong> Obituary, funeral notice</li>
                        <li><strong>Car accident en route:</strong> Police report, tow receipt</li>
                        <li><strong>Natural disaster:</strong> Blizzard, flood, power outage (news verification)</li>
                        <li><strong>Positive COVID test:</strong> Lab results from past 24 hours</li>
                        <li><strong>Jury duty:</strong> Summons with date/time</li>
                        <li><strong>Court appearance:</strong> Subpoena or court notice</li>
                      </ul>
                    </div>

                    <div className="bg-white p-3 rounded border border-red-300">
                      <p className="font-semibold text-xs text-red-800 mb-2">❌ NOT EXCUSED:</p>
                      <ul className="list-disc pl-4 text-xs space-y-1">
                        <li>"Car broke down" (without tow receipt/repair invoice)</li>
                        <li>"Felt sick" (without doctor visit/urgent care)</li>
                        <li>"Family issue" (without documentation)</li>
                        <li>"Forgot" (never acceptable)</li>
                        <li>"Another shift came up" (breach of commitment)</li>
                        <li>"Overslept" (set multiple alarms)</li>
                        <li>"Traffic" (leave early)</li>
                        <li>"Childcare fell through" (have a backup plan)</li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <p className="font-semibold text-sm">How to get emergency exception:</p>
                    <ol className="list-decimal pl-6 text-sm space-y-1 mt-1">
                      <li><strong>Call the venue immediately</strong> (explain situation, apologize)</li>
                      <li><strong>Email SwipeAShift support</strong> at support@swipeashift.com within 24 hours</li>
                      <li><strong>Attach documentation</strong> (photo of ER discharge papers, police report, etc.)</li>
                      <li><strong>We review</strong> (usually same business day)</li>
                      <li><strong>If approved:</strong> Penalty waived, suspension lifted, venue refunded</li>
                      <li><strong>If denied:</strong> Standard penalties apply</li>
                    </ol>
                  </div>

                  <div className="bg-white p-3 rounded">
                    <p className="text-xs font-semibold mb-1">💡 Pro tip:</p>
                    <p className="text-xs">Take a photo of any documentation immediately (ER discharge papers, tow receipt, etc.). The faster you can provide proof, the faster we can resolve it.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Venue Cancellation Policy (Detailed) */}
          <div>
            <h2 className="text-2xl font-semibold text-teal-700 mb-3">3. Venue Cancellation Policy (Detailed)</h2>
            
            <p className="mb-4">
              We understand that business needs change. Here's how cancellations work from the venue side:
            </p>

            <div className="space-y-4">
              {/* Free Cancellation */}
              <div className="bg-green-50 p-6 rounded border border-green-400">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">✅</span>
                  <p className="text-xl font-semibold text-green-800">Free Cancellation (>24 hours notice)</p>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <p className="font-semibold text-sm">When it applies:</p>
                    <ul className="list-disc pl-6 text-sm space-y-1 mt-1">
                      <li>You cancel MORE than 24 hours before shift start</li>
                      <li>Example: Shift is Friday at 5pm → Cancel before Thursday 5pm</li>
                    </ul>
                  </div>

                  <div>
                    <p className="font-semibold text-sm">What happens:</p>
                    <ul className="list-disc pl-6 text-sm space-y-1 mt-1">
                      <li><strong>Full refund</strong> (100% back to your card within 5-7 business days)</li>
                      <li>Worker is immediately notified</li>
                      <li>Shift removed from worker's schedule</li>
                      <li>No penalty, no impact on your account</li>
                    </ul>
                  </div>

                  <div className="bg-white p-3 rounded">
                    <p className="text-xs font-semibold mb-1">Note for venues:</p>
                    <p className="text-xs">While there's no penalty, repeated last-minute cancellations may impact your venue rating. Workers can rate venues, and frequent cancellations hurt your reputation.</p>
                  </div>
                </div>
              </div>

              {/* Penalty Zone */}
              <div className="bg-orange-50 p-6 rounded border border-orange-400">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">💵</span>
                  <p className="text-xl font-semibold text-orange-800">Cancellation Fee (<24 hours notice)</p>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <p className="font-semibold text-sm">When it applies:</p>
                    <ul className="list-disc pl-6 text-sm space-y-1 mt-1">
                      <li>You cancel LESS than 24 hours before shift start</li>
                      <li>Example: Shift is Friday at 5pm → Cancel after Thursday 5pm</li>
                    </ul>
                  </div>

                  <div>
                    <p className="font-semibold text-sm">What happens:</p>
                    <ul className="list-disc pl-6 text-sm space-y-1 mt-1">
                      <li><strong>2-hour cancellation fee</strong> (you pay for 2 hours, rest is refunded)</li>
                      <li>Example: 6-hour shift at $24/hr = $144 total</li>
                      <li>You're refunded: $96 (4 hours)</li>
                      <li>You pay: $48 (2-hour fee)</li>
                    </ul>
                  </div>

                  <div>
                    <p className="font-semibold text-sm">Where the fee goes:</p>
                    <ul className="list-disc pl-6 text-sm space-y-1 mt-1">
                      <li>100% goes to the worker (they blocked time for you)</li>
                      <li>Worker is notified and receives the 2-hour payment</li>
                    </ul>
                  </div>

                  <div className="bg-white p-3 rounded">
                    <p className="text-xs font-semibold mb-1">Why we charge this fee:</p>
                    <p className="text-xs">Workers turn down other opportunities when they accept your shift. Cancelling last-minute means they lose that income and may not find another shift. The 2-hour fee partially compensates them.</p>
                  </div>

                  <div>
                    <p className="font-semibold text-sm text-orange-800">⚠️ Repeated last-minute cancellations:</p>
                    <p className="text-xs mt-1">Venues that frequently cancel with <24 hours notice may face account review and possible restrictions on posting shifts.</p>
                  </div>
                </div>
              </div>

              {/* Worker No-Show */}
              <div className="bg-red-50 p-6 rounded border border-red-400">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">🚫</span>
                  <p className="text-xl font-semibold text-red-800">Worker No-Show (Full Refund)</p>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <p className="font-semibold text-sm">If a worker doesn't show up:</p>
                    <ol className="list-decimal pl-6 text-sm space-y-1 mt-1">
                      <li><strong>Contact SwipeAShift support immediately:</strong> support@swipeashift.com or call our support line</li>
                      <li><strong>Provide shift details:</strong> Shift ID, worker name, scheduled time</li>
                      <li><strong>Confirm no-show:</strong> Worker didn't show up, didn't call, no communication</li>
                      <li><strong>We process refund:</strong> Full refund within 1-2 business days</li>
                      <li><strong>Worker faces consequences:</strong> 30-day suspension + $50 penalty (or permanent ban if second offense)</li>
                    </ol>
                  </div>

                  <div className="bg-white p-3 rounded">
                    <p className="text-xs font-semibold mb-1">⏱️ Grace period:</p>
                    <p className="text-xs">Please allow 15 minutes past shift start before reporting a no-show (traffic, parking issues happen). But if they haven't called or texted by then, it's a no-show.</p>
                  </div>

                  <div>
                    <p className="font-semibold text-sm">What if the worker shows up late:</p>
                    <ul className="list-disc pl-6 text-sm space-y-1 mt-1">
                      <li><strong>Called ahead, <30 minutes late:</strong> Not a no-show (but you can rate them lower)</li>
                      <li><strong>Didn't call, <30 minutes late:</strong> Your choice to accept them or report as no-show</li>
                      <li><strong>>30 minutes late, no call:</strong> Definitely a no-show</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Emergency Exceptions */}
              <div className="bg-purple-50 p-6 rounded border border-purple-400">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">🏥</span>
                  <p className="text-xl font-semibold text-purple-800">Emergency Exceptions (Documented)</p>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <p className="font-semibold text-sm">You can cancel without penalty (full refund) if:</p>
                    <ul className="list-disc pl-6 text-sm space-y-1 mt-1">
                      <li><strong>Natural disaster:</strong> Blizzard, flood, hurricane forces closure</li>
                      <li><strong>Power outage:</strong> Utility confirms outage preventing operations</li>
                      <li><strong>Health department closure:</strong> Inspection forces temporary closure</li>
                      <li><strong>Fire/flood damage:</strong> Emergency at venue prevents opening</li>
                      <li><strong>Mandated closure:</strong> Government order (pandemic lockdown, emergency)</li>
                    </ul>
                  </div>

                  <div>
                    <p className="font-semibold text-sm">How to get emergency exception:</p>
                    <ol className="list-decimal pl-6 text-sm space-y-1 mt-1">
                      <li><strong>Contact worker immediately</strong> (text/call to inform them)</li>
                      <li><strong>Email SwipeAShift support:</strong> support@swipeashift.com</li>
                      <li><strong>Provide documentation:</strong> News article, utility notice, health dept letter, etc.</li>
                      <li><strong>We review and approve:</strong> Usually same day</li>
                      <li><strong>Full refund processed:</strong> Within 1-2 business days</li>
                      <li><strong>Worker compensated:</strong> We may provide a partial payment to worker from SwipeAShift (not you)</li>
                    </ol>
                  </div>

                  <div className="bg-white p-3 rounded border border-purple-300">
                    <p className="font-semibold text-xs text-purple-800 mb-1">❌ NOT EXCUSED:</p>
                    <ul className="list-disc pl-4 text-xs space-y-1">
                      <li>"Business was slower than expected" (not an emergency)</li>
                      <li>"We had enough staff" (planning issue)</li>
                      <li>"Owner changed their mind" (not an emergency)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 4. Payment Approval Process */}
          <div>
            <h2 className="text-2xl font-semibold text-teal-700 mb-3">4. Payment Approval Process (48-Hour Auto-Approve)</h2>
            
            <p className="mb-4">
              After a shift completes, venues have 48 hours to review and approve (or dispute) the work. Here's how it works:
            </p>

            <div className="bg-blue-50 p-6 rounded border border-blue-300 space-y-4">
              <div>
                <p className="font-semibold text-blue-900 mb-2">Timeline:</p>
                
                <div className="space-y-3">
                  <div className="bg-white p-3 rounded">
                    <p className="font-semibold text-sm">⏰ Shift completes (worker clocks out)</p>
                    <p className="text-xs mt-1">48-hour review window begins immediately</p>
                  </div>

                  <div className="bg-white p-3 rounded">
                    <p className="font-semibold text-sm">🎯 Within 48 hours - Venue approves:</p>
                    <ul className="list-disc pl-4 text-xs space-y-1 mt-1">
                      <li>Click "Approve Shift" in dashboard</li>
                      <li>Optionally rate worker and leave feedback</li>
                      <li>Payment releases immediately to worker</li>
                      <li>Worker receives funds in 1-2 business days</li>
                    </ul>
                  </div>

                  <div className="bg-white p-3 rounded">
                    <p className="font-semibold text-sm">⚠️ Within 48 hours - Venue disputes:</p>
                    <ul className="list-disc pl-4 text-xs space-y-1 mt-1">
                      <li>Click "Dispute Shift" in dashboard</li>
                      <li>Select reason: No-show / Left early / Performance issue / Other</li>
                      <li>Provide details and evidence (timestamps, photos, witness statements)</li>
                      <li>SwipeAShift support reviews (typically 24-48 hours)</li>
                      <li>We mediate and make final decision</li>
                      <li>Payment held until resolved</li>
                    </ul>
                  </div>

                  <div className="bg-green-100 p-3 rounded border border-green-400">
                    <p className="font-semibold text-sm text-green-800">✅ 48 hours pass - Auto-approve:</p>
                    <ul className="list-disc pl-4 text-xs space-y-1 mt-1">
                      <li>If venue doesn't approve OR dispute within 48 hours</li>
                      <li>Shift is <strong>automatically approved</strong></li>
                      <li>Payment releases immediately to worker</li>
                      <li>Venue can no longer dispute</li>
                      <li><strong>This protects workers from delayed payment</strong></li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <p className="font-semibold text-blue-900 mb-2">Dispute resolution:</p>
                
                <div className="space-y-2">
                  <div className="bg-white p-3 rounded">
                    <p className="font-semibold text-xs">If venue disputes no-show:</p>
                    <p className="text-xs mt-1">We check: Did worker clock in? Any GPS/photo verification? Did venue report immediately? → If confirmed no-show, venue gets full refund + worker suspended.</p>
                  </div>

                  <div className="bg-white p-3 rounded">
                    <p className="font-semibold text-xs">If venue disputes "left early":</p>
                    <p className="text-xs mt-1">We check: Clock-out time vs shift end time. → If worker left >1 hour early without permission, partial refund to venue. If <1 hour or had permission, payment to worker stands.</p>
                  </div>

                  <div className="bg-white p-3 rounded">
                    <p className="font-semibold text-xs">If venue disputes "poor performance":</p>
                    <p className="text-xs mt-1">This is NOT grounds for non-payment unless worker violated safety rules, was intoxicated, or committed misconduct. Poor performance = low rating, not refund. Workers still get paid.</p>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 p-3 rounded border border-yellow-400">
                <p className="font-semibold text-yellow-800 mb-1">⚠️ Important for venues:</p>
                <p className="text-xs">You have 48 hours to dispute. After auto-approve, you can't get a refund even if you later discover an issue. Review shifts promptly!</p>
              </div>
            </div>
          </div>

          {/* 5. Refund Processing Times */}
          <div>
            <h2 className="text-2xl font-semibold text-teal-700 mb-3">5. Refund Processing Times</h2>
            
            <div className="bg-gray-50 p-4 rounded">
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center pb-2 border-b border-gray-300">
                  <span><strong>Venue cancels >24hrs:</strong></span>
                  <span className="text-green-700 font-semibold">5-7 business days (full refund)</span>
                </div>

                <div className="flex justify-between items-center pb-2 border-b border-gray-300">
                  <span><strong>Venue cancels <24hrs:</strong></span>
                  <span className="text-orange-700 font-semibold">5-7 business days (partial refund, minus 2-hr fee)</span>
                </div>

                <div className="flex justify-between items-center pb-2 border-b border-gray-300">
                  <span><strong>Worker no-show:</strong></span>
                  <span className="text-green-700 font-semibold">1-2 business days (full refund)</span>
                </div>

                <div className="flex justify-between items-center pb-2 border-b border-gray-300">
                  <span><strong>Disputed shift (resolved in venue's favor):</strong></span>
                  <span className="text-green-700 font-semibold">1-2 business days after resolution</span>
                </div>

                <div className="flex justify-between items-center pb-2">
                  <span><strong>Emergency exception:</strong></span>
                  <span className="text-green-700 font-semibold">1-2 business days after approval</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-gray-600 mt-3">
              <em>Note: Refund times depend on your bank/card issuer. SwipeAShift processes refunds immediately, but your bank may take 3-7 additional days to post the credit.</em>
            </p>
          </div>

          {/* 6. Policy Changes */}
          <div>
            <h2 className="text-2xl font-semibold text-teal-700 mb-3">6. Changes to This Policy</h2>
            
            <p className="mb-3">
              We may update this cancellation policy as we learn and improve. Material changes will be posted with a new "Effective" date, and we'll email all users.
            </p>

            <p className="text-sm">
              Continued use of SwipeAShift after changes = acceptance of new policy.
            </p>
          </div>

          {/* Contact */}
          <div className="bg-teal-50 border-l-4 border-teal-600 p-6 rounded">
            <h2 className="text-xl font-semibold text-teal-800 mb-3">Questions or Disputes?</h2>
            <p className="mb-3">
              If you need to cancel a shift, have a dispute, or need help with an emergency:
            </p>
            <ul className="space-y-1">
              <li><strong>Support:</strong> <a href="mailto:support@swipeashift.com" className="text-teal-700 underline">support@swipeashift.com</a></li>
              <li><strong>Urgent issues:</strong> Call our support line (coming soon)</li>
              <li><strong>Disputes:</strong> <a href="mailto:disputes@swipeashift.com" className="text-teal-700 underline">disputes@swipeashift.com</a></li>
            </ul>
            <p className="mt-3 text-sm">
              We're here to mediate fairly and keep the platform working for everyone. 🌊
            </p>
          </div>

          {/* Footer */}
          <hr className="border-gray-300" />
          <div className="text-xs text-gray-600 space-y-1">
            <p><strong>Effective Date:</strong> November 5, 2025</p>
            <p><strong>Version:</strong> 1.0</p>
            <p><strong>Business Address:</strong> 170 Commerce Way, Suite 200, Portsmouth, NH 03801</p>
            <p>© 2025 SwipeAShift LLC | <a href="mailto:compliance@swipeashift.com" className="text-teal-700 underline">compliance@swipeashift.com</a></p>
          </div>

          <div className="text-center mt-6">
            <Link href="/legal" className="text-teal-700 hover:underline">
              ← Back to Legal Center
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
