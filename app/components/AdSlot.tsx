import { supabase } from "@/lib/supabase";
import AdRenderer from "./AdRenderer";
import AdLabel from "./AdLabel";

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

    const showLabel =
  position === "article-top" ||
  position === "article-bottom";

return (
  <div className="md:my-6">
    {showLabel && <AdLabel />}

    <AdRenderer
      code={data.code}
      slot={data.slot}
      position={position}
    />
  </div>
);
}