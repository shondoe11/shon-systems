import { ImageResponse } from "next/og";
import { site } from "./site";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

//& shared social-card renderer. black ground, same 2 accents as site, system sans so build has no font-fetch dep
export function renderOgImage({ heading, sub }: { heading: string; sub: string }) {
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
          background: "#000",
          color: "#ececec",
          fontFamily: "ui-sans-serif, system-ui, Helvetica, Arial, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 28, color: "#9a9a9a" }}>
          <div style={{ width: 14, height: 14, borderRadius: 999, background: "#8fb4ff" }} />
          <div style={{ width: 14, height: 14, borderRadius: 999, background: "#f2b46d" }} />
          <span>{site.url.replace("https://", "")}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 112, fontWeight: 700, letterSpacing: -4, lineHeight: 1 }}>
            {heading}
          </div>
          <div style={{ fontSize: 36, color: "#9a9a9a", lineHeight: 1.3, maxWidth: 980 }}>{sub}</div>
        </div>
      </div>
    ),
    ogSize,
  );
}
