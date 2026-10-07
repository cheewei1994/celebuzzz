import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  const body = await req.json();

  const {
    title,
    category,
    summary,
    sourceUrl,
    cover,
    longImage,
    blocks,
    status,
  } = body;

  try {
    await db.query(
      `INSERT INTO public.articles
        (title, category, summary, source_url, cover, long_image, blocks, status, views)
       VALUES
        ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
      [
        title,
        category,
        summary,
        sourceUrl,
        cover,
        longImage,
        JSON.stringify(blocks),
        status,
        status === "published" ? 0 : null,
      ],
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "建立文章失敗",
      },
      { status: 500 },
    );
  }

  return NextResponse.json({
    success: true,
  });
}
