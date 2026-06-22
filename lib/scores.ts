"use client";

export interface QuizResult {
  subject: string;
  subjectName: string;
  score: number;
  total: number;
  date: string;
}

export interface Reward {
  level: number;
  title: string;
  emoji: string;
  color: string;
  minScore: number;
  description: string;
}

export const REWARDS: Reward[] = [
  { level: 0, title: "Người Mới Bắt Đầu", emoji: "🌱", color: "#6b7280", minScore: 0,    description: "Hãy làm bài để nhận phần thưởng!" },
  { level: 1, title: "Học Sinh Chăm Chỉ",  emoji: "📚", color: "#2563eb", minScore: 100,  description: "Bạn đang trên đà tiến bộ tốt!" },
  { level: 2, title: "Người Giỏi",          emoji: "⭐", color: "#7c3aed", minScore: 300,  description: "Kiến thức vững vàng, tiếp tục nào!" },
  { level: 3, title: "Học Sinh Xuất Sắc",   emoji: "🏆", color: "#d97706", minScore: 600,  description: "Thành tích ấn tượng, bạn rất giỏi!" },
  { level: 4, title: "Thiên Tài",           emoji: "🌟", color: "#dc2626", minScore: 1000, description: "Đỉnh cao thành tích! Bạn thật xuất sắc!" },
];

const STORAGE_KEY = "hcdk_quiz_results";
const TOTAL_SCORE_KEY = "hcdk_total_score";

export function saveResult(result: QuizResult): void {
  if (typeof window === "undefined") return;
  const existing = getResults();
  existing.unshift(result);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(existing.slice(0, 50)));

  const prev = getTotalScore();
  localStorage.setItem(TOTAL_SCORE_KEY, String(prev + result.score));
}

export function getResults(): QuizResult[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

export function getTotalScore(): number {
  if (typeof window === "undefined") return 0;
  return parseInt(localStorage.getItem(TOTAL_SCORE_KEY) || "0", 10);
}

export function getCurrentReward(totalScore: number): Reward {
  let reward = REWARDS[0];
  for (const r of REWARDS) {
    if (totalScore >= r.minScore) reward = r;
  }
  return reward;
}

export function getNextReward(totalScore: number): Reward | null {
  for (let i = REWARDS.length - 1; i >= 0; i--) {
    if (REWARDS[i].minScore > totalScore) {
      // find the one just above current
    }
  }
  for (const r of REWARDS) {
    if (r.minScore > totalScore) return r;
  }
  return null;
}
