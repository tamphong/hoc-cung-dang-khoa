"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/NavbarServer";
import Footer from "@/components/Footer";
import {
  getResults,
  getTotalScore,
  getCurrentReward,
  getNextReward,
  REWARDS,
  type QuizResult,
} from "@/lib/scores";

export default function ThanhTichPage() {
  const [results, setResults] = useState<QuizResult[]>([]);
  const [totalScore, setTotalScore] = useState(0);

  useEffect(() => {
    setResults(getResults());
    setTotalScore(getTotalScore());
  }, []);

  const reward = getCurrentReward(totalScore);
  const nextReward = getNextReward(totalScore);
  const progress = nextReward
    ? Math.min(((totalScore - reward.minScore) / (nextReward.minScore - reward.minScore)) * 100, 100)
    : 100;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 py-12 md:py-16">
        <div className="container-max max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <h1
              className="text-3xl md:text-5xl font-bold text-slate-900 mb-3"
              style={{ fontFamily: "Lora, serif" }}
            >
              Thành Tích
              <span className="brand-gradient-text"> Của Tôi</span>
            </h1>
            <p className="text-slate-500 text-lg">Theo dõi tiến độ và phần thưởng của bạn</p>
          </div>

          {/* Current reward card */}
          <div className="brand-gradient rounded-3xl p-6 md:p-8 text-white mb-8">
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center text-5xl shrink-0">
                {reward.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-blue-100 text-sm mb-1">Danh hiệu hiện tại</div>
                <div className="text-2xl font-bold">{reward.title}</div>
                <div className="text-blue-100 text-sm mt-1">{reward.description}</div>
              </div>
              <div className="text-right shrink-0">
                <div className="text-3xl font-bold">{totalScore}</div>
                <div className="text-blue-200 text-sm">tổng điểm</div>
              </div>
            </div>

            {/* Next reward progress */}
            {nextReward && (
              <div className="mt-6">
                <div className="flex justify-between text-sm text-blue-100 mb-2">
                  <span>Tiến tới: {nextReward.emoji} {nextReward.title}</span>
                  <span>{nextReward.minScore - totalScore} điểm nữa</span>
                </div>
                <div className="bg-white/20 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="h-full bg-white rounded-full transition-all duration-700"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}
            {!nextReward && (
              <div className="mt-4 text-center text-blue-100 text-sm">
                🎉 Bạn đã đạt danh hiệu cao nhất!
              </div>
            )}
          </div>

          {/* All reward levels */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-8">
            <h2 className="font-bold text-slate-800 text-lg mb-4">Tất cả cấp độ</h2>
            <div className="space-y-3">
              {REWARDS.map((r) => {
                const unlocked = totalScore >= r.minScore;
                return (
                  <div
                    key={r.level}
                    className={`flex items-center gap-4 p-3 rounded-xl border-2 transition-all ${
                      unlocked ? "opacity-100" : "opacity-40"
                    }`}
                    style={{ borderColor: unlocked ? r.color + "40" : "#e2e8f0", background: unlocked ? r.color + "08" : "transparent" }}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
                      style={{ background: r.color + "20" }}
                    >
                      {r.emoji}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-slate-800 text-sm">{r.title}</div>
                      <div className="text-xs text-slate-500">Từ {r.minScore} điểm</div>
                    </div>
                    {unlocked ? (
                      <span className="text-xs font-semibold px-2 py-1 rounded-full" style={{ background: r.color + "20", color: r.color }}>
                        Đạt được ✓
                      </span>
                    ) : (
                      <span className="text-xs text-slate-400">Chưa đạt</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* History */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-slate-800 text-lg">Lịch sử thi</h2>
              <span className="text-sm text-slate-500">{results.length} lần</span>
            </div>

            {results.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-5xl mb-4">📋</div>
                <p className="text-slate-500 mb-5">Bạn chưa làm bài thi nào</p>
                <Link
                  href="/luyen-tap"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white brand-gradient hover:opacity-90"
                >
                  🚀 Bắt đầu luyện tập
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {results.map((r, i) => {
                  const pct = Math.round((r.score / r.total) * 100);
                  const date = new Date(r.date).toLocaleDateString("vi-VN", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  });
                  return (
                    <div key={i} className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-slate-800 text-sm">{r.subjectName}</div>
                        <div className="text-xs text-slate-400 mt-0.5">{date}</div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="font-bold text-slate-800">{r.score}/{r.total}</div>
                        <div
                          className={`text-xs font-medium ${
                            pct >= 70 ? "text-green-600" : pct >= 50 ? "text-amber-600" : "text-red-500"
                          }`}
                        >
                          {pct}%
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex gap-4 mt-8 justify-center">
            <Link
              href="/luyen-tap"
              className="px-8 py-3 rounded-xl font-semibold text-white brand-gradient hover:opacity-90"
            >
              🚀 Luyện tập thêm
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
