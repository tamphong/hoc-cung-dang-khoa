"use client";

import { useState } from "react";

interface Exercise {
  problem: string;
  hint?: string;
  steps: string[];
  answer: string;
}

interface Props {
  exercise: Exercise;
  index: number;
  color: string;
}

export default function ExerciseCard({ exercise, index, color }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden">
      <div className="p-4 bg-slate-50">
        <div className="flex items-start gap-3">
          <span
            className="mt-0.5 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 text-white"
            style={{ background: color }}
          >
            {index}
          </span>
          <p className="text-sm text-slate-800 font-medium leading-relaxed">{exercise.problem}</p>
        </div>
        {exercise.hint && (
          <p className="mt-2 ml-9 text-xs text-slate-400 italic">💡 Gợi ý: {exercise.hint}</p>
        )}
      </div>

      <div className="px-4 py-3 border-t border-slate-100 flex items-center justify-between">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 text-sm font-semibold transition-colors"
          style={{ color }}
        >
          <span>{open ? "▲" : "▼"}</span>
          {open ? "Ẩn lời giải" : "Xem lời giải"}
        </button>
        <span className="text-xs text-slate-400">Đáp án: {exercise.answer}</span>
      </div>

      {open && (
        <div className="px-4 pb-4 space-y-1.5 border-t border-slate-100 pt-3" style={{ background: color + "06" }}>
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Hướng dẫn giải</div>
          {exercise.steps.map((step, i) => (
            <div key={i} className="flex items-start gap-2 text-sm text-slate-700">
              <span className="font-bold shrink-0" style={{ color }}>Bước {i + 1}.</span>
              <span>{step}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
