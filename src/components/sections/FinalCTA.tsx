"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useBooking } from "@/components/providers/BookingProvider";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";

const WORDS = ["Готові", "до", "змін?"];

export default function FinalCTA() {
  const { open: openBooking } = useBooking();

  return (
    <section className="relative flex min-h-[60vh] items-center overflow-hidden bg-text-primary py-28">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1470259078422-826894b933aa?w=1800&q=80&auto=format&fit=crop"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-text-primary via-text-primary/85 to-text-primary" />
      </div>

      <div className="pointer-events-none absolute inset-0">
        <div className="animate-float-slow absolute left-[10%] top-[15%] h-72 w-72 rounded-full bg-accent/20 blur-[100px]" />
        <div className="animate-float-slower absolute bottom-[10%] right-[8%] h-80 w-80 rounded-full bg-accent/15 blur-[110px]" />
      </div>

      <Container className="relative z-10 text-center">
        <h2 className="mx-auto max-w-3xl font-display text-4xl font-medium leading-[1.08] tracking-tight text-white sm:text-6xl md:text-7xl">
          {WORDS.map((word, i) => (
            <motion.span
              key={word}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.6 }}
              className="mr-4 inline-block overflow-hidden last:mr-0"
            >
              <motion.span
                variants={{ hidden: { y: "110%" }, visible: { y: "0%" } }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
                className="inline-block"
              >
                {word}
              </motion.span>
            </motion.span>
          ))}
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="mx-auto mt-6 max-w-md text-balance text-base leading-relaxed text-white/70 md:text-lg"
        >
          Запишіться на процедуру та подаруйте собі час для себе.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-10"
        >
          <Button onClick={openBooking} size="lg" variant="accent" icon={<ArrowRight size={18} />}>
            Записатися
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}
