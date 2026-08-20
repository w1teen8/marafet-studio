"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import Container from "@/components/ui/Container";
import MasterModal from "@/components/ui/MasterModal";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import settings from "@/data/settings.json";
import team from "@/data/team.json";

export default function Masters() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = team.find((m) => m.id === selectedId) ?? null;

  return (
    <section id="masters" className="relative bg-bg-secondary py-28 md:py-36">
      <Container>
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading
            kicker="Наші майстри"
            title="Професіонали своєї справи"
            className="max-w-xl"
          />
          <a
            href={settings.facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden shrink-0 items-center gap-2 text-sm font-medium text-text-primary transition-colors hover:text-accent md:inline-flex"
          >
            Переглянути всіх майстрів
            <ArrowRight size={15} strokeWidth={1.6} />
          </a>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-8 sm:grid-cols-4">
          {team.map((member, i) => (
            <Reveal key={member.id} delay={i * 0.08}>
              <button
                type="button"
                onClick={() => setSelectedId(member.id)}
                className="group flex w-full flex-col items-center text-center"
              >
                <div className="relative aspect-square w-full max-w-[180px] overflow-hidden rounded-full">
                  <Image
                    src={member.photo}
                    alt={member.name}
                    fill
                    sizes="(max-width: 640px) 40vw, 180px"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                </div>
                <h3 className="mt-5 font-display text-lg font-medium text-text-primary">
                  {member.name}
                </h3>
                <p className="mt-1 text-sm text-text-secondary">{member.role}</p>
                <span className="mt-3 text-xs font-medium uppercase tracking-[0.1em] text-text-primary underline decoration-card-border underline-offset-4 transition-colors group-hover:text-accent group-hover:decoration-accent">
                  Про майстра
                </span>
              </button>
            </Reveal>
          ))}
        </div>

        <a
          href={settings.facebookUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 flex items-center justify-center gap-2 text-sm font-medium text-text-primary transition-colors hover:text-accent md:hidden"
        >
          Переглянути всіх майстрів
          <ArrowRight size={15} strokeWidth={1.6} />
        </a>
      </Container>

      <MasterModal member={selected} onClose={() => setSelectedId(null)} />
    </section>
  );
}
