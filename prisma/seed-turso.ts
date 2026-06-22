/**
 * Seed script for Turso (production).
 * Run: DATABASE_URL=libsql://... TURSO_AUTH_TOKEN=... npx tsx prisma/seed-turso.ts
 */
import { PrismaClient } from "../lib/generated/prisma/client";
import { PrismaLibSQL } from "@prisma/adapter-libsql";
import { createClient } from "@libsql/client";
import bcrypt from "bcryptjs";

const client = createClient({
  url: process.env.DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN,
});
const adapter = new PrismaLibSQL(client);
const prisma = new PrismaClient({ adapter } as never);

// Re-export same seed logic — import from seed.ts via a shared helper
// For simplicity, inline the critical seed data here

async function main() {
  console.log("🌱 Seeding Turso database...");

  const adminPassword = await bcrypt.hash("admin123", 10);
  await prisma.user.upsert({
    where: { email: "admin@dangkhoa.edu.vn" },
    update: {},
    create: { email: "admin@dangkhoa.edu.vn", name: "Admin Đăng Khoa", password: adminPassword, role: "admin" },
  });

  const studentPassword = await bcrypt.hash("student123", 10);
  await prisma.user.upsert({
    where: { email: "hocsinh@demo.vn" },
    update: {},
    create: { email: "hocsinh@demo.vn", name: "Nguyễn Văn An", password: studentPassword, role: "student" },
  });

  const SUBJECTS = [
    { id: "Toán", name: "Toán", emoji: "📐", color: "#2563eb", bg: "#eff6ff", border: "#bfdbfe", description: "Đại số, hình học, thống kê lớp 9", order: 1 },
    { id: "Ngữ_Văn", name: "Ngữ Văn", emoji: "📖", color: "#dc2626", bg: "#fef2f2", border: "#fecaca", description: "Văn học, tập làm văn, tiếng Việt", order: 2 },
    { id: "Tiếng_Anh", name: "Tiếng Anh", emoji: "🌍", color: "#7c3aed", bg: "#f5f3ff", border: "#ddd6fe", description: "Ngữ pháp, từ vựng, kỹ năng giao tiếp", order: 3 },
    { id: "Vật_Lý", name: "Vật Lý", emoji: "⚡", color: "#0891b2", bg: "#ecfeff", border: "#a5f3fc", description: "Điện học, quang học, cơ học", order: 4 },
    { id: "Hóa_Học", name: "Hóa Học", emoji: "🧪", color: "#d97706", bg: "#fffbeb", border: "#fed7aa", description: "Hóa hữu cơ, vô cơ, phản ứng hóa học", order: 5 },
    { id: "Sinh_Học", name: "Sinh Học", emoji: "🌱", color: "#16a34a", bg: "#f0fdf4", border: "#bbf7d0", description: "Di truyền học, sinh thái, tiến hóa", order: 6 },
    { id: "Lịch_Sử", name: "Lịch Sử", emoji: "🏛️", color: "#ea580c", bg: "#fff7ed", border: "#fed7aa", description: "Lịch sử Việt Nam và thế giới", order: 7 },
    { id: "Địa_Lý", name: "Địa Lý", emoji: "🗺️", color: "#0d9488", bg: "#f0fdfa", border: "#99f6e4", description: "Địa lý tự nhiên và kinh tế-xã hội", order: 8 },
  ];

  for (const s of SUBJECTS) {
    await prisma.subject.upsert({ where: { id: s.id }, update: s, create: s });
  }

  const DEFAULT_REWARDS = [
    { name: "Người Mới Bắt Đầu", emoji: "🌱", description: "Hoàn thành bài thi đầu tiên", color: "#6b7280", conditionType: "total_score", conditionValue: 1, pointBonus: 0 },
    { name: "Học Sinh Chăm Chỉ",  emoji: "📚", description: "Đạt 100 điểm tổng", color: "#2563eb", conditionType: "total_score", conditionValue: 100, pointBonus: 20 },
    { name: "Người Giỏi",          emoji: "⭐", description: "Đạt 300 điểm tổng", color: "#7c3aed", conditionType: "total_score", conditionValue: 300, pointBonus: 50 },
    { name: "Học Sinh Xuất Sắc",   emoji: "🏆", description: "Đạt 600 điểm tổng", color: "#d97706", conditionType: "total_score", conditionValue: 600, pointBonus: 100 },
    { name: "Thiên Tài",           emoji: "🌟", description: "Đạt 1000 điểm tổng", color: "#dc2626", conditionType: "total_score", conditionValue: 1000, pointBonus: 200 },
    { name: "Thám Hiểm Level 10",  emoji: "🎯", description: "Đạt level 10 bất kỳ môn", color: "#0891b2", conditionType: "subject_level", conditionValue: 10, pointBonus: 30 },
    { name: "Chinh Phục Level 50", emoji: "🚀", description: "Đạt level 50 bất kỳ môn", color: "#ea580c", conditionType: "subject_level", conditionValue: 50, pointBonus: 100 },
    { name: "Bậc Thầy Level 100",  emoji: "👑", description: "Đạt level 100 bất kỳ môn", color: "#7c3aed", conditionType: "subject_level", conditionValue: 100, pointBonus: 500 },
  ];

  await prisma.reward.deleteMany({});
  await prisma.reward.createMany({ data: DEFAULT_REWARDS });

  console.log("✅ Turso seed complete!");
  console.log("   Admin: admin@dangkhoa.edu.vn / admin123");
  console.log("   Demo:  hocsinh@demo.vn / student123");
  console.log("");
  console.log("⚠️  Note: Add questions via Admin panel at /admin/questions");
}

main().catch(console.error).finally(() => prisma.$disconnect());
