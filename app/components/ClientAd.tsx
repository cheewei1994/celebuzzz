"use client";

import { useEffect, useState } from "react";
import AdRenderer from "./AdRenderer";
import AdLabel from "./AdLabel";
import { shouldShowAds } from "@/lib/ads";

export default function ClientAd({
  position,
}: {
  position: string;
}) {
  const [code, setCode] = useState("");
const [slot, setSlot] = useState("");

  useEffect(() => {

 const host = window.location.hostname;

  if (!shouldShowAds(host)) {
    return;
  }

    console.log("ClientAd position =", position);

    async function load() {
      console.log("Fetching...");

      const res = await fetch(
        `/api/ads?position=${position}`
      );

      const data = await res.json();

      console.log("API Result:", data);

      setCode(data.code || "");
setSlot(data.slot || "");
    }

    load();
  }, [position]);

  console.log("Current code:", code);

  if (!slot) return null;

  const showLabel =
  position === "article-top" ||
  position === "article-auto" ||
  position === "article-bottom" ||
  position === "article-next-prev" ||
  position === "image-next-prev";


return (
  <div className="md:my-6">

    {showLabel && <AdLabel />}
    <AdRenderer
      code={code}
      slot={slot}
      position={position}
    />

  </div>
  
);
}