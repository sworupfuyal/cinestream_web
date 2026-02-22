"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const ADMIN_LINKS = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/users", label: "Users" },
  { href: "/admin/movies", label: "Movies" },  // ← Add this line
];

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/admin" ? pathname === href : pathname?.startsWith(href);

  return (
    <aside
      className="
        fixed md:static
        top-0 left-0
        h-screen w-64
        bg-slate-950
        border-r border-gray-800
        z-40
        overflow-y-auto
      "
    >
      {/* Brand */}
      <div className="p-4 border-b border-gray-800">
        <Link href="/admin" className="flex items-center gap-3">
          <div className="
            h-9 w-9
            rounded-lg
            bg-blue-600
            text-white
            flex items-center justify-center
            font-bold
            shadow-md
          ">
            C
          </div>
          <span className="font-semibold text-white tracking-wide">
            Cinestream
          </span>
        </Link>
      </div>
      

      {/* Navigation */}
      <nav className="p-3 space-y-1">
        {ADMIN_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`
              flex items-center gap-3
              px-4 py-2.5
              rounded-lg
              text-sm font-medium
              transition-all
              ${
                isActive(link.href)
                  ? "bg-blue-600 text-white shadow"
                  : "text-gray-400 hover:text-white hover:bg-slate-900"
              }
            `}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}