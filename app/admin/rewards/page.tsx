"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Reward {
  id: string;
  name: string;
  emoji: string;
  description: string;
  color: string;
  conditionType: string;
  conditionValue: number;
  pointBonus: number;
  isActive: boolean;
  _count: { userRewards: number };
}

const CONDITION_TYPES = [
  { value: "total_score", label: "Tổng điểm" },
  { value: "subject_level", label: "Level môn học" },
  { value: "subject_score", label: "Điểm môn học" },
];

const EMPTY: Omit<Reward, "id" | "_count"> = {
  name: "", emoji: "🏆", description: "", color: "#2563eb",
  conditionType: "total_score", conditionValue: 100, pointBonus: 0, isActive: true,
};

export default function AdminRewardsPage() {
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [form, setForm] = useState({ ...EMPTY });
  const [editId, setEditId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);

  async function load() {
    const res = await fetch("/api/admin/rewards");
    if (res.ok) setRewards(await res.json());
  }
  useEffect(() => { load(); }, []);

  function startEdit(r: Reward) {
    setForm({ name: r.name, emoji: r.emoji, description: r.description, color: r.color,
      conditionType: r.conditionType, conditionValue: r.conditionValue, pointBonus: r.pointBonus, isActive: r.isActive });
    setEditId(r.id);
    setShowForm(true);
  }

  function startCreate() {
    setForm({ ...EMPTY });
    setEditId(null);
    setShowForm(true);
  }

  async function handleSave() {
    setSaving(true);
    const method = editId ? "PUT" : "POST";
    const body = editId ? { id: editId, ...form } : form;
    await fetch("/api/admin/rewards", { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    setSaving(false);
    setShowForm(false);
    load();
  }

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Xóa phần thưởng "${name}"?`)) return;
    await fetch("/api/admin/rewards", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    load();
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="bg-slate-900 text-white px-6 py-4 flex items-center gap-4">
        <Link href="/admin" className="text-slate-400 hover:text-white">← Admin</Link>
        <span className="font-bold">🏆 Quản lý Phần thưởng</span>
      </nav>

      <div className="container-max py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-slate-800">Phần thưởng ({rewards.length})</h1>
          <button onClick={startCreate}
            className="px-5 py-2 rounded-xl text-white font-semibold brand-gradient hover:opacity-90">
            + Thêm phần thưởng
          </button>
        </div>

        {/* Form modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-xl">
              <h2 className="font-bold text-lg mb-4">{editId ? "Sửa" : "Thêm"} phần thưởng</h2>
              <div className="space-y-3">
                <div className="grid grid-cols-5 gap-2">
                  <div className="col-span-1">
                    <label className="text-xs font-medium text-slate-600">Emoji</label>
                    <input value={form.emoji} onChange={(e) => setForm({ ...form, emoji: e.target.value })}
                      className="w-full px-3 py-2 border rounded-xl text-center text-xl" />
                  </div>
                  <div className="col-span-4">
                    <label className="text-xs font-medium text-slate-600">Tên phần thưởng</label>
                    <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-3 py-2 border rounded-xl text-sm" placeholder="Thiên Tài" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-600">Mô tả</label>
                  <input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl text-sm" placeholder="Đạt 1000 điểm tổng" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-slate-600">Điều kiện</label>
                    <select value={form.conditionType} onChange={(e) => setForm({ ...form, conditionType: e.target.value })}
                      className="w-full px-3 py-2 border rounded-xl text-sm">
                      {CONDITION_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-600">Giá trị</label>
                    <input type="number" value={form.conditionValue}
                      onChange={(e) => setForm({ ...form, conditionValue: +e.target.value })}
                      className="w-full px-3 py-2 border rounded-xl text-sm" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-slate-600">Điểm thưởng thêm</label>
                    <input type="number" value={form.pointBonus}
                      onChange={(e) => setForm({ ...form, pointBonus: +e.target.value })}
                      className="w-full px-3 py-2 border rounded-xl text-sm" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-600">Màu</label>
                    <input type="color" value={form.color}
                      onChange={(e) => setForm({ ...form, color: e.target.value })}
                      className="w-full h-10 px-1 border rounded-xl" />
                  </div>
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
                  {saving ? "Đang lưu..." : "Lưu"}
                </button>
                <button onClick={() => setShowForm(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 bg-slate-100">
                  Hủy
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {rewards.map((r) => (
            <div key={r.id} className="bg-white rounded-2xl border-2 p-5" style={{ borderColor: r.color + "44" }}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                    style={{ background: r.color + "18" }}>
                    {r.emoji}
                  </div>
                  <div>
                    <div className="font-bold text-slate-800">{r.name}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{r.description}</div>
                  </div>
                </div>
                {!r.isActive && <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded">Tắt</span>}
              </div>
              <div className="text-xs text-slate-500 space-y-1 mb-3">
                <div>
                  <strong>Điều kiện:</strong>{" "}
                  {CONDITION_TYPES.find((t) => t.value === r.conditionType)?.label} ≥ {r.conditionValue}
                </div>
                <div><strong>Điểm thưởng:</strong> +{r.pointBonus}</div>
                <div><strong>Đã trao:</strong> {r._count.userRewards} học sinh</div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => startEdit(r)}
                  className="flex-1 py-1.5 rounded-lg text-xs font-semibold border border-blue-200 text-blue-600 hover:bg-blue-50">
                  Sửa
                </button>
                <button onClick={() => handleDelete(r.id, r.name)}
                  className="px-3 py-1.5 rounded-lg text-xs text-red-500 border border-red-200 hover:bg-red-50">
                  Xóa
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
