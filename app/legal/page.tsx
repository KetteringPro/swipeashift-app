// File: /app/legal/page.tsx
import Link from "next/link";

export default function LegalCenter() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0f9ea5] via-[#33b5b9] to-[#b1e4e8] flex justify-center items-start">
      <div className="max-w-5xl w-full mx-auto px-8 py-16">
        <h1 className="text-4xl font-bold text-white mb-6 border-b border-white/30 pb-2">Legal & Compliance Center</h1>

        <section className="bg-white/80 rounded-2xl p-8 shadow-lg backdrop-blur text-gray-800 leading-relaxed space-y-8">
          
          {/* Introduction */}
          <div>
            <p className="text-lg mb-4">
              SwipeAShift is committed to fairness, transparency, and compliance across every part of our platform. Below are our current public policies and disclosures.
            </p>
            <p className="text-sm">
              For questions, contact <a className="text-teal-700 underline font-semibold" href="mailto:compliance@swipeashift.com">compliance@swipeashift.com</a>
            </p>
          </div>

          {/* Core Policies */}
          <div>
            <h2 className="text-2xl font-semibold text-teal-700 mb-4">📋 Core Policies</h2>
            
            <div className="space-y-3">
              <div className="bg-blue-50 p-4 rounded border border-blue-300 hover:border-blue-500 transition-colors">
                <Link href="/legal/terms-workers" className="block">
                  <p className="font-semibold text-blue-900 mb-1">Terms of Service — Workers</p>
                  <p className="text-xs text-gray-700">
                    Independent contractor relationship, payment terms, responsibilities, ratings, and worker rights. Start here if you're looking to work shifts.
                  </p>
                </Link>
              </div>

              <div className="bg-green-50 p-4 rounded border border-green-300 hover:border-green-500 transition-colors">
                <Link href="/legal/terms-venues" className="block">
                  <p className="font-semibold text-green-900 mb-1">Terms of Service — Venues</p>
                  <p className="text-xs text-gray-700">
                    How the platform works for venues, pricing, insurance requirements, liability, and venue responsibilities. Start here if you're posting shifts.
                  </p>
                </Link>
              </div>

              <div className="bg-purple-50 p-4 rounded border border-purple-300 hover:border-purple-500 transition-colors">
                <Link href="/legal/privacy" className="block">
                  <p className="font-semibold text-purple-900 mb-1">Privacy Policy</p>
                  <p className="text-xs text-gray-700">
                    How we collect, use, share, and protect your personal information. GDPR/CCPA compliant. Details on Stripe, Checkr, and other third parties.
                  </p>
                </Link>
              </div>
            </div>
          </div>

          {/* Operational Policies */}
          <div>
            <h2 className="text-2xl font-semibold text-teal-700 mb-4">⚙️ Operational Policies</h2>
            
            <div className="space-y-3">
              <div className="bg-yellow-50 p-4 rounded border border-yellow-300 hover:border-yellow-500 transition-colors">
                <Link href="/legal/tip-transparency" className="block">
                  <p className="font-semibold text-yellow-900 mb-1">💵 Tip Transparency & Fair Pay Policy</p>
                  <p className="text-xs text-gray-700">
                    Workers keep 100% of tips. How tipping works, venue responsibilities, worker responsibilities, and platform enforcement.
                  </p>
                </Link>
              </div>

              <div className="bg-orange-50 p-4 rounded border border-orange-300 hover:border-orange-500 transition-colors">
                <Link href="/legal/cancellation" className="block">
                  <p className="font-semibold text-orange-900 mb-1">📅 Cancellation & Refund Policy</p>
                  <p className="text-xs text-gray-700">
                    When you can cancel for free, when fees apply, no-show policy, emergency exceptions, and 48-hour payment approval process.
                  </p>
                </Link>
              </div>

              <div className="bg-teal-50 p-4 rounded border border-teal-300 hover:border-teal-500 transition-colors">
                <Link href="/legal/background-check" className="block">
                  <p className="font-semibold text-teal-900 mb-1">✓ Background Check & Verification Policy</p>
                  <p className="text-xs text-gray-700">
                    Optional 4-tier verification system, FCRA rights, how Checkr works, dispute process, and cost breakdown. Tier 2 launches Dec 2025, Tier 3 Jan 2026.
                  </p>
                </Link>
              </div>

              <div className="bg-green-50 p-4 rounded border border-green-300 hover:border-green-500 transition-colors">
                <Link href="/legal/community" className="block">
                  <p className="font-semibold text-green-900 mb-1">🤝 Community Guidelines</p>
                  <p className="text-xs text-gray-700">
                    Expected behavior, prohibited conduct, zero-tolerance policies, reporting process, and building a positive community together.
                  </p>
                </Link>
              </div>
            </div>
          </div>

          {/* Quick Reference */}
          <div>
            <h2 className="text-2xl font-semibold text-teal-700 mb-4">🔍 Quick Reference Guide</h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              {/* For Workers */}
              <div className="bg-gray-50 p-4 rounded border border-gray-300">
                <p className="font-semibold text-gray-900 mb-3">👷 For Workers:</p>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="/legal/terms-workers#how-pay-works" className="text-teal-700 hover:underline">
                      → How do I get paid?
                    </Link>
                  </li>
                  <li>
                    <Link href="/legal/cancellation#worker-cancellation" className="text-teal-700 hover:underline">
                      → When can I cancel a shift?
                    </Link>
                  </li>
                  <li>
                    <Link href="/legal/background-check#verification-tiers" className="text-teal-700 hover:underline">
                      → Should I get background checked?
                    </Link>
                  </li>
                  <li>
                    <Link href="/legal/tip-transparency" className="text-teal-700 hover:underline">
                      → How do tips work?
                    </Link>
                  </li>
                  <li>
                    <Link href="/legal/terms-workers#taxes" className="text-teal-700 hover:underline">
                      → What about taxes?
                    </Link>
                  </li>
                </ul>
              </div>

              {/* For Venues */}
              <div className="bg-gray-50 p-4 rounded border border-gray-300">
                <p className="font-semibold text-gray-900 mb-3">🏢 For Venues:</p>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="/legal/terms-venues#pricing" className="text-teal-700 hover:underline">
                      → How does pricing work?
                    </Link>
                  </li>
                  <li>
                    <Link href="/legal/terms-venues#insurance" className="text-teal-700 hover:underline">
                      → What insurance do I need?
                    </Link>
                  </li>
                  <li>
                    <Link href="/legal/cancellation#venue-cancellation" className="text-teal-700 hover:underline">
                      → When can I cancel a shift?
                    </Link>
                  </li>
                  <li>
                    <Link href="/legal/background-check#venue-requirements" className="text-teal-700 hover:underline">
                      → Can I require background checks?
                    </Link>
                  </li>
                  <li>
                    <Link href="/legal/tip-transparency#venue-responsibilities" className="text-teal-700 hover:underline">
                      → My responsibilities for tips?
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Coming Soon */}
          <div>
            <h2 className="text-2xl font-semibold text-teal-700 mb-4">📄 Additional Documents (Coming Soon)</h2>
            
            <div className="bg-blue-50 p-6 rounded border border-blue-300">
              <p className="text-sm mb-3">
                The following documents will be posted prior to public launch:
              </p>
              <ul className="list-disc pl-6 text-sm space-y-1">
                <li><strong>Certificates of Insurance:</strong> Proof of our general liability, professional liability, and cyber liability coverage</li>
                <li><strong>Workers' Compensation Indemnity:</strong> Documentation of venue insurance requirements</li>
                <li><strong>Data Security Statement:</strong> Detailed technical security measures and compliance</li>
                <li><strong>Cookie Policy:</strong> How we use cookies and tracking technologies</li>
              </ul>
            </div>
          </div>

          {/* Version History */}
          <div>
            <h2 className="text-2xl font-semibold text-teal-700 mb-4">📝 Version History</h2>
            
            <div className="bg-gray-50 p-4 rounded">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between pb-2 border-b border-gray-300">
                  <span className="font-semibold">November 5, 2025</span>
                  <span>Version 1.0 - Initial comprehensive policies</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">October 2025</span>
                  <span>Beta policies (simplified versions)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h2 className="text-2xl font-semibold text-teal-700 mb-4">📧 Contact Us</h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded">
                <p className="font-semibold mb-2">General Inquiries:</p>
                <ul className="text-sm space-y-1">
                  <li><strong>Compliance:</strong> <a href="mailto:compliance@swipeashift.com" className="text-teal-700 underline">compliance@swipeashift.com</a></li>
                  <li><strong>Support:</strong> <a href="mailto:support@swipeashift.com" className="text-teal-700 underline">support@swipeashift.com</a></li>
                </ul>
              </div>

              <div className="bg-gray-50 p-4 rounded">
                <p className="font-semibold mb-2">Specialized Inquiries:</p>
                <ul className="text-sm space-y-1">
                  <li><strong>Privacy/Data:</strong> <a href="mailto:privacy@swipeashift.com" className="text-teal-700 underline">privacy@swipeashift.com</a></li>
                  <li><strong>Trust & Safety:</strong> <a href="mailto:trust@swipeashift.com" className="text-teal-700 underline">trust@swipeashift.com</a></li>
                  <li><strong>Security:</strong> <a href="mailto:security@swipeashift.com" className="text-teal-700 underline">security@swipeashift.com</a></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Footer */}
          <hr className="border-gray-300" />
          <div className="text-xs text-gray-600 space-y-1">
            <p><strong>Business Address:</strong> 170 Commerce Way, Suite 200, Portsmouth, NH 03801</p>
            <p><strong>Legal Entity:</strong> SwipeAShift LLC (New Hampshire)</p>
            <p><strong>Operating Areas:</strong> New Hampshire, Maine, Massachusetts (expanding 2026)</p>
            <p>© 2025 SwipeAShift LLC | <a href="mailto:compliance@swipeashift.com" className="text-teal-700 underline">compliance@swipeashift.com</a> | Version 2025.11.05</p>
          </div>

          <div className="text-center mt-8">
            <Link href="/" className="text-teal-700 hover:underline font-semibold">
              ← Return to Home
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
