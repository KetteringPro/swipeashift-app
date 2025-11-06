'use client';
import React from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function ComingSoon() {
  const [showModal, setShowModal] = React.useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-teal-600 p-2 sm:p-4">
      <div className="max-w-7xl mx-auto text-center">

        <div className="mb-3 sm:mb-4 flex justify-center pt-6 sm:pt-8">
          <img
            src="/images/logo-horizontal.png"
            alt="SwipeAShift Logo"
            className="w-3/4 sm:w-2/3 md:w-3/5 lg:w-1/2 h-auto object-contain"
          />
        </div>

        {/* Coming Soon Banner */}
        <div className="mb-6 sm:mb-8">
          <div className="inline-block bg-gradient-to-r from-teal-600 to-teal-700 text-white px-8 py-3 rounded-full font-bold text-base sm:text-lg shadow-xl animate-pulse">
            🚀 Coming Soon
          </div>
        </div>

        {/* Get Started Button */}
        <div className="mb-6 sm:mb-8">
          <a
            href="/get-started"
            className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-4 rounded-lg font-bold text-lg sm:text-xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
          >
            Get Started Now →
          </a>
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 text-slate-800 px-4 max-w-6xl mx-auto">
          Revolutionizing the service industry — one shift at a time.
        </h1>

        <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 text-slate-800 px-4 max-w-4xl mx-auto">
          SwipeAShift connects restaurants with experienced professionals ready to fill shifts when you need them most.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8 px-4">
          <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 text-left">
            <h2 className="text-lg sm:text-xl font-semibold text-teal-700 mb-2 sm:mb-3">For Restaurants</h2>
            <p className="text-sm sm:text-base text-slate-700">
              Tired of scrambling for coverage? We match you with trusted staff when and where you need them.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 text-left">
            <h2 className="text-lg sm:text-xl font-semibold text-teal-700 mb-2 sm:mb-3">For Restaurant Pros</h2>
            <p className="text-sm sm:text-base text-slate-700">
              Looking for extra cash or schedule flexibility? Pick up shifts on your own time.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 text-left">
            <h2 className="text-lg sm:text-xl font-semibold text-teal-700 mb-2 sm:mb-3">For Caterers & Event Venues</h2>
            <p className="text-sm sm:text-base text-slate-700">
              Need on-call support for events? SwipeAShift helps you fill the gaps fast.
            </p>
          </div>
        </div>

        <div className="max-w-2xl mx-auto mb-6 sm:mb-8 px-4">
          <p className="text-sm sm:text-base md:text-lg mb-4 sm:mb-6 text-slate-800">
            No spam! Just a simple email when the app is ready.
          </p>
          
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const email = formData.get("email") as string;

              const { error } = await supabase
                .from("early_signups")
                .insert([{ email }]);

              if (error) {
                console.error("Signup error:", error.message);
                alert("Something went wrong. Please try again later.");
              } else {
                setShowModal(true);
              }
              
              e.currentTarget.reset();
            }}
            className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
          >
            <input
              type="email"
              name="email"
              required
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 sm:px-5 sm:py-3 rounded-lg border-2 border-gray-300 text-slate-800 text-sm sm:text-base"
            />
            <button
              type="submit"
              className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-6 py-2 sm:px-8 sm:py-3 rounded-lg text-sm sm:text-base whitespace-nowrap"
            >
              Notify Me
            </button>
          </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 max-w-5xl mx-auto px-4 mb-6">
          <img src="/images/barista.jpg" alt="Barista" className="rounded-lg shadow-lg w-full h-auto" />
          <img src="/images/lobster-dock.jpg" alt="Lobster Dock" className="rounded-lg shadow-lg w-full h-auto" />
        </div>

        <footer className="mt-6 sm:mt-12 pt-4 sm:pt-6 text-sm text-white border-t border-white/30">
          &copy; {new Date().getFullYear()} SwipeAShift. All rights reserved.
        </footer>
      </div>

      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-lg p-6 sm:p-8 max-w-md w-full shadow-2xl">
            <h3 className="text-xl sm:text-2xl font-bold text-teal-700 mb-3">Welcome aboard! 🌊</h3>
            <p className="text-slate-700 mb-6">
              We'll notify you when SwipeAShift launches. Get ready to find staff or pick up shifts!
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold px-6 py-3 rounded-lg"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}