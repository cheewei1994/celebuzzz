import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

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

  const { error } = await supabaseAdmin
    .from("articles")
    .update(updateData)
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    success: true,
  });
}
