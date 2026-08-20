"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Expand, Plus, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import gallery from "@/data/gallery.json";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  { id: "all", label: "Всі" },
  { id: "brows", label: "Брови" },
  { id: "lashes", label: "Вії" },
  { id: "manicure", label: "Манікюр" },
  { id: "pedicure", label: "Педикюр" },
  { id: "makeup", label: "Макіяж" },
];

const INITIAL_COUNT = 6;

export default function Portfolio() {
  const [active, setActive] = useState("all");
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = useMemo(
    () => gallery.filter((item) => active === "all" || item.category === active),
    [active],
  );

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  useEffect(() => {
    setVisibleCount(INITIAL_COUNT);
  }, [active]);

  const current = lightboxIndex !== null ? filtered[lightboxIndex] : null;

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight")
        setLightboxIndex((i) => (i === null ? null : (i + 1) % filtered.length));
      if (e.key === "ArrowLeft")
        setLightboxIndex((i) =>
          i === null ? null : (i - 1 + filtered.length) % filtered.length,
        );
    };
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightboxIndex, filtered.length]);

  return (
    <section id="portfolio" className="relative bg-bg py-28 md:py-36">
      <Container>
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
          <SectionHeading
            kicker="Портфоліо"
            title="Наші роботи"
            className="max-w-xl"
          />
        </div>

        <div className="no-scrollbar mt-12 flex gap-2 overflow-x-auto pb-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              className={cn(
                "shrink-0 rounded-btn border px-5 py-2.5 text-sm transition-colors duration-300",
                active === cat.id
                  ? "border-text-primary bg-text-primary text-bg"
                  : "border-card-border bg-transparent text-text-primary/70 hover:border-text-primary/40",
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <motion.div layout className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((item, i) => (
              <motion.button
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setLightboxIndex(i)}
                className="group relative block aspect-square w-full overflow-hidden rounded-28"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="pointer-events-none absolute inset-0 flex items-end bg-gradient-to-t from-text-primary/60 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-400 group-hover:opacity-100">
                  <span className="flex items-center gap-1.5 text-xs font-medium text-white">
                    <Expand size={12} strokeWidth={1.5} />
                    {item.title}
                  </span>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>

        {hasMore && (
          <div className="mt-10 text-center">
            <button
              type="button"
              onClick={() => setVisibleCount(filtered.length)}
              className="inline-flex items-center gap-2 rounded-btn border border-text-primary/25 px-7 py-3.5 text-sm font-medium text-text-primary transition-colors hover:border-text-primary/60"
            >
              <Plus size={15} strokeWidth={1.6} />
              Показати більше
            </button>
          </div>
        )}
      </Container>

      <AnimatePresence>
        {current && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] flex items-center justify-center bg-[#12100f]/92 p-4 backdrop-blur-md md:p-10"
            onClick={() => setLightboxIndex(null)}
          >
            <button
              aria-label="Закрити"
              onClick={() => setLightboxIndex(null)}
              className="glass-dark absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full text-white"
            >
              <X size={18} strokeWidth={1.5} />
            </button>

            <button
              aria-label="Попереднє фото"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((i) =>
                  i === null ? null : (i - 1 + filtered.length) % filtered.length,
                );
              }}
              className="glass-dark absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-white md:left-6"
            >
              <ChevronLeft size={20} strokeWidth={1.5} />
            </button>

            <motion.div
              key={current.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative aspect-[4/5] w-full max-w-2xl overflow-hidden rounded-28 md:aspect-[16/10] md:max-w-4xl"
            >
              <Image
                src={current.image}
                alt={current.title}
                fill
                sizes="90vw"
                className="object-cover"
              />
            </motion.div>

            <button
              aria-label="Наступне фото"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((i) => (i === null ? null : (i + 1) % filtered.length));
              }}
              className="glass-dark absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-white md:right-6"
            >
              <ChevronRight size={20} strokeWidth={1.5} />
            </button>

            <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-sm text-white/70">
              {current.title}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
