import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";

// GET /api/student/quiz?subjectId=xxx&level=5  → fetch questions for a level
export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const subjectId = searchParams.get("subjectId");
  const level = parseInt(searchParams.get("level") || "1");

  if (!subjectId) return NextResponse.json({ error: "Missing subjectId" }, { status: 400 });

  // Fetch questions within ±5 levels, pick 10 random
  const questions = await prisma.question.findMany({
    where: {
      subjectId,
      isActive: true,
      level: { gte: Math.max(1, level - 5), lte: level + 10 },
    },
    orderBy: { level: "asc" },
  });

  // Shuffle & pick up to 10
  const shuffled = questions.sort(() => Math.random() - 0.5).slice(0, 10);

  return NextResponse.json(
    shuffled.map((q) => ({
      id: q.id,
      question: q.question,
      options: [q.optionA, q.optionB, q.optionC, q.optionD],
      correct: q.correct,
      explanation: q.explanation,
    }))
  );
}

// POST /api/student/quiz  → submit quiz result
export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { subjectId, level, score, total } = await req.json();

  // Save session
  await prisma.quizSession.create({
    data: { userId: session.userId, subjectId, level, score, total },
  });

  // Update progress
  const existing = await prisma.userProgress.findUnique({
    where: { userId_subjectId: { userId: session.userId, subjectId } },
  });

  const passThreshold = total * 0.7; // 70% to advance level
  const newScore = (existing?.totalScore ?? 0) + score;
  const newLevel =
    score >= passThreshold
      ? Math.min(100, (existing?.currentLevel ?? 1) + 1)
      : existing?.currentLevel ?? 1;

  await prisma.userProgress.upsert({
    where: { userId_subjectId: { userId: session.userId, subjectId } },
    update: { totalScore: newScore, currentLevel: newLevel },
    create: { userId: session.userId, subjectId, totalScore: newScore, currentLevel: newLevel },
  });

  // Check & award rewards
  const allProgress = await prisma.userProgress.findMany({ where: { userId: session.userId } });
  const globalTotal = allProgress.reduce((sum, p) => sum + p.totalScore, 0);
  const maxLevel = Math.max(...allProgress.map((p) => p.currentLevel));

  const allRewards = await prisma.reward.findMany({ where: { isActive: true } });
  const earnedIds = (
    await prisma.userReward.findMany({ where: { userId: session.userId } })
  ).map((r) => r.rewardId);

  const newRewards = [];
  for (const reward of allRewards) {
    if (earnedIds.includes(reward.id)) continue;
    let earned = false;
    if (reward.conditionType === "total_score" && globalTotal >= reward.conditionValue) earned = true;
    if (reward.conditionType === "subject_level" && newLevel >= reward.conditionValue) earned = true;
    if (reward.conditionType === "subject_score" && newScore >= reward.conditionValue) earned = true;
    if (earned) {
      await prisma.userReward.create({ data: { userId: session.userId, rewardId: reward.id } });
      newRewards.push(reward);
    }
  }

  return NextResponse.json({ ok: true, newLevel, newScore, globalTotal, newRewards });
}
