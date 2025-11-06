
// File: /app/privacy/page.tsx
export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0f9ea5] via-[#33b5b9] to-[#b1e4e8] flex justify-center items-start">
      <div className="max-w-5xl w-full mx-auto px-8 py-16">
        <h1 className="text-4xl font-bold text-white mb-6 border-b border-white/30 pb-2">Privacy Policy</h1>

        <section className="bg-white/80 rounded-2xl p-8 shadow-lg backdrop-blur text-gray-800 leading-relaxed space-y-6">
          <p>This Privacy Policy explains how SwipeAShift collects, uses, and protects information about venues and workers. By using the platform, you consent to these practices.</p>

          <h2 className="text-2xl font-semibold">1. Information We Collect</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Account data (name, email, phone), profile details, and preferences.</li>
            <li>Shift, payment, and rating history.</li>
            <li>Device and usage data (IP address, logs, cookies).</li>
          </ul>

          <h2 className="text-2xl font-semibold">2. How We Use Information</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>To operate and improve the platform (matching, pricing suggestions, fraud prevention).</li>
            <li>To process payments via Stripe Connect.</li>
            <li>To communicate updates, confirmations, and support.</li>
          </ul>

          <h2 className="text-2xl font-semibold">3. Sharing & Disclosure</h2>
          <p>We share data with service providers (e.g., Stripe, hosting) under confidentiality obligations. We do not sell personal information. We may disclose information to comply with law or protect rights and safety.</p>

          <h2 className="text-2xl font-semibold">4. Data Security & Retention</h2>
          <p>We use industry-standard security measures. Records of shifts, consents, and payments are retained for legal and audit purposes. Users may request access or deletion where permitted by law.</p>

          <h2 className="text-2xl font-semibold">5. Your Choices</h2>
          <p>You may update profile information at any time. You can opt out of non-essential emails. Certain operational notices are required to use the service.</p>

          <h2 className="text-2xl font-semibold">6. Children</h2>
          <p>SwipeAShift is not intended for individuals under 18. We do not knowingly collect information from minors.</p>

          <h2 className="text-2xl font-semibold">7. Changes</h2>
          <p>We may update this policy periodically. Material changes will be posted with a new version date.</p>

          <h2 className="text-2xl font-semibold">Contact</h2>
          <p>Questions? Email <a className="text-teal-700 underline" href="mailto:compliance@swipeashift.com">compliance@swipeashift.com</a>.</p>

          <hr className="border-gray-300" />
          <div className="text-xs text-gray-600 space-y-1">
            <p><strong>Effective:</strong> November 2025</p>
            <p><strong>Business Address:</strong> 170 Commerce Way, Suite 200, Portsmouth, NH 03801</p>
            <p>© 2025 SwipeAShift LLC | compliance@swipeashift.com | Version 2025.11</p>
          </div>
        </section>
      </div>
    </main>
  );
}
