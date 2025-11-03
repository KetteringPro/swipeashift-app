// File: /app/tip-transparency/page.tsx
export default function TipTransparencyPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0f9ea5] via-[#33b5b9] to-[#b1e4e8] flex justify-center items-start">
      <div className="max-w-5xl w-full mx-auto px-8 py-16">
        <h1 className="text-4xl font-bold text-white mb-6 border-b border-white/30 pb-2">Tip Transparency & Fair Pay Policy</h1>

        <article className="bg-white/80 rounded-2xl p-8 shadow-lg backdrop-blur text-gray-800 leading-relaxed space-y-6">
          <p>SwipeAShift is built on fairness. Tips belong to the workers who earn them. We require full transparency from every restaurant, venue, and hospitality professional on our platform.</p>

          <h2 className="text-2xl font-semibold">How Tipping Works</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Venues</strong> pay all credit‑card and cash tips directly to workers within 24 hours. Venues may deduct only the proportional card processing fee (typically 2–3%).</li>
            <li><strong>Workers</strong> keep 100% of their gratuities (minus only card‑processing fees where applicable) and are responsible for reporting tips as income.</li>
            <li><strong>SwipeAShift</strong> does not collect, hold, or distribute tips.</li>
          </ul>

          <h2 className="text-2xl font-semibold">Venue Responsibilities</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Disclose tipping method when posting a shift (Base + Tips / No Tips / Tip Pool in Effect).</li>
            <li>Pay all card tips promptly in cash or via digital transfer (e.g., ACH, PayPal, Venmo).</li>
            <li>Operate any tip pool in compliance with federal and state law; pools must exclude managers and owners.</li>
            <li>Provide proof of coverage (workers’ comp, general liability) upon request.</li>
          </ul>

          <h2 className="text-2xl font-semibold">Worker Responsibilities</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Maintain personal records of tips and report them as required by law.</li>
            <li>Use the optional in‑app tip logging feature (when available) for personal tracking.</li>
          </ul>

          <h2 className="text-2xl font-semibold">Platform Enforcement</h2>
          <p>Venues found withholding or misrepresenting tips may be suspended or permanently removed. Workers can flag suspected tip issues via in‑app support. Verified violations may result in account removal.</p>

          <h2 className="text-2xl font-semibold">Electronic Acceptance Notice</h2>
          <p>By creating a SwipeAShift account or checking the consent box during onboarding, you agree electronically to this Tip Transparency & Compliance Policy. This consent has the same legal effect as a handwritten signature under ESIGN and UETA. Your acceptance timestamp is recorded in our secure database.</p>

          <hr className="border-gray-300" />
          <div className="text-xs text-gray-600 space-y-1">
            <p><strong>Effective:</strong> November 2025</p>
            <p><strong>Business Address:</strong> 170 Commerce Way, Suite 200, Portsmouth, NH 03801</p>
            <p>© 2025 SwipeAShift LLC | compliance@swipeashift.com | Version 2025.11</p>
          </div>
        </article>
      </div>
    </main>
  );
}

