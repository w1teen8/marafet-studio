"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown, Sparkles } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Counter from "@/components/ui/Counter";
import settings from "@/data/settings.json";

const HEADLINE = ["Краса,", "яка", "починається", "з деталей."];

const EASE = [0.16, 1, 0.3, 1] as const;

function parseStat(value: string) {
  const numeric = parseInt(value.replace(/\D/g, ""), 10) || 0;
  const suffix = value.replace(/[0-9]/g, "");
  return { numeric, suffix };
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.35, 0.75]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative flex h-[100svh] min-h-[720px] w-full items-end overflow-hidden bg-text-primary"
    >
      <motion.div style={{ y: imageY }} className="absolute inset-0 h-[122%] w-full">
        <Image
          src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1800&q=85&auto=format&fit=crop"
          alt="MARAFET STUDIO — beauty-студія у Боярці"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      <motion.div
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 bg-gradient-to-t from-[#12100f] via-[#12100f]/45 to-[#12100f]/10"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-transparent" />

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="animate-float-slow absolute right-[8%] top-[18%] h-64 w-64 rounded-full bg-accent/25 blur-[80px]" />
        <div className="animate-float-slower absolute left-[6%] top-[55%] h-72 w-72 rounded-full bg-gold/20 blur-[100px]" />
      </div>

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 w-full pb-14 pt-40 md:pb-20"
      >
        <Container>
          <div className="flex items-center gap-3">
            <Sparkles size={15} strokeWidth={1.5} className="text-gold" />
            <span className="text-xs uppercase tracking-[0.4em] text-white/70">
              {settings.city} · Beauty studio
            </span>
          </div>

          <h1 className="mt-8 font-display text-[13vw] font-medium leading-[0.98] tracking-tight text-white sm:text-[9vw] md:text-[6.4vw] lg:text-[5.6vw]">
            {HEADLINE.map((word, i) => (
              <span key={word} className="block overflow-hidden">
                <motion.span
                  initial={{ y: "115%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 1.1, ease: EASE, delay: 1.7 + i * 0.11 }}
                  className="block"
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 2.3 }}
            className="mt-8 grid gap-8 md:grid-cols-[1fr_auto] md:items-end md:gap-16"
          >
            <p className="max-w-lg text-balance text-base leading-relaxed text-white/75 md:text-lg">
              <strong className="font-medium text-white">MARAFET STUDIO</strong> —
              сучасна beauty-студія у Боярці. Манікюр, педикюр, стрижки,
              фарбування та професійний догляд в одному просторі.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Button href="#booking" size="lg" icon={<ArrowRight size={17} />}>
                Записатися
              </Button>
              <Button href="#portfolio" variant="outline" size="lg" className="border-white/30 text-white hover:border-white">
                Наші роботи
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 2.5 }}
            className="mt-16 grid grid-cols-2 gap-x-8 gap-y-8 border-t border-white/15 pt-8 sm:grid-cols-4"
          >
            {settings.stats.map((stat) => {
              const { numeric, suffix } = parseStat(stat.value);
              return (
                <div key={stat.label}>
                  <div className="font-display text-3xl font-medium text-white md:text-4xl">
                    <Counter value={numeric} suffix={suffix} />
                  </div>
                  <p className="mt-1 text-xs uppercase tracking-[0.18em] text-white/60">
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </motion.div>
        </Container>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/60 md:flex"
      >
        <span className="text-[0.65rem] uppercase tracking-[0.3em]">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={18} strokeWidth={1.3} />
        </motion.div>
      </motion.div>
    </section>
  );
}
