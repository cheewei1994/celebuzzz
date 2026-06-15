import { NextResponse } from "next/server";

export async function POST(req: Request) {
  return NextResponse.json({
    version: "FORCE_TEST_123",
    time: Date.now(),
  });
}