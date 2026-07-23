"use client";

import { MoveHorizontal } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

export default function BeforeAfterSlider({
  before,
  after,
  alt,
}: {
  before: string;
  after: string;
  alt: string;
}) {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updateFromClientX = (clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, pct)));
  };

  return (
    <div
      ref={ref}
      className="relative h-full w-full touch-none select-none overflow-hidden"
      onPointerDown={(e) => {
        dragging.current = true;
        (e.target as Element).setPointerCapture?.(e.pointerId);
        updateFromClientX(e.clientX);
      }}
      onPointerMove={(e) => {
        if (dragging.current) updateFromClientX(e.clientX);
      }}
      onPointerUp={() => {
        dragging.current = false;
      }}
      onPointerLeave={() => {
        dragging.current = false;
      }}
    >
      <Image src={after} alt={alt} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Image src={before} alt={alt} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
      </div>

      <div
        className="pointer-events-none absolute inset-y-0 w-[2px] bg-white/90"
        style={{ left: `${pos}%` }}
      />
      <div
        className="pointer-events-none absolute top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-text-primary shadow-[0_8px_20px_rgba(0,0,0,0.25)]"
        style={{ left: `${pos}%` }}
      >
        <MoveHorizontal size={16} strokeWidth={1.6} />
      </div>

      <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-black/45 px-3 py-1 text-[0.65rem] uppercase tracking-[0.15em] text-white backdrop-blur">
        До
      </span>
      <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-black/45 px-3 py-1 text-[0.65rem] uppercase tracking-[0.15em] text-white backdrop-blur">
        Після
      </span>
    </div>
  );
}
