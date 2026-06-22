import { createClient } from "@libsql/client";
import bcrypt from "bcryptjs";
import { randomBytes } from "crypto";

function cuid() {
  return "c" + randomBytes(8).toString("hex") + Date.now().toString(36);
}

async function main() {
  const url = process.env.DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;
  if (!url) throw new Error("DATABASE_URL is not set");

  console.log("Connecting to:", url.substring(0, 50) + "...");
  const db = createClient({ url, authToken });

  // Drop existing tables
  console.log("Dropping old tables...");
  for (const t of ["UserReward","UserProgress","QuizSession","Question","Reward","Subject","User"]) {
    await db.execute(`DROP TABLE IF EXISTS "${t}"`);
  }

  // Create tables matching Prisma migration exactly
  await db.executeMultiple(`
    CREATE TABLE "User" (
      "id" TEXT NOT NULL PRIMARY KEY,
      "email" TEXT NOT NULL,
      "name" TEXT NOT NULL,
      "password" TEXT NOT NULL,
      "role" TEXT NOT NULL DEFAULT 'student',
      "avatar" TEXT,
      "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
    CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

    CREATE TABLE "Subject" (
      "id" TEXT NOT NULL PRIMARY KEY,
      "name" TEXT NOT NULL,
      "emoji" TEXT NOT NULL,
      "color" TEXT NOT NULL,
      "bg" TEXT NOT NULL,
      "border" TEXT NOT NULL,
      "description" TEXT NOT NULL,
      "order" INTEGER NOT NULL DEFAULT 0,
      "isActive" BOOLEAN NOT NULL DEFAULT true
    );

    CREATE TABLE "Question" (
      "id" TEXT NOT NULL PRIMARY KEY,
      "subjectId" TEXT NOT NULL,
      "level" INTEGER NOT NULL,
      "question" TEXT NOT NULL,
      "optionA" TEXT NOT NULL,
      "optionB" TEXT NOT NULL,
      "optionC" TEXT NOT NULL,
      "optionD" TEXT NOT NULL,
      "correct" INTEGER NOT NULL,
      "explanation" TEXT NOT NULL,
      "isActive" BOOLEAN NOT NULL DEFAULT true,
      "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE
    );

    CREATE TABLE "QuizSession" (
      "id" TEXT NOT NULL PRIMARY KEY,
      "userId" TEXT NOT NULL,
      "subjectId" TEXT NOT NULL,
      "level" INTEGER NOT NULL,
      "score" INTEGER NOT NULL,
      "total" INTEGER NOT NULL,
      "completedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE,
      FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE
    );

    CREATE TABLE "UserProgress" (
      "id" TEXT NOT NULL PRIMARY KEY,
      "userId" TEXT NOT NULL,
      "subjectId" TEXT NOT NULL,
      "currentLevel" INTEGER NOT NULL DEFAULT 1,
      "totalScore" INTEGER NOT NULL DEFAULT 0,
      "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE,
      FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE
    );
    CREATE UNIQUE INDEX "UserProgress_userId_subjectId_key" ON "UserProgress"("userId","subjectId");

    CREATE TABLE "Reward" (
      "id" TEXT NOT NULL PRIMARY KEY,
      "name" TEXT NOT NULL,
      "emoji" TEXT NOT NULL,
      "description" TEXT NOT NULL,
      "color" TEXT NOT NULL DEFAULT '#2563eb',
      "conditionType" TEXT NOT NULL,
      "conditionValue" INTEGER NOT NULL,
      "subjectId" TEXT,
      "pointBonus" INTEGER NOT NULL DEFAULT 0,
      "isActive" BOOLEAN NOT NULL DEFAULT true,
      "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE "UserReward" (
      "id" TEXT NOT NULL PRIMARY KEY,
      "userId" TEXT NOT NULL,
      "rewardId" TEXT NOT NULL,
      "earnedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE,
      FOREIGN KEY ("rewardId") REFERENCES "Reward"("id") ON DELETE CASCADE ON UPDATE CASCADE
    );
    CREATE UNIQUE INDEX "UserReward_userId_rewardId_key" ON "UserReward"("userId","rewardId");
  `);
  console.log("✓ Tables created (matching Prisma schema)");

  // Seed users
  const adminPwd = await bcrypt.hash("admin123", 10);
  await db.execute({
    sql: `INSERT INTO "User" ("id","email","name","password","role") VALUES (?,?,?,?,?)`,
    args: [cuid(), "admin@dangkhoa.edu.vn", "Admin Đăng Khoa", adminPwd, "admin"],
  });

  const studentPwd = await bcrypt.hash("student123", 10);
  await db.execute({
    sql: `INSERT INTO "User" ("id","email","name","password","role") VALUES (?,?,?,?,?)`,
    args: [cuid(), "hocsinh@demo.vn", "Nguyễn Văn An", studentPwd, "student"],
  });
  console.log("✓ Users created");

  // Seed subjects
  const subjects = [
    ["Toán", "Toán", "📐", "#2563eb", "#eff6ff", "#bfdbfe", "Đại số, hình học, thống kê lớp 9", 1],
    ["Ngữ_Văn", "Ngữ Văn", "📖", "#dc2626", "#fef2f2", "#fecaca", "Văn học, tập làm văn, tiếng Việt", 2],
    ["Tiếng_Anh", "Tiếng Anh", "🌍", "#7c3aed", "#f5f3ff", "#ddd6fe", "Ngữ pháp, từ vựng, kỹ năng giao tiếp", 3],
    ["Vật_Lý", "Vật Lý", "⚡", "#0891b2", "#ecfeff", "#a5f3fc", "Điện học, quang học, cơ học", 4],
    ["Hóa_Học", "Hóa Học", "🧪", "#d97706", "#fffbeb", "#fed7aa", "Hóa hữu cơ, vô cơ, phản ứng hóa học", 5],
    ["Sinh_Học", "Sinh Học", "🌱", "#16a34a", "#f0fdf4", "#bbf7d0", "Di truyền học, sinh thái, tiến hóa", 6],
    ["Lịch_Sử", "Lịch Sử", "🏛️", "#ea580c", "#fff7ed", "#fed7aa", "Lịch sử Việt Nam và thế giới", 7],
    ["Địa_Lý", "Địa Lý", "🗺️", "#0d9488", "#f0fdfa", "#99f6e4", "Địa lý tự nhiên và kinh tế-xã hội", 8],
  ];
  for (const [id, name, emoji, color, bg, border, description, order] of subjects) {
    await db.execute({
      sql: `INSERT INTO "Subject" ("id","name","emoji","color","bg","border","description","order") VALUES (?,?,?,?,?,?,?,?)`,
      args: [id, name, emoji, color, bg, border, description, order],
    });
  }
  console.log("✓ Subjects created");

  // Seed rewards
  const rewards = [
    ["Người Mới Bắt Đầu", "🌱", "Hoàn thành bài thi đầu tiên", "#6b7280", "total_score", 1, null, 0],
    ["Học Sinh Chăm Chỉ",  "📚", "Đạt 100 điểm tổng",           "#2563eb", "total_score", 100, null, 20],
    ["Người Giỏi",          "⭐", "Đạt 300 điểm tổng",           "#7c3aed", "total_score", 300, null, 50],
    ["Học Sinh Xuất Sắc",   "🏆", "Đạt 600 điểm tổng",          "#d97706", "total_score", 600, null, 100],
    ["Thiên Tài",           "🌟", "Đạt 1000 điểm tổng",          "#dc2626", "total_score", 1000, null, 200],
    ["Thám Hiểm Level 10",  "🎯", "Đạt level 10 bất kỳ môn",    "#0891b2", "subject_level", 10, null, 30],
    ["Chinh Phục Level 50", "🚀", "Đạt level 50 bất kỳ môn",    "#ea580c", "subject_level", 50, null, 100],
    ["Bậc Thầy Level 100",  "👑", "Đạt level 100 bất kỳ môn",   "#7c3aed", "subject_level", 100, null, 500],
  ];
  for (const [name, emoji, description, color, conditionType, conditionValue, subjectId, pointBonus] of rewards) {
    await db.execute({
      sql: `INSERT INTO "Reward" ("id","name","emoji","description","color","conditionType","conditionValue","subjectId","pointBonus") VALUES (?,?,?,?,?,?,?,?,?)`,
      args: [cuid(), name, emoji, description, color, conditionType, conditionValue, subjectId, pointBonus],
    });
  }
  console.log("✓ Rewards created");

  console.log("\n✅ Seed complete!");
  console.log("   Admin: admin@dangkhoa.edu.vn / admin123");
  console.log("   Demo:  hocsinh@demo.vn / student123");
}

main().catch((e) => { console.error(e); process.exit(1); });
