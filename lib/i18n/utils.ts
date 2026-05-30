import type { Locale } from "./config";

export function localePath(locale: Locale, path: string): string {
  return `/${locale}${path.startsWith("/") ? path : `/${path}`}`;
}
