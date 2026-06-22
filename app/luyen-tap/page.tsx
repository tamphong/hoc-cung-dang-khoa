import Link from "next/link";
import Navbar from "@/components/NavbarServer";
import Footer from "@/components/Footer";
import { subjects } from "@/lib/subjects";

export default function LuyenTapPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 py-12 md:py-16">
        <div className="container-max">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-sm font-medium px-4 py-2 rounded-full mb-4">
              <span>🤖</span>
              <span>AI tạo câu hỏi tự động</span>
            </div>
            <h1
              className="text-3xl md:text-5xl font-bold text-slate-900 mb-4"
              style={{ fontFamily: "Lora, serif" }}
            >
              Chọn Môn
              <span className="brand-gradient-text"> Luyện Tập</span>
            </h1>
            <p className="text-slate-500 text-lg max-w-xl mx-auto">
              AI sẽ tạo 10 câu hỏi trắc nghiệm theo kiến thức lớp 9. Mỗi bài thi tích lũy điểm để nhận phần thưởng!
            </p>
          </div>

          {/* Subject cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {subjects.map((s) => (
              <Link
                key={s.id}
                href={`/luyen-tap/${s.id}`}
                className="group flex flex-col gap-4 p-6 rounded-2xl border-2 transition-all hover:shadow-xl hover:-translate-y-1 bg-white"
                style={{ borderColor: s.border }}
              >
                {/* Icon */}
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl"
                  style={{ background: s.color + "18" }}
                >
                  {s.emoji}
                </div>

                {/* Info */}
                <div>
                  <h2 className="font-bold text-slate-800 text-lg">{s.name}</h2>
                  <p className="text-slate-500 text-sm mt-1">{s.description}</p>
                </div>

                {/* Topics chips */}
                <div className="flex flex-wrap gap-1">
                  {s.topics.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="text-xs px-2 py-0.5 rounded-full font-medium"
                      style={{ background: s.color + "15", color: s.color }}
                    >
                      {t}
                    </span>
                  ))}
                  {s.topics.length > 3 && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">
                      +{s.topics.length - 3}
                    </span>
                  )}
                </div>

                {/* CTA */}
                <div
                  className="mt-auto flex items-center justify-between pt-3 border-t"
                  style={{ borderColor: s.border }}
                >
                  <span className="text-sm text-slate-500">10 câu hỏi</span>
                  <span
                    className="text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all"
                    style={{ color: s.color }}
                  >
                    Bắt đầu <span>→</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Info box */}
          <div className="mt-12 bg-gradient-to-r from-blue-50 to-violet-50 border border-blue-100 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6">
            <div className="text-5xl">💡</div>
            <div>
              <h3 className="font-bold text-slate-800 text-lg mb-2">Cách tính điểm</h3>
              <ul className="text-slate-600 text-sm space-y-1">
                <li>✅ Mỗi câu đúng = <strong>10 điểm</strong></li>
                <li>📊 Tối đa <strong>100 điểm</strong> mỗi bài thi (10 câu)</li>
                <li>🏆 Điểm tích lũy giúp bạn thăng cấp và nhận phần thưởng</li>
                <li>📈 Xem lịch sử thi tại trang <strong>Thành Tích</strong></li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
