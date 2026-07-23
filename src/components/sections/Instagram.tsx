"use client";

import { ArrowUpRight } from "lucide-react";
import InstagramIcon from "@/components/icons/InstagramGlyph";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import settings from "@/data/settings.json";

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
      </Container>
    </section>
  );
}
