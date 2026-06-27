import { useEffect, useRef, useState } from "react";

function useScrollReveal(options = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element); // Trigger sekali saja
        }
      },
      {
        threshold: options.threshold ?? 0.15,
        rootMargin: options.rootMargin ?? "0px 0px -50px 0px",
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [options.rootMargin, options.threshold]);

  return { ref, isVisible };
}

export function RevealOnScroll({
  children,
  className = "",
  delay = 0,
  direction = "up",
  duration = 600,
}) {
  const { ref, isVisible } = useScrollReveal();

  const getInitialTransform = () => {
    switch (direction) {
      case "up":    return "translateY(40px)";
      case "down":  return "translateY(-40px)";
      case "left":  return "translateX(-40px)";
      case "right": return "translateX(40px)";
      default:      return "translateY(0)";
    }
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translate(0,0)" : getInitialTransform(),
        transition: `opacity ${duration}ms ease ${delay}ms, transform ${duration}ms ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

export default RevealOnScroll;