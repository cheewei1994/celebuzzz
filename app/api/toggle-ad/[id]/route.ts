import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const result = await db.query(
    `SELECT active
     FROM public.ads
     WHERE id = $1
     LIMIT 1`,
    [Number(id)],
  );

  const data = result.rows[0];

  if (!data) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await db.query(
    `UPDATE public.ads
     SET active = $1
     WHERE id = $2`,
    [!data.active, Number(id)],
  );

  return NextResponse.json({
    success: true,
  });
}
