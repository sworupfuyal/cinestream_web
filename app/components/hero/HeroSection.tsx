import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-b from-black via-[#020617] to-black py-32 min-h-[650px] flex items-center overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(239,68,68,0.15),_transparent_60%)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
        <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
          Unlimited Movies.
          <br />
          <span className="text-blue-500">Unlimited Entertainment.</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
          Stream the latest blockbusters, trending series, and timeless classics
          anytime, anywhere with CineStream.
        </p>

        <div className="flex justify-center flex-wrap gap-4">
          <Link href="/signup">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-3 rounded-full font-semibold text-lg transition">
              Start Watching Free
            </button>
          </Link>

          <Link href="/login">
            <button className="bg-transparent hover:bg-white/10 text-white px-10 py-3 rounded-full font-semibold text-lg border border-gray-500 transition">
              Sign In
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
