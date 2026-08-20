"use client";

import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight, Quote, Star } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import reviews from "@/data/reviews.json";
import settings from "@/data/settings.json";
import { cn } from "@/lib/utils";

const moreReviewsCount = Math.max(settings.reviewsCount - reviews.length, 0);

export default function Reviews() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
  });
  const [selected, setSelected] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect).on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect).off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section id="reviews" className="relative overflow-hidden bg-bg-secondary py-28 md:py-36">
      <Container>
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <SectionHeading
              kicker="Відгуки"
              title="Відгуки наших клієнтів"
              className="max-w-xl"
            />
            <div className="mt-6 flex items-center gap-3">
              <span className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={15}
                    className={cn(
                      i < Math.round(settings.rating) ? "fill-accent text-accent" : "text-card-border",
                    )}
                    strokeWidth={0}
                  />
                ))}
              </span>
              <span className="text-sm font-medium text-text-primary">
                {settings.rating.toFixed(1)} / 5
              </span>
              <span className="text-sm text-text-secondary">
                · {settings.reviewsCount} відгуків
              </span>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              aria-label="Попередній відгук"
              onClick={() => emblaApi?.scrollPrev()}
              className="flex h-12 w-12 items-center justify-center rounded-full glass transition-colors hover:bg-accent/30"
            >
              <ArrowLeft size={17} strokeWidth={1.5} />
            </button>
            <button
              aria-label="Наступний відгук"
              onClick={() => emblaApi?.scrollNext()}
              className="flex h-12 w-12 items-center justify-center rounded-full glass transition-colors hover:bg-accent/30"
            >
              <ArrowRight size={17} strokeWidth={1.5} />
            </button>
          </div>
        </div>

        <div className="mt-14 overflow-hidden" ref={emblaRef}>
          <div className="-ml-6 flex">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="min-w-0 shrink-0 grow-0 basis-[85%] pl-6 sm:basis-[60%] lg:basis-[38%]"
              >
                <div className="flex h-full flex-col rounded-28 glass p-8">
                  <Quote size={28} strokeWidth={1.2} className="text-gold" />
                  <div className="mt-5 flex gap-1">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={i} size={13} className="fill-gold text-gold" strokeWidth={0} />
                    ))}
                  </div>
                  <p className="mt-4 flex-1 text-balance text-[0.95rem] leading-relaxed text-text-primary/90">
                    {review.text}
                  </p>
                  <div className="mt-7 flex items-center gap-3 border-t border-card-border pt-6">
                    <div className="relative h-11 w-11 overflow-hidden rounded-full">
                      <Image src={review.avatar} alt={review.name} fill sizes="44px" className="object-cover" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-text-primary">{review.name}</p>
                      <p className="text-xs text-text-secondary">
                        {review.service} · {review.date}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex justify-center gap-2">
          {reviews.map((review, i) => (
            <button
              key={review.id}
              aria-label={`Перейти до відгуку ${i + 1}`}
              onClick={() => emblaApi?.scrollTo(i)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                selected === i ? "w-8 bg-gold" : "w-1.5 bg-card-border",
              )}
            />
          ))}
        </div>

        {moreReviewsCount > 0 && (
          <div className="mt-10 text-center">
            <a
              href={settings.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-text-primary transition-colors hover:text-accent"
            >
              Ще відгуки ({moreReviewsCount})
              <ArrowRight size={15} strokeWidth={1.6} />
            </a>
          </div>
        )}
      </Container>
    </section>
  );
}
