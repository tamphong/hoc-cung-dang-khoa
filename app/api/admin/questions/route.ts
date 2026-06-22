import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session || session.role !== "admin") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { searchParams } = new URL(req.url);
  const subjectId = searchParams.get("subjectId");

  const questions = await prisma.question.findMany({
    where: subjectId ? { subjectId } : undefined,
    include: { subject: true },
    orderBy: [{ subjectId: "asc" }, { level: "asc" }],
    take: 200,
  });

  return NextResponse.json(questions);
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session || session.role !== "admin") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const data = await req.json();
  const q = await prisma.question.create({
    data: {
      subjectId: data.subjectId,
      level: parseInt(data.level),
      question: data.question,
      optionA: data.optionA,
      optionB: data.optionB,
      optionC: data.optionC,
      optionD: data.optionD,
      correct: parseInt(data.correct),
      explanation: data.explanation,
    },
    include: { subject: true },
  });
  return NextResponse.json(q);
}

export async function PUT(req: NextRequest) {
  const session = await getSession();
  if (!session || session.role !== "admin") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { id, ...data } = await req.json();
  const q = await prisma.question.update({
    where: { id },
    data: {
      level: parseInt(data.level),
      question: data.question,
      optionA: data.optionA,
      optionB: data.optionB,
      optionC: data.optionC,
      optionD: data.optionD,
      correct: parseInt(data.correct),
      explanation: data.explanation,
      isActive: data.isActive,
    },
    include: { subject: true },
  });
  return NextResponse.json(q);
}

export async function DELETE(req: NextRequest) {
  const session = await getSession();
  if (!session || session.role !== "admin") return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const { id } = await req.json();
  await prisma.question.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
