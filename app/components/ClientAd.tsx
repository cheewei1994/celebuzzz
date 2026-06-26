"use client";

import { useEffect, useState } from "react";
import AdRenderer from "./AdRenderer";

export default function ClientAd({
  position,
}: {
  position: string;
}) {
  const [code, setCode] = useState("");
const [slot, setSlot] = useState("");

  useEffect(() => {
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

return (
  <AdRenderer
    code={code}
    slot={slot}
  />
);
}