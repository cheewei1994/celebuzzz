import { supabase } from "@/lib/supabase";
import AdRenderer from "./AdRenderer";

export default async function AdSlot({
  position,
}: {
  position: string;
}) {
  const { data } = await supabase
    .from("ads")
    .select("code, slot")
    .eq("position", position)
    .eq("active", true)
    .single();

  if (!data) return null;

  return (
    <AdRenderer
      code={data.code}
      slot={data.slot}
    />
  );
}