import { NextResponse } from "next/server";
import { getPlatformHealth } from "@/backend/services/health";

export async function GET() {
  return NextResponse.json(getPlatformHealth());
}
