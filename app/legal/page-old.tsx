// File: /app/legal/page.tsx
import Link from "next/link";

export default function LegalCenter() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0f9ea5] via-[#33b5b9] to-[#b1e4e8] flex justify-center items-start">
      <div className="max-w-5xl w-full mx-auto px-8 py-16">
        <h1 className="text-4xl font-bold text-white mb-6 border-b border-white/30 pb-2">Legal & Compliance Center</h1>

        <section className="bg-white/80 rounded-2xl p-8 shadow-lg backdrop-blur text-gray-800 leading-relaxed space-y-6">
          <p>
            SwipeAShift is committed to fairness, transparency, and compliance across every part of our platform.
            Below are our current public policies and disclosures. For questions, contact
            {" "}
            <a className="text-teal-700 underline" href="mailto:compliance@swipeashift.com">compliance@swipeashift.com</a>.
          </p>

          <ul className="list-disc pl-6 space-y-2">
            <li><Link className="text-teal-700 underline" href="/tip-transparency">Tip Transparency & Fair Pay Policy</Link></li>
            <li><Link className="text-teal-700 underline" href="/terms">Terms of Use</Link></li>
            <li><Link className="text-teal-700 underline" href="/privacy">Privacy Policy</Link></li>
          </ul>

          <p className="text-sm text-gray-600">Additional documents (Certificates of Insurance, Workers’ Compensation Indemnity, Data Security Statement) will be posted prior to public launch.</p>

          <hr className="border-gray-300" />
          <div className="text-xs text-gray-600 space-y-1">
            <p><strong>Business Address:</strong> 170 Commerce Way, Suite 200, Portsmouth, NH 03801</p>
            <p>© 2025 SwipeAShift LLC | compliance@swipeashift.com | Version 2025.11</p>
          </div>
        </section>
      </div>
      <p className="text-center mt-12">
        <Link href="/" className="text-teal-700 hover:underline">
          ← Return to Home
        </Link>
      </p>
    </main>
  );
}

