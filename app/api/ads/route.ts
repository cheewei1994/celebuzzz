import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const position = searchParams.get("position");

  const { data, error } = await supabaseAdmin
    .from("ads")
    .select("code, slot")
    .eq("position", position)
    .eq("active", true)
    .single();

  console.log("ADS DATA:", data);
  console.log("ADS ERROR:", error);

  return NextResponse.json({
    code: data?.code ?? "",
    slot: data?.slot ?? "",
  });
}
