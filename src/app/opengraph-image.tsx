import { ImageResponse } from "next/og";

export const runtime = "edge";

export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg,#0b0b0b,#111827)",
          padding: 64,
          color: "white",
          fontFamily: "system-ui",
        }}
      >
        <div style={{ fontSize: 28, opacity: 0.9 }}>QuizOS</div>
        <div style={{ fontSize: 64, fontWeight: 800, lineHeight: 1.05 }}>
          Live pubquiz
          <br />
          zonder Kahoot
        </div>
        <div style={{ fontSize: 26, opacity: 0.85 }}>
          QR join • Live leaderboard • Host control • Weekly fresh quizzes
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
