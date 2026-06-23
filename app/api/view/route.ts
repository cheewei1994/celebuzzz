import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  const { articleId } =
    await req.json();

  const { data: article } =
    await supabase
      .from("articles")
      .select("views")
      .eq("id", articleId)
      .single();

  if (!article) {
    return NextResponse.json({
      success: false,
    });
  }

  await supabase
    .from("articles")
    .update({
      views:
        (article.views || 0) + 1,
    })
    .eq("id", articleId);

  return NextResponse.json({
    success: true,
  });
}