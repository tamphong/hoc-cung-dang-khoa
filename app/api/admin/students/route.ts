import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import bcrypt from "bcryptjs";

export async function GET() {
  const session = await getSession();
  if (!session || session.role !== "admin") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const users = await prisma.user.findMany({
    where: { role: "student" },
    include: {
      progress: { include: { subject: true } },
      _count: { select: { sessions: true, rewards: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(
    users.map((u) => ({
      id: u.id,
      name: u.name,
      email: u.email,
      createdAt: u.createdAt,
      totalScore: u.progress.reduce((s, p) => s + p.totalScore, 0),
      sessionsCount: u._count.sessions,
      rewardsCount: u._count.rewards,
      progress: u.progress,
    }))
  );
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session || session.role !== "admin") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { name, email, password } = await req.json();
  if (!name || !email || !password) return NextResponse.json({ error: "Thiếu thông tin" }, { status: 400 });

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return NextResponse.json({ error: "Email đã tồn tại" }, { status: 400 });

  const hashed = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { name, email, password: hashed, role: "student" },
  });
  return NextResponse.json({ ok: true, id: user.id });
}

export async function PUT(req: NextRequest) {
  const session = await getSession();
  if (!session || session.role !== "admin") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { id, name, email, password } = await req.json();
  if (!id || !name || !email) return NextResponse.json({ error: "Thiếu thông tin" }, { status: 400 });

  const data: { name: string; email: string; password?: string } = { name, email };
  if (password) data.password = await bcrypt.hash(password, 10);

  await prisma.user.update({ where: { id }, data });
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest) {
  const session = await getSession();
  if (!session || session.role !== "admin") return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const { id } = await req.json();
  await prisma.user.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
