"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import type { AdminDictionary } from "lib/i18n";
import type { Locale } from "lib/i18n/config";
import { getAdminDictionary } from "lib/i18n";

interface AdminLocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: AdminDictionary;
}

const AdminLocaleContext = createContext<AdminLocaleContextValue | null>(null);

function getInitialLocale(): Locale {
  if (typeof document === "undefined") return "vi";
  const match = document.cookie.match(/(?:^|;\s*)admin-locale=(\w+)/);
  if (match && (match[1] === "vi" || match[1] === "en")) return match[1];
  const localeCookie = document.cookie.match(/(?:^|;\s*)locale=(\w+)/);
  if (localeCookie && (localeCookie[1] === "vi" || localeCookie[1] === "en"))
    return localeCookie[1];
  return "vi";
}

export function AdminLocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(getInitialLocale);
  const [dict, setDict] = useState<AdminDictionary>(() =>
    getAdminDictionary(getInitialLocale()),
  );

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    setDict(getAdminDictionary(next));
    document.cookie = `admin-locale=${next};path=/;max-age=${60 * 60 * 24 * 365}`;
  }, []);

  return (
    <AdminLocaleContext.Provider value={{ locale, setLocale, t: dict }}>
      {children}
    </AdminLocaleContext.Provider>
  );
}

export function useAdminLocale() {
  const ctx = useContext(AdminLocaleContext);
  if (!ctx)
    throw new Error("useAdminLocale must be used within AdminLocaleProvider");
  return ctx;
}
