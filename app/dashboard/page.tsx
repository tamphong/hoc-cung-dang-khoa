import { redirect } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import Navbar from "@/components/NavbarServer";
import Footer from "@/components/Footer";
import LogoutButton from "@/components/LogoutButton";

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const subjects = await prisma.subject.findMany({
    where: { isActive: true },
    orderBy: { order: "asc" },
  });

  const progress = await prisma.userProgress.findMany({
    where: { userId: session.userId },
  });
  const progressMap = Object.fromEntries(progress.map((p) => [p.subjectId, p]));

  const recentSessions = await prisma.quizSession.findMany({
    where: { userId: session.userId },
    include: { subject: true },
    orderBy: { completedAt: "desc" },
    take: 5,
  });

  const userRewards = await prisma.userReward.findMany({
    where: { userId: session.userId },
    include: { reward: true },
  });

  const totalScore = progress.reduce((sum, p) => sum + p.totalScore, 0);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 py-8 md:py-12 bg-slate-50">
        <div className="container-max">
          {/* Welcome header */}
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900" style={{ fontFamily: "Lora, serif" }}>
                Chào, {session.name}! 👋
              </h1>
              <p className="text-slate-500 mt-1">Tiếp tục hành trình chinh phục lớp 9 của bạn</p>
            </div>
            <LogoutButton />
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Tổng điểm", value: totalScore, emoji: "⭐", color: "#2563eb" },
              { label: "Môn đang học", value: progress.length, emoji: "📚", color: "#7c3aed" },
              { label: "Bài thi", value: recentSessions.length, emoji: "📝", color: "#0891b2" },
              { label: "Thành tích", value: userRewards.length, emoji: "🏆", color: "#d97706" },
            ].map((s) => (
              <div key={s.label} className="bg-white rounded-2xl border border-slate-200 p-4 text-center">
                <div className="text-3xl mb-1">{s.emoji}</div>
                <div className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</div>
                <div className="text-xs text-slate-500">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Subjects */}
            <div className="lg:col-span-2">
              <h2 className="font-bold text-slate-800 text-lg mb-4">Chọn môn học</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {subjects.map((s) => {
                  const prog = progressMap[s.id];
                  const level = prog?.currentLevel ?? 1;
                  const score = prog?.totalScore ?? 0;
                  const pct = Math.round((level / 100) * 100);
                  return (
                    <Link
                      key={s.id}
                      href={`/dashboard/${s.id}`}
                      className="bg-white rounded-2xl border-2 p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all group"
                      style={{ borderColor: s.border }}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                          style={{ background: s.color + "18" }}
                        >
                          {s.emoji}
                        </div>
                        <div>
                          <div className="font-bold text-slate-800">{s.name}</div>
                          <div className="text-xs text-slate-500">Level {level} / 100</div>
                        </div>
                        <div
                          className="ml-auto text-sm font-bold"
                          style={{ color: s.color }}
                        >
                          {score} điểm
                        </div>
                      </div>
                      <div className="bg-slate-100 rounded-full h-2 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{ width: `${pct}%`, background: s.color }}
                        />
                      </div>
                      <div className="flex justify-between mt-2 text-xs text-slate-400">
                        <span>{pct}% hoàn thành</span>
                        <span className="group-hover:text-blue-600 transition-colors" style={{ color: s.color }}>Luyện tập →</span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              {/* Recent rewards */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5">
                <h3 className="font-bold text-slate-800 mb-3">🏆 Thành tích gần đây</h3>
                {userRewards.length === 0 ? (
                  <p className="text-slate-400 text-sm">Làm bài thi để nhận thành tích!</p>
                ) : (
                  <div className="space-y-2">
                    {userRewards.slice(0, 4).map((ur) => (
                      <div key={ur.id} className="flex items-center gap-3">
                        <span className="text-2xl">{ur.reward.emoji}</span>
                        <div>
                          <div className="text-sm font-medium text-slate-700">{ur.reward.name}</div>
                          <div className="text-xs text-slate-400">{ur.reward.description}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Recent sessions */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5">
                <h3 className="font-bold text-slate-800 mb-3">📋 Bài thi gần đây</h3>
                {recentSessions.length === 0 ? (
                  <p className="text-slate-400 text-sm">Chưa có bài thi nào</p>
                ) : (
                  <div className="space-y-2">
                    {recentSessions.map((s) => {
                      const pct = Math.round((s.score / s.total) * 100);
                      return (
                        <div key={s.id} className="flex items-center justify-between text-sm">
                          <div>
                            <span className="mr-1">{s.subject.emoji}</span>
                            <span className="text-slate-700">{s.subject.name}</span>
                            <span className="text-slate-400 text-xs ml-1">L{s.level}</span>
                          </div>
                          <span
                            className={`font-bold text-xs ${
                              pct >= 70 ? "text-green-600" : "text-red-500"
                            }`}
                          >
                            {s.score}/{s.total}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
