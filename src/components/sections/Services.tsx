"use client";

import {
  ArrowRight,
  Eye,
  Footprints,
  Hand,
  Sparkles,
  Wand2,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import { useBooking } from "@/components/providers/BookingProvider";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import services from "@/data/services.json";

const ICONS: Record<string, LucideIcon> = {
  Eye,
  Sparkles,
  Hand,
  Footprints,
  Wand2,
};

export default function Services() {
  const { open: openBooking } = useBooking();

  return (
    <section id="services" className="relative bg-bg-secondary py-28 md:py-36">
      <Container>
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading
            kicker="Послуги"
            title="Наші послуги"
            description="Все для вашої краси в одному просторі."
          />
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {services.map((service, i) => {
            const Icon = ICONS[service.icon] ?? Sparkles;
            return (
              <Reveal key={service.id} delay={(i % 5) * 0.08}>
                <button
                  type="button"
                  onClick={openBooking}
                  className="group relative flex h-full w-full flex-col overflow-hidden rounded-28 glass text-left transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_25px_60px_rgba(23,23,23,0.1)]"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-text-primary/40 via-transparent to-transparent" />
                    <div className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-full glass-strong">
                      <Icon size={18} strokeWidth={1.4} className="text-text-primary" />
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-display text-xl font-medium text-text-primary">
                      {service.title}
                    </h3>
                    <ul className="mt-3 flex-1 space-y-1.5 text-sm leading-relaxed text-text-secondary">
                      {service.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                    <span className="mt-5 inline-flex items-center gap-1.5 border-t border-card-border pt-4 text-xs font-medium uppercase tracking-[0.1em] text-text-primary transition-colors group-hover:text-accent">
                      Детальніше
                      <ArrowRight
                        size={13}
                        strokeWidth={1.6}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </span>
                  </div>
                </button>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
