import { MapPin, Phone } from "lucide-react";
import InstagramGlyph from "@/components/icons/InstagramGlyph";
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

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-card-border bg-bg-secondary pt-20">
      <Container>
        <div className="grid gap-14 pb-16 md:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <span className="font-display text-2xl tracking-[0.15em] text-text-primary">
              MARAFET
              <span className="ml-2 text-xs font-normal uppercase tracking-[0.4em] text-text-secondary">
                Studio
              </span>
            </span>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-text-secondary">
              {settings.tagline}
            </p>
            <a
              href={settings.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="link"
              className="mt-6 inline-flex items-center gap-2 text-sm text-text-primary transition-colors hover:text-gold"
            >
              <InstagramGlyph size={16} strokeWidth={1.5} />
              {settings.instagram}
            </a>
          </div>

          <div>
            <p className="mb-5 text-xs uppercase tracking-[0.3em] text-text-secondary">
              Навігація
            </p>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-3">
              {LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-text-primary/80 transition-colors hover:text-text-primary"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-5 text-xs uppercase tracking-[0.3em] text-text-secondary">
              Контакти
            </p>
            <ul className="space-y-3 text-sm text-text-primary/80">
              <li className="flex items-center gap-2">
                <Phone size={15} strokeWidth={1.5} className="text-gold" />
                <a href={`tel:${settings.phone}`} className="hover:text-text-primary">
                  {settings.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={15} strokeWidth={1.5} className="text-gold" />
                {settings.address}
              </li>
              <li className="pt-1 text-text-secondary">{settings.workingHours}</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-card-border py-8 text-xs text-text-secondary md:flex-row">
          <p>© {new Date().getFullYear()} MARAFET STUDIO. Усі права захищено.</p>
          <p>Боярка, Київська область</p>
        </div>
      </Container>
    </footer>
  );
}
