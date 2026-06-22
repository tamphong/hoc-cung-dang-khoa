import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const [progress, sessions, userRewards] = await Promise.all([
    prisma.userProgress.findMany({
      where: { userId: session.userId },
      include: { subject: true },
    }),
    prisma.quizSession.findMany({
      where: { userId: session.userId },
      include: { subject: true },
      orderBy: { completedAt: "desc" },
      take: 20,
    }),
    prisma.userReward.findMany({
      where: { userId: session.userId },
      include: { reward: true },
      orderBy: { earnedAt: "desc" },
    }),
  ]);

  const totalScore = progress.reduce((sum, p) => sum + p.totalScore, 0);

  return NextResponse.json({ progress, sessions, userRewards, totalScore });
}
