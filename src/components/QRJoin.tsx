"use client";

import { useMemo } from "react";

export function QRJoin({ url }: { url: string }) {
  const src = useMemo(() => {
    const encoded = encodeURIComponent(url);
    return `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encoded}`;
  }, [url]);

  return (
    <div className="rounded-2xl bg-white p-3">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img alt="QR code" src={src} className="h-[220px] w-[220px]" />
    </div>
  );
}
