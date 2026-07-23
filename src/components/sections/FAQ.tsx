"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import faq from "@/data/faq.json";
import { cn } from "@/lib/utils";

export default function FAQ() {
  const [open, setOpen] = useState<string | null>(faq[0]?.id ?? null);

  return (
    <section id="faq" className="relative bg-bg py-28 md:py-36">
      <Container className="max-w-3xl">
        <SectionHeading kicker="FAQ" title="Питання, які нам ставлять найчастіше" align="center" />

        <div className="mt-14 divide-y divide-card-border border-t border-card-border">
          {faq.map((item, i) => {
            const isOpen = open === item.id;
            return (
              <Reveal key={item.id} delay={i * 0.05}>
                <div>
                  <button
                    onClick={() => setOpen(isOpen ? null : item.id)}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left"
                  >
                    <span className="font-display text-lg font-medium text-text-primary md:text-xl">
                      {item.question}
                    </span>
                    <span
                      className={cn(
                        "flex h-9 w-9 shrink-0 items-center justify-center rounded-full glass transition-transform duration-400",
                        isOpen && "rotate-45 bg-accent",
                      )}
                    >
                      <Plus size={16} strokeWidth={1.5} />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="pb-7 pr-14 text-[0.95rem] leading-relaxed text-text-secondary">
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
