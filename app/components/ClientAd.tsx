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

  const showLabel =
  position === "article-top" ||
  position === "article-auto" ||
  position === "article-bottom";

return (
  <div className="my-6">

    {showLabel && (
  <div
    className="
      flex
      items-center
      justify-center
      gap-3
      bg-gray-100
      rounded-md
      py-2
      mb-3
    "
  >
    <div className="flex-1 h-px bg-gray-300" />

    <span
      className="
        text-[11px]
        font-medium
        tracking-[3px]
        uppercase
        text-gray-500
        whitespace-nowrap
      "
    >
      ADVERTISEMENT
    </span>

    <div className="flex-1 h-px bg-gray-300" />
  </div>
)}

    <AdRenderer
      code={code}
      slot={slot}
      position={position}
    />

  </div>
);
}