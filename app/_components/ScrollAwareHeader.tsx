"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type ScrollDirection = "idle" | "up" | "down";

type ScrollAwareHeaderProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Keeps the primary navigation quiet while a reader moves down the hero,
 * then brings it back as soon as they reverse direction. The component stays
 * in the document flow so the first viewport never shifts under the header.
 */
export default function ScrollAwareHeader({
  children,
  className = "site-header",
}: ScrollAwareHeaderProps) {
  const [direction, setDirection] = useState<ScrollDirection>("idle");
  const [scrolled, setScrolled] = useState(false);
  const lastY = useRef(0);
  const frame = useRef<number | null>(null);

  useEffect(() => {
    lastY.current = window.scrollY;

    const onScroll = () => {
      if (frame.current !== null) return;

      frame.current = window.requestAnimationFrame(() => {
        frame.current = null;
        const currentY = window.scrollY;
        const delta = currentY - lastY.current;

        if (Math.abs(delta) > 3) {
          setDirection(delta > 0 ? "down" : "up");
        }
        setScrolled(currentY > 24);
        lastY.current = currentY;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame.current !== null) window.cancelAnimationFrame(frame.current);
    };
  }, []);

  return (
    <header
      className={className}
      data-scroll-direction={direction}
      data-scrolled={scrolled ? "true" : undefined}
    >
      {children}
    </header>
  );
}
