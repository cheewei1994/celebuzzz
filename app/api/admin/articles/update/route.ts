import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  const body = await req.json();

  const {
    id,
    title,
    summary,
    category,
    sourceUrl,
    cover,
    longImage,
    blocks,
    status,
  } = body;

  const updateData = {
    title,
    summary,
    category,
    source_url: sourceUrl,
    cover,
    long_image: longImage,
    blocks,
    ...(status ? { status } : {}),
  };

  try {
    const fields = [
      "title = $1",
      "summary = $2",
      "category = $3",
      "source_url = $4",
      "cover = $5",
      "long_image = $6",
      "blocks = $7",
    ];

    const values: unknown[] = [
      title,
      summary,
      category,
      sourceUrl,
      cover,
      longImage,
      blocks,
    ];

    if (status) {
      fields.push("status = $8");
      values.push(status);
    }

    values.push(id);

    await db.query(
      `UPDATE public.articles
       SET ${fields.join(", ")}
       WHERE id = $${values.length}`,
      values,
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "更新文章失敗",
      },
      { status: 500 },
    );
  }

  return NextResponse.json({
    success: true,
  });
}
