import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  const { articleId } = await req.json();

  try {
    await db.query(
      `SELECT public.increment_article_views($1)`,
      [articleId],
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      },
      {
        status: 500,
      },
    );
  }

  return NextResponse.json({
    success: true,
  });
}
