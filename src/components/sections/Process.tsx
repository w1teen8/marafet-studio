"use client";

import { CalendarCheck, ClipboardList, Sparkles, Wand2, Wind } from "lucide-react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

const STEPS = [
  { icon: CalendarCheck, title: "Запис", text: "Обираєте зручну дату, час та майстра онлайн." },
  { icon: ClipboardList, title: "Консультація", text: "Обговорюємо побажання та підбираємо рішення." },
  { icon: Wand2, title: "Процедура", text: "Виконуємо роботу з увагою до кожної деталі." },
  { icon: Sparkles, title: "Результат", text: "Ви отримуєте бездоганний фінальний вигляд." },
  { icon: Wind, title: "Рекомендації", text: "Даємо поради з догляду для тривалого ефекту." },
];

export default function Process() {
  return (
    <section className="relative overflow-hidden bg-bg-secondary py-28 md:py-36">
      <Container>
        <SectionHeading
          kicker="Як це відбувається"
          title="П'ять кроків до ідеального образу"
          align="center"
          className="max-w-2xl"
        />

        <div className="relative mt-20">
          <div className="absolute left-6 top-0 hidden h-full w-px bg-card-border md:left-1/2 md:block lg:hidden" />
          <div className="absolute left-0 top-8 hidden w-full lg:block">
            <div className="mx-auto h-px w-[86%] bg-card-border" />
          </div>

          <div className="grid gap-10 md:grid-cols-1 lg:grid-cols-5">
            {STEPS.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.1} className="relative">
                <div className="flex items-start gap-5 lg:flex-col lg:items-center lg:text-center">
                  <div className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-bg text-text-primary ring-1 ring-card-border">
                    <step.icon size={22} strokeWidth={1.4} className="text-gold" />
                  </div>
                  <div>
                    <span className="font-display text-sm text-text-secondary">
                      0{i + 1}
                    </span>
                    <h3 className="mt-1 font-display text-xl font-medium text-text-primary">
                      {step.title}
                    </h3>
                    <p className="mt-2 max-w-[220px] text-sm leading-relaxed text-text-secondary lg:mx-auto">
                      {step.text}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
