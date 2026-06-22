"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getSubject } from "@/lib/subjects";
import { saveResult } from "@/lib/scores";
import { getRandomQuestions } from "@/lib/question-bank";
import type { Question } from "@/lib/question-bank";

type Phase = "loading" | "quiz" | "result" | "error";

export default function QuizPage() {
  const { subject: subjectId } = useParams<{ subject: string }>();
  const router = useRouter();
  const subject = getSubject(subjectId);

  const [phase, setPhase] = useState<Phase>("loading");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [showExpl, setShowExpl] = useState(false);
  const [score, setScore] = useState(0);
  const [error, setError] = useState("");

  const loadQuestions = useCallback(() => {
    if (!subject) return;
    setPhase("loading");
    // Small delay to show loading animation
    setTimeout(() => {
      const qs = getRandomQuestions(subject.id, 10);
      if (!qs.length) {
        setError("Không tìm thấy câu hỏi cho môn này.");
        setPhase("error");
        return;
      }
      setQuestions(qs);
      setAnswers(new Array(qs.length).fill(null));
      setCurrent(0);
      setSelected(null);
      setShowExpl(false);
      setScore(0);
      setPhase("quiz");
    }, 800);
  }, [subject]);

  useEffect(() => {
    if (!subject) { router.push("/luyen-tap"); return; }
    loadQuestions();
  }, [subject, loadQuestions, router]);

  function handleSelect(idx: number) {
    if (selected !== null) return;
    setSelected(idx);
    setShowExpl(true);
    const newAnswers = [...answers];
    newAnswers[current] = idx;
    setAnswers(newAnswers);
  }

  function handleNext() {
    if (selected === questions[current]?.correct) {
      setScore((s) => s + 10);
    }
    if (current + 1 >= questions.length) {
      // calc final score
      const finalScore = (answers as (number | null)[]).reduce((acc: number, ans, i) => {
        const q = questions[i];
        if (ans === null || q === undefined) return acc;
        return acc + (ans === q.correct ? 10 : 0);
      }, 0) + (selected === questions[current]?.correct ? 10 : 0);

      saveResult({
        subject: subject!.id,
        subjectName: subject!.name,
        score: finalScore,
        total: questions.length * 10,
        date: new Date().toISOString(),
      });
      setScore(finalScore);
      setPhase("result");
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
      setShowExpl(false);
    }
  }

  if (!subject) return null;

  const LABELS = ["A", "B", "C", "D"];

  /* ─── LOADING ─── */
  if (phase === "loading") {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center text-5xl mx-auto mb-6 animate-float"
              style={{ background: subject.color + "20" }}
            >
              {subject.emoji}
            </div>
            <p className="text-slate-600 text-lg mb-2">AI đang tạo câu hỏi cho</p>
            <p className="font-bold text-2xl" style={{ color: subject.color }}>
              {subject.name}
            </p>
            <div className="flex gap-1 justify-center mt-6">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-2.5 h-2.5 rounded-full animate-bounce"
                  style={{ background: subject.color, animationDelay: `${i * 150}ms` }}
                />
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  /* ─── ERROR ─── */
  if (phase === "error") {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <div className="text-6xl mb-4">😢</div>
            <h2 className="text-2xl font-bold text-slate-800 mb-3">Có lỗi xảy ra</h2>
            <p className="text-slate-500 mb-6">{error}</p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={loadQuestions}
                className="px-6 py-3 rounded-xl font-semibold text-white brand-gradient hover:opacity-90"
              >
                Thử lại
              </button>
              <button
                onClick={() => router.push("/luyen-tap")}
                className="px-6 py-3 rounded-xl font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200"
              >
                Quay lại
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  /* ─── RESULT ─── */
  if (phase === "result") {
    const pct = Math.round((score / (questions.length * 10)) * 100);
    const correct = score / 10;

    let resultEmoji = "😊";
    let resultMsg = "Cố gắng hơn nhé!";
    if (pct >= 90) { resultEmoji = "🌟"; resultMsg = "Xuất sắc! Bạn thật tuyệt vời!"; }
    else if (pct >= 70) { resultEmoji = "🏆"; resultMsg = "Rất tốt! Tiếp tục phát huy!"; }
    else if (pct >= 50) { resultEmoji = "👍"; resultMsg = "Khá tốt! Ôn thêm nhé!"; }

    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 py-12">
          <div className="container-max max-w-lg mx-auto">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
              {/* Header */}
              <div className="brand-gradient p-8 text-center">
                <div className="text-6xl mb-3">{resultEmoji}</div>
                <h1 className="text-white text-2xl font-bold" style={{ fontFamily: "Lora, serif" }}>
                  Kết Quả Bài Thi
                </h1>
                <p className="text-blue-100 mt-1">{subject.name}</p>
              </div>

              {/* Score */}
              <div className="p-8 text-center">
                <div
                  className="text-7xl font-bold mb-2"
                  style={{ color: subject.color }}
                >
                  {score}
                </div>
                <div className="text-slate-500 mb-1">/ {questions.length * 10} điểm</div>
                <div className="text-slate-700 font-semibold text-lg">{resultMsg}</div>

                {/* Progress bar */}
                <div className="mt-6 bg-slate-100 rounded-full h-3 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${pct}%`, background: subject.color }}
                  />
                </div>
                <div className="text-sm text-slate-500 mt-2">
                  {correct}/{questions.length} câu đúng ({pct}%)
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mt-6">
                  {[
                    { label: "Câu đúng", value: correct, color: "#16a34a" },
                    { label: "Câu sai", value: questions.length - correct, color: "#dc2626" },
                    { label: "Điểm đạt", value: `${pct}%`, color: subject.color },
                  ].map((s) => (
                    <div key={s.label} className="bg-slate-50 rounded-xl p-3">
                      <div className="text-xl font-bold" style={{ color: s.color }}>{s.value}</div>
                      <div className="text-xs text-slate-500">{s.label}</div>
                    </div>
                  ))}
                </div>

                {/* Buttons */}
                <div className="flex flex-col gap-3 mt-8">
                  <button
                    onClick={loadQuestions}
                    className="w-full py-3 rounded-xl font-semibold text-white brand-gradient hover:opacity-90 transition-opacity"
                  >
                    🔄 Làm lại bài khác
                  </button>
                  <button
                    onClick={() => router.push("/luyen-tap")}
                    className="w-full py-3 rounded-xl font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
                  >
                    📚 Chọn môn khác
                  </button>
                  <button
                    onClick={() => router.push("/thanh-tich")}
                    className="w-full py-3 rounded-xl font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 transition-colors"
                  >
                    🏆 Xem thành tích
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  /* ─── QUIZ ─── */
  const q = questions[current];
  const progress = ((current) / questions.length) * 100;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 py-8 md:py-12">
        <div className="container-max max-w-2xl mx-auto">
          {/* Progress header */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{subject.emoji}</span>
                <span className="font-bold text-slate-700">{subject.name}</span>
              </div>
              <span className="text-sm text-slate-500">
                {current + 1} / {questions.length}
              </span>
            </div>
            {/* Progress bar */}
            <div className="bg-slate-200 rounded-full h-2 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{ width: `${progress}%`, background: subject.color }}
              />
            </div>
          </div>

          {/* Question card */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-lg overflow-hidden">
            {/* Question */}
            <div className="p-6 md:p-8 border-b border-slate-100" style={{ background: subject.color + "08" }}>
              <div
                className="inline-block text-xs font-bold px-3 py-1 rounded-full mb-4"
                style={{ background: subject.color + "20", color: subject.color }}
              >
                Câu {current + 1}
              </div>
              <p className="text-slate-800 text-lg font-medium leading-relaxed">{q.question}</p>
            </div>

            {/* Options */}
            <div className="p-6 md:p-8 space-y-3">
              {q.options.map((opt, i) => {
                let style = "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50";
                if (selected !== null) {
                  if (i === q.correct) style = "border-green-400 bg-green-50";
                  else if (i === selected && i !== q.correct) style = "border-red-400 bg-red-50";
                }
                return (
                  <button
                    key={i}
                    onClick={() => handleSelect(i)}
                    disabled={selected !== null}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all ${style} ${
                      selected === null ? "cursor-pointer" : "cursor-default"
                    }`}
                  >
                    <span
                      className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 transition-colors"
                      style={
                        selected !== null && i === q.correct
                          ? { background: "#16a34a", color: "white" }
                          : selected !== null && i === selected && i !== q.correct
                          ? { background: "#dc2626", color: "white" }
                          : { background: subject.color + "18", color: subject.color }
                      }
                    >
                      {LABELS[i]}
                    </span>
                    <span className="text-slate-700 text-sm leading-relaxed">{opt}</span>
                    {selected !== null && i === q.correct && (
                      <span className="ml-auto text-green-600">✓</span>
                    )}
                    {selected !== null && i === selected && i !== q.correct && (
                      <span className="ml-auto text-red-500">✗</span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation */}
            {showExpl && (
              <div className="mx-6 md:mx-8 mb-4 p-4 bg-blue-50 rounded-xl border border-blue-200">
                <p className="text-sm text-blue-800">
                  <strong>💡 Giải thích: </strong>
                  {q.explanation}
                </p>
              </div>
            )}

            {/* Next button */}
            {selected !== null && (
              <div className="px-6 md:px-8 pb-6 md:pb-8">
                <button
                  onClick={handleNext}
                  className="w-full py-3 rounded-xl font-semibold text-white transition-opacity hover:opacity-90"
                  style={{ background: subject.color }}
                >
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
