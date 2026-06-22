import Link from "next/link";
import Navbar from "@/components/NavbarServer";
import Footer from "@/components/Footer";
import { subjects } from "@/lib/subjects";

export default function HomePage() {
  const features = [
    {
      icon: "🤖",
      title: "AI Tạo Câu Hỏi",
      desc: "Hệ thống AI tự động tạo ra hàng trăm câu hỏi trắc nghiệm đa dạng cho từng môn học.",
    },
    {
      icon: "📊",
      title: "Theo Dõi Tiến Độ",
      desc: "Lưu điểm sau mỗi lần thi và xem biểu đồ tiến bộ theo thời gian.",
    },
    {
      icon: "🏆",
      title: "Phần Thưởng Hấp Dẫn",
      desc: "Điểm càng cao, phần thưởng càng đặc biệt. Chinh phục danh hiệu Thiên Tài!",
    },
    {
      icon: "⚡",
      title: "Nhanh & Tiện Lợi",
      desc: "Luyện tập mọi lúc, mọi nơi. Giao diện thân thiện, dễ sử dụng.",
    },
  ];

  const rewards = [
    { emoji: "🌱", title: "Người Mới Bắt Đầu", score: "0 điểm", color: "#6b7280" },
    { emoji: "📚", title: "Học Sinh Chăm Chỉ",  score: "100 điểm", color: "#2563eb" },
    { emoji: "⭐", title: "Người Giỏi",          score: "300 điểm", color: "#7c3aed" },
    { emoji: "🏆", title: "Học Sinh Xuất Sắc",   score: "600 điểm", color: "#d97706" },
    { emoji: "🌟", title: "Thiên Tài",           score: "1000 điểm", color: "#dc2626" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden brand-gradient py-20 md:py-28">
        {/* Decorative blobs */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-10 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>
        <div className="container-max relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur text-white text-sm font-medium px-4 py-2 rounded-full mb-6">
            <span>🎓</span>
            <span>Ôn tập lớp 9 cùng AI</span>
          </div>
          <h1
            className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight animate-fade-in-up"
            style={{ fontFamily: "Lora, serif" }}
          >
            Học cùng
            <br />
            <span className="text-yellow-300">Đăng Khoa</span>
          </h1>
          <p className="text-blue-100 text-lg md:text-xl max-w-2xl mx-auto mb-10 animate-fade-in-up delay-100">
            Luyện trắc nghiệm thông minh với AI, theo dõi điểm số và nhận phần thưởng hấp dẫn.
            Chinh phục kỳ thi lớp 9 dễ dàng hơn bao giờ hết!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-200">
            <Link
              href="/luyen-tap"
              className="inline-flex items-center justify-center gap-2 bg-white text-blue-700 font-bold px-8 py-4 rounded-2xl text-lg hover:bg-blue-50 transition-colors shadow-lg"
            >
              🚀 Luyện tập ngay
            </Link>
            <Link
              href="/thanh-tich"
              className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur text-white font-semibold px-8 py-4 rounded-2xl text-lg border border-white/30 hover:bg-white/20 transition-colors"
            >
              🏆 Xem thành tích
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-14 grid grid-cols-3 gap-6 max-w-lg mx-auto">
            {[
              { n: "8", label: "Môn học" },
              { n: "∞", label: "Câu hỏi AI" },
              { n: "5", label: "Cấp độ thưởng" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl font-bold text-white">{s.n}</div>
                <div className="text-blue-200 text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subjects grid */}
      <section className="py-16 md:py-20">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold text-slate-900 mb-3"
              style={{ fontFamily: "Lora, serif" }}
            >
              8 Môn Học
              <span className="brand-gradient-text"> Lớp 9</span>
            </h2>
            <p className="text-slate-500 text-lg">Chọn môn học để bắt đầu luyện tập ngay</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {subjects.map((s) => (
              <Link
                key={s.id}
                href={`/luyen-tap/${s.id}`}
                className="group relative flex flex-col items-center gap-3 p-6 rounded-2xl border-2 transition-all hover:shadow-lg hover:-translate-y-1"
                style={{
                  background: s.bg,
                  borderColor: s.border,
                }}
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-sm"
                  style={{ background: s.color + "20" }}
                >
                  {s.emoji}
                </div>
                <div className="text-center">
                  <div className="font-bold text-slate-800">{s.name}</div>
                  <div className="text-xs text-slate-500 mt-1">{s.topics.length} chủ đề</div>
                </div>
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-semibold text-sm"
                  style={{ background: s.color + "cc" }}
                >
                  Luyện tập →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold text-slate-900 mb-3"
              style={{ fontFamily: "Lora, serif" }}
            >
              Tại Sao Chọn
              <span className="brand-gradient-text"> Đăng Khoa?</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <div key={f.title} className="p-6 rounded-2xl border border-slate-100 hover:border-blue-200 hover:shadow-md transition-all">
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="font-bold text-slate-800 mb-2">{f.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reward system */}
      <section className="py-16 md:py-20 bg-slate-50">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold text-slate-900 mb-3"
              style={{ fontFamily: "Lora, serif" }}
            >
              Hệ Thống
              <span className="brand-gradient-text"> Phần Thưởng</span>
            </h2>
            <p className="text-slate-500 text-lg">Tích lũy điểm và thăng cấp bậc</p>
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-4 flex-wrap">
            {rewards.map((r, i) => (
              <div
                key={r.title}
                className="flex flex-col items-center gap-3 bg-white rounded-2xl p-6 border-2 shadow-sm w-full sm:w-40"
                style={{ borderColor: r.color + "44" }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-2xl"
                  style={{ background: r.color + "20" }}
                >
                  {r.emoji}
                </div>
                <div className="text-center">
                  <div className="font-bold text-xs text-slate-800">{r.title}</div>
                  <div className="text-xs mt-1 font-semibold" style={{ color: r.color }}>
                    {r.score}
                  </div>
                </div>
                {i < rewards.length - 1 && (
                  <div className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 text-slate-300 text-xl">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="py-16 brand-gradient">
        <div className="container-max text-center">
          <h2
            className="text-3xl md:text-4xl font-bold text-white mb-4"
            style={{ fontFamily: "Lora, serif" }}
          >
            Sẵn sàng chinh phục lớp 9?
          </h2>
          <p className="text-blue-100 text-lg mb-8">
            Bắt đầu luyện tập ngay hôm nay, hoàn toàn miễn phí!
          </p>
          <Link
            href="/luyen-tap"
            className="inline-flex items-center gap-2 bg-white text-blue-700 font-bold px-10 py-4 rounded-2xl text-lg hover:bg-blue-50 transition-colors shadow-lg"
          >
            🚀 Bắt đầu ngay
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
