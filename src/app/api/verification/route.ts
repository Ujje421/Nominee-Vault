import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // @ts-ignore
  const userId = session.user.id;
  const { method, notes } = await request.json();

  try {
    // 1. Update User's lastVerificationDate and Status
    await prisma.user.update({
      where: { id: userId },
      data: {
        lastVerificationDate: new Date(),
        verificationStatus: "ACTIVE",
      },
    });

    // 2. Log the verification event
    const log = await prisma.verificationLog.create({
      data: {
        userId,
        method,
        status: "SUCCESS",
        notes: notes || "Manual verification successful",
      },
    });

    return NextResponse.json({ message: "Verification successful", log });
  } catch (error) {
    console.error("Verification update error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET() {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // @ts-ignore
  const userId = session.user.id;
  const logs = await prisma.verificationLog.findMany({
    where: { userId },
    orderBy: { verifiedAt: "desc" },
    take: 10,
  });

  return NextResponse.json(logs);
}
