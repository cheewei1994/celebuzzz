import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

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

  const { error } = await supabaseAdmin.from("articles").insert({
    title,
    category,
    summary,
    source_url: sourceUrl,
    cover,
    long_image: longImage,
    blocks,
    status,
    views: status === "published" ? 0 : undefined,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    success: true,
  });
}
