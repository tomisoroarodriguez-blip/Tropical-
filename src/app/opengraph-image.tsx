import { ImageResponse } from "next/og";

export const alt = "Martínez Seguros: protegemos lo que más importa";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: 80, background: "linear-gradient(135deg,#162e57,#2b4f8c)", color: "white" }}>
        <div style={{ fontSize: 34, color: "#f7be68", letterSpacing: 6, textTransform: "uppercase" }}>Martínez Seguros</div>
        <div style={{ fontSize: 84, fontWeight: 800, marginTop: 24, lineHeight: 1.05 }}>Protegemos lo que más importa.</div>
        <div style={{ fontSize: 34, marginTop: 28, color: "#dfe7f2" }}>Asesoramiento de seguros en Montevideo y Uruguay</div>
      </div>
    ),
    size,
  );
}
