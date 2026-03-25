"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const CustomCursor = dynamic(() =>
  import("@/components/animations/CustomCursor").then((m) => ({
    default: m.CustomCursor,
  })),
  { ssr: false },
);

export function DesktopCursor() {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px) and (pointer: fine)");
    const update = () => setShouldRender(media.matches);

    update();
    media.addEventListener("change", update);

    return () => media.removeEventListener("change", update);
  }, []);

  return shouldRender ? <CustomCursor /> : null;
}
