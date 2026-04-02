import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // @ts-ignore
  const userId = session.user.id;
  const assets = await prisma.asset.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(assets);
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // @ts-ignore
  const userId = session.user.id;
  const { type, name, description, value } = await request.json();

  const asset = await prisma.asset.create({
    data: {
      userId,
      type,
      name,
      description,
      value,
    },
  });

  return NextResponse.json(asset, { status: 201 });
}
