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
  <div className="md:my-6">

    {showLabel && (
  <div
   className="
  w-screen
  md:w-full
  relative
  left-1/2
  md:left-0
  -translate-x-1/2
  md:translate-x-0
  bg-gray-200
  md:bg-transparent
  py-2
  mb-1
"
  >
  
    <div
      className="
        max-w-[900px]
        md:max-w-[1200px]
        mx-auto
        px-4
        flex
        items-center
        justify-center
        gap-3
      "
    >
    <div className="flex-1 h-px bg-gray-300" />

    <span
      className="
        text-[14px]
        font-bold
        tracking-[2px]
        uppercase
        text-gray-500
        whitespace-nowrap
      "
    >
      ADVERTISEMENT
    </span>

    <div className="flex-1 h-px bg-gray-300" />
  </div>
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