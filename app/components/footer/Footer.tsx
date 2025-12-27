export default function Footer() {
  return (
    <footer className="bg-black border-t border-gray-800 text-gray-400 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Brand */}
        <p className="mb-2 text-white font-semibold text-lg">
          Cine<span className="text-blue-500">Stream</span>
        </p>

        {/* Links (optional) */}
        <div className="flex justify-center gap-6 mb-4">
          <a href="#" className="hover:text-white transition">Home</a>
          <a href="/signup" className="hover:text-white transition">Sign Up</a>
          <a href="/login" className="hover:text-white transition">Login</a>
          <a href="#contact" className="hover:text-white transition">Contact</a>
        </div>

        {/* Copyright */}
        <p className="text-gray-500 text-sm">
          © 2025 CineStream. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
