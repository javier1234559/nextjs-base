import { clsx, type ClassValue } from "clsx"

import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function stripTrailingZero(str: string) {
  return str.replace(/\.0$/, '');
}

export function formatPropertyPrice(price: number | null | undefined): string {
  if (!price || price <= 0) return '';

  const absPrice = Math.abs(price);

  if (absPrice >= 1_000_000) {
    const millions = price / 1_000_000;
    return stripTrailingZero(millions.toFixed(1)) + 'M';
  }

  if (absPrice >= 1_000) {
    const thousands = price / 1_000;
    return stripTrailingZero(thousands.toFixed(0)) + 'K';
  }

  return price.toString();
}

export function formatNumber(num: number, locale: string = "en-US") {
  return new Intl.NumberFormat(locale).format(num);
}


export function formatPrice(price: number, locale: string = "en-US", currency: string = "USD") {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(price);
}