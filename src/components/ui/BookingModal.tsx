"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Send, X } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import { useBooking } from "@/components/providers/BookingProvider";
import BookingCalendar from "@/components/ui/BookingCalendar";
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
];

const DATE_FORMAT = new Intl.DateTimeFormat("uk-UA", {
  day: "numeric",
  month: "long",
});

const UA_PHONE = /^(\+380\d{9}|0\d{9})$/;

const EASE = [0.16, 1, 0.3, 1] as const;

export default function BookingModal() {
  const { isOpen, close } = useBooking();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [service, setService] = useState(services[0]?.title ?? "");
  const [master, setMaster] = useState("Не має значення");
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, close]);

  const resetForm = () => {
    setName("");
    setPhone("");
    setPhoneError(null);
    setService(services[0]?.title ?? "");
    setMaster("Не має значення");
    setDate(null);
    setTime(null);
    setFormError(null);
    setSuccess(false);
  };

  const handleClose = () => {
    close();
    window.setTimeout(resetForm, 300);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const normalizedPhone = phone.replace(/[\s()-]/g, "");

    if (!UA_PHONE.test(normalizedPhone)) {
      setPhoneError("Вкажіть номер у форматі +380XXXXXXXXX або 0XXXXXXXXX");
      return;
    }
    setPhoneError(null);

    if (!name || !date || !time) {
      setFormError("Будь ласка, заповніть ім'я, дату та час.");
      return;
    }
    setFormError(null);

    const lines = [
      "Новий запис з сайту MARAFET STUDIO:",
      `Ім'я: ${name}`,
      `Телефон: ${normalizedPhone}`,
      `Послуга: ${service}`,
      `Майстер: ${master}`,
      `Дата: ${date ? DATE_FORMAT.format(date) : ""}`,
      `Час: ${time}`,
    ].filter(Boolean);

    const whatsappPhone = settings.phone.replace(/\D/g, "");
    const whatsappUrl = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    setSuccess(true);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[120] flex items-center justify-center bg-text-primary/50 p-4 backdrop-blur-sm md:p-8"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.45, ease: EASE }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-28 border border-card-border bg-bg-secondary p-6 shadow-[0_30px_80px_rgba(23,23,23,0.25)] md:p-10"
          >
            <button
              type="button"
              aria-label="Закрити"
              onClick={handleClose}
              className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full glass"
            >
              <X size={17} strokeWidth={1.5} />
            </button>

            {success ? (
              <div className="flex flex-col items-center gap-5 py-10 text-center">
                <CheckCircle2 size={46} strokeWidth={1.2} className="text-accent" />
                <h3 className="font-display text-3xl font-medium text-text-primary">
                  Дякуємо!
                </h3>
                <p className="max-w-sm text-text-secondary">
                  Дякуємо! Ми зв&apos;яжемося з вами для підтвердження запису.
                </p>
                <button
                  type="button"
                  onClick={handleClose}
                  className="mt-2 rounded-btn bg-text-primary px-7 py-3.5 text-sm font-medium text-bg transition-opacity hover:opacity-90"
                >
                  Закрити
                </button>
              </div>
            ) : (
              <>
                <span className="mb-3 inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.35em] text-text-secondary">
                  <span className="h-px w-8 bg-accent" />
                  Онлайн-запис
                </span>
                <h3 className="font-display text-3xl font-medium text-text-primary md:text-4xl">
                  Забронюйте візит
                </h3>

                <form onSubmit={handleSubmit} className="mt-8 grid gap-5 md:grid-cols-2">
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
                      onChange={(e) => {
                        setPhone(e.target.value);
                        if (phoneError) setPhoneError(null);
                      }}
                      placeholder="+380 __ ___ __ __"
                      className="input"
                    />
                    {phoneError && (
                      <span className="text-xs text-red-500">{phoneError}</span>
                    )}
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

                  <Field label="Майстер">
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

                  <Field label="Бажана дата" className="md:col-span-2">
                    <BookingCalendar value={date} onChange={setDate} />
                  </Field>

                  <Field label="Бажаний час" className="md:col-span-2">
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

                  {formError && (
                    <p className="text-sm text-red-500 md:col-span-2">{formError}</p>
                  )}

                  <div className="md:col-span-2">
                    <button
                      type="submit"
                      className="flex w-full items-center justify-center gap-2.5 rounded-btn bg-text-primary px-8 py-4 text-base font-medium text-bg transition-opacity hover:opacity-90"
                    >
                      <Send size={17} strokeWidth={1.5} />
                      Підтвердити запис
                    </button>
                  </div>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
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
