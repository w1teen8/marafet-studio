"use client";

import { motion } from "framer-motion";
import { ArrowRight, CalendarCheck, Gem, Leaf, Sparkles, User } from "lucide-react";
import Image from "next/image";
import { useBooking } from "@/components/providers/BookingProvider";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { withBasePath } from "@/lib/utils";

const HEADLINE = ["Краса,", "яка починається", "з деталей."];

const EASE = [0.16, 1, 0.3, 1] as const;

const ADVANTAGES = [
  { icon: User, title: "Індивідуальний підхід" },
  { icon: Leaf, title: "Якісні матеріали преміум-класу" },
  { icon: Gem, title: "Досвідчені майстри" },
  { icon: CalendarCheck, title: "Зручний запис онлайн" },
];

export default function Hero() {
  const { open: openBooking } = useBooking();

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-bg pb-16 pt-32 md:pb-24 md:pt-40"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="animate-float-slow absolute right-[6%] top-[10%] h-72 w-72 rounded-full bg-accent/20 blur-[100px]" />
        <div className="animate-float-slower absolute left-[4%] top-[55%] h-64 w-64 rounded-full bg-accent/15 blur-[90px]" />
      </div>

      <Container className="relative">
        <div className="grid items-center gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.4em] text-text-secondary"
            >
              MARAFET STUDIO
            </motion.span>

            <h1 className="mt-7 font-display text-[13vw] font-medium leading-[1.02] tracking-tight text-text-primary sm:text-6xl md:text-7xl lg:text-[4.6vw]">
              {HEADLINE.map((line, i) => (
                <span key={line} className="block overflow-hidden">
                  <motion.span
                    initial={{ y: "115%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 1, ease: EASE, delay: 0.3 + i * 0.11 }}
                    className={i === HEADLINE.length - 1 ? "block italic" : "block"}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.85 }}
              className="mt-7 max-w-md text-balance text-base leading-relaxed text-text-secondary md:text-lg"
            >
              Beauty-студія з індивідуальним підходом та турботою про ваш
              образ.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 1 }}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <Button onClick={openBooking} size="lg" icon={<ArrowRight size={17} />}>
                Записатися
              </Button>
              <Button href="#about" variant="outline" size="lg">
                Дізнатися більше
              </Button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: EASE, delay: 0.3 }}
            className="relative"
          >
            <div className="absolute -inset-6 -z-10 rounded-[3rem] bg-accent/15 blur-2xl" />
            <div className="relative h-[494px] w-full overflow-hidden rounded-28 sm:h-[572px] lg:h-[650px]">
              <Image
                src={withBasePath("/images/hero-portrait.jpg")}
                alt="MARAFET STUDIO — beauty-студія у Боярці"
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 45vw"
                className="object-cover"
              />
            </div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
              className="absolute -left-8 -top-8 hidden h-28 w-28 items-center justify-center rounded-full border border-card-border bg-bg shadow-[0_10px_30px_rgba(23,23,23,0.1)] md:flex"
            >
              <svg viewBox="0 0 100 100" className="h-full w-full p-2.5">
                <path
                  id="hero-badge-circle"
                  fill="none"
                  d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                />
                <text className="fill-text-secondary text-[7.5px] uppercase tracking-[0.15em]">
                  <textPath href="#hero-badge-circle">
                    Marafet Studio • Краса в деталях •
                  </textPath>
                </text>
                <circle cx="50" cy="50" r="24" fill="none" className="stroke-card-border" strokeWidth="1" />
              </svg>
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
                className="absolute flex h-11 w-11 items-center justify-center rounded-full bg-accent/12"
              >
                <Sparkles size={22} strokeWidth={1.2} className="text-accent" />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 1.2 }}
          className="mt-16 grid grid-cols-2 gap-x-8 gap-y-8 border-t border-card-border pt-10 sm:grid-cols-4 md:mt-24"
        >
          {ADVANTAGES.map((item) => (
            <div key={item.title} className="flex items-center gap-3">
              <item.icon size={20} strokeWidth={1.4} className="shrink-0 text-accent" />
              <p className="text-sm font-medium leading-snug text-text-primary">
                {item.title}
              </p>
            </div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
