"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CalendarCheck } from "lucide-react";
import { useEffect, useState } from "react";

export default function StickyBookingButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href="#booking"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-5 left-1/2 z-40 flex w-[calc(100%-2.5rem)] -translate-x-1/2 items-center justify-center gap-2 rounded-btn bg-text-primary px-6 py-4 text-sm font-medium text-bg shadow-[0_12px_30px_rgba(0,0,0,0.18)] sm:hidden"
        >
          <CalendarCheck size={17} strokeWidth={1.5} />
          Записатися онлайн
        </motion.a>
      )}
    </AnimatePresence>
  );
}
