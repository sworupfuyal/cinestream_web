"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur border-b border-gray-800">
      <div className="flex items-center justify-between px-4 sm:px-6 md:px-12 py-4">
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

        {/* Desktop Actions */}
        <div className="hidden sm:flex items-center gap-6">
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

        {/* Mobile Hamburger */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
          className="sm:hidden inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-700 hover:bg-white/10 transition"
        >
          {open ? (
            <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={
          "sm:hidden overflow-hidden transition-[max-height] duration-300 " +
          (open ? "max-h-48" : "max-h-0")
        }
      >
        <div className="px-4 pb-4 pt-2 border-t border-gray-800 flex flex-col gap-3">
          <Link
            href="/login"
            onClick={() => setOpen(false)}
            className="text-sm font-medium text-gray-300 hover:text-white transition px-3 py-2 rounded-lg hover:bg-white/5"
          >
            Sign In
          </Link>
          <Link
            href="/signup"
            onClick={() => setOpen(false)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full text-sm font-medium transition text-center"
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}
