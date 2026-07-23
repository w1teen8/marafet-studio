"use client";

import {
  ArrowUpRight,
  Droplets,
  Footprints,
  Gem,
  Hand,
  Leaf,
  Palette,
  Scissors,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import services from "@/data/services.json";

const ICONS: Record<string, LucideIcon> = {
  Hand,
  Footprints,
  Scissors,
  Palette,
  Droplets,
  Leaf,
  Gem,
  Sparkles,
};

export default function Services() {
  return (
    <section id="services" className="relative bg-bg-secondary py-28 md:py-36">
      <Container>
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading
            kicker="Послуги"
            title="Кожна деталь має значення"
            description="Від класичного манікюру до складного колорування — всі процедури виконуються дипломованими майстрами з використанням преміальних матеріалів."
          />
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => {
            const Icon = ICONS[service.icon] ?? Sparkles;
            return (
              <Reveal key={service.id} delay={(i % 4) * 0.08}>
                <a
                  href="#booking"
                  data-cursor="link"
                  className="group relative flex h-full flex-col overflow-hidden rounded-28 glass transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_25px_60px_rgba(45,42,41,0.14)]"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-text-primary/50 via-transparent to-transparent" />
                    <div className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-full glass-strong">
                      <Icon size={18} strokeWidth={1.4} className="text-text-primary" />
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-display text-xl font-medium text-text-primary">
                        {service.title}
                      </h3>
                      <ArrowUpRight
                        size={18}
                        strokeWidth={1.4}
                        className="mt-1 shrink-0 text-text-secondary transition-all duration-300 group-hover:rotate-45 group-hover:text-gold"
                      />
                    </div>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-text-secondary">
                      {service.description}
                    </p>
                    <div className="mt-5 flex items-center justify-between border-t border-card-border pt-4 text-xs">
                      <span className="uppercase tracking-[0.1em] text-text-secondary">
                        {service.duration}
                      </span>
                      <span className="font-medium text-text-primary">
                        від {service.priceFrom} ₴
                      </span>
                    </div>
                  </div>
                </a>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
