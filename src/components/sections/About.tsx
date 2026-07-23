"use client";

import { motion } from "framer-motion";
import { Award, Gem, HeartHandshake } from "lucide-react";
import Image from "next/image";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";

const POINTS = [
  {
    icon: Award,
    title: "Дипломовані майстри",
    text: "Кожен спеціаліст студії проходить регулярне навчання та підвищення кваліфікації.",
  },
  {
    icon: Gem,
    title: "Преміальні матеріали",
    text: "Працюємо тільки з сертифікованими професійними брендами.",
  },
  {
    icon: HeartHandshake,
    title: "Індивідуальний підхід",
    text: "Кожна процедура підбирається під ваші побажання та особливості.",
  },
];

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-bg py-28 md:py-36">
      <Container>
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
          <div className="relative">
            <Reveal className="relative aspect-[4/5] w-full max-w-lg overflow-hidden rounded-28">
              <Image
                src="https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?w=1000&q=80&auto=format&fit=crop"
                alt="Інтер'єр студії MARAFET"
                fill
                sizes="(max-width: 1024px) 90vw, 40vw"
                className="object-cover"
              />
            </Reveal>

            <Reveal
              delay={0.25}
              className="absolute -bottom-10 -right-4 w-[52%] max-w-[260px] overflow-hidden rounded-28 border-4 border-bg shadow-[0_20px_50px_rgba(45,42,41,0.18)] sm:-right-10"
            >
              <div className="relative aspect-square w-full">
                <Image
                  src="https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=700&q=80&auto=format&fit=crop"
                  alt="Доглядова процедура MARAFET STUDIO"
                  fill
                  sizes="(max-width: 1024px) 45vw, 20vw"
                  className="object-cover"
                />
              </div>
            </Reveal>

            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
              className="absolute -left-6 -top-6 hidden h-28 w-28 items-center justify-center rounded-full glass md:flex"
            >
              <svg viewBox="0 0 100 100" className="h-full w-full p-3">
                <path
                  id="about-circle"
                  fill="none"
                  d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                />
                <text className="fill-text-secondary text-[8px] uppercase tracking-[0.15em]">
                  <textPath href="#about-circle">
                    Marafet Studio • Краса та турбота •
                  </textPath>
                </text>
              </svg>
            </motion.div>
          </div>

          <div className="flex flex-col justify-center">
            <span className="mb-5 inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.35em] text-text-secondary">
              <span className="h-px w-8 bg-gold" />
              Про студію
            </span>

            <Reveal delay={0.05}>
              <h2 className="font-display text-4xl font-medium leading-[1.1] tracking-tight text-text-primary sm:text-5xl">
                Простір, де краса
                <br />
                поєднується з комфортом
              </h2>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-7 text-balance text-base leading-relaxed text-text-secondary md:text-lg">
                MARAFET STUDIO — це місце, де краса поєднується з комфортом. Ми
                створили простір, у якому кожен клієнт почувається спокійно,
                отримує індивідуальний підхід та сервіс преміального рівня.
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <p className="mt-4 text-balance text-base leading-relaxed text-text-secondary md:text-lg">
                Приємна атмосфера, дипломовані спеціалісти та безпечна
                процедура — наш пріоритет у кожній деталі, від першого дзвінка
                до фінального результату.
              </p>
            </Reveal>

            <div className="mt-12 grid gap-8 sm:grid-cols-3">
              {POINTS.map((point, i) => (
                <Reveal key={point.title} delay={0.1 * i}>
                  <point.icon size={22} strokeWidth={1.4} className="text-gold" />
                  <p className="mt-4 text-sm font-medium text-text-primary">
                    {point.title}
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-text-secondary">
                    {point.text}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
