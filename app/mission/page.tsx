"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function MissionPage() {
  useEffect(() => {
    // Intersection Observer for fade-in on scroll
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
          }
        });
      },
      { threshold: 0.15 }
    );

    const elements = document.querySelectorAll(".fade-in");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <main className="text-gray-200 overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative h-[70vh] flex items-center justify-center">
        <Image
          src="/images/server-smiling.jpg"
          alt="Smiling server welcoming guests"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative text-center px-6 fade-in opacity-0 translate-y-6 transition-all duration-1000 ease-out">
          <h1 className="text-5xl font-bold text-white drop-shadow-lg">
            Our Mission
          </h1>
          <p className="mt-4 text-xl text-gray-100">
            Because one more set of hands changes everything.
            <br />
            When service matters, every hand counts.
          </p>
        </div>
      </section>

      {/* MAIN STORY */}
      <section className="bg-gradient-to-t from-[#0b132b] via-[#1c2541] to-[#3a506b] py-20 px-6">
        <div className="max-w-5xl mx-auto space-y-16">
          {/* Story */}
          <div className="space-y-6 fade-in opacity-0 translate-y-6 transition-all duration-1000 ease-out">
            <h2 className="text-3xl font-semibold text-white">Our Story</h2>
            <p className="leading-relaxed text-gray-300">
              Every restaurant has been there — in the weeds on a busy night,
              trying to keep up while still providing the kind of service guests
              deserve. When one more set of hands could make all the difference
              between chaos and calm, stress and success — that’s where{" "}
              <span className="font-semibold text-white">SwipeAshift</span> steps in.
            </p>
            <p className="leading-relaxed text-gray-300">
              We built SwipeAshift to make staffing simple, flexible, and human
              again. By connecting restaurants and hospitality pros in real
              time, we give businesses the helping hands they need — and workers
              the freedom to choose when and where they want to work.
            </p>
          </div>

          {/* 3-IMAGE COLLAGE */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 fade-in opacity-0 translate-y-6 transition-all duration-1000 ease-out">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
              <Image
                src="/images/chef-prep.jpg"
                alt="Chef preparing dishes in the kitchen"
                fill
                className="object-cover object-center hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
              <Image
                src="/images/dishwasher2.jpg"
                alt="Dishwasher smiling while working"
                fill
                className="object-cover object-center hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
              <Image
                src="/images/kitchen-line.jpg"
                alt="Busy kitchen line team at work"
                fill
                className="object-cover object-center hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

          {/* Purpose */}
          <div className="space-y-6 fade-in opacity-0 translate-y-6 transition-all duration-1000 ease-out delay-150">
            <h2 className="text-3xl font-semibold text-white">Our Purpose</h2>
            <p className="leading-relaxed text-gray-300">
              To strengthen local restaurants and coastal communities by solving
              one of the industry’s biggest challenges — staffing. We’re creating
              a platform where reliable help is always within reach, ensuring
              guests enjoy top-quality service and workers have flexible
              opportunities that fit their lives.
            </p>
          </div>

          {/* Vision */}
          <div className="space-y-6 fade-in opacity-0 translate-y-6 transition-all duration-1000 ease-out delay-300">
            <h2 className="text-3xl font-semibold text-white">Our Vision</h2>
            <p className="leading-relaxed text-gray-300">
              A world where no restaurant has to turn guests away for lack of
              staff — and every worker has access to fair, flexible, and
              fulfilling work.
            </p>
          </div>

          {/* Values */}
          <div className="space-y-6 fade-in opacity-0 translate-y-6 transition-all duration-1000 ease-out delay-500">
            <h2 className="text-3xl font-semibold text-white">Our Values</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li>
                <strong className="text-white">Reliability:</strong> Every shift
                matters.
              </li>
              <li>
                <strong className="text-white">Community:</strong> We rise by
                helping each other succeed.
              </li>
              <li>
                <strong className="text-white">Respect:</strong> For every
                worker, every owner, every guest.
              </li>
              <li>
                <strong className="text-white">Flexibility:</strong> Life
                happens — we make work fit.
              </li>
              <li>
                <strong className="text-white">Excellence:</strong> Great
                service starts with great people.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* COASTAL FOOTER BANNER */}
      <section className="relative h-[60vh] fade-in opacity-0 translate-y-6 transition-all duration-1000 ease-out">
        <Image
          src="/images/lobster-dock.jpg"
          alt="New England harbor with lobster docks"
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center">
          <p className="text-xl text-gray-100 mb-2">
            Behind every great meal are hands that make it happen.
          </p>
          <button
            type="button"
            className="inline-block bg-[#3a506b] text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 opacity-80 cursor-default"
          >
            COMING SOON
          </button>
        </div>
      </section>
      <p className="text-center mt-12">
        <Link href="/" className="text-teal-700 hover:underline">
          ← Return to Home
        </Link>
      </p>
    </main>
  );
}