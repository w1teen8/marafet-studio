import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Prefixes a local /public asset path with the GitHub Pages basePath.
 * Needed because next/image renders a plain <img> when `unoptimized`
 * is set, so it never auto-prefixes local sources like it does for
 * framework assets.
 */
export function withBasePath(path: string) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return `${basePath}${path}`;
}
