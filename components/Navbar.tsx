"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

interface NavbarProps {
  user?: { name: string; role: string } | null;
}

export default function Navbar({ user }: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const publicLinks = [
    { href: "/", label: "Trang Chủ" },
  ];

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-slate-200 shadow-sm">
      <div className="container-max flex items-center justify-between h-16">
        {/* Logo */}
        <Link href={user ? (user.role === "admin" ? "/admin" : "/dashboard") : "/"} className="flex items-center gap-2 font-bold text-lg">
          <span className="text-2xl">📚</span>
          <span className="brand-gradient-text hidden sm:inline" style={{ fontFamily: "Lora, serif" }}>
            Học cùng Đăng Khoa
          </span>
          <span className="brand-gradient-text sm:hidden" style={{ fontFamily: "Lora, serif" }}>
            HcĐK
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-2">
          {!user && (
            <>
              {publicLinks.map((l) => (
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
              <Link href="/login" className="px-4 py-2 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors">
                Đăng nhập
              </Link>
              <Link href="/register" className="px-5 py-2 rounded-xl text-sm font-semibold text-white brand-gradient hover:opacity-90 transition-opacity">
                Đăng ký
              </Link>
            </>
          )}

          {user && user.role === "student" && (
            <>
              <Link href="/dashboard" className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${pathname.startsWith("/dashboard") ? "bg-blue-50 text-blue-600" : "text-slate-600 hover:bg-slate-100"}`}>
                Dashboard
              </Link>
              <div className="flex items-center gap-2 ml-2 pl-3 border-l border-slate-200">
                <div className="w-8 h-8 rounded-full brand-gradient flex items-center justify-center text-white text-sm font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm font-medium text-slate-700 max-w-[120px] truncate">{user.name}</span>
                <button onClick={handleLogout} className="px-3 py-1.5 text-xs text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                  Đăng xuất
                </button>
              </div>
            </>
          )}

          {user && user.role === "admin" && (
            <>
              <Link href="/admin" className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${pathname === "/admin" ? "bg-blue-50 text-blue-600" : "text-slate-600 hover:bg-slate-100"}`}>
                Tổng quan
              </Link>
              <Link href="/admin/questions" className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${pathname.startsWith("/admin/questions") ? "bg-blue-50 text-blue-600" : "text-slate-600 hover:bg-slate-100"}`}>
                Câu hỏi
              </Link>
              <Link href="/admin/students" className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${pathname.startsWith("/admin/students") ? "bg-blue-50 text-blue-600" : "text-slate-600 hover:bg-slate-100"}`}>
                Học sinh
              </Link>
              <Link href="/admin/rewards" className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${pathname.startsWith("/admin/rewards") ? "bg-blue-50 text-blue-600" : "text-slate-600 hover:bg-slate-100"}`}>
                Phần thưởng
              </Link>
              <div className="flex items-center gap-2 ml-2 pl-3 border-l border-slate-200">
                <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-white text-sm font-bold">
                  A
                </div>
                <button onClick={handleLogout} className="px-3 py-1.5 text-xs text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                  Đăng xuất
                </button>
              </div>
            </>
          )}
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
          {!user && (
            <>
              <Link href="/" onClick={() => setOpen(false)} className="px-4 py-3 rounded-xl text-sm font-medium text-slate-600">Trang Chủ</Link>
              <Link href="/login" onClick={() => setOpen(false)} className="px-4 py-3 rounded-xl text-sm font-medium text-slate-600">Đăng nhập</Link>
              <Link href="/register" onClick={() => setOpen(false)} className="mt-1 px-4 py-3 rounded-xl text-sm font-semibold text-white text-center brand-gradient">Đăng ký</Link>
            </>
          )}
          {user && user.role === "student" && (
            <>
              <Link href="/dashboard" onClick={() => setOpen(false)} className="px-4 py-3 rounded-xl text-sm font-medium text-slate-600">Dashboard</Link>
              <button onClick={() => { setOpen(false); handleLogout(); }} className="px-4 py-3 rounded-xl text-sm font-medium text-red-600 text-left">Đăng xuất</button>
            </>
          )}
          {user && user.role === "admin" && (
            <>
              <Link href="/admin" onClick={() => setOpen(false)} className="px-4 py-3 rounded-xl text-sm text-slate-600">Tổng quan</Link>
              <Link href="/admin/questions" onClick={() => setOpen(false)} className="px-4 py-3 rounded-xl text-sm text-slate-600">Câu hỏi</Link>
              <Link href="/admin/students" onClick={() => setOpen(false)} className="px-4 py-3 rounded-xl text-sm text-slate-600">Học sinh</Link>
              <Link href="/admin/rewards" onClick={() => setOpen(false)} className="px-4 py-3 rounded-xl text-sm text-slate-600">Phần thưởng</Link>
              <button onClick={() => { setOpen(false); handleLogout(); }} className="px-4 py-3 rounded-xl text-sm font-medium text-red-600 text-left">Đăng xuất</button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
