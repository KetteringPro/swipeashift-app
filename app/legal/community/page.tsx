// File: /app/legal/community/page.tsx
import Link from "next/link";

export default function CommunityPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0f9ea5] via-[#33b5b9] to-[#b1e4e8] flex justify-center items-start">
      <div className="max-w-5xl w-full mx-auto px-8 py-16">
        <h1 className="text-4xl font-bold text-white mb-6 border-b border-white/30 pb-2">
          Community Guidelines
        </h1>

        <section className="bg-white/80 rounded-2xl p-8 shadow-lg backdrop-blur text-gray-800 leading-relaxed space-y-8">
          
          {/* Introduction */}
          <div className="bg-teal-50 border-l-4 border-teal-600 p-6 rounded">
            <p className="text-lg mb-3">
              <strong>We rise by helping each other succeed.</strong>
            </p>
            <p>
              SwipeAShift is built on respect, trust, and community. Every shift matters. Behind every great meal are the hands that make it happen — bussers keeping tables turning, bar backs keeping service flowing, hosts welcoming guests with a smile. These guidelines ensure everyone is treated with dignity and professionalism.
            </p>
          </div>

          {/* Our Values */}
          <div>
            <h2 className="text-2xl font-semibold text-teal-700 mb-3">Our Core Values</h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded border border-blue-300">
                <p className="font-semibold text-blue-900 mb-2">🤝 Respect</p>
                <p className="text-sm">For every worker, every owner, every guest. We treat each other with kindness and professionalism, regardless of role or status.</p>
              </div>

              <div className="bg-green-50 p-4 rounded border border-green-300">
                <p className="font-semibold text-green-900 mb-2">⭐ Reliability</p>
                <p className="text-sm">Every shift matters. When you say you'll be there, be there. Venues and workers depend on each other.</p>
              </div>

              <div className="bg-purple-50 p-4 rounded border border-purple-400">
                <p className="font-semibold text-purple-900 mb-2">🌊 Community</p>
                <p className="text-sm">We're all in this together. Support each other, celebrate wins, help solve problems. A rising tide lifts all boats.</p>
              </div>

              <div className="bg-yellow-50 p-4 rounded border border-yellow-400">
                <p className="font-semibold text-yellow-900 mb-2">💡 Excellence</p>
                <p className="text-sm">Great service starts with great people. Do your best work, take pride in what you do, and help venues shine.</p>
              </div>
            </div>
          </div>

          {/* Expected Behavior */}
          <div>
            <h2 className="text-2xl font-semibold text-teal-700 mb-3">What We Expect</h2>
            
            <div className="space-y-4">
              {/* For Workers */}
              <div className="bg-blue-50 p-6 rounded border border-blue-300">
                <p className="font-semibold text-blue-900 text-lg mb-3">👷 For Workers:</p>
                
                <div className="space-y-3">
                  <div>
                    <p className="font-semibold text-sm mb-1">✅ Be Professional:</p>
                    <ul className="list-disc pl-6 text-sm space-y-1">
                      <li>Show up on time (15 minutes early is on time)</li>
                      <li>Come prepared (clean clothes, comfortable shoes)</li>
                      <li>Follow venue policies and directions</li>
                      <li>Work hard and stay focused</li>
                      <li>Leave the venue better than you found it</li>
                    </ul>
                  </div>

                  <div>
                    <p className="font-semibold text-sm mb-1">✅ Be Respectful:</p>
                    <ul className="list-disc pl-6 text-sm space-y-1">
                      <li>Treat venue staff, customers, and fellow workers with kindness</li>
                      <li>Use respectful language and tone</li>
                      <li>Listen to feedback without getting defensive</li>
                      <li>Represent the venue positively</li>
                    </ul>
                  </div>

                  <div>
                    <p className="font-semibold text-sm mb-1">✅ Be Honest:</p>
                    <ul className="list-disc pl-6 text-sm space-y-1">
                      <li>Represent your skills and experience accurately</li>
                      <li>Report tips honestly (for tax purposes)</li>
                      <li>Communicate issues or concerns openly</li>
                      <li>Admit mistakes and make them right</li>
                    </ul>
                  </div>

                  <div>
                    <p className="font-semibold text-sm mb-1">✅ Be Safe:</p>
                    <ul className="list-disc pl-6 text-sm space-y-1">
                      <li>Follow all safety protocols</li>
                      <li>Report hazards immediately</li>
                      <li>Never work intoxicated or impaired</li>
                      <li>Use equipment properly</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* For Venues */}
              <div className="bg-green-50 p-6 rounded border border-green-400">
                <p className="font-semibold text-green-900 text-lg mb-3">🏢 For Venues:</p>
                
                <div className="space-y-3">
                  <div>
                    <p className="font-semibold text-sm mb-1">✅ Be Welcoming:</p>
                    <ul className="list-disc pl-6 text-sm space-y-1">
                      <li>Greet workers warmly when they arrive</li>
                      <li>Provide clear instructions and expectations</li>
                      <li>Give a quick orientation (restrooms, break area, emergency exits)</li>
                      <li>Treat SwipeAShift workers the same as your regular staff</li>
                    </ul>
                  </div>

                  <div>
                    <p className="font-semibold text-sm mb-1">✅ Be Fair:</p>
                    <ul className="list-disc pl-6 text-sm space-y-1">
                      <li>Pay tips promptly (within 24 hours)</li>
                      <li>Follow your stated tip policy</li>
                      <li>Provide accurate shift details when posting</li>
                      <li>Give honest, constructive feedback in ratings</li>
                    </ul>
                  </div>

                  <div>
                    <p className="font-semibold text-sm mb-1">✅ Be Safe:</p>
                    <ul className="list-disc pl-6 text-sm space-y-1">
                      <li>Maintain a clean, safe work environment</li>
                      <li>Provide necessary equipment and PPE</li>
                      <li>Train workers on safety procedures</li>
                      <li>Have proper workers' comp and liability insurance</li>
                    </ul>
                  </div>

                  <div>
                    <p className="font-semibold text-sm mb-1">✅ Be Respectful:</p>
                    <ul className="list-disc pl-6 text-sm space-y-1">
                      <li>Treat workers with dignity and professionalism</li>
                      <li>Give constructive feedback, not personal attacks</li>
                      <li>Approve completed shifts promptly</li>
                      <li>Communicate clearly about expectations</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Prohibited Conduct */}
          <div>
            <h2 className="text-2xl font-semibold text-teal-700 mb-3">Prohibited Conduct (Zero Tolerance)</h2>
            
            <p className="mb-4">The following behaviors will result in immediate suspension or permanent ban:</p>

            <div className="space-y-3">
              <div className="bg-red-50 p-4 rounded border-2 border-red-500">
                <p className="font-semibold text-red-800 mb-2">🚫 Harassment & Discrimination:</p>
                <ul className="list-disc pl-6 text-sm space-y-1">
                  <li>Sexual harassment, unwanted advances, inappropriate comments</li>
                  <li>Discrimination based on race, ethnicity, religion, gender, sexual orientation, age, disability</li>
                  <li>Bullying, intimidation, or threatening behavior</li>
                  <li>Hostile work environment of any kind</li>
                </ul>
                <p className="text-xs mt-2 font-semibold text-red-900">→ First offense = Immediate permanent ban</p>
              </div>

              <div className="bg-red-50 p-4 rounded border-2 border-red-500">
                <p className="font-semibold text-red-800 mb-2">🚫 Theft & Dishonesty:</p>
                <ul className="list-disc pl-6 text-sm space-y-1">
                  <li>Stealing money, food, supplies, or personal property</li>
                  <li>Tip withholding (venues)</li>
                  <li>Fraudulent activity (fake shifts, false claims)</li>
                  <li>Identity fraud or misrepresentation</li>
                </ul>
                <p className="text-xs mt-2 font-semibold text-red-900">→ First offense = Immediate permanent ban + legal action</p>
              </div>

              <div className="bg-red-50 p-4 rounded border-2 border-red-500">
                <p className="font-semibold text-red-800 mb-2">🚫 Violence & Safety Violations:</p>
                <ul className="list-disc pl-6 text-sm space-y-1">
                  <li>Physical violence or threats of violence</li>
                  <li>Bringing weapons to venues</li>
                  <li>Working while intoxicated or under the influence</li>
                  <li>Reckless behavior that endangers others</li>
                </ul>
                <p className="text-xs mt-2 font-semibold text-red-900">→ First offense = Immediate permanent ban + authorities notified if necessary</p>
              </div>

              <div className="bg-orange-50 p-4 rounded border border-orange-400">
                <p className="font-semibold text-orange-800 mb-2">⚠️ Platform Abuse:</p>
                <ul className="list-disc pl-6 text-sm space-y-1">
                  <li>Attempting to hire workers "off-platform" to avoid fees</li>
                  <li>Creating fake accounts or ratings</li>
                  <li>Spamming, soliciting, or advertising</li>
                  <li>Using the platform for purposes other than shift work</li>
                </ul>
                <p className="text-xs mt-2 font-semibold text-orange-900">→ Warning → Suspension → Permanent ban</p>
              </div>

              <div className="bg-yellow-50 p-4 rounded border border-yellow-400">
                <p className="font-semibold text-yellow-800 mb-2">⚠️ Unprofessional Conduct:</p>
                <ul className="list-disc pl-6 text-sm space-y-1">
                  <li>Repeated no-shows or cancellations</li>
                  <li>Consistently poor performance or effort</li>
                  <li>Disrespectful or rude behavior</li>
                  <li>Refusal to follow reasonable directions</li>
                </ul>
                <p className="text-xs mt-2 font-semibold text-yellow-900">→ Poor ratings → Warning → Suspension → Ban (if pattern continues)</p>
              </div>
            </div>
          </div>

          {/* Reporting & Enforcement */}
          <div>
            <h2 className="text-2xl font-semibold text-teal-700 mb-3">Reporting Issues</h2>
            
            <p className="mb-4">If you experience or witness behavior that violates these guidelines, please report it:</p>

            <div className="bg-blue-50 p-6 rounded border border-blue-300 space-y-4">
              <div>
                <p className="font-semibold text-blue-900 mb-2">How to report:</p>
                <ul className="list-decimal pl-6 text-sm space-y-2">
                  <li><strong>In-app:</strong> Use the "Report Issue" button on any shift, profile, or message</li>
                  <li><strong>Email:</strong> <a href="mailto:support@swipeashift.com" className="text-teal-700 underline">support@swipeashift.com</a> or <a href="mailto:trust@swipeashift.com" className="text-teal-700 underline">trust@swipeashift.com</a></li>
                  <li><strong>Urgent/Safety:</strong> Call our support line (coming soon) or 911 if immediate danger</li>
                </ul>
              </div>

              <div>
                <p className="font-semibold text-blue-900 mb-2">What to include:</p>
                <ul className="list-disc pl-6 text-sm space-y-1">
                  <li>Who: Name of person/venue involved</li>
                  <li>What: Description of what happened</li>
                  <li>When: Date and time</li>
                  <li>Where: Which venue/shift</li>
                  <li>Evidence: Screenshots, photos, witness names (if available)</li>
                </ul>
              </div>

              <div>
                <p className="font-semibold text-blue-900 mb-2">What happens next:</p>
                <ol className="list-decimal pl-6 text-sm space-y-1">
                  <li><strong>We acknowledge:</strong> You'll get a response within 24 hours</li>
                  <li><strong>We investigate:</strong> Review evidence, interview parties involved</li>
                  <li><strong>We decide:</strong> Determine if guidelines were violated</li>
                  <li><strong>We act:</strong> Warning, suspension, or permanent ban depending on severity</li>
                  <li><strong>We follow up:</strong> Let you know the outcome (within privacy limits)</li>
                </ol>
              </div>

              <div className="bg-white p-3 rounded">
                <p className="text-xs font-semibold mb-1">🔒 Your privacy is protected:</p>
                <p className="text-xs">Reports are confidential. We don't reveal who reported unless legally required. You won't face retaliation.</p>
              </div>
            </div>
          </div>

          {/* Dispute Resolution */}
          <div>
            <h2 className="text-2xl font-semibold text-teal-700 mb-3">Dispute Resolution</h2>
            
            <p className="mb-4">Sometimes disagreements happen. Here's how we handle them:</p>

            <div className="space-y-3">
              <div className="bg-gray-50 p-4 rounded">
                <p className="font-semibold mb-2">Minor disputes (ratings, performance):</p>
                <ul className="list-disc pl-6 text-sm space-y-1">
                  <li>Try to resolve directly first (workers and venues communicate)</li>
                  <li>If that doesn't work, contact SwipeAShift support</li>
                  <li>We mediate and help find a fair solution</li>
                  <li>If a rating is clearly unfair/retaliatory, we may remove it</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-4 rounded">
                <p className="font-semibold mb-2">Major disputes (payment, serious misconduct):</p>
                <ul className="list-disc pl-6 text-sm space-y-1">
                  <li>Report to SwipeAShift immediately</li>
                  <li>We investigate thoroughly</li>
                  <li>We make a binding decision based on evidence</li>
                  <li>Appeals considered if new evidence emerges</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Consequences */}
          <div>
            <h2 className="text-2xl font-semibold text-teal-700 mb-3">Consequences for Violations</h2>
            
            <div className="space-y-2">
              <div className="bg-gray-50 p-3 rounded flex justify-between items-center">
                <span className="text-sm font-semibold">Minor first offense:</span>
                <span className="text-sm text-yellow-700">Warning</span>
              </div>

              <div className="bg-gray-50 p-3 rounded flex justify-between items-center">
                <span className="text-sm font-semibold">Repeated minor offenses:</span>
                <span className="text-sm text-orange-700">7-30 day suspension</span>
              </div>

              <div className="bg-gray-50 p-3 rounded flex justify-between items-center">
                <span className="text-sm font-semibold">Serious offense (harassment, theft, safety):</span>
                <span className="text-sm text-red-700">Immediate permanent ban</span>
              </div>

              <div className="bg-gray-50 p-3 rounded flex justify-between items-center">
                <span className="text-sm font-semibold">Criminal activity:</span>
                <span className="text-sm text-red-700">Permanent ban + authorities notified</span>
              </div>
            </div>

            <p className="text-xs text-gray-600 mt-3">
              <em>SwipeAShift reserves the right to suspend or ban accounts at our discretion to protect the community.</em>
            </p>
          </div>

          {/* Positive Community */}
          <div>
            <h2 className="text-2xl font-semibold text-teal-700 mb-3">Building a Positive Community</h2>
            
            <p className="mb-4">Beyond avoiding bad behavior, here's how to build each other up:</p>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-green-50 p-4 rounded border border-green-300">
                <p className="font-semibold text-green-900 mb-2">✨ For Workers:</p>
                <ul className="list-disc pl-6 text-sm space-y-1">
                  <li>Help train newer workers when you can</li>
                  <li>Share venue tips with other workers</li>
                  <li>Leave venues better than you found them</li>
                  <li>Thank venues for good experiences</li>
                  <li>Build relationships, not just transactions</li>
                </ul>
              </div>

              <div className="bg-green-50 p-4 rounded border border-green-300">
                <p className="font-semibold text-green-900 mb-2">✨ For Venues:</p>
                <ul className="list-disc pl-6 text-sm space-y-1">
                  <li>Recognize exceptional workers publicly</li>
                  <li>Provide feedback that helps workers improve</li>
                  <li>Consider booking great workers repeatedly</li>
                  <li>Share SwipeAShift with other venues</li>
                  <li>Treat gig workers as part of your team</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Changes to Guidelines */}
          <div>
            <h2 className="text-2xl font-semibold text-teal-700 mb-3">Changes to These Guidelines</h2>
            
            <p className="text-sm">
              We may update these guidelines as our community grows and evolves. Material changes will be posted with a new "Effective" date and we'll email all users.
            </p>
          </div>

          {/* Contact */}
          <div className="bg-teal-50 border-l-4 border-teal-600 p-6 rounded">
            <h2 className="text-xl font-semibold text-teal-800 mb-3">Questions or Concerns?</h2>
            <p className="mb-3">
              We're committed to maintaining a safe, respectful community for everyone. Contact us:
            </p>
            <ul className="space-y-1">
              <li><strong>Report violations:</strong> <a href="mailto:trust@swipeashift.com" className="text-teal-700 underline">trust@swipeashift.com</a></li>
              <li><strong>General support:</strong> <a href="mailto:support@swipeashift.com" className="text-teal-700 underline">support@swipeashift.com</a></li>
              <li><strong>Emergencies:</strong> Call 911 first, then notify us</li>
            </ul>
            <p className="mt-3 text-sm">
              Together, we rise. 🌊
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
