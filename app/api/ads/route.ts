import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const position = searchParams.get("position");

  const { data } = await supabase
    .from("ads")
    .select("code")
    .eq("position", position)
    .eq("active", true)
    .single();

  return NextResponse.json({
    code: data?.code ?? "",
  });
}