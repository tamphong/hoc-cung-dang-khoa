"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Question {
  id: string;
  subjectId: string;
  level: number;
  question: string;
  optionA: string; optionB: string; optionC: string; optionD: string;
  correct: number;
  explanation: string;
  isActive: boolean;
  subject: { name: string; emoji: string; color: string };
}

interface Subject { id: string; name: string; emoji: string; color: string; }

const LABELS = ["A", "B", "C", "D"];
const EMPTY = {
  subjectId: "", level: 1, question: "", optionA: "", optionB: "", optionC: "", optionD: "",
  correct: 0, explanation: "", isActive: true,
};

export default function AdminQuestionsPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [filterSubject, setFilterSubject] = useState("");
  const [form, setForm] = useState({ ...EMPTY });
  const [editId, setEditId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);

  async function loadSubjects() {
    const res = await fetch("/api/admin/students");
    // reuse subjects from questions
  }

  async function load(subjectId = filterSubject) {
    const url = subjectId ? `/api/admin/questions?subjectId=${subjectId}` : "/api/admin/questions";
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      setQuestions(data);
      // extract subjects
      const sMap: Record<string, Subject> = {};
      data.forEach((q: Question) => { sMap[q.subjectId] = q.subject as Subject & { id: string }; });
      setSubjects(Object.entries(sMap).map(([id, s]) => ({ ...s, id })));
    }
  }

  useEffect(() => { load(); }, []);

  function startCreate() {
    setForm({ ...EMPTY, subjectId: subjects[0]?.id || "" });
    setEditId(null);
    setShowForm(true);
  }

  function startEdit(q: Question) {
    setForm({
      subjectId: q.subjectId, level: q.level, question: q.question,
      optionA: q.optionA, optionB: q.optionB, optionC: q.optionC, optionD: q.optionD,
      correct: q.correct, explanation: q.explanation, isActive: q.isActive,
    });
    setEditId(q.id);
    setShowForm(true);
  }

  async function handleSave() {
    setSaving(true);
    const method = editId ? "PUT" : "POST";
    const body = editId ? { id: editId, ...form } : form;
    await fetch("/api/admin/questions", { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    setSaving(false);
    setShowForm(false);
    load();
  }

  async function handleDelete(id: string) {
    if (!confirm("Xóa câu hỏi này?")) return;
    await fetch("/api/admin/questions", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    load();
  }

  const filtered = filterSubject ? questions.filter((q) => q.subjectId === filterSubject) : questions;

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="bg-slate-900 text-white px-6 py-4 flex items-center gap-4">
        <Link href="/admin" className="text-slate-400 hover:text-white">← Admin</Link>
        <span className="font-bold">❓ Quản lý Câu hỏi</span>
      </nav>

      <div className="container-max py-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <h1 className="text-2xl font-bold text-slate-800">Ngân hàng câu hỏi ({filtered.length})</h1>
          <div className="flex gap-3 items-center">
            <select value={filterSubject}
              onChange={(e) => { setFilterSubject(e.target.value); load(e.target.value); }}
              className="px-3 py-2 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Tất cả môn</option>
              {subjects.map((s) => <option key={s.id} value={s.id}>{s.emoji} {s.name}</option>)}
            </select>
            <button onClick={startCreate}
              className="px-5 py-2 rounded-xl text-white font-semibold brand-gradient hover:opacity-90">
              + Thêm câu hỏi
            </button>
          </div>
        </div>

        {/* Form modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-xl my-4">
              <h2 className="font-bold text-lg mb-4">{editId ? "Sửa" : "Thêm"} câu hỏi</h2>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-slate-600">Môn học</label>
                    <select value={form.subjectId} onChange={(e) => setForm({ ...form, subjectId: e.target.value })}
                      className="w-full px-3 py-2 border rounded-xl text-sm">
                      {subjects.map((s) => <option key={s.id} value={s.id}>{s.emoji} {s.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-600">Level (1-100)</label>
                    <input type="number" min={1} max={100} value={form.level}
                      onChange={(e) => setForm({ ...form, level: +e.target.value })}
                      className="w-full px-3 py-2 border rounded-xl text-sm" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-600">Câu hỏi</label>
                  <textarea value={form.question} onChange={(e) => setForm({ ...form, question: e.target.value })}
                    rows={2} className="w-full px-3 py-2 border rounded-xl text-sm" />
                </div>
                {(["A", "B", "C", "D"] as const).map((opt) => (
                  <div key={opt}>
                    <label className="text-xs font-medium text-slate-600">Đáp án {opt}</label>
                    <input value={form[`option${opt}` as keyof typeof form] as string}
                      onChange={(e) => setForm({ ...form, [`option${opt}`]: e.target.value })}
                      className="w-full px-3 py-2 border rounded-xl text-sm" />
                  </div>
                ))}
                <div>
                  <label className="text-xs font-medium text-slate-600">Đáp án đúng</label>
                  <select value={form.correct} onChange={(e) => setForm({ ...form, correct: +e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl text-sm">
                    {LABELS.map((l, i) => <option key={i} value={i}>Đáp án {l}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-600">Giải thích</label>
                  <textarea value={form.explanation} onChange={(e) => setForm({ ...form, explanation: e.target.value })}
                    rows={2} className="w-full px-3 py-2 border rounded-xl text-sm" />
                </div>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={form.isActive}
                    onChange={(e) => setForm({ ...form, isActive: e.target.checked })} />
                  Kích hoạt
                </label>
              </div>
              <div className="flex gap-3 mt-5">
                <button onClick={handleSave} disabled={saving}
                  className="flex-1 py-2 rounded-xl font-semibold text-white brand-gradient disabled:opacity-60">
                  {saving ? "Đang lưu..." : "Lưu câu hỏi"}
                </button>
                <button onClick={() => setShowForm(false)} className="px-4 py-2 rounded-xl text-slate-600 bg-slate-100">Hủy</button>
              </div>
            </div>
          </div>
        )}

        {/* Questions table */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                {["Môn", "Level", "Câu hỏi", "Đáp án đúng", "Trạng thái", ""].map((h) => (
                  <th key={h} className="px-4 py-3 text-left font-semibold text-slate-600">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((q) => (
                <tr key={q.id} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <span className="text-base mr-1">{q.subject.emoji}</span>
                    <span className="text-slate-600">{q.subject.name}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-bold text-blue-600">L{q.level}</span>
                  </td>
                  <td className="px-4 py-3 max-w-xs truncate text-slate-700">{q.question}</td>
                  <td className="px-4 py-3">
                    <span className="font-bold" style={{ color: q.subject.color }}>
                      {LABELS[q.correct]}
                    </span>
                    <span className="text-slate-400 text-xs ml-1 truncate">
                      {[q.optionA, q.optionB, q.optionC, q.optionD][q.correct]?.substring(0, 20)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${q.isActive ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"}`}>
                      {q.isActive ? "Hoạt động" : "Tắt"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button onClick={() => startEdit(q)} className="text-blue-500 hover:text-blue-700 text-xs px-2 py-1 rounded hover:bg-blue-50">Sửa</button>
                      <button onClick={() => handleDelete(q.id)} className="text-red-500 hover:text-red-700 text-xs px-2 py-1 rounded hover:bg-red-50">Xóa</button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={6} className="px-4 py-12 text-center text-slate-400">Chưa có câu hỏi nào</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
