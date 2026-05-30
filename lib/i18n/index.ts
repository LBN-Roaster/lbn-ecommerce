export { defaultLocale, isLocale, locales } from "./config";
export type { Locale } from "./config";
export type { Dictionary } from "./dictionaries/vi";

import type { Locale } from "./config";
import type { Dictionary } from "./dictionaries/vi";

const dictionaries: Record<Locale, () => Dictionary> = {
  vi: () => require("./dictionaries/vi").default,
  en: () => require("./dictionaries/en").default,
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale]();
}
