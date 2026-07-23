"use client";

import {
  BadgeCheck,
  CalendarClock,
  Gem,
  Heart,
  Leaf,
  ShieldCheck,
  Sparkle,
  Wrench,
} from "lucide-react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

const ITEMS = [
  { icon: BadgeCheck, title: "Дипломовані спеціалісти" },
  { icon: ShieldCheck, title: "Безпечна стерильність" },
  { icon: Gem, title: "Якісні матеріали" },
  { icon: Heart, title: "Індивідуальний підхід" },
  { icon: Leaf, title: "Комфортна атмосфера" },
  { icon: Sparkle, title: "Преміальний сервіс" },
  { icon: Wrench, title: "Сучасне обладнання" },
  { icon: CalendarClock, title: "Онлайн запис" },
];

export default function WhyUs() {
  return (
    <section className="relative bg-bg py-28 md:py-36">
      <Container>
        <SectionHeading
          kicker="Чому обирають нас"
          title="Стандарт якості в кожній деталі"
          align="center"
          className="max-w-2xl"
        />

        <div className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-4">
          {ITEMS.map((item, i) => (
            <Reveal key={item.title} delay={(i % 4) * 0.07}>
              <div className="group flex h-full flex-col items-center gap-4 rounded-28 glass p-7 text-center transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_20px_45px_rgba(45,42,41,0.1)]">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/40 text-text-primary transition-colors duration-500 group-hover:bg-gold/25">
                  <item.icon size={22} strokeWidth={1.4} />
                </span>
                <p className="text-sm font-medium leading-snug text-text-primary">
                  {item.title}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
