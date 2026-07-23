"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import InstagramGlyph from "@/components/icons/InstagramGlyph";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import settings from "@/data/settings.json";

const LINKS = [
  { href: "#home", label: "Головна" },
  { href: "#services", label: "Послуги" },
  { href: "#portfolio", label: "Портфоліо" },
  { href: "#about", label: "Про студію" },
  { href: "#team", label: "Команда" },
  { href: "#reviews", label: "Відгуки" },
  { href: "#faq", label: "FAQ" },
  { href: "#contacts", label: "Контакти" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? "py-3" : "py-6"
        }`}
      >
        <div
          className={`pointer-events-none absolute inset-0 transition-all duration-500 ${
            scrolled ? "glass opacity-100" : "opacity-0"
          }`}
        />
        <Container className="relative flex items-center justify-between">
          <a
            href="#home"
            data-cursor="link"
            className="font-display text-lg font-medium tracking-[0.15em] text-text-primary md:text-xl"
          >
            MARAFET
            <span className="ml-2 hidden text-[0.6rem] font-normal uppercase tracking-[0.4em] text-text-secondary sm:inline">
              Studio
            </span>
          </a>

          <nav className="hidden items-center gap-8 lg:flex">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                data-cursor="link"
                className="relative text-[0.82rem] uppercase tracking-[0.12em] text-text-primary/80 transition-colors hover:text-text-primary after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-gold after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Button href="#booking" size="md">
              Записатися
            </Button>
          </div>

          <button
            aria-label="Меню"
            onClick={() => setOpen(true)}
            className="flex h-11 w-11 items-center justify-center rounded-full glass lg:hidden"
          >
            <Menu size={18} strokeWidth={1.5} />
          </button>
        </Container>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[110] flex flex-col bg-bg lg:hidden"
          >
            <Container className="flex items-center justify-between py-6">
              <span className="font-display text-lg tracking-[0.15em] text-text-primary">
                MARAFET
              </span>
              <button
                aria-label="Закрити меню"
                onClick={() => setOpen(false)}
                className="flex h-11 w-11 items-center justify-center rounded-full glass"
              >
                <X size={18} strokeWidth={1.5} />
              </button>
            </Container>

            <nav className="flex flex-1 flex-col justify-center gap-2 px-8">
              {LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.5 }}
                  className="border-b border-card-border py-4 font-display text-3xl text-text-primary"
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>

            <Container className="flex items-center justify-between py-8">
              <a
                href={settings.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-text-secondary"
              >
                <InstagramGlyph size={16} strokeWidth={1.5} />
                {settings.instagram}
              </a>
              <div onClick={() => setOpen(false)}>
                <Button href="#booking" size="md">
                  Записатися
                </Button>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
