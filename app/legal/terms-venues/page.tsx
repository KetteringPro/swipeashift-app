// File: /app/legal/terms-venues/page.tsx
import Link from "next/link";

export default function VenueTermsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0f9ea5] via-[#33b5b9] to-[#b1e4e8] flex justify-center items-start">
      <div className="max-w-5xl w-full mx-auto px-8 py-16">
        <h1 className="text-4xl font-bold text-white mb-6 border-b border-white/30 pb-2">
          Terms of Service — Venues
        </h1>

        <section className="bg-white/80 rounded-2xl p-8 shadow-lg backdrop-blur text-gray-800 leading-relaxed space-y-8">
          
          {/* Friendly Introduction */}
          <div className="bg-teal-50 border-l-4 border-teal-600 p-6 rounded">
            <p className="text-lg">
              <strong>Welcome to SwipeAShift!</strong> We're here to give you the helping hands you need when you need them most — whether it's a last-minute call-out, a busy weekend, or an unexpected event. These Terms explain how our platform works, what you can expect from us, and what we expect from you. By creating an account or posting shifts, you agree to these Terms.
            </p>
          </div>

          {/* 1. What SwipeAShift Does */}
          <div>
            <h2 className="text-2xl font-semibold text-teal-700 mb-3">1. What SwipeAShift Does</h2>
            <p>
              SwipeAShift is a marketplace that connects restaurants and hospitality venues with experienced support staff. Think of us as your backup team — just a lil help when you need it most.
            </p>
            <p className="mt-3">
              <strong>We are NOT:</strong>
            </p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>A staffing agency (we don't employ workers)</li>
              <li>Your employee or agent</li>
              <li>The worker's employer (they're independent contractors)</li>
              <li>Responsible for worker conduct during shifts (you supervise them)</li>
              <li>An insurance provider</li>
            </ul>
            <p className="mt-3">
              <strong>We ARE:</strong>
            </p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>A technology platform that facilitates connections</li>
              <li>The payment processor (we handle transactions securely)</li>
              <li>Your support team (we're here if issues come up)</li>
              <li>Building a community where restaurants and workers rise together</li>
            </ul>
          </div>

          {/* 2. Who SwipeAShift Is For */}
          <div>
            <h2 className="text-2xl font-semibold text-teal-700 mb-3">2. Who SwipeAShift Is For (Complement Your Team, Don't Replace It)</h2>
            
            <p className="mb-4">
              SwipeAShift works best for <strong>support positions</strong> that need minimal venue-specific training — the roles where one more set of hands changes everything.
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-green-50 p-4 rounded border border-green-200">
                <p className="font-semibold text-green-800 mb-2">✅ Perfect for SwipeAShift:</p>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li><strong>Last-minute coverage:</strong> Busser called in sick, bar back no-show, need extra host for Valentine's Day</li>
                  <li><strong>Surge support:</strong> Unexpected rush, private event, holiday weekend</li>
                  <li><strong>Roles we focus on:</strong> Bussers, bar backs, hosts, food runners, dishwashers, prep assistants, event support</li>
                </ul>
              </div>

              <div className="bg-yellow-50 p-4 rounded border border-yellow-300">
                <p className="font-semibold text-yellow-800 mb-2">💡 Keep your core team:</p>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li><strong>Servers:</strong> Need menu knowledge, regular customer relationships — keep your experienced team</li>
                  <li><strong>Bartenders:</strong> Need drink recipes, regulars, finesse — better with consistent staff</li>
                  <li><strong>Line cooks:</strong> Need station knowledge, timing, teamwork — not ideal for gig work</li>
                </ul>
                <p className="text-xs mt-2 text-gray-600">
                  <em>You CAN post these roles if needed, but they work best with staff who know your venue.</em>
                </p>
              </div>
            </div>

            <div className="mt-4 bg-blue-50 p-4 rounded border border-blue-300">
              <p className="font-semibold text-blue-800 mb-2">🎯 Our mission:</p>
              <p className="text-sm">
                We're here to help you avoid turning guests away for lack of staff. SwipeAShift gives you reliable support when you need it, without replacing the core team that makes your venue special.
              </p>
            </div>
          </div>

          {/* 3. How Pricing Works */}
          <div>
            <h2 className="text-2xl font-semibold text-teal-700 mb-3">3. How Pricing Works (You Set the Rate)</h2>
            
            <p className="mb-4">
              <strong>You're in control.</strong> Just like Turo lets car owners set rental rates, SwipeAShift lets you set your own rates for shifts. We'll suggest smart pricing based on demand, but you decide what to pay.
            </p>

            <div className="bg-blue-50 p-6 rounded border border-blue-200 space-y-4">
              <div>
                <p className="font-semibold text-blue-900 mb-2">💰 All-in pricing (simple & transparent):</p>
                <ol className="list-decimal pl-6 space-y-2 text-sm">
                  <li>You set an "all-in" hourly rate (e.g., $24/hour)</li>
                  <li>This is what YOU pay — no surprise fees</li>
                  <li>Our 20% platform fee is included in that rate</li>
                  <li>The worker receives 80% ($19.20/hour in this example)</li>
                  <li>Stripe processing fees (~3%) are also included</li>
                </ol>
                <p className="text-xs text-gray-600 mt-2">
                  <em>Example: You post at $24/hr all-in → Worker sees $19.20/hr → We keep $4.80/hr (covers platform, payment processing, support, insurance)</em>
                </p>
              </div>

              <div className="border-t border-blue-300 pt-4">
                <p className="font-semibold text-blue-900 mb-2">🎯 Rate recommendations:</p>
                <p className="text-sm mb-2">
                  When you post a shift, we'll show you recommended rates based on:
                </p>
                <ul className="list-disc pl-6 text-xs space-y-1">
                  <li>Role type (bussers vs. bar backs vs. hosts)</li>
                  <li>Day and time (Friday night = higher demand)</li>
                  <li>How soon the shift starts (last-minute = higher)</li>
                  <li>What similar venues in your area are paying</li>
                  <li>Current supply/demand</li>
                </ul>
                <p className="text-xs text-gray-600 mt-2">
                  <em>You can accept our suggestion or set your own rate. Higher rates = faster fills.</em>
                </p>
              </div>

              <div className="border-t border-blue-300 pt-4">
                <p className="font-semibold text-blue-900 mb-2">🔥 Dynamic pricing (surge):</p>
                <p className="text-sm">
                  When demand is high (Friday/Saturday nights, last-minute needs, bad weather), rates may automatically increase by 10-20% to attract workers faster. You set a <strong>base rate</strong> and a <strong>maximum rate</strong> — we'll optimize within your range.
                </p>
                <div className="mt-2 bg-white p-3 rounded text-xs">
                  <p className="font-semibold mb-1">Example:</p>
                  <p>You set: Base $24/hr, Max $28/hr</p>
                  <p>Friday at 5pm: Demand is high, surge kicks in at 1.15x</p>
                  <p>Rate adjusts to: $27.60/hr (within your max)</p>
                  <p>Worker earns: $22.08/hr (more money = faster fill)</p>
                  <p className="text-green-700 font-semibold mt-1">Shift fills in 20 minutes instead of 3 hours! ✅</p>
                </div>
              </div>

              <div className="border-t border-blue-300 pt-4">
                <p className="font-semibold text-blue-900 mb-2">💵 Real pricing examples:</p>
                
                <div className="space-y-2">
                  <div className="bg-white p-3 rounded text-sm">
                    <p className="font-semibold">Busser - Weeknight</p>
                    <p>Your rate: $22/hr all-in</p>
                    <p className="text-gray-600">Worker gets: $17.60/hr | Platform: $4.40/hr</p>
                    <p className="text-xs text-green-700">Typical fill time: 1-2 hours</p>
                  </div>

                  <div className="bg-white p-3 rounded text-sm">
                    <p className="font-semibold">Bar Back - Weekend (High Demand 🔥)</p>
                    <p>Your rate: $28/hr all-in (surge to $32)</p>
                    <p className="text-gray-600">Worker gets: $22.40-25.60/hr | Platform: $5.60-6.40/hr</p>
                    <p className="text-xs text-green-700">Typical fill time: 15-30 minutes</p>
                  </div>

                  <div className="bg-white p-3 rounded text-sm">
                    <p className="font-semibold">Host - Quiet Tuesday</p>
                    <p>Your rate: $20/hr all-in</p>
                    <p className="text-gray-600">Worker gets: $16/hr | Platform: $4/hr</p>
                    <p className="text-xs text-green-700">Typical fill time: 2-4 hours</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 bg-gray-50 p-4 rounded">
              <p className="font-semibold mb-2">When you're charged:</p>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li><strong>Immediately when shift is filled:</strong> We charge your card the full shift amount (rate × hours)</li>
                <li><strong>Funds held in escrow:</strong> Payment is held securely by Stripe (our payment processor) until shift completes</li>
                <li><strong>After shift completion:</strong> You have 48 hours to approve or dispute the work</li>
                <li><strong>Auto-approval:</strong> If you don't respond within 48 hours, payment automatically releases to the worker</li>
                <li><strong>Worker gets paid:</strong> Within 2 business days of your approval (or auto-approval)</li>
              </ul>
            </div>

            <p className="mt-4 text-sm text-gray-600">
              <em>Why charge upfront? It guarantees payment to workers (they're independent contractors without job security) and prevents no-payment disputes. Funds are held safely in escrow, not spent until the work is done.</em>
            </p>
          </div>

          {/* 4. Payment Terms */}
          <div>
            <h2 className="text-2xl font-semibold text-teal-700 mb-3">4. Payment Terms</h2>
            
            <div className="space-y-4">
              <div>
                <p className="font-semibold">Payment method:</p>
                <p className="text-sm">You must have a valid credit card on file. We use Stripe for secure payment processing. All major credit cards accepted.</p>
              </div>

              <div>
                <p className="font-semibold">Payment timeline:</p>
                <ul className="list-disc pl-6 text-sm space-y-1">
                  <li><strong>Shift filled:</strong> Card charged immediately for full shift amount</li>
                  <li><strong>Shift in progress:</strong> Funds held in escrow by Stripe</li>
                  <li><strong>Shift completes:</strong> 48-hour review window begins</li>
                  <li><strong>You approve OR 48 hours pass:</strong> Payment releases to worker</li>
                  <li><strong>You dispute:</strong> Our support team reviews and mediates</li>
                </ul>
              </div>

              <div>
                <p className="font-semibold">Failed payments:</p>
                <p className="text-sm">If your card is declined when a shift is filled, the shift is immediately cancelled and goes back to available shifts. Update your payment method to avoid this.</p>
              </div>

              <div>
                <p className="font-semibold">Refunds & disputes:</p>
                <p className="text-sm">
                  See our <Link href="/legal/cancellation" className="text-teal-700 underline">Cancellation & Refund Policy</Link> for details on when refunds are available (worker no-shows, worker misconduct, etc.).
                </p>
              </div>
            </div>
          </div>

          {/* 5. Tips (Your Responsibility) */}
          <div>
            <h2 className="text-2xl font-semibold text-teal-700 mb-3">5. Tips (You Handle Them Directly)</h2>
            
            <div className="bg-green-50 p-4 rounded border border-green-300 space-y-3">
              <p className="font-semibold text-green-800 text-lg">💵 SwipeAShift doesn't touch tips.</p>
              
              <div>
                <p className="font-semibold text-sm">Your responsibilities:</p>
                <ul className="list-disc pl-6 text-sm space-y-1">
                  <li><strong>Disclose tip policy:</strong> When posting shifts, indicate whether the role receives tips ("Base + tip share," "No tips," "Pooled tips")</li>
                  <li><strong>Pay tips directly:</strong> All tips (cash, credit card) go directly from you to the worker within 24 hours</li>
                  <li><strong>Credit card tips:</strong> You may deduct only the proportional card processing fee (typically 2-3%)</li>
                  <li><strong>Tip pools:</strong> If you use tip pooling, it must comply with federal and state law (managers/owners can't participate)</li>
                  <li><strong>Transparency:</strong> Workers can report suspected tip violations to us. Verified violations = account suspension</li>
                </ul>
              </div>

              <div>
                <p className="font-semibold text-sm">What we expect:</p>
                <p className="text-sm">
                  100% of tips go to workers who earned them. SwipeAShift will remove venues that withhold, misrepresent, or unfairly pool tips. This is non-negotiable.
                </p>
              </div>
            </div>

            <p className="mt-4 text-sm">
              For complete details, see our <Link href="/legal/tip-transparency" className="text-teal-700 underline">Tip Transparency & Fair Pay Policy</Link>.
            </p>
          </div>

          {/* 6. Insurance & Liability (CRITICAL) */}
          <div>
            <h2 className="text-2xl font-semibold text-teal-700 mb-3">6. Insurance & Liability (Your Legal Obligations)</h2>
            
            <div className="bg-red-50 p-6 rounded border border-red-400 space-y-4">
              <p className="font-semibold text-red-800 text-lg">⚠️ This is critically important. Please read carefully.</p>
              
              <div>
                <p className="font-semibold">Workers' Compensation Insurance:</p>
                <p className="text-sm">
                  <strong>You are required by law to carry workers' compensation insurance</strong> that covers work performed at your premises, including by independent contractors engaged through SwipeAShift.
                </p>
                <ul className="list-disc pl-6 text-sm space-y-1 mt-2">
                  <li>Most states require this for all businesses with employees or contractors</li>
                  <li>If a worker is injured during a shift at your venue, your workers' comp insurance should cover them</li>
                  <li>SwipeAShift does NOT provide workers' compensation coverage</li>
                  <li>Upon request, you must provide a certificate of insurance to SwipeAShift or to workers</li>
                </ul>
              </div>

              <div>
                <p className="font-semibold">General Liability Insurance:</p>
                <p className="text-sm">
                  You must maintain general liability insurance as required by law. This covers injuries or incidents that occur at your venue.
                </p>
              </div>

              <div>
                <p className="font-semibold">Your representation:</p>
                <p className="text-sm">
                  By posting shifts on SwipeAShift, you represent and warrant that:
                </p>
                <ul className="list-disc pl-6 text-sm space-y-1 mt-2">
                  <li>You have valid workers' compensation insurance covering your location</li>
                  <li>You have general liability insurance</li>
                  <li>You comply with all OSHA and workplace safety requirements</li>
                  <li>Your venue is a safe environment for workers</li>
                </ul>
              </div>

              <div>
                <p className="font-semibold">If a worker is injured:</p>
                <ol className="list-decimal pl-6 text-sm space-y-1 mt-2">
                  <li>Immediately provide first aid and call 911 if needed</li>
                  <li>Document the incident (incident report)</li>
                  <li>Notify your insurance carrier</li>
                  <li>Notify SwipeAShift support within 24 hours</li>
                  <li>File workers' comp claim with your insurer</li>
                  <li><strong>Your insurance covers the injury, not SwipeAShift</strong></li>
                </ol>
              </div>
            </div>

            <p className="mt-4 text-sm text-gray-600">
              <em>If you don't carry proper insurance, you are violating these Terms and may be liable for any injuries or damages. We strongly recommend consulting with an insurance broker to ensure adequate coverage.</em>
            </p>
          </div>

          {/* 7. Indemnification (Protecting SwipeAShift) */}
          <div>
            <h2 className="text-2xl font-semibold text-teal-700 mb-3">7. Indemnification (You Protect Us, We Protect You)</h2>
            
            <div className="bg-gray-50 p-4 rounded space-y-3">
              <p className="text-sm">
                <strong>You agree to indemnify, defend, and hold harmless SwipeAShift LLC, its officers, employees, and agents from any claims, liabilities, damages, costs, and expenses (including reasonable attorney fees) arising from:</strong>
              </p>

              <ul className="list-disc pl-6 text-sm space-y-2">
                <li>
                  <strong>Injuries or incidents at your venue:</strong> If a worker (or anyone else) is injured at your location, that's your responsibility, not ours
                </li>
                <li>
                  <strong>Your failure to comply with laws:</strong> Including wage laws, tip laws, workers' comp requirements, OSHA, health codes, etc.
                </li>
                <li>
                  <strong>Your failure to maintain insurance:</strong> If you don't have proper coverage and a claim arises, you're responsible
                </li>
                <li>
                  <strong>Worker classification disputes:</strong> If a worker or government agency claims a worker should have been your W-2 employee (not a 1099 contractor), you defend that claim
                </li>
                <li>
                  <strong>Your conduct:</strong> Harassment, discrimination, safety violations, tip withholding, or any illegal activity by you or your staff
                </li>
                <li>
                  <strong>Third-party claims:</strong> If a customer sues you over something that happened during a SwipeAShift worker's shift, that's between you, the customer, and your insurance
                </li>
              </ul>

              <p className="text-sm mt-3">
                <strong>In plain English:</strong> You're responsible for what happens at your venue. SwipeAShift connects you with workers, but we're not liable for injuries, disputes, or legal issues that arise from your operations.
              </p>
            </div>

            <div className="mt-4 bg-blue-50 p-4 rounded border border-blue-300">
              <p className="font-semibold text-blue-800 mb-2">We protect you too:</p>
              <p className="text-sm">
                If a worker causes damage or behaves inappropriately, you can dispute the shift, report them to us, and we'll investigate. Workers who violate our policies are suspended or banned. Your reputation matters to us.
              </p>
            </div>
          </div>

          {/* 8. Independent Contractor Relationship */}
          <div>
            <h2 className="text-2xl font-semibold text-teal-700 mb-3">8. Independent Contractor Relationship (Workers Are NOT Your Employees)</h2>
            
            <div className="bg-yellow-50 p-4 rounded border border-yellow-400 space-y-3">
              <p className="font-semibold text-yellow-800">Important classification clarification:</p>
              
              <p className="text-sm">
                <strong>Workers on SwipeAShift are independent contractors, NOT your employees (W-2) or SwipeAShift's employees.</strong> This distinction is legally important.
              </p>

              <div className="mt-3">
                <p className="font-semibold text-sm">What this means for you:</p>
                <ul className="list-disc pl-6 text-sm space-y-1">
                  <li><strong>No W-2:</strong> You don't issue W-2 forms, withhold taxes, or provide benefits to SwipeAShift workers</li>
                  <li><strong>No employment relationship:</strong> Workers are not your employees just because they work a shift at your venue</li>
                  <li><strong>You set the task, not the method:</strong> Tell workers what needs to be done (clear tables, stock bar), but they control how they do it</li>
                  <li><strong>Short-term engagement:</strong> Workers are not permanent staff. Each shift is an independent transaction</li>
                  <li><strong>No exclusivity:</strong> Workers can (and do) work for multiple venues, use other platforms, have other jobs</li>
                </ul>
              </div>

              <div className="mt-3">
                <p className="font-semibold text-sm">Your responsibilities during shifts:</p>
                <ul className="list-disc pl-6 text-sm space-y-1">
                  <li><strong>Supervision:</strong> You supervise workers during their shift (we don't)</li>
                  <li><strong>Safety:</strong> Maintain a safe work environment</li>
                  <li><strong>Direction:</strong> Give clear instructions on tasks and expectations</li>
                  <li><strong>Tools:</strong> Provide any necessary equipment (uniforms, tools, POS access if needed)</li>
                  <li><strong>Compliance:</strong> Follow health codes, labor laws, and safety regulations</li>
                </ul>
              </div>

              <div className="mt-3 bg-white p-3 rounded">
                <p className="text-xs text-gray-700">
                  <strong>Legal note:</strong> SwipeAShift structures the relationship to maintain proper independent contractor classification under IRS guidelines and state labor laws. However, you are responsible for ensuring your treatment of workers complies with applicable laws. If you consistently use the same workers, schedule them regularly, or exercise significant control over their methods, consult an employment attorney to ensure proper classification.
                </p>
              </div>
            </div>
          </div>

          {/* 9. Shift Posting & Cancellations */}
          <div>
            <h2 className="text-2xl font-semibold text-teal-700 mb-3">9. Shift Posting & Cancellations</h2>
            
            <div className="space-y-4">
              <div>
                <p className="font-semibold">Posting shifts:</p>
                <ul className="list-disc pl-6 text-sm space-y-1">
                  <li>You can post shifts for support roles (busser, bar back, host, food runner, dishwasher, prep, event staff)</li>
                  <li>Include: Date, time, role, rate range, any special requirements (certifications, dress code)</li>
                  <li>Be accurate: Don't misrepresent the role, rate, or conditions</li>
                  <li>Once a worker accepts, you're committed to that shift</li>
                </ul>
              </div>

              <div className="bg-green-50 p-4 rounded border border-green-300">
                <p className="font-semibold text-green-800 mb-2">✅ FREE CANCELLATION (No penalty):</p>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li><strong>More than 24 hours before shift:</strong> Cancel anytime, full refund</li>
                  <li>Worker is notified, shift goes back to marketplace</li>
                  <li>No impact on your account</li>
                </ul>
              </div>

              <div className="bg-yellow-50 p-4 rounded border border-yellow-400">
                <p className="font-semibold text-yellow-800 mb-2">⚠️ LAST-MINUTE CANCELLATION (Partial refund):</p>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li><strong>Less than 24 hours before shift:</strong> You pay a 2-hour cancellation fee (rest is refunded)</li>
                  <li>Example: 6-hour shift at $24/hr = $144 total. You're refunded $96, pay $48 cancellation fee</li>
                  <li>This compensates the worker who blocked their time for you</li>
                  <li>Repeated last-minute cancellations may result in account review</li>
                </ul>
              </div>

              <div className="bg-blue-50 p-4 rounded border border-blue-300">
                <p className="font-semibold text-blue-800 mb-2">🏥 EMERGENCY EXCEPTIONS:</p>
                <p className="text-sm mb-2">Full refund available for documented emergencies:</p>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>Natural disaster, power outage, required closure</li>
                  <li>Health department closure</li>
                  <li>Documented emergency (provide proof within 24 hours)</li>
                </ul>
              </div>

              <div>
                <p className="font-semibold">Worker no-shows:</p>
                <p className="text-sm">
                  If a worker doesn't show up, contact our support immediately. We'll refund you in full and the worker faces immediate suspension. We take no-shows seriously.
                </p>
              </div>
            </div>

            <p className="mt-4 text-sm">
              For complete details, see our <Link href="/legal/cancellation" className="text-teal-700 underline">Cancellation & Refund Policy</Link>.
            </p>
          </div>

          {/* 10. Your Responsibilities */}
          <div>
            <h2 className="text-2xl font-semibold text-teal-700 mb-3">10. Your Responsibilities (Be a Good Venue)</h2>
            
            <p className="mb-4">Behind every great meal are the hands that make it happen. Treat workers with respect, and they'll help you succeed.</p>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="font-semibold mb-2">✅ DO:</p>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>Greet workers warmly when they arrive</li>
                  <li>Provide clear instructions and expectations</li>
                  <li>Give a quick orientation (restrooms, break area, emergency exits)</li>
                  <li>Treat them the same as your regular staff</li>
                  <li>Provide necessary tools, uniforms, equipment</li>
                  <li>Maintain a safe, clean work environment</li>
                  <li>Pay tips promptly (within 24 hours)</li>
                  <li>Approve completed shifts within 48 hours</li>
                  <li>Leave fair, honest ratings</li>
                  <li>Report issues to us if they arise</li>
                </ul>
              </div>

              <div>
                <p className="font-semibold mb-2 text-red-700">❌ DON'T:</p>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>Harass, discriminate, or mistreat workers</li>
                  <li>Withhold or steal tips</li>
                  <li>Create unsafe working conditions</li>
                  <li>Try to hire workers "off-platform" to avoid fees</li>
                  <li>Leave unfair or retaliatory ratings</li>
                  <li>Dispute shifts without legitimate cause</li>
                  <li>Misrepresent shift details or rates</li>
                  <li>Require workers to bring their own tools (basic supplies are your responsibility)</li>
                </ul>
              </div>
            </div>

            <p className="mt-4 text-sm">
              <strong>Account suspension/termination:</strong> We can suspend or ban venues for: tip withholding, harassment, safety violations, insurance lapses, repeated false disputes, or attempting to bypass the platform.
            </p>
          </div>

          {/* 11. Worker Verification Levels */}
          <div>
            <h2 className="text-2xl font-semibold text-teal-700 mb-3">11. Worker Verification Levels (Choose Your Requirements)</h2>
            
            <p className="mb-4">
              SwipeAShift uses a tiered verification system. You can choose which level of verification you require for each shift.
            </p>

            <div className="space-y-3">
              <div className="bg-gray-50 p-3 rounded border border-gray-300">
                <p className="font-semibold text-sm">🆓 Tier 1: Basic (Any worker)</p>
                <p className="text-xs">Email/phone verified. Good for low-risk roles with supervision.</p>
              </div>

              <div className="bg-blue-50 p-3 rounded border border-blue-300">
                <p className="font-semibold text-sm">✓ Tier 2: ID Verified (Recommended)</p>
                <p className="text-xs">Government ID verified. Recommended for most FOH roles. Free to workers. <strong>Launching December 2025.</strong></p>
              </div>

              <div className="bg-green-50 p-3 rounded border border-green-400">
                <p className="font-semibold text-sm">⭐ Tier 3: Background Checked (Premium)</p>
                <p className="text-xs">7-year criminal background check. Best for roles with cash handling, alcohol service, or higher trust. Workers pay $35/year. <strong>Launching January 2026.</strong></p>
              </div>

              <div className="bg-purple-50 p-3 rounded border border-purple-400">
                <p className="font-semibold text-sm">🌟 Tier 4: Elite Verified (VIP)</p>
                <p className="text-xs">Background check + verified references + work history. For fine dining, private clubs, VIP events. Workers pay $79/year. <strong>Launching Q2 2026.</strong></p>
              </div>
            </div>

            <p className="mt-4 text-sm">
              When posting shifts, you can require a minimum verification tier. Higher tiers typically fill slower (smaller worker pool) but provide more confidence. Most shifts work well with Tier 2 (ID Verified).
            </p>

            <p className="mt-3 text-sm">
              For details on what's included in each tier, see our <Link href="/legal/background-check" className="text-teal-700 underline">Background Check Policy</Link>.
            </p>
          </div>

          {/* 12. Ratings & Reviews */}
          <div>
            <h2 className="text-2xl font-semibold text-teal-700 mb-3">12. Ratings & Reviews</h2>
            
            <p className="mb-3">
              After each shift, please rate the worker (1-5 stars) and optionally leave feedback. Your ratings help maintain quality and guide other venues.
            </p>

            <div className="bg-gray-50 p-4 rounded space-y-3">
              <div>
                <p className="font-semibold text-sm">Please be fair and honest:</p>
                <ul className="list-disc pl-6 text-sm space-y-1">
                  <li><strong>5 stars:</strong> Excellent work, would hire again immediately</li>
                  <li><strong>4 stars:</strong> Good work, minor issues or room for improvement</li>
                  <li><strong>3 stars:</strong> Acceptable but significant issues</li>
                  <li><strong>2 stars:</strong> Poor performance, would not hire again</li>
                  <li><strong>1 star:</strong> Unacceptable (no-show, misconduct, theft)</li>
                </ul>
              </div>

              <div>
                <p className="font-semibold text-sm">What NOT to do:</p>
                <ul className="list-disc pl-6 text-sm space-y-1">
                  <li>Don't leave retaliatory ratings (because worker declined another shift, reported a tip issue, etc.)</li>
                  <li>Don't rate based on factors outside the worker's control (bad weather, your own staffing issues)</li>
                  <li>Don't use ratings to coerce workers into working off-platform</li>
                </ul>
              </div>

              <p className="text-xs text-gray-600">
                <em>Workers can dispute unfair ratings. We review and may remove ratings that violate our policies.</em>
              </p>
            </div>
          </div>

          {/* 13. Liability Disclaimers */}
          <div>
            <h2 className="text-2xl font-semibold text-teal-700 mb-3">13. Liability & Disclaimers</h2>
            
            <div className="bg-red-50 p-4 rounded border border-red-300 space-y-3">
              <p className="font-semibold text-red-800">Important legal disclaimers:</p>
              
              <div>
                <p className="font-semibold text-sm">Platform provided "AS IS":</p>
                <p className="text-sm">
                  SwipeAShift is provided as-is, without warranties. We don't guarantee that shifts will always be filled, that workers are perfect, or that technology never fails. We do our best, but we're not perfect.
                </p>
              </div>

              <div>
                <p className="font-semibold text-sm">Worker conduct:</p>
                <p className="text-sm">
                  <strong>We're not responsible for worker behavior, performance, or actions.</strong> You supervise workers during shifts. If a worker damages property, injures someone, steals, or violates laws, that's between you, the worker, and your insurance. We'll help by suspending/banning bad actors, but we're not liable for their conduct.
                </p>
              </div>

              <div>
                <p className="font-semibold text-sm">Venue responsibility:</p>
                <p className="text-sm">
                  You're responsible for your venue's safety, compliance with laws, insurance coverage, and treatment of workers. We facilitate connections; we don't control your operations.
                </p>
              </div>

              <div>
                <p className="font-semibold text-sm">Maximum liability:</p>
                <p className="text-sm">
                  If we're found liable for something (which we work hard to avoid), our maximum liability is the amount you paid through the platform in the past 12 months, or $500, whichever is greater. This is standard for tech platforms.
                </p>
              </div>
            </div>
          </div>

          {/* 14. Privacy & Data */}
          <div>
            <h2 className="text-2xl font-semibold text-teal-700 mb-3">14. Privacy & Your Data</h2>
            
            <p className="mb-3">
              We collect information to run the platform (your business info, payment details, shift history, ratings). We take privacy seriously and never sell your data.
            </p>

            <p className="text-sm">
              For full details, see our <Link href="/legal/privacy" className="text-teal-700 underline">Privacy Policy</Link>.
            </p>

            <div className="mt-3 bg-gray-50 p-3 rounded text-sm">
              <p className="font-semibold mb-2">Quick summary:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>We use your data to match you with workers and process payments</li>
                <li>Workers see your venue name, location, shift details, and ratings</li>
                <li>We share data with Stripe (payments), Checkr (background checks), and hosting providers</li>
                <li>You can request your data or close your account anytime</li>
                <li>We comply with GDPR, CCPA, and other privacy laws</li>
              </ul>
            </div>
          </div>

          {/* 15. Dispute Resolution */}
          <div>
            <h2 className="text-2xl font-semibold text-teal-700 mb-3">15. Dispute Resolution</h2>
            
            <p className="mb-3">
              If you have an issue with SwipeAShift, please contact us first at support@swipeashift.com. We're reasonable and will work with you to resolve problems.
            </p>

            <div className="bg-gray-50 p-4 rounded space-y-3">
              <div>
                <p className="font-semibold">Informal resolution:</p>
                <p className="text-sm">Give us 30 days to try to resolve disputes informally. Most issues can be solved with conversation.</p>
              </div>

              <div>
                <p className="font-semibold">Binding arbitration:</p>
                <p className="text-sm">
                  If we can't resolve the issue, disputes will be settled through <strong>binding arbitration</strong> (not court), under American Arbitration Association (AAA) rules.
                </p>
                <ul className="list-disc pl-6 text-xs space-y-1 mt-2">
                  <li>Location: Portsmouth, NH or via Zoom</li>
                  <li>Each party pays their own costs (unless law requires otherwise)</li>
                  <li>Decision is final and binding</li>
                  <li>You waive the right to jury trial</li>
                </ul>
              </div>

              <div>
                <p className="font-semibold">Class action waiver:</p>
                <p className="text-sm">
                  Disputes are resolved individually, not as part of a class action. You can't join with other venues to sue us collectively.
                </p>
              </div>

              <div>
                <p className="font-semibold">Small claims exception:</p>
                <p className="text-sm">
                  Disputes under $5,000 can be filed in small claims court if you prefer.
                </p>
              </div>
            </div>
          </div>

          {/* 16. Changes to Terms */}
          <div>
            <h2 className="text-2xl font-semibold text-teal-700 mb-3">16. Changes to These Terms</h2>
            
            <p className="mb-3">
              We may update these Terms as we improve the platform or comply with new laws. Material changes will be posted with a new "Effective" date, and we'll email you.
            </p>

            <p className="text-sm">
              <strong>Continued use = acceptance:</strong> If you keep using SwipeAShift after changes are posted, you're agreeing to the new Terms.
            </p>
          </div>

          {/* 17. Termination */}
          <div>
            <h2 className="text-2xl font-semibold text-teal-700 mb-3">17. Termination</h2>
            
            <div className="space-y-3">
              <div>
                <p className="font-semibold">You can close your account anytime:</p>
                <p className="text-sm">Email support@swipeashift.com. Complete any active shifts first. Outstanding payments will be processed.</p>
              </div>

              <div>
                <p className="font-semibold">We can terminate for cause:</p>
                <p className="text-sm">
                  If you violate these Terms (tip withholding, harassment, insurance lapses, safety violations, platform bypass), we can suspend or permanently ban your account.
                </p>
              </div>

              <div>
                <p className="font-semibold">Effect of termination:</p>
                <ul className="list-disc pl-6 text-sm space-y-1">
                  <li>Immediate loss of platform access</li>
                  <li>Future shifts cancelled (workers notified)</li>
                  <li>Active shifts proceed as scheduled</li>
                  <li>Outstanding payments processed normally</li>
                  <li>Data retained per Privacy Policy and legal requirements</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 18. General Legal Stuff */}
          <div>
            <h2 className="text-2xl font-semibold text-teal-700 mb-3">18. General Legal Provisions</h2>
            
            <div className="text-sm space-y-3">
              <div>
                <p className="font-semibold">Entire agreement:</p>
                <p>These Terms, plus our Privacy Policy, Tip Transparency Policy, and other referenced policies, constitute the complete agreement.</p>
              </div>

              <div>
                <p className="font-semibold">Governing law:</p>
                <p>These Terms are governed by New Hampshire law.</p>
              </div>

              <div>
                <p className="font-semibold">Severability:</p>
                <p>If any provision is invalid, the rest remains in effect.</p>
              </div>

              <div>
                <p className="font-semibold">No waiver:</p>
                <p>Our failure to enforce a provision doesn't waive our right to enforce it later.</p>
              </div>

              <div>
                <p className="font-semibold">Assignment:</p>
                <p>You can't transfer your account. We can assign these Terms if SwipeAShift is acquired or merges.</p>
              </div>

              <div>
                <p className="font-semibold">Force majeure:</p>
                <p>Neither party is liable for failures due to events beyond reasonable control.</p>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="bg-teal-50 border-l-4 border-teal-600 p-6 rounded">
            <h2 className="text-xl font-semibold text-teal-800 mb-3">Questions? We're Here to Help</h2>
            <p className="mb-3">
              If you have questions about these Terms or need support, contact us:
            </p>
            <ul className="space-y-1">
              <li><strong>Support:</strong> <a href="mailto:support@swipeashift.com" className="text-teal-700 underline">support@swipeashift.com</a></li>
              <li><strong>Compliance:</strong> <a href="mailto:compliance@swipeashift.com" className="text-teal-700 underline">compliance@swipeashift.com</a></li>
              <li><strong>Phone:</strong> Coming soon</li>
            </ul>
            <p className="mt-3 text-sm">
              We're building this together. One more set of hands changes everything. 🌊
            </p>
          </div>

          {/* Footer */}
          <hr className="border-gray-300" />
          <div className="text-xs text-gray-600 space-y-1">
            <p><strong>Effective Date:</strong> November 5, 2025</p>
            <p><strong>Version:</strong> 1.0 - Venues</p>
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
