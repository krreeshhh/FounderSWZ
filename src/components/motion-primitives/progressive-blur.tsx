"use client";

import React from "react";
import clsx from "clsx";

type ProgressiveBlurProps = {
  className?: string;
  direction?: "left" | "right";
  blurIntensity?: number; // 0..1 multiplier
};

// Renders a gradient mask that simulates progressive blur/fade on the edges of a horizontally scrolling area.
export function ProgressiveBlur({ className, direction = "left", blurIntensity = 1 }: ProgressiveBlurProps) {
  const fromSide = direction === "left" ? "from-background" : "from-background";
  const toTransparentSide = direction === "left" ? "to-transparent" : "to-transparent";
  const base = direction === "left" ? "bg-gradient-to-r" : "bg-gradient-to-l";

  const opacity = Math.max(0, Math.min(1, blurIntensity));

  return (
    <div
      className={clsx(base, fromSide, toTransparentSide, "pointer-events-none", className)}
      style={{ opacity }}
    />
  );
}


