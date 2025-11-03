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
              SwipeAShift was built by someone who’s lived every side of the service industry.
              Founder <strong>Christy Kettering</strong> combines a background in restaurant operations,
              workers’ compensation analytics, and business strategy to bring fresh, practical
              innovation to hospitality staffing.
            </p>

            <p>
              Christy’s journey began at Liberty Mutual, where she started as a temporary administrative
              employee and was handed a stack of folders to troubleshoot why workers’ compensation
              premiums weren’t calculating correctly. With just fifteen minutes of training, she
              identified the logic errors and explained the fixes — launching her career as a lead
              Ratabase analyst writing the formulas behind Liberty Mutual’s national premium systems.
            </p>

            <p>
              While building her tech and insurance career, Christy co-owned and operated restaurants
              with her late brother and a former partner — working nights in hospitality while pursuing
              her MBA in Business Management. Those experiences gave her a ground-level understanding of
              how unpredictable staffing can impact small business success.
            </p>

            <p>
              By 2006, she stepped away from restaurant ownership but carried forward the lessons
              learned about leadership, resilience, and the power of systems that actually work.
              SwipeAShift combines that empathy with her technical expertise — a platform built by
              someone who’s lived the chaos it now solves.
            </p>

            <p className="italic text-gray-600 mt-6 border-t border-gray-300 pt-4">
              “I didn’t set out to build an app — I set out to fix the problem that’s been breaking
              small businesses for decades.”<br />
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