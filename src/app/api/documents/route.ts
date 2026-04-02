import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { saveToVault } from "@/lib/storage";
import { syncToGoogleDrive } from "@/lib/gdrive";

export async function GET() {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // @ts-ignore
  const userId = session.user.id;
  const docs = await prisma.document.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(docs);
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // @ts-ignore
  const userId = session.user.id;
  const formData = await request.formData();
  const file = formData.get("file") as File;
  const category = formData.get("category") as string;
  const name = formData.get("name") as string;

  if (!file) return NextResponse.json({ error: "No file uploaded" }, { status: 400 });

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // 1. Get System Key
  const systemKey = process.env.VAULT_SYSTEM_KEY || "default-secret-key-32-chars-long-!!";

  // 2. Encrypt and Save to Local Backup
  const backupPath = await saveToVault(userId, name, buffer, systemKey as string);

  // 3. Sync to Google Drive (Mocked)
  const driveFileId = await syncToGoogleDrive(name, buffer); // Passing buffer for simplicity in mock

  // 4. Register in Database
  const doc = await prisma.document.create({
    data: {
      userId,
      name,
      type: "FILE",
      category,
      backupPath,
      driveFileId,
      mimeType: file.type,
      size: file.size,
    },
  });

  return NextResponse.json(doc, { status: 201 });
}
