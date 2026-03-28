"use client";

import React, { PropsWithChildren, useEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";

type InfiniteSliderProps = PropsWithChildren<{
  speed?: number; // base px per second
  speedOnHover?: number; // px per second when parent group is hovered
  gap?: number; // gap in px between items
  className?: string;
}>;

// Duplicates children to create a continuous marquee. Uses transform translateX animation.
export function InfiniteSlider({ speed = 40, speedOnHover, gap = 64, className, children }: InfiniteSliderProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const effectiveSpeed = isHovered && speedOnHover ? speedOnHover : speed;

  const items = useMemo(() => React.Children.toArray(children), [children]);
  const itemsTwice = useMemo(() => [...items, ...items], [items]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !trackRef.current) return;

    let rafId = 0;
    let x = 0;
    let last = performance.now();

    const step = (now: number) => {
      const dt = (now - last) / 1000; // seconds
      last = now;
      x -= effectiveSpeed * dt; // move left

      const track = trackRef.current!;
      // width of a single set
      const setWidth = (track.scrollWidth / 2) || 1;
      if (Math.abs(x) >= setWidth) {
        x += setWidth; // wrap
      }
      track.style.transform = `translate3d(${x}px,0,0)`;
      rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [effectiveSpeed, items.length]);

  return (
    <div
      ref={containerRef}
      className={clsx("relative w-full overflow-hidden", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        ref={trackRef}
        className="flex items-center"
        style={{ gap: `${gap}px`, willChange: "transform" }}
      >
        {itemsTwice.map((child, idx) => (
          <div key={idx} className="shrink-0">
            {child}
          </div>
        ))}
      </div>
    </div>
  );
}


