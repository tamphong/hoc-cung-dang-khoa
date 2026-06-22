import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function GET() {
  const session = await getSession();
  if (!session || session.role !== "admin") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const rewards = await prisma.reward.findMany({
    include: { _count: { select: { userRewards: true } } },
    orderBy: { conditionValue: "asc" },
  });
  return NextResponse.json(rewards);
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session || session.role !== "admin") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const data = await req.json();
  const reward = await prisma.reward.create({
    data: {
      name: data.name,
      emoji: data.emoji,
      description: data.description,
      color: data.color || "#2563eb",
      conditionType: data.conditionType,
      conditionValue: parseInt(data.conditionValue),
      subjectId: data.subjectId || null,
      pointBonus: parseInt(data.pointBonus || "0"),
    },
  });
  return NextResponse.json(reward);
}

export async function PUT(req: NextRequest) {
  const session = await getSession();
  if (!session || session.role !== "admin") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { id, ...data } = await req.json();
  const reward = await prisma.reward.update({
    where: { id },
    data: {
      name: data.name,
      emoji: data.emoji,
      description: data.description,
      color: data.color,
      conditionType: data.conditionType,
      conditionValue: parseInt(data.conditionValue),
      pointBonus: parseInt(data.pointBonus || "0"),
      isActive: data.isActive,
    },
  });
  return NextResponse.json(reward);
}

export async function DELETE(req: NextRequest) {
  const session = await getSession();
  if (!session || session.role !== "admin") return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const { id } = await req.json();
  await prisma.reward.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
