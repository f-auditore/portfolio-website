import { useEffect, useRef, useState } from "react";

export default function CursorFollower() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false); // Default false agar aman di SSR/Next.js
  
  const pos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const rafId = useRef(null);

  useEffect(() => {
    // 1. Fungsi pengecekan layar & device
    const checkDevice = () => {
      // Cek lebar layar DAN pastikan bukan device touchscreen murni
      const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
      setIsDesktop(window.innerWidth >= 768 && !hasTouch);
    };

    // Jalankan saat komponen pertama kali dipasang
    checkDevice();

    // Jalankan ulang jika user me-resize browser (buat testing di inspect element)
    window.addEventListener("resize", checkDevice);

    // 2. Jika bukan desktop, jangan pasang event listener kursor sama sekali
    if (window.innerWidth < 768) {
      return () => window.removeEventListener("resize", checkDevice);
    }

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    const onMouseOver = (e) => {
      const target = e.target;
      const isInteractive =
        target.closest("a, button, [role='button'], input, textarea, select, label") ||
        target.getAttribute("data-cursor") === "pointer";
      setIsHovering(!!isInteractive);
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseover", onMouseOver);

    // Lerp animation loop
    const lerp = (a, b, t) => a + (b - a) * t;
    const animate = () => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x - 4}px, ${pos.current.y - 4}px)`;
      }
      if (ringRef.current) {
        ringPos.current.x = lerp(ringPos.current.x, pos.current.x, 0.12);
        ringPos.current.y = lerp(ringPos.current.y, pos.current.y, 0.12);
        const size = isHovering ? 40 : 28;
        ringRef.current.style.transform = `translate(${ringPos.current.x - size / 2}px, ${ringPos.current.y - size / 2}px)`;
        ringRef.current.style.width = `${size}px`;
        ringRef.current.style.height = `${size}px`;
      }
      rafId.current = requestAnimationFrame(animate);
    };
    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", checkDevice);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseover", onMouseOver);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isHovering]);

  // Jika bukan desktop, paksa return null agar elemen kursor benar-benar hancur dari DOM
  if (!isDesktop) return null;

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          backgroundColor: "oklch(0.627 0.0988 67.26)",
          pointerEvents: "none",
          zIndex: 99998,
          transform: "translate(-100px, -100px)",
          transition: "transform 0.05s linear",
          mixBlendMode: "multiply",
          willChange: "transform",
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "28px",
          height: "28px",
          borderRadius: "50%",
          border: `1.5px solid oklch(0.627 0.0988 67.26 / 0.5)`,
          pointerEvents: "none",
          zIndex: 99997,
          transform: "translate(-100px, -100px)",
          transition: "width 0.2s ease, height 0.2s ease, border-color 0.2s ease, opacity 0.2s ease",
          opacity: isClicking ? 0.5 : 0.8,
          willChange: "transform, width, height",
          backgroundColor: isHovering
            ? "oklch(0.627 0.0988 67.26 / 0.1)"
            : "transparent",
        }}
      />
    </>
  );
}