import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const { data } = await supabaseAdmin
    .from("ads")
    .select("active")
    .eq("id", Number(id))
    .single();

  if (!data) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await supabaseAdmin
    .from("ads")
    .update({
      active: !data.active,
    })
    .eq("id", Number(id));

  return NextResponse.json({
    success: true,
  });
}
