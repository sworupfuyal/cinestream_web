import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur border-b border-gray-800">
      <div className="flex items-center justify-between px-6 md:px-12 py-4">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <Link href="/">
            <Image
              src="/images/logo.png"
              alt="CineStream Logo"
              width={48}
              height={48}
              priority
            />
          </Link>
          <span className="text-lg font-semibold text-white tracking-wide">
            Cine<span className="text-blue-500">Stream</span>
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-6">
          <Link
            href="/login"
            className="text-sm font-medium text-gray-300 hover:text-white transition"
          >
            Sign In
          </Link>

          <Link
            href="/signup"
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full text-sm font-medium transition"
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}
