import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import Navbar from "@/components/NavbarServer";
import Footer from "@/components/Footer";

export default async function SubjectPage({ params }: { params: Promise<{ subject: string }> }) {
  const { subject: subjectId } = await params;
  const session = await getSession();
  if (!session) redirect("/login");

  const subject = await prisma.subject.findUnique({ where: { id: subjectId } });
  if (!subject) notFound();

  const progress = await prisma.userProgress.findUnique({
    where: { userId_subjectId: { userId: session.userId, subjectId } },
  });

  const currentLevel = progress?.currentLevel ?? 1;
  const totalScore = progress?.totalScore ?? 0;

  const sessions = await prisma.quizSession.findMany({
    where: { userId: session.userId, subjectId },
    orderBy: { completedAt: "desc" },
    take: 10,
  });

  // Build level grid — show levels 1-100, grouped by 10
  type LevelStatus = "locked" | "available" | "completed";
  const levelGroups: { group: number; levels: { level: number; status: LevelStatus }[] }[] = [];
  for (let g = 0; g < 10; g++) {
    const levels = [];
    for (let l = g * 10 + 1; l <= (g + 1) * 10; l++) {
      const status: LevelStatus =
        l < currentLevel ? "completed" : l === currentLevel ? "available" : "locked";
      levels.push({ level: l, status });
    }
    levelGroups.push({ group: g + 1, levels });
  }

  const DIFFICULTY = ["🌱 Cơ bản", "📗 Dễ", "📘 Trung bình", "📙 Khá", "🔴 Khó", "🔥 Rất khó", "💪 Thử thách", "⚡ Cao cấp", "🚀 Chuyên gia", "👑 Bậc thầy"];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 py-8 bg-slate-50">
        <div className="container-max">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
            <Link href="/dashboard" className="hover:text-blue-600">Dashboard</Link>
            <span>›</span>
            <span className="text-slate-800 font-medium">{subject.name}</span>
          </div>

          {/* Subject header */}
          <div
            className="rounded-3xl p-6 md:p-8 mb-8 text-white"
            style={{ background: `linear-gradient(135deg, ${subject.color}, ${subject.color}cc)` }}
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-4xl">
                {subject.emoji}
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-bold">{subject.name}</h1>
                <p className="text-white/80 mt-1">{subject.description}</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="bg-white/10 rounded-xl p-3 text-center">
                <div className="text-2xl font-bold">Level {currentLevel}</div>
                <div className="text-white/70 text-xs">Hiện tại</div>
              </div>
              <div className="bg-white/10 rounded-xl p-3 text-center">
                <div className="text-2xl font-bold">{totalScore}</div>
                <div className="text-white/70 text-xs">Điểm tích lũy</div>
              </div>
              <div className="bg-white/10 rounded-xl p-3 text-center">
                <div className="text-2xl font-bold">{sessions.length}</div>
                <div className="text-white/70 text-xs">Lần làm bài</div>
              </div>
            </div>
            {/* Progress bar */}
            <div className="mt-4">
              <div className="flex justify-between text-xs text-white/70 mb-1">
                <span>Tiến độ</span>
                <span>{currentLevel}/100</span>
              </div>
              <div className="bg-white/20 rounded-full h-2">
                <div className="bg-white rounded-full h-full transition-all" style={{ width: `${currentLevel}%` }} />
              </div>
            </div>
          </div>

          {/* Level grid */}
          <div className="space-y-6">
            {levelGroups.map(({ group, levels }) => (
              <div key={group} className="bg-white rounded-2xl border border-slate-200 p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-slate-800">
                    Nhóm {group}: Level {(group - 1) * 10 + 1}–{group * 10}
                  </h3>
                  <span
                    className="text-xs px-3 py-1 rounded-full font-medium"
                    style={{ background: subject.color + "18", color: subject.color }}
                  >
                    {DIFFICULTY[group - 1]}
                  </span>
                </div>
                <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
                  {levels.map(({ level, status }) => (
                    <div key={level}>
                      {status === "locked" ? (
                        <div className="aspect-square rounded-xl bg-slate-100 flex flex-col items-center justify-center text-slate-300 text-xs border border-slate-200">
                          <span className="text-base">🔒</span>
                          <span>{level}</span>
                        </div>
                      ) : (
                        <Link
                          href={`/dashboard/${subjectId}/quiz/${level}`}
                          className="aspect-square rounded-xl flex flex-col items-center justify-center text-xs font-bold border-2 transition-all hover:scale-105"
                          style={
                            status === "completed"
                              ? { background: subject.color + "18", borderColor: subject.color, color: subject.color }
                              : { background: subject.color, borderColor: subject.color, color: "white" }
                          }
                        >
                          {status === "completed" ? <span>✓</span> : <span>▶</span>}
                          <span>{level}</span>
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Recent sessions */}
          {sessions.length > 0 && (
            <div className="mt-6 bg-white rounded-2xl border border-slate-200 p-5">
              <h3 className="font-bold text-slate-800 mb-4">Lịch sử làm bài</h3>
              <div className="space-y-2">
                {sessions.map((s) => {
                  const pct = Math.round((s.score / s.total) * 100);
                  return (
                    <div key={s.id} className="flex items-center justify-between text-sm p-3 bg-slate-50 rounded-xl">
                      <div>
                        <span className="font-medium text-slate-700">Level {s.level}</span>
                        <span className="text-slate-400 text-xs ml-2">
                          {new Date(s.completedAt).toLocaleDateString("vi-VN")}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-slate-700">{s.score}/{s.total}</span>
                        <span
                          className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                            pct >= 70 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                          }`}
                        >
                          {pct}%
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
