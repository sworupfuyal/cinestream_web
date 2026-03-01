import {
  Trophy,
  Users,
  Shield,
  Gift,
  DollarSign,
  Medal,
  Target,
} from "lucide-react";

export default function WhyChooseUs() {
  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-black via-[#020617] to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Why Choose <span className="text-blue-500">CineStream?</span>
          </h2>
          <p className="text-lg text-gray-400">
            Experience the ultimate movie streaming platform
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          <div className="bg-[#020617] border border-gray-800 rounded-2xl p-8 hover:shadow-2xl transition">
            <div className="w-12 h-12 bg-blue-600/10 rounded-full flex items-center justify-center mb-4">
              <Trophy className="w-6 h-6 text-blue-500" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">
              Unlimited Movies
            </h3>
            <p className="text-gray-400">
              Stream thousands of movies and TV shows, from classics to the
              latest blockbusters.
            </p>
          </div>

          <div className="bg-[#020617] border border-gray-800 rounded-2xl p-8 hover:shadow-2xl transition">
            <div className="w-12 h-12 bg-blue-600/10 rounded-full flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-blue-500" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">
              Watch With Friends
            </h3>
            <p className="text-gray-400">
              Share watchlists, join watch parties, and enjoy movies together
              online.
            </p>
          </div>

          <div className="bg-[#020617] border border-gray-800 rounded-2xl p-8 hover:shadow-2xl transition">
            <div className="w-12 h-12 bg-blue-600/10 rounded-full flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-blue-500" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">
              Safe & Secure
            </h3>
            <p className="text-gray-400">
              Your account and payment information is protected with
              high-level encryption.
            </p>
          </div>

          <div className="bg-[#020617] border border-gray-800 rounded-2xl p-8 hover:shadow-2xl transition">
            <div className="w-12 h-12 bg-blue-600/10 rounded-full flex items-center justify-center mb-4">
              <DollarSign className="w-6 h-6 text-blue-500" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">
              Affordable Plans
            </h3>
            <p className="text-gray-400">
              Flexible subscription options to suit every viewer’s preference.
            </p>
          </div>

          <div className="bg-[#020617] border border-gray-800 rounded-2xl p-8 hover:shadow-2xl transition">
            <div className="w-12 h-12 bg-blue-600/10 rounded-full flex items-center justify-center mb-4">
              <Target className="w-6 h-6 text-blue-500" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">
              Personalized Recommendations
            </h3>
            <p className="text-gray-400">
              Get movie suggestions based on your watch history and ratings.
            </p>
          </div>

          <div className="bg-[#020617] border border-gray-800 rounded-2xl p-8 hover:shadow-2xl transition">
            <div className="w-12 h-12 bg-blue-600/10 rounded-full flex items-center justify-center mb-4">
              <Gift className="w-6 h-6 text-blue-500" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">
              Exclusive Bonuses
            </h3>
            <p className="text-gray-400">
              Enjoy early access to releases, special offers, and bonus content.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
