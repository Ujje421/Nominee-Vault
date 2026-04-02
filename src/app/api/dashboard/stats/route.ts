import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // @ts-ignore
  const userId = session.user.id;

  const [assetCount, nomineeCount, documentCount, user] = await Promise.all([
    prisma.asset.count({ where: { userId } }),
    prisma.nominee.count({ where: { userId } }),
    prisma.document.count({ where: { userId } }),
    prisma.user.findUnique({
      where: { id: userId },
      select: { verificationStatus: true, lastVerificationDate: true }
    }),
  ]);

  return NextResponse.json({
    assetCount,
    nomineeCount,
    documentCount,
    status: user?.verificationStatus || "ACTIVE",
    lastVerification: user?.lastVerificationDate,
  });
}
