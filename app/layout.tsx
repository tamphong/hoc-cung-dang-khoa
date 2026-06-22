import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Học cùng Đăng Khoa – Ôn tập lớp 9",
  description: "Website ôn tập kiến thức lớp 9 với AI tạo câu hỏi tự động. Luyện trắc nghiệm, tích lũy điểm và nhận phần thưởng!",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Lora:wght@600;700&family=Be+Vietnam+Pro:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
