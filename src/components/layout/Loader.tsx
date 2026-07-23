"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const EASE = [0.65, 0, 0.35, 1] as const;

export default function Loader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    root.style.overflow = "hidden";

    const start = performance.now();
    const duration = 1700;
    let raf = 0;

    const tick = (now: number) => {
      const elapsed = now - start;
      const pct = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(pct);
      if (pct < 100) {
        raf = requestAnimationFrame(tick);
      } else {
        window.setTimeout(() => {
          setDone(true);
          root.style.overflow = "";
        }, 350);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ opacity: 0, filter: "blur(14px)" }}
          transition={{ duration: 0.85, ease: EASE }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-bg"
        >
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-accent/25 blur-[90px]" />
            <div className="absolute -right-16 bottom-1/4 h-80 w-80 rounded-full bg-gold/20 blur-[100px]" />
          </div>

          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1.1, ease: EASE, delay: 0.15 }}
              className="font-display text-[15vw] font-medium leading-none tracking-tight text-text-primary md:text-[6.5vw]"
            >
              MARAFET
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-2 text-[0.7rem] uppercase tracking-[0.55em] text-text-secondary"
          >
            Studio
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-10 flex items-center gap-4"
          >
            <span className="h-px w-10 bg-card-border" />
            <span className="w-10 text-center font-sans text-sm tabular-nums text-text-secondary">
              {progress}%
            </span>
            <span className="h-px w-10 bg-card-border" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
