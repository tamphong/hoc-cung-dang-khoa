import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const subjects = await prisma.subject.findMany({
    where: { isActive: true },
    orderBy: { order: "asc" },
  });

  const progress = await prisma.userProgress.findMany({
    where: { userId: session.userId },
  });

  const progressMap = Object.fromEntries(progress.map((p) => [p.subjectId, p]));

  return NextResponse.json(
    subjects.map((s) => ({
      ...s,
      progress: progressMap[s.id] ?? { currentLevel: 1, totalScore: 0 },
    }))
  );
}
