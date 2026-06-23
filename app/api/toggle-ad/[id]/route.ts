import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const { data } = await supabase
    .from("ads")
    .select("active")
    .eq("id", Number(id))
    .single();

  if (!data) {
    return NextResponse.json(
      { error: "Not found" },
      { status: 404 }
    );
  }

  await supabase
    .from("ads")
    .update({
      active: !data.active,
    })
    .eq("id", Number(id));

  return NextResponse.json({
    success: true,
  });
}