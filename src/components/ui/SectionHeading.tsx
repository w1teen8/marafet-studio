import { cn } from "@/lib/utils";
import Reveal from "./Reveal";

export default function SectionHeading({
  kicker,
  title,
  description,
  align = "left",
  className,
}: {
  kicker?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {kicker && (
        <Reveal>
          <span className="mb-5 inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.35em] text-text-secondary">
            <span className="h-px w-8 bg-gold" />
            {kicker}
          </span>
        </Reveal>
      )}
      <Reveal delay={0.08}>
        <h2 className="font-display text-4xl font-medium leading-[1.08] tracking-tight text-balance text-text-primary sm:text-5xl md:text-6xl">
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.16}>
          <p className="mt-6 text-balance text-base leading-relaxed text-text-secondary md:text-lg">
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
