import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-20">
      <div className="container-max py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">📚</span>
              <span className="text-white font-bold text-lg" style={{ fontFamily: "Lora, serif" }}>
                Học cùng Đăng Khoa
              </span>
            </div>
            <p className="text-sm leading-relaxed text-slate-400">
              Website ôn tập kiến thức lớp 9 miễn phí, sử dụng AI để tạo câu hỏi phong phú và đa dạng.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-3">Môn học</h4>
            <ul className="space-y-2 text-sm">
              {["Toán", "Ngữ Văn", "Tiếng Anh", "Vật Lý", "Hóa Học", "Sinh Học"].map((s) => (
                <li key={s}>
                  <Link href="/luyen-tap" className="hover:text-white transition-colors">
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Actions */}
          <div>
            <h4 className="text-white font-semibold mb-3">Khám phá</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-white transition-colors">Trang chủ</Link></li>
              <li><Link href="/luyen-tap" className="hover:text-white transition-colors">Luyện tập ngay</Link></li>
              <li><Link href="/thanh-tich" className="hover:text-white transition-colors">Thành tích của tôi</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-10 pt-6 text-center text-sm text-slate-500">
          © 2024 Học cùng Đăng Khoa. Được tạo với ❤️ bởi AI.
        </div>
      </div>
    </footer>
  );
}
