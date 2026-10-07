import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  try {
    await db.query(
      `DELETE FROM public.ads
       WHERE id = $1`,
      [Number(id)],
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "刪除廣告失敗",
      },
      { status: 500 },
    );
  }

  return NextResponse.json({
    success: true,
  });
}
