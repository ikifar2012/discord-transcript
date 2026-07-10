"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

function formatTime(totalSeconds: number): string {
  const seconds = Math.max(0, Math.round(totalSeconds));
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (secs === 0) {
    return `${hours} hr ${minutes} min`;
  }

  return `${hours} hr ${minutes} min ${secs} sec`;
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

export function AnimatedTime({ seconds, className }: { seconds: number; className?: string }) {
  return <Reveal text={formatTime(seconds)} className={className} />;
}
