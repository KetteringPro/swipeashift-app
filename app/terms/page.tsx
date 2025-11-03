// File: /app/terms/page.tsx
export default function TermsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0f9ea5] via-[#33b5b9] to-[#b1e4e8] flex justify-center items-start">
      <div className="max-w-5xl w-full mx-auto px-8 py-16">
        <h1 className="text-4xl font-bold text-white mb-6 border-b border-white/30 pb-2">Terms of Use</h1>

        <section className="bg-white/80 rounded-2xl p-8 shadow-lg backdrop-blur text-gray-800 leading-relaxed space-y-6">
          <p>Welcome to SwipeAShift. These Terms govern access to and use of the SwipeAShift platform by venues and workers. By creating an account or using the platform, you agree to these Terms.</p>

          <h2 className="text-2xl font-semibold">1. Role of the Platform</h2>
          <p>SwipeAShift is a marketplace that facilitates connections between venues and independent hospitality professionals. We are not an employer of workers nor the agent of venues.</p>

          <h2 className="text-2xl font-semibold">2. Independent Contractor Status</h2>
          <p>Workers who accept shifts via the platform act as independent contractors, not employees of SwipeAShift. Workers control when, where, and whether to accept shifts. Nothing herein creates an employment, agency, or joint venture relationship between SwipeAShift and workers.</p>

          <h2 className="text-2xl font-semibold">3. Payments & Fees</h2>
          <p>Venues pay an all‑in shift price through our payment processor. Upon shift completion, platform fees are retained and worker payouts are disbursed via Stripe Connect to the worker’s designated account. Refunds and cancellations are handled pursuant to posted policies.</p>

          <h2 className="text-2xl font-semibold">4. Tipping</h2>
          <p>Tips belong to the worker. SwipeAShift does not collect or distribute tips. Venues are responsible for distributing any credit‑card tips directly to workers, less only the proportional processing fee. Venues must disclose whether tips are direct, pooled, or not applicable when posting shifts.</p>

          <h2 className="text-2xl font-semibold">5. Workers’ Compensation & Insurance</h2>
          <p>Venues represent and warrant that they maintain workers’ compensation insurance and general liability coverage as required by law for work performed on their premises, including by individuals engaged via SwipeAShift. SwipeAShift does not provide workers’ compensation coverage for independent contractors. Upon request, venues will provide certificates of insurance.</p>

          <h2 className="text-2xl font-semibold">6. Indemnification</h2>
          <p>Venue agrees to indemnify, defend, and hold harmless SwipeAShift LLC, its affiliates, officers, and agents from any claims, liabilities, damages, costs, and expenses (including reasonable attorneys’ fees) arising from: (i) injuries or incidents occurring at or connected to the venue premises; (ii) venue’s failure to comply with applicable laws (including wage/tip laws); (iii) venue’s failure to maintain required insurance; and (iv) allegations that a worker is or was the venue’s employee.</p>

          <h2 className="text-2xl font-semibold">7. Conduct & Safety</h2>
          <p>Venues and workers agree to maintain safe, respectful work environments and comply with all health and safety requirements. SwipeAShift may suspend or remove accounts for violations.</p>

          <h2 className="text-2xl font-semibold">8. Dispute Resolution</h2>
          <p>Most issues can be resolved through support. Where permitted by law, you agree to resolve disputes with SwipeAShift through binding arbitration on an individual basis. Class actions are waived. Some jurisdictions may not allow arbitration requirements; in such cases, the laws of New Hampshire govern.</p>

          <h2 className="text-2xl font-semibold">9. Changes to Terms</h2>
          <p>We may update these Terms from time to time. Material changes will be posted on this page with an updated version date. Continued use of the platform constitutes acceptance.</p>

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
