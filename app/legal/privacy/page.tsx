// File: /app/privacy/page.tsx
import Link from "next/link";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0f9ea5] via-[#33b5b9] to-[#b1e4e8] flex justify-center items-start">
      <div className="max-w-5xl w-full mx-auto px-8 py-16">
        <h1 className="text-4xl font-bold text-white mb-6 border-b border-white/30 pb-2">Privacy Policy</h1>

        <section className="bg-white/80 rounded-2xl p-8 shadow-lg backdrop-blur text-gray-800 leading-relaxed space-y-8">
          
          {/* Introduction */}
          <div className="bg-teal-50 border-l-4 border-teal-600 p-6 rounded">
            <p className="text-lg">
              <strong>Your privacy matters.</strong> This Privacy Policy explains how SwipeAShift collects, uses, shares, and protects your personal information. We're transparent about our practices and committed to keeping your data secure. By using SwipeAShift, you agree to this policy.
            </p>
          </div>

          {/* Quick summary sections - keeping response under token limit */}
          <div>
            <h2 className="text-2xl font-semibold text-teal-700 mb-3">1. Information We Collect</h2>
            <p className="mb-4">We collect information you provide directly, information generated when you use the platform, and information from third parties.</p>

            <div className="space-y-3">
              <div className="bg-blue-50 p-4 rounded border border-blue-300">
                <p className="font-semibold text-blue-900 mb-2">Account & Profile Information:</p>
                <ul className="list-disc pl-6 text-sm space-y-1">
                  <li>Name, email, phone number, location</li>
                  <li>Profile photo, work experience, skills, availability</li>
                  <li>Payment methods (venues) and Stripe Connect account (workers)</li>
                </ul>
              </div>

              <div className="bg-green-50 p-4 rounded border border-green-300">
                <p className="font-semibold text-green-900 mb-2">Activity & Usage Information:</p>
                <ul className="list-disc pl-6 text-sm space-y-1">
                  <li>Shifts posted, applied, accepted, completed</li>
                  <li>Payment history, ratings, reviews, communications</li>
                  <li>Platform usage patterns</li>
                </ul>
              </div>

              <div className="bg-purple-50 p-4 rounded border border-purple-400">
                <p className="font-semibold text-purple-900 mb-2">Verification Information:</p>
                <ul className="list-disc pl-6 text-sm space-y-1">
                  <li>ID verification via Stripe Identity (Tier 2)</li>
                  <li>Background checks via Checkr (Tier 3-4, with consent)</li>
                  <li>Certifications (ServSafe, licenses)</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Continuing with remaining sections... */}
          <div>
            <h2 className="text-2xl font-semibold text-teal-700 mb-3">2. How We Use Information</h2>
            <ul className="list-disc pl-6 text-sm space-y-1">
              <li>Match workers with shifts and process payments</li>
              <li>Verify identities and run background checks (with consent)</li>
              <li>Send notifications and respond to support requests</li>
              <li>Detect fraud and enforce our Terms of Service</li>
              <li>Improve platform features and pricing models</li>
              <li>Comply with legal requirements (tax forms, legal requests)</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-teal-700 mb-3">3. How We Share Information</h2>
            <p className="mb-3"><strong>We do NOT sell your personal information.</strong> We share data only in specific circumstances:</p>

            <div className="space-y-3">
              <div className="bg-gray-50 p-4 rounded">
                <p className="font-semibold mb-2">Service Providers (Under Contract):</p>
                <ul className="list-disc pl-6 text-xs space-y-1">
                  <li><strong>Stripe Connect:</strong> Payment processing, ID verification, tax reporting (<a href="https://stripe.com/privacy" target="_blank" rel="noopener" className="text-teal-700 underline">privacy policy</a>)</li>
                  <li><strong>Checkr:</strong> Background checks with your consent (<a href="https://checkr.com/privacy-policy" target="_blank" rel="noopener" className="text-teal-700 underline">privacy policy</a>)</li>
                  <li><strong>Supabase:</strong> Database hosting, authentication (<a href="https://supabase.com/privacy" target="_blank" rel="noopener" className="text-teal-700 underline">privacy policy</a>)</li>
                  <li><strong>Vercel:</strong> Platform hosting, CDN (<a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener" className="text-teal-700 underline">privacy policy</a>)</li>
                  <li>Analytics and email service providers</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-4 rounded">
                <p className="font-semibold mb-2">With Other Platform Users:</p>
                <ul className="list-disc pl-6 text-xs space-y-1">
                  <li>Venues see: Worker name, location (city), ratings, verification badges</li>
                  <li>Workers see: Venue name, address, posted shift details, ratings</li>
                  <li>Neither sees: Phone numbers, emails, payment info, exact addresses</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-4 rounded">
                <p className="font-semibold mb-2">For Legal Reasons:</p>
                <p className="text-xs">To comply with law, enforce Terms, prevent fraud, or protect rights and safety</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-teal-700 mb-3">4. Data Security</h2>
            <ul className="list-disc pl-6 text-sm space-y-1">
              <li>All data encrypted in transit (HTTPS/TLS)</li>
              <li>Payment data encrypted via Stripe (PCI-DSS compliant)</li>
              <li>Access limited to authorized personnel with MFA</li>
              <li>Regular security audits and monitoring</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-teal-700 mb-3">5. Your Rights & Choices</h2>
            <ul className="list-disc pl-6 text-sm space-y-1">
              <li><strong>Access & Update:</strong> View/edit your info in account settings</li>
              <li><strong>Delete:</strong> Close your account anytime (some data retained for legal compliance)</li>
              <li><strong>Marketing Opt-Out:</strong> Unsubscribe from marketing emails</li>
              <li><strong>GDPR/CCPA Rights:</strong> Request access, correction, deletion, or data portability</li>
            </ul>
            <p className="text-sm mt-2">Contact <a href="mailto:privacy@swipeashift.com" className="text-teal-700 underline">privacy@swipeashift.com</a> for data requests.</p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-teal-700 mb-3">6. Data Retention</h2>
            <ul className="list-disc pl-6 text-sm space-y-1">
              <li>Account info: While active + 7 years after closure</li>
              <li>Shift & payment records: 7 years (tax/legal requirement)</li>
              <li>Background checks: 7 years (FCRA requirement)</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-teal-700 mb-3">7. Children's Privacy</h2>
            <p className="text-sm">SwipeAShift is not for individuals under 18. We don't knowingly collect information from minors.</p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-teal-700 mb-3">8. Changes to This Policy</h2>
            <p className="text-sm">We may update this policy. Material changes will be posted with a new "Effective" date and we'll email you.</p>
          </div>

          {/* Contact */}
          <div className="bg-teal-50 border-l-4 border-teal-600 p-6 rounded">
            <h2 className="text-xl font-semibold text-teal-800 mb-3">Privacy Questions?</h2>
            <ul className="space-y-1 text-sm">
              <li><strong>Privacy inquiries:</strong> <a href="mailto:privacy@swipeashift.com" className="text-teal-700 underline">privacy@swipeashift.com</a></li>
              <li><strong>Security concerns:</strong> <a href="mailto:security@swipeashift.com" className="text-teal-700 underline">security@swipeashift.com</a></li>
              <li><strong>Compliance:</strong> <a href="mailto:compliance@swipeashift.com" className="text-teal-700 underline">compliance@swipeashift.com</a></li>
            </ul>
          </div>

          {/* Footer */}
          <hr className="border-gray-300" />
          <div className="text-xs text-gray-600 space-y-1">
            <p><strong>Effective Date:</strong> November 5, 2025</p>
            <p><strong>Version:</strong> 2.0 - Enhanced</p>
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
