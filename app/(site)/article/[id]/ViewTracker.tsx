"use client";

import { useEffect } from "react";

export default function ViewTracker({
  articleId,
}: {
  articleId: number;
}) {
  useEffect(() => {
    const key = `viewed_${articleId}`;

    const viewed = localStorage.getItem(key);

    if (viewed) return;

    fetch("/api/view", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        articleId,
      }),
    });

    localStorage.setItem(
      key,
      Date.now().toString()
    );
  }, [articleId]);

  return null;
}