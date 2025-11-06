// File: /app/legal/terms-workers/page.tsx
import Link from "next/link";

export default function WorkerTermsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0f9ea5] via-[#33b5b9] to-[#b1e4e8] flex justify-center items-start">
      <div className="max-w-5xl w-full mx-auto px-8 py-16">
        <h1 className="text-4xl font-bold text-white mb-6 border-b border-white/30 pb-2">
          Terms of Service — Workers
        </h1>

        <section className="bg-white/80 rounded-2xl p-8 shadow-lg backdrop-blur text-gray-800 leading-relaxed space-y-8">
          
          {/* Friendly Introduction */}
          <div className="bg-teal-50 border-l-4 border-teal-600 p-6 rounded">
            <p className="text-lg">
              <strong>Welcome to SwipeAShift!</strong> We're here to give you the flexibility to work when and where you want — picking up shifts that fit your life. These Terms explain how our platform works, what we expect from you, and what you can expect from us. By creating an account or accepting shifts, you agree to these Terms.
            </p>
          </div>

          {/* 1. What SwipeAShift Does */}
          <div>
            <h2 className="text-2xl font-semibold text-teal-700 mb-3">1. What SwipeAShift Does</h2>
            <p>
              SwipeAShift is a marketplace connecting hospitality workers with restaurants and venues that need help. We're like the friend who texts "need a hand tonight?" — just a lil help when venues need it most.
            </p>
            <p className="mt-3">
              <strong>We are NOT:</strong>
            </p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Your employer (you're an independent contractor)</li>
              <li>The venue's employer or agent</li>
              <li>Responsible for what happens at the venue</li>
              <li>A staffing agency (you choose your own shifts)</li>
            </ul>
            <p className="mt-3">
              <strong>We ARE:</strong>
            </p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>A platform that matches workers with shifts</li>
              <li>The payment processor (we handle getting you paid)</li>
              <li>Your support team (we're here if issues come up)</li>
              <li>Building a community where everyone rises together</li>
            </ul>
          </div>

          {/* 2. You're an Independent Contractor */}
          <div>
            <h2 className="text-2xl font-semibold text-teal-700 mb-3">2. You're an Independent Contractor (Not an Employee)</h2>
            <p>
              This is important: <strong>You are NOT an employee of SwipeAShift or any venue you work with.</strong> You're an independent professional who chooses when and where to work.
            </p>
            
            <div className="mt-4 bg-gray-50 p-4 rounded border border-gray-200">
              <p className="font-semibold mb-2">What this means for you:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Freedom:</strong> You decide which shifts to accept. No minimums, no schedules, no boss.</li>
                <li><strong>Flexibility:</strong> Work one shift or twenty. It's up to you.</li>
                <li><strong>Multiple gigs:</strong> You can work for as many venues as you want, use other platforms, have other jobs.</li>
                <li><strong>No benefits:</strong> You don't get health insurance, PTO, or retirement from us or venues. (That's the trade-off for flexibility.)</li>
                <li><strong>Taxes:</strong> You're responsible for paying your own taxes. We'll send you a 1099 form if you earn $600+ per year.</li>
                <li><strong>Your own tools:</strong> Bring comfortable shoes, wear clean clothes. Venues provide uniforms/equipment if needed, not us.</li>
              </ul>
            </div>

            <p className="mt-4 text-sm text-gray-600">
              <em>Legal note: Nothing in these Terms creates an employment, partnership, or agency relationship between you and SwipeAShift or between you and any venue. You're a true independent contractor under federal and state law.</em>
            </p>
          </div>

          {/* 3. Roles We Focus On */}
          <div>
            <h2 className="text-2xl font-semibold text-teal-700 mb-3">3. Roles We Focus On</h2>
            <p>
              SwipeAShift works best for <strong>support positions</strong> that need minimal venue-specific training — the roles where one more set of hands changes everything.
            </p>
            
            <div className="mt-4 grid md:grid-cols-2 gap-4">
              <div className="bg-green-50 p-4 rounded border border-green-200">
                <p className="font-semibold text-green-800 mb-2">✅ Perfect for SwipeAShift:</p>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>Bussers / Table bussers</li>
                  <li>Bar backs</li>
                  <li>Hosts / Hostesses</li>
                  <li>Food runners</li>
                  <li>Dishwashers</li>
                  <li>Event support staff</li>
                  <li>Catering helpers</li>
                  <li>Prep assistants (basic tasks)</li>
                </ul>
              </div>

              <div className="bg-yellow-50 p-4 rounded border border-yellow-300">
                <p className="font-semibold text-yellow-800 mb-2">⚠️ May not work well:</p>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>Servers (need menu knowledge, regular customers)</li>
                  <li>Bartenders (need drink recipes, regulars)</li>
                  <li>Line cooks (need station knowledge, recipes)</li>
                  <li>Sous chefs (leadership roles)</li>
                </ul>
                <p className="text-xs mt-2 text-gray-600">
                  <em>Venues can post these roles, but they work best with consistent staff who know the menu/recipes.</em>
                </p>
              </div>
            </div>

            <p className="mt-4">
              <strong>Your responsibility:</strong> Only accept shifts for roles you're qualified to perform. If a venue requires certifications (ServSafe, alcohol service license, food handler's permit), make sure you have them before accepting.
            </p>
          </div>

          {/* 4. How Pay Works */}
          <div>
            <h2 className="text-2xl font-semibold text-teal-700 mb-3">4. How Pay Works (Transparent Pricing)</h2>
            
            <p className="mb-4">
              We believe in total transparency. The rate you see when browsing shifts is <strong>what you take home</strong> — no hidden fees, no surprises.
            </p>

            <div className="bg-blue-50 p-6 rounded border border-blue-200 space-y-4">
              <div>
                <p className="font-semibold text-blue-900 mb-2">📊 How pricing works:</p>
                <ol className="list-decimal pl-6 space-y-2">
                  <li>Venue sets an "all-in" rate for the shift (e.g., $24/hour)</li>
                  <li>SwipeAShift takes a 20% platform fee ($4.80/hour in this example)</li>
                  <li><strong>You receive the rest ($19.20/hour in this example)</strong></li>
                  <li>The rate you see in the app is YOUR rate — what you actually earn</li>
                </ol>
              </div>

              <div className="border-t border-blue-300 pt-4">
                <p className="font-semibold text-blue-900 mb-2">💰 Real examples:</p>
                
                <div className="space-y-3 text-sm">
                  <div className="bg-white p-3 rounded">
                    <p className="font-semibold">Busser - Friday Dinner</p>
                    <p>Venue pays: $24/hr all-in</p>
                    <p className="text-green-700 font-semibold">You earn: $19.20/hr</p>
                    <p className="text-xs text-gray-600">6-hour shift = $115.20 total</p>
                  </div>

                  <div className="bg-white p-3 rounded">
                    <p className="font-semibold">Bar Back - Saturday Night (HIGH DEMAND 🔥)</p>
                    <p>Venue pays: $28/hr all-in</p>
                    <p className="text-green-700 font-semibold">You earn: $22.40/hr</p>
                    <p className="text-xs text-gray-600">Plus surge: 1.2x = $26.88/hr! (6-hour shift = $161.28 total)</p>
                  </div>

                  <div className="bg-white p-3 rounded">
                    <p className="font-semibold">Host - Tuesday Evening</p>
                    <p>Venue pays: $20/hr all-in</p>
                    <p className="text-green-700 font-semibold">You earn: $16/hr</p>
                    <p className="text-xs text-gray-600">4-hour shift = $64 total</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-blue-300 pt-4">
                <p className="font-semibold text-blue-900 mb-2">🔥 Dynamic pricing (Surge):</p>
                <p className="text-sm">
                  During high-demand times (Friday/Saturday nights, last-minute needs, bad weather), rates can increase by 10-20%. <strong>If surge kicks in, you earn more!</strong> The higher rate is automatically reflected in what you see.
                </p>
                <p className="text-xs text-gray-600 mt-2">
                  Example: A $24/hr shift with 1.15x surge becomes $27.60/hr to the venue, and you earn $22.08/hr instead of $19.20/hr.
                </p>
              </div>
            </div>

            <div className="mt-4 bg-gray-50 p-4 rounded">
              <p className="font-semibold mb-2">When you get paid:</p>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>After you complete your shift, the venue has <strong>48 hours</strong> to approve it</li>
                <li>Most venues approve right away, but we give them time to review</li>
                <li>If the venue doesn't respond within 48 hours, payment is <strong>automatically approved</strong></li>
                <li>Once approved, funds are sent to your bank account via Stripe (usually 1-2 business days)</li>
                <li><strong>Our guarantee: You'll be paid within 2 business days of shift completion, no matter what</strong></li>
              </ul>
            </div>

            <p className="mt-4 text-sm text-gray-600">
              <em>Payment processing: All payments are handled through Stripe Connect. You'll create a Stripe account when you sign up (it's fast and secure). We never hold your money — Stripe does, and they're a trusted financial institution.</em>
            </p>
          </div>

          {/* 5. Tips */}
          <div>
            <h2 className="text-2xl font-semibold text-teal-700 mb-3">5. Tips (100% Yours!)</h2>
            
            <div className="bg-green-50 p-4 rounded border border-green-300">
              <p className="font-semibold text-green-800 text-lg mb-2">💵 You keep 100% of your tips.</p>
              <p>SwipeAShift never touches tips. Tips are between you and the venue, handled according to the venue's tip policy.</p>
            </div>

            <div className="mt-4 space-y-3">
              <p><strong>How tips work for support roles:</strong></p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Bussers, bar backs, food runners:</strong> Many venues have tip-sharing or tip-pool arrangements. The venue will tell you how their system works when you arrive.
                </li>
                <li>
                  <strong>Hosts, dishwashers:</strong> Some venues include these roles in tip sharing, some don't. Check the shift details or ask when you arrive.
                </li>
                <li>
                  <strong>Your responsibility:</strong> Track and report all tips as income for tax purposes. Venues should provide tip documentation, but keep your own records too.
                </li>
              </ul>

              <p className="mt-4 text-sm">
                For full details on tip transparency and venue responsibilities, see our <Link href="/legal/tip-transparency" className="text-teal-700 underline">Tip Transparency Policy</Link>.
              </p>

              <p className="mt-3 text-sm text-gray-600">
                <em>If you believe a venue is withholding tips or not following their stated tip policy, contact us immediately at compliance@swipeashift.com. We take this seriously.</em>
              </p>
            </div>
          </div>

          {/* 6. Accepting and Cancelling Shifts */}
          <div>
            <h2 className="text-2xl font-semibold text-teal-700 mb-3">6. Accepting and Cancelling Shifts</h2>
            
            <p className="mb-4">
              Life happens — we get it. But venues count on you when you accept a shift. Here's our policy:
            </p>

            <div className="space-y-4">
              <div className="bg-green-50 p-4 rounded border border-green-300">
                <p className="font-semibold text-green-800 mb-2">✅ FREE CANCELLATION (No penalty):</p>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li><strong>More than 24 hours before shift:</strong> Cancel anytime, no questions asked</li>
                  <li>The shift goes back into the marketplace for other workers</li>
                  <li>Your rating is not affected</li>
                </ul>
              </div>

              <div className="bg-yellow-50 p-4 rounded border border-yellow-400">
                <p className="font-semibold text-yellow-800 mb-2">⚠️ LAST-MINUTE CANCELLATION (Penalty):</p>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li><strong>2-24 hours before shift:</strong> You'll get a warning. Three warnings in 90 days = temporary suspension</li>
                  <li><strong>Less than 2 hours before shift:</strong> $25 fee OR 1 hour of the shift rate (whichever is greater)</li>
                  <li>Example: $20/hr shift = $25 fee | $30/hr shift = $30 fee</li>
                  <li>This protects venues who are left scrambling at the last minute</li>
                </ul>
              </div>

              <div className="bg-red-50 p-4 rounded border border-red-400">
                <p className="font-semibold text-red-800 mb-2">🚫 NO-SHOW (Strict Policy):</p>
                <p className="text-sm mb-2">If you accept a shift and don't show up:</p>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li><strong>First no-show:</strong> Immediate 30-day suspension + $50 penalty (or full shift value, whichever is less)</li>
                  <li>Must complete a re-training module to reactivate your account</li>
                  <li><strong>Second no-show:</strong> Permanent account termination</li>
                  <li>No-shows devastate venues. We have zero tolerance for this.</li>
                </ul>
              </div>

              <div className="bg-blue-50 p-4 rounded border border-blue-300">
                <p className="font-semibold text-blue-800 mb-2">🏥 EMERGENCY EXCEPTIONS:</p>
                <p className="text-sm mb-2">We understand true emergencies. These are excused if you provide documentation within 24 hours:</p>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>Hospitalization (ER records, admission papers)</li>
                  <li>Death in immediate family (obituary, funeral notice)</li>
                  <li>Car accident en route to shift (police report, tow receipt)</li>
                  <li>Natural disaster/emergency (news verification)</li>
                  <li>Positive COVID-19 test (lab results)</li>
                </ul>
                <p className="text-xs text-red-600 mt-2">
                  <strong>NOT excused:</strong> "Car broke down" without proof, "felt sick" without medical visit, "forgot," "another shift came up," or any undocumented excuse.
                </p>
              </div>
            </div>

            <p className="mt-4 text-sm">
              For full details, see our <Link href="/legal/cancellation" className="text-teal-700 underline">Cancellation & Refund Policy</Link>.
            </p>
          </div>

          {/* 7. Background Checks & Verification */}
          <div>
            <h2 className="text-2xl font-semibold text-teal-700 mb-3">7. Background Checks & Verification (Optional But Recommended)</h2>
            
            <p className="mb-4">
              Background checks are <strong>optional</strong> on SwipeAShift, but getting verified opens up more opportunities and higher-paying shifts. We use a tiered system:
            </p>

            <div className="space-y-3">
              <div className="bg-gray-50 p-4 rounded border border-gray-300">
                <p className="font-semibold mb-1">🆓 <strong>Tier 1: Basic (Free - You have this now!)</strong></p>
                <ul className="list-disc pl-6 text-sm space-y-1">
                  <li>Email and phone verification</li>
                  <li>Profile complete</li>
                  <li>Access to shifts marked "No verification required"</li>
                </ul>
              </div>

              <div className="bg-blue-50 p-4 rounded border border-blue-300">
                <p className="font-semibold mb-1">✓ <strong>Tier 2: ID Verified (Free - Coming December 2025)</strong></p>
                <ul className="list-disc pl-6 text-sm space-y-1">
                  <li>Government-issued ID verified via Stripe Identity</li>
                  <li>Confirms your name, date of birth, and photo match</li>
                  <li>Badge on your profile: <span className="inline-block bg-blue-600 text-white text-xs px-2 py-1 rounded">✓ ID Verified</span></li>
                  <li>Access to more shifts (many venues require this minimum)</li>
                  <li><strong>Cost: FREE</strong> (we cover it)</li>
                </ul>
              </div>

              <div className="bg-green-50 p-4 rounded border border-green-400">
                <p className="font-semibold mb-1">⭐ <strong>Tier 3: Background Checked (Coming January 2026)</strong></p>
                <ul className="list-disc pl-6 text-sm space-y-1">
                  <li>7-year criminal background check via Checkr</li>
                  <li>Includes: National criminal database, county records, sex offender registry, SSN validation</li>
                  <li>Badge on your profile: <span className="inline-block bg-green-600 text-white text-xs px-2 py-1 rounded">✓ Background Checked</span></li>
                  <li>Access to premium shifts at hotels, upscale restaurants, private events</li>
                  <li>Priority placement in search results</li>
                  <li><strong>Cost: $35/year</strong> (you pay)</li>
                </ul>
                <p className="text-xs text-gray-600 mt-2">
                  <em>Note: Having a criminal record doesn't automatically disqualify you. Venues set their own standards, and many are willing to work with people rebuilding their lives. The check just gives venues information to make informed decisions.</em>
                </p>
              </div>

              <div className="bg-purple-50 p-4 rounded border border-purple-400">
                <p className="font-semibold mb-1">🌟 <strong>Tier 4: Elite Verified (Coming Q2 2026)</strong></p>
                <ul className="list-disc pl-6 text-sm space-y-1">
                  <li>Everything in Tier 3, PLUS:</li>
                  <li>Professional references verified (2-3 contacts)</li>
                  <li>Work history verified</li>
                  <li>Optional: ServSafe or other certifications</li>
                  <li>Badge on your profile: <span className="inline-block bg-purple-600 text-white text-xs px-2 py-1 rounded">⭐ Elite Verified</span></li>
                  <li>VIP access to country clubs, fine dining, high-end events</li>
                  <li>Highest priority in search, premium pay rates</li>
                  <li><strong>Cost: $79/year</strong> (you pay)</li>
                </ul>
              </div>
            </div>

            <p className="mt-4 text-sm">
              <strong>Why get verified?</strong> Verified workers report 30-50% more bookings and access to higher-paying venues. It's an investment in your earning potential.
            </p>

            <p className="mt-3 text-sm">
              For full details on background checks, FCRA rights, and the verification process, see our <Link href="/legal/background-check" className="text-teal-700 underline">Background Check Policy</Link>.
            </p>
          </div>

          {/* 8. Your Responsibilities */}
          <div>
            <h2 className="text-2xl font-semibold text-teal-700 mb-3">8. Your Responsibilities (Be a Pro)</h2>
            
            <p className="mb-4">Every shift matters. Behind every great meal are the hands that make it happen. Here's what we expect:</p>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="font-semibold mb-2">✅ DO:</p>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>Show up on time (15 minutes early is on time)</li>
                  <li>Come prepared (clean clothes, comfortable shoes)</li>
                  <li>Follow venue policies and directions</li>
                  <li>Treat everyone with respect (staff, customers, managers)</li>
                  <li>Work hard and be professional</li>
                  <li>Communicate proactively (issues, questions, concerns)</li>
                  <li>Ask for help if you're unsure about something</li>
                  <li>Leave the venue better than you found it</li>
                </ul>
              </div>

              <div>
                <p className="font-semibold mb-2 text-red-700">❌ DON'T:</p>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>Show up late or intoxicated</li>
                  <li>Use your phone during the shift (except emergencies)</li>
                  <li>Harass, discriminate, or disrespect anyone</li>
                  <li>Steal (money, food, supplies) — instant termination</li>
                  <li>Try to negotiate direct hire with venues (platform bypass)</li>
                  <li>Share your account or let others use it</li>
                  <li>Accept shifts you're not qualified for</li>
                  <li>No-call, no-show (see section 6)</li>
                </ul>
              </div>
            </div>

            <p className="mt-4 text-sm">
              <strong>Account suspension/termination:</strong> We can suspend or permanently ban your account for violating these terms, especially for: no-shows, theft, harassment, safety violations, or trying to bypass the platform.
            </p>
          </div>

          {/* 9. Ratings & Reviews */}
          <div>
            <h2 className="text-2xl font-semibold text-teal-700 mb-3">9. Ratings & Reviews</h2>
            
            <p className="mb-3">
              After each shift, venues can rate you (1-5 stars) and leave feedback. Your rating affects which shifts you can access and how venues see you.
            </p>

            <div className="bg-gray-50 p-4 rounded space-y-3">
              <div>
                <p className="font-semibold">⭐ Rating thresholds:</p>
                <ul className="list-disc pl-6 text-sm space-y-1">
                  <li><strong>4.8-5.0:</strong> Elite status — priority placement, best shifts</li>
                  <li><strong>4.5-4.7:</strong> Great standing — full access to all shifts</li>
                  <li><strong>4.0-4.4:</strong> Good standing — access to most shifts</li>
                  <li><strong>Below 4.0:</strong> Warning status — limited access, improvement required</li>
                  <li><strong>Below 3.5:</strong> Account review — possible suspension</li>
                </ul>
              </div>

              <div>
                <p className="font-semibold">Disputing unfair ratings:</p>
                <p className="text-sm">If you believe a rating is unfair or retaliatory, contact support within 7 days. We'll review and may remove it if it violates our policies.</p>
              </div>
            </div>
          </div>

          {/* 10. Liability & What We're NOT Responsible For */}
          <div>
            <h2 className="text-2xl font-semibold text-teal-700 mb-3">10. Liability & What We're NOT Responsible For</h2>
            
            <div className="bg-red-50 p-4 rounded border border-red-300 space-y-3">
              <p className="font-semibold text-red-800">Important legal stuff you need to know:</p>
              
              <div>
                <p className="font-semibold text-sm">Platform provided "AS IS":</p>
                <p className="text-sm">
                  SwipeAShift is provided as-is, without warranties. We don't guarantee that shifts will always be available, that venues are perfect, or that technology never fails. We do our best, but we're not perfect.
                </p>
              </div>

              <div>
                <p className="font-semibold text-sm">If you get hurt at a venue:</p>
                <p className="text-sm">
                  <strong>The venue is responsible, not us.</strong> Venues must carry workers' compensation insurance and general liability. If you're injured during a shift, immediately notify the venue manager and SwipeAShift support. The venue's insurance should cover you. We'll help facilitate, but we're not the insurer.
                </p>
              </div>

              <div>
                <p className="font-semibold text-sm">Venue behavior:</p>
                <p className="text-sm">
                  We're not responsible for how venues treat you, their policies, safety conditions, or payment of tips. If a venue behaves badly, report them to us and we'll investigate. Serious violations = venue banned.
                </p>
              </div>

              <div>
                <p className="font-semibold text-sm">Your actions:</p>
                <p className="text-sm">
                  You're responsible for your own conduct. If you damage property, injure someone, steal, or violate laws, that's on you. You agree to indemnify (protect) SwipeAShift from any claims arising from your actions.
                </p>
              </div>

              <div>
                <p className="font-semibold text-sm">Maximum liability:</p>
                <p className="text-sm">
                  If we're found liable for something (which we work hard to avoid), our maximum liability is the amount you earned through the platform in the past 12 months, or $100, whichever is greater. This is standard for tech platforms.
                </p>
              </div>
            </div>
          </div>

          {/* 11. Taxes */}
          <div>
            <h2 className="text-2xl font-semibold text-teal-700 mb-3">11. Taxes (You're Responsible)</h2>
            
            <p className="mb-3">
              As an independent contractor, <strong>you're responsible for your own taxes.</strong> SwipeAShift doesn't withhold federal, state, or Social Security taxes from your payments.
            </p>

            <div className="bg-yellow-50 p-4 rounded border border-yellow-400 space-y-3">
              <div>
                <p className="font-semibold text-yellow-800">📋 What you need to know:</p>
                <ul className="list-disc pl-6 text-sm space-y-1">
                  <li><strong>1099-NEC form:</strong> If you earn $600 or more in a calendar year, Stripe will send you a 1099-NEC form by January 31st. You'll use this to file your taxes.</li>
                  <li><strong>Quarterly estimated taxes:</strong> You may need to pay estimated taxes quarterly if you earn significant income. Talk to a tax professional.</li>
                  <li><strong>Self-employment tax:</strong> You'll owe about 15.3% for Social Security and Medicare, plus your regular income tax rate.</li>
                  <li><strong>Track your tips:</strong> All tips must be reported as income. Keep good records.</li>
                  <li><strong>Deductions:</strong> You may be able to deduct mileage, work clothes, phone costs, etc. Consult a tax pro.</li>
                </ul>
              </div>

              <p className="text-xs text-gray-600">
                <em>We're not tax advisors. This is general info. For specific guidance, consult a CPA or tax professional. The IRS has resources at <a href="https://www.irs.gov/businesses/gig-economy-tax-center" target="_blank" rel="noopener" className="text-teal-700 underline">irs.gov/gig-economy</a>.</em>
              </p>
            </div>
          </div>

          {/* 12. Privacy & Your Data */}
          <div>
            <h2 className="text-2xl font-semibold text-teal-700 mb-3">12. Privacy & Your Data</h2>
            
            <p className="mb-3">
              We collect information to run the platform (your name, contact info, work history, ratings, payment info). We take your privacy seriously and never sell your data.
            </p>

            <p className="text-sm">
              For full details, see our <Link href="/legal/privacy" className="text-teal-700 underline">Privacy Policy</Link>.
            </p>

            <div className="mt-3 bg-gray-50 p-3 rounded text-sm">
              <p className="font-semibold mb-2">Quick summary:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>We use your data to match you with shifts and process payments</li>
                <li>Venues see your profile, ratings, and verification status</li>
                <li>We share data with Stripe (payments), Checkr (background checks), and our hosting providers</li>
                <li>You can request your data or delete your account anytime</li>
                <li>We comply with GDPR, CCPA, and other privacy laws</li>
              </ul>
            </div>
          </div>

          {/* 13. Dispute Resolution */}
          <div>
            <h2 className="text-2xl font-semibold text-teal-700 mb-3">13. Dispute Resolution (Let's Talk First)</h2>
            
            <p className="mb-3">
              If you have a problem with SwipeAShift, please contact us first at support@swipeashift.com. We're reasonable people and will work with you to resolve issues.
            </p>

            <div className="bg-gray-50 p-4 rounded space-y-3">
              <div>
                <p className="font-semibold">Informal resolution:</p>
                <p className="text-sm">
                  Give us 30 days to try to resolve any dispute informally. Most issues can be solved with a conversation.
                </p>
              </div>

              <div>
                <p className="font-semibold">Binding arbitration:</p>
                <p className="text-sm">
                  If we can't resolve the issue, you agree that disputes will be settled through <strong>binding arbitration</strong> (not court), conducted under American Arbitration Association (AAA) rules. Arbitration is faster and cheaper than lawsuits.
                </p>
                <ul className="list-disc pl-6 text-xs space-y-1 mt-2">
                  <li>Location: Portsmouth, NH or via Zoom (remote)</li>
                  <li>Each party pays their own costs (unless law requires us to pay yours)</li>
                  <li>Decision is final and binding</li>
                  <li>You waive the right to a jury trial</li>
                </ul>
              </div>

              <div>
                <p className="font-semibold">Class action waiver:</p>
                <p className="text-sm">
                  You agree to resolve disputes individually, not as part of a class action. You can't join with other workers to sue us collectively. (Some states may not allow this waiver.)
                </p>
              </div>

              <div>
                <p className="font-semibold">Small claims court exception:</p>
                <p className="text-sm">
                  If the dispute is under $5,000, you can file in small claims court instead of arbitration if you prefer.
                </p>
              </div>
            </div>

            <p className="text-xs text-gray-600 mt-3">
              <em>Governed by the Federal Arbitration Act. If any part of this arbitration clause is found invalid, the rest still applies.</em>
            </p>
          </div>

          {/* 14. Changes to These Terms */}
          <div>
            <h2 className="text-2xl font-semibold text-teal-700 mb-3">14. Changes to These Terms</h2>
            
            <p className="mb-3">
              We may update these Terms from time to time as we improve the platform or comply with new laws. Material changes will be posted here with a new "Effective" date, and we'll email you if the changes significantly affect your rights.
            </p>

            <p className="text-sm">
              <strong>Continued use = acceptance:</strong> If you keep using SwipeAShift after we post changes, you're agreeing to the new Terms. If you don't like the changes, you can close your account.
            </p>
          </div>

          {/* 15. Termination */}
          <div>
            <h2 className="text-2xl font-semibold text-teal-700 mb-3">15. Termination (Closing Your Account)</h2>
            
            <div className="space-y-3">
              <div>
                <p className="font-semibold">You can quit anytime:</p>
                <p className="text-sm">
                  You're free to close your account at any time. Just email support@swipeashift.com or delete your account in the app. Make sure to complete any accepted shifts first.
                </p>
              </div>

              <div>
                <p className="font-semibold">We can terminate you for cause:</p>
                <p className="text-sm">
                  If you violate these Terms (no-shows, theft, harassment, fraud, bypassing the platform, safety violations), we can suspend or permanently terminate your account. You'll still be paid for completed shifts.
                </p>
              </div>

              <div>
                <p className="font-semibold">Effect of termination:</p>
                <ul className="list-disc pl-6 text-sm space-y-1">
                  <li>You lose access to the platform immediately</li>
                  <li>Any accepted future shifts are cancelled</li>
                  <li>Payment for completed shifts is still processed</li>
                  <li>Your data is retained per our Privacy Policy and legal requirements (typically 3 years for financial records)</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 16. General Legal Stuff */}
          <div>
            <h2 className="text-2xl font-semibold text-teal-700 mb-3">16. General Legal Stuff</h2>
            
            <div className="text-sm space-y-3">
              <div>
                <p className="font-semibold">Entire agreement:</p>
                <p>These Terms, plus our Privacy Policy, Tip Transparency Policy, and other referenced policies, make up the complete agreement between you and SwipeAShift.</p>
              </div>

              <div>
                <p className="font-semibold">Governing law:</p>
                <p>These Terms are governed by New Hampshire law (because that's where we're based), excluding conflict of law principles.</p>
              </div>

              <div>
                <p className="font-semibold">Severability:</p>
                <p>If any part of these Terms is found invalid or unenforceable, the rest still applies.</p>
              </div>

              <div>
                <p className="font-semibold">No waiver:</p>
                <p>If we don't enforce a provision once, that doesn't mean we waive the right to enforce it later.</p>
              </div>

              <div>
                <p className="font-semibold">Assignment:</p>
                <p>You can't transfer your account or these Terms to someone else. We can assign these Terms if SwipeAShift is acquired or merges with another company.</p>
              </div>

              <div>
                <p className="font-semibold">Force majeure:</p>
                <p>Neither party is liable for failures caused by events beyond reasonable control (natural disasters, pandemics, war, etc.).</p>
              </div>
            </div>
          </div>

          {/* Contact & Questions */}
          <div className="bg-teal-50 border-l-4 border-teal-600 p-6 rounded">
            <h2 className="text-xl font-semibold text-teal-800 mb-3">Questions? We're Here to Help</h2>
            <p className="mb-3">
              We know legal documents can be confusing. If you have questions about these Terms or anything else, reach out:
            </p>
            <ul className="space-y-1">
              <li><strong>Support:</strong> <a href="mailto:support@swipeashift.com" className="text-teal-700 underline">support@swipeashift.com</a></li>
              <li><strong>Compliance:</strong> <a href="mailto:compliance@swipeashift.com" className="text-teal-700 underline">compliance@swipeashift.com</a></li>
              <li><strong>Phone:</strong> Coming soon</li>
            </ul>
            <p className="mt-3 text-sm">
              We're building this community together. Your feedback helps us improve. 🌊
            </p>
          </div>

          {/* Footer */}
          <hr className="border-gray-300" />
          <div className="text-xs text-gray-600 space-y-1">
            <p><strong>Effective Date:</strong> November 5, 2025</p>
            <p><strong>Version:</strong> 1.0 - Workers</p>
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
