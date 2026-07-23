"use client";

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import InstagramGlyph from "@/components/icons/InstagramGlyph";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import team from "@/data/team.json";

export default function Team() {
  return (
    <section id="team" className="relative bg-bg py-28 md:py-36">
      <Container>
        <SectionHeading
          kicker="Команда"
          title="Майстри, яким довіряють"
          description="Кожен спеціаліст студії — це поєднання досвіду, естетичного смаку та любові до деталей."
        />

        <div className="mt-16 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-5">
          {team.map((member, i) => (
            <Reveal key={member.id} delay={(i % 5) * 0.08}>
              <div className="group relative aspect-[3/4] overflow-hidden rounded-28">
                <Image
                  src={member.photo}
                  alt={member.name}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-text-primary/90 via-text-primary/10 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 flex flex-col p-5">
                  <h3 className="font-display text-xl font-medium text-white">
                    {member.name}
                  </h3>
                  <p className="mt-1 text-xs uppercase tracking-[0.1em] text-white/70">
                    {member.role}
                  </p>
                  <p className="text-xs text-white/50">{member.experience}</p>

                  <div className="mt-0 max-h-0 overflow-hidden opacity-0 transition-all duration-500 ease-out group-hover:mt-3 group-hover:max-h-32 group-hover:opacity-100">
                    <p className="text-xs leading-relaxed text-white/80">
                      {member.bio}
                    </p>
                    <div className="mt-4 flex items-center gap-3">
                      <a
                        href="#booking"
                        data-cursor="link"
                        className="inline-flex items-center gap-1.5 rounded-btn bg-white px-4 py-2 text-xs font-medium text-text-primary transition-colors hover:bg-accent"
                      >
                        Записатися
                        <ArrowUpRight size={13} strokeWidth={1.5} />
                      </a>
                      <a
                        href={`https://instagram.com`}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor="link"
                        aria-label={`Instagram ${member.name}`}
                        className="flex h-8 w-8 items-center justify-center rounded-full glass-strong text-white"
                      >
                        <InstagramGlyph size={14} strokeWidth={1.5} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
