"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import MagneticButton from "./MagneticButton";

type Variant = "primary" | "accent" | "outline" | "ghost";
type Size = "md" | "lg";

interface BaseProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  icon?: ReactNode;
  magnetic?: boolean;
}

interface ButtonAsLink extends BaseProps {
  href: string;
  onClick?: never;
}

interface ButtonAsButton extends BaseProps {
  href?: never;
  onClick?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  disabled?: boolean;
}

type Props = ButtonAsLink | ButtonAsButton;

const variants: Record<Variant, string> = {
  primary:
    "bg-text-primary text-bg hover:bg-[#413c3a] border border-text-primary",
  accent:
    "bg-accent text-text-primary hover:bg-accent-secondary border border-accent",
  outline:
    "bg-transparent text-text-primary border border-text-primary/25 hover:border-text-primary/60",
  ghost: "bg-transparent text-text-primary border border-transparent",
};

const sizes: Record<Size, string> = {
  md: "px-7 py-3.5 text-sm",
  lg: "px-9 py-4.5 text-base",
};

export default function Button(props: Props) {
  const {
    children,
    variant = "primary",
    size = "md",
    className,
    icon,
    magnetic = true,
  } = props;

  const classes = cn(
    "group relative inline-flex items-center justify-center gap-2.5 rounded-btn font-sans font-medium tracking-wide transition-colors duration-300 ease-out",
    variants[variant],
    sizes[size],
    className,
  );

  const content = (
    <span className="relative z-10 flex items-center gap-2.5">
      {children}
      {icon && (
        <span className="transition-transform duration-300 group-hover:translate-x-1">
          {icon}
        </span>
      )}
    </span>
  );

  const inner =
    "href" in props && props.href ? (
      props.href.startsWith("#") ? (
        <a href={props.href} className={classes}>
          {content}
        </a>
      ) : props.href.startsWith("http") ? (
        <a
          href={props.href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
        >
          {content}
        </a>
      ) : (
        <Link href={props.href} className={classes}>
          {content}
        </Link>
      )
    ) : (
      <button
        type={(props as ButtonAsButton).type ?? "button"}
        onClick={(props as ButtonAsButton).onClick}
        disabled={(props as ButtonAsButton).disabled}
        className={classes}
      >
        {content}
      </button>
    );

  if (!magnetic) return inner;

  return <MagneticButton>{inner}</MagneticButton>;
}
