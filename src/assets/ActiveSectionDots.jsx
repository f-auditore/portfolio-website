import { useEffect, useState } from "react";

const sections = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skill", label: "Skill" },
  { id: "project", label: "Project" },
  { id: "gallery", label: "Gallery" },
  { id: "contact", label: "Contact" },
];

export default function ActiveSectionDots() {
  const [active, setActive] = useState("home");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { threshold: 0.5 },
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    // Show after scroll
    const onScroll = () => setVisible(window.scrollY > 200);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <nav
      aria-label="Section navigation"
      style={{
        position: "fixed",
        right: "1.5rem",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 990,
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.4s ease",
        pointerEvents: visible ? "all" : "none",
      }}
    >
      {sections.map(({ id, label }) => (
        <a
          key={id}
          href={`#${id}`}
          aria-label={label}
          title={label}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: "0.5rem",
            textDecoration: "none",
          }}
        >
          {/* Label tooltip on hover */}
          <span
            className="section-dot-label"
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "0.7rem",
              fontWeight: 600,
              color: "oklch(0.627 0.0988 67.26)",
              opacity: 0,
              transform: "translateX(4px)",
              transition: "opacity 0.2s, transform 0.2s",
              whiteSpace: "nowrap",
              pointerEvents: "none",
            }}
          >
            {label}
          </span>
          <div
            style={{
              width: active === id ? "10px" : "6px",
              height: active === id ? "10px" : "6px",
              borderRadius: "50%",
              backgroundColor:
                active === id
                  ? "oklch(0.627 0.0988 67.26)"
                  : "oklch(0.708 0 0)",
              transition: "all 0.3s ease",
              boxShadow:
                active === id
                  ? "0 0 0 3px oklch(0.627 0.0988 67.26 / 0.2)"
                  : "none",
            }}
          />
        </a>
      ))}

      <style>{`
        a:hover .section-dot-label {
          opacity: 1 !important;
          transform: translateX(0) !important;
        }
        @media (max-width: 1280px) {
          nav[aria-label="Section navigation"] {
            display: none !important;
          }
        }
      `}</style>
    </nav>
  );
}
