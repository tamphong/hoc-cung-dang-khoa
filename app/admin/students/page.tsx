"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Student {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  totalScore: number;
  sessionsCount: number;
  rewardsCount: number;
}

const EMPTY_FORM = { name: "", email: "", password: "" };

export default function AdminStudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({ ...EMPTY_FORM });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function load() {
    const res = await fetch("/api/admin/students");
    if (res.ok) setStudents(await res.json());
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  function startCreate() {
    setForm({ ...EMPTY_FORM });
    setEditId(null);
    setError("");
    setShowForm(true);
  }

  function startEdit(s: Student) {
    setForm({ name: s.name, email: s.email, password: "" });
    setEditId(s.id);
    setError("");
    setShowForm(true);
  }

  async function handleSave() {
    if (!form.name.trim() || !form.email.trim()) { setError("Vui lòng nhập đủ họ tên và email"); return; }
    if (!editId && !form.password.trim()) { setError("Vui lòng nhập mật khẩu"); return; }
    setSaving(true);
    setError("");
    const method = editId ? "PUT" : "POST";
    const body = editId ? { id: editId, ...form } : form;
    const res = await fetch("/api/admin/students", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    setSaving(false);
    if (!res.ok) { setError(data.error || "Có lỗi xảy ra"); return; }
    setShowForm(false);
    load();
  }

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Xóa học sinh "${name}"? Toàn bộ dữ liệu sẽ bị xóa.`)) return;
    await fetch("/api/admin/students", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    load();
  }

  const filtered = students.filter(
    (s) => s.name.toLowerCase().includes(search.toLowerCase()) || s.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="bg-slate-900 text-white px-6 py-4 flex items-center gap-4">
        <Link href="/admin" className="text-slate-400 hover:text-white text-sm">← Admin</Link>
        <span className="font-bold">👥 Quản lý Học sinh</span>
      </nav>

      <div className="container-max py-8">
        <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
          <h1 className="text-2xl font-bold text-slate-800">Danh sách học sinh ({filtered.length})</h1>
          <div className="flex gap-3 items-center">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm theo tên hoặc email..."
              className="px-4 py-2 rounded-xl border border-slate-200 text-sm w-56 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={startCreate}
              className="px-5 py-2 rounded-xl text-white font-semibold brand-gradient hover:opacity-90 text-sm"
            >
              + Thêm học sinh
            </button>
          </div>
        </div>

        {/* Modal form */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
              <h2 className="font-bold text-lg mb-4">{editId ? "Sửa học sinh" : "Thêm học sinh mới"}</h2>
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-medium text-slate-600">Họ và tên *</label>
                  <input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Nguyễn Văn A"
                    className="w-full mt-1 px-3 py-2 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-600">Email *</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="hocsinh@email.com"
                    className="w-full mt-1 px-3 py-2 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-600">
                    Mật khẩu {editId ? "(để trống nếu không đổi)" : "*"}
                  </label>
                  <input
                    type="password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    placeholder={editId ? "Nhập để đổi mật khẩu" : "Tối thiểu 6 ký tự"}
                    className="w-full mt-1 px-3 py-2 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                {error && <p className="text-red-500 text-xs bg-red-50 px-3 py-2 rounded-lg">{error}</p>}
              </div>
              <div className="flex gap-3 mt-5">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex-1 py-2 rounded-xl font-semibold text-white brand-gradient disabled:opacity-60"
                >
                  {saving ? "Đang lưu..." : editId ? "Lưu thay đổi" : "Thêm học sinh"}
                </button>
                <button
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 bg-slate-100 hover:bg-slate-200"
                >
                  Hủy
                </button>
              </div>
            </div>
          </div>
        )}

        {loading ? (
          <div className="text-center py-12 text-slate-400">Đang tải...</div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  {["Học sinh", "Email", "Tổng điểm", "Bài thi", "Thành tích", "Ngày tham gia", ""].map((h) => (
                    <th key={h} className="px-4 py-3 text-left font-semibold text-slate-600">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((s) => (
                  <tr key={s.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="px-4 py-3 font-medium text-slate-800">{s.name}</td>
                    <td className="px-4 py-3 text-slate-500">{s.email}</td>
                    <td className="px-4 py-3 font-bold text-blue-600">{s.totalScore}</td>
                    <td className="px-4 py-3 text-slate-600">{s.sessionsCount}</td>
                    <td className="px-4 py-3 text-slate-600">{s.rewardsCount} 🏆</td>
                    <td className="px-4 py-3 text-slate-400 text-xs">
                      {new Date(s.createdAt).toLocaleDateString("vi-VN")}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => startEdit(s)}
                          className="text-blue-500 hover:text-blue-700 text-xs px-2 py-1 rounded hover:bg-blue-50"
                        >
                          Sửa
                        </button>
                        <button
                          onClick={() => handleDelete(s.id, s.name)}
                          className="text-red-500 hover:text-red-700 text-xs px-2 py-1 rounded hover:bg-red-50"
                        >
                          Xóa
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-4 py-12 text-center text-slate-400">
                      {search ? "Không tìm thấy học sinh" : "Chưa có học sinh nào"}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
