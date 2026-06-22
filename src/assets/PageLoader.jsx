import { useEffect, useState } from "react";

export default function PageLoader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const intervals = [
      setTimeout(() => setProgress(30), 100),
      setTimeout(() => setProgress(60), 300),
      setTimeout(() => setProgress(85), 600),
      setTimeout(() => setProgress(100), 900),
      setTimeout(() => setDone(true), 1100),
      setTimeout(() => setHidden(true), 1700),
    ];
    return () => intervals.forEach(clearTimeout);
  }, []);

  if (hidden) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        backgroundColor: "oklch(0.985 0 0)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "2rem",
        opacity: done ? 0 : 1,
        transform: done ? "translateY(-10px)" : "translateY(0)",
        transition: "opacity 0.5s ease, transform 0.5s ease",
        pointerEvents: done ? "none" : "all",
      }}
    >
      {/* Logo */}
      <div style={{ display: "flex", gap: "0.25rem", alignItems: "baseline" }}>
        <span
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: "2.5rem",
            fontWeight: 700,
            color: "oklch(0.205 0 0)",
          }}
        >
          Zikri
        </span>
        <span
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: "2.5rem",
            fontWeight: 700,
            color: "oklch(0.627 0.0988 67.26)",
          }}
        >
          UI
        </span>
      </div>

      <div
        style={{
          width: "200px",
          height: "3px",
          backgroundColor: "oklch(0.922 0 0)",
          borderRadius: "99px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${progress}%`,
            backgroundColor: "oklch(0.627 0.0988 67.26)",
            borderRadius: "99px",
            transition: "width 0.3s ease",
          }}
        />
      </div>

      <span
        style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: "0.75rem",
          color: "oklch(0.556 0 0)",
          letterSpacing: "0.1em",
        }}
      >
        {progress < 100 ? "Loading..." : "Welcome!"}
      </span>
    </div>
  );
}
