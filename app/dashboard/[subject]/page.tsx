import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import Navbar from "@/components/NavbarServer";
import Footer from "@/components/Footer";
import SubjectTabNav from "@/components/SubjectTabNav";
import ExerciseCard from "@/components/ExerciseCard";
import { getLessonContent } from "@/lib/lesson-content";

export default async function SubjectPage({
  params,
  searchParams,
}: {
  params: Promise<{ subject: string }>;
  searchParams: Promise<{ tab?: string }>;
}) {
  const { subject: rawSubjectId } = await params;
  const { tab } = await searchParams;
  const subjectId = decodeURIComponent(rawSubjectId);
  const activeTab = tab === "lessons" ? "lessons" : "quiz";

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

  const lessonData = getLessonContent(subjectId);

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
            className="rounded-3xl p-6 md:p-8 mb-6 text-white"
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

          {/* Tab nav */}
          <SubjectTabNav activeTab={activeTab} color={subject.color} />

          {/* ─── TAB: BÀI HỌC ─── */}
          {activeTab === "lessons" && (
            <div>
              {!lessonData ? (
                <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center text-slate-400">
                  <div className="text-5xl mb-3">📖</div>
                  <p>Nội dung bài học đang được cập nhật...</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {lessonData.chapters.map((chapter) => (
                    <div key={chapter.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                      {/* Chapter header */}
                      <div className="p-5 border-b border-slate-100" style={{ background: subject.color + "0d" }}>
                        <h2 className="font-bold text-slate-800 text-lg">{chapter.title}</h2>
                        <p className="text-slate-500 text-sm mt-1">{chapter.description}</p>
                      </div>

                      {/* Topics */}
                      <div className="divide-y divide-slate-100">
                        {chapter.topics.map((topic, ti) => (
                          <div key={ti} className="p-5">
                            <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                              <span
                                className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                                style={{ background: subject.color + "20", color: subject.color }}
                              >
                                {ti + 1}
                              </span>
                              {topic.title}
                            </h3>

                            <div className="grid md:grid-cols-2 gap-4">
                              {/* Theory */}
                              <div>
                                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Lý thuyết</div>
                                <ul className="space-y-1.5">
                                  {topic.theory.map((t, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                                      <span className="mt-1 shrink-0 text-xs" style={{ color: subject.color }}>▸</span>
                                      {t}
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              {/* Formulas + Video */}
                              <div className="space-y-3">
                                {topic.formulas && topic.formulas.length > 0 && (
                                  <div>
                                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Công thức</div>
                                    <div className="space-y-1">
                                      {topic.formulas.map((f, i) => (
                                        <div
                                          key={i}
                                          className="px-3 py-1.5 rounded-lg text-sm font-mono"
                                          style={{ background: subject.color + "12", color: subject.color }}
                                        >
                                          {f}
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                {topic.videoUrl && (
                                  <a
                                    href={topic.videoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
                                    style={{ background: "#ff0000" }}
                                  >
                                    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                    </svg>
                                    <span className="truncate">{topic.videoTitle || "Xem video bài giảng"}</span>
                                  </a>
                                )}
                              </div>
                            </div>

                            {/* Exercises */}
                            {topic.exercises && topic.exercises.length > 0 && (
                              <div className="mt-4 pt-4 border-t border-slate-100">
                                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">
                                  Bài tập luyện tập ({topic.exercises.length} bài)
                                </div>
                                <div className="space-y-3">
                                  {topic.exercises.map((ex, ei) => (
                                    <ExerciseCard
                                      key={ei}
                                      exercise={ex}
                                      index={ei + 1}
                                      color={subject.color}
                                    />
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ─── TAB: LUYỆN TẬP ─── */}
          {activeTab === "quiz" && (
            <div>
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
                              href={`/dashboard/${encodeURIComponent(subjectId)}/quiz/${level}`}
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
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
