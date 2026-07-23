"use client";

import { Star } from "lucide-react";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import prices from "@/data/prices.json";

export default function Pricing() {
  return (
    <section id="price" className="relative bg-bg py-28 md:py-36">
      <Container>
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading
            kicker="Ціни"
            title="Прозорі ціни без сюрпризів"
            description="Фінальна вартість залежить від довжини волосся, складності дизайну та обраних матеріалів — майстер озвучить її на консультації."
            className="max-w-xl"
          />
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {prices.map((category, i) => (
            <Reveal key={category.id} delay={(i % 3) * 0.1}>
              <div className="flex h-full flex-col rounded-28 glass p-8 transition-shadow duration-500 hover:shadow-[0_25px_60px_rgba(45,42,41,0.12)]">
                <h3 className="font-display text-2xl font-medium text-text-primary">
                  {category.title}
                </h3>
                <div className="mt-6 flex flex-1 flex-col gap-4">
                  {category.items.map((item) => (
                    <div key={item.name} className="flex items-baseline gap-3">
                      <span className="flex items-center gap-1.5 text-sm text-text-primary">
                        {item.name}
                        {item.popular && (
                          <Star
                            size={12}
                            className="fill-gold text-gold"
                            strokeWidth={0}
                          />
                        )}
                      </span>
                      <span className="h-px flex-1 border-b border-dotted border-card-border" />
                      <span className="whitespace-nowrap text-sm font-medium text-text-primary">
                        {item.price}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-8">
                  <Button href="#booking" variant="outline" className="w-full justify-center">
                    Записатися
                  </Button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
