import Link from "next/link";

export default function HowItWorks() {
  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-black via-[#020617] to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            How <span className="text-blue-500">CineStream</span> Works
          </h2>
          <p className="text-lg text-gray-400">
            Start streaming in just three simple steps
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
          {/* Step 1 */}
          <div className="text-center bg-[#020617] border border-gray-800 rounded-2xl p-8 shadow-xl">
            <div className="w-16 h-16 bg-blue-600/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl font-bold text-blue-500">1</span>
            </div>
            <h3 className="text-2xl font-semibold text-white mb-3">
              Create an Account
            </h3>
            <p className="text-gray-400">
              Sign up for CineStream and unlock access to thousands of movies
              and TV shows instantly.
            </p>
          </div>

          {/* Step 2 */}
          <div className="text-center bg-[#020617] border border-gray-800 rounded-2xl p-8 shadow-xl">
            <div className="w-16 h-16 bg-blue-600/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl font-bold text-blue-500">2</span>
            </div>
            <h3 className="text-2xl font-semibold text-white mb-3">
              Choose What to Watch
            </h3>
            <p className="text-gray-400">
              Browse trending movies, top-rated series, or search for your
              favorites anytime.
            </p>
          </div>

          {/* Step 3 */}
          <div className="text-center bg-[#020617] border border-gray-800 rounded-2xl p-8 shadow-xl">
            <div className="w-16 h-16 bg-blue-600/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl font-bold text-blue-500">3</span>
            </div>
            <h3 className="text-2xl font-semibold text-white mb-3">
              Stream Anywhere
            </h3>
            <p className="text-gray-400">
              Watch on mobile, tablet, or desktop with seamless streaming and
              high-quality playback.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-10 sm:mt-14 px-4">
          <Link href="/signup">
            <button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 sm:px-12 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg transition">
              Start Watching Now
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
