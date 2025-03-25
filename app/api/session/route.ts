import { NextResponse } from "next/server";
import { getUserSession } from "@/utils/actions"; // Pastikan path sesuai

export async function GET() {
  try {
    const session = await getUserSession();
    if (!session) return NextResponse.json(null);
    return NextResponse.json(session);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch session" },
      { status: 500 }
    );
  }
}
