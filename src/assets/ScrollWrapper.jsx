import { useEffect, useRef, useState } from "react";
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";

const ScrollWrapper = ({ children }) => {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      const scrollElements = containerRef.current.querySelectorAll("[data-scroll-speed]");
      scrollElements.forEach((el) => {
        const originalSpeed = parseFloat(el.getAttribute("data-scroll-speed"));
        let newSpeed = originalSpeed;
        if (isMobile) newSpeed = originalSpeed * 0.5;
        el.setAttribute("data-scroll-speed", newSpeed.toString());
      });

      const scroll = new LocomotiveScroll({
        el: containerRef.current,
        smooth: true,
        lerp: isMobile ? 0.05 : 0.1,
        multiplier: isMobile ? 0.5 : 1,
      });

      return () => {
        if (scroll) scroll.destroy();
      };
    }
  }, [isMobile]);

  return (
    <div data-scroll-container ref={containerRef} className="p-0 relative">
      {children}
    </div>
  );
};

export default ScrollWrapper;