"use client";

import { useEffect } from "react";

export default function MiaodailyRedirect() {
  useEffect(() => {
    if (window.location.hostname !== "miaodaily.com") {
      return;
    }

    const timer = setTimeout(() => {
      const url = new URL(window.location.href);
      url.hostname = "celebuzzz.com";

      window.location.replace(url.toString());
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  return null;
}