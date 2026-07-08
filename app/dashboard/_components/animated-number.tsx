"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

function formatTime(minutes: number): string {
  if (minutes >= 60) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours} hr ${mins} min` : `${hours} hr`;
  }
  return `${minutes} min`;
}

function Reveal({ text, className }: { text: string; className?: string }) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <span className={className}>{text}</span>;
  }

  return (
    <motion.span
      className={cn("inline-block", className)}
      initial={{ opacity: 0, y: 8, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {text}
    </motion.span>
  );
}

export function AnimatedNumber({ value, className }: { value: number; className?: string }) {
  return <Reveal text={Math.round(value).toString()} className={className} />;
}

export function AnimatedTime({ minutes, className }: { minutes: number; className?: string }) {
  return <Reveal text={formatTime(Math.max(0, Math.round(minutes)))} className={className} />;
}
