"use client";

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import InstagramIcon from "@/components/icons/InstagramGlyph";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import gallery from "@/data/gallery.json";
import settings from "@/data/settings.json";

const FEED = gallery.slice(0, 6);

export default function InstagramSection() {
  return (
    <section className="relative bg-bg-secondary py-28 md:py-36">
      <Container>
        <div className="flex flex-col items-center gap-5 text-center">
          <Reveal>
            <span className="inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.35em] text-text-secondary">
              <InstagramIcon size={14} strokeWidth={1.5} className="text-gold" />
              {settings.instagram}
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="font-display text-4xl font-medium tracking-tight text-text-primary sm:text-5xl">
              Слідкуйте за нами в Instagram
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <Button href={settings.instagramUrl} variant="primary" icon={<ArrowUpRight size={16} />}>
              Перейти в Instagram
            </Button>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
          {FEED.map((item, i) => (
            <Reveal key={item.id} delay={(i % 6) * 0.06}>
              <a
                href={settings.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="link"
                className="group relative block aspect-square overflow-hidden rounded-2xl"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 33vw, 16vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-text-primary/0 transition-colors duration-500 group-hover:bg-text-primary/40">
                  <InstagramIcon
                    size={22}
                    strokeWidth={1.4}
                    className="scale-75 text-white opacity-0 transition-all duration-500 group-hover:scale-100 group-hover:opacity-100"
                  />
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
