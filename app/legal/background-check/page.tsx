// File: /app/legal/background-check/page.tsx
import Link from "next/link";

export default function BackgroundCheckPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0f9ea5] via-[#33b5b9] to-[#b1e4e8] flex justify-center items-start">
      <div className="max-w-5xl w-full mx-auto px-8 py-16">
        <h1 className="text-4xl font-bold text-white mb-6 border-b border-white/30 pb-2">
          Background Check & Verification Policy
        </h1>

        <section className="bg-white/80 rounded-2xl p-8 shadow-lg backdrop-blur text-gray-800 leading-relaxed space-y-8">
          
          {/* Introduction */}
          <div className="bg-teal-50 border-l-4 border-teal-600 p-6 rounded">
            <p className="text-lg">
              <strong>Building trust through transparency.</strong> Background checks on SwipeAShift are optional but encouraged. Our tiered verification system helps venues make informed decisions while giving workers opportunities to stand out. This policy explains how verification works, your rights, and what we check.
            </p>
          </div>

          {/* 1. Our Approach: Optional, Not Mandatory */}
          <div>
            <h2 className="text-2xl font-semibold text-teal-700 mb-3">1. Our Approach: Optional, Not Mandatory</h2>
            
            <p className="mb-4">
              Unlike some platforms that require background checks for everyone, <strong>SwipeAShift makes verification optional.</strong> We believe in second chances and know that many excellent hospitality workers have histories they're working to overcome.
            </p>

            <div className="bg-blue-50 p-4 rounded border border-blue-300 space-y-3">
              <p className="font-semibold text-blue-900">Why optional verification is better:</p>
              <ul className="list-disc pl-6 text-sm space-y-2">
                <li><strong>Inclusive:</strong> Workers with records aren't automatically excluded — they can still access Tier 1 shifts</li>
                <li><strong>Fair:</strong> Venues decide their own risk tolerance and requirements</li>
                <li><strong>Opportunity-driven:</strong> Workers who get verified access better-paying shifts and more bookings</li>
                <li><strong>Market-based:</strong> High-trust venues (fine dining, hotels) can require verification; casual venues don't have to</li>
              </ul>
            </div>

            <p className="mt-4 text-sm">
              <strong>Bottom line:</strong> Having a criminal record doesn't disqualify you from SwipeAShift. Getting verified just opens more doors.
            </p>
          </div>

          {/* 2. The Four Verification Tiers */}
          <div>
            <h2 className="text-2xl font-semibold text-teal-700 mb-3">2. The Four Verification Tiers</h2>
            
            <p className="mb-4">SwipeAShift uses a ladder approach. Start at Tier 1, climb higher as you choose:</p>

            <div className="space-y-4">
              {/* Tier 1 */}
              <div className="bg-gray-50 p-4 rounded border border-gray-300">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-gray-600 text-white text-xs px-3 py-1 rounded-full font-semibold">TIER 1: BASIC</span>
                  <span className="text-green-700 font-semibold">FREE</span>
                </div>
                
                <p className="font-semibold mb-2">What's included:</p>
                <ul className="list-disc pl-6 text-sm space-y-1 mb-3">
                  <li>Email verification (confirm you own the email)</li>
                  <li>Phone verification (SMS code)</li>
                  <li>Profile complete (name, location, roles, experience)</li>
                  <li>Terms of Service acceptance</li>
                </ul>

                <p className="font-semibold mb-2">What you get access to:</p>
                <ul className="list-disc pl-6 text-sm space-y-1 mb-3">
                  <li>Shifts marked "No verification required"</li>
                  <li>Entry-level positions at casual venues</li>
                  <li>Full platform functionality</li>
                </ul>

                <p className="text-xs text-gray-600"><strong>Status:</strong> ✅ Available now (automatic when you sign up)</p>
              </div>

              {/* Tier 2 */}
              <div className="bg-blue-50 p-4 rounded border border-blue-300">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full font-semibold">TIER 2: ID VERIFIED</span>
                  <span className="text-green-700 font-semibold">FREE</span>
                </div>
                
                <p className="font-semibold mb-2">What's included:</p>
                <ul className="list-disc pl-6 text-sm space-y-1 mb-3">
                  <li>Everything in Tier 1, PLUS:</li>
                  <li>Government-issued ID verification (driver's license, passport, state ID)</li>
                  <li>Verified through Stripe Identity (secure, instant)</li>
                  <li>Confirms: Legal name, date of birth, photo matches ID</li>
                  <li>Badge on your profile: <span className="inline-block bg-blue-600 text-white text-xs px-2 py-1 rounded">✓ ID Verified</span></li>
                </ul>

                <p className="font-semibold mb-2">What you get access to:</p>
                <ul className="list-disc pl-6 text-sm space-y-1 mb-3">
                  <li>All Tier 1 shifts</li>
                  <li>Most front-of-house positions</li>
                  <li>Higher visibility in search results</li>
                  <li>Recommended for all workers (takes 5 minutes)</li>
                </ul>

                <p className="font-semibold mb-2">Why it's free:</p>
                <p className="text-xs">We cover the cost (~$3-5 per check) to encourage widespread adoption and baseline trust.</p>

                <p className="text-xs text-gray-600 mt-2"><strong>Status:</strong> 🚀 Launching December 2025</p>
              </div>

              {/* Tier 3 */}
              <div className="bg-green-50 p-4 rounded border border-green-400">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-green-600 text-white text-xs px-3 py-1 rounded-full font-semibold">TIER 3: BACKGROUND CHECKED</span>
                  <span className="text-orange-700 font-semibold">$35/YEAR</span>
                </div>
                
                <p className="font-semibold mb-2">What's included:</p>
                <ul className="list-disc pl-6 text-sm space-y-1 mb-3">
                  <li>Everything in Tier 2, PLUS:</li>
                  <li>7-year criminal background check via Checkr</li>
                  <li>National criminal database search</li>
                  <li>County criminal records (7 years)</li>
                  <li>Sex offender registry check (all 50 states)</li>
                  <li>SSN validation and trace</li>
                  <li>Alias/AKA records</li>
                  <li>Badge on your profile: <span className="inline-block bg-green-600 text-white text-xs px-2 py-1 rounded">✓ Background Checked</span></li>
                </ul>

                <p className="font-semibold mb-2">What you get access to:</p>
                <ul className="list-disc pl-6 text-sm space-y-1 mb-3">
                  <li>All Tier 1 + 2 shifts</li>
                  <li>Premium venues (upscale restaurants, hotels, private clubs)</li>
                  <li>Cash-handling positions (bartenders with Tier 3)</li>
                  <li>Priority placement in search results</li>
                  <li>30-50% more booking opportunities (verified workers report)</li>
                </ul>

                <p className="font-semibold mb-2">Cost & renewal:</p>
                <ul className="list-disc pl-6 text-xs space-y-1 mb-3">
                  <li>$35/year (you pay)</li>
                  <li>Results valid for 12 months</li>
                  <li>Renewal: $35 (same price)</li>
                  <li>Email reminder at 11 months</li>
                </ul>

                <p className="font-semibold mb-2">What happens if something shows up:</p>
                <p className="text-xs mb-2">
                  Having a record doesn't automatically disqualify you. Checkr returns results as "Clear," "Review," or "Does Not Meet Criteria." Venues set their own standards:
                </p>
                <ul className="list-disc pl-6 text-xs space-y-1">
                  <li>Some venues accept non-violent misdemeanors</li>
                  <li>Some have zero-tolerance policies</li>
                  <li>Some use case-by-case judgment</li>
                  <li>You'll see which shifts you qualify for</li>
                </ul>

                <p className="text-xs text-gray-600 mt-2"><strong>Status:</strong> 🚀 Launching January 1, 2026</p>
              </div>

              {/* Tier 4 */}
              <div className="bg-purple-50 p-4 rounded border border-purple-400">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-purple-600 text-white text-xs px-3 py-1 rounded-full font-semibold">TIER 4: ELITE VERIFIED</span>
                  <span className="text-orange-700 font-semibold">$79/YEAR</span>
                </div>
                
                <p className="font-semibold mb-2">What's included:</p>
                <ul className="list-disc pl-6 text-sm space-y-1 mb-3">
                  <li>Everything in Tier 3, PLUS:</li>
                  <li>Professional references verified (2-3 contacts)</li>
                  <li>Work history verified (past employers contacted)</li>
                  <li>Optional: ServSafe, alcohol service cert, food handler's permit upload</li>
                  <li>Optional: Drug screening (if required by venue)</li>
                  <li>Manual review by SwipeAShift team</li>
                  <li>Badge on your profile: <span className="inline-block bg-purple-600 text-white text-xs px-2 py-1 rounded">⭐ Elite Verified</span></li>
                </ul>

                <p className="font-semibold mb-2">What you get access to:</p>
                <ul className="list-disc pl-6 text-sm space-y-1 mb-3">
                  <li>All Tier 1 + 2 + 3 shifts</li>
                  <li>VIP venues (country clubs, fine dining, luxury hotels)</li>
                  <li>Private events (weddings, corporate functions)</li>
                  <li>Highest priority in search (top of the list)</li>
                  <li>Premium pay rates (venues pay more for Elite workers)</li>
                  <li>Direct booking requests from top venues</li>
                </ul>

                <p className="font-semibold mb-2">Who is this for:</p>
                <p className="text-xs">
                  Serious professionals who want access to the best shifts and highest pay. Think of this as "pro-level" status.
                </p>

                <p className="text-xs text-gray-600 mt-2"><strong>Status:</strong> 🚀 Launching Q2 2026 (after critical mass of workers)</p>
              </div>
            </div>
          </div>

          {/* 3. How Background Checks Work (Checkr Process) */}
          <div>
            <h2 className="text-2xl font-semibold text-teal-700 mb-3">3. How Background Checks Work (The Checkr Process)</h2>
            
            <p className="mb-4">
              SwipeAShift partners with <strong>Checkr</strong>, a leading background check provider trusted by Uber, DoorDash, and thousands of companies. They're FCRA-compliant and handle millions of checks annually.
            </p>

            <div className="bg-gray-50 p-4 rounded space-y-4">
              <div>
                <p className="font-semibold">Step 1: You initiate the check</p>
                <p className="text-sm">When you're ready to upgrade to Tier 3, click "Get Background Checked" in your profile. You'll be redirected to Checkr's secure portal.</p>
              </div>

              <div>
                <p className="font-semibold">Step 2: Provide information</p>
                <p className="text-sm">Checkr will ask for:</p>
                <ul className="list-disc pl-6 text-xs space-y-1 mt-1">
                  <li>Full legal name (including any previous names)</li>
                  <li>Social Security Number (to validate identity)</li>
                  <li>Date of birth</li>
                  <li>Addresses for past 7 years</li>
                  <li>Driver's license number (optional but speeds up process)</li>
                </ul>
              </div>

              <div>
                <p className="font-semibold">Step 3: Pay the fee</p>
                <p className="text-sm">$35 payment via credit/debit card. This goes directly to Checkr (SwipeAShift doesn't profit from background checks).</p>
              </div>

              <div>
                <p className="font-semibold">Step 4: Checkr runs the search</p>
                <p className="text-sm">Typical turnaround: 1-3 business days. Some checks (common names, multiple addresses) may take up to 7 days. You'll get email updates.</p>
              </div>

              <div>
                <p className="font-semibold">Step 5: Results delivered</p>
                <p className="text-sm">
                  You receive a copy of the full report (legally required under FCRA). Venues see only "Clear," "Review," or "Does Not Meet Criteria" — NOT specific details.
                </p>
              </div>

              <div>
                <p className="font-semibold">Step 6: Badge appears on profile</p>
                <p className="text-sm">
                  If your check is "Clear," you immediately get the <span className="inline-block bg-green-600 text-white text-xs px-2 py-1 rounded">✓ Background Checked</span> badge and access to Tier 3 shifts.
                </p>
              </div>
            </div>

            <div className="mt-4 bg-yellow-50 p-4 rounded border border-yellow-400">
              <p className="font-semibold text-yellow-800 mb-2">What if something shows up?</p>
              <p className="text-sm mb-2">
                If Checkr finds records, you'll see the full report. The result is categorized as:
              </p>
              <ul className="list-disc pl-6 text-sm space-y-1">
                <li><strong>"Clear":</strong> No disqualifying records found — you get the badge</li>
                <li><strong>"Review":</strong> Some records found, but venues decide if they'll accept you (many do!)</li>
                <li><strong>"Does Not Meet Criteria":</strong> Records that most venues won't accept (violent crimes, theft, sex offenses)</li>
              </ul>
              <p className="text-xs text-gray-600 mt-2">
                <em>Even "Review" status can access some Tier 3 shifts. Venues with more flexible standards will still consider you.</em>
              </p>
            </div>
          </div>

          {/* 4. Your Rights Under FCRA */}
          <div>
            <h2 className="text-2xl font-semibold text-teal-700 mb-3">4. Your Rights Under FCRA (Fair Credit Reporting Act)</h2>
            
            <p className="mb-4">
              The FCRA is a federal law that protects you when background checks are used for employment or service decisions. Here are your key rights:
            </p>

            <div className="bg-blue-50 p-6 rounded border border-blue-300 space-y-4">
              <div>
                <p className="font-semibold text-blue-900">✅ Right to Disclosure</p>
                <p className="text-sm">
                  Before running a background check, we must clearly disclose that we're doing so. This policy serves as that disclosure for SwipeAShift.
                </p>
              </div>

              <div>
                <p className="font-semibold text-blue-900">✅ Right to Authorization</p>
                <p className="text-sm">
                  You must give written consent (electronic is OK) before we can run a check. Clicking "I agree" in the Checkr portal is your consent. <strong>It's 100% voluntary</strong> — you're never required to get a background check.
                </p>
              </div>

              <div>
                <p className="font-semibold text-blue-900">✅ Right to a Copy of the Report</p>
                <p className="text-sm">
                  If Checkr finds anything, you receive a complete copy of the background check report. This includes all records found, sources, and how to dispute inaccuracies.
                </p>
              </div>

              <div>
                <p className="font-semibold text-blue-900">✅ Right to Dispute Inaccuracies</p>
                <p className="text-sm">
                  If the report contains errors (wrong person, expunged records, incorrect info), you can dispute it with Checkr. They're required to investigate and correct mistakes.
                </p>
                <p className="text-xs mt-1">
                  Dispute process: Contact Checkr support → Provide evidence → They re-investigate (typically 30 days) → Report corrected if error confirmed
                </p>
              </div>

              <div>
                <p className="font-semibold text-blue-900">✅ Right to Adverse Action Notice</p>
                <p className="text-sm">
                  If a venue declines to hire you based (even in part) on your background check, they must:
                </p>
                <ul className="list-disc pl-6 text-xs space-y-1 mt-1">
                  <li>Provide you with a "pre-adverse action" notice (giving you time to dispute)</li>
                  <li>Wait at least 5 business days</li>
                  <li>Then send a "final adverse action" notice with your rights</li>
                </ul>
                <p className="text-xs mt-1 text-gray-600">
                  <em>Note: This applies when venues reject you. SwipeAShift doesn't make hiring decisions — venues do.</em>
                </p>
              </div>

              <div>
                <p className="font-semibold text-blue-900">✅ Right to File a Complaint</p>
                <p className="text-sm">
                  If you believe your FCRA rights were violated, you can file a complaint with:
                </p>
                <ul className="list-disc pl-6 text-xs space-y-1 mt-1">
                  <li><strong>FTC (Federal Trade Commission):</strong> ftc.gov/complaint</li>
                  <li><strong>CFPB (Consumer Financial Protection Bureau):</strong> consumerfinance.gov/complaint</li>
                  <li><strong>Your state Attorney General</strong></li>
                </ul>
              </div>
            </div>

            <div className="mt-4 bg-gray-50 p-4 rounded">
              <p className="font-semibold mb-2">Summary of Rights Under FCRA (Official Disclosure)</p>
              <p className="text-xs mb-2">
                You have the right under the Fair Credit Reporting Act to review and dispute information in your consumer report. The federal Fair Credit Reporting Act (FCRA) promotes the accuracy, fairness, and privacy of information in the files of consumer reporting agencies.
              </p>
              <p className="text-xs">
                For more information, visit the FTC website: <a href="https://www.ftc.gov/credit" target="_blank" rel="noopener" className="text-teal-700 underline">ftc.gov/credit</a> or contact the FTC at 1-877-FTC-HELP.
              </p>
            </div>
          </div>

          {/* 5. What We Don't Check */}
          <div>
            <h2 className="text-2xl font-semibold text-teal-700 mb-3">5. What We Don't Check (Privacy Protection)</h2>
            
            <p className="mb-4">SwipeAShift background checks are focused on safety and trust. We do NOT check:</p>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-green-50 p-4 rounded border border-green-300">
                <p className="font-semibold text-green-800 mb-2">✅ What we CHECK:</p>
                <ul className="list-disc pl-6 text-sm space-y-1">
                  <li>Criminal records (7 years)</li>
                  <li>Sex offender registries</li>
                  <li>SSN validation</li>
                  <li>Identity verification</li>
                  <li>Alias/AKA records</li>
                </ul>
              </div>

              <div className="bg-red-50 p-4 rounded border border-red-300">
                <p className="font-semibold text-red-800 mb-2">❌ What we DON'T check:</p>
                <ul className="list-disc pl-6 text-sm space-y-1">
                  <li>Credit reports or scores</li>
                  <li>Medical records</li>
                  <li>Bankruptcy history</li>
                  <li>Civil lawsuits (unless criminal)</li>
                  <li>Driving records (unless Tier 4 + venue requests)</li>
                  <li>Education verification (unless Tier 4)</li>
                  <li>Social media activity</li>
                </ul>
              </div>
            </div>

            <p className="mt-4 text-sm">
              <strong>Why?</strong> We focus on factors directly relevant to workplace trust and safety. Your financial history, health, or personal life aren't our business.
            </p>
          </div>

          {/* 6. State-Specific Rules */}
          <div>
            <h2 className="text-2xl font-semibold text-teal-700 mb-3">6. State-Specific Rules (Ban-the-Box, Lookback Limits)</h2>
            
            <p className="mb-4">
              Different states have different rules about what can be included in background checks. Checkr automatically adjusts based on where you live.
            </p>

            <div className="bg-gray-50 p-4 rounded space-y-3">
              <div>
                <p className="font-semibold">Lookback limits:</p>
                <ul className="list-disc pl-6 text-sm space-y-1">
                  <li><strong>Federal standard:</strong> 7 years for most records</li>
                  <li><strong>Some states:</strong> Longer lookback for serious felonies (10+ years)</li>
                  <li><strong>California:</strong> Can't report most misdemeanor convictions after 7 years</li>
                  <li><strong>New York:</strong> Can't report non-convictions (arrests without conviction) after 7 years</li>
                </ul>
              </div>

              <div>
                <p className="font-semibold">"Ban-the-Box" laws:</p>
                <p className="text-sm">
                  Some states and cities prohibit asking about criminal history until after a conditional job offer. <strong>This doesn't apply to SwipeAShift</strong> because:
                </p>
                <ul className="list-disc pl-6 text-xs space-y-1 mt-1">
                  <li>We're a platform, not an employer</li>
                  <li>Background checks are optional (you choose)</li>
                  <li>Venues make their own hiring decisions</li>
                </ul>
              </div>

              <div>
                <p className="font-semibold">Compliance:</p>
                <p className="text-sm">
                  Checkr handles all state-specific compliance automatically. Your check will only include records allowed by your state's laws.
                </p>
              </div>
            </div>
          </div>

          {/* 7. Disputing Errors */}
          <div>
            <h2 className="text-2xl font-semibold text-teal-700 mb-3">7. Disputing Errors or Inaccuracies</h2>
            
            <p className="mb-4">
              Background checks sometimes contain mistakes. If you believe your report has errors, here's how to fix it:
            </p>

            <div className="bg-blue-50 p-6 rounded border border-blue-300 space-y-4">
              <div>
                <p className="font-semibold text-blue-900">Step 1: Identify the error</p>
                <p className="text-sm">
                  Review your background check report carefully. Common errors:
                </p>
                <ul className="list-disc pl-6 text-xs space-y-1 mt-1">
                  <li>Records belonging to someone else with a similar name</li>
                  <li>Charges that were dismissed or expunged</li>
                  <li>Incorrect dates or jurisdictions</li>
                  <li>Misdemeanor reported as felony (or vice versa)</li>
                </ul>
              </div>

              <div>
                <p className="font-semibold text-blue-900">Step 2: Contact Checkr</p>
                <p className="text-sm">
                  File a dispute through Checkr's candidate portal or email <a href="mailto:candidate@checkr.com" className="text-teal-700 underline">candidate@checkr.com</a>
                </p>
                <p className="text-xs mt-1">
                  Include: Your full name, date of birth, what's incorrect, and any supporting documents (court records, expungement order, etc.)
                </p>
              </div>

              <div>
                <p className="font-semibold text-blue-900">Step 3: Checkr investigates</p>
                <p className="text-sm">
                  Checkr has 30 days to investigate (usually faster). They'll contact the original source (court, registry) to verify.
                </p>
              </div>

              <div>
                <p className="font-semibold text-blue-900">Step 4: Report corrected</p>
                <p className="text-sm">
                  If the error is confirmed, Checkr updates your report. SwipeAShift is automatically notified, and your badge status updates if needed.
                </p>
              </div>

              <div>
                <p className="font-semibold text-blue-900">Step 5: Access restored</p>
                <p className="text-sm">
                  If the correction changes your result from "Does Not Meet Criteria" to "Clear," you immediately gain access to Tier 3 shifts.
                </p>
              </div>
            </div>

            <div className="mt-4 bg-yellow-50 p-4 rounded border border-yellow-400">
              <p className="font-semibold text-yellow-800 mb-2">While your dispute is pending:</p>
              <ul className="list-disc pl-6 text-sm space-y-1">
                <li>Your background check status shows "Under Review"</li>
                <li>You can still work Tier 1 and Tier 2 shifts</li>
                <li>Access to Tier 3 shifts is paused until resolved</li>
                <li>Contact SwipeAShift support if you need help or the process is taking too long</li>
              </ul>
            </div>
          </div>

          {/* 8. Privacy & Data Security */}
          <div>
            <h2 className="text-2xl font-semibold text-teal-700 mb-3">8. Privacy & Data Security</h2>
            
            <div className="space-y-4">
              <div>
                <p className="font-semibold">Who sees your background check results:</p>
                <div className="mt-2 space-y-2">
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="font-semibold text-sm">You see:</p>
                    <p className="text-xs">Full report with all details (legally required)</p>
                  </div>

                  <div className="bg-gray-50 p-3 rounded">
                    <p className="font-semibold text-sm">Venues see:</p>
                    <p className="text-xs">Only your badge status: <span className="inline-block bg-green-600 text-white text-xs px-2 py-1 rounded">✓ Background Checked</span> or "Review" or "Does Not Meet Criteria"</p>
                    <p className="text-xs mt-1 text-gray-600"><em>They do NOT see specific charges, dates, or details</em></p>
                  </div>

                  <div className="bg-gray-50 p-3 rounded">
                    <p className="font-semibold text-sm">SwipeAShift sees:</p>
                    <p className="text-xs">Check status (Clear/Review/Does Not Meet), completion date, expiration date</p>
                    <p className="text-xs mt-1 text-gray-600"><em>We do NOT see specific criminal details</em></p>
                  </div>

                  <div className="bg-gray-50 p-3 rounded">
                    <p className="font-semibold text-sm">Checkr retains:</p>
                    <p className="text-xs">Full report per FCRA requirements (7 years)</p>
                  </div>
                </div>
              </div>

              <div>
                <p className="font-semibold">Data security:</p>
                <ul className="list-disc pl-6 text-sm space-y-1">
                  <li>All data encrypted in transit (HTTPS/TLS)</li>
                  <li>Background check data stored separately from other platform data</li>
                  <li>Access restricted to authorized personnel only</li>
                  <li>Checkr is SOC 2 Type II certified (highest security standard)</li>
                  <li>Regular security audits</li>
                </ul>
              </div>

              <div>
                <p className="font-semibold">Data retention:</p>
                <ul className="list-disc pl-6 text-sm space-y-1">
                  <li>Background checks valid for 12 months</li>
                  <li>After expiration, your badge is removed (must renew)</li>
                  <li>Historical check records retained for 7 years (legal requirement)</li>
                  <li>If you close your account, check data is anonymized but retained per FCRA</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 9. Cost Breakdown */}
          <div>
            <h2 className="text-2xl font-semibold text-teal-700 mb-3">9. Cost Breakdown (Where Your $35 Goes)</h2>
            
            <p className="mb-3">We believe in transparency, so here's how the $35 background check fee breaks down:</p>

            <div className="bg-gray-50 p-4 rounded">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between pb-2 border-b border-gray-300">
                  <span>Checkr service fee (criminal search, database access, report generation)</span>
                  <span className="font-semibold">~$25</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-gray-300">
                  <span>Payment processing (Stripe)</span>
                  <span className="font-semibold">~$1.50</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-gray-300">
                  <span>Platform fee (customer support, compliance, admin)</span>
                  <span className="font-semibold">~$8.50</span>
                </div>
                <div className="flex justify-between pt-2 font-bold">
                  <span>Total</span>
                  <span>$35.00</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-gray-600 mt-3">
              <em>SwipeAShift makes a small margin to cover support costs (helping with disputes, FCRA compliance, badge management). We're not trying to profit from background checks — we just want to maintain a trustworthy platform.</em>
            </p>
          </div>

          {/* 10. FAQs */}
          <div>
            <h2 className="text-2xl font-semibold text-teal-700 mb-3">10. Frequently Asked Questions</h2>
            
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded">
                <p className="font-semibold text-sm">Q: Do I have to get a background check to use SwipeAShift?</p>
                <p className="text-sm mt-1">A: No! Background checks are 100% optional. You can work Tier 1 and Tier 2 shifts without any background check.</p>
              </div>

              <div className="bg-gray-50 p-4 rounded">
                <p className="font-semibold text-sm">Q: I have a criminal record. Will I be banned?</p>
                <p className="text-sm mt-1">A: Absolutely not. Having a record doesn't disqualify you from SwipeAShift. You can still work Tier 1 and 2 shifts. Some Tier 3 venues will also accept workers with records, depending on the nature of the offense and venue policies.</p>
              </div>

              <div className="bg-gray-50 p-4 rounded">
                <p className="font-semibold text-sm">Q: How long does a background check take?</p>
                <p className="text-sm mt-1">A: Typically 1-3 business days. Some take up to 7 days if you have a common name or have lived in multiple states.</p>
              </div>

              <div className="bg-gray-50 p-4 rounded">
                <p className="font-semibold text-sm">Q: What if my record was expunged or sealed?</p>
                <p className="text-sm mt-1">A: Expunged or sealed records should NOT appear on background checks. If they do, immediately dispute with Checkr and provide your expungement order. They'll correct it.</p>
              </div>

              <div className="bg-gray-50 p-4 rounded">
                <p className="font-semibold text-sm">Q: Can I see my background check results before paying?</p>
                <p className="text-sm mt-1">A: No. Checkr must be paid to run the check. However, if the report contains errors, you can dispute and get it corrected at no additional cost.</p>
              </div>

              <div className="bg-gray-50 p-4 rounded">
                <p className="font-semibold text-sm">Q: Do I need to renew my background check?</p>
                <p className="text-sm mt-1">A: Yes, every 12 months. You'll get an email reminder at 11 months. Renewal is the same price ($35). If you don't renew, your badge expires and you lose access to Tier 3 shifts.</p>
              </div>

              <div className="bg-gray-50 p-4 rounded">
                <p className="font-semibold text-sm">Q: Can venues see the details of my background check?</p>
                <p className="text-sm mt-1">A: No. Venues only see your badge status (Background Checked: Clear/Review/Does Not Meet). They don't see specific charges, dates, or details. This protects your privacy.</p>
              </div>

              <div className="bg-gray-50 p-4 rounded">
                <p className="font-semibold text-sm">Q: What's the difference between Tier 3 and Tier 4?</p>
                <p className="text-sm mt-1">A: Tier 3 is criminal background check only ($35/year). Tier 4 adds professional references, work history verification, and optional certifications ($79/year). Most workers only need Tier 3.</p>
              </div>

              <div className="bg-gray-50 p-4 rounded">
                <p className="font-semibold text-sm">Q: Can I get a refund if I don't pass the background check?</p>
                <p className="text-sm mt-1">A: No. The fee covers Checkr's work regardless of results. However, if there's an error in the report, you can dispute and get it corrected at no extra charge.</p>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="bg-teal-50 border-l-4 border-teal-600 p-6 rounded">
            <h2 className="text-xl font-semibold text-teal-800 mb-3">Questions About Background Checks?</h2>
            <p className="mb-3">
              We're here to help you navigate the verification process. Contact us:
            </p>
            <ul className="space-y-1">
              <li><strong>General support:</strong> <a href="mailto:support@swipeashift.com" className="text-teal-700 underline">support@swipeashift.com</a></li>
              <li><strong>Background check issues:</strong> <a href="mailto:verification@swipeashift.com" className="text-teal-700 underline">verification@swipeashift.com</a></li>
              <li><strong>Checkr candidate support:</strong> <a href="mailto:candidate@checkr.com" className="text-teal-700 underline">candidate@checkr.com</a> or call 1-844-824-3257</li>
            </ul>
            <p className="mt-3 text-sm">
              Building trust, one verified worker at a time. 🌊
            </p>
          </div>

          {/* Footer */}
          <hr className="border-gray-300" />
          <div className="text-xs text-gray-600 space-y-1">
            <p><strong>Effective Date:</strong> November 5, 2025</p>
            <p><strong>Version:</strong> 1.0</p>
            <p><strong>Last Updated:</strong> November 5, 2025</p>
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
