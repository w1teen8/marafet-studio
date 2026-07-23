"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Send } from "lucide-react";
import { useState, type FormEvent } from "react";
import BookingCalendar from "@/components/ui/BookingCalendar";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import services from "@/data/services.json";
import settings from "@/data/settings.json";
import team from "@/data/team.json";
import { cn } from "@/lib/utils";

const TIME_SLOTS = [
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
];

const DATE_FORMAT = new Intl.DateTimeFormat("uk-UA", {
  day: "numeric",
  month: "long",
});

type Status = "idle" | "success" | "error";

export default function Booking() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [instagram, setInstagram] = useState("");
  const [service, setService] = useState(services[0]?.title ?? "");
  const [master, setMaster] = useState("Не має значення");
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !date || !time) {
      setStatus("error");
      return;
    }
    const lines = [
      "Новий запис з сайту MARAFET STUDIO:",
      `Ім'я: ${name}`,
      `Телефон: ${phone}`,
      instagram && `Instagram: ${instagram}`,
      `Послуга: ${service}`,
      `Майстер: ${master}`,
      `Дата: ${DATE_FORMAT.format(date)}`,
      `Час: ${time}`,
      comment && `Коментар: ${comment}`,
    ].filter(Boolean);

    const whatsappPhone = settings.phone.replace(/\D/g, "");
    const whatsappUrl = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(lines.join("\n"))}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    setStatus("success");
  };

  if (status === "success") {
    return (
      <section id="booking" className="relative bg-bg py-28 md:py-36">
        <Container className="max-w-xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center gap-6 rounded-28 glass p-12"
          >
            <CheckCircle2 size={48} strokeWidth={1.2} className="text-gold" />
            <h3 className="font-display text-3xl font-medium text-text-primary">
              Дякуємо за запис!
            </h3>
            <p className="text-text-secondary">
              Ми відкрили WhatsApp з деталями вашого запису на{" "}
              {date && DATE_FORMAT.format(date)} о {time} — просто натисніть
              &laquo;Надіслати&raquo;, і ми підтвердимо візит.
            </p>
          </motion.div>
        </Container>
      </section>
    );
  }

  return (
    <section id="booking" className="relative bg-bg py-28 md:py-36">
      <Container>
        <SectionHeading
          kicker="Онлайн-запис"
          title="Забронюйте свій візит"
          description="Заповніть форму — і ми зв'яжемось з вами для підтвердження запису протягом робочого дня."
          align="center"
          className="mx-auto max-w-2xl"
        />

        <Reveal delay={0.1} className="mx-auto mt-16 max-w-4xl">
          <form
            onSubmit={handleSubmit}
            className="grid gap-6 rounded-28 glass p-6 md:grid-cols-2 md:p-10"
          >
            <Field label="Ім'я *">
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ваше ім'я"
                className="input"
              />
            </Field>

            <Field label="Телефон *">
              <input
                required
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+380 __ ___ __ __"
                className="input"
              />
            </Field>

            <Field label="Instagram">
              <input
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                placeholder="@ваш_нікнейм"
                className="input"
              />
            </Field>

            <Field label="Послуга">
              <select
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="input"
              >
                {services.map((s) => (
                  <option key={s.id} value={s.title}>
                    {s.title}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Майстер" className="md:col-span-2">
              <select
                value={master}
                onChange={(e) => setMaster(e.target.value)}
                className="input"
              >
                <option>Не має значення</option>
                {team.map((m) => (
                  <option key={m.id} value={m.name}>
                    {m.name} — {m.role}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Оберіть дату" className="md:col-span-2">
              <BookingCalendar value={date} onChange={setDate} />
            </Field>

            <Field label="Оберіть час" className="md:col-span-2">
              <div className="flex flex-wrap gap-2">
                {TIME_SLOTS.map((slot) => (
                  <button
                    type="button"
                    key={slot}
                    onClick={() => setTime(slot)}
                    className={cn(
                      "rounded-btn border px-4 py-2.5 text-sm transition-colors",
                      time === slot
                        ? "border-text-primary bg-text-primary text-bg"
                        : "border-card-border text-text-primary/80 hover:border-text-primary/50",
                    )}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </Field>

            <Field label="Коментар" className="md:col-span-2">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Побажання щодо процедури..."
                rows={3}
                className="input resize-none"
              />
            </Field>

            {status === "error" && (
              <p className="text-sm text-red-500 md:col-span-2">
                Будь ласка, заповніть ім&apos;я, телефон, дату та час.
              </p>
            )}

            <div className="md:col-span-2">
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2.5 rounded-btn bg-text-primary px-8 py-4.5 text-base font-medium text-bg transition-opacity hover:opacity-90"
              >
                <Send size={17} strokeWidth={1.5} />
                Записатися зараз
              </button>
            </div>
          </form>
        </Reveal>
      </Container>
    </section>
  );
}

function Field({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={cn("flex flex-col gap-2", className)}>
      <span className="text-xs uppercase tracking-[0.15em] text-text-secondary">
        {label}
      </span>
      {children}
    </label>
  );
}
