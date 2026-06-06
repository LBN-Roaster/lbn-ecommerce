export { defaultLocale, isLocale, locales } from "./config";
export type { Locale } from "./config";
export type { Dictionary, AdminDictionary } from "./dictionaries/vi";

import type { Locale } from "./config";
import type { Dictionary } from "./dictionaries/vi";
import type { AdminDictionary } from "./dictionaries/vi";

const dictionaries: Record<Locale, () => Dictionary> = {
  vi: () => require("./dictionaries/vi").default,
  en: () => require("./dictionaries/en").default,
};

const adminDictionaries: Record<Locale, () => AdminDictionary> = {
  vi: () => require("./dictionaries/vi").viAdmin,
  en: () => require("./dictionaries/en").enAdmin,
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale]();
}

export function getAdminDictionary(locale: Locale): AdminDictionary {
  return adminDictionaries[locale]();
}
