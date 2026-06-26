"use client";

import { useEffect, useState } from "react";
import AdRenderer from "./AdRenderer";

export default function ClientAd({
  position,
}: {
  position: string;
}) {
  const [code, setCode] = useState("");

  useEffect(() => {
    console.log("ClientAd Mounted");

    async function load() {
      console.log("Fetching:", position);

      const res = await fetch(`/api/ads?position=${position}`);

      const data = await res.json();

      console.log("API Result:", data);

      setCode(data.code || "");
    }

    load();
  }, [position]);

  console.log("Current code:", code);

  if (!code) return <div>Loading Ad...</div>;

  return <AdRenderer code={code} />;
}