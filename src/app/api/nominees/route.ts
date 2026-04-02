import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // @ts-ignore
  const userId = session.user.id;
  const nominees = await prisma.nominee.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(nominees);
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // @ts-ignore
  const userId = session.user.id;
  const { name, email, phone, relationship, role } = await request.json();

  const nominee = await prisma.nominee.create({
    data: {
      userId,
      name,
      email,
      phone,
      relationship,
      role,
      status: "PENDING",
    },
  });

  return NextResponse.json(nominee, { status: 201 });
}
