"use client";

import { ArrowUpRight, Clock, MapPin, Phone } from "lucide-react";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import settings from "@/data/settings.json";

export default function Location() {
  return (
    <section id="contacts" className="relative bg-bg-secondary py-28 md:py-36">
      <Container>
        <SectionHeading
          kicker="Локація"
          title="Знайдіть нас у Боярці"
          className="max-w-xl"
        />

        <Reveal delay={0.1} className="relative mt-14">
          <div className="relative h-[420px] w-full overflow-hidden rounded-28 md:h-[560px]">
            <iframe
              title="MARAFET STUDIO на карті"
              src={settings.mapEmbedUrl}
              className="h-full w-full grayscale-[15%]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-card-border" />
          </div>

          <div className="relative mx-auto -mt-16 w-[calc(100%-2rem)] max-w-md rounded-28 glass-strong p-8 md:absolute md:bottom-8 md:left-8 md:mt-0 md:w-full">
            <p className="font-display text-2xl font-medium text-text-primary">
              MARAFET STUDIO
            </p>
            <ul className="mt-5 space-y-3 text-sm text-text-primary/85">
              <li className="flex items-start gap-3">
                <MapPin size={16} strokeWidth={1.5} className="mt-0.5 shrink-0 text-gold" />
                {settings.address}
              </li>
              <li className="flex items-center gap-3">
                <Clock size={16} strokeWidth={1.5} className="shrink-0 text-gold" />
                {settings.workingHours}
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} strokeWidth={1.5} className="shrink-0 text-gold" />
                <a href={`tel:${settings.phone}`} className="hover:text-gold">
                  {settings.phoneDisplay}
                </a>
              </li>
            </ul>
            <Button
              href={settings.mapUrl}
              size="md"
              className="mt-7 w-full justify-center"
              icon={<ArrowUpRight size={15} />}
            >
              Прокласти маршрут
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
