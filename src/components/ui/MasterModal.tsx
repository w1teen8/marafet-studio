"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, X } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";
import { useBooking } from "@/components/providers/BookingProvider";
import gallery from "@/data/gallery.json";
import type { TeamMember } from "@/types";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function MasterModal({
  member,
  onClose,
}: {
  member: TeamMember | null;
  onClose: () => void;
}) {
  const { open: openBooking } = useBooking();

  useEffect(() => {
    if (!member) return;
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [member, onClose]);

  const works = member
    ? gallery.filter((item) => member.categories.includes(item.category)).slice(0, 6)
    : [];

  return (
    <AnimatePresence>
      {member && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[120] flex items-center justify-center bg-text-primary/50 p-4 backdrop-blur-sm md:p-8"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.45, ease: EASE }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-28 border border-card-border bg-bg-secondary p-6 shadow-[0_30px_80px_rgba(23,23,23,0.25)] md:p-10"
          >
            <button
              type="button"
              aria-label="Закрити"
              onClick={onClose}
              className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full glass"
            >
              <X size={17} strokeWidth={1.5} />
            </button>

            <div className="flex flex-col items-center gap-5 text-center sm:flex-row sm:items-center sm:text-left">
              <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-full">
                <Image
                  src={member.photo}
                  alt={member.name}
                  fill
                  sizes="112px"
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="font-display text-2xl font-medium text-text-primary md:text-3xl">
                  {member.name}
                </h3>
                <p className="mt-1 text-sm text-text-secondary">{member.role}</p>
                <span className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-card-border px-3 py-1 text-xs text-text-secondary">
                  {member.experience}
                </span>
              </div>
            </div>

            <p className="mt-7 text-balance text-sm leading-relaxed text-text-secondary md:text-base">
              {member.bio}
            </p>

            {works.length > 0 && (
              <div className="mt-9">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-text-secondary">
                  Роботи майстра
                </p>
                <div className="mt-4 grid grid-cols-3 gap-3">
                  {works.map((item) => (
                    <div
                      key={item.id}
                      className="relative aspect-square overflow-hidden rounded-2xl"
                    >
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="200px"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button
              type="button"
              onClick={() => {
                onClose();
                openBooking();
              }}
              className="mt-9 flex w-full items-center justify-center gap-2.5 rounded-btn bg-text-primary px-8 py-4 text-base font-medium text-bg transition-opacity hover:opacity-90 sm:w-auto"
            >
              Записатися до {member.name}
              <ArrowRight size={16} strokeWidth={1.6} />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
