import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0f9ea5] via-[#33b5b9] to-[#b1e4e8] flex justify-center items-start">
      <div className="max-w-5xl w-full mx-auto px-8 py-16">
        <h1 className="text-4xl font-bold text-white mb-6 border-b border-white/30 pb-2">
          About the Founder
        </h1>

        <div className="md:flex md:items-start md:gap-10 bg-white/80 rounded-2xl p-8 shadow-lg backdrop-blur">
          <div className="md:w-2/3 text-gray-800 leading-relaxed space-y-6">
            <p>
              <strong>Christy Kettering</strong> didn't know she was related to Charles F. Kettering — 
              inventor of the automobile self-starter, holder of 140 patents, and pioneer of point-of-sale 
              systems at National Cash Register — until 2019, when her estranged father told her in one of 
              their last conversations before his death in 2020.
            </p>

            <p>
              What shocked her was the parallel. Charles revolutionized retail and payment systems in the 
              early 1900s. Christy had unknowingly spent 20 years building enterprise technology for retail 
              and eCommerce — the exact work her famous ancestor had done a century earlier.
            </p>

            <p>
              <em>Nature versus nurture? She still doesn't know. But she knows this: Ketterings solve 
              impossible problems.</em>
            </p>

            <p>
              Christy's career began at Liberty Mutual, where as a temp employee she was handed a stack of 
              folders and asked to troubleshoot why workers' compensation premiums weren't calculating 
              correctly. With just fifteen minutes of training, she identified the logic errors — launching 
              her career as a lead Ratabase analyst writing the formulas behind Liberty Mutual's national 
              Workers' Comp systems.
            </p>

            <p>
              She went on to build enterprise systems for VF Corporation (Timberland, The North Face, Vans), 
              Hitachi Vantara in Silicon Valley, and luxury fashion conglomerate Capri Holdings (Michael Kors, 
              Versace, Jimmy Choo). Most recently, she served as a strategic consultant managing data for 
              Capri's proposed $8.5 billion acquisition by Tapestry and designing a $90 million IT investment 
              strategy.
            </p>

            <p>
              But before all that — while pursuing her MBA in Business Management — Christy co-owned and 
              operated The Blue Claw restaurant on Portsmouth's waterfront with her late brother Ben Harris. 
              They worked 80-hour weeks trying to solve staffing through phone trees and whoever they could 
              reach through their personal networks. When you can't staff for a week, customers move on. 
              The business didn't fail. The staffing system did.
            </p>

            <p>
              Ben died in a 2012 brewery accident that led to new workplace safety regulations. Her father 
              died in 2020. SwipeAShift honors both of them.
            </p>

            <p>
              After leaving Capri in 2025, Christy returned to Portsmouth to build what she and Ben needed 
              at The Blue Claw: a staffing system that actually works for small businesses.
            </p>

            <p className="font-medium text-gray-700 mt-6 border-t border-gray-300 pt-4">
              Charles F. Kettering once said: <em>"My interest is in the future because I am going to spend 
              the rest of my life there."</em>
            </p>

            <p className="italic text-gray-600">
              "Restaurant workers deserve better systems. I'm building what Ben and I needed."
              <br />
              <span className="text-gray-500">— Christy Kettering, Founder</span>
            </p>
          </div>

          <div className="md:w-1/3 flex justify-center md:justify-end mt-8 md:mt-0">
            <Image
              src="/christy.jpg"
              alt="Christy Kettering, Founder of SwipeAShift"
              width={380}
              height={380}
              className="rounded-2xl shadow-2xl border-4 border-white/70"
            />
          </div>
        </div>
      </div>
    </main>
  );
}