export const locales = ["en", "zh"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = {
    zh: "中文",
    en: "English",
};

/**
 * The dayjs locale identifier for a given site locale.
 */
export const dayjsLocale: Record<Locale, string> = {
    zh: "zh-cn",
    en: "en",
};

/**
 * The HTML `lang` attribute value for a given site locale.
 */
export const htmlLang: Record<Locale, string> = {
    zh: "zh-CN",
    en: "en",
};

/**
 * Prefix a path with the locale segment when needed.
 * The default locale lives at the root and has no prefix.
 */
export const localizePath = (path: string, locale: Locale): string => {
    const normalized = path.startsWith("/") ? path : `/${path}`;
    if (locale === defaultLocale) {
        return normalized;
    }
    if (normalized === "/") {
        return `/${locale}`;
    }
    return `/${locale}${normalized}`;
};

/**
 * Detect the locale embedded in a Gatsby pathname.
 * Returns `defaultLocale` when no prefix is present.
 */
export const localeFromPath = (path: string): Locale => {
    const segments = path.replace(/^\/+/, "").split("/");
    const first = segments[0] as Locale;
    if (locales.includes(first) && first !== defaultLocale) {
        return first;
    }
    return defaultLocale;
};

/**
 * Strip the locale prefix from a path so it can be re-prefixed for another locale.
 */
export const stripLocaleFromPath = (path: string): string => {
    const normalized = path.startsWith("/") ? path : `/${path}`;
    for (const locale of locales) {
        if (locale === defaultLocale) continue;
        if (normalized === `/${locale}` || normalized === `/${locale}/`) {
            return "/";
        }
        if (normalized.startsWith(`/${locale}/`)) {
            return normalized.slice(`/${locale}`.length);
        }
    }
    return normalized;
};
