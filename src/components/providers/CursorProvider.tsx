"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState, useSyncExternalStore } from "react";

const QUERY = "(hover: hover) and (pointer: fine)";

function subscribe(callback: () => void) {
  const mql = window.matchMedia(QUERY);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getSnapshot() {
  return window.matchMedia(QUERY).matches;
}

function getServerSnapshot() {
  return false;
}

export default function CursorProvider() {
  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);
  const glowX = useSpring(rawX, { damping: 30, stiffness: 200, mass: 0.6 });
  const glowY = useSpring(rawY, { damping: 30, stiffness: 200, mass: 0.6 });
  const dotX = useSpring(rawX, { damping: 40, stiffness: 500, mass: 0.3 });
  const dotY = useSpring(rawY, { damping: 40, stiffness: 500, mass: 0.3 });

  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const enabled = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    if (!enabled) return;

    const move = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      setIsVisible(true);
      const target = e.target as HTMLElement;
      setIsPointer(!!target.closest("a, button, [data-cursor='link'], input, textarea, select"));
    };
    const leave = () => setIsVisible(false);

    window.addEventListener("mousemove", move);
    document.documentElement.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      document.documentElement.removeEventListener("mouseleave", leave);
    };
  }, [enabled, rawX, rawY]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        style={{ x: glowX, y: glowY }}
        animate={{ opacity: isVisible ? (isPointer ? 0.55 : 0.35) : 0 }}
        transition={{ opacity: { duration: 0.3 } }}
        className="pointer-events-none fixed left-0 top-0 z-[100] hidden md:block"
      >
        <div
          className="-ml-16 -mt-16 h-32 w-32 rounded-full blur-2xl"
          style={{
            background:
              "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
          }}
        />
      </motion.div>

      <motion.div
        style={{ x: dotX, y: dotY }}
        animate={{
          scale: isVisible ? (isPointer ? 2.2 : 1) : 0,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ scale: { type: "spring", stiffness: 300, damping: 22 } }}
        className="pointer-events-none fixed left-0 top-0 z-[100] hidden md:block"
      >
        <div className="-ml-[6px] -mt-[6px] h-3 w-3 rounded-full bg-text-primary" />
      </motion.div>
    </>
  );
}
