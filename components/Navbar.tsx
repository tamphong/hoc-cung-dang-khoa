"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/", label: "Trang Chủ" },
    { href: "/luyen-tap", label: "Luyện Tập" },
    { href: "/thanh-tich", label: "Thành Tích" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-slate-200 shadow-sm">
      <div className="container-max flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <span className="text-2xl">📚</span>
          <span className="brand-gradient-text" style={{ fontFamily: "Lora, serif" }}>
            Học cùng Đăng Khoa
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                pathname === l.href
                  ? "bg-blue-50 text-blue-600"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/luyen-tap"
            className="ml-3 px-5 py-2 rounded-xl text-sm font-semibold text-white brand-gradient hover:opacity-90 transition-opacity"
          >
            Bắt đầu ngay
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 rounded-lg text-slate-600"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pb-4 flex flex-col gap-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`px-4 py-3 rounded-xl text-sm font-medium ${
                pathname === l.href ? "bg-blue-50 text-blue-600" : "text-slate-600"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/luyen-tap"
            onClick={() => setOpen(false)}
            className="mt-1 px-4 py-3 rounded-xl text-sm font-semibold text-white text-center brand-gradient"
          >
            Bắt đầu ngay
          </Link>
        </div>
      )}
    </nav>
  );
}
