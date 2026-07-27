"use client";

import { useEffect } from "react";

export default function ViewTracker({ articleId }: { articleId: number }) {
  useEffect(() => {
    fetch("/api/view", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        articleId,
      }),
    })
      .then(async (res) => {
        console.log("Status:", res.status);
        console.log(await res.json());
      })
      .catch(console.error);
  }, [articleId]);

  return null;
}
