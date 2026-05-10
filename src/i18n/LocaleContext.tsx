import * as React from "react";

import { defaultLocale, Locale } from "./config";
import { translations, TranslationKey } from "./translations";

type LocaleContextValue = {
    locale: Locale;
};

export const LocaleContext = React.createContext<LocaleContextValue>({
    locale: defaultLocale,
});

type LocaleProviderProps = {
    locale: Locale;
    children: React.ReactNode;
};

export const LocaleProvider: React.FC<LocaleProviderProps> = ({
    locale,
    children,
}) => {
    const value = React.useMemo(() => ({ locale }), [locale]);
    return (
        <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
    );
};

export const useLocale = (): Locale =>
    React.useContext(LocaleContext).locale;

const interpolate = (
    template: string,
    vars?: Record<string, string | number>
) => {
    if (!vars) return template;
    return template.replace(/\{(\w+)\}/g, (_, key) =>
        Object.prototype.hasOwnProperty.call(vars, key)
            ? String(vars[key])
            : `{${key}}`
    );
};

export const useTranslation = () => {
    const locale = useLocale();
    const t = React.useCallback(
        (key: TranslationKey, vars?: Record<string, string | number>) => {
            const dict = translations[locale] ?? translations[defaultLocale];
            const value = dict[key] ?? translations[defaultLocale][key] ?? key;
            return interpolate(value, vars);
        },
        [locale]
    );
    return { locale, t };
};
