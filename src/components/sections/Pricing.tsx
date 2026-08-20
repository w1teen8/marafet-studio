"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Plus, Star } from "lucide-react";
import { useState } from "react";
import { useBooking } from "@/components/providers/BookingProvider";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import prices from "@/data/prices.json";
import { cn } from "@/lib/utils";

export default function Pricing() {
  const [open, setOpen] = useState<string | null>(prices[0]?.id ?? null);
  const { open: openBooking } = useBooking();

  return (
    <section id="price" className="relative bg-bg py-28 md:py-36">
      <Container className="max-w-3xl">
        <SectionHeading
          kicker="Прайс"
          title="Прозорі ціни без сюрпризів"
          description="Фінальна вартість залежить від складності роботи та обраних матеріалів — майстер озвучить її на консультації."
          align="center"
        />

        <div className="mt-14 divide-y divide-card-border border-t border-b border-card-border">
          {prices.map((category, i) => {
            const isOpen = open === category.id;
            return (
              <Reveal key={category.id} delay={i * 0.05}>
                <div>
                  <button
                    onClick={() => setOpen(isOpen ? null : category.id)}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left"
                  >
                    <span className="font-display text-xl font-medium text-text-primary md:text-2xl">
                      {category.title}
                    </span>
                    <span
                      className={cn(
                        "flex h-9 w-9 shrink-0 items-center justify-center rounded-full glass transition-transform duration-400",
                        isOpen && "rotate-45 bg-accent/25",
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
                        <div className="flex flex-col gap-4 pb-8">
                          {category.items.map((item) => (
                            <div key={item.name} className="flex items-baseline gap-3">
                              <span className="flex items-center gap-1.5 text-sm text-text-primary">
                                {item.name}
                                {item.popular && (
                                  <Star
                                    size={12}
                                    className="fill-accent text-accent"
                                    strokeWidth={0}
                                  />
                                )}
                              </span>
                              <span className="h-px flex-1 border-b border-dotted border-card-border" />
                              <span className="whitespace-nowrap text-sm font-medium text-text-primary">
                                {item.price}
                              </span>
                            </div>
                          ))}
                          <button
                            type="button"
                            onClick={openBooking}
                            className="mt-2 self-start rounded-btn border border-text-primary/25 px-6 py-3 text-sm font-medium text-text-primary transition-colors hover:border-text-primary/60"
                          >
                            Записатися
                          </button>
                        </div>
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
