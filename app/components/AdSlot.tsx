import { supabase } from "@/lib/supabase";

export default async function AdSlot({
  position,
}: {
  position: string;
}) {
  const { data } = await supabase
    .from("ads")
    .select("*")
    .eq("position", position)
    .eq("active", true)
    .single();

  if (!data) return null;

  return (
    <div
      className="my-6"
      dangerouslySetInnerHTML={{
        __html: data.code,
      }}
    />
  );
}