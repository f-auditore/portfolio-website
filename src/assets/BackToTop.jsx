import { useEffect, useState } from "react";
import { LuArrowUp } from "react-icons/lu";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const container = document.querySelector("[data-scroll-container]");
    if (container?.__locomotive) {
      container.__locomotive.scrollTo(0);
    }
  };

  return (
    <button
      onClick={scrollTop}
      aria-label="Back to top"
      style={{
        position: "fixed",
        bottom: "2rem",
        right: "2rem",
        zIndex: 990,
        width: "44px",
        height: "44px",
        borderRadius: "50%",
        backgroundColor: "oklch(0.627 0.0988 67.26)",
        color: "white",
        border: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        boxShadow: "0 4px 20px oklch(0.627 0.0988 67.26 / 0.4)",
        opacity: visible ? 1 : 0,
        transform: visible
          ? "translateY(0) scale(1)"
          : "translateY(10px) scale(0.8)",
        transition: "opacity 0.3s ease, transform 0.3s ease",
        pointerEvents: visible ? "all" : "none",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "oklch(0.5446 0.0903 58.32)";
        e.currentTarget.style.transform = "translateY(-2px) scale(1.05)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "oklch(0.627 0.0988 67.26)";
        e.currentTarget.style.transform = "translateY(0) scale(1)";
      }}
    >
      <LuArrowUp size={18} />
    </button>
  );
}
