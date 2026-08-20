"use client";

import { Gem, Heart, ShieldCheck, Sparkles } from "lucide-react";
import Image from "next/image";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";

const POINTS = [
  { icon: Heart, title: "Індивідуальний підхід до кожного" },
  { icon: Sparkles, title: "Сучасні техніки та тренди" },
  { icon: ShieldCheck, title: "Стерильність та безпека" },
  { icon: Gem, title: "Затишна атмосфера та турбота" },
];

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-text-primary py-28 md:py-36">
      <Container>
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal className="relative aspect-[4/3] w-full overflow-hidden rounded-28 lg:aspect-auto">
            <Image
              src="https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?w=1200&q=80&auto=format&fit=crop"
              alt="Інтер'єр студії MARAFET STUDIO"
              fill
              sizes="(max-width: 1024px) 90vw, 45vw"
              className="object-cover"
            />
          </Reveal>

          <div className="flex flex-col justify-center">
            <span className="mb-5 inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.35em] text-white/50">
              <span className="h-px w-8 bg-accent" />
              Про студію
            </span>

            <Reveal delay={0.05}>
              <h2 className="font-display italic text-4xl font-medium leading-[1.1] tracking-tight text-white sm:text-5xl">
                Marafet Studio — це про якість і стиль
              </h2>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-7 max-w-md text-balance text-base leading-relaxed text-white/65 md:text-lg">
                Ми створили простір, де кожна деталь продумана для вашого
                комфорту та краси. Наші майстри постійно підвищують
                кваліфікацію та слідкують за трендами, щоб ви завжди
                виглядали бездоганно.
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <Button href="#services" variant="accent" className="mt-8">
                Дізнатися більше
              </Button>
            </Reveal>

            <div className="mt-14 grid gap-x-8 gap-y-7 sm:grid-cols-2">
              {POINTS.map((point, i) => (
                <Reveal key={point.title} delay={0.06 * i}>
                  <div className="flex items-start gap-3">
                    <point.icon size={20} strokeWidth={1.4} className="mt-0.5 shrink-0 text-accent" />
                    <p className="text-sm leading-relaxed text-white/80">
                      {point.title}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
