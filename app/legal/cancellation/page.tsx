// File: /app/legal/cancellation/page.tsx
import Link from "next/link";

export default function CancellationPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-teal-600 via-teal-500 to-teal-200 flex justify-center items-start">
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
                    <p className="font-semibold text-green-700">✅ &gt;24 hours before shift</p>
                    <p className="text-xs">FREE - Cancel anytime, no penalty</p>
                  </div>

                  <div>
                    <p className="font-semibold text-yellow-700">⚠️ 2-24 hours before</p>
                    <p className="text-xs">WARNING - 3 strikes in 90 days = suspension</p>
                  </div>

                  <div>
                    <p className="font-semibold text-orange-700">💵 &lt;2 hours before</p>
                    <p className="text-xs">PENALTY - $25 or 1 hour of pay (whichever is greater)</p>
                  </div>

                  <div>
                    <p className="font-semibold text-red-700">🚫 No-show</p>
                    <p className="text-xs">SEVERE - 30-day suspension + $50 penalty</p>
                  </div>

                  <div>
                    <p className="font-semibold text-purple-700">🏥 Emergency</p>
                    <p className="text-xs">Contact support immediately - case-by-case review</p>
                  </div>
                </div>
              </div>

              {/* Employer Cancellations */}
              <div className="bg-orange-50 p-4 rounded border border-orange-300">
                <p className="font-semibold text-orange-900 mb-3">🏢 EMPLOYER CANCELLATIONS</p>
                
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-semibold text-green-700">✅ &gt;24 hours before shift</p>
                    <p className="text-xs">FREE - Cancel anytime, full refund</p>
                  </div>

                  <div>
                    <p className="font-semibold text-yellow-700">⚠️ 4-24 hours before</p>
                    <p className="text-xs">WARNING - Worker gets 50% cancellation pay</p>
                  </div>

                  <div>
                    <p className="font-semibold text-orange-700">💵 &lt;4 hours before</p>
                    <p className="text-xs">PENALTY - Worker gets 100% shift pay + $25 inconvenience fee</p>
                  </div>

                  <div>
                    <p className="font-semibold text-red-700">🚫 No-show (employer doesn't show up)</p>
                    <p className="text-xs">SEVERE - Worker gets 100% pay + $50 + reputation hit</p>
                  </div>

                  <div>
                    <p className="font-semibold text-purple-700">🏥 Emergency</p>
                    <p className="text-xs">Contact support immediately - case-by-case review</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Worker Cancellation Policy */}
          <div>
            <h2 className="text-2xl font-semibold text-teal-700 mb-3">2. Worker Cancellation Policy</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">2.1 Free Cancellation Window</h3>
            <p className="mb-3">
              <strong>More than 24 hours before shift start:</strong> Cancel anytime, no questions asked, no penalty. We understand plans change!
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">2.2 Warning Zone (2-24 hours)</h3>
            <p className="mb-3">
              <strong>Between 2-24 hours before shift:</strong> You can cancel, but you'll receive a warning. After <strong>3 warnings in 90 days</strong>, your account may be temporarily suspended (7-30 days depending on severity).
            </p>
            <p className="mb-3 text-sm italic">
              Why? Late cancellations make it hard for employers to find replacements and hurt your reputation.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">2.3 Penalty Zone (Less than 2 hours)</h3>
            <p className="mb-3">
              <strong>Less than 2 hours before shift:</strong> You'll be charged a cancellation fee:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4 mb-3">
              <li><strong>$25 flat fee</strong>, OR</li>
              <li><strong>1 hour of your agreed shift rate</strong> (whichever is greater)</li>
            </ul>
            <p className="mb-3 text-sm">
              <em>Example: If you were getting paid $30/hour, you'd pay $30. If you were getting $15/hour, you'd pay $25.</em>
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">2.4 No-Show (You Don't Show Up)</h3>
            <p className="mb-3">
              <strong>If you don't show up and don't cancel:</strong>
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4 mb-3">
              <li><strong>$50 penalty</strong> charged to your account</li>
              <li><strong>30-day suspension</strong> from the platform</li>
              <li>Permanent mark on your reliability score</li>
              <li>May result in permanent ban for repeat offenses</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">2.5 Emergencies & Special Circumstances</h3>
            <p className="mb-3">
              We understand emergencies happen:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4 mb-3">
              <li>Medical emergencies (hospital visit, sudden illness)</li>
              <li>Family emergencies (death, accident)</li>
              <li>Car accidents or breakdowns</li>
              <li>Natural disasters or extreme weather</li>
            </ul>
            <p className="mb-3">
              <strong>What to do:</strong> Contact our support team ASAP with documentation (photo of hospital bracelet, police report, tow receipt, etc.). We'll review your case and may waive penalties.
            </p>
            <p className="text-sm italic">
              Note: "I slept through my alarm" or "I forgot" are NOT emergencies.
            </p>
          </div>

          {/* 3. Employer Cancellation Policy */}
          <div>
            <h2 className="text-2xl font-semibold text-teal-700 mb-3">3. Employer Cancellation Policy</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">3.1 Free Cancellation Window</h3>
            <p className="mb-3">
              <strong>More than 24 hours before shift start:</strong> Cancel anytime, full refund (minus SwipeAShift processing fee of 3%).
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">3.2 Warning Zone (4-24 hours)</h3>
            <p className="mb-3">
              <strong>Between 4-24 hours before shift:</strong> You can cancel, but the worker receives <strong>50% of the agreed shift pay</strong> as cancellation compensation. The remaining 50% is refunded to you (minus fees).
            </p>
            <p className="mb-3 text-sm italic">
              Why? Workers may have turned down other shifts or made plans based on your booking.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">3.3 Penalty Zone (Less than 4 hours)</h3>
            <p className="mb-3">
              <strong>Less than 4 hours before shift:</strong> The worker receives:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4 mb-3">
              <li><strong>100% of the agreed shift pay</strong></li>
              <li><strong>Plus a $25 inconvenience fee</strong></li>
            </ul>
            <p className="mb-3 text-sm">
              <em>You are charged for the full shift + $25. No refund.</em>
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">3.4 No-Show (Employer Doesn't Show Up)</h3>
            <p className="mb-3">
              <strong>If the worker shows up and you're not there or the shift is unavailable:</strong>
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4 mb-3">
              <li>Worker receives <strong>100% of shift pay</strong></li>
              <li>Worker receives <strong>$50 inconvenience fee</strong></li>
              <li>Your employer account gets a <strong>serious reputation hit</strong></li>
              <li>Repeat offenses may result in <strong>permanent ban</strong></li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">3.5 Emergencies & Special Circumstances</h3>
            <p className="mb-3">
              Valid reasons for emergency cancellation:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4 mb-3">
              <li>Restaurant closed by health inspector</li>
              <li>Power outage or equipment failure</li>
              <li>Natural disasters or extreme weather</li>
              <li>Death or serious injury of staff/owner</li>
            </ul>
            <p className="mb-3">
              <strong>What to do:</strong> Contact our support team immediately with documentation. We'll review and may waive or reduce penalties.
            </p>
          </div>

          {/* 4. Dispute Resolution */}
          <div>
            <h2 className="text-2xl font-semibold text-teal-700 mb-3">4. Dispute Resolution</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">4.1 How to File a Dispute</h3>
            <p className="mb-3">
              If you believe a cancellation fee was unfair:
            </p>
            <ol className="list-decimal list-inside space-y-2 ml-4 mb-3">
              <li>Email <a href="mailto:disputes@swipeashift.com" className="text-teal-700 underline">disputes@swipeashift.com</a> within <strong>48 hours</strong> of the incident</li>
              <li>Include: Your name, shift ID, date/time, reason for dispute, and any supporting evidence</li>
              <li>We'll review within 2-3 business days</li>
              <li>Decision is final unless new evidence is provided</li>
            </ol>

            <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">4.2 We Mediate Fairly</h3>
            <p className="mb-3">
              SwipeAShift acts as a neutral mediator. We'll review:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4 mb-3">
              <li>Both parties' stories</li>
              <li>Chat/message history</li>
              <li>Past behavior and reliability scores</li>
              <li>Documentation provided</li>
            </ul>
            <p className="mb-3">
              Our goal: <strong>Fair outcomes that maintain trust in the platform.</strong>
            </p>
          </div>

          {/* 5. Refund Processing */}
          <div>
            <h2 className="text-2xl font-semibold text-teal-700 mb-3">5. Refund Processing</h2>
            
            <p className="mb-3">
              <strong>Timeline:</strong> Refunds are processed immediately upon cancellation approval. However, it may take 3-7 business days for your bank to post the credit.
            </p>

            <p className="mb-3">
              <strong>Refund Method:</strong> Refunds go back to the original payment method (card, bank account, etc.).
            </p>

            <p className="mb-3 text-sm">
              <em>Note: SwipeAShift processes refunds immediately, but your bank may take 3-7 additional days to post the credit.</em>
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