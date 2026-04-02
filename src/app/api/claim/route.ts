import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const email = formData.get("email") as string;
    const nomineeName = formData.get("nomineeName") as string;
    // In a real app, we'd handle the file uploads to secure storage
    
    // Find the user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ error: "Record not found" }, { status: 404 });
    }

    // Find the nominee for this user with matching info (simplified check)
    const nominee = await prisma.nominee.findFirst({
      where: { userId: user.id, name: nomineeName },
    });

    if (!nominee) {
      return NextResponse.json({ error: "Unauthorized claim" }, { status: 403 });
    }

    // Create a new claim record
    const claim = await prisma.claim.create({
      data: {
        nomineeId: nominee.id,
        status: "PENDING",
      },
    });

    return NextResponse.json({ message: "Claim submitted", claimId: claim.id });
  } catch (error) {
    console.error("Claim submission error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
