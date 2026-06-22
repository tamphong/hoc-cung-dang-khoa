"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Question {
  id: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

interface SubjectInfo {
  name: string;
  emoji: string;
  color: string;
}

type Phase = "loading" | "quiz" | "result" | "error";

const LABELS = ["A", "B", "C", "D"];

export default function QuizLevelPage() {
  const { subject: subjectId, level: levelStr } = useParams<{ subject: string; level: string }>();
  const level = parseInt(levelStr || "1");
  const router = useRouter();

  const [phase, setPhase] = useState<Phase>("loading");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [subject, setSubject] = useState<SubjectInfo | null>(null);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showExpl, setShowExpl] = useState(false);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [score, setScore] = useState(0);
  const [newRewards, setNewRewards] = useState<{ name: string; emoji: string }[]>([]);
  const [newLevel, setNewLevel] = useState(level);
  const [error, setError] = useState("");

  const loadQuiz = useCallback(async () => {
    setPhase("loading");
    try {
      const res = await fetch(`/api/student/quiz?subjectId=${subjectId}&level=${level}`);
      if (!res.ok) throw new Error("API error");
      const qs: Question[] = await res.json();
      if (!qs.length) throw new Error("No questions at this level");

      // Fetch subject info
      const subjRes = await fetch("/api/student/subjects");
      if (subjRes.ok) {
        const subjects = await subjRes.json();
        const s = subjects.find((x: SubjectInfo & { id: string }) => x.id === subjectId);
        if (s) setSubject(s);
      }

      setQuestions(qs);
      setAnswers(new Array(qs.length).fill(null));
      setCurrent(0);
      setSelected(null);
      setShowExpl(false);
      setScore(0);
      setPhase("quiz");
    } catch (e) {
      console.error(e);
      setError("Không thể tải câu hỏi. Có thể chưa có câu hỏi nào cho level này.");
      setPhase("error");
    }
  }, [subjectId, level]);

  useEffect(() => { loadQuiz(); }, [loadQuiz]);

  function handleSelect(idx: number) {
    if (selected !== null) return;
    setSelected(idx);
    setShowExpl(true);
    const newAnswers = [...answers];
    newAnswers[current] = idx;
    setAnswers(newAnswers);
  }

  async function handleNext() {
    const currentCorrect = selected === questions[current]?.correct;
    const addedScore = currentCorrect ? 10 : 0;

    if (current + 1 >= questions.length) {
      const finalScore = answers.reduce<number>((acc, ans, i) => {
        if (ans === null || i === current) return acc;
        return acc + (ans === questions[i]?.correct ? 10 : 0);
      }, 0) + addedScore;

      const total = questions.length * 10;

      // Submit
      const res = await fetch("/api/student/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subjectId, level, score: finalScore, total }),
      });
      if (res.ok) {
        const data = await res.json();
        setNewRewards(data.newRewards || []);
        setNewLevel(data.newLevel || level);
      }
      setScore(finalScore);
      setPhase("result");
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
      setShowExpl(false);
    }
  }

  const color = subject?.color || "#2563eb";

  if (phase === "loading") {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl animate-float mb-4">{subject?.emoji || "📝"}</div>
            <p className="text-slate-600">Đang tải câu hỏi Level {level}...</p>
            <div className="flex gap-1 justify-center mt-4">
              {[0, 1, 2].map((i) => (
                <div key={i} className="w-2 h-2 rounded-full animate-bounce bg-blue-500"
                  style={{ animationDelay: `${i * 150}ms` }} />
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (phase === "error") {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <div className="text-6xl mb-4">😢</div>
            <h2 className="text-xl font-bold text-slate-800 mb-2">Không thể tải câu hỏi</h2>
            <p className="text-slate-500 text-sm mb-6">{error}</p>
            <div className="flex gap-3 justify-center">
              <button onClick={loadQuiz} className="px-5 py-2 rounded-xl text-white font-semibold brand-gradient">Thử lại</button>
              <Link href={`/dashboard/${subjectId}`} className="px-5 py-2 rounded-xl text-slate-600 bg-slate-100">Quay lại</Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (phase === "result") {
    const total = questions.length * 10;
    const pct = Math.round((score / total) * 100);
    const passed = pct >= 70;

    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 py-10">
          <div className="container-max max-w-lg mx-auto">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
              <div className="p-8 text-center" style={{ background: `linear-gradient(135deg, ${color}, ${color}cc)` }}>
                <div className="text-6xl mb-2">{passed ? "🎉" : "💪"}</div>
                <h1 className="text-white text-2xl font-bold">
                  {passed ? "Xuất sắc!" : "Cố gắng thêm!"}
                </h1>
                <p className="text-white/80 mt-1">
                  {subject?.emoji} Level {level}
                </p>
              </div>

              <div className="p-8">
                <div className="text-center mb-6">
                  <div className="text-6xl font-bold" style={{ color }}>{score}</div>
                  <div className="text-slate-500">/ {questions.length * 10} điểm</div>
                  <div className="mt-3 bg-slate-100 rounded-full h-3">
                    <div className="h-full rounded-full" style={{ width: `${pct}%`, background: color }} />
                  </div>
                  <div className="text-sm text-slate-500 mt-1">{pct}% chính xác</div>
                </div>

                {/* Passed or not */}
                {passed ? (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-center text-green-700 text-sm font-medium mb-4">
                    ✅ Bạn vượt qua Level {level}! → Mở khóa Level {newLevel}
                  </div>
                ) : (
                  <div className="bg-orange-50 border border-orange-200 rounded-xl p-3 text-center text-orange-700 text-sm font-medium mb-4">
                    ⚡ Cần đạt 70% để lên level. Hãy thử lại!
                  </div>
                )}

                {/* New rewards */}
                {newRewards.length > 0 && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-4">
                    <div className="font-bold text-yellow-800 text-sm mb-2">🏆 Thành tích mới!</div>
                    {newRewards.map((r) => (
                      <div key={r.name} className="flex items-center gap-2 text-sm">
                        <span>{r.emoji}</span>
                        <span className="text-yellow-700">{r.name}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex flex-col gap-3">
                  <button onClick={loadQuiz} className="w-full py-3 rounded-xl font-semibold text-white" style={{ background: color }}>
                    🔄 Thử lại Level {level}
                  </button>
                  {passed && (
                    <Link href={`/dashboard/${subjectId}/quiz/${newLevel}`}
                      className="w-full py-3 rounded-xl font-semibold text-white text-center brand-gradient">
                      ▶ Tiếp tục Level {newLevel}
                    </Link>
                  )}
                  <Link href={`/dashboard/${subjectId}`}
                    className="w-full py-3 rounded-xl font-semibold text-slate-600 bg-slate-100 text-center">
                    ← Về danh sách level
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Quiz phase
  const q = questions[current];
  const progress = (current / questions.length) * 100;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 py-8">
        <div className="container-max max-w-2xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-2 text-sm">
            <div className="flex items-center gap-2 font-medium text-slate-700">
              <span>{subject?.emoji}</span>
              <span>{subject?.name}</span>
              <span className="text-xs px-2 py-0.5 rounded-full font-semibold"
                style={{ background: color + "18", color }}>
                Level {level}
              </span>
            </div>
            <span className="text-slate-400">{current + 1} / {questions.length}</span>
          </div>

          <div className="bg-slate-200 rounded-full h-2 mb-6">
            <div className="h-full rounded-full transition-all" style={{ width: `${progress}%`, background: color }} />
          </div>

          <div className="bg-white rounded-3xl shadow-lg overflow-hidden border border-slate-100">
            {/* Question */}
            <div className="p-6 md:p-8 border-b border-slate-100" style={{ background: color + "08" }}>
              <div className="inline-block text-xs font-bold px-3 py-1 rounded-full mb-3"
                style={{ background: color + "20", color }}>
                Câu {current + 1}
              </div>
              <p className="text-slate-800 text-lg font-medium leading-relaxed">{q.question}</p>
            </div>

            {/* Options */}
            <div className="p-6 md:p-8 space-y-3">
              {q.options.map((opt, i) => {
                let cls = "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50";
                if (selected !== null) {
                  if (i === q.correct) cls = "border-green-400 bg-green-50";
                  else if (i === selected) cls = "border-red-400 bg-red-50";
                }
                return (
                  <button key={i} onClick={() => handleSelect(i)} disabled={selected !== null}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all ${cls}`}>
                    <span className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
                      style={
                        selected !== null && i === q.correct ? { background: "#16a34a", color: "white" }
                        : selected !== null && i === selected && i !== q.correct ? { background: "#dc2626", color: "white" }
                        : { background: color + "18", color }
                      }>
                      {LABELS[i]}
                    </span>
                    <span className="text-slate-700 text-sm">{opt}</span>
                    {selected !== null && i === q.correct && <span className="ml-auto text-green-600">✓</span>}
                    {selected !== null && i === selected && i !== q.correct && <span className="ml-auto text-red-500">✗</span>}
                  </button>
                );
              })}
            </div>

            {showExpl && (
              <div className="mx-6 md:mx-8 mb-4 p-4 bg-blue-50 rounded-xl border border-blue-200 text-sm text-blue-800">
                <strong>💡 Giải thích: </strong>{q.explanation}
              </div>
            )}

            {selected !== null && (
              <div className="px-6 md:px-8 pb-8">
                <button onClick={handleNext}
                  className="w-full py-3 rounded-xl font-semibold text-white transition-opacity hover:opacity-90"
                  style={{ background: color }}>
                  {current + 1 < questions.length ? "Câu tiếp theo →" : "Xem kết quả 🏆"}
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
