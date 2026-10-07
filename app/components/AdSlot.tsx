import { db } from "@/lib/db";
import { headers } from "next/headers";
import { shouldShowAds } from "@/lib/ads";
import AdRenderer from "./AdRenderer";
import AdLabel from "./AdLabel";

export default async function AdSlot({ position }: { position: string }) {
  const result = await db.query(
    `SELECT code, slot
     FROM public.ads
     WHERE position = $1
       AND active = true
     LIMIT 1`,
    [position],
  );

  const data = result.rows[0] ?? null;

  if (!data) return null;

  const headersList = await headers();

  const host = (
    headersList.get("x-forwarded-host") ??
    headersList.get("host") ??
    ""
  ).split(":")[0];

  if (!shouldShowAds(host)) {
    return null;
  }

  const showLabel = position === "article-top" || position === "article-bottom";

  return (
    <div className="md:my-6">
      {showLabel && <AdLabel />}

      <AdRenderer code={data.code} slot={data.slot} position={position} />
    </div>
  );
}
