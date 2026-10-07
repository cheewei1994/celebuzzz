import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const position = searchParams.get("position");

  let data: { code: string | null; slot: string | null } | null = null;
  let error: Error | null = null;

  try {
    const result = await db.query(
      `SELECT code, slot
       FROM public.ads
       WHERE position = $1
         AND active = true
       LIMIT 1`,
      [position],
    );

    data = result.rows[0] ?? null;
  } catch (err) {
    error = err instanceof Error ? err : new Error("讀取廣告失敗");
  }

  console.log("ADS DATA:", data);
  console.log("ADS ERROR:", error);

  return NextResponse.json({
    code: data?.code ?? "",
    slot: data?.slot ?? "",
  });
}
