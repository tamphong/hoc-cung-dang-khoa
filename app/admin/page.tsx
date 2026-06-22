import { redirect } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import LogoutButton from "@/components/LogoutButton";

export default async function AdminDashboard() {
  const session = await getSession();
  if (!session || session.role !== "admin") redirect("/login");

  const [userCount, questionCount, rewardCount, sessionCount] = await Promise.all([
    prisma.user.count({ where: { role: "student" } }),
    prisma.question.count(),
    prisma.reward.count(),
    prisma.quizSession.count(),
  ]);

  const recentSessions = await prisma.quizSession.findMany({
    include: { user: true, subject: true },
    orderBy: { completedAt: "desc" },
    take: 8,
  });

  const topStudents = await prisma.userProgress.groupBy({
    by: ["userId"],
    _sum: { totalScore: true },
    orderBy: { _sum: { totalScore: "desc" } },
    take: 5,
  });

  const topUserIds = topStudents.map((s) => s.userId);
  const topUsers = await prisma.user.findMany({ where: { id: { in: topUserIds } } });
  const topUsersMap = Object.fromEntries(topUsers.map((u) => [u.id, u]));

  const navLinks = [
    { href: "/admin/students", label: "Học sinh", emoji: "👥" },
    { href: "/admin/questions", label: "Câu hỏi", emoji: "❓" },
    { href: "/admin/rewards", label: "Phần thưởng", emoji: "🏆" },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Admin Navbar */}
      <nav className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="font-bold text-lg">🔧 Admin Panel</span>
          <div className="flex gap-1">
            {navLinks.map((l) => (
              <Link key={l.href} href={l.href}
                className="px-3 py-1.5 rounded-lg text-sm text-slate-300 hover:text-white hover:bg-white/10 transition-colors">
                {l.emoji} {l.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-slate-400 text-sm">{session.name}</span>
          <LogoutButton />
        </div>
      </nav>

      <div className="container-max py-8">
        <h1 className="text-2xl font-bold text-slate-800 mb-6" style={{ fontFamily: "Lora, serif" }}>
          Tổng quan
        </h1>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Học sinh", value: userCount, emoji: "👥", color: "#2563eb" },
            { label: "Câu hỏi", value: questionCount, emoji: "❓", color: "#7c3aed" },
            { label: "Phần thưởng", value: rewardCount, emoji: "🏆", color: "#d97706" },
            { label: "Bài thi", value: sessionCount, emoji: "📝", color: "#16a34a" },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-2xl border border-slate-200 p-5 text-center">
              <div className="text-3xl mb-2">{s.emoji}</div>
              <div className="text-3xl font-bold" style={{ color: s.color }}>{s.value}</div>
              <div className="text-slate-500 text-sm">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top students */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h2 className="font-bold text-slate-800 mb-4">🏆 Top học sinh</h2>
            {topStudents.length === 0 ? (
              <p className="text-slate-400 text-sm">Chưa có dữ liệu</p>
            ) : (
              <div className="space-y-3">
                {topStudents.map((s, i) => {
                  const user = topUsersMap[s.userId];
                  if (!user) return null;
                  const medals = ["🥇", "🥈", "🥉", "4️⃣", "5️⃣"];
                  return (
                    <div key={s.userId} className="flex items-center gap-3">
                      <span className="text-xl">{medals[i]}</span>
                      <div className="flex-1">
                        <div className="font-medium text-slate-800 text-sm">{user.name}</div>
                        <div className="text-slate-400 text-xs">{user.email}</div>
                      </div>
                      <span className="font-bold text-blue-600">{s._sum.totalScore ?? 0} điểm</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Recent sessions */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h2 className="font-bold text-slate-800 mb-4">📋 Bài thi gần đây</h2>
            <div className="space-y-2">
              {recentSessions.map((s) => {
                const pct = Math.round((s.score / s.total) * 100);
                return (
                  <div key={s.id} className="flex items-center justify-between text-sm p-2 rounded-lg hover:bg-slate-50">
                    <div>
                      <span className="font-medium text-slate-700">{s.user.name}</span>
                      <span className="text-slate-400 mx-1">·</span>
                      <span>{s.subject.emoji} {s.subject.name} L{s.level}</span>
                    </div>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${pct >= 70 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                      {pct}%
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Quick links */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href}
              className="bg-white rounded-2xl border border-slate-200 p-6 hover:border-blue-300 hover:shadow-md transition-all flex items-center gap-4">
              <span className="text-4xl">{l.emoji}</span>
              <div>
                <div className="font-bold text-slate-800">Quản lý {l.label}</div>
                <div className="text-slate-400 text-sm mt-0.5">Thêm, sửa, xóa →</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
