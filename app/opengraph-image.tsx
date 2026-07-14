import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { SITE_AUTHOR, SITE_NAME } from "@/lib/site";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export const alt = `${SITE_NAME} by ${SITE_AUTHOR}: turn Discord voice messages into text`;

export default async function Image() {
  const logo = await readFile(join(process.cwd(), "app/apple-icon.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background:
            "radial-gradient(circle at 20% 0%, rgba(56,189,248,0.25), transparent 40%), radial-gradient(circle at 90% 20%, rgba(251,146,60,0.2), transparent 38%), linear-gradient(180deg, #111722 0%, #0d131d 45%, #0a0f17 100%)",
          color: "#f8fafc",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            fontSize: 28,
            letterSpacing: 2,
            color: "rgba(248,250,252,0.85)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logoSrc}
            alt=""
            width={56}
            height={56}
            style={{ borderRadius: 14 }}
          />
          {SITE_NAME.toUpperCase()}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 72, fontWeight: 600, lineHeight: 1.05, maxWidth: 950 }}>
            Turn Discord voice messages into text.
          </div>
          <div style={{ fontSize: 32, color: "rgba(248,250,252,0.7)" }}>
            {`5 free transcriptions · prepaid hours from $2 · by ${SITE_AUTHOR}`}
          </div>
        </div>
      </div>
    ),
    size
  );
}
